export type Tier = "Prime" | "Signature" | "Off-Market" | null;
export type Intent = "sale" | "lease";

export interface Listing {
  id: string;
  name: string;            // properties get names, not addresses
  address: string;
  city: string;
  region: string;          // neighbourhood / submarket
  price: number;           // monthly if lease
  intent: Intent;
  kind: "Detached" | "Semi-Detached" | "Townhouse" | "Condominium" | "Multi-Residential" | "Commercial" | "Industrial" | "Land";
  useClass: "residential" | "investment";
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  tenure: string;
  tier: Tier;
  status: "Available" | "Conditional" | "Leased" | "Sold";
  lat: number; lng: number;
  features: string[];
  capRate?: number;
  noi?: number;
  standfirst: string;      // the attributed pull-quote
  body: string[];          // prose before specification
  photo: string;           // unsplash id (best effort; generative art is the fallback)
  hue: number;             // seed for the generative fallback
}

const U = (id: string) => `https://unsplash.com/photos/${id}/download?w=1800`;

export const LISTINGS: Listing[] = [
  {
    id: "namron-gate", name: "Namron Gate", address: "2102 Namron Gate", city: "Oakville", region: "Joshua Creek",
    price: 2380000, intent: "sale", kind: "Detached", useClass: "residential", beds: 5, baths: 4, sqft: 4120,
    tenure: "Freehold", tier: "Prime", status: "Available", lat: 43.4612, lng: -79.6485,
    features: ["ravine lot", "finished basement", "three-car garage", "walkout"],
    standfirst: "A late-nineties builder house taken back to the studs and rebuilt with the patience of a custom commission.",
    body: [
      "The lot is the argument. Namron Gate backs directly onto the Joshua Creek ravine, which means the rear elevation looks at nothing but trees and will continue to, because the conservation authority setback behind it cannot be built on.",
      "Inside, the 2021 renovation removed the formal dining room entirely and pushed the kitchen to the back of the house, so the principal living space now runs the full width of the rear wall. Quarter-sawn white oak throughout the ground floor. The walkout basement was underpinned to give a true nine-foot ceiling, which is what makes the lower level read as living space rather than storage.",
      "4,120 square feet above grade, five bedrooms, four bathrooms, three-car garage.",
    ],
    photo: U("3ddHcjHmiGw"), hue: 28,
  },
  {
    id: "bronte-harbour", name: "Bronte Harbour", address: "Bronte Road at the lake", city: "Oakville", region: "Bronte",
    price: 3950000, intent: "sale", kind: "Detached", useClass: "residential", beds: 4, baths: 5, sqft: 5200,
    tenure: "Freehold", tier: "Prime", status: "Available", lat: 43.3926, lng: -79.7112,
    features: ["waterfront", "pool", "boat slip", "guest suite"],
    standfirst: "Forty feet of Lake Ontario frontage, and a house that has the confidence to turn its back on the street.",
    body: [
      "Bronte is the part of Oakville that still behaves like a harbour village. The house sits at the end of a short private lane, and every principal room faces south to the water.",
      "The current owners commissioned the 2019 rebuild from a Toronto practice that works mostly in institutional concrete, and it shows: the structure is board-formed concrete and glass, softened by a cedar soffit that runs unbroken from the entry through to the lake terrace.",
      "5,200 square feet, four bedrooms, five bathrooms, self-contained guest suite over the garage, and a deeded slip at the Bronte Outer Harbour.",
    ],
    photo: U("jFRlus8c1gk"), hue: 200,
  },
  {
    id: "winston-terrace", name: "Winston Terrace", address: "Winston Churchill at Upper Middle", city: "Oakville", region: "Joshua Creek",
    price: 1895000, intent: "sale", kind: "Detached", useClass: "residential", beds: 4, baths: 4, sqft: 3300,
    tenure: "Freehold", tier: null, status: "Conditional", lat: 43.4702, lng: -79.6800,
    features: ["pool", "finished basement", "corner lot"],
    standfirst: "A family house with a proper pool and nothing left to do to it.",
    body: [
      "Corner lot, south-facing rear yard, and a saltwater pool that was re-lined and re-plumbed two summers ago.",
      "The ground floor is conventional and works: separate office off the entry, open kitchen and family room at the back, mudroom that connects to the garage.",
      "3,300 square feet, four bedrooms, four bathrooms.",
    ],
    photo: U("t9eECWSCCXM"), hue: 160,
  },
  {
    id: "keele-wilson", name: "Keele & Wilson", address: "Keele Street at Wilson Avenue", city: "Vaughan", region: "Keele Corridor",
    price: 3350000, intent: "sale", kind: "Commercial", useClass: "investment", beds: null, baths: null, sqft: 11400,
    tenure: "Freehold", tier: "Signature", status: "Available", lat: 43.8112, lng: -79.5081,
    features: ["mixed use", "corner exposure", "six tenants", "redevelopment upside"],
    capRate: 5.4, noi: 181000,
    standfirst: "A corner block with six covenants, a 5.4% going-in cap, and a zoning envelope that nobody has used yet.",
    body: [
      "Two-storey mixed-use on a hard corner with roughly 140 feet of frontage on Keele. Ground floor retail, second floor professional offices, six tenants with a weighted average lease term of 3.1 years.",
      "The going-in yield is respectable on its own. The reason to look harder is the official plan designation, which contemplates mid-rise on this stretch and which the current two storeys do not come close to using.",
      "11,400 square feet on 0.41 acres. Rent roll, estoppels and the environmental available under NDA.",
    ],
    photo: U("P21wf6KAykw"), hue: 20,
  },
  {
    id: "hurontario-block", name: "The Hurontario Block", address: "Hurontario Street", city: "Mississauga", region: "Cooksville",
    price: 2600000, intent: "sale", kind: "Multi-Residential", useClass: "investment", beds: null, baths: null, sqft: 7800,
    tenure: "Freehold", tier: "Signature", status: "Available", lat: 43.5786, lng: -79.6212,
    features: ["six units", "below-market rents", "transit adjacent", "separately metered"],
    capRate: 4.6, noi: 119600,
    standfirst: "Six units, all separately metered, all roughly thirty per cent under market on turnover.",
    body: [
      "Purpose-built six-plex two blocks from the Hurontario LRT alignment. Three two-bedrooms, three one-bedrooms, all separately metered for hydro, which matters more every year.",
      "In-place rents are legacy. The stabilised yield on turnover is materially higher than the going-in figure, and the RTA above-guideline route is available for the capital work already scoped.",
      "7,800 square feet gross. Current NOI $119,600.",
    ],
    photo: U("hHz4yrvxwlA"), hue: 216,
  },
  {
    id: "credit-ridge", name: "Credit Ridge", address: "Mississauga Road", city: "Mississauga", region: "Credit Valley",
    price: 1400000, intent: "sale", kind: "Land", useClass: "investment", beds: null, baths: null, sqft: null,
    tenure: "Freehold", tier: "Off-Market", status: "Available", lat: 43.6006, lng: -79.7186,
    features: ["approved plans", "servicing allocation", "corner parcel"],
    standfirst: "Two and a half acres with the approvals already fought for and won.",
    body: [
      "The value here is the paper, not the dirt. Draft plan approval is in hand, servicing allocation is confirmed, and the appeal period has run.",
      "A builder can be in the ground the season after closing. Anyone starting from raw land on this corridor is looking at three years and a tribunal.",
      "2.48 acres. Full approvals package released on execution of a confidentiality agreement.",
    ],
    photo: U("mcSZ1pNmUNU"), hue: 68,
  },
  {
    id: "the-streetsville", name: "The Streetsville", address: "Queen Street South", city: "Mississauga", region: "Streetsville",
    price: 2550000, intent: "sale", kind: "Detached", useClass: "residential", beds: 5, baths: 4, sqft: 4400,
    tenure: "Freehold", tier: null, status: "Available", lat: 43.5847, lng: -79.7099,
    features: ["heritage", "river frontage", "coach house", "finished basement"],
    standfirst: "An 1887 stone house on the Credit, with a coach house that has been converted properly.",
    body: [
      "Streetsville is a village that Mississauga grew around rather than over. This is one of the original stone houses on the river side of Queen.",
      "The main house has been carefully kept: original trim, restored windows, a kitchen addition from 2017 that reads as an addition rather than a pastiche. The coach house is a legal secondary suite, currently tenanted.",
      "4,400 square feet across both buildings. Heritage designated under Part IV.",
    ],
    photo: U("Is9zywNUhKg"), hue: 36,
  },
  {
    id: "maple-rise", name: "Maple Rise", address: "Major Mackenzie at Keele", city: "Vaughan", region: "Maple",
    price: 1489000, intent: "sale", kind: "Townhouse", useClass: "residential", beds: 4, baths: 4, sqft: 2450,
    tenure: "Freehold", tier: null, status: "Available", lat: 43.8598, lng: -79.5093,
    features: ["four storey", "rooftop terrace", "two-car garage", "end unit"],
    standfirst: "Four storeys, an end unit, and a rooftop terrace nobody overlooks.",
    body: [
      "The newest of the Maple freehold blocks, finished in 2022. End unit, so there is glazing on three sides and the stair core gets real daylight.",
      "Ground floor is a flexible room that most owners use as an office; principal rooms on two; bedrooms on three; terrace on four.",
      "2,450 square feet, four bedrooms, four bathrooms, two-car garage. Freehold, no common element fee.",
    ],
    photo: U("DpVFViooZCQ"), hue: 12,
  },
  {
    id: "kingsway-loft", name: "The Kingsway Loft", address: "Bloor Street West", city: "Toronto", region: "Kingsway",
    price: 1125000, intent: "sale", kind: "Condominium", useClass: "residential", beds: 2, baths: 2, sqft: 1180,
    tenure: "Condominium", tier: null, status: "Available", lat: 43.6456, lng: -79.5063,
    features: ["penthouse level", "parking", "locker", "south exposure"],
    standfirst: "A hard loft on the subway line, with the ceiling height that phrase is supposed to mean.",
    body: [
      "Top floor of a 1930s conversion. Eleven-foot ceilings, original steel sash windows on the south wall, exposed brick that is actually structural.",
      "Royal York station is a six-minute walk, which puts you at Bay in twenty-two minutes without a car.",
      "1,180 square feet, two bedrooms, two bathrooms, one parking, one locker.",
    ],
    photo: U("2P_ifaetDm0"), hue: 260,
  },
  {
    id: "aurora-grange", name: "Aurora Grange", address: "Bathurst Street", city: "Aurora", region: "Aurora Estates",
    price: 2150000, intent: "sale", kind: "Detached", useClass: "residential", beds: 4, baths: 4, sqft: 3900,
    tenure: "Freehold", tier: null, status: "Available", lat: 44.0001, lng: -79.4831,
    features: ["one acre", "mature trees", "three-car garage", "finished basement"],
    standfirst: "A full acre inside the town boundary, which is a thing that stopped being made.",
    body: [
      "Aurora Estates is the pocket of one-acre lots south of St John's Sideroad. The houses vary; the lots do not.",
      "This one is a 1994 build in good order rather than a renovation project: mechanical replaced in 2020, roof in 2018, and a rear yard that has been landscaped once, properly, and left alone since.",
      "3,900 square feet, four bedrooms, four bathrooms, three-car garage.",
    ],
    photo: U("BBKpQHzrnPc"), hue: 118,
  },
  {
    id: "woodstream", name: "Woodstream", address: "53 Woodstream Boulevard", city: "Vaughan", region: "Vaughan Enterprise Zone",
    price: 6400, intent: "lease", kind: "Industrial", useClass: "investment", beds: null, baths: null, sqft: 4800,
    tenure: "Net Lease", tier: null, status: "Available", lat: 43.7962, lng: -79.5859,
    features: ["drive-in door", "office build-out", "highway 407 access", "clear height 22ft"],
    standfirst: "Flex space with a finished front end, which is rarer on this street than the listings suggest.",
    body: [
      "4,800 square feet with roughly 1,200 built out as office at the front. One drive-in door, 22-foot clear, and a shipping court that a 53-foot trailer can actually turn in.",
      "Four minutes to the 407 at Pine Valley. Zoning permits a broad range of light industrial and service uses.",
      "$6,400 per month net, plus TMI. Five-year term preferred.",
    ],
    photo: U("6sDuV840wxs"), hue: 210,
  },
  {
    id: "the-thompson", name: "The Thompson", address: "Wellington Street West", city: "Toronto", region: "King West",
    price: 12500, intent: "lease", kind: "Condominium", useClass: "residential", beds: 2, baths: 3, sqft: 1690,
    tenure: "Condominium", tier: "Signature", status: "Leased", lat: 43.6431, lng: -79.4006,
    features: ["furnished", "corporate covenant", "hotel services", "parking"],
    standfirst: "Furnished executive lease, twelve-month term, corporate guarantee behind it.",
    body: [
      "Two-bedroom corner suite in the residential tower, with the hotel's service package attached to it and the building's operating hours behind the concierge desk.",
      "Placed with a relocating executive on a twelve-month term under a corporate guarantee, which is the covenant most of our landlords are actually buying. We hold two further suites in this building that are never publicly listed.",
      "1,690 square feet, two bedrooms, three bathrooms, one parking, furnished to a relocation standard.",
    ],
    photo: U("zSG-kd-L6vw"), hue: 248,
  },
  {
    id: "yorkville-penthouse", name: "The Yorkville Penthouse", address: "Scollard Street", city: "Toronto", region: "Yorkville",
    price: 18500, intent: "lease", kind: "Condominium", useClass: "residential", beds: 3, baths: 4, sqft: 3250,
    tenure: "Condominium", tier: "Prime", status: "Available", lat: 43.6715, lng: -79.3921,
    features: ["furnished", "two terraces", "three parking", "corporate covenant", "concierge"],
    standfirst: "The relocation suite that ends the search, which is the only reason a company pays eighteen five.",
    body: [
      "Full-floor penthouse with terraces on the north and south elevations, three parking spaces in a building where residents fight over two, and a concierge desk that has handled diplomatic arrivals before.",
      "Available furnished or unfurnished on a minimum twelve-month term. We will take a corporate guarantee, a diplomatic note, or a parent-company covenant in place of the usual personal credit file.",
      "3,250 square feet, three bedrooms, four bathrooms.",
    ],
    photo: U("rHoMQ87hvIY"), hue: 34,
  },
  {
    id: "bridle-path", name: "The Bridle Path House", address: "Park Lane Circle", city: "Toronto", region: "Bridle Path",
    price: 24000, intent: "lease", kind: "Detached", useClass: "residential", beds: 6, baths: 8, sqft: 11200,
    tenure: "Freehold", tier: "Off-Market", status: "Available", lat: 43.7365, lng: -79.3721,
    features: ["two acres", "pool", "staff quarters", "gated", "security system"],
    standfirst: "Two gated acres on Park Lane Circle, available on a term rather than a sale. It has never been publicly listed.",
    body: [
      "The owner is abroad for a fixed posting and will not sell. The house is therefore available on a two- to four-year term to a covenant that can be verified, and to nobody else.",
      "Gated and walled on all four sides, monitored, with separate staff quarters over the garage and a service entrance that does not pass the principal rooms.",
      "11,200 square feet, six bedrooms, eight bathrooms, two acres. Shown by appointment to qualified parties only; no photography released before viewing.",
    ],
    photo: U("Z-hiM9VFak0"), hue: 148,
  },
  {
    id: "lakeshore-executive", name: "Lakeshore Executive", address: "Lakeshore Road West", city: "Oakville", region: "Southwest Oakville",
    price: 11500, intent: "lease", kind: "Detached", useClass: "residential", beds: 5, baths: 5, sqft: 4800,
    tenure: "Freehold", tier: "Signature", status: "Available", lat: 43.4327, lng: -79.6971,
    features: ["furnished", "pool", "lake access", "corporate covenant", "two-car garage"],
    standfirst: "The Oakville answer for a family that is here for three years and wants the schools sorted.",
    body: [
      "Southwest Oakville, four blocks from the lake, inside the Oakville Trafalgar catchment and a seven-minute drive to Appleby College.",
      "Furnished and turnkey, including linens and kitchen. Twelve to thirty-six month terms. We have placed three consecutive corporate tenants in this house without a vacancy month between them.",
      "4,800 square feet, five bedrooms, five bathrooms, heated saltwater pool.",
    ],
    photo: U("d2hYqpR0YS0"), hue: 186,
  },
  {
    id: "airport-corporate-centre", name: "Airport Corporate Centre", address: "Matheson Boulevard East", city: "Mississauga", region: "Airport Corporate",
    price: 8900000, intent: "sale", kind: "Commercial", useClass: "investment", beds: null, baths: null, sqft: 62000,
    tenure: "Freehold", tier: "Signature", status: "Available", lat: 43.6462, lng: -79.6288,
    features: ["single tenant", "corporate covenant", "net lease", "8 years remaining", "annual escalations"],
    capRate: 6.1, noi: 542900,
    standfirst: "Sixty-two thousand square feet on a single net lease with eight years left and 2.5% annual escalations.",
    body: [
      "Freestanding office and light industrial on 3.9 acres in the Airport Corporate node, occupied end to end by one tenant on a triple-net lease.",
      "Eight years remain on the term with two five-year renewals at fair market. Escalations are fixed at 2.5% annually, which is the part that compounds. Landlord obligations are structural only.",
      "62,000 square feet. Current NOI $542,900 against a 6.1% going-in yield. Lease, estoppel and building condition report released under NDA.",
    ],
    photo: U("WFzfX_n7qv4"), hue: 206,
  },
];

