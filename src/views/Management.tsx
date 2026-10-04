import { PILLARS } from "@/lib/data";
import { href } from "@/lib/routes";
import { Practice, PracticeLink } from "@/components/Practice";

/* Asset and portfolio management: the template the other practice pages follow.
   Whole-page forest. The one place on the site, with the metadata, that may say
   "high-net-worth and ultra-high-net-worth (UHNW)", once. */

const SERVICES = [
  { title: "Portfolio construction", text: "We start from the return you need and the risk you can actually carry, then build toward it: asset class weighting, leverage policy, geographic concentration limits, and a disposal calendar rather than a vague intention to hold." },
  { title: "Financing and capital calendar", text: "Every mortgage maturity, every lease expiry and every capital item on one calendar, worked eighteen months forward. Refinancing is arranged before a renewal window closes, not during it." },
  { title: "Operating oversight", text: "Property management is supervised rather than assumed. We review the operating statements, challenge the variances, tender the recurring contracts, and report what actually happened against what was budgeted." },
  { title: "Structure and tax coordination", text: "Holding structure, inter-corporate flows, and the question of which entity should own what. We work alongside your accountant and counsel rather than in place of them, and we say plainly when a question belongs to them." },
  { title: "Acquisition and disposition", text: "Sourcing, underwriting and execution through the firm's investment desk, with the brokerage acting on the trade where a trade in real estate is involved." },
  { title: "International portfolios", text: "Cross-border holdings coordinated with local counsel, local managers and local tax advice. The principal is licensed in Ontario, New York and Minnesota, which shortens the conversation on North American files considerably." },
];

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
      intro={[
        "We manage private real estate portfolios from $10 million to $250 million, in Ontario and abroad, on a discretionary or advisory basis. The work is unglamorous and it is the work that compounds: maturities, expiries, vacancy, capital, structure and tax, tracked on one calendar and reported in writing.",
        "Mandates are typically held by high-net-worth and ultra-high-net-worth (UHNW) families, private holding companies and the advisors who act for them.",
        "Each quarter you receive a written report: position by asset, income against budget, occupancy and lease expiry schedule, debt schedule with maturities, capital spent and committed, and a recommendation list with our reasoning attached. It is reconciled to the operating accounts before it is sent.",
      ]}
      numbers={pillar.stats}
      sections={[{ heading: "What we actually do, in the order it gets done.", items: SERVICES }]}
      close={{
        headline: "Tell us what the portfolio needs.",
        enquire: "Request a mandate call",
        login: "Client login",
        aside: <PracticeLink href={href("investments")} dark>The investment practice</PracticeLink>,
      }}
      note="Asset and portfolio management is advisory and administrative work carried out for the owner of the portfolio. Where a mandate involves a trade in real estate, that trade is carried out by Danmar Empire Real Estate Corp., Brokerage. We do not offer securities, pooled investment products, or interests in any fund, and nothing on this page is an offer to do so."
      service={{ name: "Real estate asset and portfolio management", type: "Asset management", description: "Discretionary and advisory management of private real estate portfolios from $10 million to $250 million, domestic and international." }}
    />
  );
}
