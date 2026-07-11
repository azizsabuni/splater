const axios = require("axios");

// Simple in-memory session store: sessionId -> [{ role: 'user'|'assistant', text, time }]
const sessions = new Map();

function makeSessionId() {
  return (
    "sess-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  );
}

async function callAgnoAgent(idea, history) {
  const apiKey = process.env.AGNO_API_KEY;
  const apiUrl =
    process.env.AGNO_API_URL ||
    "https://api.agno.com/v1/agents/marketing:respond";
  if (!apiKey) throw new Error("AGNO_API_KEY not set");

  const payload = {
    input: {
      idea,
      history,
    },
    // provider-specific fields can be added here if/when you wire a real agent
  };

  const resp = await axios.post(apiUrl, payload, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    timeout: 15000,
  });

  // Try to be flexible with returned shapes from different agent providers
  const data = resp.data || {};
  if (data.reply)
    return { reply: data.reply, suggestions: data.suggestions || [] };
  if (data.result && typeof data.result === "string")
    return { reply: data.result, suggestions: data.suggestions || [] };
  if (data.choices && data.choices[0] && data.choices[0].text)
    return { reply: data.choices[0].text, suggestions: [] };

  // fallback: stringify whatever useful we can find
  return { reply: JSON.stringify(data).slice(0, 4000), suggestions: [] };
}

async function generateTips(idea, sessionId) {
  const sid = sessionId || makeSessionId();
  const history = sessions.get(sid) || [];

  // If no Agno key is configured, return a lightweight deterministic stub
  if (!process.env.AGNO_API_KEY) {
    const reply = `Here are three practical branding & marketing tips for your idea: "${idea.slice(0, 120)}"\n\n1) Define your target customer and 1-line value proposition.\n2) Craft a clear hero headline that states the benefit, not the feature.\n3) Use a single primary CTA and make it action-specific.`;
    const suggestions = [
      "Try a short benefit-focused tagline",
      'Use a strong action CTA like "Start saving today"',
      "Pick 2–3 brand fonts and 2 brand colors",
    ];

    const userEntry = { role: "user", text: idea, time: Date.now() };
    const assistantEntry = { role: "assistant", text: reply, time: Date.now() };
    sessions.set(sid, [...history, userEntry, assistantEntry]);

    return { sessionId: sid, reply, suggestions, history: sessions.get(sid) };
  }

  // Call the external Agno agent
  let result;
  try {
    result = await callAgnoAgent(idea, history);
  } catch (err) {
    throw new Error("Agent call failed: " + err.message);
  }

  const userEntry = { role: "user", text: idea, time: Date.now() };
  const assistantEntry = {
    role: "assistant",
    text: result.reply,
    time: Date.now(),
  };
  sessions.set(sid, [...history, userEntry, assistantEntry]);

  return {
    sessionId: sid,
    reply: result.reply,
    suggestions: result.suggestions || [],
    history: sessions.get(sid),
  };
}

module.exports = { generateTips, sessions };
