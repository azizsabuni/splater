const axios = require("axios");
const cheerio = require("cheerio");

/**
 * Scrapes a website and returns:
 * - rawHtml: the original HTML, but with data-improve-id attributes injected
 *            onto elements we might later replace (so the patcher can find them)
 * - siteData: extracted marketing/branding-relevant content
 */
async function scrapeWebsite(url) {
  const { data: html } = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; WebsiteImproverBot/1.0)",
    },
    timeout: 10000,
  });

  const $ = cheerio.load(html);

  // --- Tag the hero section ---
  const heroEl = $('header, .hero, [class*="hero"], section').first();
  if (heroEl.length) heroEl.attr("data-improve-id", "hero-1");

  // --- Tag CTA-like buttons/links ---
  const ctaButtons = [];
  $('button, a.btn, [class*="cta"], a[class*="button"]').each((i, el) => {
    if (i >= 5) return; // cap at 5 to keep things manageable
    const id = `cta-${i + 1}`;
    $(el).attr("data-improve-id", id);
    ctaButtons.push({ id, text: $(el).text().trim() });
  });

  // --- Collect fonts used inline (rough signal for brand consistency) ---
  const fontFamilies = new Set();
  $('[style*="font-family"]').each((i, el) => {
    const style = $(el).attr("style") || "";
    const match = style.match(/font-family:\s*([^;]+)/i);
    if (match) fontFamilies.add(match[1].trim());
  });

  const pageHtml = $.html();
  const siteData = {
    title: $("title").text().trim(),
    metaDescription: $('meta[name="description"]').attr("content") || "",
    hasOgTags: $('meta[property="og:title"]').length > 0,
    hasViewport: $('meta[name="viewport"]').length > 0,
    hasFavicon: $('link[rel*="icon"]').length > 0,
    headings: $("h1, h2")
      .map((i, el) => $(el).text().trim())
      .get()
      .slice(0, 10),
    h1Count: $("h1").length,
    heroText: heroEl.text().trim().slice(0, 500),
    heroSelector: heroEl.length ? '[data-improve-id="hero-1"]' : null,
    ctaButtons,
    imagesMissingAlt: $("img:not([alt])").length,
    imageCount: $("img").length,
    fontFamilyCount: fontFamilies.size,
    htmlLength: Buffer.byteLength(pageHtml, "utf8"),
  };

  return {
    rawHtml: pageHtml, // tagged HTML, ready for the patcher later
    siteData,
  };
}

module.exports = { scrapeWebsite };
