const cheerio = require('cheerio');
const heroTemplates = require('../templates/heroes');
const buttonTemplates = require('../templates/buttons');

/**
 * Applies a set of decisions onto the original tagged HTML.
 * decisions shape (all fields optional - only accepted ones need be sent):
 * {
 *   metaDescription: "...",
 *   hero: { selector, templateId, headline, subtext },
 *   ctas: [ { selector, templateId, text } ],
 *   palette: { primary, secondary, accent, text, background }
 * }
 */
function applyImprovements(rawHtml, decisions = {}) {
  const $ = cheerio.load(rawHtml);

  if (decisions.metaDescription) {
    if ($('meta[name="description"]').length) {
      $('meta[name="description"]').attr('content', decisions.metaDescription);
    } else {
      $('head').append(`<meta name="description" content="${decisions.metaDescription}">`);
    }
  }

  if (decisions.hero && decisions.hero.selector) {
    const builder = heroTemplates[decisions.hero.templateId];
    if (builder && $(decisions.hero.selector).length) {
      const newHtml = builder(decisions.hero.headline, decisions.hero.subtext);
      $(decisions.hero.selector).replaceWith(newHtml);
    }
  }

  if (Array.isArray(decisions.ctas)) {
    decisions.ctas.forEach((cta) => {
      const builder = buttonTemplates[cta.templateId];
      if (builder && cta.selector && $(cta.selector).length) {
        const newHtml = builder(cta.text);
        $(cta.selector).replaceWith(newHtml);
      }
    });
  }

  if (decisions.palette) {
    const { primary, secondary, accent, text, background } = decisions.palette;
    $('head').append(`
      <style>
        :root {
          --primary: ${primary};
          --secondary: ${secondary};
          --accent: ${accent};
          --brand-text: ${text};
          --brand-bg: ${background};
        }
      </style>`);
  }

  return $.html();
}

module.exports = { applyImprovements };
