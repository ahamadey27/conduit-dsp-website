# Conduit DSP — Shared Project Context

**Base snapshot date:** July 25, 2026

**Latest website/commerce update:** September 28, 2026, including completed customer/license migration, Mac and Windows 2.0.0 downloads, and production website launch authorization. Sibling product and service status below remains dated unless explicitly updated.

**Purpose:** Durable company-level context for Codex work across the Conduit DSP website, products, marketing, commerce, licensing, and operations.

This file is a decision aid, not a substitute for inspecting the current repository or live service before making a change. It deliberately excludes passwords, API keys, signing credentials, and other secrets.

## September 28, 2026 — implementation update (supersedes older snapshots below)

The redesign uses Moonbase’s embedded storefront for cart/account/download flows and was authorized for production launch September 28. Tenant: `https://conduitdsp.moonbase.sh`; Lite product: `robin-control-lite`; free variation: `free`. The new free offer is configured with optional newsletter consent and current fulfillment instructions.

Lite’s authoritative repo confirms Moonbase DRM, 10 activations, 90-day online-validation grace, and a separate permanent offline activation flow. Moonbase offers the Mac 2.0.0 package with VST3/AU/AAX for macOS 11+ on Apple Silicon/Intel and the Windows 2.0.0 installer with 64-bit VST3/AAX for Windows 10/11. These facts supersede the July/no-DRM/AAX-unavailable snapshot below. Do not extrapolate Lite policy to Robin Control.

Alex linked MailerLite. An initial copy added 178 active members of `Robin Control Lite Subscribers` to `Moonbase: Robin Control Lite Subscribers`, preserving original membership. That copy alone did not create Moonbase accounts or licenses.

The subsequent customer/license migration is complete: two supplied exports were merged into 180 unique customers with 32 supplied names. At Alex's direction, the customer CSV set `newsletter=yes` for 177 records marked Subscribed and left the two Unsubscribed and one Bounced blank. Alex imported the customers; the agent then imported 179 perpetual Lite licenses, excluding the one existing owner in the source. Moonbase reported 179 successful imports and 181 customers/owners in total, including the other pre-existing test account. Do not repeat that license import. Customer data files remain outside the repository.

Alex confirmed that the migrated data is syncing to MailerLite. This is user-confirmed operational sync, not an independent audit of all name-overwrite and suppression-conflict behavior. No campaign was sent. Imported customers without passwords need the password-reset flow. See [integrations.md](integrations.md) for the import report, IDs and evidence.

The local test confirmed sign-in, checkout and product ownership after clearing a conflicting older hosted-portal session. Mixed hosted/embedded account sessions remain a launch check. Remaining work includes intended-recipient email/download/activation checks, policy review, production smoke tests, and eventual legacy Worker retirement.

## September 19, 2026 — historical Moonbase direction

This section records the earlier plan; the September 22 implementation and migration update above supersedes it.

Alex has selected **Moonbase** as the intended replacement storefront / Merchant of Record service. An embedded widget is preferred; a custom storefront integration remains an alternative. MailerLite remains the intended email platform, with a Moonbase connection likely but not yet configured. Alex also confirmed Moonbase for Robin Control in-plugin licensing/activation. Provider and scope are decided; device limits, offline behavior, and validation policy remain open.

Continue in `.worktrees/visual-refresh` on `codex/visual-refresh`. The design and copy changes are local, not deployed. The current website code still uses Lemon Squeezy checkout, direct MailerLite forms, and the hidden account stub. This documentation pass did not change runtime, vendor settings, customer data, or sibling repositories.

Read [MOONBASE_MIGRATION.md](MOONBASE_MIGRATION.md) for verified vendor sources, architecture, cross-repository implications, open inputs, and rollout checks. Read [integrations.md](integrations.md) for actual website wiring. Do not use the July licensing proposal or old Lemon Squeezy setup notes as an automatic implementation plan.

## Codex's role

Act as Alex's cross-functional advisor and implementation partner for `conduit.dsp`, including:

- Audio-plugin product and business strategy
- Market, competitor, and audio-technology research
- Positioning, copy, launches, content, social media, and CapCut workflows
- Website, email, commerce, analytics, and integrations
- JUCE, C++, DSP, VST3, AU, AAX, DAWs, testing, and CI/CD
- Distribution, signing/notarization, licensing/DRM, Moonbase migration, legacy Lemon Squeezy, MailerLite, and APIs
- Visual direction and asset creation
- Legal and compliance issue-spotting

