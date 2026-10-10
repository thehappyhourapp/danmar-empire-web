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

/* The practice pages' illustrative scenes. Alt text describes the scene and never
   suggests a property or client of the brokerage. */
const PRACTICE_ALT: Record<string, string> = {
  "investments": "Illustrative: a suburban retail plaza with anchor stores, smaller units and landscaped parking",
  "asset-management": "Illustrative: an elevated view of a brick apartment building and an office building on a tree-lined block",
  "asset-management-2": "Illustrative: rental apartment buildings around a landscaped courtyard",
  "executive-leasing": "Illustrative: a furnished kitchen and dining room opening onto a garden",
  "executive-leasing-2": "Illustrative: a furnished living room with a fireplace",
  "property-management": "Illustrative: a maintained building entrance with a landscaped forecourt",
  "property-management-2": "Illustrative: rental apartment buildings around a landscaped courtyard",
  "corporate-real-estate-capital": "Illustrative: a warehouse with loading docks, a truck court and an office entrance",
  "corporate-real-estate-capital-2": "Illustrative: an office and industrial building at dusk",
  "relocating": "Illustrative: a waterfront path beside a residential neighbourhood",
};

export interface FrameImage { src: string; srcSet: string; alt: string }
/** A practice scene for a frame: the 800w file as src, both widths in srcSet. */
export function practiceImage(key: string): FrameImage | undefined {
  const big = photo(`/photos/practices/${key}.jpg`);
  const small = photo(`/photos/practices/${key}-800.jpg`);
  if (!big && !small) return undefined;
  return { src: (small ?? big)!, srcSet: [small && `${small} 800w`, big && `${big} 1536w`].filter(Boolean).join(", "), alt: PRACTICE_ALT[key] ?? "" };
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
