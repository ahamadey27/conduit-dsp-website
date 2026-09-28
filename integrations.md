# Integrations — September 28, 2026

Implementation was prepared in `.worktrees/visual-refresh`, branch `codex/visual-refresh`, and authorized for production launch on September 28. Earlier planning is preserved in `MOONBASE_MIGRATION.md`; the facts here supersede its September 19 assumptions.

## Website wiring

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

That initial group copy changed MailerLite membership only. The separate Moonbase customer/license migration below subsequently completed ownership migration. The [native integration](https://help.moonbase.sh/articles/2182854-mailerlite) synchronizes from Moonbase to MailerLite; it is not a reverse customer/license import. Alex confirmed after the license import that everything is syncing to MailerLite. Treat that as user-confirmed migration sync, not an independent field-by-field audit of names or every unsubscribe/suppression conflict case.

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

## Sources reviewed

- [Embedded storefront API and configuration](https://moonbase.sh/docs/storefronts/embedded/)
- [Moonbase C++ SDK](https://github.com/Moonbase-sh/moonbase-cpp) — plugin licensing, not website code
- [Moonbase–MailerLite integration](https://help.moonbase.sh/articles/2182854-mailerlite)
- [Moonbase privacy policy](https://moonbase.sh/privacy-policy/)
- [ICO storage/access exceptions](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/)
- [ICO electronic-mail marketing rules](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-direct-marketing-using-electronic-mail/how-do-we-comply-with-the-pecr-electronic-mail-marketing-rules/)
- `/Users/alex/Documents/Github/robin-control-redesign/MOONBASE_INTEGRATION.md`, `FINAL_RELEASE_2.0.0.md`, `EULA.md`, `Privacy.md`, plus live release dashboard. Live settings supersede earlier private-beta snapshots.
