import type { MetadataRoute } from "next";
import { LISTINGS, TEAM } from "@/lib/data";
import { SITE } from "@/lib/metadata";
import { ROUTES, personHref, propertyHref } from "@/lib/routes";

/* Every static route, every listing page and every person page. Off-market
   listings have no page, so they have no entry here either. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    ...Object.values(ROUTES),
    ...LISTINGS.filter((l) => l.tier !== "Off-Market").map((l) => propertyHref(l.id)),
    ...TEAM.map((p) => personHref(p.slug)),
  ];
  return paths.map((p) => ({ url: p === "/" ? SITE : `${SITE}${p}`, lastModified: now }));
}
