# Website accessibility review

Reviewed September 30, 2026 against the September 28 production design (`6265f48`), in `.worktrees/visual-refresh`. The top-level local `main` checkout was behind the production merge; the accessibility edits initially made there were fully reverted. Existing untracked color-palette artifacts were preserved. Alex reviewed the preview and authorized publication on September 30. The changes are included in `main` with the redesign; the main project folder is the canonical checkout.

## Standard and legal context

Use **WCAG 2.2 Level AA** as the engineering target, including all applicable Level A and AA criteria. This is not a certification or a legal safe harbor.

The US Department of Justice says the ADA's nondiscrimination and effective-communication requirements apply to the online goods and services of covered public accommodations. Its guidance points businesses to WCAG, while distinguishing those technical guidelines from detailed Title III regulations. Applicability to this business and litigation exposure need advice from qualified counsel; this technical review does not determine either. [DOJ guidance](https://www.ada.gov/resources/web-guidance/).

The federal rule adopting WCAG 2.1 AA for **state and local governments** is a Title II rule. Do not describe its government deadlines as the deadline for this private store. [DOJ Title II rule fact sheet](https://www.ada.gov/resources/2024-03-08-web-rule/).

Practical requirements from [WCAG 2.2](https://www.w3.org/TR/WCAG22/):

- Meaningful image alternatives, headings, landmarks, labels, and relationships.
- Full keyboard operation, no keyboard traps, logical focus order, visible focus, and focused controls not entirely obscured by author-created content.
- Text contrast of at least 4.5:1, or 3:1 for qualifying large text; essential control boundaries and graphics at least 3:1 against adjacent colors.
- Text resizing to 200%; reflow at 320 CSS pixels (the equivalent width of a 1280px viewport at 400% zoom); support for prescribed text-spacing adjustments.
- Pointer targets of at least 24 by 24 CSS pixels, subject to the criterion's spacing and other exceptions.
- Understandable form errors, input purpose, and programmatically exposed status messages.
- Appropriate captions and descriptions for prerecorded media. Exact requirements depend on the audio and visual information conveyed.

Automated checks only cover part of WCAG. Manual assistive-technology and complete-process testing remain necessary. [W3C evaluation overview](https://www.w3.org/WAI/test-evaluate/).

## Changes in this pass

- All ten pages: focusable skip-link destination, separate keyboard-operable Plugins disclosure with expanded state, corrected footer heading hierarchy, decorative SVG semantics, and an Accessibility help email link.
- FAQ: question headings now follow the page heading without skipping a level. Updates: explicit table-column header scope.
- Menus: Enter on Plugins navigates normally; disclosure supports Enter/Space, Arrow Down, Escape and focus restoration. Mobile opening places focus in the menu, closes when focus leaves, and supports navigation without JavaScript.
- Forms: persistent live regions announce pending/success/error states; visible required email labels and waitlist consent association; stronger input boundaries; newsletter prevents concurrent duplicate submissions and retains native email validation.
- Focus: stronger indicators on light/dark backgrounds; cookie-banner space is measured and reserved, focused page controls are scrolled clear of the fixed surfaces, and the banner moves into document flow on short viewports. Dismissal moves focus out of the hidden banner. Blocked storage no longer breaks preference controls.
- Contrast: waitlist error text and the warm product-card labels darkened; input boundaries strengthened. Existing reduced-motion behavior retained.

The redesign, waveform asset, Moonbase configuration, product/version/format/price copy, 50%-off waitlist promise, and privacy/EULA body text are preserved. No accessibility overlay, tracker, service subscription, or public compliance claim was added.

## Verification and limits

- axe-core 4.13.0 / Playwright 1.63.0, Chrome: all ten first-party routes at 1280px and 320px; zero detected violations for the selected WCAG A/AA and best-practice rules after changes; no horizontal document overflow. Also checked with the cookie banner visible. A zero count does not establish conformance.
- Desktop/mobile homepage screenshots visually inspected. Keyboard checks cover skip link, desktop/mobile menu, ordinary Plugins navigation, Escape and focus return.
- Newsletter and waitlist: invalid input, simulated successful/failed responses, retry state, persistent status regions. No real subscriptions submitted.
- Consent rejection, persistence, no GA script after rejection, focus after dismissal, and focused input visibility checked.
- Representative home/product/updates routes checked at 320×256 and with increased text spacing. This is a reflow proxy, not full native-browser zoom/assistive-technology coverage.
- Reduced motion and no-JavaScript mobile navigation checked.
- Existing eight storefront unit checks pass; modified JavaScript syntax and `git diff --check` pass.
- axe marks decorative arrow glyphs and product-label text over CSS artwork for manual contrast review. These are recorded as incomplete checks, not silently counted as passes. Verify actual rendered backgrounds when the artwork changes.
- The local first-party audit blocks external SDKs, embedded video, and marketing traffic except fonts. It therefore does **not** certify Moonbase, YouTube, payment frames, or email-confirmation pages.

## Open Moonbase issues — reproduced on production

Fresh Chrome session, `https://conduitdsp.com/`, September 30. Opened the empty Cart and signed-out Account screens only. No account creation, purchase, download, or settings mutation.

1. **Unnamed icon buttons (WCAG 4.1.2):** the cart Close and Account buttons have only `aria-hidden` SVG children and no accessible name. The sign-in panel's Close button has the same issue. axe reports `button-name`.
2. **Focus return:** Escape closes the cart, but after the transition `document.activeElement` is `BODY`, rather than the Cart trigger. Keyboard users can lose their position.

Reproduction for Moonbase support:

1. Open conduitdsp.com in a fresh session; dismiss optional analytics.
2. Open Cart using the keyboard. Inspect the accessibility names of the two icon buttons in the modal header (Close and Account); both are empty.
3. Press Escape, wait for the drawer transition, and inspect focus; it returns to the body.
4. Open Account while signed out. Inspect the Close icon button; its accessible name is empty.
5. Expected: semantic names for all icon actions and focus returned to the invoking control (or a visible equivalent after mobile navigation closes).

Affected buttons use class `moonbase:icon-button`; avoid patching them by position or SVG path. The [Moonbase embedded documentation](https://moonbase.sh/docs/storefronts/embedded/) says further customizations are unsupported and the CDN updates automatically. A vendor fix is preferable to a brittle DOM patch. This report has **not** been sent to Moonbase.

## Remaining release verification

- Retest the Moonbase fixes when available, then audit sign-in, signup, password reset, cart mutations, checkout, order completion, download and emailed return links with keyboard and screen readers. Hosted checkout is not presumed accessible merely because it is hosted elsewhere.
- Run VoiceOver/Safari and NVDA/Firefox or Chrome with users familiar with those tools; verify announcement timing and entire customer journeys.
- Verify 200% text enlargement and actual 400% browser zoom, forced-colors mode, and representative mobile assistive technology.
- Review the Lite demonstration video for accurate captions and equivalent descriptions of meaningful visual actions; this pass did not inspect its media content or certify its captions.
- Ask counsel familiar with website-accessibility cases to review business-specific ADA/state-law exposure. Maintain an issue log and retest changes; do not publish “fully ADA compliant” based on this audit.

## Re-running checks

Normal dependency-free checks:

```sh
node --test tests/storefront.test.cjs
git diff --check
```

Optional browser tools are kept outside the static site's source tree. Chrome must be installed. Start the site in the main project folder with `python3 -m http.server 8765 --bind 127.0.0.1`, then:

```sh
npm install --prefix /tmp/conduit-a11y-tools playwright@1.63.0 @axe-core/playwright@4.13.0
NODE_PATH=/tmp/conduit-a11y-tools/node_modules node tests/accessibility-audit.cjs
NODE_PATH=/tmp/conduit-a11y-tools/node_modules node tests/accessibility-interactions.cjs
```

Set `A11Y_BASE_URL` to another local preview origin if needed. Tests block third-party traffic and simulate signup responses. The audit writes JSON and homepage screenshots under `/tmp/conduit-a11y-*`; incomplete automated checks require human review. No testing dependency is shipped to visitors.
