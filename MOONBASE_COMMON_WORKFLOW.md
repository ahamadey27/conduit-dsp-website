# Moonbase common workflows

Last checked: November 15, 2026 (historical Lite automation and Monday catch-up scheduling). These are operating instructions, not authorization to change settings or send emails. Check the live dashboard before using dated prices, release details, or UI labels.

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

Documentation reviewed November 14, 2026. Later that day, Alex sent the automation editor's sample test to the business inbox; received-message inspection verified From, reply-to, custom mailed-by/signed-by domains and TLS. A sent reply and full SPF/DMARC original-header inspection remain untested. Sources: [campaigns](https://help.moonbase.sh/articles/3277265-email-campaigns) and [customer email branding / reply-to](https://help.moonbase.sh/en/articles/6485055-emails-your-customers-receive).

1. Under **Account settings → Account → Account Information**, check the customer-facing **Email address** is the monitored inbox, intended here as `hello@conduitdsp.com`. Save any authorized correction. Moonbase documents this as the reply-to; it differs from the configured campaign From address.
2. Open **Campaigns**. Use an existing draft or **New campaign**, choose its name, type and audience, then **Start writing**. Fill subject and body; save. Check the sender and desktop/mobile preview.
3. Open **Send**, use its test-send option with your own recipient address, and leave the audience send/schedule options untouched. Inspect the received message, links and sender.
4. Click Reply, check the destination is the monitored inbox, and verify a sent test reply arrives there. Test delivery, message authentication and reply routing remain unverified until performed; no receiving mailbox on the sending subdomain is established by sender verification.

### Verify a real personal code without purchasing

Implemented November 14, 2026 after Alex requested verifying the unique code. A normal editor **Send test** uses a sample code and does not establish real issuance or redemption. For a separately authorized real-code check:

