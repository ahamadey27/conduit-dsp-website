# Google Analytics

GA4 measurement ID: `G-JFCXCLVEHM`

Analytics is loaded dynamically by `assets/js/cookie-banner.js` only after the visitor selects **Allow analytics**. Do not paste a Google tag directly into page `<head>` elements; doing so bypasses consent.

## Moonbase migration

The September 22 worktree integration has Moonbase analytics forwarding disabled. Browser verification confirmed Moonbase works after analytics rejection while GA4 stays unloaded. Customer/license migration and MailerLite sync do not change that behavior. Before adding commerce events, test rejection, acceptance, preference changes, and duplicate-event prevention. A working storefront must not require analytics consent. No new analytics or advertising scripts are authorized by the provider change. See [MOONBASE_MIGRATION.md](MOONBASE_MIGRATION.md) for release checks.
