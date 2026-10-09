/* The PropTx (TRREB) RESO Web API, read for the brokerage's own active listings
   and mapped to the Listing shape the pages use. Server only.

   The Data License Agreement shapes this file:
   - no store: nothing from the feed is written anywhere; fetch() with revalidate
     3600 and the "proptx" tag is the only cache, and it expires on its own;
   - InternetEntireListingDisplayYN false drops a listing; InternetAddressDisplayYN
     false strips the street from the slug, the page and the JSON-LD;
   - reads happen at most once an hour per query through ISR, and on demand through
     /api/revalidate;
   - with PROPTX_TOKEN unset or "X" the feed is off and every page shows its empty
     state. PROPTX_FIXTURE=1 (never in production) renders the invented records in
     __fixtures__/proptx.ts so the pages can be built and tested without the API.
   Field names follow the RESO Data Dictionary as AMPRE publishes it; the ones that
   could not be confirmed against $metadata this pass are listed in docs/CONFIRM.md. */

import type { Listing } from "./data";

export const BASE = "https://query.ampre.ca/odata/";
export const REVALIDATE = 3600;
export const TAG = "proptx";

/** The fields read from Property. Nothing else is requested. Every name here must
 *  exist in AMPRE's $metadata: one unknown field fails the whole query with a 400
 *  ("The property 'X' ... is not defined in type 'Property'"), and the Collection
 *  goes empty. Community, OwnershipType and CapRate are RESO names that this
 *  schema does not carry (checked 9 Oct 2026); tenure comes from PropertyType. */
export const PROPERTY_SELECT = [
  "ListingKey", "ListingId", "ModificationTimestamp", "StandardStatus", "MlsStatus", "ContractStatus",
  "ListOfficeKey", "ListOfficeName",
  "InternetEntireListingDisplayYN", "InternetAddressDisplayYN",
  "UnparsedAddress", "StreetNumber", "StreetName", "StreetSuffix", "City", "CityRegion",
  "ListPrice", "TransactionType", "PropertyType", "PropertySubType",
  "BedroomsTotal", "BathroomsTotalInteger", "LivingAreaRange", "BuildingAreaTotal",
  "ParkingTotal", "GarageType", "Basement", "HeatType", "Cooling", "PoolFeatures",
  "LotSizeArea", "LotSizeUnits", "TaxAnnualAmount", "TaxYear", "PublicRemarks",
  "Latitude", "Longitude", "NetOperatingIncome",
] as const;

/** RESO names absent from this schema. Never select them. */
export const NOT_IN_SCHEMA = ["Community", "OwnershipType", "CapRate"] as const;

type YN = boolean | string | null | undefined;

/** A Property record as the API returns it, every field optional. */
export interface PropTxProperty {
  ListingKey: string;
  ListingId?: string;
  ModificationTimestamp?: string;
  StandardStatus?: string; MlsStatus?: string; ContractStatus?: string;
  ListOfficeKey?: string; ListOfficeName?: string;
  InternetEntireListingDisplayYN?: YN; InternetAddressDisplayYN?: YN;
  /** PropTx legacy names for the same two permissions, if the schema carries them */
  perm_adv?: YN; disp_addr?: YN;
  UnparsedAddress?: string; StreetNumber?: string; StreetName?: string; StreetSuffix?: string;
  City?: string; CityRegion?: string; Community?: string;
  ListPrice?: number; TransactionType?: string; PropertyType?: string; PropertySubType?: string;
  BedroomsTotal?: number; BathroomsTotalInteger?: number; LivingAreaRange?: string; BuildingAreaTotal?: number;
  OwnershipType?: string;
  ParkingTotal?: number; GarageType?: string; Basement?: string[] | string; HeatType?: string; Cooling?: string;
  PoolFeatures?: string[] | string; LotSizeArea?: number; LotSizeUnits?: string; TaxAnnualAmount?: number; TaxYear?: number;
  PublicRemarks?: string;
  Latitude?: number; Longitude?: number; NetOperatingIncome?: number; CapRate?: number;
}

export interface PropTxMedia {
  MediaKey: string; MediaURL: string; Order?: number; PreferredPhotoYN?: YN;
  ImageSizeDescription?: string; MediaCategory?: string; ModificationTimestamp?: string;
}

