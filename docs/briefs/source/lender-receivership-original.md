# Build prompt: Lender and Receivership Advisory page (Danmar site)

Paste everything below the line into the Danmar site chat.

---

## Context

We are adding a second advisory service to the Danmar Empire Real Estate Corp., Brokerage website: **Lender and Receivership Advisory**. It sits in the commercial and business advisory section next to the Corporate Real Estate Capital page, with its own card on the parent advisory page.

**Who it's for:** private lenders and lending syndicates, mortgage investment corporations (MICs), mortgage administrators and fund managers, lenders' legal counsel, and court-appointed receivers and licensed insolvency trustees who need a broker for a sale. Ontario only.

**The page's one job:** get a lender, their lawyer or a receiver to request a site visit and valuation on a property securing a loan in default. Most visitors will come from a personal introduction or from their lawyer, so the page must show in under a minute that we are fast, careful and know where our role ends and the lawyer's begins.

**What we offer:** rapid valuations and site inspections, recovery options analysis, property protection during enforcement, power of sale and receivership sales with a documented process, valuation reviews across a lender's loan book, and as-is versus completion analysis for stalled development sites.

## Before you build

1. Reuse everything built for the Corporate Real Estate Capital page: proof strip, comparison table styles, estimator shell, advisor bio, FAQ accordion, intake form, footer disclosure and analytics helpers. Both pages must look like one family.
2. If you need to re-anchor to the current look, run `/taste` on the live Danmar homepage.
3. Build in this order: page structure and copy, then the Recovery Timeline Estimator, then the "Who does what" timeline, then the intake form, then the design polish pass, then QA.
4. Keep the page unpublished (draft route or preview branch) until I clear every [CONFIRM] item. Never ship [CONFIRM] text to the live page. Add this page's items to `CONFIRM.md` under their own heading.

## Compliance rules (non-negotiable)

These come from TRESA advertising rules, FSRA mortgage licensing and Ontario power of sale law. Apply them to every line of copy, including alt text and metadata.

1. **Brokerage name:** "Danmar Empire Real Estate Corp., Brokerage" appears clearly and prominently, including near the advisor bio and in the footer.
2. **Advisor name:** use my RECO-registered name and category exactly, "Daniel Sheikhan, Broker" [CONFIRM registered name].
3. **No mortgage administration.** Under FSRA rules, collecting payments from borrowers and taking steps to enforce payments in default require a mortgage administrator licence. Danmar does neither. Never write "we enforce", "we collect", "we recover your loan" or "debt recovery". Write that we value, protect and sell the property.
4. **No legal steps.** Demand letters, notices of sale, court applications, taking possession and closing documents are the lender's lawyer's work. Danmar acts under counsel's direction for property access. Danmar does not provide legal advice.
5. **Valuations are "broker opinions of value", never "appraisals".** Where a file or court needs one, we coordinate an independent appraisal by a qualified appraiser.
6. **No borrower details anywhere.** No borrower names, addresses, photos of identifiable properties or deal details. Case studies are anonymized with written consent.
7. **Respectful language.** No "distressed deals", "vulture", "bargain" or "steal" language, and nothing aimed at homeowners or borrowers. This page is for lenders and receivers only.
8. **No outcome promises.** No "maximize recovery", "guaranteed", "fastest" or "best price". Claims must be factual and verifiable, with the basis stated for any volume figure.
9. **Illustrative examples** are clearly labelled "Illustrative example, not a client transaction."
10. **Conflicts.** State that on recovery files Danmar acts for the lender or the receiver, and runs a conflict check on every file before taking it.

## House style

- Canadian spelling (colour, centre, licence, behaviour).
- No em dashes anywhere. Use commas, periods or colons.
- Calm, precise, lawyer-friendly language. Short sentences. Numbers over adjectives. No hype, no exclamation marks.

## URL, navigation and SEO

- URL: `/advisory/lender-receivership` (or the equivalent under the existing advisory path).
- Parent advisory page card: title "Lender and Receivership Advisory", one line: "Valuation, property protection and documented sales for lenders and receivers on loans in default."
- Page title (meta): `Power of Sale & Receivership Real Estate Broker, Ontario | Danmar`
- Meta description: `Danmar values, protects and sells real estate for private lenders, MICs and receivers across Ontario, with a fully documented sale process. Request a site visit.`
- Target search terms: power of sale broker Ontario, power of sale listing agent for lenders, receivership real estate broker Ontario, MIC default property sale, mortgagee sale Ontario, broker opinion of value for lenders.
- Structured data: `Service` (provider: Danmar as `RealEstateAgent`, areaServed: Ontario), `FAQPage`, `BreadcrumbList`.
- Open Graph title, description and image for link previews.
- Cross-link both advisory pages to each other in a short "Related advisory" block above the footer.

