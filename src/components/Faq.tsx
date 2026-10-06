import { GRID } from "./Chapter";
import { FaqRow } from "./FaqRow";
import { practiceTones } from "./Practice";

/* FAQ as rows. Every answer is in the server HTML; details/summary only decides
   what is open. The question is the row's title column and the answer its text
   column, so an open FAQ reads like every other row on the page. The matching
   FAQPage JSON-LD is built with faqJsonLd(). */

export type Faq = [question: string, answer: string];

export function faqJsonLd(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}

export function FaqRows({ tone, items, heading }: { tone: "forest" | "cream"; items: Faq[]; heading?: React.ReactNode }) {
  const t = practiceTones(tone);
  return (
    <div className="col-span-12 mt-20 lg:mt-28">
      {heading}
      <div>
        {items.map(([q, a], i) => (
          <FaqRow key={q} index={i + 1} className={`group block border-t ${t.rule} last:border-b`}>
            <summary className={`${GRID} cursor-pointer list-none py-6 md:py-8 [&::-webkit-details-marker]:hidden`}>
              <h3 className="col-span-10 font-display text-[clamp(1.25rem,1.9vw,1.6rem)] font-medium leading-[1.2] md:col-span-6">{q}</h3>
              <span aria-hidden className={`meta col-span-2 self-start text-right md:col-span-1 md:col-start-12 ${t.meta}`}>
                <span className="group-open:hidden">Open</span><span className="hidden group-open:inline">Close</span>
              </span>
            </summary>
            <div className={`${GRID} pb-8 md:pb-10`}>
              <p className={`col-span-12 max-w-[48ch] text-[15px] leading-[1.85] md:col-span-6 md:col-start-7 ${t.body}`}>{a}</p>
            </div>
          </FaqRow>
        ))}
      </div>
    </div>
  );
}
