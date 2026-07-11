const express = require('express');
const router = express.Router();

const { applyImprovements } = require('../services/patcher');

// POST /api/apply  { rawHtml: "...", decisions: { metaDescription, hero, ctas, palette } }
// "decisions" should contain ONLY the changes the user accepted in the UI.
router.post('/apply', (req, res) => {
  const { rawHtml, decisions } = req.body;

  if (!rawHtml) {
    return res.status(400).json({ error: 'rawHtml is required (returned from /api/analyze).' });
  }

  try {
    const improvedHtml = applyImprovements(rawHtml, decisions || {});
    res.json({ improvedHtml });
  } catch (err) {
    console.error('Apply failed:', err.message);
    res.status(500).json({ error: 'Failed to apply improvements.' });
  }
});

module.exports = router;
