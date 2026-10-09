import Link from "next/link";
import { Chapter } from "@/components/Chapter";
import { GRID } from "@/lib/layout";
import { href } from "@/lib/routes";
import s from "@/components/motion.module.css";

/* Terms of use: cream, the same row pattern and type as /privacy. A draft for
   Daniel's review (docs/CONFIRM.md); conventional wording for an Ontario
   brokerage website. */

const EFFECTIVE = "9 October 2026";
const ADDRESS = "2380 Bristol Circle, Unit 12, Oakville, Ontario L6H 6M5";

const SECTIONS: [string, React.ReactNode[]][] = [
  ["Who operates this site", [
    `This website is operated by Danmar Empire Real Estate Corp., Brokerage ("Danmar", "we", "us"), a real estate brokerage registered with the Real Estate Council of Ontario, ${ADDRESS}.`,
    "By using the site you agree to these terms. If you do not agree, please do not use it.",
  ]],
  ["Information, not advice", [
    "Everything on this site is general information. Nothing on it is legal, financial, tax, accounting or investment advice, an appraisal, or an offer of securities, and it should not be relied on as any of those.",
    "Using the site, or sending us an enquiry through it, does not create a brokerage relationship, a client relationship or a lawyer-client relationship. A brokerage relationship arises only under a written agreement signed by you and the brokerage.",
  ]],
  ["Listing information", [
    "Listings shown on this site are the brokerage's own. Their information comes from the brokerage's records and from the MLS® System through the PropTx data feed, provided under licence by the Toronto Regional Real Estate Board (TRREB).",
    "Listing information is deemed reliable but is not guaranteed accurate. It may change, and a property may be withdrawn or sold, without notice. Verify every detail independently before relying on it. Prices shown are list prices. Not intended to solicit properties currently under contract.",
    "MLS®, Multiple Listing Service®, REALTOR® and the associated logos are trademarks of The Canadian Real Estate Association (CREA) and identify real estate professionals who are members of CREA.",
  ]],
  ["Figures and past results", [
    "Figures on this site, such as yields, average lease values, shares of files and the aggregate value of transactions, describe past activity. Each states its basis where it appears. They are historical, they are not a forecast, and they are not a promise of future results. The capital estimator produces indicative figures only. Methodology is available on request.",
  ]],
  ["Photographs", [
    "Some photographs are illustrative scenes and do not depict properties the brokerage has listed, sold or managed.",
  ]],
  ["Ownership of the site", [
    "The site and its content, including the text, design, software screens, the Danmar Empire name, the seal and the other marks, belong to Danmar or are used under licence. You may view and print pages for your own non-commercial use. Any other copying, reproduction or distribution needs our written permission. Listing data remains the property of its sources.",
  ]],
  ["How you may use the site", [
    "You may not scrape, crawl, harvest or otherwise collect content or listing data from the site by automated means, frame or mirror the site, or use any content or listing data from it to train, test, prompt or supply an artificial intelligence or machine-learning system. The licence under which the brokerage receives listing data prohibits that use, and it is a condition of your use of the site.",
    "You may not interfere with the site's operation or security, or use it for any unlawful purpose.",
  ]],
  ["Links to other sites", [
    "The site may link to websites run by others. We do not control them and are not responsible for their content, accuracy or privacy practices. A link is not an endorsement.",
  ]],
  ["No warranty and limitation of liability", [
    "The site is provided as is and as available, without warranties of any kind, express or implied, including as to accuracy, completeness, availability or fitness for a particular purpose.",
    "To the fullest extent permitted by the laws of Ontario, Danmar and its partners, brokers, salespersons and staff are not liable for any loss or damage, whether direct, indirect, incidental or consequential, arising from your use of the site or your reliance on anything in it. Nothing in these terms limits a liability that cannot be limited by law.",
  ]],
  ["Indemnity", [
    "You agree to indemnify Danmar and its partners, brokers, salespersons and staff against any claim, loss or cost, including reasonable legal fees, arising from your breach of these terms or your misuse of the site.",
  ]],
  ["Where the site is intended for use", [
    "The site is intended for use in Canada. The brokerage acts in Ontario, where it is registered. We make no representation that the site or its content is appropriate or lawful elsewhere.",
  ]],
  ["Governing law", [
    "These terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable there. The courts of Ontario have exclusive jurisdiction over any dispute arising from them or from the site.",
  ]],
  ["Changes to these terms", [
    "We may change these terms by posting a revised version on this page. The effective date above shows when they last changed. Using the site after a change means you accept the revised terms.",
  ]],
  ["Contact", [
    <>Questions about these terms go to <a href="mailto:daniel@danmarempire.com" className={`${s.tlink} text-forest`}>daniel@danmarempire.com</a>, or by post to Danmar Empire Real Estate Corp., Brokerage, {ADDRESS}.</>,
  ]],
];

export function Terms() {
  return (
    <div id="terms">
      <Chapter inner="pb-24 pt-[calc(var(--nav-h)_+_64px)] lg:pt-[calc(var(--nav-h)_+_96px)] lg:pb-40">
        <div className="col-span-12 lg:col-span-8">
          <h1 className="max-w-[18ch] font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-medium leading-[1.02] tracking-[-.01em]">Terms of use.</h1>
          <p className="mt-4 font-display text-[clamp(1.35rem,2.4vw,2rem)] italic leading-[1.1] text-brass">The conditions on which this site is offered.</p>
        </div>
        <div className="col-span-12 mt-10 max-w-[48ch] space-y-4 text-[16px] leading-[1.85] text-ink/80 lg:col-span-6 lg:col-start-7 lg:mt-16">
          <p>Effective {EFFECTIVE}.</p>
          <p>
            How we handle personal information you send through the site is set out on
            the <Link href={href("privacy")} className={`${s.tlink} text-forest`}>privacy page</Link>.
          </p>
        </div>
        <div className="col-span-12 mt-16 lg:mt-24">
          {SECTIONS.map(([title, paras]) => (
            <div key={title} className={`${GRID} border-t border-forest/14 py-8 last:border-b md:py-10`}>
              <h2 className="col-span-12 font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-[1.1] md:col-span-5">{title}</h2>
              <div className="col-span-12 mt-4 max-w-[48ch] space-y-4 text-[15px] leading-[1.85] text-ink/80 md:col-span-6 md:col-start-7 md:mt-0">
                {paras.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          ))}
        </div>
        <p className="meta col-span-12 mt-10 max-w-[60ch] leading-[1.9] text-ink/70">
          Danmar Empire Real Estate Corp., Brokerage. Effective {EFFECTIVE}.
        </p>
      </Chapter>
    </div>
  );
}
