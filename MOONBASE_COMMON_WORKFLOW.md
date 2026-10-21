# Moonbase common workflows

Last checked: October 21, 2026. These are operating instructions, not authorization to change settings or send emails. Check the live dashboard before using dated prices, release details, or UI labels.

Use this guide for repeatable steps. [integrations.md](integrations.md) records what has actually been configured and tested; [MOONBASE_MIGRATION.md](MOONBASE_MIGRATION.md) records the migration and remaining checks.

## Quick links

| Task | Destination |
| --- | --- |
| Configure Robin Control | [Robin Control product](https://app.moonbase.sh/products/robin-control) |
| Configure Lite | [Robin Control Lite product](https://app.moonbase.sh/products/robin-control-lite) |
| Create or edit discount codes | [Coupons](https://app.moonbase.sh/coupons) |
| Customer records | [Customers](https://app.moonbase.sh/customers) |
| RC hosted purchase entry | [Buy Robin Control](https://conduitdsp.moonbase.sh/buy/robin-control) |
| RC download entry | [Download Robin Control](https://conduitdsp.moonbase.sh/download/robin-control) |

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

Source: [Moonbase Coupons](https://help.moonbase.sh/articles/6089030-coupons).

### Check the promised 50%-off offer

At the $39 USD regular price, a 50%-off coupon gives a $19.50 price before tax. Configure whether the coupon can combine with other discounts and verify the actual checkout total before sending it; the RC coupon checkout has not yet been tested live. Removing signup forms does not remove the existing subscribers' promised benefit.

## Change or end a coupon campaign

1. Open **Coupons**, find the coupon, and select **Edit**.
2. Review the discount, product restrictions, overall/per-code redemption limits, validity span, and current redemptions.
3. Adjust the intended field and save its section. To end a campaign, adjust its validity span so it no longer includes the current time; review any individual-code dates too.
4. Reload and confirm the saved values, then verify a fresh checkout applies or rejects the code as intended.
5. Keep any customer-facing expiry/offer wording consistent with the saved configuration.

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
