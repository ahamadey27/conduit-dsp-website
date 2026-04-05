# Conduit DSP — Website Specification
> For use with Claude Code / VS Code build. Reference aesthetic: https://aberrantdsp.com/ — minimal, dark, product-first.

---

## 1. Project Overview

| Field | Value |
|---|---|
| Brand | Conduit DSP |
| Domain | conduitdsp.com |
| Stack | Vanilla HTML + CSS + JS (no framework) |
| Purpose | Minimal audio plugin web store |
| Tone | Dark, sparse, technical — audio professional aesthetic |

---

## 2. File & Folder Structure

```
conduit-dsp/
├── index.html                          ← Home
├── plugins/
│   ├── index.html                      ← Plugins listing page
│   ├── robin-control/
│   │   └── index.html                  ← Robin Control detail page
│   └── robin-control-lite/
│       └── index.html                  ← Robin Control Lite detail page
├── updates/
│   └── index.html                      ← Updates page
├── account/
│   └── index.html                      ← Login / Register page
├── faq/
│   └── index.html                      ← FAQ page (stub)
├── privacy-policy/
│   └── index.html                      ← Privacy Policy page (stub)
├── assets/
│   ├── css/
│   │   ├── reset.css                   ← CSS reset / normalize
│   │   ├── global.css                  ← Design tokens, typography, layout utilities
│   │   ├── header.css                  ← Header + nav styles
│   │   ├── footer.css                  ← Footer styles
│   │   ├── cart.css                    ← Cart widget styles
│   │   └── pages/
│   │       ├── home.css
│   │       ├── plugins.css
│   │       ├── plugin-detail.css
│   │       ├── updates.css
│   │       └── account.css
│   ├── js/
│   │   ├── cart.js                     ← Cart state, add/remove, currency logic
│   │   ├── nav.js                      ← Dropdown menu, mobile nav toggle
│   │   └── updates.js                  ← Accordion expand/collapse for updates page
│   └── images/
│       ├── logo.png                    ← 200×55px, transparent background PNG
│       ├── plugin-robin-control.png    ← 800×500px PNG — plugin GUI screenshot
│       ├── plugin-robin-control-lite.png ← 800×500px PNG — plugin GUI screenshot
│       └── banner-about.jpg            ← 1440×500px JPEG — About section banner
```

> **Placeholder image notes:**
> All four images in `assets/images/` are placeholders. Use solid-color rectangles with centered label text until final artwork is provided. Suggested placeholder colors: `#1a1a1a` bg with `#555` label text. The two plugin PNGs are reused across the home cards, plugins listing, and plugin detail pages — only one file swap needed per plugin when real art arrives.

---

## 3. Design System & Global Styles (`global.css`)

### 3.1 Color Tokens
```css
:root {
  --bg-primary:     #0e0e0e;   /* Page background */
  --bg-secondary:   #181818;   /* Card / section backgrounds */
  --bg-elevated:    #222222;   /* Hover states, inputs */
  --border:         #2a2a2a;   /* Subtle dividers */
  --text-primary:   #f0f0f0;   /* Body copy */
  --text-muted:     #888888;   /* Secondary labels, captions */
  --text-dim:       #555555;   /* Disabled / placeholder */
  --accent:         #c8f04a;   /* Primary CTA — bright lime green (per Aberrant DSP palette) */
  --accent-hover:   #b0d93a;   /* Accent on hover */
  --danger:         #e05555;   /* Errors */
  --white:          #ffffff;
}
```

> Note: If the brand has specific hex values from a logo or style guide, replace `--accent` accordingly.

### 3.2 Typography
```css
/* Import via Google Fonts or self-host */
/* Display / Headings: "Space Mono" or "IBM Plex Mono" — technical, audio-gear feel */
/* Body: "Inter" or "DM Sans" — clean, readable */

--font-display: 'IBM Plex Mono', monospace;
--font-body:    'DM Sans', sans-serif;

/* Scale */
--text-xs:   0.75rem;    /* 12px */
--text-sm:   0.875rem;   /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg:   1.125rem;   /* 18px */
--text-xl:   1.25rem;    /* 20px */
--text-2xl:  1.5rem;     /* 24px */
--text-3xl:  2rem;       /* 32px */
--text-4xl:  2.75rem;    /* 44px */
```

