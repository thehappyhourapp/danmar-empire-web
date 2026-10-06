import { PILLARS } from "@/lib/data";
import { photo } from "@/lib/photos";
import { href } from "@/lib/routes";
import { GRID, delay } from "@/components/Chapter";
import { FaqRows, faqJsonLd } from "@/components/Faq";
import type { Faq } from "@/components/Faq";
import { ImageFrame } from "@/components/ImageFrame";
import { Practice, PracticeLink, practiceTones } from "@/components/Practice";
import s from "@/components/motion.module.css";

/* Asset and portfolio management: the page Daniel sends to accountants, bankers
   and business owners who ask what the firm does. Whole-page forest. It answers
   the question in the first screen, leads with succession, carries the
   capital-at-work argument as a labelled illustration, and makes property
   management a separate page. The one place on the site, with the metadata,
   that may say "high-net-worth and ultra-high-net-worth (UHNW)", once. */

const t = practiceTones("forest");

const SERVICES = [
  { title: "Portfolio construction", text: "We start from the return you need and the risk you can actually carry, then build toward it: asset class weighting, leverage policy, geographic concentration limits, and a disposal calendar rather than a vague intention to hold." },
  { title: "Financing and capital calendar", text: "Every mortgage maturity, every lease expiry and every capital item on one calendar, worked eighteen months forward. Refinancing is arranged before a renewal window closes, not during it." },
  { title: "Operating oversight", text: "Property management is supervised rather than assumed. We review the operating statements, challenge the variances, tender the recurring contracts, and report what actually happened against what was budgeted." },
  { title: "Structure and tax coordination", text: "Holding structure, inter-corporate flows, and the question of which entity should own what. We work alongside your accountant and counsel rather than in place of them, and we say plainly when a question belongs to them." },
  { title: "Acquisition and disposition", text: "Sourcing, underwriting and execution through the firm's investment desk, with the brokerage acting on the trade where a trade in real estate is involved." },
  { title: "International portfolios", text: "Cross-border holdings coordinated with local counsel, local managers and local tax advice. The principal is licensed in Ontario, New York and Minnesota, which shortens the conversation on North American files considerably." },
];

const POSITION = [
  { title: "Built over thirty years. Run by someone other than the family.", text: "Many of our mandates come from owners who built a portfolio over decades and would rather see it run professionally than handed to the next generation untested. We run it, report to the family in writing every quarter, and bring the family in when they want to be." },
  { title: "Lawyer-led.", text: "Mandates are led by Daniel Sheikhan, a lawyer licensed in Ontario, New York and Minnesota, with a finance degree and a real estate licence. Danmar does not provide legal services; your own counsel, accountant and auditor stay in their seats. The training shows in how leases, financing and structures are read before money moves." },
];

const BANKING = [
  { title: "The rest of the table.", text: "When a portfolio is over-concentrated or under-financed we introduce lenders, private credit and advisers, and we sit on your side of the table. Danmar does not arrange mortgages." },
];

/* The capital-at-work argument, with rounded figures. Not a recommendation. */
const CAPITAL: [string, string][] = [
  ["A", "Two condos, owned outright. $1,000,000 combined. About $30,000 a year net after fees, tax, insurance and vacancy. Roughly 3%."],
  ["B", "The same $1,000,000 as the equity in $3,000,000 of property, three houses or one commercial building, at a 5.5 to 6% cap rate. Net operating income around $170,000; debt service on $2,000,000 around $130,000; cash left over much the same as the condos."],
  ["C", "The difference: principal paydown and appreciation now work on $3,000,000 instead of $1,000,000. Leverage triples what works for you and what works against you. Whether to do it is the question we are paid to answer. This page does not recommend it."],
];

const SCREENS: [file: string, caption: string][] = [
  ["holdings", "Every holding, its debt and its net equity on one page."],
  ["cash", "Cash position projected thirty and ninety days out."],
  ["allocation", "Allocation by sector, owner and geography."],
];

const FAQ: Faq[] = [
  ["What is the difference between asset management and property management?", "Asset management is the financial side: what each property earns after everything, whether the capital should stay where it is, and what to buy, hold, refinance or sell. Property management is the operating side: tenants, rent, repairs and contractors. We offer both; they are separate engagements."],
  ["Who is this for?", "Families and holding companies with several properties, usually ten million dollars or more in total, who want one party accountable for the whole portfolio."],
  ["How do you report?", "In writing, every quarter: position by asset, income against budget, occupancy and lease expiries, debt and maturities, capital spent and committed, and a recommendation list with the reasoning attached, reconciled to the operating accounts."],
  ["Do you take custody of funds?", "No. Accounts stay in the client's name. We instruct and report; the client signs."],
  ["How are you paid?", "By a management fee agreed in writing, and in some mandates a success fee on transactions. Terms are set out before any work begins."],
];

