# LINGsCARS Design Plan — Intentional Chaos

> **"We find you the cheapest car lease. We show you our margin. You save money. Done."**
> *— The only headline this brand will ever need.*

---

## 1. Design Philosophy: The Controlled Chaos Principle

**The problem:** The existing design system (`tokens.css`) is beautiful, warm, editorial — but it's fighting the brand. Navy backgrounds, serif display fonts, generous whitespace, and 12px border radii say "premium artisanal" when this brand should say "competent chaos."

**The existing palette (current):**
- Navy `#1D3557` — authoritative, calm, B2B energy
- Cream `#FEFCF8` — warm, editorial, "small batch" vibes
- DM Serif Display — literary, refined, slow
- 12px radius cards — soft, approachable, premium
- Generous spacing — breathes like a luxury brand

**The problem with this:** Ling's Cars is NOT a luxury brand. It's a volume leasing broker that wins on transparency, speed, and personality. The existing system makes it look like every other "premium" car site — which is precisely what Ling's customers have learned to distrust.

**The resolution (where we're going):**

| Principle | What it means |
|-----------|---------------|
| **Chaos with a spine** | The visual energy stays. Chinese restaurant menu density, bold red, Ling's face everywhere. But now it's structured — grid-aligned chaos, not accidental chaos. |
| **Function over decoration** | Every element earns its space. No serifs (they're decorative), no gradients (they're indecisive), no shadows on cards (they pretend to be important). |
| **Density is trust** | White space says "we don't have much to show." Density says "we have so many deals, we barely had time to lay them out." The brand's value is IN the density. |
| **Personality in the content, not the layout** | The layout is a neutral container. Ling's face, voice, and deals provide all the personality needed. The grid stays out of the way. |

---

## 2. Color System — CSS Variables

### The Brand-Approved Palette

The brand identity specifies exactly 5 colors. Not 6. Not 4. This is the palette.

```css
:root {
  /* ─── Primary: "Look at me" ─── */
  /* #E31837 is Ling's red. It's the red of Chinese New Year envelopes 
     (trust, luck, generosity). It's also the red of urgency (act now, 
     deal ends). Used for CTAs, prices, and exactly ONE thing per page 
     that needs maximum attention. Warm, not aggressive. */
  --primary: #E31837;
  --primary-hover: #C0142F;
  --primary-light: rgba(227, 24, 55, 0.08);
  --primary-on-dark: #FF4D63;

  /* ─── Gold: "Deal hunter's color" ─── */
  /* #FFD700 signals value, savings, optimism. Used ONLY for deal 
     badges, savings callouts, "best price" indicators. Never for 
     CTAs (that's red's job). Never decorative. Every gold pixel 
     means "money saved." */
  --gold: #FFD700;
  --gold-hover: #E6C200;
  --gold-light: rgba(255, 215, 0, 0.12);

  /* ─── Background: Clean Slate ─── */
  /* Pure white #FFFFFF. Not cream. Not ivory. Not "warm editorial."
     White is the stage for chaos — it disappears so the content 
     takes over. Alt sections use the lightest gray that still looks 
     intentional. */
  --bg: #FFFFFF;
  --bg-alt: #F3F4F6;
  --surface: #FFFFFF;

  /* ─── Text: Authority Without Intimidation ─── */
  /* #1A1A1A is near-black with warmth. Not #000 (too harsh), 
     not #333 (too common). High contrast on white ensures 
     readability at high density. */
  --text: #1A1A1A;
  --text-heading: #1A1A1A;     /* Same as text — headings don't need a different color */
  --text-muted: #6B7280;       /* Fine print, metadata, dates */
  --text-disabled: #9CA3AF;    /* Disabled states, placeholders */
  --text-on-dark: #FFFFFF;
  --text-on-dark-muted: rgba(255, 255, 255, 0.7);

  /* ─── Borders: Barely Present ─── */
  /* Functional only. #E5E7EB is the lightest gray that still 
     creates separation. Border on cards says "this is one thing" 
     not "look at this border." */
  --border: #E5E7EB;
  --border-strong: #D1D5DB;

  /* ─── Accent: Functional Blue ─── */
  /* Links, phone numbers, secondary interactive elements. 
     Blue is the internet's color for "click here." Use it so 
     users recognize interactive elements without thinking. */
  --accent: #2563EB;
  --accent-hover: #1D4ED8;
  --accent-light: rgba(37, 99, 235, 0.08);

  /* ─── Feedback: Meaningful Color ─── */
  /* Green = money saved. Amber = deal ending. Red = error/urgent.
     No decorative use. Every feedback color is a message. */
  --success: #00A651;
  --success-light: rgba(0, 166, 81, 0.08);
  --warning: #F59E0B;
  --warning-light: rgba(245, 158, 11, 0.1);
  --error: #E31837;
  --error-light: rgba(227, 24, 55, 0.08);

  /* ─── Shadows: Depth ONLY on Interactive Elements ─── */
  /* Cards are flat. Buttons lift on hover. Modals float above.
     Shadows communicate hierarchy, not decoration. */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-focus: 0 0 0 3px rgba(227, 24, 55, 0.25);

  /* ─── Radius: 4px Maximum ─── */
  /* 4px says "this is a tool" not "this is a design project."
     Buttons = 4px. Cards = 4px. Inputs = 4px. The only exception 
     is the phone badge (rounded-full) to distinguish it visually. */
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-full: 9999px;

  /* ─── Spacing: Tight & Energetic ─── */
  /* 4/8px grid. This brand does NOT breathe — it hustles.
     Card padding: 12px (not 24px). Section gaps: 32px (not 80px).
     Density signals volume. Volume signals choice. Choice signals trust. */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* ─── Typography: Inter Only ─── */
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', 'Courier New', monospace;

  /* Type scale — fluid, tight, purposeful */
  --type-hero: clamp(2.25rem, 4vw + 0.5rem, 3.5rem);
  --type-h1: clamp(1.5rem, 2.5vw + 0.25rem, 2.25rem);
  --type-h2: clamp(1.25rem, 2vw + 0.25rem, 1.75rem);
  --type-h3: clamp(1.125rem, 1.5vw + 0.25rem, 1.5rem);
  --type-body: clamp(0.9375rem, 0.5vw + 0.75rem, 1rem);
  --type-sm: 0.875rem;
  --type-xs: 0.75rem;
  --type-mono: 0.9375rem;

  /* ─── Transitions: Fast & Responsive ─── */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 150ms;
  --duration-normal: 250ms;

  /* ─── Layout ─── */
  --content-width: min(1200px, 100% - 32px);
  --content-narrow: min(600px, 100% - 32px);
}
```

### Where the Existing Code Needs to Change

| Current (`tokens.css`) | Brand-Approved | Reason |
|------------------------|---------------|--------|
| `--primary: #E63946` | `#E31837` | Slightly warmer, more confident red |
| `--navy: #1D3557` | **Remove entirely** | Navy says "bank." Ling says "chaos." |
| `--bg: #FEFCF8` | `#FFFFFF` | Cream says "curated." White says "here's the info." |
| `--bg-alt: #F5F0EB` | `#F3F4F6` | Neutral gray, not warm beige |
| `--font-display: DM Serif Display` | **Remove entirely** | Serif says "literary." Ling says "no time for that." |
| `--radius-lg: 12px` | `4px` max | Soft corners say "comfort." Sharp corners say "efficiency." |
| `--shadow-sm` on cards | **No shadows on cards** | Shadows pretend to be important. Cards aren't. |
| `--space-20: 80px` | `--space-16: 64px` max | This brand doesn't have 80px to spare. |

---

## 3. Typography System

### Font Stack

```css
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', 'Courier New', monospace;
```

**No serif. No display font. No decorative typefaces.**

The reasoning:
- **Inter** at all weights — Black for hero, Bold for headings, Regular for body, Medium for buttons
- **JetBrains Mono** for pricing, terms, and anywhere numbers need to align vertically
- **Why only two fonts?** Every typeface change is a cognitive speed bump. At the density this brand operates at, consistency is speed. Speed is trust.

### Type Scale with Purpose

| Token | Usage | Size | Weight | Leading | Tracking |
|-------|-------|------|--------|---------|----------|
| `--type-hero` | Hero headline (one per page) | `clamp(2.25rem, 4vw+0.5rem, 3.5rem)` | **900** (Black) | 1.05 | `-0.02em` |
| `--type-h1` | Section headings | `clamp(1.5rem, 2.5vw+0.25rem, 2.25rem)` | **800** (ExtraBold) | 1.1 | `-0.01em` |
| `--type-h2` | Card headings, sub-sections | `clamp(1.25rem, 2vw+0.25rem, 1.75rem)` | **700** (Bold) | 1.15 | `normal` |
| `--type-h3` | Small card titles, labels | `clamp(1.125rem, 1.5vw+0.25rem, 1.5rem)` | **600** (SemiBold) | 1.2 | `normal` |
| `--type-body` | Main text, descriptions | `clamp(0.9375rem, 0.5vw+0.75rem, 1rem)` | **400** (Regular) | 1.5 | `normal` |
| `--type-sm` | Secondary info, nav links | `0.875rem` | **500** (Medium) | 1.4 | `normal` |
| `--type-xs` | Fine print, metadata | `0.75rem` | **400** (Regular) | 1.3 | `normal` |
| `--type-mono` | Prices, terms, data | `0.9375rem` | **500** (Medium) | 1.3 | `normal` |

### Typography Rules

1. **One hero headline per page.** Not per section. PER PAGE. The hero headline is the only thing that gets Black weight.
2. **Never use font-weight 300 or 400 for headings.** Thin/semi-bold headings say "designery." Ling's headings are statements, not suggestions.
3. **Mono for ALL pricing data.** `font-variant-numeric: tabular-nums` so £249/mo aligns vertically when listed in columns.
4. **No uppercase headings.** Uppercase = shouting. Ling is loud enough without typography screaming.
5. **Body text max-width: 65ch.** Readability is the only place this brand gets generous.

---

## 4. Layout Architecture

### Grid Philosophy

| Grid | When to Use | Column Width |
|------|-------------|--------------|
| **1-column** | Hero, testimonials, CTAs, forms | Full width (content constrained to 600px or 65ch) |
| **2-column** | Feature splits, content + sidebar | `minmax(300px, 1fr)` |
| **3-column** | Deal cards, trust metrics, process steps | `minmax(280px, 1fr)` |
| **4-column** | Footer links, brand logos | `minmax(200px, 1fr)` |
| **Full-bleed** | Hero background, video sections, Ling's face | Edge-to-edge with inner container |

### Vertical Rhythm

Sections should alternate pace, not just backgrounds:

1. **Hero** — The hook. Full-bleed red background OR full-bleed image of Ling. High energy. 64px padding top/bottom.
2. **Trust bar** — Thin. 32px padding. Just the rating. A breath after the hero punch.
3. **Deals** — The core product. 3-column grid. Dense. 48px section padding.
4. **How it works** — 3-step narrative. 48px section padding. Every step gets equal visual weight.
5. **Quote form** — 48px section padding. Narrow container. Focus on the conversion.
6. **Footer** — 48px padding. All links. No "about us" essay.

**Section padding scale:** 32px (tight), 48px (standard), 64px (hero only).

### Content Width

- **Standard content:** `min(1200px, 100% - 32px)` — wide enough for 3 deal cards, tight enough to not lose the user
- **Narrow content:** `min(600px, 100% - 32px)` — forms, single-column narratives
- **Full-bleed:** No max-width, but inner content respects standard width

### Whitespace as a Design Element

This brand uses space FUNCTIONALLY, not aesthetically:
- Space separates distinct content blocks (deal cards need separation to be scannable)
- Space does NOT create "breathing room" or "elegance" (those are anti-brand concepts)
- Dense sections feel intentional when the grid is consistent
- The ONE place for generous space is around the hero headline — because if people don't read that, nothing else matters

---

## 5. Component Design — Before / After / Why

### 5.1 Hero

**Before (current code):**
```html
<header class="hero" style="background: linear-gradient(135deg, var(--navy) 0%, #23456B 100%)">
```
Navy gradient. Serif headline. Generic car photo from Unsplash. "Get Sorted" / "Browse Deals" buttons. Feels like a SaaS startup.

**After:**
```html
<header class="hero">
  <div class="hero-content container">
    <div class="hero-text">
      <p class="hero-badge">★ 4.8/5 on Trustpilot</p>
      <h1 class="hero-title">
        We find you the cheapest car lease.<br>
        We show you our margin.<br>
        <span class="hero-highlight">You save money. Done.</span>
      </h1>
      <p class="hero-subtitle">15 years. Thousands of deals. Every single margin shown to you. We make money, you save. Nobody's hiding anything.</p>
      <div class="hero-cta">
        <a href="#quote" class="btn btn-primary">Get a Quote — It's Free</a>
        <a href="#how-it-works" class="btn btn-ghost">How This Works →</a>
      </div>
    </div>
    <div class="hero-visual">
      <!-- NOT a stock photo. A candid, real photo of Ling. 
           Or better: Ling's face photoshopped onto a car. 
           Or a screenshot of a deal. Real content, real person. -->
    </div>
  </div>
</header>
```

**Styles:**
```css
.hero {
  padding-block: var(--space-16);
  background-color: var(--bg);
  border-bottom: 1px solid var(--border);
}

.hero-title {
  font-family: var(--font-body);
  font-size: var(--type-hero);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--text-heading);
}

.hero-highlight {
  color: var(--primary);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--type-sm);
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: var(--space-4);
  padding: var(--space-1) var(--space-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
}
```

**Why:**
- **Red background removed** — Red hero sections say "sale event!" This brand is permanent. White background says "this is the page, not a promotion."
- **Serif removed** — Inter Black at 900 weight has more authority than any serif. It's tight, confident, and unapologetic.
- **Trustpilot badge** — Above the fold, before the headline. Social proof is the first thing a skeptical car buyer needs.
- **Three-line headline structure** — (1) What we do, (2) How we prove it, (3) What you get. It's a complete argument in 3 lines.
- **"Get a Quote — It's Free"** — Removes the anxiety of commitment. "It's Free" is the most powerful three-word phrase in conversion.
- **Real photo of Ling** — Stock photos destroy trust instantly. A real photo (even a bad one) of the actual person builds it.

### 5.2 Navigation

**Before (current code):**
```html
<nav class="nav">
  <div class="nav-inner container">
    <a href="/" class="nav-logo" style="font-family: serif;">LINGsCARS</a>
    <ul class="nav-links">
      <li><a href="#deals" class="nav-link">Deals</a></li>
      <li><a href="#how-it-works" class="nav-link">How It Works</a></li>
      <li><a href="#about" class="nav-link">About Ling</a></li>
      <li><a href="tel:0191" class="nav-phone">📞 0191 XXX XXXX</a></li>
    </ul>
  </div>
</nav>
```

**After:**
```html
<header class="header">
  <div class="header-inner container">
    <a href="/" class="header-logo">LINGsCARS</a>
    <nav class="header-nav" role="navigation" aria-label="Main">
      <a href="#deals" class="header-link">Deals</a>
      <a href="#how-it-works" class="header-link">How It Works</a>
      <a href="#about" class="header-link">About Ling</a>
      <a href="tel:0191" class="header-phone">0191 XXX XXXX</a>
      <a href="#quote" class="btn btn-primary header-cta">Get a Quote</a>
    </nav>
    <button class="header-toggle" aria-label="Menu">☰</button>
  </div>
</header>
```

**Why:**
- **Sticky** — Always visible. The CTA button is always one click away.
- **CTA in nav** — The "Get a Quote" button lives in the header. Users never have to scroll up to convert.
- **Inter only** — Logo uses Inter Black, same as hero. Consistency = speed.
- **Phone number prominent** — At this brand, calling Ling IS the conversion path. The phone number gets visual weight (border, distinct style).
- **Mobile: hamburger at 768px** — The nav links collapse. The CTA and phone number stay.

```css
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background-color: var(--bg);
  border-bottom: 1px solid var(--border);
  padding-block: var(--space-3);
}

.header-logo {
  font-family: var(--font-body);
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: var(--text-heading);
}

.header-logo:hover {
  color: var(--primary);
}

.header-nav {
  display: flex;
  align-items: center;
  gap: var(--space-6);
}

.header-link {
  font-size: var(--type-sm);
  font-weight: 500;
  color: var(--text-muted);
  padding-block: var(--space-1);
  border-bottom: 2px solid transparent;
  transition: all var(--duration-fast) var(--ease-out);
}

.header-link:hover {
  color: var(--text);
  border-bottom-color: var(--primary);
}

.header-phone {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: var(--type-sm);
  color: var(--primary);
  padding: var(--space-1) var(--space-3);
  border: 1px solid var(--primary);
  border-radius: var(--radius-full);
  transition: all var(--duration-fast) var(--ease-out);
}

.header-phone:hover {
  background-color: var(--primary);
  color: #FFFFFF;
}
```

### 5.3 Deal Cards

**Before (current code):**
```html
<article class="card">
  <img src="..." alt="BMW 3 Series" class="card-image">
  <div class="card-body">
    <h3>BMW 3 Series</h3>
    <p class="text-muted text-small">Business Lease</p>
    <div class="mono" style="font-size: var(--type-xl); font-weight: 700; color: var(--primary);">
      £289
      <span style="font-size: var(--type-xs);">/month ex. VAT</span>
    </div>
    <p class="text-xs text-muted">Initial rental: £1,734 · 48 months · 10,000 miles/year</p>
    <a href="#" class="btn btn-primary">Grab This Deal</a>
  </div>
</article>
```

Current card has: image (16:9), heading, lease type, price, details, CTA button. Shadow on hover. Image scales on hover.

**After:**
```html
<article class="deal-card">
  <div class="deal-card-badge">Best Value</div>
  <div class="deal-card-image">
    <img src="..." alt="BMW 3 Series" loading="lazy">
  </div>
  <div class="deal-card-body">
    <div class="deal-card-header">
      <h3 class="deal-card-title">BMW 3 Series</h3>
      <span class="deal-card-type">Business Lease</span>
    </div>
    <div class="deal-card-price">
      <span class="deal-card-amount">£289</span>
      <span class="deal-card-period">/month ex. VAT</span>
    </div>
    <dl class="deal-card-details">
      <div><dt>Initial</dt><dd>£1,734</dd></div>
      <div><dt>Term</dt><dd>48 mo</dd></div>
      <div><dt>Mileage</dt><dd>10k/yr</dd></div>
    </dl>
    <div class="deal-card-savings">
      <span class="deal-card-savings-badge">↓ £1,200 below market</span>
    </div>
    <a href="#" class="btn btn-primary deal-card-cta">Grab This Deal →</a>
  </div>
</article>
```

**Styles:**
```css
.deal-card {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition: border-color var(--duration-fast) var(--ease-out);
  position: relative;
}

.deal-card:hover {
  border-color: var(--primary);
}

.deal-card-badge {
  position: absolute;
  top: var(--space-2);
  left: var(--space-2);
  z-index: 1;
  background-color: var(--gold);
  color: #1A1A1A;
  font-size: var(--type-xs);
  font-weight: 700;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.deal-card-image img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
}

.deal-card-body {
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.deal-card-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-2);
}

.deal-card-title {
  font-size: var(--type-h3);
  font-weight: 700;
  color: var(--text-heading);
}

.deal-card-type {
  font-size: var(--type-xs);
  color: var(--text-muted);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.deal-card-price {
  display: flex;
  align-items: baseline;
  gap: var(--space-1);
}

.deal-card-amount {
  font-family: var(--font-mono);
  font-size: var(--type-h1);
  font-weight: 700;
  color: var(--primary);
  font-variant-numeric: tabular-nums;
}

.deal-card-period {
  font-size: var(--type-sm);
  color: var(--text-muted);
}

.deal-card-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-1);
  padding: var(--space-2) 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.deal-card-details div {
  text-align: center;
}

.deal-card-details dt {
  font-size: var(--type-xs);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.deal-card-details dd {
  font-family: var(--font-mono);
  font-size: var(--type-sm);
  font-weight: 600;
  color: var(--text);
  font-variant-numeric: tabular-nums;
}

.deal-card-savings {
  text-align: center;
}

.deal-card-savings-badge {
  font-size: var(--type-xs);
  font-weight: 700;
  color: var(--success);
}

.deal-card-cta {
  width: 100%;
}
```

**Why:**
- **Flat design, no shadow** — Cards sit on the page, they don't float. Shadow says "this is important." Cards are containers, not statements.
- **Red border on hover** — The only hover effect is a color change. Subtle, responsive, intentional. Red = "this one."
- **4:3 image ratio** — Wider than 16:9, shows more of the car. Cars are horizontal objects, 4:3 fits them better in a card context.
- **Gold badge** — "Best Value" gets the gold treatment. Gold = deal hunter's color. Used only for exceptional deals.
- **Savings callout** — The green "↓ £1,200 below market" is the trust moment. This is the margin transparency in action.
- **Details in definition list** — Semantic HTML. Each detail (Initial, Term, Mileage) is labeled and values use mono for alignment.
- **Denser padding** — 12px instead of 24px. More cards per viewport = more choices = more trust.

### 5.4 Forms

**Before (current code):**
```html
<form style="max-width: 480px; margin-inline: auto;">
  <div class="form-group">
    <label for="car" class="form-label">What car are you looking for?</label>
    <input type="text" id="car" class="form-input" placeholder="e.g. BMW 3 Series, VW Golf">
    <p class="form-helper">Any brand, any model. We'll find it.</p>
  </div>
  <div class="form-group">
    <label for="email" class="form-label">Your email</label>
    <input type="email" id="email" class="form-input" placeholder="you@example.com">
    <p class="form-helper">We'll send your quote here. No spam, ever.</p>
  </div>
  <button type="submit" class="btn btn-primary" style="width: 100%;">Get Sorted</button>
</form>
```

**After:**
```html
<form class="quote-form" novalidate>
  <div class="quote-form-field">
    <label for="car">What car are you after?</label>
    <input type="text" id="car" name="car" placeholder="e.g. BMW 3 Series" required>
    <span class="quote-form-hint">Any make, any model. If it exists, we'll find a deal.</span>
    <span class="quote-form-error" role="alert">Tell us what car you want — doesn't have to be exact.</span>
  </div>
  <div class="quote-form-field">
    <label for="budget">Monthly budget (optional)</label>
    <input type="text" id="budget" name="budget" placeholder="e.g. £300" inputmode="numeric">
    <span class="quote-form-hint">Helps us narrow it down. No budget? We'll show you the cheapest first.</span>
  </div>
  <div class="quote-form-field">
    <label for="email">Your email</label>
    <input type="email" id="email" name="email" placeholder="you@example.com" required>
    <span class="quote-form-hint">We'll send your quote here. No spam, Ling's word.</span>
    <span class="quote-form-error" role="alert">We need your email to send the quote. Promise we won't be weird about it.</span>
  </div>
  <button type="submit" class="btn btn-primary quote-form-submit">
    Get My Quote — Takes 2 Minutes
  </button>
  <p class="quote-form-footer">No spam. No calls from "the manager." Just Ling sorting you out.</p>
</form>
```

**Styles:**
```css
.quote-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.quote-form-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.quote-form-field label {
  font-size: var(--type-sm);
  font-weight: 600;
  color: var(--text-heading);
}

.quote-form-field input {
  width: 100%;
  height: 48px;
  padding: 0 var(--space-4);
  font-size: var(--type-body);
  color: var(--text);
  background-color: var(--bg);
  border: 2px solid var(--border);
  border-radius: var(--radius-md);
  transition: border-color var(--duration-fast) var(--ease-out);
  -webkit-appearance: none;
  appearance: none;
}

.quote-form-field input:focus {
  border-color: var(--primary);
  box-shadow: var(--shadow-focus);
  outline: none;
}

.quote-form-field input::placeholder {
  color: var(--text-disabled);
}

.quote-form-hint {
  font-size: var(--type-xs);
  color: var(--text-muted);
}

.quote-form-error {
  display: none;
  font-size: var(--type-xs);
  color: var(--error);
  font-weight: 500;
}

.quote-form-field input:user-invalid ~ .quote-form-error {
  display: block;
}

.quote-form-field input:user-invalid {
  border-color: var(--error);
}

.quote-form-submit {
  width: 100%;
  height: 52px;
  font-size: var(--type-body);
}

.quote-form-submit:active {
  transform: scale(0.98);
}

.quote-form-footer {
  font-size: var(--type-xs);
  color: var(--text-muted);
  text-align: center;
}
```

**Why:**
- **"What car are you after?"** — Conversational. "Looking for" is formal. "After" is what you'd say to a mate.
- **"Monthly budget (optional)"** — Added field. Budget helps Ling filter. "Optional" reduces friction — users can skip if unsure.
- **Error messages in brand voice** — "Tell us what car you want — doesn't have to be exact" sounds like Ling, not a validation library.
- **"Get My Quote — Takes 2 Minutes"** — Action-oriented (Get), personal (My), time-anchored (2 Minutes). Removes "how long will this take?" anxiety.
- **Red focus border** — Brand color used for focus state, not blue. Consistency.
- **48px input height** — Large enough for touch targets, not so large it feels empty.
- **2px border** — Thick enough to be visible, thin enough to not look like a child's coloring book.

### 5.5 CTAs

**Before:** "Get Sorted" / "Browse Deals" / "Grab This Deal" / "Get Sorted" (submit button)

**After:**

| Context | Button Text | Why |
|---------|-------------|-----|
| Hero primary | `Get a Quote — It's Free` | Removes price anxiety immediately |
| Hero secondary | `How This Works →` | For people who need proof before action |
| Deal card | `Grab This Deal →` | Kept from original — it works. Arrow adds forward momentum |
| Form submit | `Get My Quote — Takes 2 Minutes` | Time-boxes the commitment |
| Nav CTA | `Get a Quote` | Short, always accessible |
| Sticky mobile bar | `Get a Quote` | Full-width, always visible |

**Button styles:**
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-weight: 600;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
  white-space: nowrap;
  font-size: var(--type-sm);
}

