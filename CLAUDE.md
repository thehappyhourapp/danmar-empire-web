# Danmar Empire Real Estate Corp., Brokerage: website

Next.js 15 App Router, TypeScript, Tailwind 3. Deployed on Vercel. `npm run build` must pass before any push.

## Structure

- `src/app/` holds one route per file. Every page is server-rendered and exports `generateMetadata`.
- `src/views/` holds the page bodies. Do not name it `src/pages`, because Next treats that as the Pages Router.
- `src/components/SiteShell.tsx` is the client shell: prototype notice bar, nav, footer, enquiry and saved drawers, and visit state (saved listings, collection query).
- `src/lib/seo.ts` is the single source of truth for each page's title, description and canonical. Pages read it through `src/lib/metadata.ts`. Never hard-code a title in a route.
- `src/lib/routes.ts` maps page ids (the `seo.ts` keys) to URLs.
- `src/lib/data.ts`, `parse.ts` and `marks.ts` hold content, the brief-bar parser and the Canva marks as data URIs.

## Brand tokens (tailwind.config.js)

- forest `#0F3B2F` (deep `#07241B`, soft `#17513F`)
- cream / paper `#EEE8E0`
- brass `#8A6B2F` (light `#CDB177`)
- ink `#12261F`
- The opacity scale runs in whole steps from 0 to 100. It is required. Tailwind's default scale only has 5% steps, so classes like `bg-paper/94` or `border-forest/14` silently emit no CSS without it. Never remove it.

## Fonts

- Bodoni Moda (display, figures) and Libre Franklin (text, meta) are embedded as base64 `@font-face` in `src/fonts.css`.
- Keep them embedded. Never swap them for a Google Fonts link or `next/font/google`. The site then falls back to a default serif whenever the CDN is unreachable.
- The only CDN fonts are the prototype-only alternates in `TypeSwitch`.

## Copy rules

- Canadian spelling (colour, neighbourhood, centre, licence as a noun). No em dashes.
- RECO: no unsubstantiated superlatives ("best", "top", "#1", "leading") and no sold prices without written consent. The track record shows list prices only.
- "UHNW" / "ultra-high-net-worth" goes only in metadata (titles, descriptions) and the few sub-headings where it is literally true. Never use it in brand voice.
- Own listings only. The firm signs the TRREB DLA, deliberately not IDX or VOW. No MLS search and no map, by design.

## Prototype

Listings and figures are placeholder until the PropTx feed is wired and signed off. The prototype notice bar stays until then.
