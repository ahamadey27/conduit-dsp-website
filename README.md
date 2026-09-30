# Conduit DSP website

Static HTML, CSS, and JavaScript for conduitdsp.com, hosted on GitHub Pages. No package manager or build step.

## Current production release

The September 28 visual refresh, Moonbase integration, and September 30 accessibility updates are merged into the main project folder on `main`. GitHub Pages publishes this branch from the repository root. The site uses Moonbase for cart, accounts, checkout and Lite downloads; newsletter and waitlist forms use MailerLite.

September 22: all 180 imported RCL customers now own Lite. The license import added 179 perpetual licenses and skipped one existing owner. Alex confirmed synchronization to MailerLite. Do not rerun that license import. See [integrations.md](integrations.md) for the completed report and data mapping.

Both macOS and Windows 2.0.0 installers are available through Moonbase. Post-deployment work includes production checkout/account smoke tests, intended-recipient password-reset and plugin-activation checks, mixed hosted/embedded session testing, and policy review. The legacy Lemon Squeezy Worker remains a separate retirement task.

## Project guidance

- [AGENTS.md](AGENTS.md): implementation rules and product truth.
- [CONDUIT_DSP_CONTEXT.md](CONDUIT_DSP_CONTEXT.md): dated company and cross-repository context.
- [MOONBASE_MIGRATION.md](MOONBASE_MIGRATION.md): completed migration scope and remaining launch checklist.
- [integrations.md](integrations.md): current wiring, dashboard changes and remaining verification.
- [DESIGN_NOTES.md](DESIGN_NOTES.md): visual direction and previous verification.
- [ACCESSIBILITY.md](ACCESSIBILITY.md): WCAG target, September 30 audit, repeatable checks and open Moonbase issues.

`spec.md`, `notifyButton.md`, and `embedEmailNewsletter.md` retain historical references. They do not override the guidance above.

## Preview

Open `/Users/alex/Documents/Github/conduit-dsp-website` in VS Code and use **Go Live**. Workspace settings serve the project root at `http://127.0.0.1:8765/`, matching the Moonbase preview allowlist. Stop any existing server on that port before starting Go Live.

For a terminal preview, run from the main project directory:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/. This address works while Go Live or the terminal server is running. Restart it from the main project folder after a shutdown. The retained `.worktrees/visual-refresh` directory is an old development checkout, not the default preview source. This origin is allowed in Moonbase. The preview uses hosted checkout because Moonbase’s frame policy does not permit HTTP 127.0.0.1; HTTPS production uses its normal desktop overlay/mobile redirect.

## Verification

Run `node --test tests/storefront.test.cjs` and `git diff --check`. No dependencies or build step are required. Browser verification is also required for changes to the storefront.