## Page structure and content

Build these sections in this order.

### 1. Hero

- Eyebrow: `Lender and Receivership Advisory`
- H1: **Protect your recovery on loans in default.**
- Subhead: Danmar helps private lenders, mortgage investment corporations, receivers and their counsel value, protect and sell the real estate behind a defaulted loan. We work alongside your lawyer, from the first site visit to closing, and document every step of the sale.
- Primary button: **Request a site visit** (scrolls to the form)
- Secondary button: **See the cost of delay** (scrolls to the estimator)
- Image: a real Ontario residential or commercial building, architectural style, no people, nothing that identifies an actual enforcement property. Use a Danmar property photo with consent if available [CONFIRM].

### 2. Proof strip

Three short facts in a row (stack on mobile), each with a footnote stating its basis:

- `$750M+` in real estate transactions [CONFIRM: whose transactions, since what year, how measured]
- `[CONFIRM: 3] business days` from instruction to site visit and broker opinion of value
- `Receivership and default experience` on commercial and residential files [CONFIRM wording]

### 3. When lenders call us

Heading: **When lenders call us**

Two-column list (one column on mobile):

- A borrower has missed payments and you need to know what your security is worth today.
- You hold a second mortgage and need to know how much equity sits behind the first.
- A notice of sale is running and you need a pricing and listing plan ready.
- The property is vacant, damaged, or has tenants you know little about.
- A construction or development loan has stalled.
- A receiver needs a broker for a court-supervised sale.
- You want current values across your loan book before problems start.

### 4. Services

Heading: **What we do**

Six items in a grid (two or three columns on desktop, one on mobile), equal weight, one sentence plus three bullets each:

1. **Rapid valuation and inspection.** Know what the security is worth, and what condition it is in, within days.
   - Broker opinion of value with comparable sales
   - Condition, occupancy and access report with photos
   - Independent appraisal coordinated where your file or the court needs one
2. **Recovery options analysis.** A clear comparison of the paths open to you, prepared for discussion with your lawyer.
   - Early sale, power of sale and receivership compared on timing and net proceeds
   - Tenancy review: who is in the property and what binds a buyer
   - The monthly cost of waiting
3. **Property protection.** Keep the asset's value intact while enforcement runs, under your counsel's direction.
   - Securing, winterizing and utilities
   - Insurance coordination for vacant property
   - Repairs and contractors, with quotes approved by you
4. **Power of sale and receivership sales.** A sale process built to show you took reasonable steps to get market value.
   - Pricing supported by comparables and, where needed, appraisals
   - Full market exposure, including MLS and qualified investors
   - Offer management and a complete sale record for your file
5. **Loan book valuation reviews.** Current values across your collateral, so problems surface early.
   - Broker opinions of value on a schedule you set
   - Flags on properties where equity is thinning
   - Fixed fee per property [CONFIRM]
6. **Stalled construction and development.** Decide whether to finish, sell as-is or sell to a builder.
   - As-is versus completion analysis with cost consultants [CONFIRM partners]
   - Builder and developer buyer outreach
   - Land and site sales [CONFIRM capability]

### 5. Who does what

Heading: **Your lawyer and Danmar: who does what**

Intro line: "Enforcement is legal work. Value, protection and sale are ours. Keeping the lines clear protects your file."

Build this as a two-lane horizontal timeline (stacked vertically on mobile), lanes labelled **Your lawyer** and **Danmar**, with stages running left to right:

| Stage | Your lawyer | Danmar |
|---|---|---|
| Default | Demand and default steps | Site visit and broker opinion of value |
| Options | Advises on remedy and priorities | Recovery options memo and cost of delay |
| Notice period | Notice of sale or receivership application | Pricing plan, protection plan, listing prepared |
| Possession | Takes possession or obtains the order | Secures and prepares the property |
| Sale | Agreement terms and conditions | Marketing, showings, offers, negotiation |
| Closing | Closing documents and distribution | Sale process record delivered to your file |

Keep the stage names generic. Do not state statutory day counts.

### 6. Recovery Timeline Estimator

Heading: **The cost of delay**

