import type { MetadataRoute } from "next";
import { TEAM } from "@/lib/data";
import { getListings } from "@/lib/listings";
import { SITE } from "@/lib/metadata";
import { ROUTES, personHref, propertyHref } from "@/lib/routes";

/* Every static route except the unpublished journal, every active listing from the
   feed and every person page. Off-market listings have no page, so they have no
   entry here either. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const listings = await getListings();
  const paths = [
    ...Object.entries(ROUTES).filter(([id]) => id !== "journal").map(([, p]) => p),
    ...listings.filter((l) => l.tier !== "Off-Market").map((l) => propertyHref(l.id)),
    ...TEAM.map((p) => personHref(p.slug)),
  ];
  return paths.map((p) => ({ url: p === "/" ? SITE : `${SITE}${p}`, lastModified: now }));
}