### 3.3 Spacing
```css
--space-1:  0.25rem;
--space-2:  0.5rem;
--space-3:  0.75rem;
--space-4:  1rem;
--space-6:  1.5rem;
--space-8:  2rem;
--space-12: 3rem;
--space-16: 4rem;
--space-24: 6rem;
```

### 3.4 Layout
```css
--max-width: 1200px;     /* Site max-width container */
--header-height: 80px;   /* Fixed header height */
--border-radius: 4px;    /* Very subtle rounding — keep it sharp */
```

### 3.5 Base Rules
- `body` background: `var(--bg-primary)`
- `body` color: `var(--text-primary)`
- All `<a>` tags: no underline by default, inherit color; underline on hover unless styled otherwise
- `*` box-sizing: `border-box`
- Images: `max-width: 100%`, `display: block`

---

## 4. Header Component (`header.css`, `nav.js`)

The header is **fixed to the top** of the viewport at all times. Full-width, borderline on the bottom (`1px solid var(--border)`), background `var(--bg-primary)` with subtle backdrop blur.

### 4.1 Structure
```
┌──────────────────────────────────────────────────────────────────┐
│  [LOGO]                                                [CART]    │
│  Home  Plugins ▾  Updates  Account                              │
└──────────────────────────────────────────────────────────────────┘
```

### 4.2 Logo
- `<a href="/">` wrapping `<img src="/assets/images/logo.png" alt="Conduit DSP">`
- Positioned top-left of the header container
- Height: `40px`, width auto
- Margin-bottom: `var(--space-2)` separating it from nav

### 4.3 Navigation Bar
- Sits **below the logo**, left-aligned
- `<nav>` contains a `<ul>` with `<li>` items
- Nav items: `Home`, `Plugins`, `Updates`, `Account`
- Font: `var(--font-body)`, size `var(--text-sm)`, weight `500`, uppercase, letter-spacing `0.08em`
- Color: `var(--text-muted)` default; `var(--text-primary)` on hover; `var(--accent)` for active page
- No background on nav items; no box/pill styling
- Spacing between items: `var(--space-8)` horizontal gap

#### Plugins Dropdown
- Trigger: hover over `Plugins` nav item (or click on mobile)
- A `<div class="dropdown-menu">` appears absolutely positioned below the `Plugins` link
- Dropdown background: `var(--bg-secondary)`, border: `1px solid var(--border)`
- Dropdown width: `200px`
- Two items stacked vertically:
  - `Robin Control` → `href="/plugins/robin-control/"`
  - `Robin Control Lite` → `href="/plugins/robin-control-lite/"`
- Each item: `padding: var(--space-3) var(--space-4)`, font-size `var(--text-sm)`, color `var(--text-muted)`, hover color `var(--text-primary)`, hover background `var(--bg-elevated)`
- Dropdown appears with a 150ms `opacity` + `translateY(4px)` CSS transition
- Implemented via CSS `:hover` on a parent `.nav-item--has-dropdown` plus JS for keyboard/touch support

### 4.4 Cart Widget (right side of header)
- Floated / flexed to the **far right** of the header, vertically centered with nav
- Three elements left-to-right:
  1. **Total price** — `<span id="cart-total">$0.00</span>` — font `var(--font-display)`, size `var(--text-sm)`, color `var(--text-primary)`
  2. **Currency dropdown** — `<select id="currency-select">` with options: USD, EUR, GBP, CAD. Styled minimally: no visible border, `var(--bg-secondary)` bg, `var(--text-muted)` color, `var(--text-sm)` size, small arrow
  3. **Item count badge** — `<span id="cart-count">0</span>` — circular badge, background `var(--accent)`, color `#000`, size `20px`, font-size `var(--text-xs)`, font-weight `700`. Hidden (display none) when count is 0
- Entire cart widget is clickable (links to a cart drawer or cart page — scaffold as a stub click handler for now)

