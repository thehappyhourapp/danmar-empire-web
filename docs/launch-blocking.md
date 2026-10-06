# Launch-blocking

Nothing on this list may be live on danmarempire.com at launch. Remove an item only when it is resolved, and say how.

## Form backend

Set `RESEND_API_KEY` and `RESEND_FROM` in Vercel (every environment), and verify a sending subdomain in Resend after the Cloudflare move. Until the key is set, `/api/enquire` answers 503 and both forms show the desk address as text.

## "$1B+ transacted"

Needs substantiation before publication: the methodology behind the aggregate list value of transactions since 2016. The site says "Methodology on request"; that request has to be answerable.

## Analytics provider

The site has no analytics. The named events (capital review clicks, estimator use, form submissions, FAQ opens) call `track()` in `src/lib/analytics.ts`, which is a no-op. Choose a provider, wire it there and nowhere else, and keep personal data out of event payloads.

## Placeholder content

- All 16 listings and their figures are placeholder until the PropTx DLA feed is wired and signed off.
- Track record entries need the parties' written consent before publication.
- Listing photography: `/public/photos/{listing-id}.jpg`, none present yet.
- The prototype notice bar stays until all of the above is true.
