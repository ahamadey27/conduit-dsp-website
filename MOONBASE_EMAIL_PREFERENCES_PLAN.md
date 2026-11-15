# Regional customer email preferences

Prepared November 15, 2026 following Alex's direction to prefer automatic subscription, then a checked-by-default choice, then an unchecked choice, as permitted for each customer. This is a proposal; regional enrollment is **not implemented**.

## Verified current setup

- Hosted checkout is used on every device; website-only changes cannot establish how the hosted form behaves.
- **Account settings → Storefront → Features → Marketing consent** exposes one global selection with three modes. Live UI and [official help](https://help.moonbase.sh/articles/3722015-account-features) showed no regional selector. Absence of a visible option does not rule out an undocumented vendor capability.
- Automatic mode has no checkout checkbox; the documented refusal route is unsubscribe afterward. This is different from a qualifying existing-customer exception requiring refusal at collection.
- Lite's required-newsletter switch is now **off**, saved at both levels and verified after reload. Fresh signed-out checkout shows an unchecked **Keep me up to date with product updates and offers** choice. Global consent and the embedded SDK remain **OptIn** pending vendor confirmation.
- Existing subscriber preferences, sync, prices, licenses and marketing-automation eligibility gates were preserved. No new account, license or customer marketing email was created by this check.

## Proposed rules, subject to supported implementation

| Customer situation | Preferred model | Conditions before enabling |
| --- | --- | --- |
| New US product registrant, with consistent location information | Automatic enrollment with clear notice and later unsubscribe | Confirm hosted support, preserve all earlier refusals, meet applicable US requirements. |
| Qualifying UK/EU existing-customer relationship | Clear marketing notice with an immediate checkout opt-out | Verify the exception applies to the offer and messages; refusing must permit fulfillment; record basis and evidence. A checked Yes box is not a substitute for this assessment. |
| UK/EU customer without an established exception | Optional affirmative signup in checkout | Unchecked by default; specify conduit.dsp, newsletter content and unsubscribe. |
| Canada, Australia or another consent jurisdiction | Affirmative signup unless a specific implied-consent basis is established | Do not treat all non-EU customers as US customers; manage any time limits on implied permission. |
| Unknown or conflicting country/location signals, including a known anonymizer | Affirmative signup until eligibility can be established | Use the stricter applicable branch; do not guess from language, currency or email domain. |
| Any customer with a prior unsubscribe | Preserve that refusal | A purchase, new IP, policy amendment or migration must not reset it. Accept only a new voluntary subscription where appropriate. |

The [FTC guide](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business) describes US commercial-email requirements. The [UK exception](https://www.legislation.gov.uk/uksi/2003/2426/regulation/22/data.html) requires refusal at collection and in messages. The [Inteligo Media judgment](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62023CJ0654) gives a potential EU analogy for a free-to-paid model, not universal approval of Lite or every product. Review this targeted question with qualified counsel before relying on the exception.

[Canada's regulator](https://crtc.gc.ca/eng/internet/anti/reg.htm) and [Australia's regulator](https://www.acma.gov.au/avoid-sending-spam) require express or qualifying implied/inferred consent. [EDPB territorial-scope guidance](https://www.edpb.europa.eu/system/files/documents/files/file1/edpb_guidelines_3_2018_territorial_scope_after_public_consultation_en_1.pdf) concerns real circumstances, not a VPN exit-country exemption. [MaxMind explains](https://support.maxmind.com/knowledge-base/articles/maxmind-geolocation-accuracy) that VPN geolocation can locate the server rather than its user. No new location vendor, tracking script or fingerprinting has been added.

## Capability questions and implementation sequence

1. Obtain Moonbase's supported approach for region-specific hosted marketing choices, an actual refusal at collection, settings precedence, location conflicts, evidence records and repeat-order unsubscribe preservation. A private support-message draft is prepared outside the public repository; it has not been sent.
2. Choose a supported flow before adding code or changing the global model. Do not set global OptOut or checked-by-default while it would also apply to ineligible customers. The website's `auth.signUp.marketingConsent` option alone does not verify hosted-checkout behavior.
3. Decide the legal basis per cohort and message category. Keep service delivery separate from promotional offers, and retain Newsletter preference checks on the day-seven coupon email. Do not relabel marketing Transactional.
4. Use existing customer/billing country and supported vendor location data where suitable. Any new country question or processor needs accurate disclosure. A technical country signal is not conclusive evidence of applicable law; conflicting or unknown data uses the conservative branch.
5. Update the privacy policy and signup notices to the implemented flow. Record versioned wording, source, decision time and permission basis without putting individual customer records in this repository.
6. Test new eligible registration, affirmative Yes, refusal, unknown/conflicting country, already-unsubscribed repeat purchase and later unsubscribe with approved test identities. Verify saved preferences, successful fulfillment after refusal, continued license access, and email eligibility. Do not spoof a VPN in production and treat the resulting page as a full legal or location test.
7. Publish only supported, verified behavior. Keep the current checkout choice until the regional implementation is confirmed; report remaining limitations accurately.
