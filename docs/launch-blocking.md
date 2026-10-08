# Launch-blocking

Nothing on this list may be live on danmarempire.com at launch. Remove an item only when it is resolved, and say how.

## Form backend

Set `RESEND_API_KEY` and `RESEND_FROM` in Vercel (every environment), and verify a sending subdomain in Resend after the Cloudflare move. Until the key is set, `/api/enquire` answers 503 and both forms show the desk address as text.

## "$1B+ transacted"

Needs substantiation before publication: the methodology behind the aggregate list value of transactions since 2016. The site says "Methodology on request"; that request has to be answerable.

## Analytics provider

The site has no analytics. The named events (capital review clicks, estimator use, form submissions, FAQ opens) call `track()` in `src/lib/analytics.ts`, which is a no-op. Choose a provider, wire it there and nowhere else, and keep personal data out of event payloads.

## Redirects and host

The previous site's twenty-odd indexed URLs are redirected permanently in `next.config.ts` (`redirects()`, 308). Two things are not code:

- **Trailing slashes.** Next handles them itself: `/firm/` answers 308 to `/firm`. Nothing to do.
- **The www host.** Whether `www.danmarempire.com` redirects to the apex or the apex to www is a Vercel domain setting, not something in this repository. Set one as the canonical host in Vercel and let the other redirect (308) before launch, and make sure the Cloudflare DNS records point both at Vercel.

## The listing feed

The Collection reads the brokerage's active listings from the PropTx (TRREB) RESO Web API; there are no hand-written listings left in the repository. Before launch:

- Paste `PROPTX_TOKEN` (and `PROPTX_OFFICE_KEY`) into Vercel for every environment; without them the Collection shows its empty state.
- Run `docs/LIVE-CHECK.md` in a browser: the count, the addresses, the photographs, a withheld address, the revalidate route.
- Set `REVALIDATE_SECRET` in Vercel and keep it out of the repository.
- Confirm with PropTx the read cadence (at most hourly, on demand) against the agreement's 24-hour replication clause, and the attribution wording; both are in `docs/CONFIRM.md`.

## Placeholder content

- Track record entries need the parties' written consent before publication.
- The prototype notice bar stays until the feed is checked live and the track record is consented.
