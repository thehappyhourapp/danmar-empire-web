import type { MetadataRoute } from "next";
import { TEAM } from "@/lib/data";
import { getListings } from "@/lib/listings";
import { SITE } from "@/lib/metadata";
import { SEO } from "@/lib/seo";
import { ROUTES, personHref, propertyHref } from "@/lib/routes";

/* Every indexable static route (the journal and the track record are noindex until
   they have entries), every active listing from the
   feed and every person page. Off-market listings have no page, so they have no
   entry here either. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const listings = await getListings();
  const paths = [
    ...Object.entries(ROUTES).filter(([id]) => !SEO[id]?.noindex).map(([, p]) => p),
    ...listings.filter((l) => l.tier !== "Off-Market").map((l) => propertyHref(l.id)),
    ...TEAM.map((p) => personHref(p.slug)),
  ];
  return paths.map((p) => ({ url: p === "/" ? SITE : `${SITE}${p}`, lastModified: now }));
}
