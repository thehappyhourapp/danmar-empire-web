import type { Metadata } from "next";
import { metaFor } from "./seo";
import type { Meta } from "./seo";
import { OFFICES } from "./data";

export const SITE = "https://danmarempire.com";
const SUFFIX = "Danmar Empire Real Estate Corp., Brokerage";
export const REGISTERED_NAME = SUFFIX;
/** The corporate legal name, where a legal name rather than the RECO advertising name is wanted. */
export const LEGAL_NAME = "Danmar Empire Real Estate Corp.";
export const ORG_ID = `${SITE}/#organization`;

const postal = (addr: string, post: string) => {
  const [locality, rest = ""] = post.split(",");
  const [region, ...code] = rest.trim().split(/\s+/);
  return { "@type": "PostalAddress", streetAddress: addr, addressLocality: locality.trim(), addressRegion: region, postalCode: code.join(" "), addressCountry: "CA" };
};
export const officeAddresses = () => OFFICES.map((o) => postal(o.addr, o.post));

/** The brokerage, once, in the root layout. Other JSON-LD points at it by @id. */
export const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": ORG_ID,
  name: "Danmar Empire",
  legalName: LEGAL_NAME,
  foundingDate: "2016",
  foundingLocation: { "@type": "Place", name: "Oakville, Ontario" },
  url: SITE,
  logo: `${SITE}/marks/seal-cream.svg`,
  telephone: "+1 905 901 5011",
  email: "daniel@danmarempire.com",
  address: officeAddresses(),
  areaServed: { "@type": "AdministrativeArea", name: "Ontario" },
  sameAs: ["https://instagram.com/danmarempire", "https://linkedin.com/company/danmar-empire-group"],
};

const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "Danmar Empire" };

/** Next metadata from an entry in src/lib/seo.ts, the single source of truth. */
export function toMetadata(m: Meta): Metadata {
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: m.canonical },
    ...(m.noindex ? { robots: { index: false, follow: false } } : {}),
    // A page-level openGraph object replaces the parent's, file-based image
    // included, so the default share image is named here for every route.
    openGraph: { title: m.title, description: m.description, url: m.canonical, siteName: SUFFIX, locale: "en_CA", type: "website", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", images: [OG_IMAGE.url] },
  };
}

export const pageMetadata = (page: string) => toMetadata(metaFor(page));

/** Detail pages have no entry of their own in seo.ts; they inherit the parent
 *  route's entry and replace only what is specific to the record. */
export function detailMetadata(parent: string, name: string, description: string, canonical: string): Metadata {
  return toMetadata({ ...metaFor(parent), title: `${name} | ${SUFFIX}`, description, canonical });
}
