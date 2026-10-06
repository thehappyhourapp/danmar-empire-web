# Brief: Corporate Real Estate Capital page

Source: Daniel's brief, 6 Oct 2026, reconciled to the v2 site by Cowork. Where this file and
Daniel's original differ, this file wins; the reconciliation notes explain why.

## Reconciliation to the v2 site (read first)

1. Route: there is no /advisory section. Build at `/corporate-real-estate-capital` as a fifth
   practice page using the Practice template and the Design DNA (one ground, line-rise, rows).
   Ground: forest (it is a numbers page for CFOs, like Asset Management and Investments).
   Do NOT add it to the header nav (eight items wrap at 1280). Link it from: the Home practices
   chapter as a fifth row, the Investments page close row, the footer practices column, the
   sitemap and llms.txt. Update PRODUCT.md and llms.txt from "four practices" to five.
2. Design: the brief says buttons, cards, accordion, icons, images. The Design DNA wins: text
   links not buttons, rows not cards, FAQ as rows with all answers in the HTML (details/summary
   is fine), no icons, no imagery until photography exists (flat frames). Tabular numerals on
   every figure. Brass for labels and figures only; the estimator bars are forest-deep/paper fills,
   never brass. No dark mode.
3. Proof figures: the site already states "$1B+" with the methodology line "Aggregate list value
   of transactions the firm acted in, sale and lease, 2016 to date. Methodology on request."
   Use that figure and that line, not "$750M+". One number site-wide. The "~$100M family office"
   line is a consent question: omit it entirely until Daniel confirms (do not render a placeholder).
4. Analytics: the site has none. Implement the named events as calls to a single `track(name,
   props)` helper in `src/lib/analytics.ts` that is a no-op until a provider is chosen. Put
   "choose analytics provider" in docs/launch-blocking.md.
5. Form: post to the existing `/api/enquire` route with `kind: "capital-review"` and the extra
   fields; capture UTM source, medium, campaign, content and the estimator inputs as hidden
   fields; CASL consent checkbox unticked by default; same inline states as the other forms.
   Reply-to the visitor. No percentages, no fee figures anywhere.
6. [CONFIRM] items: never render them. Where a fact is unconfirmed, leave the line out and list
   it in `docs/CONFIRM.md` by section. The page may exist on v2 with those lines absent.
7. Compliance rules in the brief are binding and consistent with CLAUDE.md (registered name on the
   page, no financing services, no legal/tax advice, no client or referrer names, illustrations
   labelled, nothing negative about other firms). Keep the existing securities/legal-services
   disclosure pattern from the practice pages.
8. Copy rules: Canadian spelling, no em dashes, positive framing, short sentences. Keep paragraphs
   short on forest.

## Daniel's brief (verbatim below this line, except where the notes above override it)

## Context

**Who it's for:** CFOs, owners and finance leads of mid-market companies in Ontario that own the buildings they operate from (owner-occupiers), typically with $2M to $40M of real estate [CONFIRM range]. Industrial and manufacturing, logistics and warehousing, automotive dealerships and service, healthcare and medical, food production, and professional offices. Private, family-owned and private-equity-backed.

**The page's one job:** get a qualified CFO or owner to book a confidential capital review. Most visitors will arrive from a personal introduction, so the page must earn trust in under a minute on a phone. It is a credibility page first and a lead page second.

**What we offer:** sale-leasebacks, surplus and non-core property sales, lease restructuring and renewals (company as tenant), and buy-versus-lease and expansion analysis. Fees are deal-linked.

## Compliance rules (non-negotiable)

From TRESA advertising rules, FSRA mortgage licensing and the Law Society. Apply to every line.