1. Create or inspect a dedicated **Curated list** limited to one approved test customer, with **Open to sign-ups off**. Verify the exact email in its member list. The reusable test list is **Internal coupon test**, ID **internal-coupon-test**; do not assume it still has only one member on a future visit. Do not alter consent to make the test eligible.
2. Create an internal **Newsletter** campaign with that exact list as audience. Use a clearly labelled internal subject/body. Insert **Personal coupon**, select **25% Off Robin Control**, save, then open **Audience** and verify **estimated reach 1 of 1**. Check no licenses or unrelated gifts are included.
3. Under **Send**, review **Codes in this email** and verify the parent coupon, then **Send now** only for the explicitly authorized one-recipient test. This is a real send, unlike **Send test**. The November 14 verification campaign is [Internal personal coupon verification](https://app.moonbase.sh/campaigns/001dc743-5bd8-438e-8c7e-6181855c0bc0).
4. Under the parent **Coupons → Codes**, verify a newly generated code with source campaign and intended recipient, plus **0 of 1 redemptions**. Keep real code values and recipient data outside this public repository. This checks campaign issuance of the same coupon referenced by the automation; it does not execute the automation's seven-day journey.
5. Use a clean browser session or fresh direct purchase to avoid an existing coupon on the order. Applying another code of the same parent coupon can report **Coupon has already been applied**, so that is not an isolated test of the new code. Preserve the original cart and its code.
6. The documented embedded-storefront link pattern creates a fresh order with a code before checkout: the product page URL with `mb_intent=purchase`, `mb_product_id=robin-control`, and `mb_coupon_code` set to the private test code. Navigate through the UI; do not expose actual code values in public notes. A rejected code can still open checkout without a discount, so inspect the summary rather than assuming navigation means success.
7. Verify **Coupon applied** names the new code, **$39 → $29.25**, and **You save $9.75** before tax. Stop before billing/payment entry or payment submission. November 14's clean-session check verified these exact values. Close the temporary checkout session; no purchase was completed and no license was granted.
8. Reopen the campaign's **Recipients** report and verify **1 sent / 1 delivered**, with only the approved test account. The November 14 report confirmed this. The original upgrade automation remained **Draft**, and no catch-up audience email was sent. A single-use limit was configured and inspected; rejection after an actual redemption was not tested.

Received sample-email inspection also found the product card's **View product** link points to the homepage, while the text link to Robin Control points to the correct product page. This separate email-navigation issue remains to fix; no product URL setting was changed during the code check.

Sources: [Moonbase coupon codes and per-recipient issuance](https://help.moonbase.sh/articles/6089030-coupons), [campaign test/send behavior](https://help.moonbase.sh/articles/3277265-email-campaigns), and [embedded purchase links with coupon codes](https://moonbase.sh/docs/storefronts/embedded/#call-methods).

## Choose a campaign audience without merging lists

Official [Moonbase campaign documentation](https://help.moonbase.sh/articles/3277265-email-campaigns) rechecked November 14, 2026. This is documented behavior; no campaign was created or sent to verify it end to end.

1. Under **Campaigns → New campaign**, choose **Type → Newsletter** for general news, offers and discounts. Choose **Audience → All customers** to consider every customer, including those outside the website signup list. Choose a product-owner group for a product-specific audience. Click **Start writing** only when creating an intended draft; fill content and Save.
2. Open the audience in the editor. Review **estimated reach** and exclusions: missing opt-in for the chosen type, blocked addresses after bounces/spam complaints, and pending email confirmation where required. Moonbase states campaigns only send to customers opted in to their type. Selecting All customers does not subscribe anyone, and does not send to every customer indiscriminately.
3. For the Lite upgrade offer, use **Robin Control Lite Owners** and **Narrow this audience** to exclude **Owns → Robin Control**. Newsletter consent filtering still applies automatically. For a release/tips email about a product the audience owns or is trying, choose **Product update** deliberately; it checks its own separate permission, not Newsletter consent.
4. Use **Preview → Desktop/Mobile**, send an authorized test, and review audience reach again before any separately authorized send/schedule. After sending, the campaign's **Recipients** tab reports who was skipped and why.
5. A general newsletter campaign does not require copying old subscribers into **Conduit DSP Newsletter**. Retain that list for website signup membership. If a reusable view of all newsletter opt-ins is useful, create a separate **Segment** with **Account state → Newsletter subscriber → Yes**, Save, and verify matching examples; that segment creation has not been performed for this procedure. A list/segment controls audience organization; the saved communication preference controls permission.

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

## Backfill recent Lite registrations while a purchase automation is live

Implemented November 15, 2026 at Alex's request. Original **RCL day-seven upgrade offer** was already **Active**, with a completed Lite-order trigger, once per customer and **Wait 7 days**. Its Activity recorded activation at **15/11/2026 14:57** in the dashboard clock. Preserve that live flow. A duplicate with another seven-day Wait would count from enrollment rather than the historical order.

### Divide historical recipients into fixed cohorts

1. Inspect the existing **RCL recent upgrade audience** Segment: owns Lite, recorded Lite purchase within 60 days, does not own Robin Control, newsletter subscriber Yes, and no Lite purchase in the last seven days. Read all members; the November 15 overdue cohort was **8**. Use a **closed Curated list** to freeze these recipients for the requested Monday campaign: **RCL Monday catch-up — 16 Nov 2026**, ID **rcl-monday-catch-up-16-nov-2026**. Verify selected customers and final count; do not use the rolling Segment directly for Monday, because younger customers could enter it and overlap the historical automation.
2. To preview younger historical customers, edit the existing Segment temporarily, switch its last behaviour from **Did not → Product purchase → Lite → last 7 days** to **Did**, read the preview, then **Cancel → Discard**. Do not save over the overdue rule. The November 15 preview had **3** matches. Check these records predate the original flow's activation. Freeze them in a separate **closed Curated list**, **RCL historical pending — 15 Nov 2026**, ID **rcl-historical-pending-15-nov-2026**, and verify exactly three members. No future registrations should be added to these lists automatically.
3. Membership does not change consent. The source cohorts were already Newsletter subscribers; no preference was changed. The account's known **50% Off Customers** list had no overlap with either cohort. This checks that known list only, not all historical MailerLite waitlist promises.

### Configure the duplicate to preserve remaining delay

4. Create **Segment → RCL historical day-seven ready**, ID **rcl-historical-day-seven-ready**, matching **all** of **Is in group → RCL historical pending — 15 Nov 2026**, and **Performed → Did not → Product purchase → Involving Robin Control Lite → At least 1 → In a window → last 7 days**. Save, let its initial membership pass finish, and verify **0 members** before activation. It becomes eligible as the frozen customers' Lite-order windows expire. Rule-based timing is asynchronous, not a guaranteed exact-second delivery. A repeat Lite order resets this window; imported licenses without recorded orders were not part of these source cohorts.
5. Open [RCL day-seven upgrade offer 60 Day Customers](https://app.moonbase.sh/automations/e1807261-df4c-44e1-896f-1a73fde53ed0/edit). Change **Trigger → Joins a group → RCL historical day-seven ready → Once**. The live trigger help explicitly excludes imports, initial Segment fill, rule edits and refresh from join events. This flow must be enabled before the three customers enter naturally; do not manually enroll them while still under seven days old.
6. Remove the duplicated **Wait 7 days** step. Keep the **all** Condition: owns Lite, does not own Robin Control, Newsletter subscriber Yes. Matches retains the existing personal coupon then **Newsletter** email; Otherwise ends. Save and verify the segment trigger and absence of Wait, then **Turn on → Turn on** when authorized. The November 15 flow is **Active**, activated at **15:13** in the dashboard clock; initial report **0 enrolled / 0 sent**, expected while the Segment is empty. The future timing/recipient journey remains unexecuted at configuration time.

### Schedule the overdue cohort for Monday

7. Create **Campaigns → New campaign → Newsletter → Audience: RCL Monday catch-up — 16 Nov 2026**. The implemented [RCL 60-day catch-up](https://app.moonbase.sh/campaigns/4cd9bf8e-16e3-4cc4-8b4b-0c17a1838b77) uses the duplicated automation's email. Copy its editor body through the UI and paste into the campaign editor if needed; reselect **25% Off Robin Control** on the copied **Personal coupon** block, because copying stripped its coupon reference in this check. Preserve its heading and product-card link. Inspect **Codes in this email** before scheduling; never treat a visually pasted sample code as a working coupon block.
8. Set subject **25% off coupon for Robin Control** and descriptive preview text. Open **Audience → Narrow this audience**, require **all** of owns Lite and does not own Robin Control. Newsletter type independently applies subscription, suppression and confirmation gates. Confirm estimated reach, here **8 of 8**. The report before send may display **0 recipients** because recipient preparation has not started; distinguish this from the editor's reach estimate.
9. Verify desktop/mobile preview, sample coupon and both product links. The product card's explicit **Button link** in the duplicate was already corrected to the Robin Control page by Alex; preserve it in the campaign. Send an authorized sample to the test account, then verify received content/link. November 15's sample arrived with `EXAMPLECODE1` and the correct product deep link. A November 14 separate real-code check already verified the same coupon's issuance and **$39 → $29.25** checkout acceptance.
10. Under **Send → Schedule**, use the calendar and clock controls to commit the date/time. Typing or setting the visible date input alone did not commit the date in this UI: the Schedule button stayed disabled, and the clock retained its old value. Choose the date in the calendar; open the clock, choose the hour overlay and minute overlay, then click outside the picker within the dialog. Escape closes the entire send dialog and discards unsubmitted schedule settings. Recheck values and click **Schedule**, then reopen/reload the campaign report to verify **Scheduled** and the displayed date/time.
11. The configured campaign is **Scheduled → 16/11/2026 10:00**, **All at once**. Alex asked for Monday but did not specify an hour; 10 a.m. New York was the stated default while an optional time-zone preference question remained unanswered. The live picker initialized to the browser's New York clock (15:18 while UTC was 20:18), and the saved report displays 10:00. Official campaign help describes scheduling times as UTC; that conflicts with this observed local-clock picker, so verify the saved UI clock on a future visit rather than copying a timezone assumption into the field. A backend UTC timestamp was not inspected. Expected equivalent for this New York date/time is 15:00 UTC.
12. The campaign's **Delivery → Best time for each customer** is documented and labelled as **10:00 in each customer's own time zone**, rather than learned per-person open-time optimization. This option was not present in the inspected automation email step; its wait is event-relative. The Monday campaign uses **All at once**, not Best time. Before using the latter, review how its local delivery window aligns with the intended calendar day.

Frozen cohorts prevent ordinary future registrations entering the historical flow, and the overdue eight are separate from the pending three. This is not a general cross-automation deduplication system for future repeat orders. Monitor **Automations → Customers/Activity** and the scheduled campaign's **Recipients** after execution. No overdue customer email was sent during configuration; the Monday campaign is scheduled and both automation reports initially showed zero sends.

Sources: [Moonbase Automations](https://help.moonbase.sh/en/articles/6761939-automations), [campaign timing and audience rules](https://help.moonbase.sh/articles/3277265-email-campaigns), and the live editors/reports cited above.

## Plan a day-seven Lite-to-Robin Control coupon automation

Reviewed November 14, 2026 at Alex's request for self-service instructions. No coupon, segment, automation or email was created/enabled. An unsaved segment editor was inspected and discarded. This procedure uses **Moonbase Account created** as the registration date, not newsletter-list join date or necessarily the first Lite acquisition date. If the intended clock is first obtaining Lite, confirm that source date and use its acquisition event instead; do not substitute imported account creation for an older original registration.

### Coupon and eligibility

1. In **Coupons → New coupon**, use a new descriptive name such as **Lite upgrade — 25% off Robin Control**. Create it, then set **Discount → Percentage off → 25**, disable combining as the recommended stacking policy, and save that section. Under **Restrictions**, add only **Robin Control** (selecting it in the picker alone is insufficient), set **Max redemptions per code → 1**, leave overall **Max redemptions** blank for ongoing enrollment, and leave the parent coupon **Always active** unless another policy is intended. Save, reload and verify. Let the automation generate personal codes; do not distribute or change the existing 50%-off waitlist coupon.
2. Open **Customers → + beside Customer Groups**. Name the group **RCL — day 7–60 upgrade eligible**, choose **Segment → Start from scratch → Continue to rule**. Set **Customers match when → all**. The **Account state** check picker was verified to offer **Newsletter subscriber**, **Email confirmed**, **Account created** and **First seen**.
3. Add **Owns → Robin Control Lite**, **Owns → Do not own → Robin Control**, **Account state → Newsletter subscriber → Yes**, and optionally **Email confirmed → Yes**. Add two date checks: **Account state → Account created → In range → In the last → 60 → days**; and **Account created → Out of range → In the last → 7 → days**. The live date control and In range/Out of range options were verified. This gives customers aged approximately 7–60 days; preview actual boundary records before saving. Save the segment and record its ID. All-current Lite owners without newsletter consent remain excluded. Do not replace the new general newsletter list with the Lite-owner audience.
4. Inspect known recent and imported customer records before relying on the cohort. Import dates may differ from original registration dates; the September customer/license migration must not be treated as fresh customer intent. Preserve existing stronger waitlist benefits.

### Automation and historical enrollment

5. In **Automations → New automation → Start from scratch**, name it **RCL day-seven upgrade offer**. Configure the trigger for joining the saved eligibility segment and **Once**. Add a **Condition** immediately before the offer to repeat the ownership, newsletter and date eligibility checks; continue on **Matches**, leave **Otherwise** empty. Do not assume another Segment can be referenced inside a rule. Do not add another seven-day Wait: the segment already supplies that delay. Exact builder labels beyond the official documented controls have not been tested in this account.
6. On Matches add **Personal coupon**, select the new 25%-off coupon, then **Send email → Type → Newsletter → Edit content**. Insert the personal code from the earlier step through the editor's variable picker, or use a Personal coupon email block selecting that same coupon: the live inspector confirms later emails reuse the previously minted code. Do not assume two blocks targeting different coupons share a code. Include the RC product link, accurate terms, and unsubscribe/footer. Do not mark this upsell Transactional or Product update. Save and preview desktop/mobile; **Send a test** goes to a team member. A rendered sample code does not prove actual code issuance, checkout discount or the timing of the live automation.
7. Review all settings, then **Save → Turn on** only when ready for real future marketing. For this flow the registration-age checks give the delay: new records aged under seven days enter the Segment later as time advances. Segment timing is asynchronous; do not promise delivery at the exact second of the seventh day.
8. Customers already in the Segment at activation are not automatically enrolled. For an approved historical catch-up, review every existing member, open that customer, then **Quick actions → Add to an automation** and choose the active flow. With no Wait step these overdue 7–60-day customers can receive the offer now. No verified bulk-enrollment operation is assumed; use the documented per-customer action. Once-only enrollment avoids routine repeat entry. Do not remove/re-add ownership, recreate accounts or repeat license imports to manufacture trigger events.
9. Verify a controlled customer journey, the issued code's product/limits, expected checkout total (25% off $39 is $29.25 before tax), the intended recipient, a customer who already owns RC being excluded, unsubscribe handling and automation reports. Check **Automations → Daily limits** for a larger historical catch-up. These execution checks remain untested; this document does not authorize sending to an audience.

Sources: [Automations](https://help.moonbase.sh/articles/6761939-automations) (future events only; per-customer manual enrollment acts as a new trigger), [customer groups and time-driven segments](https://help.moonbase.sh/articles/9175847-customer-segments), [Coupons](https://help.moonbase.sh/en/articles/6089030-coupons), and [campaign email categories/editor](https://help.moonbase.sh/articles/3277265-email-campaigns).

## Review a purchase-triggered Lite upgrade automation

Read-only review November 14, 2026 of Alex's actual **RCL day-seven upgrade offer** draft. This uses Lite acquisition by completed order as the clock, unlike the earlier Account-created eligibility-segment proposal. The live trigger help says a completed live order including Lite (including bundles) starts it; registering for the general newsletter or receiving a manual/imported license does not establish that event.

1. Inspect **Trigger → Customer buys a product → Of Robin Control Lite → Once**. This is suitable for future Lite orders. Inspect **Wait → 7 days**. After the Wait, add a Condition that rechecks newsletter opt-in, Lite ownership and no Robin Control ownership before issuing a coupon. Trigger-only exclusions can miss a purchase made during the wait.
2. On **Send email**, choose **Type → Newsletter** for this upgrade discount. The observed draft was **Product update**, which checks a different opt-in. Its sender was the configured marketing address. Inspect **Edit content / Preview** without changing copy; a Personal coupon block with the same coupon reuses the earlier step's code (verified by the flow label and Personal coupon inspector).
3. Under **Personal coupon**, **Expire the code** was off. The inspector exposes `{{ steps.coupon_1.code }}`, `{{ steps.coupon_1.discount }}` and `{{ steps.coupon_1.expires_at }}` for that named step; use the actual picker/step key in future flows. Do not promise an expiry unless configured. A sample preview code is not a real redeemable code.
4. Open the referenced coupon separately so the draft stays intact. Verify amount, products, stacking, both caps and parent time span. This review found **25%**, **Robin Control**, combining **off**, both redemption caps blank and **Always active**. Recommended **Max redemptions per code → 1**, with overall cap blank for the ongoing flow. No setting was changed.
5. Inspect Subject, Preview text, desktop/mobile output and product link. Observed preview text thanked the customer for Robin Control instead of Lite; body retained `up to20` and `get your started`. Recommend a clear product CTA after the code; the inspected email linked the product in its introduction only. No preview or test send establishes live code redemption.
6. The prior 60-day cohort is not backfilled by this trigger. Manual **Add to an automation** on this Wait-based flow starts a new seven-day delay from enrollment. Use a separate reviewed immediate catch-up for eligible records already at least seven days old, or the earlier timed-segment approach; younger existing records need the remaining delay if retaining the original clock. Imported timestamps and the stronger 50%-off waitlist benefit require review. Do not activate or enroll an audience as part of a read-only check.

At the end of inspection the automation still showed **Draft** and **Turn on**. No settings were edited, no automation was activated and no test email was sent. Source: [Moonbase Automations](https://help.moonbase.sh/articles/6761939-automations) plus the live draft/coupon inspectors. A full customer journey remains untested.

Later November 14 recheck after Alex's edits: the post-wait Condition now requires **all** of owns Lite / does not own Robin Control, the email is **Newsletter**, and the coupon's per-code cap is **1**. The overall cap remains blank, combining is off and expiry is off. The body typos were corrected and preview text now reads **Robin Control Lite**; a descriptive preheader and product CTA after the code remain suggested improvements. No newsletter check is in the Condition, so the Newsletter email's own opt-in gate skips non-subscribers after their code has been minted. The trigger still handles future completed Lite orders; historical enrollment and a complete live journey remain untested. Draft and disabled Save were verified; no configuration was changed by the recheck.

### Understand newsletter eligibility

### Add the opt-in check to an existing automation

Implemented and reload-verified November 14, 2026 at Alex's request. In **Automations → RCL day-seven upgrade offer → Edit → Condition** after **Wait 7 days**, retain **all** of the ownership checks. Choose **Add a check → Account state → Which state → Newsletter subscriber → Yes**, then the flow's top **Save**. Reload and reopen the Condition to verify three checks: owns Lite, does not own Robin Control, Newsletter subscriber Yes. Matches must still contain the personal coupon followed by the Newsletter email; Otherwise ends. Save does not enable the automation. The saved flow remained **Draft**; no test/send/enrollment was performed.

### Prepare a catch-up audience from recorded Lite orders

Implemented November 14, 2026: **RCL recent upgrade audience**, ID **rcl-recent-upgrade-audience**. This refines the earlier account-created proposal by using actual recorded product-purchase activity, consistent with the existing automation's Lite-order trigger. Free checkout orders are product purchases; imported licenses without a recorded order are not automatically included.

1. Open **Customers → New customer group**, enter the name, choose **Segment → Start from scratch → Continue to rule**. Set **all**.
2. Configure **Owns → Own → Robin Control Lite**.
3. Add **Performed → Did → Event: Product purchase → Involving: Robin Control Lite → At least: 1 → When: In a window → In the last: 60 → days**.
4. Add **Owns → Do not own → Robin Control** and **Account state → Newsletter subscriber → Yes**.
5. Add a second **Performed** check: **Did not → Product purchase → Robin Control Lite → At least 1 → In a window → In the last 7 days**. This excludes customers with a recent repeat Lite order as well as brand-new customers. It is not a first-ever acquisition timestamp calculation.
6. Add a description explaining the order clock, imported-license limitation and prior 50%-off waitlist benefit review. Click **Save**, allow the initial membership pass to finish, reload, and verify the displayed rule and member list. The completed pass showed **8 members** on November 14; membership changes with activity, preferences and time. A member count is not a guaranteed deliverable-email count.
7. Creating this Segment neither enrolls historical orders into the existing automation nor sends email. For a separately authorized catch-up, use **Campaigns → New campaign → Type: Newsletter → Audience: RCL recent upgrade audience**, review estimated reach and prior stronger benefits, prepare/test/save the email, then send only when authorized. This avoids restarting a seven-day Wait for customers already older than seven days. That catch-up campaign has not been created or sent. Customers already registered but younger than seven days still require later catch-up handling; the draft purchase-triggered automation does not retroactively capture their earlier orders.

The existing automation retained its original future-order trigger and Wait; no 60-day rule was added to that flow, no new segment-entry automation was enabled, and no campaign was sent.

### Understand saved newsletter preferences

**Latest November 15 decision:** Alex approved pursuing the least restrictive lawful regional model, preferring automatic enrollment, checked-by-default, then unchecked choice. Lite's compulsory gate is now off and reload-verified; global and embedded OptIn remain as the verified interim flow. Fresh guest checkout shows the unchecked newsletter choice. No regional implementation is active; see [the regional plan](MOONBASE_EMAIL_PREFERENCES_PLAN.md). The required-signup procedure below records the earlier same-day setup, not the current configuration.

Earlier November 15 registration-copy clarification (historical): collecting the newsletter choice inside product registration is supported; it does not require a separate visit to the homepage form. The hosted checkout inspected during the real-code check showed an unchecked **Keep me up to date with product updates and offers** choice, and embedded account signup uses `marketingConsent: 'OptIn'`. The SDK also documents default-on and opt-out modes, but those technical modes are not evidence of valid consent for every recipient jurisdiction. Do not substitute registration fine print for the saved Newsletter preference, or equate license-delivery/account messages with promotional offers. The policy at that time promised optional newsletter enrollment for free licenses. Customizing the hosted checkbox wording itself had not been verified. UK ICO guidance specifically gives submitting an order as implied marketing agreement as a bad consent example; US CAN-SPAM uses a different opt-out framework. No consent setting or runtime copy was changed by that earlier clarification.

Verified against website code and official embedded-storefront documentation November 14, 2026: the newsletter condition checks an existing preference; it does not subscribe the customer. The homepage's **Subscribe** form explicitly offers news, product updates and discounts and submits directly to Moonbase. Embedded account signup uses `auth.signUp.marketingConsent: 'OptIn'`, which asks customers to choose the newsletter toggle. Customers can also manage communication preferences through Moonbase's account views. A free Lite license alone does not establish newsletter consent, and membership in a customer group is separate from that preference. Account email-confirmation settings may require a confirmation link before delivery.

To inspect existing consent, open **Customers → Robin Control Lite Owners → View** beside a customer. On **Overview**, inspect **Details → Newsletter** and **Product updates**, which are separate **Subscribed / Not subscribed** statuses. Inspect **Email confirmed** separately; email confirmation alone is not newsletter consent. Compare **Groups** without changing membership. November 14 read-only spot-check of four profiles found two subscribed and two not subscribed, including a subscribed older customer absent from the new newsletter list. The new list's two members therefore do not represent the account's complete newsletter-subscriber count. This was a spot-check, not a full consent, source-evidence or sync audit. No export or preference change was performed.

For this offer, retain **Newsletter subscriber → Yes** before the personal coupon and set the email type to **Newsletter**. Verify success with an authorized opted-in test customer and inspect the recorded newsletter preference before enrollment. Removing the condition does not itself opt customers in. These preference checks remain necessary after enabling required free-offer signup because customers can unsubscribe before day seven. Sources: [embedded storefront configuration and signup forms](https://moonbase.sh/docs/storefronts/embedded/), [ICO electronic-mail marketing guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-direct-marketing-using-electronic-mail/how-do-we-comply-with-the-pecr-electronic-mail-marketing-rules/), and [FTC CAN-SPAM guidance](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business).

### Require newsletter signup on a free offer

Historical configuration verified earlier November 15, 2026 for Robin Control Lite, at Alex's explicit direction after discussing the UK/EU consent concern. The switch was subsequently disabled in the regional-planning task; see current-state note above. This is a per-offer free-purchase setting, not a global account-signup default or a paid-purchase requirement. Mandatory marketing agreement may not meet freely given consent requirements in the UK/EU; obtain jurisdiction-specific counsel review. A policy update and later unsubscribe do not themselves resolve that concern.

1. Open **Products → Robin Control Lite → Pricing → Free → Edit**. Verify offer ID **free**, price **$0 USD**, and the existing perpetual license terms.
2. Enable **Require newsletter opt-in on free purchases**. Click the dialog's **Update**, then the Pricing section's outer **Save**. Updating the dialog alone leaves unsaved changes.
3. Reload the product page, reopen the same offer, and verify the switch remains on and price/license terms are unchanged. Cancel the read-only dialog afterward. Do not change the separate Trials switch or substitute `marketingConsent: 'OptedInByDefault'` in the website SDK configuration.
4. Inspect a fresh signed-out hosted checkout at `https://conduitdsp.moonbase.sh/buy/robin-control-lite`. November 15 guest checkout showed **You also agree to receive product updates and offers by email.** beside the completion terms, with no separate optional marketing choice. Viewing this page does not complete registration or verify the resulting saved preference.
5. Match website disclosures beside the free offer and in **Privacy Policy → Information we collect / Your rights**: identify newsletter content, the registration requirement, unsubscribe routes and retention of the existing license after unsubscribe. Do not claim ordinary paid purchases require this agreement. Do not retroactively subscribe existing customers or overwrite prior unsubscribes.
6. For an authorized end-to-end test, complete free registration with an approved address, inspect **Customers → profile → Details → Newsletter**, then use the email unsubscribe or account communication preferences and verify both the saved preference and continued licensed access. This complete registration/unsubscribe journey was **not executed** during the November 15 configuration check; no new test account or license was created.

### Assess customer email permission before changing checkout

Research update November 15, 2026, following Alex's challenge to the earlier consent explanation. **A positive newsletter checkbox is not the only possible legal route for customer marketing.** Keep this distinction when explaining the free-offer switch above; its saved state is technical evidence, not a legal finding.

1. Classify the message by purpose. Non-promotional license delivery, receipts, account/security notices and necessary service information differ from product promotion. New-product announcements and the day-seven 25%-off RC offer are marketing. Pure customer-use guidance may be relational rather than marketing; adding offers can change that classification. See [CNIL's June 2026 guidance](https://www.cnil.fr/fr/communication-electronique-quelles-regles) and [ICO service-message guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/direct-marketing-guidance/identify-direct-marketing/).
2. For the UK, assess the existing-customer exception in [PECR regulation 22(3)](https://www.legislation.gov.uk/uksi/2003/2426/regulation/22/data.html): collection during a sale/negotiation, the sender's own similar products, refusal available at collection and in every message, and no earlier refusal. The [ICO](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-direct-marketing-using-electronic-mail/how-do-we-comply-with-the-pecr-electronic-mail-marketing-rules/) includes free trials as potential negotiations. A permanently free Lite license is not automatically a free trial; do not assert eligibility without assessing the actual offer and collection flow.
3. For the EU, consider the CJEU's **13 November 2025, Inteligo Media, C-654/23**, [paragraphs 48, 53–63](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62023CJ0654). Its free-account-to-paid-content model could fall within the existing-customer exception despite no upfront charge. Registration offered an immediate newsletter opt-out. Applying this to Lite's role promoting paid RC is a plausible analogy, **not a determination** that every free download or every future product qualifies. Check applicable national implementation; the post-Brexit judgment is not automatically binding UK authority.
4. Distinguish a lawful refusal-at-checkout model from mandatory agreement. Requiring Yes and offering unsubscribe only later is not the soft opt-in. Where relying on consent, evaluate genuine choice and conditionality under [EDPB Guidelines 05/2020, sections 3.1.2 and 3.1.4](https://www.edpb.europa.eu/system/files/documents/files/file1/edpb_guidelines_202005_consent_en.pdf). A privacy-policy amendment alone does not fix collection requirements or revive historical permission.
5. Check **Account settings → Storefront → Features → Marketing consent** against [Moonbase's documented models](https://help.moonbase.sh/articles/3722015-account-features). Opt-in asks for an unchecked choice; checked-by-default permits unchecking; Opt-out has **no consent box and requires later unsubscribe**. Moonbase recommends Opt-in for EU/UK. Its documentation does not establish a separately configurable, verified soft-opt-in checkout with a clear refusal at collection or legal-basis records. Confirm this exact capability with Moonbase before changing models. A vendor default or the label `OptOut` is not legal approval.
6. Keep **Newsletter subscriber → Yes** and marketing email types on the RC offer automation. [Moonbase automations](https://help.moonbase.sh/en/articles/6761939-automations) enforce saved category preferences; transactional delivery is limited to fulfillment, not delayed coupon marketing. Do not relabel the offer Transactional or change older non-subscribers to Yes to implement a newly researched exception.
7. For a future authorized checkout change, decide the applicable route first, update disclosures to that actual route, save both dashboard levels where required, and test with approved addresses: refusal before registration must still permit fulfillment, accepted permission must be recorded, and unsubscribe must suppress marketing while retaining the existing license. Obtain targeted counsel review of Lite's freemium model and Moonbase's role in collection; no such implementation or permission test was performed in this research pass.

### Maintain the interim checkout newsletter choice

Verified November 15, 2026 after Alex approved the regional approach. The target remains the least restrictive supported model per eligible customer, not a permanent decision to use unchecked signup everywhere.

1. Inspect **Account settings → Storefront → Features → Marketing consent**. The live menu exposes **Opt-in**, **Opt-in (checked by default)** and **Opt-out** for the whole account, with no visible regional selector. Keep Opt-in until hosted region-specific handling is supported and verified. Do not change the adjacent **Ad and campaign tracking** setting; it governs a different purpose.
2. Open **Products → Robin Control Lite → Pricing → Free → Edit** and turn **Require newsletter opt-in on free purchases** off. Click **Update**, then Pricing **Save**, wait for **Saved**, reload, reopen the offer and verify off. Confirm $0 USD, `free`, perpetual terms and trial settings remain unchanged. Cancel the read-only dialog.
3. Inspect a fresh signed-out Lite hosted checkout. Expected **Keep me up to date with product updates and offers**, unchecked, with the Complete button present. Do not submit an order merely to inspect the choice; final acceptance of terms requires the appropriate confirmation. The November 15 check did not create an account/license or perform an end-to-end preference test.
4. Update Home, Plugins, Lite detail and Privacy Policy to promote newsletter signup at checkout while accurately describing the optional choice, content, unsubscribe and license retention. Keep the native homepage subscribe form and SDK `OptIn` configuration.
5. Check representative desktop/mobile pages, local links, stale compulsory-signup claims and `git diff --check`, then publish within the authorized scope and verify the live pages. Preserve saved preferences, email sync and marketing automation gates.
6. Follow [the regional plan](MOONBASE_EMAIL_PREFERENCES_PLAN.md) for automatic/default-on implementation. Keep country-specific behavior labelled proposed until both supported capability and eligibility are established. A prepared vendor question is not a sent message; explicit authorization is needed to contact support on Alex's behalf.

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