For legal, tax, or other regulated decisions, provide practical research and issue-spotting, identify uncertainty, and recommend qualified counsel where warranted. Do not present Codex as a licensed attorney or accountant.

## Source precedence

When sources disagree, use this order:

1. Alex's latest explicit direction.
2. Current code, current artifacts, live services, and dated release evidence.
3. The active repository's `AGENTS.md`, active release checklist, and test documentation.
4. This dated shared context.
5. Current specs and dated Hammer notes.
6. Old website specs, retired repositories, and prior-agent summaries.

Do not treat unchecked roadmap items as completed work or proposed prices/features as commitments.

## Company and operating posture

- Legal entity: **Conduit DSP LLC**, solo-founded by Alex and based in Kingston, New York.
- User-supplied business details: NAICS 513210, EIN obtained, Mercury business banking, and Google Workspace on `hello@conduitdsp.com`.
- Brand styling: **`conduit.dsp`**. Functional website/domain: **`conduitdsp.com`**.
- Operating posture: bootstrapped, lean overhead, and protective of solo-founder time. Avoid recurring tools or infrastructure without a clear return.
- Current growth posture: small Instagram awareness spend, with marketing and operations kept DIY until revenue can support outside help or additional tooling.
- No fixed twelve-month revenue outcome has been chosen yet; do not invent an income-replacement target or aggressive growth mandate.
- Core positioning: an audio-plugin company committed to shortening the conduit between ideas and creation.
- Brand tagline (confirmed by Alex, September 18, 2026): **“A shorter path from idea to sound”**.
- Product messaging (confirmed by Alex, September 18, 2026): explicitly highlight **controlled parameter randomization** for both Robin Control Lite and Robin Control. Treat it as a core benefit alongside sample playback variation in product summaries and marketing copy.
- Voice: confident, concise, lightly cheeky. The previous surface/weirdness tagline is retired; do not reuse it.
- The strongest existing product story is workflow-oriented: fast, controlled variation for one-shot samples without configuring a general-purpose sampler.

## Brand and visual system

### Website brand

The warm website—not the old dark-theme spec—is authoritative. The undeployed September visual refresh refines these baseline values; see [DESIGN_NOTES.md](DESIGN_NOTES.md) and current worktree CSS for ivory/deep-teal/sage/clay tokens and DM Sans headings with occasional serif accents:

- Warm off-white/beige: `#F5F3F0`, `#F0ECE8`
- Dark brown: `#2A2520`
- Teal: `#2D7A7A`; darker CTA teal currently also uses `#1F5C5C`
- Display type: DM Serif Display
- Body type: DM Sans
- Logo type: IBM Plex Sans, weight 600
- Small radii and product-first layouts

The logo waveform geometry in `assets/images/logo.svg` is treated as locked unless Alex explicitly reopens it.

### Plugin visual language

Robin Control Lite and Robin Control use a related but more hardware-specific language:

- Warm cream/charcoal chassis
- Akai S612-inspired blue LCD sample panels
- Compact vintage hardware buttons, restrained gradients, LED/VU details
- Per-section accent colors
- Product UI should feel tactile and legible, not like a generic dark modern SaaS panel

## Repository map and authority

### Website — active and live

Path: `/Users/alex/Documents/Github/conduit-dsp-website`

- Vanilla HTML/CSS/JavaScript; no build system or framework.
- Hosted on GitHub Pages with Namecheap used for domain/DNS, not web hosting.
- The checked-out HTML matched the live site byte-for-byte on July 25, 2026.
- The current visual implementation is warm beige/teal, despite historical `spec.md` describing an obsolete dark/lime design. `CLAUDE.md` now points to maintained agent guidance.
- GA4 measurement ID `G-JFCXCLVEHM` is available but must load only after an explicit analytics opt-in.
- Meta Pixel is not part of the current site or marketing plan.
- Home page newsletter posts to MailerLite.
- Robin Control Lite has a configured, resolving Lemon Squeezy checkout URL.
- Robin Control is shown as “Coming Soon”; its public price is hidden.
- The account page is a nonfunctional stub and is hidden from navigation.
- The reusable pre-launch MailerLite modal is disabled. Active RC inline waitlists are separate; see the September update below.

