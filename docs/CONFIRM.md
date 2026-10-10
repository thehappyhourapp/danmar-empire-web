# To confirm before launch

## /terms is a draft for Daniel's review (9 Oct 2026)

The Terms of Use page is live but drafted for review, not settled. Points I was unsure of:

- **The listing disclaimer.** The page uses the same sentences as the footer ("deemed reliable but is not guaranteed accurate", "Not intended to solicit properties currently under contract", the CREA trademark lines). The feed brief does not quote the DLA's own display disclaimer, so the exact wording PropTx and TRREB require still needs checking against the agreement.
- **The AI and scraping clause.** It restates the DLA's s.1.e prohibition (no listing data to an AI system) as a condition on visitors, and extends it to all site content. Confirm the extension to non-listing content is wanted.
- **Exclusive jurisdiction.** The governing-law row gives the courts of Ontario exclusive jurisdiction. Say if non-exclusive is preferred.
- **Indemnity and limitation of liability.** Conventional wording, to the extent Ontario law allows; consumer-protection limits on enforceability against individuals are not addressed.
- **"Partners".** The liability and indemnity rows name "partners, brokers, salespersons and staff". Confirm "partners" is the right word for the corporation's principals.
- **The illustrative-photographs sentence.** It is in the Terms and now in the footer disclosure block. Today it covers the Unsplash place photographs on /areas; the generated practice scenes (prompt q) have not arrived yet.
- **Effective date.** 9 October 2026, the day it went up. Change it when the reviewed version replaces the draft.

Lines marked [CONFIRM] in the briefs are never rendered. Each is listed here by
page and section, with what the page shows in its place. Confirm or correct the
fact and the line goes in; strike it and the entry goes.

Struck on 9 Oct 2026 after Daniel's answers of 8 Oct (see docs/briefs/launch-pass.md):
the toll-free number, the public email, the legal name, the founding year and place,
the $1B+ basis, Martin's and Daniel's RECO forms, the testimonials permission line
and the Vaughan photograph. What follows is still open.

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

## /collection and /collection/[slug] (the PropTx feed)

The feed is wired against the fixture only; nothing was read from the live Property or Media resources in this pass. These need Daniel, or PropTx, before launch.

- **Read cadence versus the 24-hour clause.** The DLA's replication language speaks of pulling data once every 24 hours. The site reads the brokerage's own active listings on demand, cached for an hour (`REVALIDATE` in `src/lib/proptx.ts`), plus a manual refresh route. Confirm with PropTx that this sits within the agreement; if they want 24 hours, the one constant changes.
- **Field names, checked against `$metadata` on 9 Oct 2026.** `StandardStatus`, `MlsStatus` and `ContractStatus` are strings; `InternetEntireListingDisplayYN` and `InternetAddressDisplayYN` are booleans and both present (true on all 23 active records). Still to confirm:
  - the active filter is `StandardStatus eq 'Active'` (23 live records); `ContractStatus eq 'Available'` counts 24 and `MlsStatus eq 'New'` 15 (the other active ones carry 'Price Change' and 'Extension'). Confirm 23 is the number the board system shows;
  - a record that carries neither display flag is treated as displayable with its address; a record with either set to N is withheld;
  - photos are selected with `ImageSizeDescription eq 'Large'`, which AMPRE documents (Thumbnail, Medium, Large, Largest);
  - the office filter is `ListOfficeKey eq '249200'` when `PROPTX_OFFICE_KEY` is set to that key (read from the live record on 9 Oct 2026), otherwise `contains(ListOfficeName,'DANMAR')`; both count the same 23 active records.
- **Attribution wording.** The footer now carries: "MLS®, REALTOR® and the associated logos are trademarks of The Canadian Real Estate Association. Listing data provided under licence by the Toronto Regional Real Estate Board (TRREB) through PropTx. Information deemed reliable but not guaranteed." Confirm against the DLA's exact required text; the sentence lives once, in `src/components/Footer.tsx`.
- **The empty state.** With no token (or no active listings) the Collection shows "No properties are listed publicly today." and the enquiry line. Confirm the wording.
- **Photo URLs.** Media URLs are proxied through `/api/photo` and allow-listed to `ampre.ca` and `proptx.ca`; if the live URLs sit on another host, or carry an expiry signature, step 3 of the live check catches it.

## Photo credits