const env = (k: string) => { const v = process.env[k]; return v && v !== "X" ? v : undefined; };

/** A bearer token is a long dot-separated JWT; a ListOfficeKey is a short plain
 *  key (the brokerage's is six digits). Telling them apart catches the one
 *  misconfiguration that leaves the Collection empty: the token pasted into
 *  PROPTX_OFFICE_KEY with PROPTX_TOKEN left unset. */
export const looksLikeToken = (v?: string) => !!v && v.length > 60 && v.split(".").length === 3;
export const looksLikeOfficeKey = (v?: string) => !!v && /^[A-Za-z0-9_-]{1,40}$/.test(v);
let warned = false;
export function feedEnabled() {
  const token = env("PROPTX_TOKEN");
  if (!token && looksLikeToken(env("PROPTX_OFFICE_KEY")) && !warned) {
    warned = true;
    console.error("[proptx] PROPTX_TOKEN is not set, but PROPTX_OFFICE_KEY holds what looks like a bearer token. Move it to PROPTX_TOKEN and set PROPTX_OFFICE_KEY to the brokerage's ListOfficeKey.");
  }
  return !!token;
}
export const fixtureMode = () => process.env.PROPTX_FIXTURE === "1" && process.env.VERCEL_ENV !== "production";

/* ── mapping ────────────────────────────────────────────────────────────── */

/** Y/N, true/false, "true"/"false": anything else counts as unknown. */
export function yn(v: YN): boolean | undefined {
  if (typeof v === "boolean") return v;
  if (typeof v === "string") { const t = v.trim().toLowerCase(); if (["y", "yes", "true", "1"].includes(t)) return true; if (["n", "no", "false", "0"].includes(t)) return false; }
  return undefined;
}
export const displayAllowed = (p: PropTxProperty) => yn(p.InternetEntireListingDisplayYN ?? p.perm_adv) !== false;
export const addressAllowed = (p: PropTxProperty) => yn(p.InternetAddressDisplayYN ?? p.disp_addr) !== false;

export const kebab = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export function streetAddress(p: PropTxProperty) {
  const built = [p.StreetNumber, p.StreetName, p.StreetSuffix].filter(Boolean).join(" ").trim();
  return (p.UnparsedAddress || built).replace(/\s+/g, " ").trim();
}

/** The slug: address and city; listing-<mls> when the address is withheld; the
 *  lowercase ListingId is appended only on a collision. */
export function slugFor(p: PropTxProperty, taken: Set<string>) {
  const mls = (p.ListingId || p.ListingKey).toLowerCase();
  if (!addressAllowed(p)) return `listing-${kebab(mls)}`;
  const base = `${kebab(streetAddress(p))}-${kebab(p.City || "")}`.replace(/^-|-$/g, "") || `listing-${kebab(mls)}`;
  return taken.has(base) ? `${base}-${kebab(mls)}` : base;
}

const KIND: Record<string, Listing["kind"]> = {
  "detached": "Detached", "semi-detached": "Semi-Detached", "att/row/townhouse": "Townhouse", "townhouse": "Townhouse",
  "condo apt": "Condominium", "condo apartment": "Condominium", "condo townhouse": "Condominium",
  "multiplex": "Multi-Residential", "investment": "Multi-Residential",
  "commercial retail": "Commercial", "office": "Commercial", "retail": "Commercial",
  "industrial": "Industrial", "vacant land": "Land", "land": "Land",
};
export function kindOf(type?: string, sub?: string): Listing["kind"] {
  const s = (sub || "").toLowerCase().trim();
  if (KIND[s]) return KIND[s];
  for (const k of Object.keys(KIND)) if (s.includes(k)) return KIND[k];
  return /commercial|industrial|business/i.test(type || "") ? "Commercial" : "Detached";
}

/** "2000-2500" -> 2250; "5000+" -> 5000; else null. */
export function areaFrom(range?: string, total?: number): number | null {
  if (range) {
    const m = range.match(/(\d[\d,]*)\s*-\s*(\d[\d,]*)/);
    if (m) return Math.round((Number(m[1].replace(/,/g, "")) + Number(m[2].replace(/,/g, ""))) / 2);
    const one = range.match(/(\d[\d,]*)/);
    if (one) return Number(one[1].replace(/,/g, ""));
  }
  return total && total > 0 ? Math.round(total) : null;
}