export const JOURNAL = [
  { id: "prime-report", kind: "Market Report", date: "September 2026", title: "The Prime Report: Greater Toronto, Autumn 2026",
    dek: "Our twice-yearly read on the top decile of the GTA market, written for owners rather than for headlines.", read: "18 min" },
  { id: "five-year-hold", kind: "Analysis", date: "August 2026", title: "What the rate path actually does to a five-year hold",
    dek: "Three financing scenarios run against the same Oakville detached, and why the middle one is the one to underwrite.", read: "9 min" },
  { id: "tarion", kind: "Field Notes", date: "July 2026", title: "Reading a builder's Tarion record before you sign the APS",
    dek: "The public registry tells you more than the sales centre will. Here is where to look and what the numbers mean.", read: "7 min" },
  { id: "ravine", kind: "Field Notes", date: "June 2026", title: "Ravine lots, conservation setbacks, and what the view costs",
    dek: "A premium that is real, a buildable envelope that is often smaller than the survey suggests.", read: "6 min" },
];

/** Only slug, name and role are required. Leave a field out rather than fill it
 *  with anything the person has not confirmed; the pages omit what is absent. */
export interface Person {
  slug: string; name: string; role: string; line?: string;
  creds?: string[]; focus?: string[]; areas?: string; bio?: string[]; tel?: string; email?: string;
}