- **Generated (AI illustrations, not photographs of any real property):** every file in `public/photos/practices/`: investments (retail plaza), asset-management (elevated block) and asset-management-2 (rental courtyard), executive-leasing (kitchen and dining) and executive-leasing-2 (living room), property-management (building entrance) and property-management-2 (rental courtyard), corporate-real-estate-capital (warehouse and truck court) and corporate-real-estate-capital-2 (office and industrial building), relocating (waterfront path). Sources and prompts: `photos-inbox/practices/image-catalog.json` and the three manifests beside it. Alt text on each begins "Illustrative:", and the footer and /terms carry the illustrative-photographs sentence.
- **Unsplash (real places, not the brokerage's properties):** `public/photos/places/` except vaughan.
- **The brokerage's own:** `public/photos/people/`, `public/photos/offices/`, `public/photos/app/` (screens of a sample account).

## Practice strips (Home, /investments, /executive-leasing)

Restored on 9 Oct 2026 with Daniel's figures: going-in yield 0.5% to 2% and 6% to 24% after repositioning (basis line under the strip), off-market share roughly one in four, average lease $8,500 a month, furnishing +30% to 45% of base rent. Still out:

- **"Median list $2.38M"** (Private Sales). Not shown; confirm the figure and its basis and it returns as a third cell.
- **"Typical term 12 to 36 months"** (Executive Leasing). Not shown; the landlord row still says "Twelve to thirty-six months" as a description of how leases are structured. Confirm the figure and it returns as a cell.
- **Average lease against the floor.** The strip now says "Average lease $8,500 / month" beside a hero that says "$10,000 per month and up". Both are Daniel's; read together they say the floor is aspirational. Confirm the pairing, or change one.
- **Basis lines.** The private-sales and leasing basis lines ("Share of the brokerage's private sales files held off-market, to date." and "Across executive leases placed by the brokerage to date.") were written to state what the figures are; confirm the wording.

## /privacy
- **The policy text.** A short standard policy written for the form's consent link, covering what is collected, why, who sees it, retention, the visitor's choices and the governing law (PIPEDA, CASL, RECO record-keeping). Review every line before launch; adjust the retention statement to the brokerage's actual record-keeping policy.

## /asset-management and /property-management
- The capital-at-work illustration and its assumptions (33% equity, 5.5 to 6% cap rate, roughly 6% debt cost) are rendered as the brief gives them, labelled as an illustration.
- **The platform header in the three screens.** The launch brief asked for the screenshots cropped from the top with the header kept, and that is how `public/photos/app/` is cut. The header carries the platform's wordmark and a sample advisor address, which the asset-management brief had said are never shown. Confirm which rule stands; cropping below the header is a one-line change to `screen()` in `scripts/photos.mjs`.

## /firm

- **The italic line.** "Dan and Mar. A father, a son, and the firm they named after themselves." stays without the year; the facts strip now carries "Founded · 2016, Oakville". Say if the line should carry the year as well.
- **Office photographs.** `Oakville.jpg` (the glass building marked 2010, taken as 2010 Winston Park Drive) is used for both Oakville rows; "Oakville 2.png" (a flex unit marked 10) is unused. Confirm the Oakville image is the right building, and whether 2380 Bristol Circle should carry its own photograph. `Vaughan.jpg` is now cropped to leave out the watermark and the tenant's sign; confirm the firm holds the rights to publish the photograph itself.

## /firm/[slug]

Deleted as unconfirmed on 7 Oct 2026. Nothing below is on the site; each line returns only if Daniel confirms it.

### Martin Sheikhan
- "Founded the firm in 2016." (line)
- "Three decades in capital project delivery before real estate." (line) and "Martin spent thirty years delivering capital projects before he ever took a listing, and it is the reason this firm runs files the way it does. A project manager does not present a building without the numbers behind it, and does not accept a schedule they have not tested." (bio). The brief says "three decades" is wrong; the page now says "about forty-five years ago in tablet formulation" and "multi-billion-dollar projects in the pharmaceutical industry", from the supplied facts.
- "As Broker of Record he signs every data agreement, owns the trust accounting, and is the final read on every file that leaves the office. He also holds the firm's builder relationships, which is how Danmar clients see new-construction inventory before it reaches a sales centre." (bio)
- Focus "Brokerage compliance, Development, Builder relationships"; areas "Oakville · Vaughan · Ontario".
- **Background paragraph.** Written from the supplied facts only, in plain prose, until Martin's own snippet arrives (photos-inbox/copy/martin-snippet.txt); it is then replaced verbatim.

### Daniel Sheikhan
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
- **Credentials.** Anita may hold a recent master's degree. Not shown: her name carries no post-nominals until the degree and its abbreviation are confirmed (Daniel, Sara and Martin's are set beside their names on /firm and their pages).
- "Residential resale across Oakville, Burlington and Milton." (line)
- "Anita runs the firm's Halton residential desk. She works a small number of files at a time and is known for knowing which street a family actually wants before they do." (bio)
- Focus "Residential resale, First-time and move-up buyers, Halton region"; areas "Oakville · Burlington · Milton".
- Her bio is now the three paragraphs of photos-inbox/copy/anita-bio.txt, verbatim.

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
