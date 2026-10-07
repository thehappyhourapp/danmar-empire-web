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

## /firm

- **Founding year and place, "2016, Oakville".** Removed from the facts strip, the opening copy and the italic line ("Oakville first, since 2016"). The person pages, the footer and llms.txt no longer state a founding year either. Confirm the year and it goes back into the strip.
- **"Est. 2016" on Home and `foundingDate` in the Organization JSON-LD.** Removed with the founding year; the Home eyebrow now reads "Oakville · King City · Toronto" alone. The "$1B+" figure's basis line ("2016 to date") is a separate claim, already in docs/launch-blocking.md, and is unchanged.
- **"Oakville first."** Removed with the line above; the page says the firm keeps offices in Oakville and Vaughan (OFFICES data) and nothing about which came first.
- **Testimonials permission line.** The brief's "Statements from clients of the brokerage, reproduced with permission." is not shown until Daniel confirms permission. The seven statements are reproduced verbatim from the previous site's testimonials page, attribution as published.
- **Office photographs.** `Oakville.jpg` (the glass building marked 2010, taken as 2010 Winston Park Drive) is used for both Oakville rows; "Oakville 2.png" (a flex unit marked 10) is unused. Confirm the Oakville image is the right building, and whether 2380 Bristol Circle should carry its own photograph. `Vaughan.jpg` shows 9131 Keele Street; it carries a small watermark in its lower right corner and a tenant's sign, so confirm the firm holds the rights to publish it.

## /firm/[slug]

Deleted as unconfirmed on 7 Oct 2026. Nothing below is on the site; each line returns only if Daniel confirms it.

### Martin Sheikhan
- "Founded the firm in 2016." (line)
- "Three decades in capital project delivery before real estate." (line) and "Martin spent thirty years delivering capital projects before he ever took a listing, and it is the reason this firm runs files the way it does. A project manager does not present a building without the numbers behind it, and does not accept a schedule they have not tested." (bio). The brief says "three decades" is wrong; the page now says "about forty-five years ago in tablet formulation" and "multi-billion-dollar projects in the pharmaceutical industry", from the supplied facts.
- "As Broker of Record he signs every data agreement, owns the trust accounting, and is the final read on every file that leaves the office. He also holds the firm's builder relationships, which is how Danmar clients see new-construction inventory before it reaches a sales centre." (bio)
- Focus "Brokerage compliance, Development, Builder relationships"; areas "Oakville · Vaughan · Ontario".
- **Role.** Now "Broker of Record · Real Estate Broker · Partner" as the brief gives it. Confirm the RECO-registered category wording.
- **Background paragraph.** Written from the supplied facts only, in plain prose, until Martin's own snippet arrives (photos-inbox/copy/martin-snippet.txt); it is then replaced verbatim.

### Daniel Sheikhan
- "Managing Partner & Broker" (role). Now "Partner · Barrister & Solicitor · Attorney · Real Estate Broker"; "Managing Partner" returns only if Daniel re-confirms it.
- "Leads asset management, investment and the commercial practice." (line)
- "Daniel is called to the bar in Ontario and admitted in New York and Minnesota, and holds a commerce degree alongside the law degree. He leads the firm's asset and portfolio management mandates and underwrites every investment file before it reaches a client." and "First place at the 2021 International Negotiation Competition, and a Minnesota Qualified Neutral. In practice that means the hard conversations in a transaction are the ones he is most comfortable having." (bio). The credentials themselves (bar admissions, B.Comm., J.D., the 2021 competition, Minnesota Qualified Neutral) were supplied earlier and stay as Certifications, Education and Achievements rows; the surrounding prose is gone until Daniel's own bio arrives (photos-inbox/copy/daniel-bio.txt).
- Focus "Asset & portfolio management, Investment underwriting, Commercial and industrial"; areas "Greater Toronto Area · Ontario · Cross-border".
- Kept: "He acts for clients of the firm as a real estate broker, not as their solicitor."

### Sara Sheikhan
- "Residential sales, and listing presentation across the firm." (line)
- "Sara carries her own residential book and also sets the standard for how every Danmar listing is presented: photography direction, copy, and the campaign that goes around it." (bio)
- Focus "Residential sales, Listing presentation, Photography direction"; areas "Oakville · Vaughan".
- Role is now "Real Estate Salesperson · Property Manager"; /property-management names her as Property Manager. No portrait yet (emblem filler, temporary).

### Anita Tayi
- "Residential resale across Oakville, Burlington and Milton." (line)
- "Anita runs the firm's Halton residential desk. She works a small number of files at a time and is known for knowing which street a family actually wants before they do." (bio)
- Focus "Residential resale, First-time and move-up buyers, Halton region"; areas "Oakville · Burlington · Milton".
- Her bio is empty until photos-inbox/copy/anita-bio.txt is dropped; it is then lifted verbatim.

### Anna Shea
- "New construction and builder inventory." (line)
- "Anna handles the firm's new-construction practice: builder allocations, pre-construction agreements, and the diligence that should happen before an APS is signed rather than after." (bio)
- Focus "New construction, Pre-construction assignments, Builder allocations"; areas "Greater Toronto Area".
- No headshot by her choice: the emblem filler is deliberate.

### Mahmoud Abu Hudra
- "Leasing and investor services, Vaughan and north Toronto." (line)
- "Mahmoud works the leasing desk and the investor side of the book out of the Vaughan office, covering the Keele and Highway 7 industrial corridors as well as executive residential." (bio)
- Focus "Executive leasing, Investor services, Industrial and flex"; areas "Vaughan · North Toronto · York Region".

### Marion Miral
- Nothing deleted; name, role and portrait only.

### Portraits
- The @2x files are written at the source's own width where it is under 1600px (1086px for the studio portraits, 857px for Anita's landscape original), never upscaled. Supply larger originals if a true 1600px file is wanted.
