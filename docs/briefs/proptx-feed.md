# Brief: PropTx DLA feed into /collection

Prompt j. The brokerage's own listings, from the TRREB/PropTx RESO Web API (AMPRE), replace the
sixteen fictional placeholder listings in src/lib/data.ts. Nothing about the Collection, Property,
Home, Areas, IntelBar, Saved or sitemap templates changes visually; they read the same `Listing`
shape from a new source. CLAUDE.md Design DNA governs.

## 0. The licence terms that shape this build (PropTx Data License Agreement, 2 Oct 2026)

Licensee is Martin Sheikhan (membership 9537788) for Danmar Empire Real Estate Corp., access level
"Brokerage's Listings", $0 fee, auto-renews by calendar year. Four clauses bind the code:

1. **No AI System may receive Data** (s.1.e: the licensee may not "provide any content retrieved
   or derived from the Database to an AI System for any purpose"). Consequences for this pass:
   - You (Claude Code) do not fetch Property or Media records. You may fetch `$metadata` (schema,
     not Data) to confirm field names. Build and test against a fixture in
     `src/lib/__fixtures__/proptx.ts` made from RESO Data Dictionary field names with invented
     values, clearly marked as such. Daniel verifies the live feed in his own browser.
   - Never log, screenshot, print or paste a live record. The dev server may be run only with
     `PROPTX_TOKEN` unset or `X` so pages render the empty state; do not run it against the live
     API during this pass.
   - robots.txt: disallow GPTBot, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot,
     Google-Extended, CCBot, Bytespider, Applebot-Extended, OAI-SearchBot, ChatGPT-User on
     `/collection` and `/collection/*`. Keep them allowed elsewhere. Add
     `<meta name="robots" content="noai, noimageai">` on listing pages. llms.txt must not describe
     or link individual listings; it may say the collection page exists.
2. **Honour `perm_adv` and `disp_addr`** (Addendum). In RESO terms these are
   `InternetEntireListingDisplayYN` and `InternetAddressDisplayYN`; PropTx may also expose them
   under their legacy names. Find both in `$metadata`. A listing with display permission N is not
   shown at all (we are the listing brokerage, but do not rely on that reading; omit it). A listing
   with address display N shows city and region only: no street, no map, no address in the slug
   (slug falls back to `listing-<ListingId>` lowercase), no address in JSON-LD.
3. **Delete Data within 60 days of it ceasing to be current** (s.1.d). Therefore no database, no
   replication store, no cached JSON on disk. ISR at 15 minutes is a transient cache and acceptable;
   set `revalidate` on `/collection/[slug]` so an expired listing drops within the hour. Nothing
   from the feed is written to the repo or to Vercel Blob/KV. **Sold and leased listings are never
   taken from the feed** for Track Record: that page uses the firm's own records (s.5.c lets the
   licensee use its own data), entered in data.ts from what Daniel supplies.
4. **Retrieve no more often than once every 24 hours** per s.3.a for the replication reading, and
   at least daily. ISR at 15 minutes makes more requests than that when traffic is steady. Set
   `revalidate = 3600` on both collection routes (one fetch an hour at most, within the spirit of
   "update daily") and note the 24-hour clause in docs/CONFIRM.md for Daniel to confirm with PropTx
   that on-demand reads of a brokerage's own listings are fine at that cadence. Add a
   `GET /api/revalidate?secret=` route (secret in `REVALIDATE_SECRET`) that calls
   `revalidateTag('proptx')`, so a new listing can be pushed live without waiting.

Credentials: `.env.local` on this machine has `PROPTX_TOKEN` and `PROPTX_OFFICE_KEY` as `X` until
Daniel pastes the values; the same names are set in Vercel. Never print them. Add both names and
`REVALIDATE_SECRET` to `.env.example` with comments.

## 1. API facts (from developer.ampre.ca; verify against `$metadata`)

- Base: `https://query.ampre.ca/odata/`. Header `Authorization: Bearer <token>`, `Accept: application/json`.
- Metadata: `https://query.ampre.ca/odata/$metadata`. Fetch it once and confirm field names below.
- Resources: `Property`, `Media` (also Member, Office). OData v4: `$filter`, `$select`, `$orderby`,
  `$top` (default 100, max 10,000; keep 100 when using `$expand`), `$count`.
