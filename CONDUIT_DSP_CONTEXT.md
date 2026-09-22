# Conduit DSP — Shared Project Context

**Snapshot date:** July 25, 2026  
**Purpose:** Durable company-level context for Codex work across the Conduit DSP website, products, marketing, commerce, licensing, and operations.

This file is a decision aid, not a substitute for inspecting the current repository or live service before making a change. It deliberately excludes passwords, API keys, signing credentials, and other secrets.

## Codex's role

Act as Alex's cross-functional advisor and implementation partner for `conduit.dsp`, including:

- Audio-plugin product and business strategy
- Market, competitor, and audio-technology research
- Positioning, copy, launches, content, social media, and CapCut workflows
- Website, email, commerce, analytics, and integrations
- JUCE, C++, DSP, VST3, AU, AAX, DAWs, testing, and CI/CD
- Distribution, signing/notarization, licensing/DRM, Lemon Squeezy, MailerLite, and APIs
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

The live website—not the old dark-theme spec—is authoritative:

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
- The current visual implementation is warm beige/teal, despite `spec.md` and legacy `CLAUDE.md` describing an obsolete dark/lime design.
- GA4 measurement ID `G-JFCXCLVEHM` is available but must load only after an explicit analytics opt-in.
- Meta Pixel is not part of the current site or marketing plan.
- Home page newsletter posts to MailerLite.
- Robin Control Lite has a configured, resolving Lemon Squeezy checkout URL.
- Robin Control is shown as “Coming Soon”; its public price is hidden.
- The account page is a nonfunctional stub and is hidden from navigation.
- The reusable pre-launch MailerLite modal is disabled.

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
- macOS 11+ universal VST3/AU; Windows 10 build 1809+/11 VST3
- No public AAX yet; AAX is SDK-gated development work for a later release
- No public Standalone build
- No copy protection; plugin itself is offline and does not phone home

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

### Current customer flow

- Robin Control Lite is a $0 Lemon Squeezy checkout with email capture and file delivery.
- The website cart is localStorage-backed and uses static currency display rates.
- True multi-item checkout is not supported; the cart opens the first configured product URL.
- Home newsletter signup goes directly to MailerLite.
- The Cloudflare worker syncs RCL orders into a MailerLite group.
- The Robin Control pre-launch modal exists as a disabled template.

### Known MailerLite groups

User-supplied/current notes refer to:

- Robin Control Lite Waitlist
- Robin Control Lite Downloads/Subscribers
- Robin Control Waitlist/Premium Waitlist
- Newsletter

Names vary across notes; verify the live MailerLite group names before wiring automations.

### Robin Control activation plan

The July 24 licensing roadmap is the current plan, not yet implemented:

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

The existing purchase-to-MailerLite worker and the future activation service are separate systems and should remain separate.

## Marketing and channel reality

Confirmed:

- Website is live.
- Instagram: `@conduit.dsp`
- TikTok: `@conduit.dsp`
- YouTube: `@conduitdsp`
- KVR has a live Robin Control Lite product listing.
- Robin Control Lite has roughly **150 downloads/subscribers** as of July 25, 2026.
- No Robin Control waitlist exists yet; Alex expects to create one soon.
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

- The hidden account page is still directly reachable and presents nonfunctional login/register controls.
- The site does not mention v1.0.1.

### External listings

- KVR's RCL listing is live, but its copy still says “Round Robin Lite,” contains typos, uses stale Premium naming, and shows v1.0-era information.
- KVR correctly says AAX is unavailable/in progress, which conflicts with the Conduit website's general format claim.

### Repository guidance

- Website `spec.md` and legacy `CLAUDE.md` describe the obsolete dark/lime identity and stale product/store assumptions.
- RCL README still says pre-release and has stale licensing language.
- Historical Premium specs may still describe the old Round Robin Premium migration. Current code/build identity is Robin Control and takes precedence.

## Product and business decisions still open

1. **Twelve-month objective:** still intentionally undefined; revisit once the first paid product produces real conversion data.
2. **Capacity and runway:** hours available per week, sustainable monthly spend, and time horizon before revenue matters.
3. **Robin Control commercial offer:** final standard price, launch/early-bird policy, trial/refund policy, release window, and v1 feature freeze. macOS and Windows are in scope; VST3/AU ship first and AAX follows when ready.
4. **Robin Control platform floor:** whether the current macOS 13 deployment target is intentional and what the Windows support floor will be.
5. **RCL distribution truth:** whether v1.0.1 is public everywhere and which installer Lemon Squeezy currently delivers.
6. **Growth baseline:** MailerLite subscribers by group, traffic by source, content performance, and paid-acquisition CPA; total RCL downloads/subscribers are roughly 150.
7. **Analytics posture:** consent-gated GA4 is the current choice; define a retention period and revisit only if the small data set becomes useful enough to justify it.
8. **Purchase-email marketing consent:** whether checkout buyers are automatically marketable, explicitly opt in, or are kept transactional-only.
9. **Licensing details:** final credential, activation-service domain, device/unlimited policy, and refund handling for already-issued offline entitlements.
10. **Catalog sequence:** Robin Control is the active build; the sorting sequencer may precede Converter afterward if its broader synth-plus-MIDI concept validates strongly.
11. **Converter readiness:** repair plan, reference-interface/capture rig, and characterization budget.
12. **Sorting sequencer thesis:** target user, cross-DAW differentiator, musical controls, free/paid split, and validation plan beyond viral visuals.

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
- Keep product DRM consistent with the brand promise that the audio software does not phone home after activation.

## Sensitive-material rule

The Hammer notes include password/key files and project repositories include signing/setup references. Do not copy secrets into project memory, Git, logs, screenshots, or user-facing answers. Read secret-bearing files only when a specifically authorized task requires them.
