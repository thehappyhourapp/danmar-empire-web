# To confirm before launch

Lines marked [CONFIRM] in the briefs are never rendered. Each is listed here by
page and section, with what the page shows in its place. Confirm or correct the
fact and the line goes in; strike it and the entry goes.

## /corporate-real-estate-capital

### Context and audience
- **Property value range "$2M to $40M".** Omitted. The "Best fit" line reads "owner-occupied properties in Ontario" with no range.

### 2. Proof strip
- **"~$100M family office" figure.** Omitted entirely; no placeholder. It is a client-consent question.
- **A third cell.** The strip has two cells ($1B+ with the site's methodology line; Ontario brokerage with a lead advisor trained in law and finance) until a confirmed third figure exists.

### 6. Estimator
- **Defaults.** Rendered, because the tool needs them to work: Industrial, $10,000,000 value, $3,000,000 mortgage, 65% loan-to-value (50 to 75), 3% sale costs (1 to 5), 6.5% cap rate (5.0 to 8.0). Confirm or change in `src/lib/estimator.ts` (`DEFAULTS`, `LIMITS`); the unit tests in `src/lib/estimator.test.ts` pin the arithmetic.
- **Monthly rent rounding.** The brief rounds every figure to $10,000. The annual rent does; the monthly rent rounds to $1,000 so the two agree (at $780,000 a year, $65,000 a month, not $70,000). Confirm.

### 7. How a capital review works
- **Timeline "4 to 6 months".** Omitted; no timeline line is shown.

### 10. One advisor across the whole transaction
- **RECO-registered name and category, "Daniel Sheikhan, Broker".** The page shows the name as the rest of the site does, "Daniel Sheikhan", with the role held in `src/lib/data.ts` ("Managing Partner & Broker") and the registered brokerage name beside it. Confirm the exact registered form and the page will carry it.
- **First place, International Negotiation Competition, 2021.** Omitted on this page until the full name, organiser and category are confirmed. (The person page under /firm already carries a version of this line from the team data; confirm both together.)
- **Representative experience rows** (re-leased an industrial unit after a tenant default; a five-year commercial lease with stepped rent and a rent-free fixturing period; sold multiple commercial and residential assets from a family office portfolio; assessed and documented market rent for a lease dispute). All omitted until each is confirmed as anonymized and cleared.

### 11. How we are paid
- **Wording.** Rendered as the brief's own line: "The capital review is free. If you proceed, our fee is success-based and set out in writing before any work begins. If there is no transaction, there is no success fee." Confirm the wording.

### 12. FAQ
- **"How long does it take?"** Omitted until the timeline is confirmed.

### 13. Book a confidential capital review
- **Response time "within one business day".** Omitted. The sub-line reads "Daniel will reply personally." and the confirmation reads "Thank you. Daniel will reply to arrange a confidential call."
- **Consent.** The CASL checkbox is unticked by default and the form will not send without it. Confirm that is the intended behaviour (the alternative is optional consent with the enquiry still sent).

### Metadata
- **Title tail.** The brief's title ends "| Danmar"; the page uses the site's pattern and ends with the registered name, as every other route does. Confirm or change in `src/lib/seo.ts`.

## /privacy
- **The policy text.** A short standard policy written for the form's consent link, covering what is collected, why, who sees it, retention, the visitor's choices and the governing law (PIPEDA, CASL, RECO record-keeping). Review every line before launch; adjust the retention statement to the brokerage's actual record-keeping policy.

## /asset-management and /property-management
- Nothing in the brief was marked [CONFIRM]. The capital-at-work illustration and its assumptions (33% equity, 5.5 to 6% cap rate, roughly 6% debt cost) are rendered as the brief gives them, labelled as an illustration. The three software frames are reserved for screenshots at `public/photos/app/{holdings,cash,allocation}.jpg`; the platform's name and address are never shown.
