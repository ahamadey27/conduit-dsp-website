# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Conduit DSP — a minimal, dark, product-first audio plugin web store. Pure vanilla HTML + CSS + JS, no frameworks. Reference aesthetic: https://aberrantdsp.com/

## Development

- **No build tools, package manager, or test framework.** Open HTML files directly in browser or use VS Code Live Server.
- **No external dependencies** beyond Google Fonts CDN (IBM Plex Mono + DM Sans).
- Full spec lives in `spec.md` — always refer to it for detailed styling, HTML structure, and component specs.

## Build Order

Follow this sequence: `global.css` → `header` → `footer` → `home` → `plugins listing` → `plugin detail pages` → `updates` → `account` → `faq/privacy stubs`

## File Structure

```
index.html                        ← Home
plugins/index.html                ← Plugins listing
plugins/robin-control/index.html  ← Robin Control detail
plugins/robin-control-lite/index.html ← Robin Control Lite detail
updates/index.html                ← Updates (accordion + tables)
account/index.html                ← Login / Register (UI stub)
faq/index.html                    ← FAQ (stub)
privacy-policy/index.html         ← Privacy Policy (stub)
assets/css/reset.css              ← CSS reset
assets/css/global.css             ← Design tokens, typography, buttons, layout
assets/css/header.css             ← Fixed header + nav + dropdown
assets/css/footer.css             ← Footer styles
assets/css/cart.css               ← Cart widget styles
assets/css/pages/home.css
assets/css/pages/plugins.css
assets/css/pages/plugin-detail.css
assets/css/pages/updates.css
assets/css/pages/account.css
assets/js/cart.js                 ← Cart state (in-memory), add/remove, currency conversion
assets/js/nav.js                  ← Dropdown menu, mobile hamburger nav
assets/js/updates.js              ← Optional accordion animation enhancement
assets/images/                    ← Placeholder images (solid #1a1a1a rectangles with label text)
```

## Key Design Decisions

- **Color palette:** Dark theme — `#0e0e0e` bg, `#c8f04a` lime-green accent, muted grays for text hierarchy. Full token list in spec §3.1.
- **Typography:** IBM Plex Mono (headings/display), DM Sans (body). Loaded via Google Fonts.
- **Layout:** Max-width `1200px` container, `80px` fixed header, `4px` border-radius (keep sharp).
- **Responsive breakpoints:** Mobile ≤480px, Tablet 481–768px, Desktop ≥769px. Hamburger nav on mobile/tablet.

## Products

| Plugin | Price | Image | Slug |
|---|---|---|---|
| Robin Control | $49.00 | plugin-robin-control.png | robin-control |
| Robin Control Lite | Free | plugin-robin-control-lite.png | robin-control-lite |

- Lite uses outline button variant ("Get for Free") instead of filled accent.

## JavaScript Notes

- **Cart:** In-memory only (resets on reload). Currency conversion with static rates (USD/EUR/GBP/CAD). Lemon Squeezy integration will replace this later.
- **Account page:** UI stub only — no form submission. Lemon Squeezy customer portal handles auth.
- **YouTube embeds:** Use `PLACEHOLDER_VIDEO_ID` / `PLACEHOLDER_LITE_VIDEO_ID` — replace when real IDs available.
- **Social links:** All `href="#"` — replace with real URLs later.

## Shared HTML Boilerplate

Every page uses the same shell defined in spec §10 — consistent `<head>` with Google Fonts preconnect, shared CSS files, shared header/footer, and cart.js + nav.js scripts.
