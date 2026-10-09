# Danmar Empire Real Estate Corp., Brokerage: website

Next.js 15 App Router, TypeScript, Tailwind 3. Deployed on Vercel. `npm run build` must pass before any push.

## Structure

- `src/app/` holds one route per file. Every page is server-rendered and exports `generateMetadata`.
- `src/views/` holds the page bodies. Do not name it `src/pages`, because Next treats that as the Pages Router.
- `src/components/SiteShell.tsx` is the client shell: nav, footer, enquiry and saved drawers, and visit state (saved listings, collection query).
- `src/lib/seo.ts` is the single source of truth for each page's title, description and canonical. Pages read it through `src/lib/metadata.ts`. Never hard-code a title in a route.
- `src/lib/routes.ts` maps page ids (the `seo.ts` keys) to URLs.
- `src/lib/data.ts`, `parse.ts` and `marks.ts` hold content, the brief-bar parser and the Canva marks as data URIs.

## Brand tokens (tailwind.config.js)

- forest `#0F3B2F` (deep `#07241B`, soft `#17513F`)
- cream / paper `#EEE8E0`
- brass `#80642C` (light `#CDB177`). Darkened from `#8A6B2F` on 5 Oct 2026, same hue, so brass labels and figures reach 4.5:1 on cream (4.57:1; the old value was 4.08:1).
- ink `#12261F`
- The opacity scale runs in whole steps from 0 to 100. It is required. Tailwind's default scale only has 5% steps, so classes like `bg-paper/94` or `border-forest/14` silently emit no CSS without it. Never remove it.

## Fonts

- Bodoni Moda (display, figures) and Libre Franklin (text, meta) are self-hosted as `.woff2` in `public/fonts/` and kept in the repo. `src/fonts.css` declares them with `font-display: swap`, plus metric-matched local fallbacks (`Bodoni Moda Fallback` on Georgia, `Libre Franklin Fallback` on Arial) so the swap does not move the layout. The two regular faces are preloaded in `src/app/layout.tsx`; italics load on demand.
- Never swap them for a Google Fonts link or `next/font/google`. The site then falls back to a default serif whenever the CDN is unreachable.
- There are no CDN fonts. The prototype-only `TypeSwitch` alternates were removed on 9 Oct 2026.

## Header

