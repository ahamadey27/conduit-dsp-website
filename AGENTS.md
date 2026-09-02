# AGENTS.md

This is the live Codex guidance for the Conduit DSP website repository.

Read [`CONDUIT_DSP_CONTEXT.md`](CONDUIT_DSP_CONTEXT.md) before company-, product-, marketing-, commerce-, privacy-, or cross-repository work. It contains the dated shared context, source-precedence rules, active repository map, and open decisions. Inspect current code/live state before acting because the shared brief is intentionally a snapshot.

`CLAUDE.md` and `spec.md` are legacy implementation references. Their dark/lime Aberrant DSP design, in-memory-cart description, account assumptions, format claims, and $49 public-price assumption are stale. Do not let them override this file, `CONDUIT_DSP_CONTEXT.md`, or current code.

## Project

Conduit DSP's live static website and store:

- Pure vanilla HTML, CSS, and JavaScript
- GitHub Pages hosting; Namecheap is domain/DNS
- No package manager, build step, or test framework
- Google Fonts are the only CSS dependency
- Lemon Squeezy handles checkout/file delivery
- MailerLite handles newsletter/waitlist email
- A separate Cloudflare Worker syncs Lemon Squeezy orders to MailerLite

## Current design system

The current warm implementation is authoritative:

- Backgrounds: `#F5F3F0`, `#F0ECE8`
- Primary text: `#2A2520`
- Teal accent: `#2D7A7A` (some CTA rules use `#1F5C5C`)
- Display font: DM Serif Display
- Body font: DM Sans
- Logo font: IBM Plex Sans
- Max-width: 1200px
- Small/sharp radii

Preserve the waveform geometry in `assets/images/logo.svg` unless Alex explicitly asks to change it.

## Product truth

### Robin Control Lite

- Public and free
- 20-slot monophonic sampler triggered by any MIDI key
- Public formats: macOS VST3/AU and Windows VST3
- AAX is not publicly available
- v1.0.1 exists in the active plugin repo; confirm its storefront publication before changing site version copy
- Authoritative local repo: `/Users/alex/Documents/Github/robin-control-redesign`

### Robin Control

- Active commercial product in development, not merely a thin planned upgrade
- Public website status: Coming Soon; price intentionally hidden
- Do not publish $49 or a release date without Alex confirming the offer
- Authoritative local repo: `/Users/alex/Documents/Github/round-robin-premium`

## Key files and behavior

```
index.html
plugins/index.html
plugins/robin-control/index.html
plugins/robin-control-lite/index.html
updates/index.html
cart/index.html
account/index.html                 # hidden, nonfunctional legacy stub
faq/index.html
privacy-policy/index.html
eula/robin-control-lite/index.html
assets/css/
assets/js/cart.js
assets/js/nav.js
assets/js/waitlist.js              # active Robin Control inline waitlist forms
assets/js/cookie-banner.js
assets/images/
```

- Cart persists under `conduit_cart_v1` in localStorage.
- Currency conversion is display-only and uses static USD/EUR/GBP/CAD rates.
- Checkout opens the first configured Lemon Squeezy product; there is no true multi-item checkout.
- Robin Control Lite has a live configured Lemon Squeezy URL.
- The account page does not authenticate and must not be described as a working account system.
- Robin Control waitlist forms are active on the homepage, Plugins page, and Robin Control detail page. They submit to MailerLite form `197334966677275966`, which adds confirmed subscribers to the `Robin Control Waitlist` group.

## Privacy and marketing constraints

Do not add Meta Pixel, advertising scripts, new analytics, or new purchaser-to-marketing flows without first reconciling:

- Published privacy-policy disclosure
- Consent behavior
- Marketing opt-in requirements
- Third-party processor list

Current implementation:

- GA4 loads only after the visitor chooses **Allow analytics**.
- The banner offers **Allow analytics** and **No thanks**, and stores that preference locally.
- The privacy policy discloses Google Analytics, GitHub Pages hosting, Namecheap domain/DNS, Cloudflare integration infrastructure, MailerLite, and Lemon Squeezy.
- Meta Pixel and behavioral advertising scripts are not in use.
- The checkout-to-MailerLite bridge does not itself enforce explicit marketing opt-in; revisit consent/lawful-basis handling before relying on it for paid or EU customer marketing.

Treat privacy/legal copy as high-stakes. Research current requirements and flag counsel review when changing it.

## Shared-shell rule

Header, footer, tracking, cookie banner, cart widget, fonts, and social links are duplicated across pages. When changing shared shell content, search every HTML file and verify every occurrence. Do not assume `spec.md` contains current boilerplate.

## Verification

For website changes:

1. Inspect `git status` and preserve unrelated work.
2. Search all relevant pages with `rg`.
3. Serve/open the static site or inspect representative pages at desktop and mobile widths.
4. Exercise any changed form/cart/nav behavior.
5. Re-run copy/claim searches for product formats, versions, pricing, privacy, and account language.
