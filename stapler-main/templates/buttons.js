// Pre-built CTA button templates.
module.exports = {
  boldCTA: (text) => `
    <button style="background:#2563eb;color:#fff;padding:12px 28px;border-radius:8px;
      font-weight:600;border:none;font-size:1rem;cursor:pointer;
      box-shadow:0 4px 12px rgba(37,99,235,0.3);">${text}</button>`,

  minimalCTA: (text) => `
    <button style="background:transparent;border:2px solid #111;color:#111;
      padding:10px 24px;border-radius:4px;font-weight:600;cursor:pointer;">${text}</button>`,

  gradientCTA: (text) => `
    <button style="background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;
      padding:12px 28px;border-radius:999px;font-weight:600;border:none;
      cursor:pointer;">${text}</button>`
};
