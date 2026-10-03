import { CITIES } from "./data";
import type { Listing } from "./data";

export interface Query {
  intent: "sale" | "lease" | null;
  minPrice: number | null;
  maxPrice: number | null;
  beds: number | null;
  baths: number | null;
  cities: string[];
  kinds: string[];
  features: string[];
  lens: "residential" | "investment" | null;
  unparsed: string[];
}

export const EMPTY: Query = {
  intent: null, minPrice: null, maxPrice: null, beds: null, baths: null,
  cities: [], kinds: [], features: [], lens: null, unparsed: [],
};

const NUMWORD: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
};

const KINDMAP: [RegExp, string][] = [
  [/\b(detached|house|home|single family)\b/, "Detached"],
  [/\b(semi|semi-?detached)\b/, "Semi-Detached"],
  [/\b(town|townhome|townhouse|freehold town)\b/, "Townhouse"],
  [/\b(condo|condominium|apartment|suite|loft|penthouse)\b/, "Condominium"],
  [/\b(multi-?res|multiplex|multi-?residential|duplex|triplex|fourplex|six-?plex|apartment building)\b/, "Multi-Residential"],
  [/\b(commercial|retail|office|mixed-?use|net lease|plaza)\b/, "Commercial"],
  [/\b(industrial|warehouse|flex|shop|bay)\b/, "Industrial"],
  [/\b(vacant land|raw land|development site|development land|land assembly|parcel|acreage|building lot|vacant lot)\b|\bland\b(?!\s*(?:transfer|registry))/, "Land"],
];

const FEATUREMAP: [RegExp, string][] = [
  [/\b(finished|walk-?out) basement\b|\bbasement\b/, "finished basement"],
  [/\bpool\b|\bswimming\b/, "pool"],
  [/\bravine\b/, "ravine lot"],
  [/\bwaterfront\b|\blakefront\b|\bon the lake\b|\blake\b/, "waterfront"],
  [/\bgarage\b|\bparking\b/, "garage"],
  [/\bfurnished\b|\bturn-?key\b/, "furnished"],
  [/\bterrace\b|\brooftop\b|\bbalcon/, "terrace"],
  [/\bgated\b|\bsecurity\b|\bprivate\b/, "gated"],
  [/\bacre\b|\bacreage\b/, "acre"],
  [/\bheritage\b|\bcentury\b|\bhistoric\b/, "heritage"],
  [/\bcorporate\b|\bcovenant\b|\bguarantee\b|\brelocation\b|\bexecutive\b|\bdiplomat/, "corporate covenant"],
  [/\bapproved\b|\bapprovals\b|\bdraft plan\b|\bzoned\b|\bzoning\b/, "approved plans"],
];

function parseMoney(raw: string): number | null {
  const m = raw.replace(/[, ]/g, "");
  let n = parseFloat(m.replace(/[^\d.]/g, ""));
  if (isNaN(n)) return null;
  if (/m(illion)?\b/i.test(raw)) n *= 1_000_000;
  else if (/k\b/i.test(raw)) n *= 1_000;
  else if (n < 100) n *= 1_000_000;         // "under 1.5" => 1.5M
  else if (n < 10_000) n *= 1_000;          // "under 900" => 900k
  return Math.round(n);
}

const MONEY = /\$?\s?\d[\d,.]*\s?(?:m(?:illion)?|k)?/gi;