Subhead: "See how time changes what your loan can recover. No email required."

Full spec in the Estimator section below.

### 7. A sale process you can defend

Heading: **A sale process you can defend**

Body: "Courts expect a lender selling under power of sale to take reasonable precautions to obtain the true market value. They look at how the property was priced, how widely it was marketed, for how long, and how offers were handled. Our process is built to document each of those steps, so your lawyer has the record if a sale is ever challenged."

Then a short list titled **Your sale process record includes:**
- Pricing rationale, comparables and any appraisals
- Every marketing channel used, with dates
- Showing and enquiry log
- Every offer received, with terms and the reason it was accepted or declined
- Timeline from listing to closing

### 8. How it works

Heading: **How a recovery file works**

A real sequence, so number the steps 1 to 6:

1. **Conflict check and intake.** We confirm we have no relationship with the borrower before we take the file. Same business day [CONFIRM].
2. **Site visit and broker opinion of value.** Within [CONFIRM: 3] business days, access permitting.
3. **Recovery options memo.** Timing, net proceeds and risks for each path, for review with your lawyer.
4. **Protect and prepare.** Security, insurance, repairs and presentation, with costs approved by you.
5. **Market and sell.** Pricing, full exposure, showings, offers and negotiation.
6. **Close and report.** Your lawyer closes. We deliver the sale process record.

### 9. Illustrative example

Label at the top, visible and unmissable: **Illustrative example, not a client transaction.**

"A private lender holds a $470,000 second mortgage at 12% (including arrears) on a GTA house worth $1.5M. A $900,000 first mortgage at 6% sits ahead of it. Carrying costs run about $2,500 a month, and selling costs about 5%.

- **Sold in 3 months:** about $504,000 is available after the first mortgage and costs. The lender's claim has grown to about $484,000, so it recovers in full.
- **Sold in 12 months:** about $441,000 is available. The claim has grown to about $526,000, leaving a shortfall of about $85,000.

Each month of delay removes about $7,000 of equity: $4,500 of interest on the first mortgage and $2,500 of carrying costs. This assumes the same sale price at both timelines."

