const express = require("express");
const router = express.Router();
const http = require("http");

const AI_AGENT_URL = process.env.AI_AGENT_URL || "http://localhost:313";

/**
 * Helper: proxy a POST request to the Python AI agent backend.
 * Returns a promise that resolves with the JSON response.
 */
function callAgent(endpoint, body, timeoutMs = 900000) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, AI_AGENT_URL);
    const payload = JSON.stringify(body);

    const req = http.request(
      {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
        },
        timeout: timeoutMs,
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch {
            reject(new Error("Invalid JSON from AI agent: " + data.slice(0, 300)));
          }
        });
      }
    );

    req.on("error", (err) => reject(err));
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("AI agent request timed out"));
    });

    req.write(payload);
    req.end();
  });
}

/**
 * POST /api/ai/analyze
 * Proxies to the Python AI agent's full 6-stage pipeline.
 * Body: { url: string, use_tinykit?: boolean }
 *
 * Returns the full analysis:
 * { strategy, branding, design, qa, code, pages, screenshot, screenshots,
 *   url, timing, timing_markdown, tool_data }
 */
router.post("/ai/analyze", async (req, res) => {
  const { url, use_tinykit } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required." });
  }

  try {
    console.log(`[AI-PROXY] Calling agent for: ${url}`);
    const result = await callAgent("/api/analyze", {
      url,
      use_tinykit: !!use_tinykit,
    });
    console.log(`[AI-PROXY] Done in ${result.timing?.total || "?"}s`);
    res.json(result);
  } catch (err) {
    console.error("[AI-PROXY] Error:", err.message);
    res.status(502).json({
      error: "AI agent is unavailable. Make sure the test-agent backend is running on port 313.",
      details: err.message,
    });
  }
});

/**
 * POST /api/ai/branding
 * Proxies branding-only analysis to the Python AI agent.
 * Body: { url?: string, idea?: string }
 */
router.post("/ai/branding", async (req, res) => {
  const { url, idea } = req.body;

  if (!url && !idea) {
    return res.status(400).json({ error: "Provide a URL or a business idea." });
  }

  try {
    console.log(`[AI-PROXY] Calling branding for: ${url || idea}`);
    const result = await callAgent("/api/branding", { url: url || "", idea: idea || "" });
    res.json(result);
  } catch (err) {
    console.error("[AI-PROXY] Branding error:", err.message);
    res.status(502).json({
      error: "AI agent branding service unavailable.",
      details: err.message,
    });
  }
});

/**
 * POST /api/ai/export
 * Proxies markdown export request to the Python AI agent.
 * Body: { strategy, branding, design, qa, url, timing }
 */
router.post("/ai/export", async (req, res) => {
  try {
    const result = await callAgent("/api/export/markdown", req.body, 30000);
    // The agent returns PlainTextResponse — forward it as-is
    if (typeof result === "string") {
      res.set("Content-Type", "text/markdown");
      res.set("Content-Disposition", `attachment; filename=analysis.md`);
      return res.send(result);
    }
    res.json(result);
  } catch (err) {
    console.error("[AI-PROXY] Export error:", err.message);
    res.status(502).json({ error: "Export failed.", details: err.message });
  }
});

/**
 * GET /api/ai/health
 * Check if the AI agent backend is reachable.
 */
router.get("/ai/health", async (req, res) => {
  try {
    const url = new URL("/", AI_AGENT_URL);
    const result = await new Promise((resolve, reject) => {
      http.get({ hostname: url.hostname, port: url.port, path: "/", timeout: 5000 }, (response) => {
        let data = "";
        response.on("data", (chunk) => (data += chunk));
        response.on("end", () => {
          try { resolve(JSON.parse(data)); } catch { resolve({ raw: data }); }
        });
      }).on("error", reject);
    });
    res.json({ agent: "reachable", ...result });
  } catch (err) {
    res.json({ agent: "unreachable", error: err.message });
  }
});

module.exports = router;
