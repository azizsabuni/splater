// Pre-built card templates - optional, useful if you extend beyond hero/CTA.
module.exports = {
  simpleCard: (title, description) => `
    <div style="border:1px solid #e5e7eb;border-radius:12px;padding:24px;max-width:320px;">
      <h3 style="margin:0 0 8px;font-size:1.2rem;font-weight:700;">${title}</h3>
      <p style="margin:0;color:#666;font-size:0.95rem;">${description}</p>
    </div>`,

  shadowCard: (title, description) => `
    <div style="border-radius:12px;padding:24px;max-width:320px;
      box-shadow:0 8px 24px rgba(0,0,0,0.08);">
      <h3 style="margin:0 0 8px;font-size:1.2rem;font-weight:700;">${title}</h3>
      <p style="margin:0;color:#666;font-size:0.95rem;">${description}</p>
    </div>`
};