### 4.5 Header HTML Skeleton
```html
<header class="site-header">
  <div class="site-header__inner container">

    <div class="site-header__top">
      <a href="/" class="site-logo">
        <img src="/assets/images/logo.png" alt="Conduit DSP">
      </a>
      <div class="cart-widget">
        <span id="cart-total">$0.00</span>
        <select id="currency-select">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="CAD">CAD</option>
        </select>
        <span id="cart-count" class="cart-count hidden">0</span>
      </div>
    </div>

    <nav class="site-nav" aria-label="Main navigation">
      <ul class="site-nav__list">
        <li class="nav-item"><a href="/">Home</a></li>
        <li class="nav-item nav-item--has-dropdown">
          <a href="/plugins/">Plugins</a>
          <div class="dropdown-menu">
            <a href="/plugins/robin-control/">Robin Control</a>
            <a href="/plugins/robin-control-lite/">Robin Control Lite</a>
          </div>
        </li>
        <li class="nav-item"><a href="/updates/">Updates</a></li>
        <li class="nav-item"><a href="/account/">Account</a></li>
      </ul>
    </nav>

  </div>
</header>
```

---

## 5. Footer Component (`footer.css`)

Full-width footer at the bottom of every page. Background: `var(--bg-secondary)`, top border: `1px solid var(--border)`. Padding: `var(--space-12) 0`.

### 5.1 Layout
Two-column flex row, left-aligned, with the columns separated by adequate spacing:
```
┌──────────────────────────────────────────────┐
│  INFO                    CONNECT             │
│  FAQ                     [FB] [IG] [YT] [TT] │
│  Contact Us                                  │
│  Privacy Policy                              │
│                                              │
│  © 2025 Conduit DSP LLC. All rights reserved.│
└──────────────────────────────────────────────┘
```

### 5.2 Info Column
- Heading: `INFO` — font `var(--font-display)`, size `var(--text-xs)`, letter-spacing `0.15em`, color `var(--text-dim)`, uppercase
- Links list (no bullets):
  - `FAQ` → `/faq/`
  - `Contact Us` → `mailto:hello@conduitdsp.com`
  - `Privacy Policy` → `/privacy-policy/`
- Link styles: `var(--text-sm)`, color `var(--text-muted)`, hover color `var(--text-primary)`
- Row spacing: `var(--space-3)` between each link

### 5.3 Connect Column
- Heading: `CONNECT` — same style as INFO heading
- Four social icons side-by-side with `var(--space-4)` gap
  - Facebook, Instagram, YouTube, TikTok
  - Use SVG icons inline (or a small icon font like Lucide / Feather)
  - Icon size: `20px × 20px`
  - Color: `var(--text-muted)`, hover color `var(--accent)`
  - `href="#"` for all four — placeholder, links to be added later
  - Each icon wrapped in `<a aria-label="[Platform]" target="_blank" rel="noopener">`

### 5.4 Copyright Line
- Below both columns, full-width, centered or left-aligned
- Font: `var(--text-xs)`, color `var(--text-dim)`
- Text: `© 2025 Conduit DSP LLC. All rights reserved.`

---

## 6. Page Specifications

---

### 6.1 Home Page (`index.html`)

**Page title:** `Conduit DSP — Audio Plugins`

#### Section 1: Plugin Cards Grid
- Section tag: `<section class="home-plugins">`
- Heading: none — cards go right into the content area below the header
- Top padding: `var(--space-16)` (offset for fixed header)
- Layout: CSS Grid, `repeat(auto-fill, minmax(280px, 1fr))`, gap `var(--space-8)`
- Max-width container centered

**Each plugin card (`<article class="plugin-card">`):**
```
┌──────────────────────────┐
│                          │
│   [plugin PNG image]     │  ← links to plugin detail page
│                          │
│   Robin Control          │  ← <h2>, links to plugin detail page
│   $49.00                 │  ← <span class="price">
│   [ADD TO CART]          │  ← <button class="btn btn--add-cart">
└──────────────────────────┘
```
- Card background: `var(--bg-secondary)`
- Card border: `1px solid var(--border)`, border-radius: `var(--border-radius)`
- Card hover: border color shifts to `var(--accent)` (transition 150ms)
- **Image:** `<a href="/plugins/robin-control/">` wrapping `<img src="/assets/images/plugin-robin-control.png">`, object-fit `cover`, height `220px`, width `100%`
- **Plugin name:** `<h2>` inside `<a>`, font `var(--font-display)`, size `var(--text-lg)`, color `var(--text-primary)`, margin-top `var(--space-4)`, no underline
- **Price:** `<span class="price">`, font `var(--font-display)`, size `var(--text-base)`, color `var(--text-muted)`
- **Add to Cart button:**
  - `<button class="btn btn--add-cart" data-product-id="robin-control" data-price="49.00" data-name="Robin Control">`
  - Text: `Add to Cart`
  - Style: background `var(--accent)`, color `#000`, font `var(--font-body)`, weight `600`, size `var(--text-sm)`, uppercase, letter-spacing `0.06em`, padding `var(--space-3) var(--space-6)`, width `100%`, border `none`, cursor `pointer`
  - Hover: background `var(--accent-hover)`
  - On click: triggers `cart.js` `addToCart()` function

