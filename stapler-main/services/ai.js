const { GoogleGenerativeAI } = require("@google/generative-ai");

let genAI = null;
function getClient() {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing from environment variables.");
    }
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
}

/**
 * Asks the AI to make small, structured decisions:
 * - which pre-built template fits best
 * - better copy for headline / CTA / meta description
 * It NEVER returns raw HTML - only JSON decisions the backend then renders
 * using the trusted template library (see /templates).
 */
async function generateDecisions(siteData, ruleIssues, businessDescription) {
  const client = getClient();
  const model = client.getGenerativeModel({ model: "gemini-2.0-flash" });

  const issuesSummary = ruleIssues
    .map((i) => `- [${i.category}] ${i.message}`)
    .join("\n");
  const ctaSummary =
    siteData.ctaButtons.map((c) => `${c.id}: "${c.text}"`).join("\n") ||
    "none found";

  const prompt = `
You are a branding and marketing expert improving a website. Base your decisions on the
real detected issues below - do not invent unrelated problems.

SITE TITLE: ${siteData.title}
META DESCRIPTION: ${siteData.metaDescription || "(missing)"}
BUSINESS DESCRIPTION: ${businessDescription || "(none provided)"}
HERO TEXT (current): ${siteData.heroText || "(none detected)"}
CTA BUTTONS (current):
${ctaSummary}

DETECTED ISSUES:
${issuesSummary || "none"}

Use the business description to guide your recommendations whenever possible.

Available hero templates: "centered", "splitImage", "minimalDark"
Available CTA button templates: "boldCTA", "minimalCTA", "gradientCTA"

Return ONLY valid JSON (no markdown fences, no commentary) in this exact shape:
{
  "metaDescription": "<improved meta description, 50-160 chars, or null if current one is already fine>",
  "hero": {
    "selector": "${siteData.heroSelector || ""}",
    "templateId": "<one of the hero template ids>",
    "headline": "<punchy improved headline>",
    "subtext": "<supporting one-liner>"
  },
  "ctas": [
    { "selector": "<the cta's data-improve-id selector like [data-improve-id=\\"cta-1\\"]>", "templateId": "<one of the cta template ids>", "text": "<action-driven improved button text>" }
  ]
}
Only include entries in "ctas" for buttons that actually need improving. If hero was not detected (selector is empty), set "hero" to null.
`;

  const result = await model.generateContent(prompt);
  const rawText = result.response
    .text()
    .replace(/```json|```/g, "")
    .trim();

  let decisions;
  try {
    decisions = JSON.parse(rawText);
  } catch (err) {
    throw new Error("AI returned invalid JSON: " + rawText.slice(0, 200));
  }

  return decisions;
}

module.exports = { generateDecisions };
