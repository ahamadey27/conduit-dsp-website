# Moonbase storefront migration

**Current status: September 28, 2026.** Work was prepared in `.worktrees/visual-refresh` on `codex/visual-refresh`. The website integration and supplied customer/license migration are complete, both platform installers are available, and Alex authorized production deployment. [integrations.md](integrations.md) is the detailed implementation and migration record.

## Completed work

| Area | Verified status |
| --- | --- |
| Website | All ten worktree pages use the shared Moonbase embedded storefront for cart/account/checkout/download flows. Legacy cart and account stubs are replaced. |
| Tenant and offer | `https://conduitdsp.moonbase.sh`; Lite product `robin-control-lite`, variation `free`, perpetual $0 offer. |
| Preview | `http://127.0.0.1:8765` allowed; hosted checkout for this HTTP preview, normal overlay/mobile redirect on HTTPS. |
| Lite release | Mac 2.0.0 active with VST3/AU/AAX for macOS 11+ on Apple Silicon/Intel; Windows 2.0.0 active with 64-bit VST3/AAX for Windows 10/11. Free Moonbase license, 10 devices, online grace and separate offline activation documented in the product repo. |
| Customer import | Alex imported 180 unique customers, enriched with 32 supplied names. At Alex's direction, 177 Subscribed records used `newsletter=yes`; two Unsubscribed and one Bounced were left blank. |
| License import | 179 perpetual RCL licenses imported successfully; one existing owner in the source skipped. All 180 imported customers own Lite. Dashboard totals: 181 customers and 181 RCL owners, including the other existing test account. |
| MailerLite | Native integration enabled; Alex confirmed the completed migration is syncing. Original source group remains intact. |
| Customer test | Alex completed checkout and saw RCL in the correct account after an older conflicting hosted session was signed out. |
| Site checks | Eight automated storefront checks pass; desktop/mobile, cart persistence, fallbacks and analytics rejection verified. |