**Cards to include:**
1. Robin Control — `$49.00` — image: `plugin-robin-control.png` — link: `/plugins/robin-control/`
2. Robin Control Lite — `Free` — image: `plugin-robin-control-lite.png` — link: `/plugins/robin-control-lite/`
  - For Lite: button text changes to `Get for Free`, accent style same but perhaps outline variant

#### Section 2: About Section
- Section tag: `<section class="home-about">`
- Top border: `1px solid var(--border)`
- Margin-top: `var(--space-24)`

**Banner image:**
- `<img src="/assets/images/banner-about.jpg" alt="About Conduit DSP" class="about-banner">`
- Full width of the container, height `400px`, object-fit `cover`, display block

**Text block (below banner):**
- Padding: `var(--space-12) 0`
- Max-width: `680px` (readable line length)
- Three short paragraphs of placeholder/gibberish text (see placeholder copy below)
- Font: `var(--font-body)`, size `var(--text-base)`, line-height `1.7`, color `var(--text-muted)`

**Placeholder About copy:**
```
Conduit DSP was founded with one goal: to build tools that get out of your way and let the music happen. 
We make plugins for producers, engineers, and sound designers who value precision over presets.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et 
dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

Every plugin we ship is tested obsessively, built to last, and priced to be accessible. We are a small 
operation and we intend to stay that way — focused, intentional, and always listening.
```

---

### 6.2 Plugins Listing Page (`/plugins/index.html`)

**Page title:** `Plugins — Conduit DSP`

#### Layout
- Top padding below fixed header: `var(--space-16)`
- Container max-width centered

#### Header Block
```html
<div class="plugins-header">
  <h1>Plugins</h1>
  <p class="plugins-subtext">
    Our plugins are available in VST3, AU, and AAX formats at 64-bit.<br>
    VST3 and AAX for Windows and macOS, AU for macOS only.
  </p>
</div>
```
- `<h1>` font: `var(--font-display)`, size `var(--text-4xl)`, color `var(--text-primary)`, margin-bottom `var(--space-3)`
- `<p>` font: `var(--font-body)`, size `var(--text-sm)`, color `var(--text-muted)`, line-height `1.6`
- Bottom border: `1px solid var(--border)`, margin-bottom `var(--space-12)`

#### Plugin Grid
- CSS Grid: `repeat(2, 1fr)`, gap `var(--space-8)` — two plugins side by side (matches "rows of two" spec)
- On mobile (≤768px): single column

**Each card:**
- Identical structure to the Home page plugin cards, with one addition:
  - **Short description** text between plugin name and price
  - Robin Control: `"Advanced round robin sample management and articulation control."`
  - Robin Control Lite: `"Free round robin sampling, no strings attached."`
  - Description style: `var(--font-body)`, size `var(--text-sm)`, color `var(--text-dim)`, margin `var(--space-2) 0`
- Clicking image OR plugin name links to the respective plugin detail page
- `Add to Cart` button does NOT navigate — only triggers cart JS
- Entire card except Add to Cart button is clickable to the plugin page (implement via JS `click` propagation or wrap in relative-positioned anchor with the button `position: relative; z-index: 1`)

---

### 6.3 Plugin Detail Page — Robin Control (`/plugins/robin-control/index.html`)

**Page title:** `Robin Control — Conduit DSP`

**Page layout** (single-column, centered, max-width `800px`):

#### 1. Hero Image
```html
<img 
  src="/assets/images/plugin-robin-control.png" 
  alt="Robin Control plugin interface" 
  class="plugin-detail__hero"
>
```
- Width: `100%`, max-height `500px`, object-fit `contain` (show full GUI, no crop)
- Background behind image: `var(--bg-secondary)` (letterboxing effect if image is narrower)
- Margin-bottom: `var(--space-8)`

