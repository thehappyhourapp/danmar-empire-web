import fs from "node:fs";
import path from "node:path";
import { LISTINGS } from "./data";

/* Photography lives under /public/photos. Until a file exists its frame stays the
   flat placeholder block, and no request is made for it. Checked at build time:
   every page that shows a photograph is statically generated. Server only. */

export function photo(rel: string): string | undefined {
  return fs.existsSync(path.join(process.cwd(), "public", rel)) ? rel : undefined;
}

export const listingPhoto = (id: string) => photo(`/photos/${id}.jpg`);

/** For client lists that cannot reach the filesystem: id -> path, present files only. */
export function listingPhotos(): Record<string, string> {
  return Object.fromEntries(LISTINGS.flatMap((l) => {
    const p = listingPhoto(l.id);
    return p ? [[l.id, p]] : [];
  }));
}