The [179-license import report](https://app.moonbase.sh/import/09726439-30d8-410a-9ebf-13467195abb7/results) is complete. **Do not re-import that license CSV.** Customer import matches by email; license import can create duplicates. Keep customer CSVs and import scripts outside the repository. This migration used the silent import flow; no campaign was sent.

## Remaining launch checks

1. Verify fulfillment email to the intended account, licensed installer download, plugin activation and real password-reset/activation callbacks. Imported customers without passwords need the reset flow.
2. Retest conflicting hosted/embedded customer sessions. We observed checkout contact details for the new account but ownership assigned to an older hosted login. Signing out of that older session corrected the subsequent test; no general vendor/code fix has been established.
3. Review the updated privacy policy and EULA with counsel. The policy body in `privacy.md` is historical; use `privacy-policy/index.html` as the updated implementation.
4. Verify checkout, return URLs and emailed intents on deployed `https://conduitdsp.com` across desktop/mobile.
5. Preserve legacy receipts/download access and inspect the old Lemon Squeezy-to-MailerLite Worker before retiring it. Ownership migration for the supplied cohort is already complete.

Alex's MailerLite confirmation resolves the basic migration-sync check. It does not establish exact current group counts or independently test every name-overwrite, unsubscribe, bounce or conflicting-preference case. Blank import preferences do not revoke existing opt-in. Keep new customer marketing opt-in optional and direct newsletter/RC waitlist forms intact.

Robin Control remains Coming Soon with no public price or release date. Its licensing implementation/policy, paid offer, merchant readiness and waitlist-discount delivery require their own current evidence; do not infer them from the completed Lite migration. No sibling product repository was changed by this website work.

## Archived September 19 research

Everything below records the original planning state, not current operational instructions. The completed-work and remaining-check sections above supersede old claims about provider selection, missing IDs, unconfigured MailerLite, no Lite DRM and pending customer ownership. Vendor links remain useful research references; recheck them before implementing new behavior.

### Original decisions and boundaries

| Topic | Status |
| --- | --- |
| Commerce provider | Alex has selected Moonbase as the intended storefront / Merchant of Record replacement for Lemon Squeezy. |
| Website integration | Embedded widget preferred; custom storefront SDK remains an alternative. Prototype before choosing final behavior. |
| Email | MailerLite remains the intended email platform; connecting it to Moonbase is likely, not activated or fully specified. |
| Plugin licensing | Alex confirmed Moonbase for Robin Control in-plugin licensing/activation on September 19, 2026. Activation-policy details remain open. |
| Current implementation | Lemon Squeezy checkout and direct MailerLite forms remain in the website code. |
| Account readiness | Conduit tenant, product configuration, merchant onboarding, integration settings, and commercial terms have not been inspected. |

Only documentation changed during this research pass. No vendor settings, customer records, product binaries, checkout code, or public policies were changed. Sibling repositories were not revalidated; their older status in the shared context remains dated evidence.

## Recommended architecture

Keep the custom static marketing pages and visual refresh. Let Moonbase provide commerce and customer-access surfaces, starting with an embedded prototype. This is a good fit for the existing vanilla stack: Moonbase's official [Corino reference implementation](https://github.com/Moonbase-sh/corino-embed-storefront) uses HTML, CSS, and JavaScript with no build tooling. It demonstrates custom buttons, account/cart intent links, conditional ownership UI, and dynamic prices. Its tenant and product IDs are demonstration data, never Conduit configuration.

The repository Alex supplied, [`Moonbase-sh/moonbase-cpp`](https://github.com/Moonbase-sh/moonbase-cpp), is official but serves **plugin licensing and activation**, not website scripting. The storefront reference above is an example site, not a verified source repository for the underlying JavaScript library.

| Route | Relevant source | Assessment for this site |
| --- | --- | --- |
| Embedded storefront | [Embedded documentation](https://moonbase.sh/docs/storefronts/embedded/) | Preferred first prototype; preserve our product layouts. |
| Custom storefront | [`@moonbase.sh/storefront-api`](https://moonbase.sh/docs/storefronts/sdks/node/) | Customer-facing API client with authentication handling. More UI and maintenance work; justify before adding tooling. |
| React integration | [React SDK](https://moonbase.sh/docs/storefronts/sdks/react/) | Documentation currently labels it private beta. No reason to rewrite this vanilla site around it. |
| Plugin activation | [C++ SDK](https://github.com/Moonbase-sh/moonbase-cpp) | Selected for Robin Control licensing; implementation belongs in the product repository. |

### Embedded prototype contract

The [embedded documentation](https://moonbase.sh/docs/storefronts/embedded/) specifies CDN `https://assets.moonbase.sh/storefront/moonbase.js` and asynchronous `Moonbase.setup(tenantUrl, options)`. It supports themed surfaces, a disabled built-in toolbar, cart/account/download methods, and dynamic bindings. The CDN updates automatically. Checkout defaults to overlay on larger screens and redirection on phones; Apple Pay/Google Pay require the hosted checkout. Signup offers `marketingConsent: 'OptIn'`. Analytics forwarding uses existing SDK globals and relies on the host's consent handling.

For Conduit, explicitly configure the chosen checkout and opt-in behavior; test readiness and failures before enabling buttons. The documentation's plain script example differs from the reference repository's module-loading example: verify the current delivery format rather than introducing a loading race. Match our warm palette, typography, and sharp corners. Keep analytics forwarding disabled in the initial prototype. Evaluate hosted checkout if wallet support outweighs staying in an overlay.

Register exact used origins in the [domain whitelist](https://help.moonbase.sh/articles/7771705-domain-whitelist): local preview `http://127.0.0.1:8765`, production `https://conduitdsp.com`, and any other actually used origin separately. `localhost` and `127.0.0.1` are different origins; do not assume GitHub Pages or `www` aliases are registered.

The account's [storefront mode](https://help.moonbase.sh/articles/8927219-storefront-modes) controls where customer emails send people. Coordinate its destination with working sign-in, email-confirmation, account, and download links. Switch the production destination only when those routes are deployed and tested.

## Website implementation map

These are proposed changes for a later implementation pass, not edits made now.

| Current surface | Migration work |
| --- | --- |
| `assets/js/cart.js` | Replace Lemon Squeezy loading, product URL mapping, first-item checkout, local cart totals, and static currency conversion with one Moonbase-backed commerce flow. |
| Header/cart widgets across all HTML | Use the same commerce state and actions everywhere; avoid two cart badges or competing drawers. |
| `cart/index.html` | Decide between a Moonbase cart entry point and custom view; preserve useful existing URLs. |
| `account/index.html` | Replace or route away from the nonfunctional stub before exposing account navigation. |
| Home, Plugins, RCL detail | Map Lite to the real free product and correct downloadable installers; test new and returning customers. |
| Home, Plugins, RC detail | Preserve Coming Soon, hidden price, waitlist, and existing 50%-off launch promise until launch terms change. No premature Buy button. |
| `assets/js/waitlist.js` and home newsletter | Keep current direct forms initially; only migrate after group, consent, and automation parity is demonstrated. |
| `assets/js/cookie-banner.js`, `googleTag.md` | Preserve optional GA4 opt-in and rejection; test any later commerce-event forwarding against consent changes. |
| FAQ, privacy policy, EULA, footer/support links | Review provider, download, account, and licensing statements against the actual new flow before cutover. |
| LS → MailerLite Worker, separate repository | Retire or narrow only after historical and new-order requirements are accounted for. Do not copy its provider assumptions into Moonbase. |

Do not automatically replay `conduit_cart_v1` into a new checkout. Decide how to explain/reset obsolete cart contents and preserve rollback. Product pages must remain readable if the commerce script fails; offer a verified hosted fallback where appropriate. Never put administrative or MailerLite API keys into browser code.

## MailerLite integration

Moonbase has a [native MailerLite integration](https://help.moonbase.sh/articles/2182854-mailerlite). Its guide says configuration uses a MailerLite API key in Moonbase; enabling it creates corresponding groups and starts syncing all existing Moonbase customers, their subscription status, and group membership, including product ownership groups.

That makes native integration the first candidate, rather than building another sync Worker. Activation is a data migration event, not just wiring up future orders. The guide does not settle every unsubscribe, double-opt-in, or conflict case for Conduit's existing audience.

Before enabling it against the real audience:

1. Inventory actual groups and automations. Map ownership, newsletter consent, and RC waitlist eligibility separately; ownership alone is not permission to send marketing.
2. Test a new opt-in, no opt-in, pending confirmation, existing subscriber, and unsubscribed/suppressed subscriber. Confirm whether changes propagate in each direction, and how conflicts are resolved.
3. Check group-name collisions, duplicates, initial backfill, product-update preferences, and which automations run during sync. Do not revive an unsubscribe or issue duplicate welcome/discount emails.
4. Preserve consent evidence and existing waitlist benefits. The website's 50%-off promise is real; a working coupon and eligibility mechanism in Moonbase still need configuration and verification. Do not assume an old suggested coupon code already exists.
5. Keep direct MailerLite newsletter/waitlist forms until any replacement has passed those checks. Never bundle newsletter enrollment into accepting a free download.

If native sync cannot meet a demonstrated requirement, investigate a narrowly scoped server-side bridge. Moonbase has its own [webhook verification contract](https://moonbase.sh/docs/webhooks/); verify raw-body signatures, encoding, replay/idempotency, and retries using its current documentation and test events. The existing Lemon Squeezy handler is not a drop-in replacement.

## Existing customers and plugin licensing

The website has no working customer-authentication database. Moonbase's [on-demand customer migration](https://help.moonbase.sh/articles/7013169-customer-migration) describes integrating an existing authentication backend, so that recipe is not directly applicable to our hidden account stub. Establish the supported import/mapping process for Lemon Squeezy customers, orders, download access, and marketing preferences. Do not assume passwords or entitlements migrate automatically. Preserve old receipt/download access until the replacement is proven.

The [C++ SDK](https://github.com/Moonbase-sh/moonbase-cpp) provides activation and signed-token validation, including device-bound licensing, optional online validation, and offline activation. These capabilities differ from the July licensing proposal's no-fingerprint, unlimited-activation, permanently-offline-after-activation assumptions. Moonbase is now the confirmed licensing provider for Robin Control. Inspect current code in `round-robin-premium`, then reconcile the desired customer experience and vendor configuration before implementing activation. Do not add copy protection to Robin Control Lite as a side effect of changing stores.

### Robin Control licensing workstream

This is confirmed migration scope, with implementation still pending in `/Users/alex/Documents/Github/round-robin-premium`. Read that repository's current agent guidance and licensing code before changing it; this website documentation update does not establish its implementation status.

- Map the storefront product and customer entitlement to the same Robin Control product used by activation.
- Resolve activation credentials, device count/deactivation, offline activation, validation frequency and outage behavior, and refund/revocation policy. Record explicit decisions rather than accepting SDK defaults as product policy.
- Plan migration for any existing beta licenses or activation paths discovered in the product repository. Preserve DAW projects and user settings.
- Verify valid/invalid activation, restart persistence, offline use, network failure, entitlement changes, and supported plugin formats. Keep network or activation work outside audio processing.
- Align customer account/download help and privacy disclosures with the actual implementation before release. Lite remains free and without copy protection.

## Merchant, privacy, and release readiness

Alex's provider choice is recorded; account activation and the actual Conduit agreement are not verified. Review the applicable [Merchant of Record terms](https://help.moonbase.sh/articles/3990152-service-terms-merchant-of-record) and [merchant agreement structure](https://help.moonbase.sh/articles/1130172-general-terms-and-conditions-for-merchants), including fees, payouts, refunds, support responsibilities, and onboarding requirements, before commercial cutover. No terms were accepted during this pass.

Use the actual deployed data flow and [Moonbase privacy policy](https://moonbase.sh/privacy-policy/) to prepare revised disclosures. Inspect account, payment, download, storage/cookie, and any activation data separately. Keep legal review as a release task; the vendor policy alone does not establish Conduit's compliance. Do not remove Lemon Squeezy or Cloudflare from disclosures while historical services/data processing still require them. No public legal wording is changed by this planning document.

## Implementation sequence and acceptance checks

1. **Configure a testable account:** establish tenant URL, real product/variation IDs, free-download workflow, installer versions, merchant readiness, allowed origins, support/EULA destinations, and hosted fallback. Keep RC unavailable for sale.
2. **Prototype in this worktree:** one shared integration entry point, branded widget, Lite action, account/download links, explicit loading/error states. Decide overlay versus hosted checkout from actual desktop/mobile behavior.
3. **Validate email and legacy access:** use controlled test records for consent/group/automation cases above. Agree historical order/download migration and the old bridge's transition. Avoid real customer imports while merely prototyping.
4. **Complete site integration:** replace the old cart consistently, test return links from email and checkout, prepare policy/help changes, and remove obsolete shared scripts when their replacements work.
5. **Release with rollback:** record the working revision and vendor settings, deploy coordinated changes, verify production flows, then retire superseded services when no remaining dependency needs them. Publishing remains a separate action from this documentation task.

Acceptance checks for implementation: desktop and mobile layout; keyboard/focus/escape behavior; screen-reader labels; cart add/remove/refresh and navigation; new/existing-customer sign-in; free acquisition and installer download; failed/cancelled checkout; real confirmation/reset links; unavailable script/network; analytics rejected/accepted/revoked; no duplicate tracking or messages; correct waitlist discount handling; no exposed RC price, release date, or unsupported format claim. Exercise paid checkout only through a suitable test configuration until the commercial offer is ready.

September 19 unresolved inputs (historical): Conduit Moonbase tenant and IDs; final embed/redirect experience; historical customer migration; native MailerLite sync behavior and group mapping; Robin Control activation limits, offline behavior, and validation policy; actual merchant agreement/onboarding status; RC pricing and launch readiness. Use the current completed-work and remaining-check sections at the top instead of this archived list.
