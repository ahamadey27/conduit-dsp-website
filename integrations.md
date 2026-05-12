# Integrations — Conduit DSP, Lemon Squeezy & MailerLite

Practical guide for wiring the static site to **Lemon Squeezy** (commerce) and **MailerLite** (marketing email). Read Sections 1–3 first so the rest of the doc makes sense — the action items in Sections 3 onward are checklists you can work through top-to-bottom.

> **Context for the current launch:** Robin Control Lite ships as a **free** plugin. That changes a few things:
> - **License keys, tax setup, refund policy → not relevant yet.** Skip those steps in Lemon Squeezy.
> - **MailerLite becomes the primary value of the transaction.** Email *is* the conversion. Treat the newsletter and (eventually) waitlist signups as the main goal, not the download itself.
> - **Lemon Squeezy is still worth using** even for free, because it gives you a consistent checkout, captures the email, delivers the file, and is already wired up. Same flow as when you add a paid plugin later.
> - Anything paid-product specific is collected in **Section 11** so you can return to it when Robin Control (the paid version) is ready.

---

## 1. The three pieces and what each one actually does

| Service | What it owns | What it does NOT own |
|---|---|---|
| **conduitdsp.com** (this repo) | Product showcase, cart UI, "Add to Cart" flow, links to checkout, newsletter sign-up form, pre-launch waitlist forms | Payments, license keys, file delivery, customer accounts, marketing emails |
| **Lemon Squeezy** | Hosted checkout (free or paid), email capture at checkout, file delivery, order/download receipts, (when paid) payments, license keys, sales tax/VAT, refunds, customer portal | Marketing/promotional email, newsletter audience-building, pre-launch waitlists |
| **MailerLite** | The marketing list, newsletter campaigns, pre-launch "notify me" lists, automations (welcome sequences, launch broadcasts) | Anything to do with money, products, or downloads |

### Why MailerLite if Lemon Squeezy already sends email?

LS sends *transactional* email automatically: order confirmations, download links, license keys, refund notices. You do **not** need MailerLite for any of that.

MailerLite is for the other half — *marketing* email. It does three things LS cannot:

1. **Audience capture before purchase/download.** People who land on the site but don't want to download yet can still join your newsletter. LS only knows about people *after* they go through checkout.
2. **Pre-launch waitlists.** When Robin Control is "Coming Soon", you need a way to collect "notify me when it ships" emails. There's no LS event to fire yet. (The `modal.js` template in this repo is already set up for this — see `CLAUDE.md` → "Email capture modal".)
3. **Campaigns to your full audience** — discount codes (relevant once you have paid products), new product announcements, monthly updates. You can target newsletter subscribers, past downloaders, or both.

**Short version:** LS handles the download flow. MailerLite handles the conversation around it. For a free-plugin launch, MailerLite is arguably *more* important than LS — the email address is the asset.

---

## 2. Architecture at a glance

```
                         ┌─────────────────────────┐
                         │      conduitdsp.com     │
                         │      (this repo)        │
                         └───────────┬─────────────┘
                                     │
            ┌────────────────────────┼────────────────────────┐
            │                        │                        │
   "Add to Cart" + Checkout    Newsletter form          Pre-launch modal
            │                        │                        │
            ▼                        ▼                        ▼
   ┌──────────────────┐    ┌─────────────────────┐   ┌──────────────────┐
   │  Lemon Squeezy   │    │     MailerLite      │   │    MailerLite    │
   │                  │    │  "Newsletter" list  │   │ "RC Waitlist"    │
   │ • $0 checkout    │    │                     │   │     list         │
   │ • email capture  │    └─────────────────────┘   └──────────────────┘
   │ • file delivery  │                                       │
   │ • receipts       │                                       │
   │ (paid: payments, │            (Optional sync)            │
   │  license keys)   │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘
   └──────────────────┘       Zapier / Make / LS native
                              integration → ML "Downloaders"
```

The optional sync (dashed line) is how you'd make someone who downloads automatically join your marketing list. Covered in Section 7.

---

## 3. Lemon Squeezy setup

### 3.1 Create the store

