/**
 * Runs deterministic marketing/branding/SEO checks against scraped site data.
 * No AI involved here on purpose - this should be instant and reliable.
 */
function runChecks(siteData) {
  const issues = [];

  const addIssue = ({ category, severity, message, type, relatedId }) => {
    const issue = { category, severity, message, type };
    if (relatedId) issue.relatedId = relatedId;
    issues.push(issue);
  };

  if (!siteData.title) {
    addIssue({
      category: "SEO",
      severity: "medium",
      type: "readability",
      message:
        "Missing page title - a clear title helps users and search engines understand the page.",
    });
  }

  if (!siteData.metaDescription) {
    addIssue({
      category: "SEO",
      severity: "high",
      type: "readability",
      message:
        "Missing meta description - hurts search engine click-through rate.",
    });
  } else if (
    siteData.metaDescription.length < 50 ||
    siteData.metaDescription.length > 160
  ) {
    addIssue({
      category: "SEO",
      severity: "medium",
      type: "readability",
      message: `Meta description is ${siteData.metaDescription.length} characters - ideal range is 50-160.`,
    });
  }

  if (!siteData.hasOgTags) {
    addIssue({
      category: "Branding",
      severity: "medium",
      type: "ux",
      message:
        "No Open Graph tags - shared links may look generic on social media.",
    });
  }

  if (siteData.h1Count === 0) {
    addIssue({
      category: "SEO",
      severity: "high",
      type: "readability",
      message: "No H1 tag found - every page needs one main heading.",
    });
  } else if (siteData.h1Count > 1) {
    addIssue({
      category: "SEO",
      severity: "medium",
      type: "readability",
      message: `Found ${siteData.h1Count} H1 tags - should only have 1.`,
    });
  }

  if (siteData.imagesMissingAlt > 0) {
    addIssue({
      category: "Accessibility",
      severity: "medium",
      type: "readability",
      message: `${siteData.imagesMissingAlt} image(s) missing alt text.`,
    });
  }

  if (!siteData.hasViewport) {
    addIssue({
      category: "Mobile",
      severity: "high",
      type: "loading",
      message:
        "No viewport meta tag - site is likely broken on mobile and may load poorly on phones.",
    });
  }

  if (!siteData.hasFavicon) {
    addIssue({
      category: "Branding",
      severity: "low",
      type: "ux",
      message: "No favicon found - small but noticeable branding gap.",
    });
  }

  if (siteData.fontFamilyCount > 3) {
    addIssue({
      category: "Branding",
      severity: "low",
      type: "ux",
      message: `${siteData.fontFamilyCount} different fonts detected - too many hurts brand consistency (aim for 2-3 max).`,
    });
  }

  if (!siteData.heroSelector) {
    addIssue({
      category: "Branding",
      severity: "medium",
      type: "ux",
      message:
        "Hero section not detected - a strong hero improves first impressions and conversions.",
    });
  }

  const htmlLength = siteData.htmlLength || 0;
  if (htmlLength > 250000) {
    addIssue({
      category: "Performance",
      severity: "high",
      type: "loading",
      message: `Page HTML is ${(htmlLength / 1024).toFixed(1)} KB - large HTML can slow loading, especially on mobile.`,
    });
  } else if (htmlLength > 120000) {
    addIssue({
      category: "Performance",
      severity: "medium",
      type: "loading",
      message: `Page HTML is ${(htmlLength / 1024).toFixed(1)} KB - consider trimming unused markup or inline styles.`,
    });
  }

  if (siteData.imageCount > 20) {
    addIssue({
      category: "Performance",
      severity: "high",
      type: "loading",
      message: `Detected ${siteData.imageCount} images - too many images increase page load time.`,
    });
  } else if (siteData.imageCount > 10) {
    addIssue({
      category: "Performance",
      severity: "medium",
      type: "loading",
      message: `Detected ${siteData.imageCount} images - check whether images can be optimized or lazy-loaded.`,
    });
  }

  const weakCTAWords = ["click here", "submit", "here", "link", "ok"];
  siteData.ctaButtons.forEach((cta) => {
    if (weakCTAWords.includes(cta.text.toLowerCase().trim())) {
      addIssue({
        category: "Marketing",
        severity: "medium",
        type: "ux",
        message: `Weak CTA text: "${cta.text}" - generic CTAs convert worse than action-specific ones.`,
        relatedId: cta.id,
      });
    }
  });

  const penalty = issues.reduce((sum, issue) => {
    if (issue.severity === "high") return sum + 2;
    if (issue.severity === "medium") return sum + 1;
    return sum + 0.5;
  }, 0);
  const overallScore = Math.max(1, Math.round(10 - penalty));

  return { issues, overallScore };
}

module.exports = { runChecks };