.btn-primary {
  background-color: var(--primary);
  color: #FFFFFF;
  border-color: var(--primary);
}

.btn-primary:hover {
  background-color: var(--primary-hover);
  border-color: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: none;
}

.btn-ghost {
  background-color: transparent;
  color: var(--text);
  border-color: var(--border);
}

.btn-ghost:hover {
  border-color: var(--text);
  background-color: var(--bg);
}
```

**Why:**
- Every CTA answers "what happens when I click?" — no ambiguity
- No button says "Submit" (it's a server action, not a user benefit)
- No button says "Learn More" (it's a stall tactic)
- Primary buttons get the red. Ghost buttons get the border. Hierarchy is clear.

### 5.6 Footer

**Before (current code):**
Navy background. White text. Serif logo. Four-column grid. Legal links.

**After:**
```css
.footer {
  background-color: #1A1A1A;  /* Near-black, not navy */
  color: var(--text-on-dark);
  padding-block: var(--space-12);
  border-top: 4px solid var(--primary);  /* Red accent line — brand signature */
}

.footer-logo {
  font-family: var(--font-body);
  font-size: 1.25rem;
  font-weight: 900;
  color: var(--text-on-dark);
  letter-spacing: -0.02em;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--space-8);
}

.footer-tagline {
  font-size: var(--type-sm);
  color: var(--text-on-dark-muted);
  max-width: 30ch;
}