### Robin Control Lite — active product repository

Path: `/Users/alex/Documents/Github/robin-control-redesign`  
Git origin: private `ahamadey27/robin-control-lite`

This oddly named local folder is the authoritative Lite codebase. The sibling `/Users/alex/Documents/Github/round-robin-lite` is retired and must be treated as read-only historical reference.

High-confidence current product behavior:

- Free monophonic sampler
- 20 sample slots
- Triggered from **any MIDI key**
- Every key plays the selected sample at natural pitch plus global semitone/fine-tune offsets
- Series round-robin or Fisher-Yates Random mode
- Asymmetric negative/positive per-hit randomization
- Volume, pan, global pitch, two-band shelf tone, sample start/end, Algorithm control, Trigger, and Panic
- Sample management: additive load, drag-and-drop, audition, reorder, replace, delete, and clear
- WAV, AIFF, FLAC, OGG, and MP3 decode support
- macOS 11+ universal VST3/AU/AAX; Windows 10/11 64-bit VST3/AAX
- AAX is publicly available for Pro Tools on macOS and Windows
- No public Standalone build
- Version 2.0.0 uses Moonbase activation; optional SDK analytics are disabled

Release evidence:

- Alex identifies **May 11, 2026** as the canonical public launch date for v1.0.0. Earlier April 26 dates in repository material are pre-launch/release-preparation dates and should be corrected when those files are next touched.
- The repo is at v1.0.1 and has a June 14 changelog plus a built macOS v1.0.1 installer.
- Publication of v1.0.1 to Lemon Squeezy/KVR has not been confirmed.
- The repo README still incorrectly says “pre-release” and has stale license notes.

Testing:

- Layered unit, fuzz, lifecycle, concurrency, sanitizer, pluginval, auval, macOS, and Windows CI infrastructure exists.
- The repo records CI green as of June 1, 2026.
- Parameter IDs are compatibility-sensitive after public release.

### Robin Control — active premium repository

Path: `/Users/alex/Documents/Github/round-robin-premium`

This is no longer a thin or merely planned follow-on. It is an active, substantial product under development.

Current development state:

- Product name, target/artifact identity, company string, bundle ID, preset paths, and AU/AAX identifiers are **Robin Control** / **Conduit DSP**. The local repository folder may remain `round-robin-premium`, and Alex may keep a VS Code session/folder named `robin-control-premium`; those development paths are not product identity.
- Version is 1.0.0 in development.
- Phases 1–12 are substantially complete.
- Phase 13 UI/UX is in progress.
- AAX evaluation build and DigiShell validation pass; commercial PACE wrapping and real Pro Tools host verification remain incomplete/blocked.
- Intended release platforms are macOS and Windows. VST3 is cross-platform; AU is macOS-only. AAX remains “coming soon” until Avid/PACE account verification and the remaining commercial host/release work are complete.
- Factory preset content and release packaging/distribution remain incomplete.
- Fast unit/audio suite, ASan/UBSan, TSan, Debug/Release builds, pluginval strictness 5, and auval were recorded passing on July 10, 2026.
- Strictness 10 and the manual host matrix remain release gates.

Implemented v1 scope:

- 40-slot main Pool
- Two 20-slot Ponds with Probability, Insert/Layer, independent Series/Random, volume, pan, and delay behavior
- Normal mode supports Pool + Pond 1 + Pond 2 fixed voices; FS Mode uses at most two voices
- FS Mode: white keys use FS Left + linked Pond 1; black keys use FS Right + linked Pond 2
- Three-band EQ with gain and frequency randomization
- Transient shaper
- Amplitude AD envelope; final behavior still needs listening confirmation
- Pitch, amplitude, sample start/end, and asymmetric randomization
- Random Algorithm table; later ticks are still being tuned
- Auto-Chop with transient detection, marker editing/audition, destination selection, and auto-naming
- Portable `.rr` ZIP presets with embedded post-chop samples
- Preset browser, quick browser, Save, and legacy `.rrpreset` import path
- Undo/redo
- Fixed 5 ms fades

Explicitly deferred/out of v1 unless Alex reopens scope:

