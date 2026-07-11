// Pre-built, pre-tested hero section templates.
// AI only ever picks a templateId + writes the text - it never writes this markup.
module.exports = {
  centered: (headline, sub) => `
    <section style="text-align:center;padding:80px 20px;font-family:inherit;">
      <h1 style="font-size:3rem;font-weight:800;margin:0 0 16px;">${headline}</h1>
      <p style="font-size:1.25rem;color:#555;max-width:600px;margin:0 auto;">${sub}</p>
    </section>`,

  splitImage: (headline, sub) => `
    <section style="display:flex;align-items:center;gap:40px;padding:60px 40px;flex-wrap:wrap;">
      <div style="flex:1;min-width:280px;">
        <h1 style="font-size:2.5rem;font-weight:800;margin:0 0 16px;">${headline}</h1>
        <p style="color:#555;font-size:1.1rem;">${sub}</p>
      </div>
      <div style="flex:1;min-width:280px;background:#eee;height:300px;border-radius:12px;"></div>
    </section>`,

  minimalDark: (headline, sub) => `
    <section style="background:#111;color:#fff;text-align:center;padding:100px 20px;">
      <h1 style="font-size:3rem;font-weight:700;margin:0 0 16px;">${headline}</h1>
      <p style="color:#aaa;font-size:1.1rem;">${sub}</p>
    </section>`
};