.footer-heading {
  font-size: var(--type-xs);
  font-weight: 700;
  color: var(--text-on-dark-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: var(--space-4);
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.footer-links a {
  font-size: var(--type-sm);
  color: var(--text-on-dark);
  opacity: 0.75;
  transition: opacity var(--duration-fast) var(--ease-out);
}

.footer-links a:hover {
  opacity: 1;
  text-decoration: underline;
}

.footer-bottom {
  margin-top: var(--space-8);
  padding-top: var(--space-6);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--type-xs);
  color: rgba(255, 255, 255, 0.5);
}

.footer-bottom a {
  color: inherit;
  text-decoration: underline;
}
```

**Why:**
- **Near-black, not navy** — Navy is corporate. Near-black is "we mean business." Also makes the red accent line pop.
- **Red top border** — Brand signature. A 4px red line at the top says "Ling was here." It's the closing signature on the page.
- **No serif** — Logo uses Inter Black, same as header. Consistency.
- **Denser spacing** — 48px not 64px. The footer is navigation, not a "brand experience."
- **No social media icons** — Links are text. Icons are decorative. This brand doesn't decorate.
- **Trustpilot in footer** — A "★★★★★ 4.8/5 Trustpilot" line in the footer bottom reinforces trust at the exit point.

---

## 6. Micro-Interactions & Motion

### Philosophy
- **Fast:** 150ms for hover/focus. 250ms for transitions. This brand doesn't have time for 400ms animations.
- **Subtle:** If someone has to ask "did it animate?" it's perfect. If they notice the animation, it's too much.
- **Accessible:** `prefers-reduced-motion: reduce` disables ALL animations. Not optional.

### Hover States

| Element | Hover Effect | Duration | Why |
|---------|-------------|----------|-----|
| Nav link | Underline slides in from left | 150ms | Wayfinding feedback, not entertainment |
| Deal card | Border turns red | 150ms | Subtle "this one" signal |
| Primary button | Lifts 1px, adds shadow | 150ms | Tactile — feels pressable |
| Ghost button | Border darkens | 150ms | Feedback without hierarchy change |
| Phone number | Background fills red | 150ms | Encourages click — calling is conversion |

### Transitions

```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);     /* Arriving — fast start, smooth end */
--duration-fast: 150ms;
--duration-normal: 250ms;
```

- **ease-out for everything** — Elements appear/change quickly and decelerate naturally. Like a drawer closing.
- **No ease-in** — Slow starts feel hesitant. This brand doesn't hesitate.
- **No bounce** — Bounce says "playful." This brand is direct, not playful.

### Scroll Animations

```css
.reveal {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 400ms var(--ease-out),
              transform 400ms var(--ease-out);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

- **12px, not 20+px** — Subtle movement, not dramatic entrance
- **400ms, not 600+ms** — Fast enough to not delay reading
- **Stagger: 80ms delay** — Quick cascade, not a slow wave
- **Threshold: 0.15** — Triggers earlier, so content is visible before user reaches it

### Loading States

```css
.skeleton {
  background: linear-gradient(90deg, var(--border) 25%, var(--bg-alt) 50%, var(--border) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: var(--radius-md);
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

No spinner. No "Loading..." text. Just a subtle shimmer that communicates "content is coming" without anxiety.

### Focus States

```css
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(227, 24, 55, 0.3);
  border-radius: var(--radius-sm);
}
```

- **Red focus ring** — Brand color, not browser-default blue
- **Only on :focus-visible** — Keyboard users get it, mouse users don't
- **3px, semi-transparent** — Visible enough for accessibility, subtle enough to not dominate

---

## 7. Copy Integration

### Tone of Voice Applied

| Element | Current Copy | Brand-Aligned Copy |
|---------|-------------|-------------------|
| Hero H1 | "Car Leasing Without the BS." | "We find you the cheapest car lease. We show you our margin. You save money. Done." |
| Hero subtitle | "A real person. Real deals. Real simple. We'll find you a deal that makes sense." | "15 years. Thousands of deals. Every single margin shown to you. We make money, you save. Nobody's hiding anything." |
| Deals heading | "Sorted Deals, Not Sorted Search Results." | "Our Margin. Your Saving. Pick One." |
| How it works heading | "Three Steps. That's It." | "Three Steps. One Phone Call. Done." |
| Form heading | "Get Your Sorted Quote" | "Want a Quote? Takes 2 Minutes." |
| Nav deals link | "Deals" | "Deals" (keep — it's clear) |
| CTA button | "Get Sorted" | "Get a Quote — It's Free" |
| Trust bar | "Trusted by 15,000+ people across the UK" | "15,000+ People Sorted. 4.8 ★★★★★ on Trustpilot." |
| Card CTA | "Grab This Deal" | "Grab This Deal →" (works — keep, add arrow) |
| Footer tagline | "Car leasing without the BS. A real person, real deals, real simple." | "Real person. Real deals. Real margin. Real simple." |
| Form helper | "No spam, ever." | "No spam. No calls from 'the manager.' Just Ling." |

### Section Headings as a Narrative

When read in sequence, the section headings tell a complete story:

1. **Hero:** "We find you the cheapest car lease. We show you our margin. You save money. Done."
2. **Trust:** "15,000+ People Sorted. 4.8 ★★★★★ on Trustpilot."
3. **Deals:** "Our Margin. Your Saving. Pick One."
4. **How it works:** "Three Steps. One Phone Call. Done."
5. **Quote:** "Want a Quote? Takes 2 Minutes."

This is a complete argument: **Here's what we do → Here's proof → Here's the product → Here's how it works → Here's where to start.**

### Empty States

| Context | Message |
|---------|---------|
| No search results | "Nothing matched that. Ling's got 15,000+ deals though — try something else." |
| Failed form submission | "Something went wrong. Ling's on it. Try again in a sec." |
| No deals in category | "We don't have that right now, but we can find it. Drop your details below." |

No "Sorry." No "Oops." No apologetic language. Just helpful redirection.

---

## 8. Design Principles (Hard Rules)

### 1. Restraint
- **3 colors maximum per viewport** — Red (CTA), white (bg), charcoal (text). Gold only for deal badges. Green only for savings.
- **No illustrations.** Photos of Ling, real cars, real deals. Nothing drawn.
- **No icons** except functional ones (phone, arrow, star for ratings).
- **If it doesn't help someone find a deal faster, cut it.**

### 2. Consistency
- **One font family** (Inter) for everything except pricing (JetBrains Mono).
- **One border radius** (4px) for everything except pills (9999px for phone badge).
- **One red** (--primary) for all CTAs. Never blue buttons, never green buttons, never gray buttons that should be red.
- **One interaction language** — hover = border/color change. Not slide, not lift, not glow. Just color.

### 3. Purpose
- **Every element answers a question:** "What car?" "How much?" "Can I trust this?" "What do I do next?"
- **If an element doesn't answer one of those questions, it doesn't belong.**
- **Density is a feature** — but only when the grid is consistent. Chaos within structure.

### 4. Emotion
- **First 3 seconds:** Relief. "Oh, this is straightforward. They show the price. They show the margin. No hidden anything."
- **Next 10 seconds:** Trust. "15,000 reviews. 4.8 stars. A real person runs this. I can call them."
- **Next 30 seconds:** Action. "I know what to do. Get a quote. It's free. Takes 2 minutes."
- **Every element should reinforce at least one of these emotional stages.**

### 5. Craft
- **Type:** Tight tracking on headlines (-0.02em). Loose leading on body (1.5). Headlines are tight, body is breathable.
- **Red:** #E31837 specifically. Not #FF0000. Not #CC0000. This exact red was chosen because it has a slight orange warmth that reads as "friendly urgency" not "fire alarm."
- **White:** #FFFFFF. Not #FAFAFA. Not #FEFCF8. Pure white maximizes contrast with the red and creates the cleanest stage for dense content.
- **4px radius:** Not 2px (too sharp for a service business). Not 6px (too soft for a no-nonsense brand). 4px is the exact point where "tool" meets "approachable."
- **Borders:** #E5E7EB creates separation at 1px without creating visual noise. It's the lightest gray that still does the job.

---

## 9. Implementation Priority

### Phase 1 — Quick Wins (Do First)

| # | Change | Files | Effort | Impact |
|---|--------|-------|--------|--------|
| 1 | Update `--primary` to `#E31837` | `tokens.css` | 5 min | High — colors affect everything |
| 2 | Remove `--font-display`, `--navy`, cream bg | `tokens.css` | 10 min | High — fixes brand misalignment |
| 3 | Add CTA button to nav | `index.html`, `components.css` | 15 min | High — increases conversions |
| 4 | Update radius tokens to 4px max | `tokens.css` | 5 min | Medium — visual consistency |
| 5 | Remove card shadows, use border | `components.css` | 10 min | Medium — brand alignment |
| 6 | Update hero headline copy | `index.html` | 5 min | High — first impression |
| 7 | Update form submit button text | `index.html` | 2 min | High — conversion wording |
| 8 | Add Trustpilot badge above hero | `index.html` | 10 min | High — social proof above fold |

