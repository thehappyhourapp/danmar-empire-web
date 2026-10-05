import type { MetadataRoute } from "next";
import { SITE } from "@/lib/metadata";

/* Every crawler is welcome, AI crawlers included and named, so that a later
   blanket rule elsewhere cannot quietly shut them out. */
const NAMED = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      ...NAMED.map((userAgent) => ({ userAgent, allow: "/", disallow: "/api/" })),
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