export function parse(input: string): Query {
  const q: Query = { ...EMPTY, cities: [], kinds: [], features: [], unparsed: [] };
  const t = " " + input.toLowerCase().replace(/[“”"']/g, "") + " ";

  // intent
  if (/\b(lease|rent|rental|renting|tenant|per month|\/mo|monthly|relocat)\b/.test(t)) q.intent = "lease";
  else if (/\b(buy|buying|purchase|for sale|acquire)\b/.test(t)) q.intent = "sale";

  // investment lens
  if (/\b(invest|investment|cap rate|yield|cash ?flow|noi|income|return|portfolio|net lease|tenanted)\b/.test(t)) q.lens = "investment";
  else if (/\b(family|live in|schools?|move in|primary residence)\b/.test(t)) q.lens = "residential";

  // beds / baths
  const bed = t.match(/\b(\d+|one|two|three|four|five|six|seven|eight)\s*\+?\s*(?:bed|bedroom|br|bdrm)/);
  if (bed) q.beds = NUMWORD[bed[1]] ?? parseInt(bed[1], 10);
  const bath = t.match(/\b(\d+|one|two|three|four|five|six)\s*\+?\s*(?:bath|bathroom|ba\b|washroom)/);
  if (bath) q.baths = NUMWORD[bath[1]] ?? parseInt(bath[1], 10);

  // price
  const between = t.match(/\b(?:between|from)\s*(\$?[\d.,]+\s?[mk]?)\s*(?:and|to|-|–)\s*(\$?[\d.,]+\s?[mk]?)/);
  const range = t.match(/(\$?[\d.,]+\s?[mk]?)\s*(?:-|–|to)\s*(\$?[\d.,]+\s?[mk]?)/);
  const under = t.match(/\b(?:under|below|less than|up to|max(?:imum)?|budget(?: of)?|around|about|within)\s*(\$?\s?[\d.,]+\s?(?:m(?:illion)?|k)?)/);
  const over  = t.match(/\b(?:over|above|more than|at least|min(?:imum)?|starting at|north of)\s*(\$?\s?[\d.,]+\s?(?:m(?:illion)?|k)?)/);
  if (between || range) {
    const r = (between || range)!;
    q.minPrice = parseMoney(r[1]); q.maxPrice = parseMoney(r[2]);
  } else {
    if (under) q.maxPrice = parseMoney(under[1]);
    if (over) q.minPrice = parseMoney(over[1]);
    if (!under && !over) {
      const solo = t.match(MONEY);
      if (solo) { const v = parseMoney(solo[0]); if (v && v > 1000) q.maxPrice = v; }
    }
  }
  // A price with no stated intent still tells us which book to look in:
  // six figures and up is a purchase, four figures is a monthly rent.
  if (!q.intent) {
    const v = q.maxPrice ?? q.minPrice;
    if (v != null) q.intent = v >= 150_000 ? "sale" : "lease";
  }
  // monthly figures shouldn't be inflated to millions
  if (q.intent === "lease") {
    if (q.maxPrice && q.maxPrice > 200000) q.maxPrice = Math.round(q.maxPrice / 1000);
    if (q.minPrice && q.minPrice > 200000) q.minPrice = Math.round(q.minPrice / 1000);
  }

  // cities
  for (const c of CITIES) if (t.includes(" " + c.toLowerCase())) q.cities.push(c);
  if (/\bgta\b|\bgreater toronto\b/.test(t) && !q.cities.length) q.cities = [];
  if (/\bbridle path\b|\byorkville\b|\bking west\b|\brosedale\b|\bforest hill\b/.test(t) && !q.cities.includes("Toronto")) q.cities.push("Toronto");
  if (/\bbronte\b|\bjoshua creek\b/.test(t) && !q.cities.includes("Oakville")) q.cities.push("Oakville");
  if (/\bwoodbridge\b|\bmaple\b|\bkleinburg\b/.test(t) && !q.cities.includes("Vaughan")) q.cities.push("Vaughan");
  if (/\bstreetsville\b|\bport credit\b|\bcooksville\b/.test(t) && !q.cities.includes("Mississauga")) q.cities.push("Mississauga");

  for (const [re, k] of KINDMAP) if (re.test(t) && !q.kinds.includes(k)) q.kinds.push(k);
  for (const [re, f] of FEATUREMAP) if (re.test(t) && !q.features.includes(f)) q.features.push(f);

  return q;
}

export function isEmpty(q: Query) {
  return !q.intent && !q.minPrice && !q.maxPrice && !q.beds && !q.baths &&
    !q.cities.length && !q.kinds.length && !q.features.length && !q.lens;
}

export function apply(list: Listing[], q: Query): Listing[] {
  return list.filter((l) => {
    if (q.intent && l.intent !== q.intent) return false;
    if (q.lens && l.useClass !== q.lens) return false;
    if (q.maxPrice != null && l.price > q.maxPrice) return false;
    if (q.minPrice != null && l.price < q.minPrice) return false;
    if (q.beds != null && (l.beds ?? 0) < q.beds) return false;
    if (q.baths != null && (l.baths ?? 0) < q.baths) return false;
    if (q.cities.length && !q.cities.includes(l.city)) return false;
    if (q.kinds.length && !q.kinds.includes(l.kind)) return false;
    if (q.features.length) {
      const hay = (l.features.join(" ") + " " + l.kind + " " + l.region).toLowerCase();
      if (!q.features.every((f) => hay.includes(f.split(" ")[0]))) return false;
    }
    return true;
  });
}

export const money = (n: number, lease = false) =>
  lease ? `$${n.toLocaleString("en-CA")}/mo`
        : n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 3).replace(/0+$/, "").replace(/\.$/, "")}M`
        : `$${n.toLocaleString("en-CA")}`;

/** Human read-back of the parse: the bar tells you what it understood. */
export function readback(q: Query): string {
  if (isEmpty(q)) return "";
  const bits: string[] = [];
  if (q.beds) bits.push(`${q.beds}+ bedroom`);
  if (q.baths) bits.push(`${q.baths}+ bathroom`);
  if (q.kinds.length) bits.push(q.kinds.join(" or ").toLowerCase());
  else if (q.lens === "investment") bits.push("investment property");
  const head = bits.length ? bits.join(" ") : "property";
  let s = q.intent === "lease" ? `Executive lease: ${head}`
        : q.intent === "sale" ? `For sale: ${head}`
        : `Looking for: ${head}`;
  if (q.cities.length) s += ` in ${q.cities.join(", ")}`;
  else s += " across the GTA";
  const lease = q.intent === "lease";
  if (q.minPrice && q.maxPrice) s += `, ${money(q.minPrice, lease)} to ${money(q.maxPrice, lease)}`;
  else if (q.maxPrice) s += `, under ${money(q.maxPrice, lease)}`;
  else if (q.minPrice) s += `, over ${money(q.minPrice, lease)}`;
  if (q.features.length) s += `, with ${q.features.join(", ")}`;
  return s + ".";
}

/** What the bar offers next — the "guide them" half of the brief. */
export function suggestions(q: Query, results: number): { label: string; patch: Partial<Query> }[] {
  const out: { label: string; patch: Partial<Query> }[] = [];
  if (results === 0) {
    if (q.maxPrice) out.push({ label: `Raise the ceiling to ${money(Math.round(q.maxPrice * 1.35), q.intent === "lease")}`, patch: { maxPrice: Math.round(q.maxPrice * 1.35) } });
    if (q.cities.length) out.push({ label: "Widen to the whole GTA", patch: { cities: [] } });
    if (q.features.length) out.push({ label: `Drop "${q.features[0]}"`, patch: { features: q.features.slice(1) } });
    if (q.beds) out.push({ label: `Accept ${Math.max(1, q.beds - 1)} bedrooms`, patch: { beds: Math.max(1, q.beds - 1) } });
  } else {
    if (!q.lens) out.push({ label: "Show investment stock only", patch: { lens: "investment" } });
    if (q.intent !== "lease") out.push({ label: "Executive leases instead", patch: { intent: "lease", lens: null } });
    if (!q.features.includes("ravine lot")) out.push({ label: "Add a ravine lot", patch: { features: [...q.features, "ravine lot"] } });
    if (!q.cities.includes("Oakville")) out.push({ label: "Oakville only", patch: { cities: ["Oakville"] } });
  }
  return out.slice(0, 4);
}

export const EXAMPLES = [
  "Four bedrooms in Oakville under $2.5M with a ravine lot",
  "Executive lease over $10,000 a month, furnished, corporate covenant",
  "Investment property in Mississauga with a cap rate and upside",
  "Land with approvals I can build on next season",
];
