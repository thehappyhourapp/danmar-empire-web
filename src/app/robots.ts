import type { MetadataRoute } from "next";
import { SITE } from "@/lib/metadata";

/* Every crawler is welcome on the firm's own pages. The licence for the listing
   feed forbids providing its data to AI systems, so the AI crawlers are named and
   kept off /collection and the listing pages, and allowed everywhere else. */
const AI_CRAWLERS = ["GPTBot", "ClaudeBot", "Claude-Web", "anthropic-ai", "PerplexityBot", "Google-Extended", "CCBot", "Bytespider", "Applebot-Extended", "OAI-SearchBot", "ChatGPT-User"];
const LISTINGS = ["/collection", "/collection/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/", ...LISTINGS] })),
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
