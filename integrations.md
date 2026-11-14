# Integrations — current launch record

## November 14, 2026 — Website newsletter submits directly to Moonbase

At Alex's request, replaced the homepage's MailerLite submit request with Moonbase's supported embedded subscribe form and inline feedback. The live dashboard verified **Conduit DSP Newsletter**, **Open to sign-ups**, full group ID **conduit-dsp-newsletter**. Alex's copied ID omitted the initial `c`; the verified ID is used in the form. Alex reported clearing the list; it was empty before testing. No bulk members, consent changes or license imports were performed by this task.

- Preserved the existing newsletter appearance, added visible signup/unsubscribe wording, and placed Moonbase's accessible result message inside the form. Submission remains disabled until shared storefront readiness; a load error gives a reload message. The native SDK owns email validation, group joining and success/confirmation feedback.
- Replaced `newsletter.js` with a readiness guard; removed the MailerLite Universal snippets from Home, Plugins and Lite (the only three loaded occurrences). Historical, unloaded waitlist/modal scripts remain archived. No shared storefront configuration, cart, checkout, analytics consent, vendor integration or automation setting was changed.
- Updated the privacy processor descriptions factually: website newsletter submissions go to Moonbase, while MailerLite still retains existing records and can receive the native sync. No broader legal-policy rewrite; existing counsel-review follow-up remains applicable.
- Browser at `http://127.0.0.1:8765/`: the approved existing owner-account address received Moonbase's inline subscribed result; refresh showed the same address in the intended list and **1 member**. Desktop and 320px form layout fit, and an invalid address triggered browser validation without navigating. Reload showed a ready, empty input; DevTools recorded **0 MailerLite requests out of 53 total**. The vendor logged `Baobab.Cursor.getters: invalid path` twice; signup and the verified group addition still succeeded. No local newsletter-script error was observed.
- The test address was already a confirmed customer. New-address confirmation delivery, captcha, unsubscribe, actual campaign delivery and fully disconnecting MailerLite were not tested. No campaign was sent. The approved test membership is retained; no customer was deleted or globally unsubscribed.
- `node --check assets/js/newsletter.js`, all **11** storefront checks and `git diff --check` pass. The changed HTML uses refreshed newsletter JS/CSS cache URLs. Alex authorized committing, merging and publishing these reviewed changes on November 14. Commit `99897bc` was merged with the existing production documentation into `7bb4c4d` and pushed to `main` and `codex/robin-control-storefront`. GitHub Pages reported **built** for `7bb4c4dfd5e9459638d6dd80d397ea23c625a924` at **2026-11-14 20:17:38 UTC**. The public homepage returned the native Moonbase form, correct group ID and refreshed JS/CSS; no MailerLite browser script remained. The live browser showed the Subscribe button enabled after Moonbase initialized. No second production signup was submitted; the approved preview signup and target-group verification above remain the completed membership test.