export const TEAM: Person[] = [
  {
    slug: "martin-sheikhan", name: "Martin Sheikhan, PMP", role: "Broker of Record",
    line: "Founded the firm in 2016. Three decades in capital project delivery before real estate.",
    creds: ["Broker of Record", "Project Management Professional (PMP)"],
    focus: ["Brokerage compliance", "Development", "Builder relationships"],
    areas: "Oakville · Vaughan · Ontario",
    tel: "647 273 5177", email: "martin@danmarempire.com",
    bio: [
      "Martin spent thirty years delivering capital projects before he ever took a listing, and it is the reason this firm runs files the way it does. A project manager does not present a building without the numbers behind it, and does not accept a schedule they have not tested.",
      "As Broker of Record he signs every data agreement, owns the trust accounting, and is the final read on every file that leaves the office. He also holds the firm's builder relationships, which is how Danmar clients see new-construction inventory before it reaches a sales centre.",
    ],
  },
  {
    slug: "daniel-sheikhan", name: "Daniel Sheikhan, B.Comm., J.D.", role: "Managing Partner & Broker",
    line: "Leads asset management, investment and the commercial practice.",
    creds: ["Broker", "Barrister & Solicitor (Ontario)", "Attorney at Law (New York)", "Attorney at Law (Minnesota)", "B.Comm."],
    focus: ["Asset & portfolio management", "Investment underwriting", "Commercial and industrial"],
    areas: "Greater Toronto Area · Ontario · Cross-border",
    tel: "647 705 6476", email: "daniel@danmarempire.com",
    bio: [
      "Daniel is called to the bar in Ontario and admitted in New York and Minnesota, and holds a commerce degree alongside the law degree. He leads the firm's asset and portfolio management mandates and underwrites every investment file before it reaches a client.",
      "First place at the 2021 International Negotiation Competition, and a Minnesota Qualified Neutral. In practice that means the hard conversations in a transaction are the ones he is most comfortable having.",
      "He acts for clients of the firm as a real estate broker, not as their solicitor.",
    ],
  },
  {
    slug: "anita-tayi", name: "Anita Tayi", role: "Sales Representative",
    line: "Residential resale across Oakville, Burlington and Milton.",
    creds: ["Sales Representative"],
    focus: ["Residential resale", "First-time and move-up buyers", "Halton region"],
    areas: "Oakville · Burlington · Milton",
    tel: "647 308 2996", email: "anitatayi@danmarempire.com",
    bio: [
      "Anita runs the firm's Halton residential desk. She works a small number of files at a time and is known for knowing which street a family actually wants before they do.",
    ],
  },
  {
    slug: "anna-shea", name: "Anna Shea", role: "Sales Representative",
    line: "New construction and builder inventory.",
    creds: ["Sales Representative"],
    focus: ["New construction", "Pre-construction assignments", "Builder allocations"],
    areas: "Greater Toronto Area",
    tel: "647 502 2482", email: "anna@danmarempire.com",
    bio: [
      "Anna handles the firm's new-construction practice: builder allocations, pre-construction agreements, and the diligence that should happen before an APS is signed rather than after.",
    ],
  },
  {
    slug: "mahmoud-abu-hudra", name: "Mahmoud Abu Hudra", role: "Sales Representative",
    line: "Leasing and investor services, Vaughan and north Toronto.",
    creds: ["Sales Representative"],
    focus: ["Executive leasing", "Investor services", "Industrial and flex"],
    areas: "Vaughan · North Toronto · York Region",
    tel: "647 808 2706", email: "mahmoud@danmarempire.com",
    bio: [
      "Mahmoud works the leasing desk and the investor side of the book out of the Vaughan office, covering the Keele and Highway 7 industrial corridors as well as executive residential.",
    ],
  },
  {
    slug: "sara-sheikhan", name: "Sara Sheikhan", role: "Sales Representative",
    line: "Residential sales, and listing presentation across the firm.",
    creds: ["Sales Representative"],
    focus: ["Residential sales", "Listing presentation", "Photography direction"],
    areas: "Oakville · Vaughan",
    tel: "905 901 5011", email: "sara@danmarempire.com",
    bio: [
      "Sara carries her own residential book and also sets the standard for how every Danmar listing is presented: photography direction, copy, and the campaign that goes around it.",
    ],
  },
  {
    slug: "marion-miral", name: "Marion Miral", role: "Administration",
  },
];