1. Brokerage name "Danmar Empire Real Estate Corp., Brokerage" appears clearly and prominently on the page, including near the advisor bio and in the footer.
2. Advisor name: RECO-registered name and category exactly, "Daniel Sheikhan, Broker" [CONFIRM registered name]. No short forms.
3. Every claim factual and verifiable. Volume figures state their basis. Awards need source, date and details. No "leading", "top", "#1" or "best".
4. No financing services. Danmar does not arrange, negotiate or place mortgages or refinancing. We compare a sale-leaseback against refinancing, and where financing is the better route we refer clients to a licensed mortgage brokerage. Never "we secure financing", "we arrange debt" or "capital raising".
5. No legal, tax or accounting advice. Daniel is also a lawyer, but Danmar does not provide legal services. We work alongside the client's own counsel, accountant and auditor.
6. No client names, properties or deal details without written consent. Case studies anonymized.
7. No names, logos or employers of referrers or references. Do not imply any company endorses us.
8. Illustrative examples clearly labelled "Illustrative example, not a client transaction."

## SEO

- Title: `Sale-Leaseback & Corporate Real Estate Advisory, Ontario | Danmar`
- Description: `Danmar advises Ontario owner-occupier companies on sale-leasebacks, surplus property sales and lease restructuring. Book a confidential capital review.`
- Terms: sale leaseback Ontario, sale-leaseback Toronto, industrial sale leaseback GTA, sale leaseback advisor, unlock equity in commercial property Ontario.
- JSON-LD: Service (provider Danmar as RealEstateAgent, areaServed Ontario), FAQPage, BreadcrumbList. OG title/description/image (the default OG image is fine).

## Sections, in order

### 1. Hero
Eyebrow: Corporate Real Estate Capital. H1 (locked): **Unlock the capital in your buildings.** One italic brass line under it (write one). Sub-line: Danmar advises owner-occupier companies across Ontario on sale-leasebacks, surplus property sales and lease restructuring. We help you turn real estate into capital for growth, acquisitions or debt reduction, while you keep operating from the same site. Two text links: "Book a confidential capital review" (to the form) and "Estimate your capital unlock" (to the estimator). No image until photography exists.

### 2. Proof strip
Numbers strip, cells on column lines: `$1B+` with the existing methodology line; `Ontario brokerage` with a legal and finance-trained lead advisor; third cell only if a confirmed figure exists, otherwise two cells.

### 3. When CFOs call us
Rows, one per trigger: Tariffs or margin pressure are squeezing working capital. You're funding an expansion, acquisition or buyout. A loan maturity or covenant reset is coming. The owners are planning succession. You own more space than you use. Your lease renewal is approaching and you want leverage. Then one .meta line: "Best fit: owner-occupied properties worth roughly $2M to $40M [CONFIRM] in Ontario." (omit the range until confirmed; keep "owner-occupied properties in Ontario").

### 4. What we do
Four numbered rows, each with a one-sentence description and three outcomes as a short list in the text column:
1. Sale-leaseback. Sell your building to an investor and lease it back on terms negotiated for your business. Release most of the property's value as cash; long-term lease with renewal options so you stay in place; competitive, confidential investor process.
2. Surplus and non-core property sales. Sell land or buildings you no longer need, without disrupting operations. Pricing and timing analysis; confidential marketing to qualified buyers; negotiation through to closing.
3. Lease restructuring and renewals. Renegotiate the space you lease, before the landlord sets the terms. Blend-and-extend and renewal negotiations; market rent analysis; relocation and consolidation options.
4. Buy, lease or expand. Decide whether to own or lease your next site, then execute. Buy-versus-lease analysis with your finance team; site search and acquisition; lease or purchase negotiation.

### 5. Sale-leaseback or refinance? A fair comparison.
Intro: "Both release capital from a building you own. They work very differently." Table (first column sticky at 390, scrolls inside its own container):
Capital released: Up to the full market value, less costs | Typically 50% to 70% of value
Ongoing cost: Rent, usually net, with set increases | Interest and principal payments
Lender covenants: None from a bank; obligations sit in the lease | Bank covenants and reporting
Balance sheet: Under IFRS 16, a lease liability is recorded. Private companies on ASPE may differ. Confirm with your auditor. | Debt on the balance sheet
Future appreciation: Goes to the new owner | You keep it
Control of the site: Long-term lease with renewal options | Full ownership
Tax on the transaction: A sale can trigger capital gains and recapture of depreciation | Generally none
Footnote: "We compare both routes in every review. Danmar does not arrange mortgages or refinancing. Where refinancing is the better route, we refer you to a licensed mortgage brokerage. Speak to your accountant and auditor about tax and accounting treatment."