- [x] Sign up at [lemonsqueezy.com](https://lemonsqueezy.com)
- [x] Create a store. The handle you pick becomes your checkout subdomain — e.g. `conduitdsp.lemonsqueezy.com`. **This handle goes into `cart.js`.**
- [ ] Settings → Store: fill in name, support email, brand color (`#1F5C5C` matches the site), logo (use `/assets/images/logo.svg`)
- [x] Settings → Payment methods: enable cards (and optionally PayPal / Apple Pay / Google Pay) — *only matters once you add a paid product, but turn it on now so it's ready*
- [x] **Skip for now:** Tax setup, refund policy — not relevant for $0 downloads

### 3.2 Add Robin Control Lite (free)

- [x] **Products → New product**
- [x] Name: `Robin Control Lite`
- [x] Pricing: `$0.00` USD (leave "Pay what you want" **off**; price is fixed at 0)
- [x] Description and product image — LS shows these on the checkout page
- [x] **Files**: upload the RCL installer(s) — macOS `.pkg`, Windows `.exe`/`.msi`. LS hosts the file and emails the download link after the $0 checkout completes.
- [x] License keys: **leave disabled** (not needed for free)
- [x] Thank-you message: optional, e.g. *"Check your email for the download link. We've also added you to our newsletter — unsubscribe anytime."*
- [ ] Save → open the product → **copy the buy link** (format: `https://conduitdsp.lemonsqueezy.com/buy/<uuid>`). You'll paste this into `cart.js`.

### 3.3 Test mode

LS has a test mode that simulates the whole flow without real card charges. For $0 downloads it just lets you complete the flow against a fake order so you can verify the email/download arrive.

- [ ] Enable test mode in LS (top-right toggle)
- [ ] Save the **test-mode** buy link separately — use it during dev, swap to live for launch

### 3.4 (Optional) Webhook for order events

Only set this up if you decide to do the optional LS → ML sync in Section 7 (Option C). Otherwise skip.

- [ ] Settings → Webhooks → Add endpoint (URL points at Zapier/Make webhook)
- [ ] Subscribe to `order_created`
- [ ] Save the signing secret if you ever move to a real backend

---

## 4. Wiring the website to Lemon Squeezy

All of this is one file: `assets/js/cart.js`. The config block is at the top:

```js
const LEMON_SQUEEZY = {
  storeName: '',                              // → 'conduitdsp'
  productUrls: {
    'robin-control':      '',                 // → (later) paste RC buy link
    'robin-control-lite': ''                  // → paste RCL buy link
  },
  useOverlay: true                            // true = lemon.js modal, false = redirect
};
```

- [ ] Paste store handle into `storeName`
- [ ] Paste the RCL buy link into `productUrls['robin-control-lite']`
- [ ] Leave `productUrls['robin-control']` blank until RC is ready
- [ ] Decide overlay vs redirect (recommend `useOverlay: true` — feels more polished, less context-switch)
- [ ] Open `/cart/` → click **Add to Cart** on RCL → click **Checkout** → LS overlay should appear with RCL at $0
- [ ] Complete a test-mode checkout end-to-end. Verify download email lands.

### 4.1 After-checkout redirect

In each LS product's settings there's a **Thank-you URL** field.

- [ ] Either leave it blank (LS shows its own confirmation page), or
- [ ] Set it to `https://conduitdsp.com/?downloaded=robin-control-lite` so users return to your site. If you want a real thank-you page later, that's a small follow-up.

---

## 5. MailerLite setup

### 5.1 Create the account and lists

- [x] Sign up at [mailerlite.com](https://mailerlite.com) — free tier covers 1,000 subscribers
- [x] Subscribers → Groups → create **`Newsletter`** — general audience list. *Already wired to the home-page form, see Section 6.1.*
- [x] (Later) Create **`Robin Control Waitlist`** when you're ready to put a "Notify me" button on the RC page
- [x] (Optional) Create **`Downloaders`** if you decide to do the LS → ML sync in Section 7
- [x] For each list: Forms → Embedded forms → create a form → copy the action URL (format `https://assets.mailerlite.com/jsonp/<account>/forms/<form>/subscribe`). You'll paste form IDs into the site.

### 5.2 (Optional) Welcome automation

- [ ] Subscribers → Automation → New automation
- [ ] Trigger: someone joins **Newsletter** → wait 1 min → send welcome email
- [ ] Useful copy: introduce yourself, link to RCL, mention RC is in development

---

## 6. Wiring the website to MailerLite

Most of this is already done. Here's the state of each form and what (if anything) needs to change.

### 6.1 Home-page newsletter — already live

- [x] `index.html` posts to MailerLite (`fetch` → `assets.mailerlite.com/jsonp/2241125/forms/184331636279609031/subscribe`)
- [ ] *Only if you regenerate the form:* edit `ML_FORM_ID` and `ML_ACCOUNT_ID` in the `<script>` block near the bottom of `index.html`

### 6.2 Pre-launch waitlist for Robin Control — template ready, currently disabled

The email-capture modal lives in `assets/js/modal.js`, currently commented out. It was originally wired to RCL during its own pre-launch, and is preserved as a template. The full 5-step checklist is at the top of `modal.js` and mirrored in `CLAUDE.md` → "Email capture modal". When you're ready:

- [x] Create a MailerLite form for **Robin Control Waitlist**, copy its action URL
- [x] In `modal.js`: uncomment the IIFE, change the selector from `data-product-id="robin-control-lite"` to `data-product-id="robin-control"`, swap `MAILERLITE_FORM_URL`
- [ ] In `index.html`, `plugins/index.html`, `plugins/robin-control/index.html`: uncomment the `<div id="email-modal">` block and the `<script src="/assets/js/modal.js">` tag
- [ ] In `cart.js`: add `if (btn.getAttribute('data-product-id') === 'robin-control') return;` inside the Add-to-Cart loop so the modal intercepts the click instead of cart.js adding to cart

---

## 7. Connecting Lemon Squeezy and MailerLite (optional)

This is the dashed line in the diagram. Pick one — you can switch later, nothing is locked in.

### Option A — Keep them separate (recommended to start)
LS owns checkout/download emails. ML owns marketing emails. No sync between them.
**Pros:** zero config.
**Cons:** if you later want to email "everyone who downloaded RCL" about a new release or a launch discount for RC, you'd have to export from LS and import to ML manually.

- [x] *No action — this is the default.*

### Option B — Manual export/import
- [ ] In LS: Customers → Export CSV (every few months)
- [ ] In MailerLite: Subscribers → Import → add to **Downloaders** group

### Option C — Zapier / Make automation
- [ ] Set up a Zapier account (free tier handles ~100 tasks/month)
- [ ] Trigger: LS `order_created` (works for $0 orders too)
- [ ] Action: MailerLite "Add subscriber" → **Downloaders** group, tagged with the product ID

### Option D — LS native integrations
- [ ] Check **LS → Settings → Integrations** to see if MailerLite is listed as a direct integration (it's been on their roadmap)
- [ ] If yes: connect, map products to ML groups/tags — replaces Option C, simpler

### My read
Start with **A**. Free plugin = audience is the goal, and the newsletter form on the home page is already capturing emails directly. Move to **C** or **D** the first time you want to email all past downloaders about something (e.g., "Robin Control is live, here's a launch discount for everyone who has RCL").

---

## 8. End-to-end flow examples

### Flow 1 — Newsletter sign-up (already working)
1. Visitor enters email on the home-page newsletter form, hits Subscribe.
2. `index.html`'s inline script POSTs to the MailerLite form URL.
3. MailerLite adds them to **Newsletter**. Welcome automation fires if you set one up.
4. The site shows "Thanks for subscribing!"

### Flow 2 — Free download of Robin Control Lite (primary flow right now)
1. User clicks **Add to Cart** on RCL.
2. Cart now contains RCL at $0. They navigate to `/cart/`.
3. They click **Checkout**. LS overlay opens with RCL pre-loaded.
4. They enter email, confirm (no payment field shown for a $0 product).
5. LS sends the download link by email.
6. *(Option C/D, if enabled)* Zapier picks up `order_created` → adds them to MailerLite **Downloaders** tagged `robin-control-lite`.

### Flow 3 — Pre-launch waitlist for Robin Control (when you flip on the modal)
1. RC page has "Notify me when it's ready" button (re-enabled modal).
2. User clicks → modal opens with email field.
3. They submit → POST to MailerLite **RC Waitlist** form URL.
4. They're on the list. When RC ships, you broadcast to that list with launch details.

### Flow 4 — Paid purchase of Robin Control (future)
See Section 11.

---

## 9. Testing checklist (before going live)

Run in LS **test mode** first.

- [ ] Add RCL to cart → checkout → $0 order completes in test mode
- [ ] Test-mode "purchase" email arrives at the address you used
- [ ] Download link in that email works (file downloads, opens, installs)
- [ ] Cart persists across page reload (localStorage)
- [ ] Cart count badge and `$0.00` in header both link to `/cart/`
- [ ] Currency selector changes both the cart and the header total
- [ ] Removing an item from the cart works
- [ ] Newsletter sign-up on home page lands a subscriber in MailerLite **Newsletter**
- [ ] (If you flipped on the RC waitlist modal) modal submission lands a subscriber in **RC Waitlist**
- [ ] Mobile: cart page is readable, Checkout button works at 480px and below
- [ ] EULA + Privacy Policy links work from inside the LS checkout (configurable per product in LS)

---

## 10. Go-live checklist

- [ ] LS store switched from test mode to live
- [ ] `cart.js` `LEMON_SQUEEZY.productUrls` updated to the **live** buy URL for RCL (test-mode URLs are different)
- [ ] `cart.js` `storeName` matches the live store handle
- [ ] Live RCL installer files uploaded and verified downloadable
- [ ] LS thank-you message/redirect set on RCL product
- [ ] Newsletter form still working after any DNS / hosting changes
- [ ] (If Option C/D) Sync into MailerLite **Downloaders** verified end-to-end
- [ ] Test from a private/incognito window with no localStorage to make sure nothing is hard-coded to dev state
- [ ] Announcement plan ready (post on social, broadcast to existing newsletter)

---

## 11. When you're ready to launch a paid product (Robin Control)

Defer this whole section until RC ships. Marked here so it doesn't get lost.

### 11.1 Lemon Squeezy — paid-product additions
- [ ] Settings → Tax — confirm LS is acting as merchant of record (handles VAT/US sales tax automatically in most regions)
- [ ] Settings → Refund policy — write or pick one, link from product page
- [ ] Products → New product → Robin Control, `$49.00` USD, one-time
- [ ] Upload RC installer(s) under the variant
- [ ] **Enable license keys** for RC — LS generates a unique key per purchase and includes it in the receipt. The plugin's license-check code reads this key.
- [ ] Test in LS test mode with card `4242 4242 4242 4242` — verify receipt, license key, and download arrive
- [ ] Copy the **live** RC buy URL into `cart.js` `productUrls['robin-control']`

### 11.2 Plugin-side license enforcement
LS generating a license key only matters if the plugin actually checks it.
- [ ] Confirm plugin reads the user-supplied license key on first run
- [ ] Plugin validates against LS license API endpoint (see LS docs for the validate/activate endpoints)
- [ ] Gracefully handle offline activation if needed

### 11.3 Multi-product checkout limit
The cart can hold multiple items, but the Checkout button only opens the first product with a configured URL — LS hosted checkout is one-variant-per-URL. For two products that buyers usually buy individually, this is fine. If you ever want true multi-product checkouts, that requires LS's Cart API (server-side).

---

## 12. Open questions I'd still like your call on

- [ ] **Free-download flow for RCL** — route the $0 download through Lemon Squeezy (captures email, consistent flow, easy to upgrade to paid later) or host the installer file directly on conduitdsp.com (zero friction, no email captured, no metrics)? *Doc assumes the LS route. For a free plugin, the email capture is most of the point.*
- [ ] **Pre-launch waitlist for Robin Control** — flip on the `modal.js` template now (start collecting RC interest immediately, even before RC is anywhere close to ready) or wait until RC has a real ETA?
- [ ] **LS → ML sync** — start with Option A (separate lists) and revisit at first launch, or set up Option C/D now so the data is flowing from day one?
- [ ] **Newsletter incentive** — offer something for joining (a free preset pack, discount code for the eventual RC, early-access status)? Increases signup rate meaningfully and is worth deciding before launch announcement.