export const OFFICES = [
  { city: "Oakville", addr: "2010 Winston Park Drive, Suite 200", post: "Oakville, ON  L6H 6P5", tel: "905 901 5011" },
  { city: "Oakville", addr: "2380 Bristol Circle, Unit 12", post: "Oakville, ON  L6H 6M5", tel: "905 901 5011" },
  { city: "Vaughan", addr: "9131 Keele Street, Suite A4", post: "Vaughan, ON  L4K 0G7", tel: "905 901 5011" },
];

/* The ownership argument. This is the firm's sharpest differentiator and the
   hardest for a competitor to copy, because copying it means buying the houses.
   Written as a claim about judgment, never about wealth. */
export const OWNERSHIP = {
  eyebrow: "Why our advice is different",
  head: "We own what we advise on.",
  body: [
    "We can tell you what a property costs to run, what a conservation designation does to the buildable envelope, which builder's mechanical fails in year six, and which of two identical-looking lots is worth more in a decade. That knowledge comes from ownership.",
    "The principals of this firm own residential and commercial property in the same markets we broker. We have carried the financing, argued the assessments, replaced the roofs and timed the exits, on our own account. That is where judgment comes from, and it is why our advice does not sound like a listing presentation.",
  ],
  pull: "An opinion is worth roughly what the person giving it has at risk.",
  proof: [
    ["Same markets", "We hold property in the areas we advise on"],
    ["Same asset classes", "Residential, multi-residential, commercial and land"],
    ["Same decisions", "Financing, capital, hold and exit, on our own account"],
  ] as [string, string][],
};