export function tenureOf(o?: string) {
  const t = (o || "").toLowerCase();
  if (t.includes("freehold")) return "Freehold";
  if (t.includes("condo")) return "Condominium";
  if (t.includes("lease")) return "Leasehold";
  return "";
}

const list = (v?: string[] | string) => Array.isArray(v) ? v.filter(Boolean).join(", ") : (v || "");

/** Up to eight short, factual lines from the fields the feed carries. */
export function featuresOf(p: PropTxProperty): string[] {
  const f: string[] = [];
  if (p.ParkingTotal && p.ParkingTotal > 0) f.push(`${p.ParkingTotal} parking`);
  if (p.GarageType && !/none/i.test(p.GarageType)) f.push(`${p.GarageType} garage`);
  const bs = list(p.Basement); if (bs && !/none/i.test(bs)) f.push(`Basement: ${bs}`);
  if (p.HeatType) f.push(`Heat: ${p.HeatType}`);
  if (p.Cooling && !/none/i.test(p.Cooling)) f.push(`Cooling: ${p.Cooling}`);
  const pool = list(p.PoolFeatures); if (pool && !/none/i.test(pool)) f.push(`Pool: ${pool}`);
  if (p.LotSizeArea && p.LotSizeArea > 0) f.push(`Lot ${p.LotSizeArea.toLocaleString("en-CA")}${p.LotSizeUnits ? ` ${p.LotSizeUnits}` : ""}`);
  if (p.TaxAnnualAmount && p.TaxAnnualAmount > 0) f.push(`Taxes $${Math.round(p.TaxAnnualAmount).toLocaleString("en-CA")}${p.TaxYear ? ` (${p.TaxYear})` : ""}`);
  return f.slice(0, 8);
}

export function hueOf(key: string) { let h = 0; for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h % 360; }

/** A Property record to a Listing, or null when it may not be displayed. */
export function mapProperty(p: PropTxProperty, taken: Set<string>, photos: string[] = []): Listing | null {
  if (!displayAllowed(p)) return null;
  const withheld = !addressAllowed(p);
  const id = slugFor(p, taken);
  taken.add(id);
  const address = withheld ? "" : streetAddress(p);
  const city = p.City || "";
  const kind = kindOf(p.PropertyType, p.PropertySubType);
  const investment = ["Commercial", "Industrial", "Land", "Multi-Residential"].includes(kind);
  const lease = /lease|rent/i.test(p.TransactionType || "");
  const remarks = (p.PublicRemarks || "").replace(/\s+/g, " ").trim();
  return {
    id,
    name: withheld ? city : address,
    address,
    city,
    region: p.CityRegion || p.Community || "",
    price: Math.round(p.ListPrice || 0),
    intent: lease ? "lease" : "sale",
    kind,
    useClass: investment ? "investment" : "residential",
    beds: p.BedroomsTotal ?? null,
    baths: p.BathroomsTotalInteger ?? null,
    sqft: areaFrom(p.LivingAreaRange, p.BuildingAreaTotal),
    tenure: tenureOf(p.OwnershipType ?? p.PropertyType),
    tier: null,
    status: "Available",
    lat: p.Latitude ?? 0,
    lng: p.Longitude ?? 0,
    features: featuresOf(p),
    ...(p.CapRate && p.CapRate > 0 ? { capRate: p.CapRate } : {}),
    ...(p.NetOperatingIncome && p.NetOperatingIncome > 0 ? { noi: Math.round(p.NetOperatingIncome) } : {}),
    standfirst: "",
    body: remarks ? [remarks] : [],
    photo: photos[0] || "",
    photos: photos.slice(1),
    hue: hueOf(p.ListingKey),
    mls: p.ListingId,
    key: p.ListingKey,
    ...(withheld ? { addressWithheld: true } : {}),
  };
}

/** The preferred photograph first, then by Order. */
export function orderMedia(m: PropTxMedia[]) {
  return [...m].sort((a, b) => (Number(yn(b.PreferredPhotoYN) === true) - Number(yn(a.PreferredPhotoYN) === true)) || ((a.Order ?? 0) - (b.Order ?? 0)) || a.MediaKey.localeCompare(b.MediaKey)).map((x) => x.MediaURL).filter(Boolean);
}