### 6. Estimate your capital unlock (the estimator)
Sub-line: "A quick, indicative comparison. No email required." Client-side only; results update live; nothing stored or sent until the form is submitted.
Inputs: Property type (select: Industrial default; Office, Retail, Medical, Automotive, Mixed-use). Location (select from AREAS plus "Other Ontario"). Estimated market value (currency, default $10,000,000, $1M to $100M). Existing mortgage balance (currency, default $3,000,000, $0 to value). Under a collapsed "Adjust assumptions": Refinance loan-to-value slider 65% (50 to 75); Sale transaction costs slider 3% (1 to 5); Cap rate slider 6.5% (5.0 to 8.0). [CONFIRM defaults]
Formulas (V value, M mortgage): sale-leaseback capital = V × (1 − costs) − M; refinance capital = max(0, V × LTV − M); indicative annual net rent = V × cap rate, also ÷ 12 monthly. If M > V × LTV show refinance as $0 with "No new capital at this loan-to-value." If M > V × (1 − costs) show sale-leaseback as $0 with "Sale proceeds would not cover the existing mortgage."
Outputs: two horizontal bars on one shared scale, "Sale-leaseback" and "Refinance", each with its figure; one line "Indicative rent: $X a year ($Y a month), net." Round to the nearest $10,000. Tabular numerals. Bars animate on the UI clock only; reduced motion respected.
Under the result: text link "Get a property-specific review" that scrolls to the form and pre-fills property type, location and value band. Always-visible .meta disclaimer: "Indicative only. Actual value, rent and terms depend on the property, the lease and the market. Before tax. Not financial, tax or legal advice. Refinancing figures are for comparison only; Danmar does not arrange mortgages."
Unit-test the formulas including both $0 edge cases.