/* Relocation. The brief that walks in the door: a principal arriving from abroad
   who needs someone who actually knows the streets. */
export const RELOCATION = {
  origins: ["United Kingdom", "South Africa", "United States", "Hong Kong and Singapore", "Western Europe", "The Gulf"],
  questions: [
    ["Which areas actually suit us?", "Oakville, King City and the central Toronto ravine neighbourhoods behave nothing like each other. We will tell you which one fits the family you have, not the one that pays best."],
    ["Buy now or lease first?", "Most principals should lease for twelve to twenty-four months. You do not yet know which commute you will hate. We run the leasing desk, so we can say that without losing the transaction."],
    ["Can we even get a mortgage?", "Newly landed, with no Canadian credit file, usually yes, at a different loan-to-value and through a different lender. We will introduce you before you make an offer, not after."],
    ["What about the schools?", "Catchments, the private options, and the waiting lists that actually matter. Checked, not assumed."],
    ["What will it cost to run?", "Land transfer tax on both levels in Toronto, property tax by municipality, insurance on a ravine or waterfront lot, and the annual carry nobody quotes you."],
  ] as [string, string][],
};

export const PILLARS = [
  {
    n: "01", title: "Asset & Portfolio Management",
    line: "Discretionary and advisory management of private real estate portfolios from $10 million to $250 million, domestic and international.",
    detail: "Maturities, expiries, vacancy, capital, structure and tax, on one calendar. Reporting is quarterly, written and reconciled. Cross-border portfolios are coordinated with local counsel rather than left to the owner.",
    stats: [["Mandate size", "$10M – $250M"], ["Scope", "Domestic & international"], ["Reporting", "Quarterly, written"]],
  },
  {
    n: "02", title: "Investment",
    line: "Income property, land with approvals, and single-tenant net lease across Ontario.",
    detail: "Rent roll, stabilised pro forma, environmental and zoning, done before you see it. A buyer who discovers those things during conditions is a buyer who renegotiates.",
    stats: [["Going-in yields", "4.6% – 6.1%"], ["Asset classes", "Multi-res · Net lease · Land"], ["Diligence", "Released under NDA"]],
  },
  {
    n: "03", title: "Private Sales",
    line: "Freehold and estate residential from $1.5 million, including off-market inventory that is never syndicated to the portals.",
    detail: "Photographed and written before they are priced. Held off-market where discretion serves the seller. Taken to a shortlist, not a crowd.",
    stats: [["Median list", "$2.38M"], ["Off-market share", "Roughly one in four"], ["Core markets", "Oakville · Toronto · Vaughan"]],
  },
  {
    n: "04", title: "Executive Leasing",
    line: "Corporate and diplomatic relocation at $10,000 per month and above, placed against verified covenants.",
    detail: "We qualify the guarantee behind the tenant, not a personal credit file. Corporate undertakings, parent-company covenants, diplomatic notes. Delivered furnished where the brief calls for it.",
    stats: [["Average lease", "$12,000+ / month"], ["Typical term", "12 – 36 months"], ["Furnishing", "+30% – 45% of base rent"]],
  },
];

