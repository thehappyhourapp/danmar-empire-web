# Launch-blocking

Nothing on this list may be live on danmarempire.com at launch. Remove an item only when it is resolved, and say how. Everything else that was on this list was resolved by 9 Oct 2026: the prototype chrome is gone, the fictional listings and journal entries are gone, the $1B+ basis is the principals' careers, and Daniel's confirmed facts are applied (docs/briefs/launch-pass.md).

## 1. Form backend: the Resend key

Set `RESEND_API_KEY` and `RESEND_FROM` in Vercel (every environment), and verify a sending subdomain in Resend after the Cloudflare move. Until the key is set, `/api/enquire` answers 503 and both forms show the desk address as text.

## 2. The listing feed: the live check

The Collection reads the brokerage's active listings from the PropTx (TRREB) feed. Nothing has been read from the live feed yet.

- In Vercel, for every environment: `PROPTX_TOKEN` = the bearer token (the long value with two dots), `PROPTX_OFFICE_KEY` = `249200`. The code reads the token from `PROPTX_TOKEN` only; on 9 Oct 2026 the token was found in `PROPTX_OFFICE_KEY` with `PROPTX_TOKEN` still `X`, which is why production showed the empty state. Redeploy after saving, since a build made before the variables were saved does not see them.
- Set `REVALIDATE_SECRET` in Vercel.
- Run `docs/LIVE-CHECK.md` in a browser: the count, the addresses, the photographs, a withheld address, the revalidate route. A withheld listing showing a street is fixed before anything else.
- Confirm with PropTx the read cadence (hourly, on demand) against the agreement's 24-hour replication clause, and the attribution wording (docs/CONFIRM.md).

## 3. Vercel: the framework switch

The Vercel project's framework setting has to be switched for the production deploy (Daniel's item; nothing in this repository changes for it). Do not change other Vercel settings from here.

## 4. DNS and the host

Point the Cloudflare DNS records for the apex and `www` at Vercel, and set one of them as the canonical host in Vercel so the other redirects (308). The previous site's indexed URLs are already redirected in `next.config.ts`.

## Noted, not blocking

- `info@danmarempire.com` does not exist yet; the site shows `daniel@danmarempire.com` everywhere. When the mailbox exists, the address lives in `src/components/Footer.tsx`, `src/views/Contact.tsx`, `src/lib/metadata.ts` and `public/llms.txt`. `deals@` is accounting and is never shown.
- Analytics: the named events call `track()` in `src/lib/analytics.ts`, which is a no-op until a provider is chosen. Keep personal data out of event payloads.
- The open items in `docs/CONFIRM.md` (the platform header in the software screens, the Oakville office photograph, the privacy retention line, the capital page's omitted figures).
