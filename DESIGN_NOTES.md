# Visual refresh

The redesign launched September 28, 2026. On September 30, the approved accessibility updates and redesign were consolidated into the main project folder on `main`. This is the default editing and preview location; `.worktrees/visual-refresh` is retained as a historical development checkout.

## Direction

- Keep the warm identity: ivory `#F6F3ED`, ink `#2A2520`, and the existing teal. Add deep teal `#1F5C58`, sage product backgrounds, and muted clay accents.
- Use DM Sans for clear, precise headings and navigation. Keep DM Serif Display for occasional expressive italic phrases. Preserve the original logo SVG and its waveform geometry.
- Make the two real products the focus, with larger, uncropped interface images, distinct release states, and direct product links.
- Keep the homepage compact: two products, a short company note, and newsletter.
- September 22 feedback supersedes the September 18 hero direction: remove the tagline hero, its supporting sentence, and “Made for your next idea.” Keep “A shorter path from idea to sound” quietly in the existing footer and open with the products. Keep the abstract hero graphic, intro eyebrow/link, and secondary About slogan removed.
- Add restrained depth through image shadows, fine grids, and small hover responses. Respect reduced-motion preferences.
- Carry the typography and spacing through product detail, Plugins, Updates, cart, FAQ, and legal pages. Cart and account pages now use the shared Moonbase integration; the former account stub is retired.

## References reviewed

- https://blacksaltaudio.com/
- https://www.yum-audio.com/
- https://www.fabfilter.com/
- https://aberrantdsp.com/
- https://www.audiothing.net/
- https://babyaud.io/
- https://klevgrand.com/
- https://madronalabs.com/

Used for visual hierarchy, product prominence, and restraint rather than copying layouts or adding catalog/review filler.

## Original design-pass verification (historical)

For current accessibility checks and vendor limitations, see [ACCESSIBILITY.md](ACCESSIBILITY.md). The following records checks before the Moonbase migration.

- Inspected the homepage and product pages at desktop and phone sizes.
- Checked all ten HTML pages at 320px and 768px: no horizontal overflow or broken images.
- Exercised mobile navigation, desktop keyboard dropdowns, cart addition/removal, and persisted currency/cart state.
- Checked required-email validation for waitlist and newsletter controls; did not submit test subscribers to MailerLite.
- Checked analytics preference reopening and rejection. Existing analytics gating and checkout code remain unchanged.
- Checked local link/asset targets, unique IDs, and shared shell consistency across all ten pages.
- Confirmed privacy/EULA text is unchanged, product price/version/format claims remain intact, and the existing 50%-off waitlist offer is preserved.
- `node --check assets/js/nav.js` and `git diff --check` pass.

## Local preview

From the main project folder (or use VS Code Go Live):

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/.

## Commerce direction — September 19, 2026

Moonbase is the selected future commerce provider; embedded storefront is preferred. Preserve the custom visual direction while prototyping its commerce surfaces. See [MOONBASE_MIGRATION.md](MOONBASE_MIGRATION.md). This research pass changed documentation only; the verification above describes the visual refresh, not a tested Moonbase integration.
