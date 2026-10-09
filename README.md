# danmarempire.com

Website for Danmar Empire Real Estate Corp., Brokerage.

Next.js 15 (App Router) + TypeScript + Tailwind. Deployed on Vercel. See CLAUDE.md for brand and copy rules.

## Running it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build
npm start        # serve the production build
```

## Notes

- **Fonts are embedded.** Bodoni Moda and Libre Franklin are base64 `@font-face`
  rules in `src/fonts.css` (both SIL Open Font Licence). Do not move them back to
  a Google Fonts link: the site then renders in a fallback serif whenever the CDN
  is unreachable, which is how the design was mis-reviewed for weeks.
- **Marks** live in `src/lib/marks.ts` as base64 SVG data URIs, exported from the
  brand's Canva artwork.
- **Listings come from the TRREB/PropTx DLA feed** (`src/lib/proptx.ts`); nothing from
  it is stored. Without a token the Collection shows its empty state; `PROPTX_FIXTURE=1`
  builds against the invented fixture outside production.
- **Own listings only.** The firm signs the DLA and deliberately not IDX or VOW.
  There is no MLS search or map, by design.
- `src/lib/seo.ts` is the single source of truth for per-page title, description
  and canonical path.

## Environment

Both forms (the enquire drawer and the client access request) post to `/api/enquire`, which sends
mail to the desk through [Resend](https://resend.com). Two variables, set in Vercel for every
environment and in `.env.local` for local work (see `.env.example`):

- `RESEND_API_KEY`: the Resend API key.
- `RESEND_FROM`: the verified sender, for example `Danmar Empire <desk@mail.danmarempire.com>`,
  on a domain or subdomain verified in Resend.

Without them the route answers 503 and the forms show the desk address as selectable text.
