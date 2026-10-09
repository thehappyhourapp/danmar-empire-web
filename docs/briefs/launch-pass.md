# Brief: launch pass (prompt k)

Daniel answered the CONFIRM items on 8 Oct 2026. Apply every answer below, remove the prototype
chrome, place the software frames, and leave v2 ready to merge. CLAUDE.md Design DNA governs.
Strike each resolved entry from docs/CONFIRM.md (keep the file for the items still open).

## 1. Confirmed facts, apply everywhere they appear

- **Toll-free:** 1 877 DANMAR 1 = **1-877-326-6271**. Fix the `tel:` href in Footer.tsx (currently
  2671) and anywhere else; grep for 3262671.
- **Public email:** `daniel@danmarempire.com` everywhere for now (Footer, Contact, metadata.ts,
  Organization JSON-LD, llms.txt). info@ will exist later; leave a one-line note in launch-blocking.
  Never show deals@ (accounting).
- **Registered name for RECO advertising:** "Danmar Empire Real Estate Corp., Brokerage" (as
  built). Corporate legal name, where a legal name is wanted (privacy page, JSON-LD `legalName`):
  "Danmar Empire Real Estate Corp." without "Brokerage".
- **Founded:** 2016, Oakville. Restore "Est. 2016" on Home, the Firm facts strip ("Founded · 2016,
  Oakville"), `foundingDate: "2016"` in Organization JSON-LD, PRODUCT.md, llms.txt, and the /firm
  SEO description if it read better with the year. The italic line on /firm may return to a form
  that carries the year only if it still carries the Dan + Mar fact; otherwise leave it.
- **$1B+ basis:** the figure is the principals' career total, not the firm's since 2016. Replace
  every basis line with: "Aggregate value of sale and lease transactions in which the principals
  have acted over their careers. Methodology on request." Do not add a year.
- **Martin:** RECO category Broker, registered as Broker of Record. Role stays "Broker of Record ·
  Real Estate Broker · Partner". Person JSON-LD `jobTitle` "Broker of Record".
- **Daniel:** registered name "Daniel Sheikhan", category Broker. The Capital advisor row and any
  RECO-form line may now read "Daniel Sheikhan, Broker". Role unchanged (no "Managing Partner").
- **Testimonials:** permission confirmed. Add the meta line under the /firm block:
  "Statements from clients of the brokerage, reproduced with permission."
- **Vaughan office photo:** crop out the watermark (bottom right) and the tenant's sign; re-export
  from photos-inbox/offices/Vaughan.jpg via scripts/photos.mjs with a crop rectangle, 16:10.

## 2. Software frames on /asset-management

Three screenshots in photos-inbox/software/: `dashboard.jpg`, `properties.jpg`, `reports.jpg`
(1387×868, sample account, figures illustrative). Process through scripts/photos.mjs into
public/photos/app/{dashboard,properties,reports}.jpg at 16:10 (crop from the top, keep the header),
1400w, sRGB, EXIF stripped; no upscaling. Fill the three reserved frames in order with captions:
"Family dashboard: net worth, liquidity and debt in one view." / "Property register: value, cost
base and gain by holding and owner." / "Reports: statements and exports on demand." Add a single
meta line under the three: "Sample account. Figures are illustrative." `<Image>` with `sizes`, lazy
(not LCP). alt text describes the screen, no figures.

## 3. Prototype chrome off

- Remove the prototype notice bar (SiteShell.tsx) and the TypeSwitch component and its import;
  delete src/components/TypeSwitch.tsx. Bodoni stays the display face.
- JOURNAL placeholders: hide /journal from the header and footer nav and sitemap, keep the route
  answering (it reads "Writing from the firm appears here." with no fake entries), `noindex`
  until there is an article. Remove placeholder entries from data.ts.
- Any other sample copy that names a fictional owner, builder, year or figure: remove it.
  grep for the sixteen old listing slugs and names to be sure nothing references them.

## 4. Lender and Receivership Advisory

A new brief sits at docs/briefs/lender-receivership-advisory.md. It is NOT part of this pass.
Do not start it; it is prompt l, after launch.

## 5. Done means

Build clean, lint clean, zero broken links, axe clean on Home, /firm, /asset-management,
/contact. Lighthouse mobile on Home and /asset-management: performance 95+, accessibility 100.
grep: no "info@", no "3262671", no "2016 to date", no "TypeSwitch", no "[CONFIRM]" in rendered
output. Screenshots at 1440/390 of Home top, /asset-management software row, /firm facts strip,
/contact offices. Update docs/launch-blocking.md to the true remaining list (Resend key, PropTx
token live check, Vercel framework switch, DNS). Commit "v2: launch pass". Report the CONFIRM
entries struck and the ones still open.