function CapitalAtWork() {
  return (
    <div className="col-span-12 mt-20 lg:mt-28">
      <p className={`meta mb-6 ${t.brass}`}>Illustrative example, not a client transaction.</p>
      <div>
        {CAPITAL.map(([k, text], i) => (
          <div key={k} data-reveal className={`${s.rise} ${GRID} border-t ${t.rule} py-8 last:border-b md:py-10`} style={delay(i)}>
            <span className={`fig col-span-2 text-[clamp(1.4rem,2.2vw,1.9rem)] leading-[1.1] ${t.brass} md:col-span-1`}>{k}</span>
            <p className={`col-span-10 max-w-[48ch] text-[16px] leading-[1.85] md:col-span-7 md:col-start-5 ${t.body}`}>{text}</p>
          </div>
        ))}
      </div>
      <p className={`meta mt-6 max-w-[60ch] leading-[1.9] ${t.meta}`}>
        Illustration with rounded figures. Assumes 33% equity, a 5.5 to 6% capitalisation rate and roughly 6% debt cost. Not advice. Your numbers will differ.
      </p>
    </div>
  );
}

function Software() {
  return (
    <div className="col-span-12 mt-20 lg:mt-28">
      <div data-reveal className={`${s.rise} ${GRID} border-t ${t.rule} py-8 md:py-10`}>
        <h3 className="col-span-12 font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-[1.1] md:col-span-5">Our own software.</h3>
        <p className={`col-span-12 mt-4 max-w-[48ch] text-[15px] leading-[1.85] md:col-span-6 md:col-start-7 md:mt-0 ${t.body}`}>
          We built the reporting platform we use. Each family sees its own portfolio, nothing else, and the quarterly report is produced from it rather than from a spreadsheet.
        </p>
      </div>
      {/* three 16:10 frames, flat until the screenshots exist in public/photos/app/ */}
      <div className={`${GRID} gap-y-10 border-b ${t.rule} pb-10`}>
        {SCREENS.map(([file, caption], i) => (
          <figure key={file} data-reveal className={`${s.rise} col-span-12 md:col-span-4`} style={delay(i)}>
            <ImageFrame src={photo(`/photos/app/${file}.jpg`)} ratio="16/10" alt={caption} fallback="flat" ground="forest" />
            <figcaption className={`meta mt-4 ${t.meta}`}>{caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function Management() {
  const pillar = PILLARS[0];
  return (
    <Practice
      tone="forest"
      id="management"
      path={href("management")}
      eyebrow="Asset & Portfolio Management"
      headline={["Someone has to hold the whole portfolio in view."]}
      italic="Maturities, expiries, capital and tax, on one calendar."
      lead={{
        title: "What this is.",
        text: "Wealth and asset management is the numbers side of owning property: what each holding earns after tax, debt, repairs and vacancy; whether the capital in it could work harder elsewhere; and what the whole portfolio should look like in five years. It is not property management, which we also do, separately.",
      }}
      intro={[
        "We manage private real estate portfolios from $10 million to $250 million, in Ontario and abroad, on a discretionary or advisory basis. The work is unglamorous and it is the work that compounds: maturities, expiries, vacancy, capital, structure and tax, tracked on one calendar and reported in writing.",
        "Mandates are typically held by high-net-worth and ultra-high-net-worth (UHNW) families, private holding companies and the advisors who act for them.",
        "Each quarter you receive a written report: position by asset, income against budget, occupancy and lease expiry schedule, debt schedule with maturities, capital spent and committed, and a recommendation list with our reasoning attached. It is reconciled to the operating accounts before it is sent.",
      ]}
      numbers={pillar.stats}
      sections={[
        { items: POSITION, numbered: false },
        { node: <CapitalAtWork /> },
        { items: BANKING, numbered: false },
        { node: <Software /> },
        { heading: "What we actually do, in the order it gets done.", items: SERVICES },
        { node: <FaqRows tone="forest" items={FAQ} /> },
      ]}
      close={{
        headline: "Tell us what the portfolio needs.",
        enquire: "Request a mandate call",
        login: "Client login",
        aside: (
          <>
            <PracticeLink href={href("property")} dark>Property management, separately</PracticeLink>
            <PracticeLink href={href("investments")} dark>The investment practice</PracticeLink>
          </>
        ),
      }}
      note="Asset and portfolio management is advisory and administrative work carried out for the owner of the portfolio. Where a mandate involves a trade in real estate, that trade is carried out by Danmar Empire Real Estate Corp., Brokerage. We do not offer securities, pooled investment products, or interests in any fund, and nothing on this page is an offer to do so."
      service={{ name: "Real estate asset and portfolio management", type: "Asset management", description: "Discretionary and advisory management of private real estate portfolios from $10 million to $250 million, domestic and international." }}
      jsonLd={[faqJsonLd(FAQ)]}
    />
  );
}