- Keymap Mode
- Per-sample gain/pitch trim
- Multi-output routing and preview bus
- MIDI learn and macros
- EQ spectrum display
- Master compressor/saturation/graphic EQ
- Five-band EQ
- Third Pond

Current release questions:

- Current CMake minimum macOS target is 13.0, which is much narrower than Lite's 11.0 support; Alex has not yet confirmed whether this is intentional.
- Windows build, installer, signing, and host-matrix work still need to be established even though Windows is in the intended product scope.

### Converter/ADAT project — research/spec stage

Path: `/Users/alex/Documents/Github/conduit-dsp-adda-plugin`

- Working title: Conduit Converter.
- Commercial JUCE/C++ hardware-emulation effect, not yet implemented.
- Goal: measurement-driven emulation of the full A/D→D/A round trip of an original 16-bit Alesis ADAT blackface at a fixed internal 48 kHz rate.
- Intended chain includes SRC boundary, converter filters, quantization/dither/noise, nonlinearities, jitter, and dropout/error-concealment behavior.
- Default should be faithful/clean; an Instability macro introduces measured unstable behavior.
- Data-driven profiles should allow later converter models.
- The physical ADAT currently needs transport repair before safe characterization. This blocks the measurement-dependent phases.
- “ADAT” and “Alesis” must not be used as the shipping product name or imply endorsement.
- Do not attach a delivery timeline to this project. It is Alex's research project and proceeds when capacity and the repaired hardware allow.

### Sorting-algorithm sequencer/synth — concept stage

- This may move ahead of Conduit Converter after Robin Control, or become the next main product if the prototype and audience response justify it. Catalog order is intentionally flexible.
- The product thesis is broader than a sorting visualization: ship both a MIDI sequencer/effect and a synth-engine instrument built around the same sorting mechanics.
- Current UI concept includes key/scale selection, direction (including ping-pong), adjustable sort length, sequence-reset behavior, selectable sorting algorithm, multiple sequence pages, a large animated bar-sort display, and per-step Trigger, Note, Count, and Length values with locks.
- The July 25 concept screenshot is at `/Users/alex/Desktop/Screenshot 2026-07-25 at 5.11.19 PM.png`.
- Soni.f(y, sorts) proves the core sorting-to-MIDI idea exists, but a deeper cross-DAW product with a built-in synth, richer musical controls, and a standalone VST3/AU product workflow can still be meaningfully differentiated.

### Lemon Squeezy → MailerLite bridge

Path: `/Users/alex/Documents/Github/conduit-ls-ml-sync`

- A deployed Cloudflare Worker receives Lemon Squeezy `order_created` webhooks and maps buyers/downloaders to MailerLite groups.
- Production endpoint responded successfully on July 25, 2026.
- HMAC-SHA256 verification, constant-time signature comparison, idempotent MailerLite upsert behavior, and test-mode filtering are implemented.
- Robin Control Lite is mapped; Robin Control is not yet mapped.
- The bridge does not currently require/check explicit marketing consent before adding a purchaser to a MailerLite marketing group. Resolve this before paid/EU flows.

## Commerce, email, and licensing

### Current worktree customer flow — September 22

- Moonbase's embedded widget handles Lite's $0 cart, checkout, accounts, downloads and license ownership. Its SDK owns commerce state; the old local cart script is no longer loaded.
- Lite product/variation IDs are `robin-control-lite` / `free`; new signup uses optional marketing opt-in.
- Local preview redirects to hosted checkout; HTTPS production is configured for desktop overlay and mobile redirect. Production deployment has not yet occurred.
- All 180 imported customers now own RCL; Alex confirmed native Moonbase-to-MailerLite sync after the migration.
- Home newsletter signup and RC inline waitlists remain direct MailerLite forms. The RC forms on home, Plugins and RC detail use `197334966677275966` and advertise 50% off at launch.
- Legacy Lemon Squeezy receipts and the separate Cloudflare email Worker remain unchanged. Do not retire them without checking remaining dependencies.

### Known MailerLite groups

- Robin Control Lite Subscribers (original source, retained)
- Moonbase: Robin Control Lite Subscribers
- Moonbase: Robin Control Lite Owners
- Moonbase: All Customers
- Robin Control Waitlist and Newsletter (direct website forms)

