import type { Metadata } from "next";
import { metaFor } from "./seo";
import type { Meta } from "./seo";

export const SITE = "https://danmarempire.com";
const SUFFIX = "Danmar Empire Real Estate Corp., Brokerage";

/** Next metadata from an entry in src/lib/seo.ts, the single source of truth. */
export function toMetadata(m: Meta): Metadata {
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: m.canonical },
    openGraph: { title: m.title, description: m.description, url: m.canonical, siteName: SUFFIX, locale: "en_CA", type: "website" },
  };
}

export const pageMetadata = (page: string) => toMetadata(metaFor(page));

/** Detail pages have no entry of their own in seo.ts; they inherit the parent
 *  route's entry and replace only what is specific to the record. */
export function detailMetadata(parent: string, name: string, description: string, canonical: string): Metadata {
  return toMetadata({ ...metaFor(parent), title: `${name} | ${SUFFIX}`, description, canonical });
}