Present it as two bars on one scale (available proceeds against the lender's claim at 3 and 12 months), with the shortfall visibly marked. Keep the arithmetic visible.

### 10. Why Danmar

Heading: **Why lenders and receivers work with us**

Reuse the advisor bio block from the Corporate Real Estate Capital page, with this page's bullets:

**Daniel Sheikhan, Broker** [CONFIRM registered name]
Danmar Empire Real Estate Corp., Brokerage

- Broker with a finance degree and hands-on experience owning and managing rental and commercial property
- Lawyer licensed in Ontario, New York and Minnesota. On recovery files, Danmar does not act as your lawyer; we work alongside your counsel.
- Manages a multi-property portfolio of about $100M for a private family office [CONFIRM consent and wording]

**Representative experience** (anonymized, one line each) [CONFIRM each item and consent]:

- Acted for a commercial landlord through a tenant's court-supervised liquidation, involving a bank's secured claim and materials abandoned at the premises
- Recovered and re-leased a commercial unit after a tenant default, with security structured against future default
- Managed residential tenancy defaults through to resolution
- Sold multiple commercial and residential assets from a family office portfolio

Leave room to add power of sale and receivership sale case studies as they close.

### 11. Fees

Heading: **How we're paid**

"Site visit and broker opinion of value: a fixed fee, credited against our commission if we sell the property. Sales: commission agreed in writing in the listing agreement before marketing starts. Loan book reviews: a fixed fee per property." [CONFIRM all fee wording]

Do not publish percentages or dollar amounts.

### 12. FAQ

Accordion, all answers rendered in the HTML for indexing. Mark up with `FAQPage` schema.

1. **Who is your client on a recovery file?** The lender, or the court-appointed receiver. We run a conflict check before taking any file.
2. **Can you issue a notice of sale or take possession?** No. Those are legal steps for your lawyer. We work under your counsel's direction.
3. **Do you collect loan payments or administer mortgages?** No. Danmar does not collect payments or enforce defaults. We value, protect and sell the property.
4. **Power of sale or receivership: which is better?** It depends on the number of properties, their complexity, any operating business, construction status and the need for court supervision. Your lawyer decides the remedy. We provide the valuation and market input that informs it.
5. **What if there are tenants?** Tenancies can bind a buyer and affect value, timing and the buyer pool. We review them early. Residential tenancies are governed by the Residential Tenancies Act, so your lawyer leads on any tenant steps.
6. **How do you price a power of sale property?** From comparable sales, the property's condition and, where needed, an independent appraisal. We document the pricing for your file.
7. **Is a broker opinion of value the same as an appraisal?** No. It is a market opinion from a registered broker. Where a court or your file requires an appraisal, we coordinate one with a qualified appraiser.
8. **What can rank ahead of my mortgage?** Prior mortgages, property tax arrears and, in some cases, Canada Revenue Agency claims for unremitted HST or payroll deductions, as well as construction liens. Your lawyer confirms priorities. We include known prior claims in the options memo.
9. **Can you list for a borrower who agrees to sell?** [CONFIRM policy. Draft: "Only with written disclosure of our relationship with the lender and the consent of all parties."]
10. **How fast can you start?** Same-day conflict check and a site visit within [CONFIRM: 3] business days, access permitting.
11. **What property types and areas?** Houses, condominiums, multi-residential, commercial, industrial and development land across Ontario [CONFIRM].
12. **Do you review loan books before there's a default?** Yes. We provide scheduled broker opinions of value across a lender's collateral for a fixed fee per property.

### 13. Intake form

Heading: **Request a site visit**
Subhead: "Tell us about the property. Please don't include the borrower's name; we collect that after the conflict check."

Full spec in the Form section below.

### 14. Footer disclosure

"Danmar Empire Real Estate Corp., Brokerage. Information on this page is general and indicative. It is not legal, tax or financing advice. Danmar does not administer mortgages, collect loan payments or enforce defaults. Broker opinions of value are not appraisals. Figures in the estimator and illustrative example are estimates only."

## Recovery Timeline Estimator spec

**Behaviour:** results update live as inputs change. No email gate. The contact ask comes after the result, as an offer. Client-side only; nothing is stored or sent unless the visitor submits the form.

**Inputs:**

| Input | Type | Default | Range |
|---|---|---|---|
| Property type | select | House | House, Condominium, Multi-residential, Commercial, Industrial, Land |
| Estimated market value (V) | currency | $1,500,000 | $100K to $50M |
| Your loan balance today, incl. arrears (L) | currency | $470,000 | $10K to $50M |
| Your interest rate (r) | percent | 12% | 0% to 25% |
| Your position | toggle | Second or later | First, Second or later |
| Prior mortgage balance (P) | currency, shown only if second or later | $900,000 | $0 to $50M |
| Prior mortgage rate (rp) | percent, shown only if second or later | 6% | 0% to 20% |
| Property tax arrears (T) | currency | $0 | $0 to $1M |
| Early sale timeline (m1) | slider, months | 3 | 1 to 12 |
| Enforcement timeline (m2) | slider, months | 12 | 3 to 24 |
| Carrying costs, % of value per year (c) | slider | 2% | 0.5% to 5% |
| Selling costs (s) | slider | 5% | 2% to 8% |

Put the last four under an "Adjust assumptions" disclosure, collapsed by default. If position is First, set P and rp to 0 and hide them. [CONFIRM all defaults]

**Formulas** (for each timeline m, simple interest):

- Monthly carrying cost C = V × c ÷ 12
- Net sale proceeds N = V × (1 − s)
- Available to your loan A(m) = max(0, N − T − P × (1 + rp × m ÷ 12) − C × m)
- Your claim K(m) = L × (1 + r × m ÷ 12)
- Recovery R(m) = min(A(m), K(m))
- Recovery rate = R(m) ÷ K(m)
- Shortfall = max(0, K(m) − A(m)); Surplus = max(0, A(m) − K(m))
- Equity lost per month of delay = C + P × rp ÷ 12

**Test case** (must match the illustrative example): V $1.5M, L $470K, r 12%, P $900K, rp 6%, T $0, c 2%, s 5%.
- m = 3: A = $504,000, K = $484,100, full recovery, surplus $19,900
- m = 12: A = $441,000, K = $526,400, shortfall $85,400
- Equity lost per month = $7,000

Unit-test these values and the edge cases: first position, A = 0, very short and very long timelines.

**Outputs:**

- Two grouped bar pairs on one shared scale, "Sold in [m1] months" and "Sold in [m2] months", each showing available proceeds against your claim, with shortfall or surplus labelled.
- Recovery rate for each timeline, as a percentage.
- One line: "Each month of delay removes about $X of equity."
- Round displayed figures to the nearest $1,000. Tabular numerals.

**Under the result:**

- Button: **Request a site visit**. It scrolls to the form and pre-fills property type, position and a value band.
- Disclaimer (small, always visible): "Indicative only. Assumes the same sale price at both timelines and simple interest. Excludes enforcement legal costs, HST, and claims that may rank ahead of your mortgage, such as CRA deemed trusts and construction liens. An early sale may need the borrower's cooperation. Not legal advice. Danmar does not administer mortgages or enforce defaults."

## Intake form spec

**Fields** (* required):

- Full name*
- Your role*: Private lender, MIC or fund, Mortgage administrator, Lender's counsel, Receiver or trustee, Other
- Company or firm*
- Work email*
- Phone*
- Property city*
- Property type* (same list as the estimator)
- Approximate value: Under $500K, $500K to $1M, $1M to $2M, $2M to $5M, $5M to $15M, Over $15M
- Your position: First mortgage, Second or later, Receiver, Not applicable
- Where things stand*: Payments missed, Notice of sale issued, Notice period ended, In possession, Receivership order made, Loan book review (no default)
- Occupancy: Owner-occupied, Tenanted, Vacant, Unknown
- How soon do you need us?: This week, Within 30 days, Planning ahead
- Anything else we should know (textarea, with placeholder "No borrower names, please")
- Consent checkbox, unticked by default (CASL): "I agree to be contacted by Danmar Empire Real Estate Corp., Brokerage about this enquiry."
- Link to the privacy policy.

**Hidden fields:** UTM source, medium, campaign and content, plus estimator inputs if used.

**On submit:**

- Send to [CONFIRM email address] with the subject line "Recovery file: [city], [stage]" and store in the site's lead store or CRM, tagged `lender-recovery`.
- Confirmation in place of the form: "Thank you. Daniel will reply within one business day to run a conflict check and arrange next steps." Do not say a visit has been booked.
- Clear, specific error messages next to each invalid field.

## Design direction

- **Audience:** lenders and lawyers who are busy and wary. Calm, exact and quietly urgent. It should read like a well-run professional services firm.
- Same design system and components as the Corporate Real Estate Capital page. One accent colour, used sparingly. Tabular numerals wherever numbers align.
- Two visual centrepieces: the Recovery Timeline Estimator and the "Who does what" two-lane timeline. Give them the most care. Everything else stays quiet.
- Semantic colour for shortfall and surplus in the estimator, distinct from the brand accent, and never the only signal (label the figures too).
- Imagery: architecture only. No people, no boarded-up houses, no "for sale" signs, nothing that looks like a real enforcement property.
- Motion: minimal. Only the estimator bars animate on input change; respect `prefers-reduced-motion`.
- Mobile first. The two-lane timeline becomes a vertical stack on phones; tables scroll inside their own container; the page body never scrolls sideways.

**Skills to use, in this order:**

1. `/impeccable` for the full design and copy quality pass on the finished page.
2. `emil-design-eng` for the estimator's interaction details and the timeline's responsive behaviour.
3. `find-animation-opportunities`, then `review-animations` to keep motion restrained. Cut anything decorative.
4. **Playwright MCP** to screenshot and review your own work (see QA).

## Analytics

Fire these through the site's existing analytics:

- `lender_cta_click` (with location: hero, estimator, footer)
- `recovery_estimator_interacted` (first input change)
- `recovery_estimator_completed` (value band and position only, never exact figures)
- `lender_form_submitted` (with role, stage and UTM source)
- `faq_opened` (with question number)

## QA before you hand back

1. Playwright screenshots at 1440px and 390px wide, light and dark if the site supports both. Review them yourself and fix what you find before showing me.
2. Confirm the estimator reproduces the test case exactly, and check every edge case.
3. Keyboard-only pass: every control reachable, visible focus, form errors announced.
4. Lighthouse: performance, accessibility and SEO at 90 or above on mobile.
5. Validate the structured data.
6. Search all copy for em dashes, US spellings and the banned phrases in the compliance rules ("enforce", "collect", "recover your loan", "maximize", "guaranteed", "distressed deal", "appraisal" used for our own valuations) and fix them.
7. Confirm no client, borrower or referrer names, and no identifiable enforcement property photos, appear anywhere.
8. Check that both advisory pages link to each other and that the parent advisory page shows both cards.

## Hand back to me

- The preview link.
- Desktop and mobile screenshots.
- The updated `CONFIRM.md`, with this page's items under their own heading.
- A list of any copy you changed from this brief, and why.