#### 2. Plugin Header Block
```html
<div class="plugin-detail__header">
  <h1 class="plugin-detail__name">Robin Control</h1>
  <p class="plugin-detail__tagline">Advanced round robin sample management and articulation control.</p>
  <div class="plugin-detail__price">$49.00</div>
  <button class="btn btn--add-cart btn--lg" 
          data-product-id="robin-control" 
          data-price="49.00" 
          data-name="Robin Control">
    Add to Cart
  </button>
</div>
```
- `<h1>`: font `var(--font-display)`, size `var(--text-3xl)`, color `var(--text-primary)`
- Tagline: `var(--font-body)`, size `var(--text-lg)`, color `var(--text-muted)`
- Price: `var(--font-display)`, size `var(--text-2xl)`, color `var(--text-primary)`, margin `var(--space-4) 0`
- Add to Cart button: same as card button but slightly larger (`btn--lg` variant adds padding)

#### 3. YouTube Video Embed
```html
<div class="plugin-detail__video">
  <iframe 
    width="100%" 
    height="450" 
    src="https://www.youtube.com/embed/PLACEHOLDER_VIDEO_ID" 
    title="Robin Control Demo" 
    frameborder="0" 
    allowfullscreen>
  </iframe>
</div>
```
- Wrapped in a `div` with `aspect-ratio: 16/9` and `width: 100%`
- Margin: `var(--space-12) 0`
- Border: `1px solid var(--border)`

#### 4. Description Paragraphs
- Two paragraphs of placeholder body copy
- Font: `var(--font-body)`, size `var(--text-base)`, line-height `1.75`, color `var(--text-muted)`
- Max-width: `680px`

**Placeholder copy:**
```
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. 
Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.

Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. 
Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia.
```

#### 5. Feature List
```html
<div class="plugin-detail__features">
  <h3>Description:</h3>
  <ul>
    <li>Lorem ipsum feature point one with a brief explanation</li>
    <li>Sed ut perspiciatis unde omnis iste natus error</li>
    <li>Nemo enim ipsam voluptatem quia voluptas sit</li>
    <li>Ut labore et dolore magnam aliquam quaerat</li>
    <li>Quis autem vel eum iure reprehenderit</li>
    <li>At vero eos et accusamus et iusto odio</li>
    <li>Nam libero tempore cum soluta nobis eligendi</li>
    <li>Temporibus autem quibusdam et aut officiis</li>
    <li>Itaque earum rerum hic tenetur a sapiente</li>
    <li>Quis nostrum exercitationem ullam corporis</li>
  </ul>
</div>
```
- `<h3>` "Description:" — font `var(--font-display)`, size `var(--text-base)`, color `var(--text-primary)`, margin-bottom `var(--space-4)`
- `<ul>` list-style: `"— "` (em dash), color `var(--accent)`, padding-left `var(--space-4)`
- `<li>` font: `var(--font-body)`, size `var(--text-sm)`, color `var(--text-muted)`, line-height `1.7`, margin-bottom `var(--space-2)`

---

### 6.4 Plugin Detail Page — Robin Control Lite (`/plugins/robin-control-lite/index.html`)

**Page title:** `Robin Control Lite — Conduit DSP`

Identical structure to the Robin Control detail page above, with these differences:
- Plugin name: `Robin Control Lite`
- Tagline: `Free round robin sampling, no strings attached.`
- Price displayed as: `Free`
- Add to Cart button: text `Get for Free` — use outline button variant (`border: 2px solid var(--accent)`, background transparent, color `var(--accent)`)
- Hero image: `/assets/images/plugin-robin-control-lite.png`
- YouTube `src`: `https://www.youtube.com/embed/PLACEHOLDER_LITE_VIDEO_ID`
- Separate placeholder copy for paragraphs and feature list (same lorem ipsum structure, different wording)

---

### 6.5 Updates Page (`/updates/index.html`)

**Page title:** `Updates — Conduit DSP`

#### Layout
- Top padding below header: `var(--space-16)`
- Container max-width centered, max `860px`

