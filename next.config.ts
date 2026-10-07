import type { NextConfig } from "next";

/* The previous site's URLs, permanently redirected to the routes that replaced
   them. Next answers 308 for a permanent redirect, which search engines treat
   as a 301. Sources are matched case-sensitively, so "/Listings" is listed as
   it was indexed. Trailing slashes are handled by Next itself ("/firm/" answers
   308 to "/firm"). The www host is a domain setting, not code: see
   docs/launch-blocking.md. */
const LEGACY: [string, string][] = [
  ["/about-us", "/firm"],
  ["/our-team", "/firm"],
  ["/testimonials", "/firm"],
  ["/daniel-sheikhan", "/firm/daniel-sheikhan"],
  ["/contactus", "/contact"],
  ["/copy-of-our-locations", "/contact"],
  ["/copy-of-send-us-a-message", "/contact"],
  ["/Listings", "/collection"],
  ["/properties", "/collection"],
  ["/properties-1", "/collection"],
  ["/mls-listings", "/collection"],
  ["/lease", "/executive-leasing"],
  ["/commercial", "/investments"],
  ["/copy-of-commercial", "/investments"],
  ["/development-corp", "/investments"],
  ["/marketing", "/contact"],
  ["/copy-of-home", "/"],
  ["/53-woodstream", "/track-record"],
  ["/2800keelest", "/collection"],
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return LEGACY.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