/* Furnishing is a real revenue line and a real differentiator. Retailers are named
   as the sourcing route, never with logos and never implying a partnership or
   an affiliate arrangement that does not exist. */
export const FURNISHING = {
  uplift: "30% to 45%",
  sources: ["CB2", "Crate & Barrel", "Anthropologie", "RH"],
  note: "Delivered fully furnished for an additional 30% to 45% of base rent. We specify and install it ourselves, through CB2, Crate & Barrel, Anthropologie and RH. A family arriving with suitcases needs nothing on day one.",
};

/* Tenant profile is described by covenant, not by employer logo.
   Naming the relocating employer implies an endorsement Danmar has not been granted,
   and identifies a tenant the brokerage owes confidentiality to. Do not add logos
   without written consent from each relocation department. */
export const COVENANTS = [
  "Fortune 100 retail and consumer goods relocation departments",
  "United States federal agency postings",
  "Canadian and international bank secondments",
  "Consular and diplomatic missions",
  "Professional services partner transfers",
];

/* Areas. SEO weight runs Oakville first, then the wider GTA, then Ontario-wide,
   which is the licensing footprint. Muskoka, Prince Edward County and
   Niagara-on-the-Lake are the Ontario-wide high-end markets. */
export interface Area { slug: string; name: string; region: string; tier: 1 | 2 | 3; note: string; pockets: string[]; }

