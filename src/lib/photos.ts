import type { Listing } from "./data";
import { photoSrc } from "./listings";
import manifest from "./photo-manifest.json";

/* Photography lives under /public/photos. Whether a frame shows a photograph is
   decided by src/lib/photo-manifest.json, written at build time by
   scripts/photo-manifest.mjs (the npm prebuild step), never by reading the
   filesystem: a page regenerated in a Vercel function has no public/ folder to
   look in. A local file wins over a listing's feed photograph, which goes
   through the /api/photo proxy. */

const PHOTOS: ReadonlySet<string> = new Set(manifest as string[]);

export function photo(rel: string): string | undefined {
  return PHOTOS.has(rel) ? rel : undefined;
}

/** The listing's hero: the local file if there is one, else the feed photograph. */
export const listingPhoto = (id: string, feed = "") => photo(`/photos/${id}.jpg`) ?? (feed ? photoSrc(feed) : undefined);

/** For client lists: id -> src, where one exists. */
export function listingPhotos(listings: Listing[]): Record<string, string> {
  return Object.fromEntries(listings.flatMap((l) => {
    const p = listingPhoto(l.id, l.photo);
    return p ? [[l.id, p]] : [];
  }));
}
