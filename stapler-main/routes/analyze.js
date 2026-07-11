const express = require("express");
const router = express.Router();

const { scrapeWebsite } = require("../services/scraper");
const { runChecks } = require("../services/ruleEngine");
const { generateDecisions } = require("../services/ai");
const { generatePalette } = require("../services/palette");
const { verifyToken } = require("../services/login");
const { deductCredits } = require("../services/userStore");
const { supabase } = require("../services/supabaseClient");

// POST /api/analyze  { url: "https://example.com", businessDescription?: "...", wantsRedesign: boolean }
router.post("/analyze", async (req, res) => {
  let { url, businessDescription, wantsRedesign } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required." });
  }

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }
  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }

  if (wantsRedesign) {
    const success = await deductCredits(decoded.email, 100);
    if (!success) {
      return res.status(402).json({ error: "Not enough credits for a redesign." });
    }
  }

  try {
    const { rawHtml, siteData } = await scrapeWebsite(url);
    const { issues, overallScore } = runChecks(siteData);
    const palette = generatePalette(); // hackathon default base color; swap for a scraped one if you extract it

    let aiDecisions = null;
    let aiError = null;
    try {
      aiDecisions = await generateDecisions(
        siteData,
        issues,
        businessDescription,
      );
    } catch (err) {
      // AI failing should never break the whole response - rule-based results still work
      console.error("AI decision generation failed:", err.message);
      aiError =
        "AI suggestions unavailable right now, rule-based results still included.";
    }

    if (supabase) {
      await supabase.from('projects').insert([{
        email: decoded.email,
        url,
        description: businessDescription || null,
        score: overallScore
      }]).catch(e => console.error("Failed to save project to Supabase:", e));
    }

    res.json({
      siteData,
      rawHtml, // needed later by /apply - frontend should hold onto this
      businessDescription: businessDescription || null,
      ruleBasedIssues: issues,
      overallScore,
      palette,
      aiDecisions,
      aiError,
    });
  } catch (err) {
    console.error("Analyze failed:", err.message);
    res
      .status(500)
      .json({
        error: "Failed to analyze website. Check the URL and try again.",
      });
  }
});

module.exports = router;
