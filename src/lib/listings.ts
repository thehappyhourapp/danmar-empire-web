import { fetchActiveListings, fetchListing } from "./proptx";
import type { Listing } from "./data";
import { collectionOrder } from "./listing-format";

/* The one place the pages read listings from. Feed results when the feed returns
   at least one record, otherwise an empty list and the pages' empty state. There
   is no fallback data: a fake row is worse than an honest empty row. */

export async function getListings(): Promise<Listing[]> {
  const feed = await fetchActiveListings();
  // leases from $8,000 a month, then sales, then smaller leases (listing-format.ts)
  return collectionOrder(feed);
}

export const getListing = (slug: string) => fetchListing(slug);

/** Photographs are served through /api/photo so an unexpected CDN host or a signed
 *  URL never breaks a page; local files pass straight through. Safe on the client. */
export const photoSrc = (url: string) => (!url || url.startsWith("/") ? url : `/api/photo?u=${encodeURIComponent(url)}`);