#### Header Block
```html
<div class="updates-header">
  <h1>Plugin Updates</h1>
  <p>All updates are available from <strong>My Account &gt; Downloads</strong>.</p>
</div>
```
- `<h1>`: font `var(--font-display)`, size `var(--text-3xl)`, color `var(--text-primary)`, margin-bottom `var(--space-3)`
- `<p>`: font `var(--font-body)`, size `var(--text-sm)`, color `var(--text-muted)`
- Bottom border: `1px solid var(--border)`, margin-bottom `var(--space-12)`

#### Accordion Items
One accordion per plugin. Implemented with `<details>` / `<summary>` HTML elements for native expand/collapse with zero JS (progressively enhanced with JS animation if desired).

```html
<details class="update-accordion" open>
  <summary class="update-accordion__trigger">
    <span class="update-accordion__name">Robin Control</span>
    <span class="update-accordion__arrow">▾</span>
  </summary>
  <div class="update-accordion__content">
    <table class="update-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Version / Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>MM/DD/YYYY</td>
          <td>
            <strong>v1.0</strong><br>
            – Initial release<br>
            – Lorem ipsum fix for edge case on Windows<br>
            – Minor UI label changes
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</details>

<details class="update-accordion">
  <summary class="update-accordion__trigger">
    <span class="update-accordion__name">Robin Control Lite</span>
    <span class="update-accordion__arrow">▾</span>
  </summary>
  <div class="update-accordion__content">
    <table class="update-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Version / Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>MM/DD/YYYY</td>
          <td>
            <strong>v1.0</strong><br>
            – Initial release
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</details>
```

**Accordion styles:**
- `<details>` border-bottom: `1px solid var(--border)`, margin-bottom `var(--space-4)`
- `<summary>` cursor `pointer`, list-style `none` (remove default triangle), padding `var(--space-4) 0`, display flex, justify-content space-between, align-items center
- `.update-accordion__name`: font `var(--font-display)`, size `var(--text-lg)`, color `var(--text-primary)`
- `.update-accordion__arrow`: color `var(--text-muted)`, transition `transform 200ms`; rotate `180deg` when `[open]`
- Content: padding `var(--space-4) 0 var(--space-8)`

**Table styles:**
- Width `100%`
- Border-collapse `collapse`
- `<th>`: font `var(--font-display)`, size `var(--text-xs)`, uppercase, letter-spacing `0.1em`, color `var(--text-dim)`, text-align left, border-bottom `1px solid var(--border)`, padding `var(--space-2) var(--space-4) var(--space-2) 0`
- `<td>`: font `var(--font-body)`, size `var(--text-sm)`, color `var(--text-muted)`, padding `var(--space-3) var(--space-4) var(--space-3) 0`, vertical-align top, border-bottom `1px solid var(--border)`
- Date column width: `120px` (fixed), no-wrap
- Alternating row background: `var(--bg-secondary)` on odd rows (stripe effect)

---

### 6.6 Account Page (`/account/index.html`)

**Page title:** `My Account — Conduit DSP`

#### Layout
- Top padding below header: `var(--space-16)`
- Container max-width: `800px`, centered

#### Page Header
```html
<h1 class="account-title">My Account</h1>
```
- Font: `var(--font-display)`, size `var(--text-3xl)`, color `var(--text-primary)`, margin-bottom `var(--space-12)`
- Bottom border: `1px solid var(--border)`

#### Two-Column Layout
Side-by-side flex row with `var(--space-12)` gap. On mobile (≤768px): stack vertically.

**Left column — Login:**
```html
<div class="account-panel">
  <h2>Login</h2>
  <div class="form-group">
    <label for="login-email">Email Address</label>
    <input type="email" id="login-email" placeholder="you@example.com">
  </div>
  <div class="form-group">
    <label for="login-password">Password</label>
    <input type="password" id="login-password" placeholder="••••••••">
  </div>
  <div class="form-group form-group--inline">
    <input type="checkbox" id="remember-me">
    <label for="remember-me">Remember me</label>
  </div>
  <button class="btn btn--primary" type="button">Login</button>
  <a href="#" class="account-panel__forgot">Don't know your password?</a>
</div>
```

**Right column — Register:**
```html
<div class="account-panel">
  <h2>Register</h2>
  <div class="form-group">
    <label for="reg-email">Email Address</label>
    <input type="email" id="reg-email" placeholder="you@example.com">
  </div>
  <div class="form-group">
    <label for="reg-password">Password</label>
    <input type="password" id="reg-password" placeholder="••••••••">
  </div>
  <div class="form-group">
    <!-- Human verification widget placeholder -->
    <div class="captcha-placeholder">
      [ reCAPTCHA / hCaptcha widget — add script when integrating Lemon Squeezy ]
    </div>
  </div>
  <button class="btn btn--primary" type="button">Register</button>
</div>
```

