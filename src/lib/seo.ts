/* Per-page SEO. This is the source of truth for titles, descriptions and the
   H1 that should sit on each route; the production build should read the same
   map rather than re-inventing it.

   A note on "ultra-high-net-worth". Daniel asked for it spelled out for search,
   and it is worth ranking for: the phrase is searched by relocation consultants,
   family-office staff and wealth managers, which is exactly who refers this
   kind of file. It is NOT worth saying in brand voice. People with that much
   money do not describe themselves that way, and a brokerage that does sounds
   like it is auditioning. So the phrase lives in <title>, meta description and
   the occasional sub-heading on the pages where it is literally true
   (asset management, relocation, $5M+ private sales) and nowhere else. */

export interface Meta { title: string; description: string; canonical: string; }

const SUFFIX = "Danmar Empire Real Estate Corp., Brokerage";

export const SEO: Record<string, Meta> = {
  home: {
    title: `Lawyer-Led Real Estate & Investment Group | Oakville, King City & Toronto | ${SUFFIX}`,
    description:
      "Lawyer-led real estate brokerage and investment group. Over $1 billion transacted since 2016. Private sales, executive leasing from $10,000/month, income property and portfolio management across Oakville, King City, Toronto and the GTA.",
    canonical: "/",
  },
  management: {
    title: `Real Estate Asset & Portfolio Management for Ultra-High-Net-Worth Families | ${SUFFIX}`,
    description:
      "Discretionary and advisory management of private real estate portfolios from $10 million to $250 million, domestic and international. Built for high-net-worth and ultra-high-net-worth (UHNW) families and their advisors.",
    canonical: "/asset-management",
  },
  investments: {
    title: `Income Property, Land & Net Lease Investment Sales, Ontario | ${SUFFIX}`,
    description:
      "Underwriting and execution on income property, land with approvals and net-leased assets across the Greater Toronto Area and Ontario. Going-in yield, capital plan and exit modelled before we recommend a bid.",
    canonical: "/investments",
  },
  leasing: {
    title: `Executive & Luxury Home Leasing from $10,000/Month | Oakville, Toronto, King City | ${SUFFIX}`,
    description:
      "Executive leasing for corporate and diplomatic relocation, $10,000 per month and up. Fully furnished for an additional 30% to 45% of base rent. Covenant-qualified tenants placed across Oakville, King City and Toronto.",
    canonical: "/executive-leasing",
  },
  relocating: {
    title: `Relocating to Toronto & the GTA | Private Client Relocation for UHNW Families | ${SUFFIX}`,
    description:
      "Advising high-net-worth and ultra-high-net-worth (UHNW) families relocating to Oakville, King City and Toronto from the UK, South Africa, the United States, Asia, Europe and the Gulf. Areas, leasing, lenders, schools and carrying costs, answered before you commit.",
    canonical: "/relocating",
  },
  collection: {
    title: `Luxury Homes & Estates for Sale and Lease | Oakville, King City, Toronto | ${SUFFIX}`,
    description:
      "A curated collection of freehold and estate residential from $1.5 million, executive leases and commercial investment currently available through the firm.",
    canonical: "/collection",
  },
  areas: {
    title: `Luxury Real Estate Areas: Oakville, King City, Toronto & Ontario | ${SUFFIX}`,
    description:
      "The high-end Ontario markets we work in, pocket by pocket: Oakville, King City, central Toronto, Muskoka, Niagara-on-the-Lake and Prince Edward County, with what actually drives value in each.",
    canonical: "/areas",
  },
  track: {
    title: `Track Record: Over $1 Billion in Ontario Real Estate Sold & Leased | ${SUFFIX}`,
    description:
      "Selected residential, commercial and land transactions completed by the firm since 2016, with locations and list prices, published with client consent.",
    canonical: "/track-record",
  },
  firm: {
    title: `The Firm: Lawyer-Led and Family-Owned | ${SUFFIX}`,
    description:
      "A boutique investment and real estate group in Oakville and Vaughan, named for its founders, a father and a son, and led by a principal called to the bar in Ontario, New York and Minnesota. Family-owned.",
    canonical: "/firm",
  },
  journal: {
    title: `Journal: Ontario Real Estate Analysis & Market Notes | ${SUFFIX}`,
    description:
      "What the firm actually thinks about Ontario real estate: yields, lending conditions, lease covenants and the high-end market in Oakville, King City and Toronto.",
    canonical: "/journal",
  },
  contact: {
    title: `Contact: Oakville & Vaughan Offices | ${SUFFIX}`,
    description:
      "Offices in Oakville and Vaughan. Start a conversation about a purchase, a sale, an executive lease or a portfolio mandate; someone from the desk replies inside one business day.",
    canonical: "/contact",
  },
  property: {
    title: `Property Management, Greater Toronto Area | ${SUFFIX}`,
    description:
      "Day-to-day management for owners of rental units, buildings and small portfolios across the GTA: rent collection, tenants, repairs, contractors and paperwork, with a monthly statement. A separate service from asset management, run by the same firm.",
    canonical: "/property-management",
  },
  capital: {
    title: `Sale-Leaseback & Corporate Real Estate Advisory, Ontario | ${SUFFIX}`,
    description:
      "Danmar advises Ontario owner-occupier companies on sale-leasebacks, surplus property sales and lease restructuring. Book a confidential capital review.",
    canonical: "/corporate-real-estate-capital",
  },
  privacy: {
    title: `Privacy | ${SUFFIX}`,
    description: "How Danmar Empire Real Estate Corp., Brokerage handles what you send through this site: what is collected, why, who sees it and how to ask for it to be removed.",
    canonical: "/privacy",
  },
  notfound: {
    title: `Page Not Found | ${SUFFIX}`,
    description: "There is nothing at this address. The Collection and the rest of the site are a link away.",
    canonical: "/404",
  },
  dataroom: {
    title: `Client Data Room | ${SUFFIX}`, description: "Secure document access for active mandates.", canonical: "/data-room",
  },
};

export function metaFor(page: string): Meta {
  return SEO[page] ?? SEO.home;
}
