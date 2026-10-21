# AGENTS.md

This is the live Codex guidance for the Conduit DSP website repository.

## Active workspace — October 21, 2026

Alex authorized committing, merging and publishing the Robin Control storefront on October 21 and confirmed enabling purchasing in Moonbase. Launch preparation is in **`/Users/alex/Documents/Github/conduit-dsp-website/.worktrees/robin-control-storefront`**, branch **`codex/robin-control-storefront`**. Preserve existing work. The root `main` checkout is the GitHub Pages production checkout. Do not resume `.worktrees/visual-refresh`.

Keep the active worktree for follow-up edits; after publication, `main` contains the reviewed launch changes. The preview at `http://127.0.0.1:8765/` serves this worktree. [integrations.md](integrations.md) records launch verification and [MOONBASE_COMMON_WORKFLOW.md](MOONBASE_COMMON_WORKFLOW.md) contains reusable procedures.

Read [`CONDUIT_DSP_CONTEXT.md`](CONDUIT_DSP_CONTEXT.md) before company-, product-, marketing-, commerce-, privacy-, or cross-repository work. It contains the dated shared context, source-precedence rules, active repository map, and open decisions. Inspect current code/live state before acting because the shared brief is intentionally a snapshot.

`CLAUDE.md` points agents to this guidance. `spec.md` is a superseded historical reference: its dark/lime design, in-memory cart, account assumptions, format claims, and $49 price are not current requirements. Read [`MOONBASE_MIGRATION.md`](MOONBASE_MIGRATION.md) before commerce, account, licensing, or email-integration changes; [`integrations.md`](integrations.md) maps the current wiring.

## Moonbase operating instructions

Read [`MOONBASE_COMMON_WORKFLOW.md`](MOONBASE_COMMON_WORKFLOW.md) for step-by-step Moonbase tasks, including enabling purchasing, coordinating a website launch, changing prices, and creating limited-duration discount codes.

When explaining or completing another basic Moonbase workflow, add or update its instructions in that file. Include the dashboard navigation, relevant fields, save steps, and how to verify success. Check current UI or official documentation, date configuration snapshots, and label anything not yet tested. Keep reusable steps there and dated implementation history in `integrations.md`; do not duplicate the full procedures in `AGENTS.md`. Keep customer data, private codes, and credentials outside this public repository.

The guide describes how to perform actions; it does not authorize them. Alex authorized the October 21 launch and confirmed enabling Robin Control purchasing. The RC waitlist forms are removed, the general newsletter remains, and the paid offer uses Moonbase. Earlier October 5 purchasing-off notes are historical.

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

The main project folder on `main` is the production baseline for the September 28 redesign and September 30 accessibility updates; the active workspace above contains the current follow-up work. The older `.worktrees/visual-refresh` checkout is retained for reference, not the default workspace. See [`DESIGN_NOTES.md`](DESIGN_NOTES.md). Inspect local CSS and current live state before changing tokens. Current values:

- Backgrounds: `#F6F3ED`, `#EEE9E0`
- Primary text: `#2A2520`
- Teal accent: `#2D7A7A` (some CTA rules use `#1F5C5C`)
- Headings: DM Sans; DM Serif Display for occasional accents
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

- Commercial Robin Control 1.0.2 launch authorized October 21; Moonbase purchasing is enabled.
- $39 USD one-time perpetual offer; no storewide discount or comparison price.
- macOS 13+ (Apple Silicon/Intel): VST3/AU/AAX. Windows 10/11 (64-bit): VST3/AAX. Do not copy Lite's macOS 11 minimum.
- Five activated devices; online-activated purchased licenses have up to 90 days of offline grace, subject to signed expiry/revocation. Do not promise permanent offline activation: the plugin disables that flow, even though the dashboard switch is enabled.
- Refund policy: full refunds requested within 14 days, including after download/activation; support email plus order number and purchase email. Statutory rights remain. See `/eula/robin-control/`.
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
assets/js/waitlist.js              # retained historical script; no active RC waitlist forms
assets/js/cookie-banner.js
assets/images/
```

- Moonbase owns cart persistence, price/currency handling and customer sessions. Legacy `cart.js` is no longer loaded; `conduit_cart_v1` is neither replayed nor deleted.
- Lite maps to product `robin-control-lite`, variation `free`, at $0. Never expose admin keys in frontend code.
- The account page uses Moonbase UI; do not restore the old stub forms.
- RC waitlist signup forms are removed. Preserve existing subscribers and their promised 50%-off launch benefit; do not send campaigns or expose private codes without explicit authorization. The general homepage newsletter remains.

## Moonbase migration rules

- Work from the active `robin-control-storefront` worktree and branch listed above. The redesign and accessibility updates are merged into the root `main` checkout, which remains the production baseline. Do not resume the old visual-refresh worktree; preserve its unrelated palette artifacts.
- GitHub Pages deploys the root of `main`. `http://127.0.0.1:8765/` is the preview origin already allowed by Moonbase. The root VS Code Go Live configuration serves the project root; for current worktree review, serve the active worktree explicitly. Read `integrations.md` for current state and remaining verification.
- Use the shared embedded storefront integration. The linked `moonbase-cpp` repository is for plugin activation; website setup uses a separate JavaScript integration. Sources and alternatives are in the migration plan.
- Keep one commerce state across pages when implementing; do not leave the legacy local cart and the new storefront competing.
- Keep Moonbase as the only authentication UI. The paid RC offer is authorized; keep product IDs, price, actual downloads, and license terms aligned.
- Preserve the existing 50%-off RC waitlist promise for previous subscribers and the general newsletter form. Launch discount delivery remains a separate authorized campaign task.
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
- The privacy policy discloses Google Analytics, YouTube embeds, GitHub Pages hosting, Namecheap domain/DNS, Cloudflare integration infrastructure, MailerLite, Moonbase (including both products' activation data), and historical Lemon Squeezy services.
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
