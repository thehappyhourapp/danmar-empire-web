import type { Listing } from "./data";

/* Formatting and ordering for listing rows, shared by Home, the Collection and
   the detail page. Pure functions; the tests in listing-format.test.ts pin them. */

/** Leases at or above this monthly rent come first in the Collection. */
export const LEASE_FIRST_MIN = 8000;

/** Three bands: leases from LEASE_FIRST_MIN a month, highest first; every sale,
 *  highest first; the remaining leases, highest first. Home's featured strip is
 *  the first three of this order. */
export function collectionOrder<T extends Pick<Listing, "intent" | "price">>(list: T[]): T[] {
  const band = (l: T) => (l.intent === "lease" ? (l.price >= LEASE_FIRST_MIN ? 0 : 2) : 1);
  return [...list].sort((a, b) => band(a) - band(b) || b.price - a.price);
}

/** "1021 - WP Winston Park" -> "Winston Park": drops a leading TRREB community code
 *  and its dash, then a leading two- or three-letter capitals abbreviation when at
 *  least one further word follows. A capitals word that is the whole name, or is
 *  longer than three letters, stays. */
export function cleanCommunity(raw?: string): string {
  let s = (raw || "").replace(/\s+/g, " ").trim();
  s = s.replace(/^[A-Z]?\d+[A-Z]?\s*-\s*/i, "");
  s = s.replace(/^[A-Z]{2,3}\s+(?=\S)/, "");
  return s.trim();
}

const PROVINCES: Record<string, string> = { ON: "Ontario", ONTARIO: "Ontario" };
/** "Oakville, Ontario". */
export const cityLine = (l: Pick<Listing, "city" | "province">) =>
  [l.city, PROVINCES[(l.province || "ON").toUpperCase()] ?? l.province].filter(Boolean).join(", ");

const n = (v: number) => v.toLocaleString("en-CA");
/** The one specification line on a card. Residential: beds, baths, square feet.
 *  Commercial and land: square feet or acreage, and the property type. Empty and
 *  zero values are left out. */
export function specLine(l: Pick<Listing, "useClass" | "kind" | "beds" | "baths" | "sqft" | "acres">): string {
  if (l.useClass === "residential") {
    return [
      l.beds && l.beds > 0 ? `${l.beds} bed` : "",
      l.baths && l.baths > 0 ? `${l.baths} bath` : "",
      l.sqft && l.sqft > 0 ? `${n(l.sqft)} sq ft` : "",
    ].filter(Boolean).join(" · ");
  }
  const size = l.sqft && l.sqft > 0 ? `${n(l.sqft)} sq ft` : l.acres ? `${l.acres} acres` : "";
  return [size, l.kind].filter(Boolean).join(" · ");
}

/** Width and height from a JPEG's header (its first frame marker), with the EXIF
 *  orientation applied; undefined if the bytes do not reach the frame marker. */
export function jpegSize(buf: Uint8Array): { width: number; height: number } | undefined {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return undefined;
  let rotated = false;
  let i = 2;
  while (i + 4 <= buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
    const len = (buf[i + 2] << 8) | buf[i + 3];
    if (marker === 0xe1 && i + 10 < buf.length && String.fromCharCode(...buf.slice(i + 4, i + 8)) === "Exif") {
      const o = exifOrientation(buf.subarray(i + 10, Math.min(buf.length, i + 2 + len)));
      rotated = o !== undefined && o >= 5 && o <= 8;
    }
    const sof = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (sof) {
      if (i + 9 > buf.length) return undefined;
      const height = (buf[i + 5] << 8) | buf[i + 6];
      const width = (buf[i + 7] << 8) | buf[i + 8];
      return rotated ? { width: height, height: width } : { width, height };
    }
    i += 2 + len;
  }
  return undefined;
}

function exifOrientation(t: Uint8Array): number | undefined {
  if (t.length < 8) return undefined;
  const le = t[0] === 0x49;
  const u16 = (o: number) => (le ? t[o] | (t[o + 1] << 8) : (t[o] << 8) | t[o + 1]);
  const u32 = (o: number) => (le ? (t[o] | (t[o + 1] << 8) | (t[o + 2] << 16) | (t[o + 3] << 24)) >>> 0 : ((t[o] << 24) | (t[o + 1] << 16) | (t[o + 2] << 8) | t[o + 3]) >>> 0);
  const ifd = u32(4);
  if (ifd + 2 > t.length) return undefined;
  const count = u16(ifd);
  for (let k = 0; k < count; k++) {
    const e = ifd + 2 + k * 12;
    if (e + 10 > t.length) return undefined;
    if (u16(e) === 0x0112) return u16(e + 8);
  }
  return undefined;
}

/** Portrait when clearly taller than wide; square and unknown count as landscape. */
export const isPortrait = (d?: { width: number; height: number }) => !!d && d.height > d.width * 1.05;
