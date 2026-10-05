# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **High-net-worth families buying or selling privately**, freehold and estate residential from $1.5M, in Oakville, King City and Toronto. They want a firm's judgement on a single decision, not a search portal.
- **Relocating executives and principals** arriving from the United Kingdom, South Africa, the United States, Hong Kong and Singapore, Western Europe and the Gulf. They need the areas, leasing, lenders, schools and carrying costs answered before they commit, usually from abroad.
- **Family offices, private holding companies and their advisors** placing real estate portfolios of $10M to $250M on a discretionary or advisory mandate, domestic and international.
- **Corporate and diplomatic relocation departments, and the landlords on the other side**, for executive leases from $10,000 a month placed against a verified covenant.

## Product Purpose

The website of Danmar Empire Real Estate Corp., Brokerage: a boutique, lawyer-led investment and real estate group, family-owned since 2016. It exists to establish the firm's judgement and track record well enough that the right visitor starts a private conversation. Every route invites an enquiry; none is built to capture leads.

Success is measured as qualified private enquiries started from the site: contact form submissions and tracked telephone and email clicks, counted monthly by source page. Secondary measure: the pages for the four practices (asset management, investment, private sales, executive leasing) cited in AI answers for their target queries. Traffic and time on page are not success measures.

## Positioning

- **Lawyer-led.** The managing partner is called to the bar in Ontario and admitted in New York and Minnesota. He acts for clients as a broker, never as their solicitor.
- **The firm owns property in the markets it advises on.** It holds residential, multi-residential, commercial and land in those markets on its own account. "An opinion is worth roughly what the person giving it has at risk."
- **Proof by property, not by total.** The track record publishes the houses with list prices, with consent, where competitors publish only a dollar figure.
- **Own listings only.** The firm signs the TRREB Data License Agreement (DLA), deliberately not IDX or VOW. There is no MLS search and no map, by design: the curated book is the product. This supersedes the IDX and map recommendation in `danmar-launch-plan.md`.
- **Four practices, one standard of diligence:** asset and portfolio management, investment, private sales, executive leasing.

## Operating Context

- Offices in Oakville and Vaughan. Core markets are Oakville first, then King City and Toronto, with a licence that covers all of Ontario.
- Registered with the Real Estate Council of Ontario (RECO). Listings are pending the PropTx DLA feed and Broker of Record sign-off.
- Relocation runs as a sequence: orientation, a lease first, then banking and counsel, then the purchase.
- Two related law practices (Khan Law PC, Daniel & Co. Law PC) sit alongside the brokerage. The principal's interest in both is disclosed, and instructing either is never a condition of a transaction.
- Enquiry is a drawer that invites a conversation; the office telephone is the urgent route.

## Capabilities and Constraints

- **Stack:** Next.js 15 App Router, TypeScript, Tailwind 3, deployed on Vercel. Every route server-renders; per-page SEO comes from `src/lib/seo.ts`.
- **Routes:** home, asset management, investments, executive leasing, the collection and listing detail, relocating, track record, the firm and person profiles, journal, areas.
- **RECO:** no unsubstantiated superlatives; no sold prices without the parties' written consent. The track record shows list prices only. The registered name "Danmar Empire Real Estate Corp., Brokerage" appears in the footer on every page and never in the header.
- **Disclaimers:** the firm does not provide legal services. Asset management is advisory and administrative, not an offer of securities or fund interests. CREA trademark attribution for MLS® and REALTOR® is required wherever the marks appear.
- **Language:** "UHNW" and "ultra-high-net-worth" appear in metadata only, never in brand voice. Canadian spelling, no em dashes in copy.
- **Performance:** no preloader, no WebGL, no content gated behind animation, LCP under 2.5s on a 390px device. The full rules are in CLAUDE.md, under Design DNA, Hard rules.

## Brand Commitments

Binding, as given by the owner. The full visual specification lives in **CLAUDE.md, "Design DNA — Danmar"**, which governs where it is more specific than anything here.

- **Name:** Danmar Empire Real Estate Corp., Brokerage. The header shows the building emblem and "DANMAR EMPIRE" only; the full seal appears only at 120px or larger.
- **Tone:** assured, quiet, specific. Never salesy.
- **Palette:**
  - forest #0F3B2F is primary;
  - cream #EEE8E0;
  - ink #12261F;
  - brass #80642C (darkened from #8A6B2F for 4.5:1 on cream), for labels, figures and at most one italic line per chapter only, never as fill;
  - hairlines are forest on cream (content rules at 14%, drawn column grid at 6%) and paper on dark grounds (content rules at 12%, drawn column grid at 5%).
- **Type:**
  - Bodoni Moda for display, with optical size set manually (opsz 16 for display, 10 for figures, never auto);
  - Libre Franklin 400 for body text, and Libre Franklin 500 for `.meta` labels. 500 for running text reads heavy on cream and loses the contrast with the labels;
  - figures (`.fig`) in Bodoni Moda 500;
  - meta labels in uppercase tracked at 0.19em;
  - no monospace anywhere;
  - both faces stay embedded in `src/fonts.css`.
- **Spacing:** generous and editorial.
- **Motion:** restrained. Transform and opacity, plus filter and clip-path only within the Design DNA's limits (blur only on type and images under about 600px wide). Never layout properties. Respects `prefers-reduced-motion`.
- **Avoid:** generic real-estate-portal patterns, card grids with icon rows, gradients, glassmorphism.

## Evidence on Hand

- **Real:**
  - firm history and positioning copy, practice descriptions, relocation questions, the ownership argument, office addresses and telephone numbers (all in `src/lib/data.ts`);
  - seven team profiles;
  - the seal, wreath and lockup marks, exported from Canva (`src/lib/marks.ts`);
  - the related-practice disclosures.
- **Placeholder, must not ship as fact:**
  - all 16 listings and their figures (pending the PropTx feed and sign-off);
  - track record entries (pending written consent);
  - listing photography (Unsplash stand-ins);
  - journal articles (titles and summaries only).
- **Claimed, needs substantiation before publication:** "$1B+ transacted since 2016". The site states "methodology on request".
- **Absent, do not fabricate:** testimonials, client names, press coverage, awards, rankings.

## Product Principles

1. **Judgement over inventory.** Show what the firm thinks and has done, never a list of everything on the board.
2. **Discretion is the service.** Describe the covenant, never the client; off-market stays off the site.
3. **Every claim is checkable or absent.** A figure carries its basis or does not appear.
4. **Invite, never capture.** Each route ends in a conversation the visitor chooses to start.
5. **The site is as fast and legible as the advice is clear.** Nothing waits on an animation.

## Accessibility & Inclusion

- `prefers-reduced-motion` is honoured everywhere: reveals resolve instantly and parallax is off.
- Content is readable with JavaScript off.
