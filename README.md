# danmarempire.com

Website for Danmar Empire Real Estate Corp., Brokerage.

React 18 + TypeScript + Vite + Tailwind. Deployed on Vercel.

## Running it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
```

## Notes

- **Fonts are embedded.** Bodoni Moda and Libre Franklin are base64 `@font-face`
  rules in `src/fonts.css` (both SIL Open Font Licence). Do not move them back to
  a Google Fonts link: the site then renders in a fallback serif whenever the CDN
  is unreachable, which is how the design was mis-reviewed for weeks.
- **Marks** live in `src/lib/marks.ts` as base64 SVG data URIs, exported from the
  brand's Canva artwork.
- **Listings are placeholder** until the TRREB/PropTx DLA feed is signed and wired.
  The prototype notice bar says so; remove it only once that is true.
- **Own listings only.** The firm signs the DLA and deliberately not IDX or VOW.
  There is no MLS search or map, by design.
- `src/lib/seo.ts` is the single source of truth for per-page title, description
  and canonical path.
