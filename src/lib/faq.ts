/* FAQ data and its FAQPage JSON-LD. The rows that render it are in
   src/components/Faq.tsx. */

export type Faq = [question: string, answer: string];

export function faqJsonLd(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}