### Phase 2 — Structural Changes

| # | Change | Files | Effort | Impact |
|---|--------|-------|--------|--------|
| 9 | Tighten spacing (use space-3/4 instead of space-6/8) | `components.css`, `index.html` | 30 min | Medium — density alignment |
| 10 | Replace stock photos with real Ling/car images | `index.html` | varies | High — authenticity |
| 11 | Update deal cards to new spec (4:3, savings badge, details grid) | `components.css`, `index.html` | 1 hr | High — core product |
| 12 | Add sticky mobile CTA bar | `index.html`, `components.css` | 30 min | High — mobile conversion |
| 13 | Compress images, lazy-load, WebP | `index.html` + build step | 30 min | High — performance |
| 14 | Update hero layout (remove gradient, add trust badge) | `components.css`, `index.html` | 20 min | High — first impression |

### Phase 3 — Polish

| # | Change | Files | Effort | Impact |
|---|--------|-------|--------|--------|
| 15 | Add scroll animations with reduced-motion support | `components.css`, `index.html` | 15 min | Medium — delight |
| 16 | Implement skeleton loading states | `components.css` | 20 min | Medium — perceived performance |
| 17 | Add focus-visible styles globally | `base.css` | 5 min | High — accessibility |
| 18 | Audit all copy for brand voice alignment | `index.html` | 20 min | High — trust |
| 19 | Responsive audit (320px-1440px) | All | 1 hr | High — mobile is majority |
| 20 | Performance budget: <2s load, <100kb CSS | Build/config | varies | High — Core Web Vitals |

