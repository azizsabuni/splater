const chroma = require('chroma-js');

/**
 * Generates a small brand palette from a base color.
 * Pure deterministic logic - no AI call needed for this.
 */
function generatePalette(baseColor = '#2563eb') {
  let base;
  try {
    base = chroma(baseColor);
  } catch (e) {
    base = chroma('#2563eb'); // fallback if an invalid color slips through
  }

  const whiteContrast = chroma.contrast(base, '#ffffff');

  return {
    primary: base.hex(),
    secondary: base.set('hsl.h', '+30').hex(),
    accent: base.saturate(1).hex(),
    text: whiteContrast >= 4.5 ? '#ffffff' : '#111111', // WCAG AA-ish check
    background: base.luminance(0.95).hex()
  };
}

module.exports = { generatePalette };
