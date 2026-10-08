export type Tier = "Prime" | "Signature" | "Off-Market" | null;
export type Intent = "sale" | "lease";

/** A listing as the pages read it. Every value comes from the PropTx feed through
 *  src/lib/proptx.ts (or a local file in public/photos for photography). There are
 *  no hand-written listings in the repository. */
export interface Listing {
  /** the slug: street address and city, or listing-<mls> when the address is withheld */
  id: string;
  /** the street address (the feed has no property names and none are invented), or the city when withheld */
  name: string;
  address: string;
  city: string;
  region: string;          // neighbourhood / submarket, "" when the feed has none
  price: number;           // monthly if lease
  intent: Intent;
  kind: "Detached" | "Semi-Detached" | "Townhouse" | "Condominium" | "Multi-Residential" | "Commercial" | "Industrial" | "Land";
  useClass: "residential" | "investment";
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  tenure: string;
  tier: Tier;              // null for every feed listing; Prime and Signature are editorial
  status: "Available" | "Conditional" | "Leased" | "Sold";
  lat: number; lng: number;
  features: string[];
  capRate?: number;
  noi?: number;
  standfirst: string;      // "" for feed listings; the pull-quote row hides
  body: string[];          // PublicRemarks, verbatim, as one paragraph
  photo: string;           // first photograph's URL, "" when there is none
  photos?: string[];       // the rest, for the detail page
  hue: number;             // seed for the flat placeholder's tone
  mls?: string;            // ListingId, the MLS® number
  key?: string;            // ListingKey
  /** InternetAddressDisplayYN was N: city and region only, no street anywhere */
  addressWithheld?: boolean;
}

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
/** A person of the firm. Only slug, name and role are required. Every other field
 *  holds what the person or Daniel supplied, in their words; nothing is written
 *  for them, and the pages omit what is absent. Unconfirmed lines are kept in
 *  docs/CONFIRM.md, not here. */
export interface Person {
  slug: string; name: string; role: string;
  /** one line under the name in lists */
  line?: string;
  /** paragraphs, in the person's own words */
  bio?: string[];
  /** paragraphs, plain prose, from supplied facts */
  background?: string[];
  /** one line each: "J.D., <school>", only what is supplied */
  education?: string[];
  /** licences and designations; `creds` is kept as an alias of this */
  certifications?: string[];
  creds?: string[];
  experience?: string[];
  achievements?: string[];
  links?: { label: string; href: string }[];
  /** "/photos/people/<slug>.jpg"; absent means the emblem filler */
  portrait?: string;
  tel?: string; email?: string;
}

