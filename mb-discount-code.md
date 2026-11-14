# Create a Moonbase discount code

Verified October 21, 2026 against the live Moonbase dashboard. This procedure creates a shared, time-limited 50%-off code for Robin Control. Keep the actual live code in Moonbase or private campaign materials, outside this public website repository.

## 1. Open or create the coupon

1. Sign in to [Moonbase](https://app.moonbase.sh/coupons) and choose **Coupons**.
2. Open the existing **50% Off Robin Control** coupon to edit this offer. For a separate offer, choose **New coupon**, enter its name and description, and create it.
3. The **Coupon Name** identifies the offer in the dashboard. It does not create the code customers type at checkout; that happens in **Codes** below.

## 2. Set the discount

1. Under **Discount**, choose **Percentage off**.
2. Set **Discount percentage** to **50**.
3. Leave **Coupon can be combined** off for an offer that does not stack with other discounts.
4. Click **Save** in the Discount section if changes are pending. Each section has its own Save button.

The **Limit number of recurring payments** field concerns subscriptions. Robin Control's current offer is a one-time purchase; that field does not set the coupon's expiry.

## 3. Restrict the product and dates

1. In **Restrictions → Product**, select **Robin Control**.
2. Click **Add product**. Selecting the product alone is insufficient: verify Robin Control appears as a row in the restrictions table. **Any variation** includes its pricing variations.
3. For a shared code with no requested total usage cap, leave **Max redemptions** and **Max redemptions per code** blank. If a total cap is intended, enter it explicitly.
4. Set **Restrict to time span** to the intended start and end. The observed field accepts `DD/MM/YYYY HH:mm - DD/MM/YYYY HH:mm`; enter the range and press Enter, then click outside the field. The date picker is another way to select the range.
5. Verify the product row is still present after changing dates, then click **Save** in Restrictions.
6. Reload and confirm the product restriction and both timestamps persisted before adding a redeemable code.

For an exact 30-day duration, the end is **720 hours** after the start. Check the dashboard/browser timezone and daylight-saving changes. The October 21 configuration is:

| Boundary | UTC | America/New_York |
| --- | --- | --- |
| Start | October 21, 2026, 21:35 | October 21, 2026, 5:35 p.m. EDT |
| End | November 20, 2026, 21:35 | November 20, 2026, 4:35 p.m. EST |

The local input therefore reads `21/10/2026 17:35 - 20/11/2026 16:35`. The one-hour difference in wall-clock time accounts for the November daylight-saving change. This is a fixed campaign window, not 30 days from each recipient opening an email.

**Shared-code limit detail:** setting **Max redemptions per code** to `1` makes the shared code usable only once in total. It does not mean once per customer. For individually limited recipients, create separate codes and verify the intended restrictions.

## 4. Add the actual code

1. Under **Codes**, paste the chosen code into **Paste codes separated by new lines here, or use the generator to generate codes with specific patterns.** Use one code per line.
2. For one exact shared code, paste just that code. The **Number of codes** generator field does not need changing, and **Generate 10 codes** is unnecessary.
3. Leave the code-level **Restrict to time span** blank when the parent coupon already supplies the intended validity window. A separate code-level window can narrow when that code works.
4. Click **Add 1** for the one pasted code. The button initially says **Add**, then changes to **Add 1** after entry.
5. Wait until the code appears in the saved table with its redemption count. Text left in the entry box has not yet created a redeemable code.

Codes are case-insensitive. A shared code can be forwarded; it is not an email allowlist.

## 5. Verify the result

1. Confirm **50%**, stacking off, **Robin Control** in the product restrictions, the saved start/end range, and the actual code listed under **Codes**.
2. Confirm the coupon is **Active** and check **Used in** before changing an offer already distributed by a campaign or automation.
3. At the current $39 USD regular price, 50% off is **$19.50 before applicable tax**. When checking the customer checkout, apply the code and verify that subtotal before submitting an order. Do not complete payment merely to test a code.
4. Keep the campaign's expiry wording consistent with the saved date, time and timezone. Creating a code does not send it to subscribers.

October 21 outcome: the existing coupon was completed with a single shared code, Robin Control-only eligibility, the 720-hour window above, no redemption caps, and stacking off. The saved code showed **0 redemptions**. No purchase or campaign was completed. The hosted checkout first requests billing email before exposing later checkout steps, so a discounted checkout total was not independently verified during this configuration task. The temporary storefront test cart was cleared.

Reference: [Moonbase coupon documentation](https://help.moonbase.sh/articles/6089030-coupons). Related procedures: [Moonbase common workflows](MOONBASE_COMMON_WORKFLOW.md).