- Replication guidance: order by `ModificationTimestamp,ListingKey`; do not page with `$skip`. For a
  brokerage with tens of listings a single filtered query is enough; no replication store (§0.3).
- Rate limit 60,000 req/min per vendor; 429 carries `X-Rate-Limit-Retry-After-Seconds`.
- Media: `Media?$filter=ResourceRecordKey eq '<ListingKey>' and ResourceName eq 'Property' and
  ImageSizeDescription eq 'Large'&$orderby=Order,MediaKey`. Fields: `MediaKey`, `MediaURL`,
  `Order`, `PreferredPhotoYN`, `ImageSizeDescription`, `MediaCategory`, `ModificationTimestamp`.
  Size values per the docs include 'Large'; `$metadata` may enumerate the rest. Because you cannot
  fetch a record (§0.1), configure `images.remotePatterns` with `{ protocol: 'https', hostname:
  '**.ampre.ca' }` plus `'**.proptx.ca'`, and render the hero frame through a `/api/photo?u=` proxy
  (server fetch, `Cache-Control: public, max-age=3600`, hostname allow-listed to those two patterns)
  so an unexpected CDN host or a signed URL does not break the page. Daniel reports the real host
  after the first live render and the proxy can be dropped later.
- The token's access level is "Brokerage's Listings", so the API should return only Danmar's
  records. Belt and braces: when `PROPTX_OFFICE_KEY` is set and not `X`, add
  `and ListOfficeKey eq '<key>'`; otherwise add `and contains(ListOfficeName,'DANMAR')`. Daniel
  confirms in the browser that the count matches the brokerage's active listings.

## 2. Code

`src/lib/proptx.ts` (server only):
- `fetchActiveListings(): Promise<Listing[]>` with
  `$filter=StandardStatus eq 'Active'` (also check `ContractStatus eq 'Available'` and `MlsStatus`;
  use whichever the metadata and a live sample show is reliable for "on market now"), `$orderby=
  ModificationTimestamp desc`, `$top=200`, `$select` of only the fields mapped below.
- `fetchListing(slug)`, `fetchMedia(listingKey)`. Media is fetched only for the detail page and the
  hero of each list row (one call per listing, `$top=1` with `PreferredPhotoYN eq true` first, then
  the rest `$orderby=Order` on the detail page only).
- Use `fetch(url, { headers, next: { revalidate: 900, tags: ['proptx'] } })`. On non-200 or network
  error, log once and return `[]` / `null`; the pages must never 500 because the feed is down.
