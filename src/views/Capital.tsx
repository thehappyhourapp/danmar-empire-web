import { TEAM } from "@/lib/data";
import { estimate, money } from "@/lib/estimator";
import { SITE } from "@/lib/metadata";
import { href } from "@/lib/routes";
import { GRID, HEAD, Lines, delay } from "@/components/Chapter";
import { FaqRows, faqJsonLd } from "@/components/Faq";
import type { Faq } from "@/components/Faq";
import { ImageFrame } from "@/components/ImageFrame";
import { Practice, PracticeRows, practiceTones } from "@/components/Practice";
import { Bars } from "@/components/capital/Bars";
import { CapitalForm } from "@/components/capital/CapitalForm";
import { CapitalProvider } from "@/components/capital/CapitalContext";
import { ComparisonTable } from "@/components/capital/ComparisonTable";
import { Estimator } from "@/components/capital/Estimator";
import { TrackLink } from "@/components/capital/TrackLink";
import s from "@/components/motion.module.css";

/* Corporate real estate capital: the fifth practice, for CFOs and owners of
   companies that own the buildings they operate from. Whole-page forest, the
   Practice template, every section in the brief's order, the estimator as the
   centrepiece and the form as the close. Unconfirmed facts are left out and
   listed in docs/CONFIRM.md. */

const t = practiceTones("forest");
const BROKERAGE = "Danmar Empire Real Estate Corp., Brokerage";
const anchor = { scrollMarginTop: "calc(var(--stick) + 24px)" } as React.CSSProperties;

const TRIGGERS = [
  "Tariffs or margin pressure are squeezing working capital.",
  "You are funding an expansion, acquisition or buyout.",
  "A loan maturity or covenant reset is coming.",
  "The owners are planning succession.",
  "You own more space than you use.",
  "Your lease renewal is approaching and you want leverage.",
].map((title) => ({ title }));

const SERVICES = [
  { title: "Sale-leaseback", text: "Sell your building to an investor and lease it back on terms negotiated for your business.", points: ["Release most of the property's value as cash.", "A long-term lease with renewal options, so you stay in place.", "A competitive, confidential investor process."] },
  { title: "Surplus and non-core property sales", text: "Sell land or buildings you no longer need, without disrupting operations.", points: ["Pricing and timing analysis.", "Confidential marketing to qualified buyers.", "Negotiation through to closing."] },
  { title: "Lease restructuring and renewals", text: "Renegotiate the space you lease, before the landlord sets the terms.", points: ["Blend-and-extend and renewal negotiations.", "Market rent analysis.", "Relocation and consolidation options."] },
  { title: "Buy, lease or expand", text: "Decide whether to own or lease your next site, then execute.", points: ["Buy-versus-lease analysis with your finance team.", "Site search and acquisition.", "Lease or purchase negotiation."] },
];

const PROCESS = [
  { title: "Confidential capital review", text: "A 45-minute call and a look at your property, financials and goals. Free. NDA on request." },
  { title: "Capital options memo", text: "A written comparison of a sale-leaseback, refinancing (indicative, for comparison), an outright sale and holding." },
  { title: "Confidential market process", text: "Qualified net-lease investors and buyers are approached without your company's name until you approve." },
  { title: "Negotiation", text: "Price, rent, lease term, rent increases, renewal options, repair obligations and any buyback rights." },
  { title: "Closing", text: "Your counsel and accountant handle their parts; we manage the process to close." },
];

const MEMO = [
  "The market value range, and the rent your site can support.",
  "Net proceeds under each option, before tax.",
  "Proposed lease terms: length, rent increases, renewals and repairs.",
  "The likely investor and buyer universe.",
  "Tax and accounting points to raise with your advisers.",
  "The timeline, and our fee, in writing.",
];

const FAQ: Faq[] = [
  ["What is a sale-leaseback?", "You sell a property your business operates from to an investor and sign a long-term lease to stay. You receive the sale proceeds and keep using the site."],
  ["Do we lose control of our building?", "You give up ownership but keep the right to occupy under the lease. We negotiate renewal options, permitted uses and alteration rights so operations are protected."],
  ["How long is the lease?", "Terms are negotiated case by case. Longer terms usually support a higher sale price. We model several options in the memo."],
  ["Can we buy the building back later?", "Buyback rights can be negotiated, but they can change the accounting treatment. Raise this with your auditor before agreeing to one."],
  ["What are the tax consequences?", "Selling can trigger capital gains and recapture of depreciation on the building. We show proceeds before tax and work with your accountant on the after-tax result."],
  ["Will this affect our bank?", "Sale proceeds usually repay the existing mortgage. Your lender may treat the lease as an obligation in its covenants, so speak to your lender early."],
  ["How confidential is the process?", "Investors see an anonymized summary first. Your company is named only after you approve each party, and we sign NDAs on request."],
  ["Do you arrange financing?", "No. Danmar does not arrange mortgages. Where refinancing looks better, we refer you to a licensed mortgage brokerage."],
  ["What does it cost?", "The review is free. Our fee is success-based and agreed in writing before work starts."],
];