export const AREAS: Area[] = [
  { slug: "oakville", name: "Oakville", region: "Halton", tier: 1,
    note: "Our home market and our deepest book. Lakefront, ravine and estate lots, and the executive-lease stock that serves the corporate corridor.",
    pockets: ["Old Oakville", "Bronte", "Joshua Creek", "Southwest Oakville", "Morrison", "Eastlake", "Glen Abbey"] },
  { slug: "toronto", name: "Toronto", region: "City of Toronto", tier: 1,
    note: "Estate residential and the executive lease market. Central ravine neighbourhoods, and the downtown towers where corporate relocations land.",
    pockets: ["The Bridle Path", "Forest Hill", "Rosedale", "Yorkville", "Lawrence Park", "Hoggs Hollow", "The Kingsway", "King West"] },
  { slug: "vaughan", name: "Vaughan", region: "York", tier: 2,
    note: "Our second office, and the centre of the commercial and industrial book along the Keele and Highway 7 corridors. Estate residential concentrated in Kleinburg.",
    pockets: ["Kleinburg", "Woodbridge", "Vaughan Enterprise Zone"] },
  { slug: "king-city", name: "King City", region: "King Township", tier: 1,
    note: "Ten-acre minimums, equestrian properties, the Oak Ridges Moraine. The least liquid and most privately traded market in the GTA.",
    pockets: ["King City", "Nobleton", "Schomberg", "Oak Ridges Moraine"] },
  { slug: "mississauga", name: "Mississauga", region: "Peel", tier: 2,
    note: "Lorne Park and Mineola for estate residential; Airport Corporate and Cooksville for income property.",
    pockets: ["Lorne Park", "Mineola", "Port Credit", "Streetsville", "Airport Corporate"] },
  { slug: "burlington", name: "Burlington", region: "Halton", tier: 2,
    note: "Lakeshore estate residential and the escarpment properties above it.",
    pockets: ["Roseland", "Shoreacres", "Tyandaga", "Aldershot"] },
  { slug: "caledon", name: "Caledon & Aurora", region: "Peel / York", tier: 2,
    note: "Acreage, hobby farms and the estate subdivisions on the moraine.",
    pockets: ["Caledon East", "Palgrave", "Aurora Estates", "South Richvale"] },
  { slug: "muskoka", name: "Muskoka", region: "Cottage Country", tier: 3,
    note: "The Big Three lakes. Boathouse frontage, shoreline road allowance and the assignment market, each with rules of its own.",
    pockets: ["Lake Joseph", "Lake Rosseau", "Lake Muskoka", "Port Carling", "Windermere"] },
  { slug: "niagara", name: "Niagara & Prince Edward County", region: "Southern Ontario", tier: 3,
    note: "Estate wineries, agricultural land with severance potential, and the hospitality assets attached to both.",
    pockets: ["Niagara-on-the-Lake", "St. Davids", "Wellington", "Bloomfield"] },
  { slug: "georgian-bay", name: "Collingwood & Georgian Bay", region: "Simcoe / Grey", tier: 3,
    note: "Ski-in chalets, Georgian Bay waterfront and the short-term rental stock around Blue Mountain.",
    pockets: ["Blue Mountain", "Thornbury", "Craigleith", "Honey Harbour"] },
];