/* Order is the order on /firm. */
export const TEAM: Person[] = [
  {
    slug: "martin-sheikhan", name: "Martin Sheikhan, PMP", role: "Broker of Record · Real Estate Broker · Partner",
    tel: "647 273 5177", email: "martin@danmarempire.com",
    portrait: "/photos/people/martin-sheikhan.jpg",
    background: [
      "Martin began about forty-five years ago in tablet formulation and went on to head multi-billion-dollar projects in the pharmaceutical industry. He is a Project Management Professional and a published author. The firm's habit of running every file like a capital project, with the numbers tested before anything is presented, is his.",
    ],
    certifications: ["Broker of Record", "Project Management Professional (PMP)"],
    experience: ["Headed multi-billion-dollar projects in the pharmaceutical industry"],
    achievements: ["Published author"],
  },
  {
    slug: "daniel-sheikhan", name: "Daniel Sheikhan, B.Comm., J.D.", role: "Partner · Barrister & Solicitor · Attorney · Real Estate Broker",
    tel: "647 705 6476", email: "daniel@danmarempire.com",
    portrait: "/photos/people/daniel-sheikhan.jpg",
    bio: ["He acts for clients of the firm as a real estate broker, not as their solicitor."],
    certifications: ["Real Estate Broker", "Barrister & Solicitor (Ontario)", "Attorney at Law (New York)", "Attorney at Law (Minnesota)", "Minnesota Qualified Neutral"],
    education: ["J.D.", "B.Comm."],
    achievements: ["First place, International Negotiation Competition, 2021"],
    links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/danielsheikhan/" }],
  },
  {
    slug: "sara-sheikhan", name: "Sara Sheikhan", role: "Real Estate Salesperson · Property Manager",
    tel: "905 901 5011", email: "sara@danmarempire.com",
    certifications: ["Real Estate Salesperson"],
  },
  {
    slug: "anita-tayi", name: "Anita Tayi", role: "Sales Representative",
    tel: "647 308 2996", email: "anitatayi@danmarempire.com",
    portrait: "/photos/people/anita-tayi.jpg",
    bio: [
      "Anita Tayi is a real estate professional with a passion for helping clients make thoughtful, strategic real estate decisions. She especially enjoys working with families to find homes that not only meet their lifestyle needs today, but also support their long-term financial and wealth-building goals.",
      "Anita also works with small and medium-sized businesses seeking commercial spaces that align with their operational needs, growth plans, and broader business strategy. With an MBA and a background in business operations and strategy, she brings a business-minded perspective to real estate, helping clients consider both the immediate opportunity and the bigger picture.",
      "Known for her client-focused approach, Anita is committed to understanding what matters most to each client and helping them navigate their real estate decisions with confidence.",
    ],
    certifications: ["Sales Representative"],
    links: [
      { label: "Instagram", href: "https://www.instagram.com/anitatayi/" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/anita-tayi-61168912a/" },
    ],
  },
  {
    slug: "anna-shea", name: "Anna Shea", role: "Sales Representative",
    tel: "647 502 2482", email: "anna@danmarempire.com",
    certifications: ["Sales Representative"],
  },
  {
    slug: "mahmoud-abu-hudra", name: "Mahmoud Abu Hudra", role: "Sales Representative",
    tel: "647 808 2706", email: "mahmoud@danmarempire.com",
    portrait: "/photos/people/mahmoud-abu-hudra.jpg",
    certifications: ["Sales Representative"],
  },
  {
    slug: "marion-miral", name: "Marion Miral", role: "Administration",
    portrait: "/photos/people/marion-miral.jpg",
  },
];

/* Client statements, lifted verbatim from the firm's previous site. Attribution
   exactly as published. `about` tags the ones that name Martin. */
export interface Testimonial { quote: string; name: string; about?: "martin-sheikhan" }
export const TESTIMONIALS: Testimonial[] = [
  { quote: "I thank you for all your advice, your time and kindness to us. I know words of thanks and appreciation is not enough for someone who has given so much.", name: "Mark B." },
  { quote: "As a sales professional in the IT arena, I was very impressed with Martin's approach and the results he was able to deliver in a relatively short time. I would strongly recommend him for leasing or selling your home.", name: "Neil D.", about: "martin-sheikhan" },
  { quote: "We LOVE the sold sign on our front lawn, super exciting! You are a very kind man-you live up to your outstanding reputation! Thanks again Martin-you are the absolute best. Choosing to work with you meant choosing to get things done exceeding far beyond our expectations. We couldn't be happier!", name: "Holly & Rafael M.", about: "martin-sheikhan" },
  { quote: "We were very impressed with your achievements and insights. Thank you again for your hard work and dedication.", name: "Min G." },
  { quote: "Your positive attitude and professionalism helped to put this deal together with a minimal amount of stress, not only for our clients but ourselves as well!", name: "Judy S, Realtor" },
  { quote: "Once again I like to take this opportunity to thank you for getting my listing sold, with professionalism and utmost courtesy. My Clients and I really appreciated it thank you.", name: "Nasir M, Realtor\u00ae" },
  { quote: "If there is ONE word that describes Martin Sheikhan, the word is a 'GEM' in the Real Estate profession. My husband and I met Martin by chance at an 'open house', a total stranger who immediately gave us solid advice and prevented us from making a poor decision that might have hurt us in our late life. Martin is a professional in every sense of the word. He works relentlessly to assist and to satisfy his clients. His warm, easy, unassuming, quiet, caring attitude is the magnet that draws people to his business. This is Martin's success factor. It is not what you do in life that is so important, but it is HOW you do it.'A GREAT MAN SHOWS HIS GREATNESS BY THE WAY HE TREATS LITTLE MEN'.Also, business goes where it is invited and stays where it is well treated. Martin later became our real estate agent who sold our house at a very good price. GOD COULD NOT BE EVERYWHERE, SO HE SENT 'ST. MARTIN' to protect and take care of those who needs his help. Martin, for all the kindness and help that you give to others, may it return to you and your family in 10-folds. As the flame of the candle goes upwards, so too, may your life and your business go in the upward direction. -With grateful thanks.", name: "Mala & Bunnie N.", about: "martin-sheikhan" },
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
  {
    n: "05", title: "Corporate Real Estate Capital",
    line: "Sale-leasebacks, surplus property sales and lease restructuring for companies that own the buildings they operate from.",
    detail: "A confidential capital review compares a sale-leaseback against refinancing, an outright sale and holding, in writing, before anything is decided. Danmar does not arrange mortgages; where refinancing is the better route, we refer you to a licensed mortgage brokerage.",
    stats: [["For", "Owner-occupier companies"], ["Work", "Sale-leaseback · Surplus sales · Leases"], ["Market", "Ontario"]],
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
  { id: "t1", place: "Park Lane Circle", city: "The Bridle Path, Toronto", list: 14800000, kind: "Sold", year: "2025", type: "Estate residence", hue: 148, photo: "", note: "Represented the vendor. Sold privately, never listed on the system." },
  { id: "t2", place: "Lake Joseph", city: "Muskoka Lakes", list: 9250000, kind: "Sold", year: "2025", type: "Waterfront cottage", hue: 190, photo: "", note: "Two-slip boathouse with sleeping cabin above." },
  { id: "t3", place: "Lakeshore Road West", city: "Southwest Oakville", list: 7400000, kind: "Sold", year: "2026", type: "Lakefront residence", hue: 186, photo: "", note: "Represented the purchaser against three competing offers." },
  { id: "t4", place: "The Kleinburg Estate", city: "Kleinburg, Vaughan", list: 6100000, kind: "Sold", year: "2024", type: "Estate residence", hue: 96, photo: "", note: "Ten acres on the Humber, sold to an end user." },
  { id: "t5", place: "Scollard Street", city: "Yorkville, Toronto", list: 22000, kind: "Leased", year: "2026", type: "Penthouse, furnished", hue: 34, photo: "", note: "Three-year corporate covenant. Furnished by us." },
  { id: "t6", place: "Post Road", city: "The Bridle Path, Toronto", list: 28500, kind: "Leased", year: "2025", type: "Estate residence", hue: 120, photo: "", note: "Diplomatic tenancy. Full furnishing and staff quarters." },
  { id: "t7", place: "Lorne Park Road", city: "Lorne Park, Mississauga", list: 4850000, kind: "Sold", year: "2025", type: "Estate residence", hue: 108, photo: "", note: "Represented the vendor. Nine days on market." },
  { id: "t8", place: "Old Colony Road", city: "Hoggs Hollow, Toronto", list: 16500, kind: "Leased", year: "2026", type: "Detached, furnished", hue: 168, photo: "", note: "Bank secondment, two-year term with a renewal." },
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