Reusable steps: [website newsletter maintenance](MOONBASE_COMMON_WORKFLOW.md#maintain-the-website-newsletter-signup). Older MailerLite form descriptions below are historical where they conflict.

## November 14, 2026 — Moonbase campaign sender configured

At Alex's request, inspected **Account settings → Email**: no sending domains or addresses were configured. Added **mail.conduitdsp.com**. After Alex selected **conduit.dsp <hello@mail.conduitdsp.com>**, approved the four DNS records below and signed into Namecheap, published them with Automatic TTL. Namecheap showed each saved record; authoritative DNS returned all four exact values. Moonbase **Refresh** showed **Verified**, with both DKIM records, DMARC and return-path marked **Configured**. Created **hello@mail.conduitdsp.com**, display name **conduit.dsp**, purpose **Marketing** only; the saved address table showed the intended values. No campaign or test email was sent.

| Type | Namecheap Host | Value |
| --- | --- | --- |
| CNAME | `mb1._domainkey.mail` | `mb1.fb49fe54.conduitdsp.emails.moonbase.sh` |
| CNAME | `mb2._domainkey.mail` | `mb2.fb49fe54.conduitdsp.emails.moonbase.sh` |
| CNAME | `return-path.mail` | `return-path.emails.moonbase.sh` |
| TXT | `_dmarc` | `v=DMARC1; p=none; pct=100;` |

Before publication, public DNS confirmed Namecheap nameservers and Google Workspace MX (`smtp.google.com`), with no root or sending-subdomain DMARC TXT. Inspected all existing Namecheap host records and preserved them, including GitHub Pages, MailerLite authentication and Google verification; the Google MX was unchanged. Added the root DMARC policy in monitor mode only. These are public DNS values, not private keys. MailerLite settings, consent preferences, website runtime files, footer and transactional sender were unchanged. Actual email delivery, SPF/DKIM/DMARC results on a received message, replies and a reload persistence check remain untested. Creating this outbound sender does not create a receiving inbox for it. Follow-up documentation confirms Moonbase uses the customer-facing email under **Account settings → Account** as reply-to; its current saved value and actual reply routing have not been inspected. Added [test and reply instructions](MOONBASE_COMMON_WORKFLOW.md#test-campaign-delivery-and-replies); no additional service settings changed. See [campaign sender workflow](MOONBASE_COMMON_WORKFLOW.md#configure-moonbase-campaign-sending).

November 14 follow-up: Alex reported the email variable `{{ account.name }}` renders as **conduitdsp**. Official documentation says a global Account Name correction requires Moonbase support; the permanent Account ID should remain **conduitdsp**. Documented the [display-name procedure and draft-text workaround](MOONBASE_COMMON_WORKFLOW.md#correct-the-account-display-name-in-emails). No rename, email-template edit or support message was performed. Current local product CMake files use `moonbase-cpp` v4.4.0 / `moonbase_licensing`, rather than the legacy name-sensitive `moonbase_JUCEClient`; historical binaries were not audited.

November 14 subscriber-platform review: Alex reports the email setup is working; this is user-confirmed, with no new independent delivery/header/reply test. Researched replacing MailerLite with Moonbase's native lists, public newsletter forms, subscriber import, campaigns and beta automations. Recommendation: a staged migration after auditing consent, suppressions, waitlist benefit and welcome-flow parity. At that research stage, the homepage still posted to MailerLite; the implementation above supersedes that form wiring. Added [the proposed migration procedure](MOONBASE_COMMON_WORKFLOW.md#plan-a-newsletter-move-from-mailerlite-to-moonbase); no group, import, automation, vendor setting or website runtime was changed in this review.

## October 25, 2026 — Free RC coupon redemption-limit investigation

Read-only inspection of the existing **Free Robin Control** coupon found the correct **100%** percentage discount, Robin Control as the eligible product, and an Active status. **Max redemptions** and **Max redemptions per code** were both **1**. Five codes were attached: one showed **1 of 1 redemptions**, while the other four, including the reported code, showed **0 of 1**. The completed redemption therefore exhausted the shared coupon allowance and explains the reported **Coupon has reached max number of redemptions** error for an unused code.

If all five existing codes should work once, the proposed correction is an overall cap of **5**, retaining the per-code cap of **1**. No Moonbase settings, customer records, licenses or website runtime files were changed, and no checkout or redemption was performed. Private codes are omitted. Added the reusable [redemption-limit troubleshooting procedure](MOONBASE_COMMON_WORKFLOW.md#troubleshoot-coupon-has-reached-max-number-of-redemptions).

## October 23, 2026 — RCL 2.0.1 beta-access research

Read-only inspection at Alex's request confirmed RCL **2.0.1** is **Pre-release**, with a Mac installer, while **2.0.0** remains **Active** with Mac/Windows downloads. Saved release access matches Alex's screenshot: current open, past owner-only, pre-releases restricted to **RCL Test Group v2.0.1**. The selected customer List contains two members; no customer details are recorded here.

Moonbase's [release documentation](https://help.moonbase.sh/articles/3701612-downloads-releases) says unpublished pre-releases are omitted from normal customer portal listings. The beta row's **More actions → Download** supplies `https://conduitdsp.com/?mb_intent=download_product&mb_product_id=robin-control-lite&mb_version=2.0.1`. Opening that generated link in the existing signed-in storefront session displayed **Downloads Version 2.0.1**, **Robin Control Lite 2.0.1.pkg**, **Mac - 16 MB**, and **Download for Mac**. The embedded storefront consumes the intent parameters, so copying the address bar afterward loses the version-specific link.

No Moonbase settings, group memberships, licenses, release publication or website runtime files were changed, and no campaign was sent. Actual installer transfer, installation/activation, non-member denial and a fresh customer sign-in were not tested. Added [the reusable beta-sharing procedure](MOONBASE_COMMON_WORKFLOW.md#share-an-unpublished-beta-with-selected-customers), including keeping the beta unpublished so it retains the group restriction.

## October 23, 2026 — Repair shared RC coupon validity

Alex reported and reproduced **Coupon code not found** at live hosted checkout. The existing **50% Off Robin Control** coupon and distributed code were present, with the correct Robin Control / Standard restriction, 50% discount, combination disabled, blank redemption caps and zero redemptions. However, its persisted **Restrict to time span** was **November 22, 2026 16:35–17:35 America/New_York**: a future one-hour window. The coupon's **Active** status did not mean it was currently redeemable. This contradicts the October 21 recorded date verification below; this investigation did not establish when or how the dates changed.

Restored the previously approved **October 21, 2026 21:35 UTC → November 20, 2026 21:35 UTC** window (720 hours), using the calendar and time picker, and saved Restrictions. Reload confirmed **21/10/2026 17:35 → 20/11/2026 16:35** in New York, with the original product restriction, discount, combination setting and redemption caps preserved. The existing code was retained and is not recorded in this public repository.

Retested **Apply** in Alex's already-open live hosted checkout: **Coupon applied**, **$19.50 saved**, and **$19.50 total** from the regular $39 (the test showed $0 tax). No payment was submitted; dashboard redemptions remained zero after the test. No customer records, campaigns, licenses or website runtime files were changed. Added the verified [coupon troubleshooting procedure](MOONBASE_COMMON_WORKFLOW.md#troubleshoot-coupon-code-not-found).

## October 21, 2026 — Shared 50%-off Robin Control coupon

At Alex's request, completed the existing **50% Off Robin Control** coupon in the open Moonbase dashboard. Its 50% percentage discount and stacking-off setting were already saved. Added Robin Control as the only eligible product, replaced the zero-length future date range with **October 21, 2026 21:35 UTC → November 20, 2026 21:35 UTC** (720 hours), and created the requested single shared code. Both redemption limits remain blank for multiple customers. The code-level date range is blank; the parent coupon limits the offer window. The actual live code is kept out of this public repository.

Reload verified the saved product restriction and date range. The code appeared in the table with **0 redemptions**, and the coupon remains Active. At $39 USD, the configured percentage corresponds to $19.50 before tax; a discounted checkout total was not independently verified because the hosted checkout requires billing email before subsequent steps. No purchase or campaign was completed, and the temporary website test cart was cleared. Shared-code controls and save steps are maintained in [Moonbase common workflows](MOONBASE_COMMON_WORKFLOW.md#create-a-30-day-discount-for-selected-recipients); the previously referenced `mb-discount-code.md` is absent from this checkout. See the October 23 repair above for the later saved-state discrepancy and successful checkout verification.

## October 21, 2026 — RCL owner email reconciliation

At Alex's request, compared the complete Moonbase **Robin Control Lite Owners** export against all statuses in MailerLite's **Moonbase: Robin Control Lite Owners**, group `199342264550425765`. Normalized emails by trimming whitespace and lowercasing; private exports and audit files remain outside this repository.

- Moonbase: **198** unique owners; **179** newsletter opt-ins and **19** without newsletter opt-in.
- Before: MailerLite had **186** group members, with **15** Moonbase owners missing and **3** members absent from the current Moonbase owners group. Of the missing owners, **3** had newsletter opt-in and confirmed email; **12** had neither newsletter nor product-update opt-in.
- Checked all three consent-qualified missing addresses against MailerLite's global **All** statuses: none existed. Imported only those three emails into the named owners group. Left **start automation workflows** unchecked. MailerLite reported **3 added, 0 updated, 0 not added**.
- Removed the three stale **owners-group memberships only**. Preserved those subscriber records, their active status and original **Robin Control Lite Subscribers** memberships.
- After: re-read all **186** unique group emails across four pages. Every member is a current Moonbase owner; **all 179 newsletter-opted-in owners are represented**. The remaining **12** owners lack opt-in and were not added. Seven existing owners without newsletter opt-in remain in the group; their statuses and preferences were not changed.
- Final status counts match the starting counts: **177 active, 4 unsubscribed, 4 bounced, 1 unconfirmed, 0 spam complaints**. No suppressed or unconfirmed subscriber was reactivated. No campaigns, automation emails or license imports were initiated.
- Native integration dashboard: **Healthy**, no errors in the preceding 24 hours, customer groups sent as MailerLite groups. E-commerce and inbound **Import contacts** remain off; no integration settings or customer preferences were changed. Both workflows triggered by the owners group were inactive; the active newsletter welcome workflow targets a different group and was untouched.

The [current Moonbase documentation](https://help.moonbase.sh/articles/2182854-mailerlite) describes outbound synchronization of newsletter-opted-in customers and their groups, plus two-way newsletter consent updates. Optional inbound contact import creates guest contacts, not product ownership. These documented behaviors do not establish why the three historical opted-in records were missing; this task corrected the observed gaps without restarting the integration. See [the reusable reconciliation procedure](MOONBASE_COMMON_WORKFLOW.md#reconcile-rcl-owners-with-mailerlite).

## October 21, 2026 — Product-card purchase buttons

Added **Buy now — $39** to the Robin Control cards on Home and Plugins. Alex then supplied the Lite card as the placement reference: **Buy now** (or owned-product **Download**) comes first on the left, followed by **Explore Robin Control** and its arrow. Both products use the same action-row class, spacing, button padding and responsive wrapping; the temporary RC-specific grid styles were removed.

Both buttons use the shared Moonbase cart handler with product `robin-control`, a dynamic price binding with a $39 fallback, and an owned-product Download alternative. Cart routing was verified at $39.

The preceding hosted-checkout fix (`f437df1`) deployed successfully at 20:52:23 UTC. Live RC cart → hosted checkout was verified at $39, without submitting payment; the test cart was cleared.

## October 21, 2026 — Robin Control commercial launch

Alex authorized committing, merging and publishing the storefront worktree and confirmed enabling purchasing. Dashboard review confirmed the active $39 USD Standard one-off/perpetual offer, no product discounts, five device activations, and published Mac/Windows installers. Alex believes the separate commercial rights and installer/activation release checks are complete; this website review does not independently close the plugin repository's compliance register.

### Launch corrections

- Corrected the product page from 1.0.0 / macOS 11+ to **1.0.2 / macOS 13+**, matching the published Mac artifact and release evidence. Windows remains 64-bit Windows 10/11, VST3/AAX; Mac is universal VST3/AU/AAX.
- Downloaded both existing published installers. The Mac package matches the local signed/notarized 1.0.2 package, SHA-256 `ccd6f08440d0d14fdc302dd935bc268224d22d1dc87a53cae591b1e283b5b3de`; `pkgutil --check-signature` confirms Apple trust and notarization.
- The previous Moonbase release record was labeled 1.0.0 while containing the two 1.0.2 files. Published an accurate **1.0.2** release using those same downloaded files and verified it became Active. Kept the historical release. No plugin was rebuilt or installed.
- Added Moonbase's product website URL and fulfillment instructions with current installers, activation, support, license and refund links. Updated release description. Purchasing was already enabled by Alex and was not toggled by the agent.
- Added `/eula/robin-control/` with a separate paid-product license and a **14-day full-refund policy**, including after download/activation, at Alex's direction to choose a standard policy. Added links beside the purchase button, in the FAQ, and across all eleven footers. Statutory rights remain; Moonbase's purchase terms are separate. This operational legal copy warrants counsel review; no legal certification is claimed.
- Updated privacy disclosures to include Robin Control activation and the existing YouTube embeds. GA4 opt-in behavior and MailerLite newsletter wiring are preserved. Added actual public-launch notes to Updates and removed its commented dummy RC changelog.
- Removed RC signup waitlists as previously approved, retaining the homepage newsletter and existing subscribers' promised 50%-off benefit. Coupon distribution and a subscriber campaign are separate work; none was sent.

### Verification and limits

- Eleven storefront unit checks pass, including paid product/default variation, owned downloads and hosted fallbacks. All eleven public pages were checked at 320px and 1280px with no horizontal document overflow or broken loaded images; local links/assets/anchors, duplicate IDs, shared script versions and both license footer links pass. Browser checks cover owner download visibility, signed-out RC add-to-cart at $39, and hosted checkout with the expected product/amount and blank customer email. A paid order, new customer license, receipt delivery and fresh plugin activation are not created by this website review.
- The dashboard enables permanent offline activations, but Robin Control's 1.0.2 client disables that flow. Website copy promises the verified online activation / 90-day grace only. Settings were preserved. Trial newsletter opt-in is currently required in Moonbase; this launch does not introduce or advertise a new trial-signup flow.
- The historical mixed hosted/embedded-session issue remains a vendor integration limitation until a completed controlled order proves the intended identity. Avoid entering another customer's information into an existing hosted session.
- Commit `bfa2acb` was merged into `main` and pushed; GitHub Pages reported **built** at 20:47:49 UTC on October 21. Live HTTPS owner downloads show **Version 1.0.2**, and the signed-out RC cart displays $39. The desktop checkout overlay stalled with a blank frame, so the launch follow-up sets `checkout.redirect: 'always'` on all devices using Moonbase's supported hosted checkout. Shared script URLs were refreshed across all eleven pages. Cart/account UI remains embedded. Recheck deployment after this follow-up push.
- The Coupons list currently contains a free-product coupon; no 50%-off waitlist coupon was present. Preserve the promise and arrange its coupon/campaign separately before contacting those subscribers. No coupon, customer record or campaign was changed by this review.

## October 21, 2026 — Robin Control video (prepared before launch)

- Replaced the temporary Lite demo on the Robin Control product page with Alex's supplied YouTube video (`qoAb74B5HMc`), titled “Robin Control — Main Features Walkthrough,” in the existing responsive player.
- This is a local preview update; Moonbase purchasing settings and production deployment were not changed.

## October 5, 2026 — Robin Control storefront preparation (local worktree)

Historical October 5 preparation at Alex's request in `.worktrees/robin-control-storefront`, branch `codex/robin-control-storefront`. The October 21 launch record above supersedes its purchasing-off, version and platform snapshots.

- Removed the Robin Control 50%-off waitlist boxes from Home, Plugins, and the RC detail page. Kept the homepage **Stay in the loop** newsletter, its form, consent copy, and MailerLite integration. Existing waitlist subscribers and their promised benefit are unchanged; no email or vendor configuration was changed.
- RC uses Lite's purchase layout, with version 1.0.0 next to the price. The temporary Lite video used on October 5 was replaced with Alex's Robin Control video on October 21 (see above).
- Robin Control uses the Standard perpetual offer at $39 USD. Alex confirmed removing the storewide discount and requested the website use $39. The page binds its price using Moonbase's [dynamic content attributes](https://moonbase.sh/docs/storefronts/embedded/#render-dynamic-content), with `$39 USD` as the initial/failure price and no crossed-out comparison price. Recheck this fallback when changing the offer.
- Active Moonbase release 1.0.0 contains Mac and Windows installers. At Alex's explicit direction, the RC page lists: Version 1.0.0 · macOS 11+ (Apple Silicon / Intel): VST3 / AU / AAX · Windows 10 / 11 (64-bit): VST3 / AAX.
- The shared click handler accepts `data-store-product="robin-control"` for purchase/download actions and hosted fallbacks. RC uses Moonbase's default offer; Lite keeps its explicit `free` variation. All ten pages use the refreshed shared script URL.
- **Purchasing is still disabled in Moonbase.** The preview initializes successfully, but RC add-to-cart is rejected and the correct hosted RC fallback appears. No paid checkout was completed. Enable purchasing as part of the separate launch, then verify live price/discount rendering, RC cart/checkout, and owned downloads before publishing. RC ownership switching is covered by code tests, not a completed live purchase.
- Verification: 11 storefront tests pass; desktop/mobile Home, Plugins and RC layouts checked, no horizontal overflow observed; mobile navigation closes before opening the working Moonbase account panel; existing Lite ownership/download controls remain present. `git diff --check` passes.

## October 5, 2026 — Robin Control waitlist confirmation removed

At Alex's request, disabled double opt-in on MailerLite form `197334966677275966` (RC Waitlist Hidden Form) and verified the switch remained off after reloading. The selected destination remains **Robin Control Waitlist**, group `183671399741654949`. New accepted signups no longer require a confirmation email. This is a form-specific change; general newsletter and Moonbase signup settings were not changed, and existing subscriber statuses were not edited.

The shared website waitlist script now checks MailerLite's JSON `success` value before showing enrollment success and tells visitors their 50% launch discount will be emailed when Robin Control is ready. All three signup pages use a dated script URL to refresh cached copies. The existing marketing consent text and unsubscribe promise remain. This does not configure or send the launch discount or enable the inactive pre-launch sequence.

## September 28 implementation

Implementation was prepared in `.worktrees/visual-refresh`, branch `codex/visual-refresh`, and authorized for production launch on September 28. Earlier planning is preserved in `MOONBASE_MIGRATION.md`; the facts here supersede its September 19 assumptions.

## Website wiring — September 28 snapshot (October 21 launch changes above supersede RC status)

- All ten HTML pages load `assets/js/storefront.js` and `assets/css/storefront.css`.
- Moonbase tenant: `https://conduitdsp.moonbase.sh`; product: `robin-control-lite`; variation: `free`.
- Moonbase owns the cart, currency/pricing, account sessions, checkout, download/ownership controls and incoming `mb_intent` links. The old cart script is not loaded; `conduit_cart_v1` is neither read, replayed nor deleted.
- Header Account and Cart open the embedded panels. `/account/` and `/cart/` remain useful entry pages with hosted fallbacks. The nonfunctional password forms have been removed.
- Lite action adds one free license to the Moonbase cart. Owned-product UI offers downloads. No paid Robin Control product is exposed; Coming Soon and the 50%-off waitlist remain.
- Signup uses `marketingConsent: 'OptIn'`; no Moonbase analytics forwarding is configured. Existing GA4 remains gated by `cookie-banner.js`.
- Direct MailerLite forms remain: newsletter `184331636279609031`; RC waitlist `197334966677275966`; account `2241125`.
- The CDN loads once per page; setup waits for storefront data. Errors/timeouts expose hosted links without taking over navigation. Normal modified clicks retain link behavior.
- Checkout is `auto` on HTTPS (desktop overlay / phone redirect). HTTP `127.0.0.1` uses `always` redirect: Moonbase’s checkout `frame-ancestors` permits HTTPS and localhost, but not HTTP 127.0.0.1. This is a supported SDK option, not a browser-security workaround.

## Verified Moonbase settings and changes

Read from the signed-in dashboard, September 22:

- Embedded Widget selected by Alex; customer accounts enabled; marketing consent Opt-in; email confirmation currently skipped.
- Active release 2.0.0 contains `Robin Control Lite 2.0.0.pkg` (Mac, 24 MB) and `RobinControlLite-2.0.0-Windows-AAX-VST3.exe` (Windows, 4.8 MB). Historical 1.0.0 remains published.
- Created `free` pricing variation: one-off, perpetual access, USD $0; EUR/GBP auto-converted from zero. Newsletter opt-in is not required.
- Enabled Lite purchasing and replaced the stale beta 1.0.1 fulfillment message with final Mac 2.0.0 installation/activation instructions and the unpinned product download URL.
- Added only `http://127.0.0.1:8765` to the domain allowlist with Alex’s explicit approval. Existing `https://conduitdsp.com` and hosted tenant remain. `http://localhost:8765` is not newly allowed.
- Licensing settings unchanged: 10 activations; offline activation enabled; trials disabled. Authoritative product repo records 90-day online grace and a separate permanent offline flow.

No admin API key was added to the website. No plugin binary was uploaded and no release was published by this task. The initial storefront setup issued no licenses; the later authorized customer license migration is recorded below.

## MailerLite subscriber transfer

Alex connected the native integration before this work. Existing group IDs:

| Purpose | ID | Active count at initial group-copy check |
| --- | --- | --- |
| Robin Control Lite Subscribers (source) | `183671378460804176` | 178 |
| Moonbase: Robin Control Lite Subscribers (destination) | `199342265028576673` | 178 after copy |
| Moonbase: Robin Control Lite Owners | `199342264550425765` | 0 before copy; untouched |
| Moonbase: All Customers | `199342263669622201` | 0 before copy; untouched |

During the initial transfer, used MailerLite’s native **Add to group** on all 178 active source subscribers. Original membership and statuses were retained; that step created no CSV containing customer addresses. Unsubscribed/suppressed contacts were not reactivated. No campaign was sent. At that check, the active RC waitlist and newsletter automations targeted different groups; the Lite waitlist automation was inactive. None targeted the new destination group. These are historical counts and automation observations, not a fresh post-migration inventory.

That initial group copy changed MailerLite membership only. The separate Moonbase customer/license migration below subsequently completed ownership migration. The [native integration](https://help.moonbase.sh/articles/2182854-mailerlite) synchronizes opted-in customers and groups from Moonbase to MailerLite and now documents two-way newsletter consent updates; its optional inbound contact import does not grant licenses. Alex confirmed after the license import that everything is syncing to MailerLite. That historical confirmation was not an independent field-by-field audit; the October 21 email-membership reconciliation above supplies a later inventory without testing every consent-conflict case.

## Customer and license migration — September 22 follow-up

- Alex supplied a 179-row MailerLite export and a 180-row customer export containing 32 names. Merged by email into 180 unique customers. Alex explicitly requested `newsletter=yes` for the 177 records marked Subscribed; the two Unsubscribed and one Bounced records were left blank. This records Alex's import direction, not independently verified consent evidence.
- Alex imported that customer CSV into Moonbase. The dashboard then showed 181 total customers and two existing RCL owners (the two test accounts).
- At Alex's request, the agent imported one perpetual `robin-control-lite` license for each of the 179 imported customers without an existing license. The one existing owner in the 180-row source was excluded. Product defaults govern activation limits and offline activation; no expiration, legacy keys, or historical license dates were invented.
- Moonbase validated all 179 rows and reported **179 Imported**. Post-import verification showed **All Customers: 181** and **Robin Control Lite Owners: 181**. All 180 imported customers now have RCL ownership, alongside the other pre-existing test account.
- [Completed license import report](https://app.moonbase.sh/import/09726439-30d8-410a-9ebf-13467195abb7/results). Do not rerun the successful license import: Moonbase's license import is not deduplicated like its customer import.
- Used Moonbase's CSV import, which its migration guide documents as sending no customer emails. No campaign or customer notification was sent by the agent. Imported customers without passwords must set one through the password-reset flow when the website is ready.
- Alex confirmed after completion that the migrated data is syncing to MailerLite. No further bulk copy or native-integration setup is needed for this migration. Exact post-sync MailerLite counts, field overwrite behavior and suppression-conflict tests were not independently audited; do not present the earlier 178 count as the current sync total.
- Customer CSVs and import tooling remain outside the repository. The 177/3 marketing mapping is specific to this approved migration; keep new customer signup opt-in optional. Blank import preferences do not revoke an existing Moonbase opt-in.

## Verification and release follow-up

### Checkout identity issue found September 22

- A controlled customer test exposed conflicting sessions: the embedded preview was signed in to the newly created customer, while the hosted Moonbase portal retained an older customer login.
- The completed sale's entered contact email matched the new customer, but its linked customer and issued license belonged to the older hosted customer. The new customer's Products panel showed no products; the merchant customer list confirmed zero licenses. This is an ownership issue, not just email prefill or a display delay.
- Signing out of the older hosted portal session and opening a fresh checkout from the still-signed-in embedded preview corrected the email prefill. The agent stopped before Complete (which accepts terms). Alex then confirmed successful checkout as the new customer and Robin Control Lite appearing in that customer's Products area. This verifies acquisition and account ownership after clearing the conflicting session; receipt delivery, installer download and plugin activation were not confirmed by that report.
- Treat the hosted-session conflict as an unresolved launch check. Local code supplies no customer-email override. Do not assume HTTPS deployment fixes this: production mobile also redirects. If reproduced, raise with Moonbase using the mismatched sale record and distinct hosted/embedded account steps. Do not transfer/delete licenses or merge customers to conceal the failure.

### Other verification and launch checks

- `node --test tests/storefront.test.cjs`: eight passing checks for one-time setup, actual Lite identifiers, duplicate clicks, failure fallbacks, missing data, and owned download routing.
- Browser: embedded cart add at $0, refresh persistence, remove, Escape dismissal, account sign-in and sign-up panels, unchecked marketing consent, hosted free checkout and Cancel return. The agent did not complete checkout or create an account; Alex performed the customer test described above.
- All ten pages checked at 320px and 1280px: no horizontal overflow or broken loaded images; local asset targets and IDs pass. Mobile navigation closes before opening Account. Analytics rejection leaves GA4 unloaded while Moonbase works.
- Local checkout handoff, customer sign-in, acquisition and account product visibility are verified by agent inspection and Alex's customer test above. Fulfillment email to the intended account, licensed installer download and email/reset/activation callbacks still require verification.
- Review updated policy/EULA with counsel before deployment. EULA activation terms mirror the authoritative product repo; policy changes cover Moonbase accounts, orders, activation data and essential storage. Existing historical Lemon Squeezy/Cloudflare disclosures remain.
- Embedded mode is selected in Moonbase and the production launch includes the matching storefront widget and `mb_intent` handling. Verify customer email, password-reset and activation callbacks on the deployed HTTPS site before relying on a subscriber campaign.
- Legacy Lemon Squeezy receipts and the separate sync Worker remain unchanged. Ownership migration for the supplied 180-customer cohort is complete; retiring the Worker and preserving legacy receipt/download access remain separate tasks.
- The customer-facing Moonbase download page was rechecked September 28 and offered both the Mac 2.0.0 package and Windows 2.0.0 VST3/AAX installer. Public platform claims match those files.

## October 21 review sources

- [Moonbase checkout configuration](https://moonbase.sh/docs/storefronts/embedded/#checkout): supported hosted redirect, return handling, anonymous checkout and wallet behavior.
- [Moonbase buyer terms](https://help.moonbase.sh/articles/3131239-terms-and-conditions-for-buyers) and [refund operations](https://help.moonbase.sh/articles/0432887-refunds-chargebacks-and-failed-orders): provider license is separate from sale terms; the dashboard processing window is not a blanket legal refund limit.
- [European Commission digital contract rules](https://commission.europa.eu/topics/business-and-industry/contract-rules/digital-contracts/digital-contract-rules_en) and [UK Consumer Rights Act](https://www.legislation.gov.uk/ukpga/2015/15/body/2025-04-06?view=extent): paid-product wording preserves mandatory consumer rights; counsel review remains appropriate.
- [Google privacy policy](https://policies.google.com/privacy) and [Moonbase privacy policy](https://moonbase.sh/privacy-policy/), reconciled with the actual activation configuration and existing video embeds.

## Sources reviewed

- [Embedded storefront API and configuration](https://moonbase.sh/docs/storefronts/embedded/)
- [Moonbase C++ SDK](https://github.com/Moonbase-sh/moonbase-cpp) — plugin licensing, not website code
- [Moonbase–MailerLite integration](https://help.moonbase.sh/articles/2182854-mailerlite)
- [Moonbase privacy policy](https://moonbase.sh/privacy-policy/)
- [ICO storage/access exceptions](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/)
- [ICO electronic-mail marketing rules](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-direct-marketing-using-electronic-mail/how-do-we-comply-with-the-pecr-electronic-mail-marketing-rules/)
- `/Users/alex/Documents/Github/robin-control-redesign/MOONBASE_INTEGRATION.md`, `FINAL_RELEASE_2.0.0.md`, `EULA.md`, `Privacy.md`, plus live release dashboard. Live settings supersede earlier private-beta snapshots.
