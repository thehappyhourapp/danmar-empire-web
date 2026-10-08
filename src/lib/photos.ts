import fs from "node:fs";
import path from "node:path";
import type { Listing } from "./data";
import { photoSrc } from "./listings";

/* Photography lives under /public/photos. A local file wins (off-market or edited
   photography); otherwise a listing's first feed photograph is used, through the
   /api/photo proxy. Checked at build time: every page that shows a photograph is
   statically generated. Server only. */

export function photo(rel: string): string | undefined {
  return fs.existsSync(path.join(process.cwd(), "public", rel)) ? rel : undefined;
}

/** The listing's hero: the local file if there is one, else the feed photograph. */
export const listingPhoto = (id: string, feed = "") => photo(`/photos/${id}.jpg`) ?? (feed ? photoSrc(feed) : undefined);

/** For client lists that cannot reach the filesystem: id -> src, where one exists. */
export function listingPhotos(listings: Listing[]): Record<string, string> {
  return Object.fromEntries(listings.flatMap((l) => {
    const p = listingPhoto(l.id, l.photo);
    return p ? [[l.id, p]] : [];
  }));
}