- The site header shows the building emblem at 30px (the seal's building alone, without the ring lettering), beside the wordmark "DANMAR EMPIRE" only, set in Bodoni Moda.
- Use `emblemForest` on cream and `emblemCream` on forest (over the homepage hero, and in the mobile menu). Both come from `src/lib/marks.ts`.
- The full seal (`sealForest`, `sealCream`) appears only at 120px or larger: the Home hero corner and the footer. Below that its lettering cannot resolve.
- The nav takes the ground of the page it is on: forest nav with cream type and the cream emblem on whole-page forest pages (`GROUND` in `src/lib/routes.ts`), cream nav with forest type on cream pages, and transparent over the Home hero. No hairline seam between the nav and the page; a cream band over a forest page reads as a temperature cut.
- Never put the full registered name "Danmar Empire Real Estate Corp., Brokerage" in the header.
- The full registered name stays in the footer on every page. That satisfies the RECO requirement to identify the brokerage by its registered name.
- In code: `<Emblem size={30} light={...} />` plus `<Wordmark registered={false} />` in `src/components/Nav.tsx`. The footer uses `<Wordmark />` with the default `registered` set to true.

## Copy rules

- Canadian spelling (colour, neighbourhood, centre, licence as a noun). No em dashes.
- Nothing negative about other brokers, firms or advisors, anywhere on the site, ever. Say what we know and do, never what others do not. RECO reads disparagement of other registrants badly.
- RECO: no unsubstantiated superlatives ("best", "top", "#1", "leading") and no sold prices without written consent. The track record shows list prices only.
- "UHNW" / "ultra-high-net-worth" goes only in metadata (titles, descriptions) and the few sub-headings where it is literally true. Never use it in brand voice.
- Own listings only. The firm signs the TRREB DLA, deliberately not IDX or VOW. No MLS search and no map, by design.

## Design DNA — Danmar

Merged from four `/taste` analyses (full data in `docs/taste/`). Loam House and Sobha Privy lead: cinematic pacing, a strict column grid, blur-to-sharp type reveals, dark-to-cream transitions. Oryzo contributes motion precision and easing only. Leome & Partners contributes inner-page restraint only; its landing page (a few giant words across an empty field) is too plain and is not a reference. Values are translated into Danmar tokens; source evidence is in brackets.

### Hard rules (override everything below)

- No preloader, splash, intro screen or loading gate. First paint is the page. [Loam, Sobha, Oryzo and Leome all ship one; we do not.]
- No WebGL, no `<canvas>` rendering, no 3D. [Oryzo: WebGL2 plus a canvas preloader gave a 7.1s LCP on a 1440 desktop.]
- No content gated behind animation. Text and images are in the server HTML and readable with JavaScript off. A reveal's hidden start state is applied only by client JavaScript after hydration, and only to content below the first viewport.
- The LCP element (hero heading or hero image) never animates from `opacity: 0`, `blur()` or a clip mask. It may move or scale after it has painted.
- Every route server-renders (RSC or static generation). Client components exist for interaction, never to render content.
- LCP under 2.5s on a 390px device (Lighthouse mobile profile: Moto G Power, slow 4G). Hero images go through `next/image` with `priority`, at most about 200KB at 390 wide. No autoplaying video above the fold at 390; its poster image is the LCP.
- Native scrolling only. No virtual scroller, ScrollSmoother or Lenis. [Sobha's virtual scroller breaks find-in-page, anchor links and screen-reader position.]

### Pacing (Loam, Sobha)

- On narrative pages (home, relocating, asset management) one section is one chapter, `min-height: 100svh` at 1440, composed inside that frame. [Loam: ten 900px chapters, one scroll trigger each.]
- Chapter padding is 160px top and bottom at 1440 and 96px at 390. [Sobha: 180px between groups.]
- Images alternate between full-bleed bands (21:10 or 16:9) and asymmetric groups of portrait frames (4:5, 3:4) offset vertically by 80 to 160px, never an even card grid. [Sobha: 1.85:1 bands, then 0.70 to 0.80 portraits at 360 to 720px.]
- Type sits directly on photography with a forest-deep scrim. No boxed feature tiles. [Loam: 0 shadows, no cards.]

### Grid and hairlines

- 12 columns. Margins 16px at 390, 48px at 1440; gutters 16px and 32px. Max content width 1440px.
- The grid is a layout system, not a drawn element. It governs every position (text blocks start on a column line, rows split title columns 1 to 5 from text columns 7 to 12), but no column lines are drawn. The drawn column grid was removed on 5 Oct 2026 at Daniel's decision.
- Content rules are the only hairlines: 1px row breaks, dividers, table lines and the cell dividers of the spec and numbers strips. Each ground has its own rule colour, because a forest line is invisible on a dark chapter:
  - on cream (`paper`, `paper-deep`): `forest/14`;
  - on dark (`forest`, `forest-deep`): `paper/12`.
  - Control edges (form fields, outlined buttons) are stronger so they meet 3:1: `forest/55` on cream, `paper/45` on dark. [Leome: 1px row rules on a 12-column grid.]
- Body measure is at most 48ch for running text and 60ch for `.meta` footnotes, so no line passes 75 characters.

### Type

- Display is Bodoni Moda at 500 to 600. Never lighter: its hairlines vanish (see Fonts). Hierarchy comes from size and leading, not weight. [Loam and Sobha set display light; Bodoni's contrast does that job here.]
- Display sizes: hero `clamp(2.75rem, 7.5vw, 6.5rem)`, chapter heads `clamp(2.1rem, 4.8vw, 3.75rem)`, leading 0.95 to 1.05, tracking -0.01em to -0.02em at 64px and above.
- Two voices in one headline: a second line in Bodoni Moda italic, `brass-light` on dark grounds and `brass` on cream. At most one italic brass line per chapter, and never on inner-page section titles. Used everywhere it reads as a template. The Home hero and the Ownership band earn it; a practice-page subheading does not. [Loam: gold italic "Bayside living."; Sobha: script crossing the caps line.]
- Body text is Libre Franklin 400, which is the current CSS. Never set running text at 500: it reads heavy on cream and loses the contrast with the labels.
- Labels stay `.meta`: Libre Franklin 500, 10.5px, uppercase, 0.19em tracking. [Loam: DM Sans 600, 10px, 0.16em.]
- Text is at least 14px at 390, with one exception: `.meta` labels stay at 10.5px. They are short uppercase labels with wide tracking, never running text, and the DNA's label size wins over the 14px floor (decided 5 Oct 2026).
- Figures (`.fig`) are Bodoni Moda 500 with lining tabular numerals at opsz 10.

### Colour and temperature (Loam, Sobha)

- Dark-to-cream transitions mark chapter breaks: `forest-deep` #07241B or `forest` #0F3B2F against cream #EEE8E0, full-bleed, hard cut, no gradient between them. A page opens and closes on the same temperature. [Loam: cream, ink, ink, map blue, ink, cream.]
- The footer is chrome, not a chapter. It never counts as a temperature cut on any page, and the opening and closing temperature is judged on the last chapter before it.
- Temperature cuts are the strongest move in the vocabulary, so they are rationed:
  - Home makes exactly two cuts. It opens on forest (the hero), cuts forest to cream, then cream to forest, and its final forest chapter runs into the footer with no seam.
  - Inner pages make none. Each holds one ground and ends on the dark footer, which is not a cut.
- Brass is under 5% of any viewport: italic second lines, eyebrows and figures only. Colour beyond that comes from photography. [Sobha: no accent at all.]
- No shadows. Radius stays at `--radius` (0.125rem); no pills.

### Motion (vocabulary from Loam and Sobha, timing from Oryzo)

- Two clocks, nothing in between. Interface feedback (hover, focus, toggles) takes 180 to 300ms on `cubic-bezier(0.25, 1, 0.5, 1)`. Narrative motion takes 900ms to 1.6s. No durations between 300 and 900ms. [Oryzo: 0.18 to 0.3s and 1s.]
- Blur is for small elements only. `filter: blur()` on a full-bleed image repaints at full resolution every frame and will drop frames on a phone. Blur reveals apply to type, and to images rendered under about 600px wide.
- Full-bleed photography (and any image 600px wide or more) reveals with `opacity` 0 to 1 plus `scale(1.02)` to `scale(1)` over 1.1s on `cubic-bezier(0.16, 1, 0.3, 1)`. Never blur it. Above the fold, the LCP rule still applies.
- Blur-to-sharp reveal (Loam), for headings and small images below the first viewport:
  - rise: `translateY(24px)` to 0 and `opacity` 0 to 1 over 1.1s on `cubic-bezier(0.16, 1, 0.3, 1)` (exponential out);
  - focus: `filter: blur(10px)` to `none` over 1.6s on `cubic-bezier(0.5, 1, 0.89, 1)`, so focus lands after position;
  - stagger 120ms per line or item, capped at 4 steps.
  - At 390 the blur starts at 6px, and no more than 6 elements blur at once.
  - [Loam: blur(8 to 16px) on power1.out at 1.6 to 4.5s, rise on power3.out at 1.4 to 2.6s, stagger 0.12 to 0.15s.]
- Line-mask headings: each line rises from 100% inside an `overflow: hidden` line box over 1.1s on the same exponential-out curve. [Sobha: clip-path line masks; Leome: split-line rises.]
- Chapter and image wipes (temperature changes, image `clip-path` reveals): 1.0s on `cubic-bezier(0.7, 0, 0.3, 1)`, the only symmetric curve on the site. [Sobha: 29 uses of this curve.]
- Follow motion (parallax, the home hero push-in) uses frame-rate-independent damping, `x += (target - x) * (1 - Math.exp(-k * dt))` with k around 8. Parallax travel is at most 8% of the element's height. [Oryzo: `lerp(a, b, 1 - exp(-dt * k))`. Sobha's travel goes up to -300px, which is too much.]
- Animate `transform`, `opacity`, `filter` and `clip-path` only. Never layout properties.
- Under `prefers-reduced-motion: reduce` every reveal resolves instantly and parallax is off. [Loam respects it; Sobha and Oryzo do not.]

### Inner pages (Leome restraint only)

- Firm, people, track record, journal, areas and listing detail drop the cinematic layer. One ground colour per page, no video, one reveal type (line rise, no blur). [Leome: #052824 covers 67 to 71% of every inner page.]
- Lists of practices, services, offices or records are full-width rows: title in columns 1 to 5, text in columns 7 to 12, a 1px rule above each row. 112px section padding at 1440, 72px at 390. [Leome services page.]
- Heading weight stays fixed within a page; only size changes. [Leome: Brockmann 500 at 88, 48 to 64, 24 to 32px.]
- Not inherited from Leome: giant single words scattered across an empty viewport as a hero, a full-screen preloader, or mint-on-green as an accent pairing.

## Listings

The Collection reads the brokerage's own active listings from the PropTx (TRREB) feed through `getListings()` in `src/lib/listings.ts`. Nothing from the feed is stored, AI crawlers are kept off the listing pages, and a listing whose address display flag is off never shows a street. The prototype notice bar and the fictional listings were removed on 9 Oct 2026; `docs/launch-blocking.md` holds what remains before launch.