/* ── the API ────────────────────────────────────────────────────────────── */

const q = (s: string) => s.replace(/'/g, "''");

/** On-market means StandardStatus 'Active'. Checked against the live feed on
 *  9 Oct 2026: 23 of the brokerage's 61 records, the same 23 whether or not the
 *  office filter is added (the token is scoped to the brokerage). ContractStatus
 *  'Available' counted 24, one record more, so it is not the test. */
export const ACTIVE_FILTER = "StandardStatus eq 'Active'";
export const isActive = (p: Pick<PropTxProperty, "StandardStatus">) => p.StandardStatus === "Active";

/** The office clause: the ListOfficeKey when a plain key is configured, else the
 *  office name. A value that is not a plain key (a token pasted in the wrong
 *  variable, say) is ignored rather than sent. */
export function officeFilter(key = env("PROPTX_OFFICE_KEY")) {
  return looksLikeOfficeKey(key) ? ` and ListOfficeKey eq '${q(key!)}'` : " and contains(ListOfficeName,'DANMAR')";
}
export const activeFilter = (key?: string) => `${ACTIVE_FILTER}${officeFilter(key)}`;

async function odata<T>(path: string): Promise<T[] | null> {
  const token = env("PROPTX_TOKEN");
  if (!token) return null;
  try {
    const res = await fetch(BASE + path, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      next: { revalidate: REVALIDATE, tags: [TAG] },
    });
    if (!res.ok) { console.error(`[proptx] ${res.status} on ${path.split("?")[0]}`); return null; }
    const json = (await res.json()) as { value?: T[] };
    return json.value ?? [];
  } catch (e) {
    console.error(`[proptx] request failed on ${path.split("?")[0]}: ${(e as Error).message}`);
    return null;
  }
}

/** The listing's photographs, preferred first. `all` false asks for one. */
export async function fetchMedia(listingKey: string, all = false): Promise<string[]> {
  if (fixtureMode()) { const { FIXTURE_MEDIA } = await import("./__fixtures__/proptx"); const m = orderMedia(FIXTURE_MEDIA[listingKey] ?? []); return all ? m : m.slice(0, 1); }
  const filter = `ResourceRecordKey eq '${q(listingKey)}' and ResourceName eq 'Property' and ImageSizeDescription eq 'Large'`;
  const rows = await odata<PropTxMedia>(`Media?$filter=${encodeURIComponent(filter)}&$orderby=${encodeURIComponent("Order,MediaKey")}&$top=${all ? 50 : 20}&$select=${["MediaKey", "MediaURL", "Order", "PreferredPhotoYN"].join(",")}`);
  const m = orderMedia(rows ?? []);
  return all ? m : m.slice(0, 1);
}

async function fetchProperties(): Promise<PropTxProperty[] | null> {
  if (fixtureMode()) { const { FIXTURE_PROPERTIES } = await import("./__fixtures__/proptx"); return FIXTURE_PROPERTIES; }
  // spaces must reach the server as %20: a '+' in $filter is read as arithmetic and answered 400
  return odata<PropTxProperty>(`Property?$filter=${encodeURIComponent(activeFilter())}&$orderby=${encodeURIComponent("ModificationTimestamp desc")}&$top=200&$select=${PROPERTY_SELECT.join(",")}`);
}

/** Every active listing the brokerage may display, newest first, each with its
 *  first photograph. [] when the feed is off, empty, or unreachable. */
export async function fetchActiveListings(): Promise<Listing[]> {
  const rows = await fetchProperties();
  if (!rows?.length) return [];
  const taken = new Set<string>();
  const out: Listing[] = [];
  for (const p of rows) {
    if (!isActive(p) || !displayAllowed(p)) continue;
    const photos = await fetchMedia(p.ListingKey, false);
    const l = mapProperty(p, taken, photos);
    if (l) out.push(l);
  }
  return out;
}

/** One listing by slug, with every photograph, or null when it is gone. */
export async function fetchListing(slug: string): Promise<Listing | null> {
  const all = await fetchActiveListings();
  const l = all.find((x) => x.id === slug);
  if (!l || !l.key) return l ?? null;
  const photos = await fetchMedia(l.key, true);
  return { ...l, photo: photos[0] || l.photo, photos: photos.slice(1) };
}
