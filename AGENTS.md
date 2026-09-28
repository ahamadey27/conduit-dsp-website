# AGENTS.md

This is the live Codex guidance for the Conduit DSP website repository.

Read [`CONDUIT_DSP_CONTEXT.md`](CONDUIT_DSP_CONTEXT.md) before company-, product-, marketing-, commerce-, privacy-, or cross-repository work. It contains the dated shared context, source-precedence rules, active repository map, and open decisions. Inspect current code/live state before acting because the shared brief is intentionally a snapshot.

`CLAUDE.md` points agents to this guidance. `spec.md` is a superseded historical reference: its dark/lime design, in-memory cart, account assumptions, format claims, and $49 price are not current requirements. Read [`MOONBASE_MIGRATION.md`](MOONBASE_MIGRATION.md) before commerce, account, licensing, or email-integration changes; [`integrations.md`](integrations.md) maps the current wiring.

## Project

Conduit DSP's live static website and store:

- Pure vanilla HTML, CSS, and JavaScript
- GitHub Pages hosting; Namecheap is domain/DNS
- No package manager, build step, or test framework
- Google Fonts are the only CSS dependency
- Moonbase embedded storefront handles cart, accounts, checkout and downloads; the visual refresh and storefront were authorized for production launch on September 28, 2026
- September 22, 2026: embedded widget implemented in the redesign worktree for tenant `https://conduitdsp.moonbase.sh`
- MailerLite handles newsletter/waitlist email
- A separate Cloudflare Worker is documented as syncing Lemon Squeezy orders to MailerLite; its deployment was last verified July 25
- September 22 customer migration is complete: 180 imported customers own RCL after 179 new perpetual licenses were imported and one existing owner was skipped; Moonbase shows 181 customers/owners including the other existing test account
- Alex confirmed the migrated data is syncing to MailerLite. Preserve the native integration and original subscriber group; do not repeat the successful license import

## Current design system

The warm implementation is authoritative. The `codex/visual-refresh` worktree contains the September 28 production launch recorded in [`DESIGN_NOTES.md`](DESIGN_NOTES.md). Inspect local CSS and current live state before changing tokens. Baseline values:

- Backgrounds: `#F5F3F0`, `#F0ECE8`
- Primary text: `#2A2520`
- Teal accent: `#2D7A7A` (some CTA rules use `#1F5C5C`)
- Display font: DM Serif Display
- Body font: DM Sans
- Logo font: IBM Plex Sans
- Max-width: 1200px
- Small/sharp radii

Brand tagline: **A shorter path from idea to sound** appears quietly in the footer. September 22 direction: open the homepage with the products, without a tagline hero, supporting slogan, or “Made for your next idea” label. Do not restore retired slogans or the abstract orbit graphic. Mention controlled parameter randomization for both products. Robin Control summaries also include its 40-slot Pool, two 20-slot Ponds, FS Mode, and Auto-Chop.

Preserve the waveform geometry in `assets/images/logo.svg` unless Alex explicitly asks to change it.

## Product truth

### Robin Control Lite

- Public and free
- 20-slot monophonic sampler triggered by any MIDI key
- Moonbase release verified September 28: Mac v2.0.0 installer active with VST3/AU/AAX for macOS 11+ on Apple Silicon/Intel; Windows v2.0.0 installer active with 64-bit VST3/AAX for Windows 10/11
- Highlight AAX for Pro Tools on Mac and Windows, sample-pool playback feedback, and the interface scaling button in v2.0.0 notes
- v2.0.0 uses Moonbase activation: 10 devices, 90-day online validation grace, separate permanent offline activation; this supersedes the older no-DRM assumption
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
account/index.html                 # Moonbase account/download entry points
faq/index.html
privacy-policy/index.html
eula/robin-control-lite/index.html
assets/css/
assets/js/storefront.js            # shared Moonbase integration
assets/js/nav.js
assets/js/waitlist.js              # active Robin Control inline waitlist forms
assets/js/cookie-banner.js
assets/images/
```

- Moonbase owns cart persistence, price/currency handling and customer sessions. Legacy `cart.js` is no longer loaded; `conduit_cart_v1` is neither replayed nor deleted.
- Lite maps to product `robin-control-lite`, variation `free`, at $0. Never expose admin keys in frontend code.
- The account page uses Moonbase UI; do not restore the old stub forms.
- Robin Control waitlist forms are active on the homepage, Plugins page, and Robin Control detail page. They submit to MailerLite form `197334966677275966`, which adds confirmed subscribers to the `Robin Control Waitlist` group.

## Moonbase migration rules

- Continue in `.worktrees/visual-refresh` on `codex/visual-refresh`; preserve the existing uncommitted visual work.
- Distinguish the integrated local worktree and saved Moonbase settings from the still-undeployed production website. Read `integrations.md` for current state and remaining verification.
- Use the shared embedded storefront integration. The linked `moonbase-cpp` repository is for plugin activation; website setup uses a separate JavaScript integration. Sources and alternatives are in the migration plan.
- Keep one commerce state across pages when implementing; do not leave the legacy local cart and the new storefront competing.
- Keep Moonbase as the only authentication UI. Do not publish a paid RC offer, price, or release date during a provider migration.
- Preserve the existing 50%-off RC waitlist promise and direct MailerLite forms until replacements are verified.
- Native email integration is connected and Alex confirmed post-migration sync. The completed customer CSV used `newsletter=yes` for 177 source records marked Subscribed, with two Unsubscribed and one Bounced left blank, at Alex's explicit direction. Blank preferences do not revoke existing consent. Do not infer every consent/conflict edge case was tested. API keys belong in service configuration, never static files.
- Do not re-import the completed 179-license CSV: license imports can create duplicates. Check current ownership before any future grant. Keep customer CSVs, email lists and import tooling outside this public website repository.
- The local checkout test exposed conflicting embedded and hosted customer sessions. Clearing the older hosted login corrected prefill; Alex completed checkout and verified ownership. Keep mixed-session testing on the launch checklist rather than assuming production fixes it.
- Alex confirmed Moonbase for storefront and all product licensing. Lite settings are now verified; do not infer Robin Control activation policy from Lite. Inspect the premium repository before changing it.
- Document cross-repository follow-up for the old Worker and plugin licensing; inspect those repositories before changing them.

## Privacy and marketing constraints

Do not add Meta Pixel, advertising scripts, new analytics, or new purchaser-to-marketing flows without first reconciling:

- Published privacy-policy disclosure
- Consent behavior
- Marketing opt-in requirements
- Third-party processor list

Current implementation:

- GA4 loads only after the visitor chooses **Allow analytics**.
- The banner offers **Allow analytics** and **No thanks**, and stores that preference locally.
- The privacy policy discloses Google Analytics, GitHub Pages hosting, Namecheap domain/DNS, Cloudflare integration infrastructure, MailerLite, Moonbase (including activation data), and historical Lemon Squeezy services.
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

For documentation-only changes, check links, current-versus-planned wording, and `git diff --check`; confirm runtime files were not changed. Browser verification is required when implementation changes, not for planning notes alone.
