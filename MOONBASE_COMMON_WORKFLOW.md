# Moonbase common workflows

Last checked: November 14, 2026 (campaign sending domain and address). These are operating instructions, not authorization to change settings or send emails. Check the live dashboard before using dated prices, release details, or UI labels.

Use this guide for repeatable steps. [integrations.md](integrations.md) records what has actually been configured and tested; [MOONBASE_MIGRATION.md](MOONBASE_MIGRATION.md) records the migration and remaining checks.

## Quick links

| Task | Destination |
| --- | --- |
| Configure Robin Control | [Robin Control product](https://app.moonbase.sh/products/robin-control) |
| Configure Lite | [Robin Control Lite product](https://app.moonbase.sh/products/robin-control-lite) |
| Create or edit discount codes | [Coupons](https://app.moonbase.sh/coupons) |
| Customer records | [Customers](https://app.moonbase.sh/customers) |
| RCL owner source | [Moonbase RCL owners](https://app.moonbase.sh/customers/robin-control-lite-owners) |
| RCL owner email group | [MailerLite RCL owners](https://dashboard.mailerlite.com/groups/199342264550425765) |
| RC hosted purchase entry | [Buy Robin Control](https://conduitdsp.moonbase.sh/buy/robin-control) |
| RC download entry | [Download Robin Control](https://conduitdsp.moonbase.sh/download/robin-control) |

## Configure Moonbase campaign sending

Reviewed November 14, 2026 against the live **Account settings → Email** page, [Moonbase sending-domain documentation](https://help.moonbase.sh/articles/9845316-custom-email-sending-domains-and-addresses), [campaign documentation](https://help.moonbase.sh/articles/3277265-email-campaigns), and [Namecheap DNS instructions](https://www.namecheap.com/support/knowledgebase/article.aspx/317/2237/how-do-i-add-txtspfdkimdmarc-records-for-my-domain/). Domain creation, Namecheap publication, Moonbase verification and marketing-address creation were completed; email delivery and replies remain untested. See the dated integration record.

1. Under **Email sending domains**, enter a dedicated subdomain and click **Add**. Use its generated DNS values, not another account's example.
2. In Namecheap, choose **Domain List → Manage → Advanced DNS → Host Records → Add New Record**. Add the two DKIM **CNAME** records, recommended return-path **CNAME**, and recommended DMARC **TXT** only if no DMARC policy already exists. Namecheap **Host** omits `.conduitdsp.com`; keep the full destination in **Value**, and use **Automatic** TTL. Save with the checkmarks or **Save All Changes**. Preserve existing website, Google Workspace and MailerLite records. Publishing DKIM grants Moonbase sending authority and needs authorization.
3. Return to Moonbase and click the domain's **Refresh**. Wait for **Verified** and check individual record statuses. A failed verification offers **Retry**; inspect the actual error and public DNS before making another change.
4. Under **Email sending addresses**, choose **Add address**. Select the verified domain, set **From address → hello**, **From name → conduit.dsp**, uncheck the default **Transactional**, and check **Marketing**. Click **Add** and verify the new table row shows the address, name, purpose and domain. Reload to check persistence when re-verifying later. This sender setup does not itself create an inbox; check reply handling before sending.
5. For a separately authorized campaign, verify the sender in its editor and send an approved test to the intended address. Check delivery, authentication headers and replies. Audience eligibility follows the campaign's consent type; ownership alone is not newsletter consent. Domain verification alone does not prove delivery or authorize a campaign.

## Test campaign delivery and replies

Documentation reviewed November 14, 2026; these steps have not yet been exercised. Sources: [campaigns](https://help.moonbase.sh/articles/3277265-email-campaigns) and [customer email branding / reply-to](https://help.moonbase.sh/en/articles/6485055-emails-your-customers-receive).

1. Under **Account settings → Account → Account Information**, check the customer-facing **Email address** is the monitored inbox, intended here as `hello@conduitdsp.com`. Save any authorized correction. Moonbase documents this as the reply-to; it differs from the configured campaign From address.
2. Open **Campaigns**. Use an existing draft or **New campaign**, choose its name, type and audience, then **Start writing**. Fill subject and body; save. Check the sender and desktop/mobile preview.
3. Open **Send**, use its test-send option with your own recipient address, and leave the audience send/schedule options untouched. Inspect the received message, links and sender.
4. Click Reply, check the destination is the monitored inbox, and verify a sent test reply arrives there. Test delivery, message authentication and reply routing remain unverified until performed; no receiving mailbox on the sending subdomain is established by sender verification.

## Correct the account display name in emails

Reviewed November 14, 2026 using [Moonbase account-name instructions](https://help.moonbase.sh/en/articles/4930456-changing-your-account-name-or-id-or-closing-your-account). The user reports `{{ account.name }}` renders as `conduitdsp`. The account display name and permanent Account ID are separate; neither field is editable under **Account settings → Account**.

1. For a global correction, ask Moonbase support through dashboard chat or `support@moonbase.sh` to change **Account Name** to **conduit.dsp**, retaining **Account ID → conduitdsp** and the existing tenant URL. Sending that request requires Alex's instruction; none has been sent.
2. Moonbase flags its legacy `moonbase_JUCEClient` module as name-sensitive. Both current local product CMake configurations instead reference `moonbase-cpp` v4.4.0 / `moonbase_licensing`; this inspection does not audit historical shipped binaries.
3. After support confirms completion, reload Account settings and preview `{{ account.name }}` in a draft. Verify checkout/customer-portal branding and a test email. No rename has yet been completed or tested.
4. For an immediate draft-only workaround, replace the variable with literal **conduit.dsp**, save, then preview. This changes only that editable text; it does not update automatic account branding. The marketing sender's From name is already **conduit.dsp**.

## Maintain the website newsletter signup

Implemented, browser-tested and published November 14, 2026 with Alex's authorization. GitHub Pages built the runtime deployment at 20:17:38 UTC; the live homepage and enabled Subscribe button were verified. Deployment evidence is in `integrations.md`. This supersedes the earlier proposal below for the website form only.

1. In **Customers → Conduit DSP Newsletter**, verify **Open to sign-ups** and the full **Group ID → conduit-dsp-newsletter**. Read the ID itself; a partial text selection omitted the initial `c` during this setup. Do not remove customer accounts or alter marketing consent merely to clear list membership.
2. The homepage form uses `data-moonbase-form="subscribe"`, `data-moonbase-feedback="inline"`, an email input, and hidden `groups=conduit-dsp-newsletter`. Its inline message element remains inside the form. The storefront owns submission and confirmation; `newsletter.js` only gates availability until shared storefront setup completes and displays a load-failure message. Keep the static submit button disabled and `method="post"` so a failed SDK cannot place an address in the page URL.
3. Shared storefront defaults currently expose newsletter and product-update preferences; the form explicitly promises news, product updates and discounts with an unsubscribe option. Account email-confirmation settings remain unchanged. A confirmed existing customer may subscribe immediately; that does not test a new address's confirmation-email journey.
4. After an authorized preview signup, verify Moonbase's inline success and refresh the target group to confirm the intended member. Check desktop and 320px layout, native invalid-email validation and failed-loading availability. Preserve existing subscriber suppressions. Test with an owner-approved address; keep that address out of public documentation.
5. No live page loads MailerLite Universal or posts the website signup to MailerLite. The separate native Moonbase–MailerLite sync remains connected, and privacy copy discloses it. Fully retiring MailerLite, migrating old subscribers and activating automations remain separate work; do not represent a form change as disconnecting the vendor.
6. Publish the reviewed website changes through the production `main` checkout, then recheck the live form and group membership. Local success alone does not establish deployment or fresh-address email delivery.

Reference: [Moonbase newsletter form contract](https://moonbase.sh/docs/storefronts/embedded/#newsletter-sign-up-forms). The one approved existing-account signup succeeded and the group showed one member; a fresh-address confirmation and unsubscribe were not tested.

## Plan a newsletter move from MailerLite to Moonbase

Researched November 14, 2026; this was the initial migration proposal. The website signup implementation above supersedes the original MailerLite form wiring; broader audience migration remains incomplete. Native Moonbase campaigns, groups, guest contacts and beta automations support the basic replacement; current audience coverage, workflow parity and delivery still need testing.

1. Inventory MailerLite groups, eligible subscribers, suppressions and active automations. Preserve the historical RC waitlist benefit separately from general newsletter membership. Do not rerun the completed product-license import or convert owners into subscribers.
2. Under **Customers**, use **+** beside **Customer Groups**, name the group (suggested **Conduit DSP Newsletter**), and choose **Curated list** under **Members**. Review the permanent group ID. Complete the displayed create/save control; exact button not yet checked live. In its **… → Edit details**, enable **Open to sign-ups**, save and reopen to verify. Moonbase documents the manual **Add customers** limit as **100 at a time**, not a 100-member total list cap; additional manual batches and storefront sign-ups are separate operations. If the live UI states a different total cap, verify it before migration. Membership by itself is not communication consent. A rule-based newsletter-subscriber Segment is an alternative when an automatically maintained view of every opted-in subscriber is wanted.
3. Reconcile existing eligible MailerLite subscribers through **Account settings → Integrations → MailerLite → Settings → Import contacts → Import MailerLite subscribers as contacts → Save**. Inspect import status and representative consent outcomes before any campaign. Vendor documentation says the native import matches email, preserves newer preference decisions, skips suppressed/unconfirmed addresses and creates guests without email notifications. Original MailerLite group-to-Moonbase-list mapping is not established; verify it separately. Historical inbound import was off, not a fresh settings check.
4. For the website change, use Moonbase's documented subscribe-form attributes and the new list ID in its `groups` field. Choose communication categories deliberately: signup follows `communicationPreferences.show`, so align visible consent wording and confirmation behavior. Replace the old submit integration and test mobile/desktop, validation, repeat signup, confirmation, group membership and unsubscribe. Keep admin credentials out of frontend code. No runtime changes are authorized by this research answer.
5. Recreate only the intended welcome sequence in **Automations**, leave it inactive until reviewed, and test it separately. Keep MailerLite available until subscriber/status reconciliation and the complete replacement flow pass. Review privacy wording for the resulting actual processors; inspect the legacy Worker before retirement. Do not disconnect tools, delete lists or send audience emails merely to test a migration.

Sources: [groups and lists](https://help.moonbase.sh/articles/9175847-customer-segments), [embedded newsletter forms](https://moonbase.sh/docs/storefronts/embedded/#newsletter-sign-up-forms), [MailerLite native import](https://help.moonbase.sh/en/articles/2182854-mailerlite), [subscriber import behavior](https://help.moonbase.sh/articles/8939140-import-newsletter-subscribers), and [November 2 automation launch](https://help.moonbase.sh/en/changelog).

## Reconcile RCL owners with MailerLite

Verified October 21, 2026. Ownership and marketing consent are separate: do not turn every owner into an active marketing subscriber. The [native integration](https://help.moonbase.sh/articles/2182854-mailerlite) documents syncing newsletter-opted-in customers and their groups, with newsletter consent updates in both directions. Optional inbound MailerLite contact import creates guests; it does not grant licenses.

1. Open **Customers → Robin Control Lite Owners** in Moonbase. Choose **Export customers**, keep that exact group and no unintended date restriction, then export and download the prepared CSV. Store it privately outside the website repository; it contains customer data beyond emails.
2. In MailerLite, open **Subscribers → Groups → Moonbase: Robin Control Lite Owners** (`199342264550425765`). Change **Showing** to **All**, including unsubscribed, bounced and unconfirmed records. Record every status count. Export the group, or read every visible table page if the export cannot be retrieved; do not compare only the first 50 rows.
3. Compare unique email sets after trimming whitespace and lowercasing. Keep email-level differences private. Separate missing owners by Moonbase **NewsletterOptIn**, **EmailConfirmed** and **EmailSuppressed**. Check missing consent-qualified addresses in MailerLite's global **All subscribers → All** before creating anything, so existing suppression or unconfirmed states are preserved.
4. Inspect **Account settings → Integrations → MailerLite** in Moonbase: health, last sync, errors and activity. In **Settings**, check optional e-commerce and inbound **Import contacts** without exposing the connection key. Do not toggle the integration, change consent, or run inbound contact import just to force an outbound ownership sync.
5. Inspect MailerLite **Automations** for workflows triggered by this group. Preserve their state. Group changes can otherwise start emails; ordinary reconciliation does not authorize sending campaigns or activating workflows.
6. For authorized, missing, confirmed and opted-in owners who are absent from every MailerLite status, use the target group's **Add subscribers → New → Copy/paste from Excel**. Paste only the needed emails, choose **Import subscribers**, verify the **Email** field mapping and exact destination group, leave **Yes, the imported subscribers should start the automation workflow** unchecked, then **Finish import**. Verify the result counts. Do not import owners without consent as active subscribers or reactivate existing suppressed records.
7. For a verified stale member absent from the current Moonbase owners source, open its MailerLite subscriber profile → **Edit**. Remove only the **Moonbase: Robin Control Lite Owners** group chip, leaving other groups, fields and subscription status intact. Click **Save changes** and confirm the remaining memberships. Do not delete the subscriber or create a Moonbase license to make lists match.
8. Re-read all final group emails and status counts. Confirm intended additions, stale membership removals, and zero missing consent-qualified owners; report non-opt-in exclusions separately. Preserve historical non-active records. Record aggregate evidence in `integrations.md`, with no addresses, CSVs or credentials in git.

October 21 result: **198** owners, **179** newsletter opt-ins; all 179 represented in the reconciled **186**-member group, with **177 active / 4 unsubscribed / 4 bounced / 1 unconfirmed**. Twelve owners without opt-in were excluded. Three eligible emails were added and three stale memberships removed; no automations were started. These counts are a dated snapshot, not a guarantee of future membership or delivery.

## Make a product purchasable / launch Robin Control

Moonbase purchasing, published downloads, and website deployment are separate controls. Publishing an installer does not enable sales. Enabling sales does not publish the website worktree.

1. Open **Products → Robin Control**.
2. Review **Pricing**: confirm the default variation, currency, amount, and perpetual/subscription terms. Check **Discounts** for any adjustments that would change the intended price.
3. Check **Releases** for the intended active version and correct platform installers. Check the fulfillment message for current customer instructions.
4. When ready to accept real orders, turn on **Product is purchasable** in **Pricing** and click that section's **Save** button.
5. Reload the product page and confirm the switch remains on. This enables real purchasing through Moonbase, including direct purchase links, even if the public website has not changed yet.
6. Refresh the website preview. Click **Buy Robin Control** and confirm the cart contains RC, with the intended price and currency. Checkout uses `redirect: 'always'` on all devices after the October 21 desktop-overlay stall. Verify the hosted page shows the correct product, amount and intended customer identity; completing an order is a separate action.
7. Publish the prepared website changes: review and commit the worktree changes, merge `codex/robin-control-storefront` into `main`, and push `main` to GitHub. GitHub Pages serves the root of `main`; confirm its deployment completes.
8. On the live website, verify the purchase button, cart, checkout handoff, and account/download entry points. For an authorized completed test order, verify the intended customer receives ownership and can access the correct installers. Check for conflicting embedded and hosted customer sessions as described in [integrations.md](integrations.md).

**October 21 snapshot:** Alex authorized the website launch and confirmed enabling purchasing. Dashboard verification shows $39 USD perpetual access with no storewide discount, five device activations, and an active 1.0.2 release containing Mac and Windows 1.0.2 installers. The website must state macOS 13+ for RC. The published RC refund policy accepts full-refund requests within 14 days, including after download/activation. See [integrations.md](integrations.md) for checks and limits.

**Historical October 5 snapshot:** Alex explicitly chose to keep purchasing off. RC's Mac and Windows v1.0.0 installers are already published. The Standard offer and website price are $39 USD; Alex confirmed removing the storewide discount. The website changes remain in `.worktrees/robin-control-storefront`; they are not deployed. Recheck all of this when launching.

## Stop accepting new purchases

1. Open the product and go to **Pricing**.
2. Turn off **Product is purchasable**, then click **Save** in that section.
3. Reload and confirm the switch is off. Verify a fresh purchase attempt is unavailable.
4. If the public website advertises buying the product, update that call to action to match the intended availability.

Use the purchasing switch for sales availability. Deleting the product, changing license ownership, and unpublishing downloads are different operations.

## Change the regular price or configure a sale

1. Open the product. In **Pricing variations**, use **Edit** on the intended variation to change its base price and save the change using the displayed controls.
2. If a temporary sale is requested, use the product's **Discounts** section instead. Use **New discount** or edit the intended existing discount; set the amount/percentage, eligibility, and active period, then save.
3. Reload and verify the saved variation and discount. In the storefront, check both the displayed price and cart total for the intended customer.
4. Check the static website price fallback too. The RC detail page currently starts with `$39 USD`; Moonbase's dynamic binding replaces it when price data is available. Update that fallback if the offer changes.

Multiple eligible product discounts use the best discount; coupons have separate combination rules. Do not assume a coupon behaves like another product discount. See [Product Discounts](https://help.moonbase.sh/articles/3528218-product-discounts).

## Create a 30-day discount for selected recipients

Use **Coupons** for a discount applied to a purchase. **Vouchers** grant product licenses directly and serve a different purpose.

A coupon's dashboard name does not itself create a redeemable code. Save each section separately and account for daylight-saving changes when setting an exact duration.

1. Open **Coupons → New coupon**.
2. Enter a name and customer-facing description, then click **Create**. An example name is `Robin Control launch discount`; choose the actual offer before setting its amount.
3. In **Discount**, select **Percentage off** or **Flat amount off**, enter the amount, and configure **Coupon can be combined**. Save that section.
4. In **Restrictions**, select **Robin Control** under **Product** and click **Add product**. Selecting a product in the picker alone does not add the restriction. Verify it appears in the restriction list.
5. Set **Max redemptions** to the total permitted uses across all codes. For 25 selected recipients receiving one use each, use `25`.
6. Set **Max redemptions per code** to `1` when giving each person a unique code.
7. In **Restrict to time span**, replace **Always active** with the intended start and end dates/times. Set the end 30 days after the intended launch or send time. Check the timezone shown by the interface, then save the Restrictions section.
8. In **Codes**, add a unique code for each recipient, one per line, using the displayed add/save controls. Codes are case-insensitive. Avoid reusing a code already assigned to another coupon.
9. Reload and verify the discount, product restriction, limits, dates, and code count. Check the resulting checkout total before distributing codes; an actual redemption may consume a use.
10. Send each recipient their assigned code, the product link, and an explicit expiry date/time when the campaign is authorized. Keep the recipient-to-code mapping outside this public repository.

The expiry is a fixed timestamp, not automatically 30 days after an email is opened. For recipients contacted on different dates, individual codes can have their own validity spans; ensure the parent coupon's span also allows those dates.

Unique single-use codes control the number of redemptions, not the recipient's identity. A forwarded code can be used by someone else first. The inspected coupon UI did not establish an email allowlist. If access must be tied to named customers, verify a supported eligibility mechanism before promising that restriction.

For one shared code instead, set **Max redemptions per code** to the intended total rather than `1`. This is easier to distribute but does not reserve one use for each recipient.

If no redemption cap is intended, leave both limits blank. Setting the shared code's limit to `1` allows one use across all customers, not one use per person. An exact 30-day window is 720 hours; local start/end clock times may differ across daylight-saving changes. Always reload to verify the saved product restriction and date range before creating the code.

Source: [Moonbase Coupons](https://help.moonbase.sh/articles/6089030-coupons).

### Check the promised 50%-off offer

At the $39 USD regular price, a 50%-off coupon gives a $19.50 price before tax. Configure whether the coupon can combine with other discounts and verify the actual checkout total before sending it. On October 23, the existing shared RC coupon was accepted by live hosted checkout and reduced $39 to $19.50, with no payment submitted. Removing signup forms does not remove the existing subscribers' promised benefit.

## Change or end a coupon campaign

1. Open **Coupons**, find the coupon, and select **Edit**.
2. Review the discount, product restrictions, overall/per-code redemption limits, validity span, and current redemptions.
3. Adjust the intended field and save its section. To end a campaign, adjust its validity span so it no longer includes the current time; review any individual-code dates too.
4. Reload and confirm the saved values, then verify a fresh checkout applies or rejects the code as intended.
5. Keep any customer-facing expiry/offer wording consistent with the saved configuration.

## Troubleshoot “Coupon code not found”

Verified October 23, 2026 against the live dashboard and hosted checkout. This error can appear even when the code exists: the RC coupon was scheduled for a future one-hour window, and correcting its validity span made the same code work.

1. Open **Coupons → Edit** for the intended coupon. Confirm the customer's exact code appears under **Codes**, the discount is configured, and the coupon is not deleted. The **Active** status alone does not establish that the current time falls inside its validity span.
2. Under **Restrictions**, inspect the listed product and pricing variation, both redemption limits, and **Restrict to time span**. Check any individual-code date restrictions too. Compare dates with the approved campaign terms before changing anything.
3. To repair an incorrect span, click its date field and use the calendar to choose the start and end dates. Use **Open time picker** and its hour/minute controls to set both times. Avoid committing typed dates with Enter: during this check Enter also removed the product restriction in the unsaved form; reloading discarded that side effect. Recheck product eligibility before saving.
4. Click the **Restrictions** section's **Save**, then reload. Confirm the intended range, product/variation, limits, discount and combination setting persisted. For the existing 720-hour RC window, the approved UTC endpoints are **October 21, 2026 21:35 → November 20, 2026 21:35**; in New York this displays **October 21 17:35 → November 20 16:35** across the daylight-saving change.
5. At hosted checkout, enter the existing code and click **Apply**. Verify **Coupon applied**, the discount amount and the final total. Stop before **Pay now** unless a completed order is separately authorized. Applying the code in this check left dashboard redemptions at zero.
6. Record the cause and verification in `integrations.md` without the private code or billing details. Do not replace a distributed code or alter campaign terms just to troubleshoot it.

Reference: [Moonbase Coupons](https://help.moonbase.sh/articles/6089030-coupons), including coupon and individual-code validity spans.

## Troubleshoot “Coupon has reached max number of redemptions”

Reviewed October 25, 2026 against the live dashboard and [Moonbase Coupons](https://help.moonbase.sh/articles/6089030-coupons). **Max redemptions** is shared across every code attached to the coupon; **Max redemptions per code** is a separate cap. A code can show zero uses and still be blocked because another code exhausted the shared allowance.

1. Open **Coupons → Edit** for the intended coupon. Check the discount, product restriction, status and validity span, then inspect both limits under **Restrictions**.
2. Review **Codes → Metrics** for every attached code. Compare their combined redemption count with **Max redemptions**, and the intended code's count with **Max redemptions per code**.
3. If each of five distinct codes should work once, the intended configuration is **Max redemptions → 5**, **Max redemptions per code → 1**. The overall limit includes completed redemptions; it is not the remaining allowance. Confirm the intended number of uses before increasing it, particularly for a 100%-off coupon.
4. After an authorized correction, change only the relevant limit and click the **Restrictions** section's **Save**. Reload and verify both caps, product restriction and existing code metrics persisted.
5. Retry the unused code at checkout and verify the discount and total. Do not complete a redemption merely to test the setting. Record the outcome without private codes or customer details.

October 25 inspection found five codes with one completed redemption, an overall cap of one, and a per-code cap of one. The discount was 100% off Robin Control. No settings were changed and no checkout was tested; increasing the shared cap to five was a proposed correction, not a completed action.

## Troubleshoot “The store could not open here”

This is the website's generic fallback for a failed storefront action. It does not identify the cause by itself.

1. Note which button failed, the page URL, and whether it happened on the preview or live site.
2. Check the target product's **Product is purchasable** setting. For RC on October 5, the storefront loaded successfully but add-to-cart failed because purchasing was off. Do not enable sales merely as a diagnostic step while launch is on hold.
3. Confirm the button uses the intended product. RC is `robin-control` with Moonbase's default offer; Lite is `robin-control-lite` with variation `free`.
4. For a local preview, use the already-allowed origin `http://127.0.0.1:8765`. A different hostname or port is a different origin. Check the configured domain allowlist before assuming an SDK/network failure is a website-code error.
5. If Account and Cart also fail, check the Moonbase script/data request and browser console for loading or origin errors. After correcting the cause, reload before trying again.
6. **Continue on Moonbase** should point to the matching product's hosted buy/download link. It is a fallback route, not a way to bypass disabled purchasing.

Implementation reference: [Moonbase embedded storefront](https://moonbase.sh/docs/storefronts/embedded/).

## Publish a correctly versioned installer release

1. Open **Products → Robin Control → Releases → New release**. Set the major/minor/patch fields to the installer version; do not leave the suggested next patch without checking it.
2. Enter accurate platform requirements and installation notes in **Description**. Use unpinned product/account links in fulfillment messages.
3. Click **Choose files** and select only the approved final installers. Check each platform selector: `.pkg` = **Mac**, `.exe` = **Windows**. Wait until upload progress finishes.
4. If Chrome automation cannot set files because file-URL access is disabled, the normal macOS file picker can select the exact files without changing extension permissions. Verify the selected filenames before **Open**.
5. Review the version, description and platform assignments, then **Create & publish** only when publication is authorized. Confirm the new version becomes **Active**, and verify the customer Downloads panel shows the matching version and both installers. Existing historical releases can remain published.
6. Download the customer-facing package and compare its hash with the approved artifact. A successful upload is not proof of its content, signature, installation or activation.

**October 21 application:** The old release was labeled 1.0.0 but already contained 1.0.2 files. A correct 1.0.2 release was published with those same files; no binaries were rebuilt or installed.

## Share an unpublished beta with selected customers

Reviewed October 23, 2026 against the live dashboard and official documentation. **Download permission and storefront listing are separate:** an unpublished pre-release stays out of the normal customer portal release listing. Give testers a version-specific download link; publishing it would make it current and apply the **Current release** policy instead.

1. Open **Customers → RCL Test Group v2.0.1** (or create a customer **List** for another beta). Review its members. To add existing customers, choose **Add customers**, use **Search customers**, tick the intended records and click **Add N customers**. Verify the resulting membership. Group creation does not itself grant a product license; check existing ownership before any separately authorized license grant.
2. Open **Products → Robin Control Lite → Releases**. Confirm **2.0.1** says **Pre-release** and **2.0.0** says **Active**. For a future beta use **New release → Create release**, rather than **Create & publish**. The inspected 2.0.1 release contains only a Mac installer.
3. In the **Releases** section, choose **Actions → Configure security**. Enable **Set a level per release type**. Keep **Current release → Open access to download**, **Past releases → Require ownership**, and set **Pre-releases → Require group membership → Group → RCL Test Group v2.0.1**. Click **Save** after an authorized change, then reopen the dialog to verify persistence. These values were already saved on October 23; the research task did not alter them.
4. On the **2.0.1** row, open **More actions for release v2.0.1 → Download**. This opens the version-specific customer view. To copy the shareable URL, right-click **Download → Copy link address** before opening it. Copying the address bar after opening can lose the parameters because the embedded storefront consumes them.
5. The dashboard-generated link observed October 23 was `https://conduitdsp.com/?mb_intent=download_product&mb_product_id=robin-control-lite&mb_version=2.0.1`. The `mb_version=2.0.1` parameter selects the beta; the ordinary product download link selects the current release. Use the dashboard-generated link for each future release, with its actual version.
6. When distribution is authorized, give that link only to the intended testers. They should sign into the website's Moonbase customer account using the same email as the customer record in the group, then open the full beta link again if needed. An admin dashboard login is separate from customer authentication; hosted and embedded customer sessions may also differ. Group access permits a download; the plugin still uses its existing licensing/activation flow.
7. Verify a group member sees **Downloads Version 2.0.1 → Robin Control Lite 2.0.1.pkg → Download for Mac**, and test the actual file download. In a separate customer session, check that a non-member cannot download that beta, even if they own RCL. Check that ordinary product downloads still select 2.0.0. Keep 2.0.1 unpublished until a public release is authorized.

**Verification limits:** The existing signed-in storefront session displayed Version 2.0.1, the 16 MB Mac package and its Download for Mac button. The actual file transfer, installation/activation, non-member denial and a fresh sign-in through this link were not tested. No settings, group members, licenses or releases were changed and no emails were sent. The group had two members. Access rules apply to all pre-releases of this product, rather than only to the version named in the group.

Sources: [Moonbase Downloads / Releases](https://help.moonbase.sh/articles/3701612-downloads-releases), [Core API release-access categories](https://moonbase.sh/docs/api/), and [Embedded Storefront methods and URL intents](https://moonbase.sh/docs/storefronts/embedded/#call-methods). The API specifies that group membership alone determines group download eligibility on an Active product; a Private product additionally requires ownership. Ownership alone does not satisfy a group restriction.

## Update product links and fulfillment instructions

1. In **Products → Robin Control → Basic Details**, set **Website URL** to `https://conduitdsp.com/plugins/robin-control/`, then save that section.
2. In **Fulfillment**, retain **Software** and **Moonbase** as the generator. Edit **Fulfillment message** with the current download URL, platform minimums, activation instructions, support address, and applicable license/refund links, then save that section.
3. Reload the product and verify both saved values. Test intended-recipient receipt delivery through a separately authorized controlled order; changing this field does not resend previous receipts.

## Process the published 14-day refund policy

1. Check when the buyer emailed the request, order number and purchase email. The RC policy accepts requests within 14 days even after download or activation; it is a voluntary promise in addition to statutory rights.
2. Open **Sales → View** for the intended order (or find the customer and use **Purchases**). Review product, amount, customer and date.
3. Choose **Actions → Refund** and select the intended line/seats. Review **Reason**, optional internal **Comment**, and the amount.
4. Only submit the actual refund when Alex authorizes it. Moonbase emails the buyer, refunds the original payment method and revokes the refunded license. This workflow documentation does not authorize a refund.
5. If the dashboard's 14-day processing window has passed but the request was timely or other rights apply, contact Moonbase support; do not reject a valid request solely because the self-service button expired. Do not promise that an already-issued permanent offline token will stop working.

Source: [Moonbase refunds](https://help.moonbase.sh/articles/0432887-refunds-chargebacks-and-failed-orders). Procedure reviewed October 21; no refund was submitted.

## Keep this guide current

When another basic Moonbase workflow is explained or verified, add it here with the navigation path, exact controls, save step, and a short success check. Date settings snapshots and distinguish observed behavior from untested instructions. Keep deployment history and completed operational changes in [integrations.md](integrations.md). Never include customer lists, private coupon codes, credentials, or API keys in this guide.
