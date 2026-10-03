/* Page id -> URL. The ids are the keys used by src/lib/seo.ts and by NAV, so the
   two maps stay in step: one id, one route, one SEO entry. */
export const ROUTES: Record<string, string> = {
  home: "/",
  management: "/asset-management",
  investments: "/investments",
  leasing: "/executive-leasing",
  collection: "/collection",
  relocating: "/relocating",
  track: "/track-record",
  firm: "/firm",
  journal: "/journal",
  areas: "/areas",
};

export const href = (id: string) => ROUTES[id] ?? "/";
export const propertyHref = (id: string) => `/collection/${id}`;
export const personHref = (slug: string) => `/firm/${slug}`;

/** Which page id a pathname belongs to, for the active state in the nav. */
export function pageFor(pathname: string): string {
  if (pathname === "/") return "home";
  const top = "/" + (pathname.split("/")[1] ?? "");
  return Object.keys(ROUTES).find((k) => ROUTES[k] === top) ?? "";
}