/* Track record. Every entry needs written consent from the relevant party before
   it is published: RECO treats advertising a sold property as requiring consent
   from the seller (pre-close) or the buyer (post-close), and from both where
   price is shown. Add a marketing-consent clause to the listing agreement and
   this section becomes the strongest page on the site. */
export interface Record_ { id: string; place: string; city: string; list: number; kind: "Sold" | "Leased"; year: string; type: string; hue: number; photo: string; note: string; }

export const TRACK: Record_[] = [
  { id: "t1", place: "Park Lane Circle", city: "The Bridle Path, Toronto", list: 14800000, kind: "Sold", year: "2025", type: "Estate residence", hue: 148, photo: U("Z-hiM9VFak0"), note: "Represented the vendor. Sold privately, never listed on the system." },
  { id: "t2", place: "Lake Joseph", city: "Muskoka Lakes", list: 9250000, kind: "Sold", year: "2025", type: "Waterfront cottage", hue: 190, photo: U("mcSZ1pNmUNU"), note: "Two-slip boathouse with sleeping cabin above." },
  { id: "t3", place: "Lakeshore Road West", city: "Southwest Oakville", list: 7400000, kind: "Sold", year: "2026", type: "Lakefront residence", hue: 186, photo: U("jFRlus8c1gk"), note: "Represented the purchaser against three competing offers." },
  { id: "t4", place: "The Kleinburg Estate", city: "Kleinburg, Vaughan", list: 6100000, kind: "Sold", year: "2024", type: "Estate residence", hue: 96, photo: U("BBKpQHzrnPc"), note: "Ten acres on the Humber, sold to an end user." },
  { id: "t5", place: "Scollard Street", city: "Yorkville, Toronto", list: 22000, kind: "Leased", year: "2026", type: "Penthouse, furnished", hue: 34, photo: U("rHoMQ87hvIY"), note: "Three-year corporate covenant. Furnished by us." },
  { id: "t6", place: "Post Road", city: "The Bridle Path, Toronto", list: 28500, kind: "Leased", year: "2025", type: "Estate residence", hue: 120, photo: U("Is9zywNUhKg"), note: "Diplomatic tenancy. Full furnishing and staff quarters." },
  { id: "t7", place: "Lorne Park Road", city: "Lorne Park, Mississauga", list: 4850000, kind: "Sold", year: "2025", type: "Estate residence", hue: 108, photo: U("t9eECWSCCXM"), note: "Represented the vendor. Nine days on market." },
  { id: "t8", place: "Old Colony Road", city: "Hoggs Hollow, Toronto", list: 16500, kind: "Leased", year: "2026", type: "Detached, furnished", hue: 168, photo: U("d2hYqpR0YS0"), note: "Bank secondment, two-year term with a renewal." },
];

/* Related practices. This is a conflict disclosure, not a marketing line: RECO and the
   LSO both require that a registrant disclose a financial interest in a service they
   refer a client to. It belongs somewhere visible, not buried in terms. */
export const PRACTICES = [
  { name: "Khan Law Professional Corporation", role: "Real estate closings and transactional advice",
    line: "Residential and commercial closings, title, and transactional advice. Instructed only where a client chooses to, and never as a condition of any transaction with the brokerage." },
  { name: "Daniel & Co. Law Professional Corporation", role: "Corporate and commercial counsel",
    line: "In-house corporate, commercial and advisory work for corporate clients of the group, including holding structure and shareholder arrangements." },
];

export const CITIES = ["Oakville","Burlington","Milton","Mississauga","Brampton","Toronto","Etobicoke","Vaughan","Woodbridge","Maple","Richmond Hill","Markham","Aurora","King City","Pickering","Hamilton"];