**Panel styles (`.account-panel`):**
- `<h2>`: font `var(--font-display)`, size `var(--text-xl)`, color `var(--text-primary)`, margin-bottom `var(--space-6)`
- Background: none (transparent), no card box — flat form on dark background
- `<label>`: font `var(--font-body)`, size `var(--text-xs)`, uppercase, letter-spacing `0.08em`, color `var(--text-muted)`, display block, margin-bottom `var(--space-2)`
- `<input>`: width `100%`, background `var(--bg-elevated)`, border `1px solid var(--border)`, border-radius `var(--border-radius)`, padding `var(--space-3) var(--space-4)`, font `var(--font-body)`, size `var(--text-sm)`, color `var(--text-primary)`, outline none; focus border-color `var(--accent)`
- `.form-group`: margin-bottom `var(--space-5)`
- `.form-group--inline`: display flex, align-items center, gap `var(--space-3)`; checkbox input is natural size, label has normal weight
- `.account-panel__forgot`: display block, margin-top `var(--space-4)`, font size `var(--text-xs)`, color `var(--text-muted)`, text-decoration underline, hover color `var(--text-primary)`
- `.captcha-placeholder`: background `var(--bg-secondary)`, border `1px dashed var(--border)`, padding `var(--space-6)`, text-align center, color `var(--text-dim)`, font `var(--font-body)`, size `var(--text-xs)`

---

### 6.7 FAQ Page (`/faq/index.html`) — Stub

**Page title:** `FAQ — Conduit DSP`

Minimal stub page. Single heading + placeholder content.

```html
<div class="container page-stub">
  <h1>FAQ</h1>
  <p>Frequently asked questions coming soon.</p>
</div>
```

---

### 6.8 Privacy Policy Page (`/privacy-policy/index.html`) — Stub

**Page title:** `Privacy Policy — Conduit DSP`

Minimal stub page.

```html
<div class="container page-stub">
  <h1>Privacy Policy</h1>
  <p>Privacy policy content coming soon.</p>
</div>
```

---

## 7. JavaScript Specifications

### 7.1 `cart.js` — Cart State & Logic

**State object (in-memory, no localStorage):**
```js
const cart = {
  items: [],       // [{ id, name, price, qty }]
  currency: 'USD',
  exchangeRates: { USD: 1, EUR: 0.92, GBP: 0.79, CAD: 1.36 }
};
```

**Functions to implement:**
- `addToCart(productId, name, price)` — Add item or increment qty if already in cart
- `removeFromCart(productId)` — Remove item by ID
- `getTotalUSD()` — Sum of all items × qty in USD
- `getConvertedTotal()` — Apply `exchangeRates[cart.currency]` to USD total
- `updateCartUI()` — Update `#cart-total` inner text and `#cart-count` badge. Hide badge if count is 0
- `handleCurrencyChange(e)` — On `<select>` change, update `cart.currency` and re-run `updateCartUI()`

**Event bindings:**
- On DOMContentLoaded: bind all `.btn--add-cart` buttons to `addToCart()` using `data-product-id`, `data-price`, `data-name` attributes
- Bind `#currency-select` `change` event to `handleCurrencyChange()`

**Currency display format:**
```js
// Example: $49.00 / €45.08 / £38.71 / CA$66.64
const symbols = { USD: '$', EUR: '€', GBP: '£', CAD: 'CA$' };
```

### 7.2 `nav.js` — Dropdown & Mobile Nav

- On DOMContentLoaded: find `.nav-item--has-dropdown`
- **Desktop:** Dropdown opens on `mouseenter` parent, closes on `mouseleave` with a 100ms delay (prevents accidental close on cursor micro-movement)
- **Keyboard:** Toggle dropdown on `Enter` / `Space` on the Plugins link; close on `Escape`
- **Mobile** (≤768px): Add a hamburger button `☰` to the header right area. Clicking it toggles `.site-nav` `display: block/none`. Entire nav moves into a vertical drawer.
- Dropdown arrow CSS class `.nav-item--open` rotates the ▾ character `180deg`