Exact IDs and dated group observations are in [integrations.md](integrations.md). The initial 178-member copy count predates the later 180-customer migration; do not reuse it as a current synced-group total. Verify current group/automation state before wiring new campaigns.

### Historical Robin Control activation proposal — reconcile before implementation

The July 24 roadmap below predates the September Moonbase decision. It records earlier preferences, not a selected implementation for the new store. Current product licensing code was not audited in this website documentation pass. Alex has confirmed Moonbase for plugin activation, superseding the custom Cloudflare licensing-service direction. Reconcile the earlier offline/device preferences below with the Moonbase implementation before selecting settings:

- Preferred release model: one-time online activation for a new installation, plus an offline activation-key/license-file path for offline machines.
- Customer activates with the Lemon Squeezy purchase email or the final purchase credential chosen for the release.
- A Cloudflare-hosted service verifies the order and issues a signed `.rrlicense`.
- First activation is online; subsequent use is permanently offline.
- Offline machines import a signed license generated on another connected device.
- Unlimited activations, no machine fingerprint, no counters, no recurring checks, no telemetry, no iLok-style end-user DRM.
- VST3/AU/AAX/Standalone share one user-level license.
- Email-only verification does not prove mailbox control and portable licenses can be shared. Keep the activation UX simple, but revisit the credential and abuse model before implementation is frozen.
- Already-issued perpetual offline entitlements cannot be revoked after a refund; support policy must reflect that.
- A magic-link challenge is the likely escalation if abuse becomes material.

Commerce-to-email sync and plugin activation serve different purposes. Moonbase is selected for Robin Control activation; the old custom licensing-service proposal is superseded. The existing email Worker transition remains a separate task.

## Marketing and channel reality

Confirmed:

- Website is live.
- Instagram: `@conduit.dsp`
- TikTok: `@conduit.dsp`
- YouTube: `@conduitdsp`
- KVR has a live Robin Control Lite product listing.
- Robin Control Lite has roughly **150 downloads/subscribers** as of July 25, 2026.
- September website verification: Robin Control inline waitlist forms are active on three pages, with a 50%-off launch promise. Live subscriber totals and automation state still require verification.
- Instagram ads are currently small awareness experiments, not a committed paid-acquisition engine.
- Subscribers across Conduit DSP lists may receive occasional email about future products and discounts. Copy should be frank that this is a small operation, set a low-frequency expectation, and always preserve an easy unsubscribe.

Needs confirmation:

- Subscriber counts by individual MailerLite group, current follower counts, precise ad spend, cost per subscriber, and conversion rates
- Performance of the current Instagram awareness spend
- Plugin Boutique vendor/application status
- Current Gearspace/Reddit/Discord activity
- Which MailerLite automations are live versus paused

Do not reuse the old roadmap's follower, download, sales, or revenue targets as current commitments. They were planning ranges, not measured performance.

### Current positioning observations

- Robin Control Lite/Premium should lead with controlled variation and a fast one-shot/SFX workflow, not “round robin exists.”
- Game audio, foley, footsteps, impacts, percussion, UI sounds, and post-production are credible primary use cases.
- The premium feature delta is now substantial: Ponds, FS routing, Auto-Chop, embedded portable presets, richer DSP/randomization, envelope, and deeper content management.
- The sorting-algorithm sequencer idea is not wholly unique: a Max for Live device named Soni.f(y, sorts) already turns sorting operations into MIDI. A cross-DAW commercial implementation may still have whitespace, but “no competitor exists” is false.
- Generative MIDI is active and price-competitive; current examples include algorithmic products around the €24 range.
- Robin Control competes indirectly with general samplers and randomizing samplers. A current visible comparator is Rando at €99, but it is positioned more as inspiration/loop generation than a focused foley round-robin workflow.

## Legal, privacy, and compliance issue register

These are issue-spotting notes, not final legal conclusions.

### Highest priority

- GA4 must remain consent-gated, with equally available allow/reject choices and accurate disclosure of Google Analytics.
- GitHub Pages is the website host; Namecheap is domain/DNS.
- Meta Pixel is not planned for now. Revisit the privacy policy and consent mechanism before adding it or any other advertising tracker.
- The Lemon Squeezy → MailerLite worker may add purchasers to marketing groups without a distinct marketing opt-in. Resolve consent and lawful-basis handling before relying on it for paid/EU customers.

