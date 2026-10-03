# Danmar Empire — Website Rebuild: Data, Hosting and Cutover Plan

Prepared 12 September 2026. Read the three sections in order; they are sequenced, not parallel.

---

## 1. MLS data — start this now, it is the long pole

TRREB's MLS technology runs through **PropTx**. The API portal is `syndication.ampre.ca`; data agreements go to `dataagreements@proptx.ca` (416‑443‑8131). TRREB does not charge members for data access. **Martin has to sign as Broker of Record** — nothing moves without that.

There are three separate agreements and you need different ones for different features:

| Agreement | What it unlocks | Needed for |
|---|---|---|
| **DLA** (Data License) | *Your own* listings, including agent information | Company listings with Danmar branding |
| **IDX** | *All* active TRREB listings, reciprocal pool. No sold data, no open houses, **no listing-agent or office IDs** | The public map and full search |
| **VOW** | Sold prices, days on market, history — behind a consumer registration wall | The sold-data room, which is the real lead engine |

**Sequence:** DLA + IDX first (they get you a working site), VOW second (it needs a display-compliance review of the live site).

**Timeline:** best case 24 hours, realistically one to three weeks. The pipeline is Incomplete → Pending Review → Licensing In Progress → Ready For Implementation → **Pending Display Compliance** → Completed. That second-to-last stage is a human reviewing your live site.

**One constraint to know now:** only one vendor may hold a given domain. If any previous web provider registered `danmarempire.com` with PropTx, that agreement must be terminated before a new one is accepted.

### Vendor decision

**Recommended: Repliers.** Toronto-based, Ontario-native, $199–$399/month with no setup fee and no contract. Native GeoJSON polygon search out of the box, which is what the map needs. They have already solved the TRREB enumeration quirks (the RETS → RESO migration broke hundreds of field values) and the archive gating. Add-ons: archived data $149/mo, AI estimates $149/mo.

**Alternative: PropTx/Ampre direct.** Data costs $0. You then build replication, the photo pipeline, geocoding, a spatial index (the OData API has no native polygon query), VOW authentication and the consumer audit trail yourself. Worth it only if MLS data becomes product IP rather than marketing. It is not, yet.

**Not recommended: CREA DDF alone.** Free and self-service, but it is consent-based and carries only 60–65% of national listings. Your Oakville and Vaughan map would silently omit a third of inventory and every photo carries a REALTOR® watermark. Fine as a top-up for listings outside TRREB; useless as the primary source.

**Coverage note:** TRREB alone misses parts of Ontario. ITSO adds roughly 9,100 listings; its IDX is free and its VOW is $1,500/year. TRREB + ITSO is about 95% of the province.

### Compliance rules that are now built into the site

- **Sold prices cannot appear on an open page.** RECO treats that as advertising a sold property, which requires written consent from the parties. The same data behind a registration wall is a Virtual Office Website and is permitted. This is why the sold-data page is gated — it is a legal boundary, not a growth tactic.
- **Every IDX listing must credit the listing brokerage**, including in thumbnails. The IDX feed carries brokerage name as raw text only, no agent or office ID, so brokerage name is both all you get and exactly what you must show.
- **Honour the withhold-from-internet flag.** Where a seller directed the listing brokerage to suppress the address, the record still arrives in the feed and you must not display it. That is a code path, not a policy note.
- **VOW caps responses at 100 listings per query**, requires a bona-fide-interest confirmation, a 24-hour refresh floor, no alteration of content, and a consumer audit trail.
- **MLS® cannot appear in a domain name, email address or social handle.** REALTOR® takes the ® on first use, always capitalised.

**Get a written opinion before you launch any public sold-price feature.** RECO's 2018 statement that a VOW is not advertising predates TRESA's full phase-in, and the enforcement exposure is on your licence.

---

## 2. Hosting — leave Google alone

Your email is not at risk if this is done in the right order. The rule is simple: **change only the records that point at the website. Never touch MX, SPF, DKIM or DMARC.**

### Step 0 — find out where DNS actually lives (do this first)

Run `dig NS danmarempire.com` or check the Nameservers field in GoDaddy.

