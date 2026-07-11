const express = require("express");
const router = express.Router();

const { generateTips } = require("../services/chatbot");

// POST /api/chatbot  { idea: string, sessionId?: string }
router.post("/chatbot", async (req, res) => {
  const { idea, sessionId } = req.body || {};
  if (!idea || typeof idea !== "string" || idea.trim().length === 0) {
    return res
      .status(400)
      .json({ error: "idea is required (short description of the business)." });
  }

  try {
    const result = await generateTips(idea.trim(), sessionId);
    res.json(result);
  } catch (err) {
    console.error("Chatbot error:", err.message);
    res.status(500).json({ error: "Chatbot failed", details: err.message });
  }
});

module.exports = router;