### 7. How a capital review works
Five numbered rows: 1 Confidential capital review (a 45-minute call and a look at your property, financials and goals; free; NDA on request). 2 Capital options memo (written comparison of sale-leaseback, refinancing (indicative, for comparison), outright sale and holding). 3 Confidential market process (qualified net-lease investors and buyers approached without your company's name until you approve). 4 Negotiation (price, rent, lease term, rent increases, renewal options, repair obligations, any buyback rights). 5 Closing (your counsel and accountant handle their parts; we manage the process to close). Timeline line omitted until [CONFIRM: 4 to 6 months].

### 8. Your capital options memo
Intro: "Every review ends with a written memo your CFO can take to the board." Rows: market value range and the rent your site can support; net proceeds under each option, before tax; proposed lease terms (length, rent increases, renewals, repairs); the likely investor and buyer universe; tax and accounting points to raise with your advisers; timeline and our fee, in writing.

### 9. Illustrative example
Label, unmissable: "Illustrative example, not a client transaction." A GTA manufacturer owns a 60,000 sq ft plant worth $12M, with a $3M mortgage. Refinance at 65% loan-to-value: about $4.8M of new capital ($7.8M loan, less the $3M payoff), before fees. Sale-leaseback at market value: about $8.6M of capital ($12M sale, less about 3% in costs and the $3M payoff), before tax. At a 6.5% cap rate, the company would pay about $780,000 a year in net rent. "The right answer depends on the rent the business can carry, the lease terms, and the after-tax result." Two-bar comparison plus the rent line; arithmetic visible.

### 10. One advisor across the whole transaction
Bio row: Daniel Sheikhan, Broker [CONFIRM], Danmar Empire Real Estate Corp., Brokerage. Finance degree, background in real estate investment and portfolio management. Lawyer licensed in Ontario, New York and Minnesota; Danmar does not provide legal advice, we work alongside your counsel; the cross-border background helps when a US parent is involved. First place, International Negotiation Competition, 2021 [CONFIRM full name, organiser, category: omit until confirmed]. Portrait frame flat until photography. Representative experience rows, anonymized [CONFIRM each; omit until confirmed]: re-leased an industrial unit after a tenant default, with security structured against future default; structured a five-year commercial lease with stepped rent and a rent-free fixturing period; sold multiple commercial and residential assets from a family office portfolio; assessed and documented market rent for a commercial lease dispute.

### 11. How we're paid
"The capital review is free. If you proceed, our fee is success-based and set out in writing before any work begins. If there is no transaction, there is no success fee." [CONFIRM wording; render it, it is the brief's own line.] No percentages.

### 12. FAQ (FAQPage JSON-LD, answers in the HTML)
What is a sale-leaseback? You sell a property your business operates from to an investor and sign a long-term lease to stay. You receive the sale proceeds and keep using the site.
Do we lose control of our building? You give up ownership but keep the right to occupy under the lease. We negotiate renewal options, permitted uses and alteration rights so operations are protected.
How long is the lease? Terms are negotiated case by case. Longer terms usually support a higher sale price. We model several options in the memo.
Can we buy the building back later? Buyback rights can be negotiated, but they can change the accounting treatment. Raise this with your auditor before agreeing to one.
What are the tax consequences? Selling can trigger capital gains and recapture of depreciation on the building. We show proceeds before tax and work with your accountant on the after-tax result.
Will this affect our bank? Sale proceeds usually repay the existing mortgage. Your lender may treat the lease as an obligation in its covenants, so speak to your lender early.
How confidential is the process? Investors see an anonymized summary first. Your company is named only after you approve each party, and we sign NDAs on request.
Do you arrange financing? No. Danmar does not arrange mortgages. Where refinancing looks better, we refer you to a licensed mortgage brokerage.
What does it cost? The review is free. Our fee is success-based and agreed in writing before work starts.
How long does it take? (omit until the timeline is confirmed)

### 13. Book a confidential capital review (form)
Sub-line: "Tell us a little about the property. Daniel will reply within one business day." [CONFIRM response time; render "Daniel will reply personally." until confirmed]
Fields (* required): Full name*, Title*, Company*, Work email*, Phone, Property city*, Property type* (same list), Approximate size (sq ft), Approximate value (Under $2M, $2M to $5M, $5M to $10M, $10M to $25M, $25M to $50M, Over $50M), Who owns the property (The operating company, A related holding company, Not sure), What's driving this?* multi-select (Growth or expansion, Acquisition or buyout, Debt maturity or refinancing, Working capital, Succession, Too much space, Lease renewal, Other), Timing (Within 3 months, 3 to 6 months, 6 to 12 months, Just exploring), Anything else we should know, CASL consent checkbox unticked: "I agree to be contacted by Danmar Empire Real Estate Corp., Brokerage about this enquiry." Link to a privacy page (create a plain /privacy page if none exists, cream, with a short standard policy marked for Daniel's review in CONFIRM.md).
Hidden: utm_source, utm_medium, utm_campaign, utm_content, estimator inputs. On submit: POST to /api/enquire with kind "capital-review"; confirmation in place of the form: "Thank you. Daniel will reply within one business day to arrange a confidential call." (use "Daniel will reply to arrange a confidential call." until the response time is confirmed). Field-level errors.

### 14. Footer disclosure (this page only, above the site footer)
"Danmar Empire Real Estate Corp., Brokerage. Information on this page is general and indicative. It is not legal, tax, accounting or financing advice. Danmar does not arrange mortgages. Figures in the estimator and illustrative example are estimates only."

## Analytics events (via the no-op track helper)
capital_review_cta_click (location: hero, estimator, footer); estimator_interacted (first change); estimator_completed (value band only); capital_form_submitted (utm source and value band); faq_opened (question number).

## QA
Playwright at 1440 and 390; estimator edge cases ($0 mortgage, mortgage above refinance limit, mortgage above sale proceeds, slider extremes); keyboard-only pass; Lighthouse mobile 90+ on performance, accessibility and SEO; validate JSON-LD; grep for em dashes and US spellings; confirm no client, referrer or company names anywhere.

## Hand back
Preview link, desktop and mobile screenshots, docs/CONFIRM.md grouped by section, and a list of any copy changed from this brief, with reasons.