- **Nameservers point to GoDaddy** → GoDaddy holds your DNS, Google Workspace records are there, and the cutover is three record edits. Straightforward.
- **Nameservers point to Wix** → Wix holds your DNS, *including your Google MX records*. Do not simply switch nameservers back to GoDaddy: that drops MX and email stops instantly. Export every record from Wix first, recreate them all in GoDaddy, verify, and only then switch nameservers.

Do not proceed until you know which of these you are in.

### Step 1 — build and stage

Deploy the new site to Vercel on its preview URL. Test it fully there. Nothing about this touches DNS.

### Step 2 — lower TTL, 24 hours before cutover

Set the TTL on the A and CNAME records for `@` and `www` to 600 seconds. This makes a rollback take ten minutes instead of a day. Leave every other record's TTL alone.

### Step 3 — cut over

In GoDaddy's DNS panel:

| Type | Name | Value | Action |
|---|---|---|---|
| A | `@` | Vercel's apex IP (commonly `76.76.21.21` — **use the exact value shown on your project's Domains page**) | Replace the Wix value |
| CNAME | `www` | Vercel's project-specific target (e.g. `d1d4…vercel-dns-017.com` — again, copy it from the dashboard) | Replace the Wix value |
| TXT | `@` | Wix site-verification string | Delete, once live |

**Do not touch, at any point:**

| Type | Name | Why |
|---|---|---|
| MX | `@` | `smtp.google.com` — this *is* your email |
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` |
| TXT | `google._domainkey` | DKIM signing key |
| TXT | `_dmarc` | DMARC policy |
| CNAME | any Google verification record | Workspace ownership proof |

**Screenshot the full DNS table before you change anything.** That screenshot is your rollback.

### Step 4 — verify, in this order

1. Site loads on both `danmarempire.com` and `www.danmarempire.com`, with a valid certificate.
2. Send a test email **to** a `@danmarempire.com` address from an outside account. It must arrive.
3. Send **from** that address to Gmail and Outlook, and check the headers show SPF pass and DKIM pass.
4. Confirm Google Admin console still shows the domain as verified.

Only after step 4 passes do you cancel the Wix plan. **Keep the Wix subscription running for at least 30 days after cutover** — it is cheap insurance and it is the only complete rollback you have.

### Step 5 — preserve the SEO you have

The old site has twenty indexed URLs. Set 301 redirects for each of them, particularly `/Listings` (note the capital L), `/our-team`, `/about-us`, `/contactus`, and the `copy-of-*` pages that are currently indexed. Submit a new sitemap in Search Console the day of cutover.

---

## 3. The AI search bar — what it actually costs

Nothing, as built. The bar in the prototype parses natural language deterministically in the browser: bedrooms, bathrooms, price and ranges, buy versus lease, city and neighbourhood, property type, and features like ravine lot, pool, finished basement or corporate covenant. It reads the query back in plain English so the user can see it was understood, filters live, and offers refinements when a query returns nothing. No API, no key, no monthly cost, no rate limit, and it works offline.

That handles roughly 90% of real queries. For the messy remainder, a hosted model slots in behind the same function:

- **Google Gemini free tier** — generous limits, more than enough for a brokerage site's volume.
- **Groq free tier** — very fast, good for this shape of task.
- **Cloudflare Workers AI** — a free daily allocation, and it runs at the edge next to the site.

Build the deterministic parser first regardless. A model that has to be called before a user sees results adds latency to every search, and latency on a search box is worse than a slightly narrower vocabulary.

---

## Open items that need your answer

1. **The numbers do not reconcile.** The current site says founded 2016 in one place and "14 years of operation" in another; it claims $500M+ combined on the About page and $750M+ for you personally on your own page. The prototype uses **$750M+ and 2016** throughout. Confirm the correct figures before launch — inconsistent stats are the fastest way to lose a sophisticated buyer, and overstated ones are a RECO advertising problem.
2. **Tenant logos.** Named employers are out of the build for the reasons discussed. If you obtain written consent from those relocation departments, they can go in.
3. **Average executive lease of $14,200.** Placeholder. Give me the real figure or I will remove the claim.
4. **Photography.** The prototype renders generative architectural fields wherever a photograph has not loaded. Real listing photography is the single biggest visual upgrade available and costs nothing but a shoot.
