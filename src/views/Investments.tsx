import { PILLARS } from "@/lib/data";
import { practiceImage } from "@/lib/photos";
import { href } from "@/lib/routes";
import { Practice, PracticeLink } from "@/components/Practice";

/* Investment: built from the Asset Management template. Whole-page forest. */

const PROCESS = [
  { title: "Mandate", text: "We take a written mandate that states the return you need, the hold period, and the leverage you can actually get. Vague mandates produce vague inventory." },
  { title: "Underwriting", text: "Rent roll, estoppels, environmental, zoning envelope and a stabilised pro forma before anything is shown. If an asset fails here you never see it." },
  { title: "Structure", text: "Most of our investment files close through a corporation or a co-ownership. We work alongside your counsel and accountant on the holding structure before the offer, not after." },
  { title: "Execution", text: "Conditions are written to protect the underwriting we have already done rather than to buy time to start it." },
];

export function Investments() {
  const pillar = PILLARS[1];
  return (
    <Practice
      tone="forest"
      id="investments"
      path={href("investments")}
      photo={practiceImage("investments")}
      eyebrow="Investment"
      headline={["Underwritten before it is listed."]}
      italic="Rent roll, zoning and pro forma, before you see it."
      intro={[
        "We act for private capital buying income property, land with approvals in hand, and single-tenant net lease across the Greater Toronto Area and the Ontario secondary markets. Diligence is done at our cost before an asset reaches you.",
        "Rent rolls, estoppel certificates, environmental reports and building condition assessments are released under a confidentiality agreement, not published. Off-market mandates are not listed on this site at all. If you are looking for something specific, the fastest route is to tell us the return and the hold, and let us check the book.",
      ]}
      numbers={pillar.stats}
      numbersNote={pillar.statsNote}
      sections={[{ heading: "Four steps, in this order, without exception.", items: PROCESS }]}
      close={{
        headline: "Tell us the return and the hold.",
        enquire: "Request a mandate call",
        login: "Investor login",
        aside: (
          <>
            <PracticeLink href={href("collection")} dark>Current mandates are in the Collection</PracticeLink>
            <PracticeLink href={href("capital")} dark>Own the building you operate from? Corporate real estate capital</PracticeLink>
          </>
        ),
      }}
      service={{ name: "Investment property sales and acquisition", type: "Real estate investment advisory", description: "Underwriting and execution on income property, land with approvals and net-leased assets across the Greater Toronto Area and Ontario." }}
    />
  );
}