### 7.3 `updates.js` — Accordion Enhancement (Optional)

- The `<details>`/`<summary>` elements work natively with zero JS
- Optional progressive enhancement: add smooth `max-height` CSS transition by toggling a class on `<details>` open state
- Rotate the `.update-accordion__arrow` span on open/close

---

## 8. Reusable Button Variants

Define all button variants in `global.css`:

```css
.btn {
  display: inline-block;
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  cursor: pointer;
  border: none;
  border-radius: var(--border-radius);
  transition: background 150ms, color 150ms, border-color 150ms;
}

/* Primary — filled accent */
.btn--primary {
  background: var(--accent);
  color: #000;
}
.btn--primary:hover { background: var(--accent-hover); }

/* Add to Cart — same as primary, full width on cards */
.btn--add-cart {
  background: var(--accent);
  color: #000;
  width: 100%;
  text-align: center;
}
.btn--add-cart:hover { background: var(--accent-hover); }

/* Outline — for free products */
.btn--outline {
  background: transparent;
  border: 2px solid var(--accent);
  color: var(--accent);
}
.btn--outline:hover {
  background: var(--accent);
  color: #000;
}

/* Large variant */
.btn--lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-base);
}
```

---

## 9. Responsive Breakpoints

| Breakpoint | Width | Behavior |
|---|---|---|
| Mobile | ≤ 480px | Single column everything; hamburger nav; stacked header |
| Tablet | 481px – 768px | Single column cards; nav still hamburger |
| Desktop | ≥ 769px | Full layout; dropdown nav; multi-column grids |

Apply breakpoints in each CSS file using `@media (max-width: 768px)` blocks.

---

## 10. Shared HTML Boilerplate

Every page uses this shell:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PAGE TITLE — Conduit DSP</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/reset.css">
  <link rel="stylesheet" href="/assets/css/global.css">
  <link rel="stylesheet" href="/assets/css/header.css">
  <link rel="stylesheet" href="/assets/css/footer.css">
  <link rel="stylesheet" href="/assets/css/cart.css">
  <link rel="stylesheet" href="/assets/css/pages/PAGE.css"> <!-- page-specific -->
</head>
<body>

  <!-- HEADER (same on all pages) -->
  <header class="site-header">…</header>

  <!-- MAIN CONTENT -->
  <main class="main-content">
    <!-- page content here -->
  </main>

  <!-- FOOTER (same on all pages) -->
  <footer class="site-footer">…</footer>

  <script src="/assets/js/cart.js"></script>
  <script src="/assets/js/nav.js"></script>
  <!-- page-specific scripts if needed -->
</body>
</html>
```

---

## 11. Image Asset Summary

| File | Format | Dimensions | Notes |
|---|---|---|---|
| `assets/images/logo.png` | PNG (transparent) | 200 × 55px | Header logo, links to `/` |
| `assets/images/plugin-robin-control.png` | PNG | 800 × 500px | Reused: home card, plugins listing, detail hero |
| `assets/images/plugin-robin-control-lite.png` | PNG | 800 × 500px | Reused: home card, plugins listing, detail hero |
| `assets/images/banner-about.jpg` | JPEG | 1440 × 500px | Home page About section only |

**Placeholder generation suggestion:** Create solid `#1a1a1a` rectangles at the above dimensions with centered `var(--text-dim)` label text using any image editor or a quick HTML canvas script. Swap with real assets when available — no other code changes needed.

---

## 12. Build Notes for Claude Code

- **No build tools required.** Pure HTML/CSS/JS. Open `index.html` directly in browser or use VS Code Live Server extension.
- **No external dependencies** beyond Google Fonts CDN link.
- **Cart state is in-memory only** — resets on page reload. Lemon Squeezy integration will replace this later.
- **Account page is a UI stub.** No form submission logic — Lemon Squeezy customer portal will handle auth.
- **YouTube embeds** use placeholder video IDs. Replace `PLACEHOLDER_VIDEO_ID` with real IDs when available.
- **Social links** in footer all use `href="#"` — replace with real URLs when available.
- When building, start with: `global.css` → `header` → `footer` → `home` → `plugins` → `plugin detail` → `updates` → `account`.

---

## 13. Misc
- Color text for logo: #243C4C