---

## Appendix: Before/After Visual Comparison

### Navigation
- **Before:** Serif logo, navy-on-cream, no CTA, phone hidden, generous padding
- **After:** Inter Black logo, isolated nav with border-bottom, "Get a Quote" CTA, stylized phone badge, tight padding
- **Why:** Logo should match type system. CTA should always be visible. Phone should feel clickable. White space says "empty" — tight says "we're busy finding you deals."

### Hero
- **Before:** Navy gradient background, serif headline, stock car photo, "Get Sorted" CTA, generous padding
- **After:** White background, Inter Black headline with red highlight line, real photo of Ling, "Get a Quote — It's Free" CTA, Trustpilot badge above headline, tighter padding
- **Why:** Navy background says "sale event" (temporary). White says "this is the brand" (permanent). Stock photo says "we're like everyone else." Real photo says "you're dealing with a human."

### Deal Cards
- **Before:** Soft shadow, 12px radius, serif heading, image scales on hover, 24px padding
- **After:** 1px border, 4px radius, Inter heading, border turns red on hover, 12px padding, added savings badge, added details grid
- **Why:** Shadows say "look at me" (pretentious). Borders say "here's the container" (functional). Dense layout shows more deals = more options = more trust.

### Form
- **Before:** "What car are you looking for?" / "Get Sorted" / standard validation
- **After:** "What car are you after?" / added budget field / "Get My Quote — Takes 2 Minutes" / brand-voice validation errors / red focus border
- **Why:** Conversational language builds rapport. Budget field reduces follow-up emails. Time-anchored CTA reduces hesitation. Red focus border = consistency.