### Product/store copy

- The redesign account page uses working Moonbase account/download controls; the nonfunctional legacy forms have been replaced in the worktree.
- Lite copy reflects v2.0.0, AAX on Mac and Windows, sample-pool playback feedback and interface scaling.
- Updated FAQ, privacy and EULA pages are part of the September 28 production launch; counsel review and live account/activation checks remain follow-up items.

### External listings

- KVR's RCL listing is live, but its copy still says “Round Robin Lite,” contains typos, uses stale Premium naming, and shows v1.0-era information.
- KVR's July AAX-unavailable status predates the September Mac and Windows v2.0.0 release. Recheck and align external listings with current per-platform release evidence.

### Repository guidance

- Website `spec.md` is marked historical. `CLAUDE.md` now directs agents to current instructions, and `integrations.md` separates current runtime from the Moonbase plan.
- RCL README still says pre-release and has stale licensing language.
- Historical Premium specs may still describe the old Round Robin Premium migration. Current code/build identity is Robin Control and takes precedence.

## Product and business decisions still open

1. **Twelve-month objective:** still intentionally undefined; revisit once the first paid product produces real conversion data.
2. **Capacity and runway:** hours available per week, sustainable monthly spend, and time horizon before revenue matters.
3. **Robin Control commercial offer:** final standard price, launch/early-bird policy, trial/refund policy, release window, and v1 feature freeze. macOS and Windows are in scope; VST3/AU ship first and AAX follows when ready.
4. **Robin Control platform floor:** whether the current macOS 13 deployment target is intentional and what the Windows support floor will be.
5. **RCL distribution readiness:** Mac and Windows v2.0.0 installers are active on Moonbase; preserve legacy receipt/download access and verify real customer activation callbacks.
6. **Growth baseline:** reconcile current MailerLite group counts, traffic, content performance and paid-acquisition CPA. The migrated cohort is 180 customers; the 181-owner dashboard total includes another test account and is not a count of unique organic downloads.
7. **Analytics posture:** consent-gated GA4 is the current choice; define a retention period and revisit only if the small data set becomes useful enough to justify it.
8. **Email preference behavior:** new Moonbase signup uses optional opt-in; Alex approved the 177-yes/3-blank legacy import. Independently verify suppression and conflicting-preference behavior before extending the flow; ownership alone does not set marketing permission.
9. **Licensing details:** Moonbase is selected for Robin Control licensing; reconcile credentials, offline/device/unlimited policy, recurring validation, and refund handling with the historical July proposal.
10. **Catalog sequence:** Robin Control is the active build; the sorting sequencer may precede Converter afterward if its broader synth-plus-MIDI concept validates strongly.
11. **Converter readiness:** repair plan, reference-interface/capture rig, and characterization budget.
12. **Sorting sequencer thesis:** target user, cross-DAW differentiator, musical controls, free/paid split, and validation plan beyond viral visuals.
13. **Moonbase launch:** storefront implementation, customer/license migration and user-confirmed MailerLite sync are complete. Remaining work is deployment, production and mixed-session tests, installer/email/activation verification, policy review, merchant readiness for paid RC, and the legacy Worker's transition. See `MOONBASE_MIGRATION.md`.

## Default advisory principles

- Protect the solo founder's focus; prefer the smallest system that produces evidence or ships value.
- Verify live product/service state before advising from a checklist.
- Separate a public promise from a future idea.
- Treat format support as per-product and per-platform, never a blanket company claim.
- Preserve preset/parameter compatibility after release.
- Validate DSP with deterministic tests and real hosts, not only validators.
- Treat factory samples, IRs, presets, fonts, and visual assets as commercial-redistribution questions.
- Track a small funnel: source → landing page → email/order → download → activation → paid conversion.
- Use RCL behavior and audience data to shape Robin Control pricing and messaging.
- Preserve Lite's offline/no-copy-protection behavior. For paid RC, treat offline-after-activation as the earlier preference to reconcile explicitly with the selected licensing system; do not silently replace it or advertise unverified behavior.

## Sensitive-material rule

The Hammer notes include password/key files and project repositories include signing/setup references. Do not copy secrets into project memory, Git, logs, screenshots, or user-facing answers. Read secret-bearing files only when a specifically authorized task requires them.