- Mapping to `Listing`:
  - `id`: slug = kebab(`UnparsedAddress` or `StreetNumber StreetName StreetSuffix`) + `-` + kebab(City);
    append lowercase `ListingId` only on collision. Keep `ListingId` (MLS®) and `ListingKey` as new
    optional fields on `Listing` (`mls?: string; key?: string`).
  - `name`: the street address (the feed has no property names; do not invent any).
  - `address`, `city` (`City`), `region` (`CityRegion` or `Community`; empty string if absent).
  - `price`: `ListPrice`; `intent`: `TransactionType` ('For Lease' -> 'lease', else 'sale').
  - `kind`: from `PropertyType` + `PropertySubType` ('Detached', 'Semi-Detached', 'Att/Row/Townhouse'
    -> 'Townhouse', 'Condo Apt'/'Condo Townhouse' -> 'Condominium', 'Multiplex'/'Investment' ->
    'Multi-Residential', 'Commercial Retail'/'Office' -> 'Commercial', 'Industrial', 'Vacant Land'
    -> 'Land'; default 'Detached' for Residential Freehold, 'Commercial' for Commercial).
  - `useClass`: 'investment' for Commercial/Industrial/Land/Multi-Residential, else 'residential'.
  - `beds`: `BedroomsTotal`; `baths`: `BathroomsTotalInteger`; `sqft`: midpoint of
    `LivingAreaRange` if present, else `BuildingAreaTotal`, else null.
  - `tenure`: 'Freehold' / 'Condominium' / 'Leasehold' from `OwnershipType`; else ''.
  - `tier`: null for all feed listings (Prime/Signature are editorial; no feed rule assigns them).
  - `status`: 'Available'; the active filter guarantees it.
  - `lat`/`lng`: `Latitude`/`Longitude` if present, else 0 (nothing on the site maps them).
  - `features`: up to eight short strings from `ParkingTotal`, `GarageType`, `Basement`,
    `HeatType`, `Cooling`, `PoolFeatures`, `LotSizeArea`+`LotSizeUnits`, `TaxAnnualAmount` ("Taxes
    $X (YYYY)"). Only fields that exist; no adjectives.
  - `capRate`/`noi`: only if the feed carries `NetOperatingIncome` / `CapRate`; otherwise absent.
  - `standfirst`: '' and `body`: the feed's `PublicRemarks` as one paragraph, verbatim. The Property
    view must render cleanly when `standfirst` is empty (hide the pull-quote row).
  - `photo`: first Media URL (PreferredPhotoYN, else lowest Order); `photos: string[]` new optional
    field with the rest, for the detail page's gallery. `hue`: hash of ListingKey.
- `src/lib/listings.ts`: `getListings()` returns feed results when the feed returns at least one
  record, else `[]`. Delete the fictional LISTINGS array from data.ts entirely (and the Unsplash `U`
  helper). Every consumer (Home featured, Areas counts, IntelBar, SiteShell saved, CollectionList,
  collection pages, sitemap, photos.ts) reads from `getListings()`; client components receive the
  array as a prop from a server parent. IntelBar and Saved continue to work on the passed array.
- `/collection`: `export const revalidate = 900`. `/collection/[slug]`: `dynamicParams = true`,
  `generateStaticParams` from the feed, `notFound()` when the slug is gone. Sitemap reads the feed.
- Home featured: the first three feed listings by `ListPrice` desc (not hand-picked IDs).
- Empty state: when the feed returns zero, /collection shows one row: "No properties are listed
  publicly today. Private and off-market properties are available by enquiry." with the enquire
  link; Home's collection chapter shows the same line in place of the three frames. No fake rows.
- `next.config.ts`: `images.remotePatterns` for the Media host discovered in §1. Use `<Image>`
  with `sizes`; if MediaURL turns out to be signed/expiring, note it and use a `/api/photo?key=`
  proxy that re-fetches through the Media resource with `revalidate: 86400`.
- Photo pipeline: `listingPhoto(id)` in photos.ts falls back to the feed photo when no local file
  exists; a local `/public/photos/<id>.jpg` still wins (for off-market or edited photography).

## 3. Display compliance

- First, lift `photos-inbox/copy/anita-bio.txt` verbatim into Anita Tayi's `bio` (three
  paragraphs); pass i missed it because the file arrived late. Same commit.
- Every listing row and detail page shows "Listed by Danmar Empire Real Estate Corp., Brokerage"
  and the MLS® number. Add to the footer disclosure block (once per page, small meta): "MLS®,
  REALTOR® and the associated logos are trademarks of The Canadian Real Estate Association.
  Listing data provided under licence by the Toronto Regional Real Estate Board (TRREB) through
  PropTx. Information deemed reliable but not guaranteed." Confirm the exact wording PropTx requires
  in the DLA (Daniel has the agreement) and list it in docs/CONFIRM.md.
- No sold prices, no days on market, no price history on any open page (RECO / VOW line).
- `PublicRemarks` verbatim; do not edit a registrant's listing copy.

## 4. Done means

`npm run build` clean with `PROPTX_TOKEN` as `X` (empty state everywhere, no throws); unit tests
for the mapper and the slug rules against the fixture (Node test runner, as the estimator tests);
a test that a fixture record with display permission N is dropped and one with address display N
loses its street everywhere. Crawl zero broken links. axe clean on /collection and one
detail page. Lighthouse mobile on the fixture-rendered detail page (temporarily wire the fixture through an
`PROPTX_FIXTURE=1` env flag that only works outside production): LCP under 2.5s with the photo as
LCP, `priority` + `sizes` on the hero frame, nothing animating in. Screenshots at 1440/390 of
/collection (empty state and fixture state), one fixture detail page, Home collection chapter.
Report: every field whose `$metadata` name differed from this brief, the display-permission field
names you found, the robots and noai changes, and the CONFIRM.md additions. Then write
docs/LIVE-CHECK.md: the five things Daniel checks in his browser once the token is pasted (count,
addresses, photos, an address-N listing if any, the revalidate route). Commit "v2: PropTx DLA feed into the
collection". Update docs/launch-blocking.md and public/llms.txt (listings now live).