/* The worked example from the brief: a $12M plant with a $3M mortgage, computed
   with the estimator's own arithmetic so the page and the tool never disagree. */
const EXAMPLE = estimate({ value: 12_000_000, mortgage: 3_000_000, ltv: 0.65, costs: 0.03, cap: 0.065 });

function Head({ lines, id }: { lines: string[]; id?: string }) {
  return <div id={id} style={id ? anchor : undefined}><Lines lines={lines} className={`${HEAD} mb-10 max-w-[22ch] lg:mb-14`} /></div>;
}

function Comparison() {
  return (
    <div className="col-span-12 mt-20 lg:mt-28">
      <Head lines={["Sale-leaseback or refinance?", "A fair comparison."]} />
      <p className={`mb-10 max-w-[48ch] text-[16px] leading-[1.85] ${t.body}`}>Both release capital from a building you own. They work very differently.</p>
      <ComparisonTable />
      <p className={`meta mt-6 max-w-[60ch] leading-[1.9] ${t.meta}`}>
        We compare both routes in every review. Danmar does not arrange mortgages or refinancing. Where refinancing is the better route, we refer you to a licensed mortgage brokerage. Speak to your accountant and auditor about tax and accounting treatment.
      </p>
    </div>
  );
}

function EstimatorSection() {
  return (
    <div className="col-span-12 mt-20 lg:mt-28">
      <Head id="estimator" lines={["Estimate your capital unlock."]} />
      <p className={`mb-10 max-w-[48ch] text-[16px] leading-[1.85] ${t.body}`}>A quick, indicative comparison. No email required.</p>
      <Estimator />
    </div>
  );
}

function Memo() {
  return (
    <div className="col-span-12 mt-20 lg:mt-28">
      <Head lines={["Your capital options memo."]} />
      <p className={`mb-10 max-w-[48ch] text-[16px] leading-[1.85] ${t.body}`}>Every review ends with a written memo your CFO can take to the board.</p>
      <div>
        {MEMO.map((m, i) => (
          <p key={m} data-reveal className={`${s.rise} ${GRID} border-t ${t.rule} py-6 last:border-b`} style={delay(i)}>
            <span className={`col-span-12 text-[16px] leading-[1.7] md:col-span-8 md:col-start-2 ${t.body}`}>{m}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

function Example() {
  return (
    <div className={`col-span-12 mt-20 ${GRID} border-y ${t.rule} py-10 lg:mt-28 lg:py-12`}>
      <div className="col-span-12 md:col-span-5">
        <p className={`meta ${t.brass}`}>Illustrative example, not a client transaction.</p>
        <p className={`mt-6 max-w-[48ch] text-[16px] leading-[1.85] ${t.body}`}>
          A GTA manufacturer owns a 60,000 sq ft plant worth $12M, with a $3M mortgage.
        </p>
        <p className={`mt-5 max-w-[48ch] text-[16px] leading-[1.85] ${t.body}`}>
          Refinance at 65% loan-to-value: about <span className="fig tabular-nums text-brass-light">{money(EXAMPLE.refinance)}</span> of new capital ($7.8M loan, less the $3M payoff), before fees.
        </p>
        <p className={`mt-5 max-w-[48ch] text-[16px] leading-[1.85] ${t.body}`}>
          Sale-leaseback at market value: about <span className="fig tabular-nums text-brass-light">{money(EXAMPLE.saleLeaseback)}</span> of capital ($12M sale, less about 3% in costs and the $3M payoff), before tax.
        </p>
        <p className={`mt-5 max-w-[48ch] text-[16px] leading-[1.85] ${t.body}`}>
          At a 6.5% cap rate, the company would pay about <span className="fig tabular-nums text-brass-light">{money(EXAMPLE.rentYear)}</span> a year in net rent.
        </p>
        <p className={`mt-5 max-w-[48ch] text-[16px] leading-[1.85] ${t.body}`}>The right answer depends on the rent the business can carry, the lease terms, and the after-tax result.</p>
      </div>
      <div className="col-span-12 mt-10 md:col-span-6 md:col-start-7 md:mt-0">
        <Bars ariaLabel="Illustrative example, capital released" rows={[{ label: "Sale-leaseback", value: EXAMPLE.saleLeaseback }, { label: "Refinance", value: EXAMPLE.refinance }]} />
        <p className={`mt-8 text-[16px] leading-[1.7] ${t.body}`}>Indicative rent: <span className="fig tabular-nums text-brass-light">{money(EXAMPLE.rentYear)}</span> a year (<span className="fig tabular-nums text-brass-light">{money(EXAMPLE.rentMonth)}</span> a month), net.</p>
      </div>
    </div>
  );
}

function Advisor() {
  const d = TEAM.find((p) => p.slug === "daniel-sheikhan")!;
  return (
    <div className="col-span-12 mt-20 lg:mt-28">
      <Head lines={["One advisor across", "the whole transaction."]} />
      <div className={`${GRID} border-y ${t.rule} py-10`}>
        <div className="col-span-5 md:col-span-3 lg:col-span-2">
          <ImageFrame ratio="4/5" alt="" fallback="flat" ground="forest" />
        </div>
        <div className="col-span-12 mt-8 md:col-span-8 md:col-start-5 md:mt-0">
          <h3 className="font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-[1.1]">Daniel Sheikhan</h3>
          <p className={`meta mt-3 ${t.meta}`}>{d.role}<span className="mx-2 opacity-40">/</span>{BROKERAGE}</p>
          <div className={`mt-6 max-w-[48ch] space-y-5 text-[16px] leading-[1.85] ${t.body}`}>
            <p>A finance degree, and a background in real estate investment and portfolio management.</p>
            <p>A lawyer licensed in Ontario, New York and Minnesota. Danmar does not provide legal advice; we work alongside your counsel. The cross-border background helps when a US parent is involved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Paid() {
  return (
    <div className="col-span-12 mt-20 lg:mt-28">
      <PracticeRows tone="forest" numbered={false} items={[{ title: "How we are paid.", text: "The capital review is free. If you proceed, our fee is success-based and set out in writing before any work begins. If there is no transaction, there is no success fee." }]} />
    </div>
  );
}

function Review() {
  return (
    <div id="capital-review" className="col-span-12 mt-20 lg:mt-28" style={anchor}>
      <Lines lines={["Book a confidential", "capital review."]} className={`${HEAD} mb-10 max-w-[22ch] lg:mb-14`} />
      <p className={`mb-10 max-w-[48ch] text-[16px] leading-[1.85] ${t.body}`}>Tell us a little about the property. Daniel will reply personally.</p>
      <CapitalForm />
    </div>
  );
}

export function Capital() {
  const path = href("capital");
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Corporate Real Estate Capital", item: `${SITE}${path}` },
    ],
  };
  return (
    <CapitalProvider>
      <Practice
        tone="forest"
        id="capital"
        path={path}
        eyebrow="Corporate Real Estate Capital"
        headline={["Unlock the capital in your buildings."]}
        italic="Keep the site. Release the equity."
        intro={[
          "Danmar advises owner-occupier companies across Ontario on sale-leasebacks, surplus property sales and lease restructuring. We help you turn real estate into capital for growth, acquisitions or debt reduction, while you keep operating from the same site.",
        ]}
        heroLinks={
          <>
            <TrackLink href="#capital-review" location="hero" className="font-display text-[1.35rem] font-medium leading-tight text-paper">Book a confidential capital review</TrackLink>
            <TrackLink href="#estimator" location="hero" className="meta text-paper/70">Estimate your capital unlock</TrackLink>
          </>
        }
        numbers={[["Transacted since 2016", "$1B+"], ["Lead advisor trained in law and finance", "Ontario brokerage"]]}
        numbersNote="Aggregate list value of transactions the firm acted in, sale and lease, 2016 to date. Methodology on request."
        sections={[
          { heading: "When CFOs call us.", items: TRIGGERS, numbered: false },
          { node: <p className={`meta col-span-12 mt-6 ${t.meta}`}>Best fit: owner-occupied properties in Ontario.</p> },
          { heading: "What we do.", items: SERVICES },
          { node: <Comparison /> },
          { node: <EstimatorSection /> },
          { heading: "How a capital review works.", items: PROCESS, restart: true },
          { node: <Memo /> },
          { node: <Example /> },
          { node: <Advisor /> },
          { node: <Paid /> },
          { node: <FaqRows tone="forest" items={FAQ} heading={<Head lines={["Questions CFOs ask."]} />} /> },
          { node: <Review /> },
        ]}
        note="Danmar Empire Real Estate Corp., Brokerage. Information on this page is general and indicative. It is not legal, tax, accounting or financing advice. Danmar does not arrange mortgages. Figures in the estimator and illustrative example are estimates only."
        service={{ name: "Corporate real estate capital advisory", type: "Sale-leaseback and corporate real estate advisory", description: "Advice to Ontario owner-occupier companies on sale-leasebacks, surplus and non-core property sales, lease restructuring and renewals, and buy-versus-lease decisions." }}
        jsonLd={[faqJsonLd(FAQ), breadcrumbs]}
      />
    </CapitalProvider>
  );
}
