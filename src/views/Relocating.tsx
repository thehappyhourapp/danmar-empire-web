import { OWNERSHIP, RELOCATION } from "@/lib/data";
import { href } from "@/lib/routes";
import { SITE } from "@/lib/metadata";
import { Chapter, GRID, HEAD, Lines, delay } from "@/components/Chapter";
import { MotionController } from "@/components/MotionController";
import { EnquireButton } from "@/components/SiteShell";
import s from "@/components/motion.module.css";

/* Relocating: whole-page cream, line rise only, no cuts. The five questions and
   the arrival sequence as numbered rows; the ownership argument restated in the
   Home chapter 2 pattern with OWNERSHIP's copy unchanged. */

const BROKERAGE = "Danmar Empire Real Estate Corp., Brokerage";

/* The arrival sequence. Relocating principals do not want a list of services,
   they want to know what happens first, second and third. */
const SEQUENCE: [string, string][] = [
  ["Orientation, before you commit", "A half day on the ground, or an hour on a call if you are still abroad. We drive the three or four areas that plausibly fit, and we tell you which ones to stop considering. No property is shown. Nothing is signed."],
  ["A lease, usually", "Twelve to twenty-four months in the area you think you want, at a rent that buys you the right to be wrong. Executive tenancies from $10,000 per month, furnished where the family is arriving ahead of the container."],
  ["Banking, credit and counsel", "Introductions to a lender who writes against foreign income, an accountant who has filed a first Canadian return before, and, where the file needs it, counsel. Arranged before you are under contract."],
  ["The purchase", "By the time you buy you have lived a winter here, driven the commute, and seen the street in February. That is when a $3M to $15M decision should be made, and that is when our opinion is worth something."],
];

function Rows({ items, number }: { items: [string, string][]; number: boolean }) {
  return (
    <div>
      {items.map(([title, text], i) => (
        <div key={title} data-reveal className={`${s.rise} ${GRID} border-t border-forest/14 py-8 last:border-b md:py-10`} style={delay(i)}>
          {number && <span className="fig col-span-2 text-[14px] text-brass md:col-span-1">{String(i + 1).padStart(2, "0")}</span>}
          <h3 className={`${number ? "col-span-10 md:col-span-4" : "col-span-12 md:col-span-5"} font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-[1.15]`}>{title}</h3>
          <p className="col-span-12 mt-4 max-w-[48ch] text-[15px] leading-[1.85] text-ink/80 md:col-span-6 md:col-start-7 md:mt-0">{text}</p>
        </div>
      ))}
    </div>
  );
}

export function Relocating() {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Private client relocation to Toronto and the GTA",
    serviceType: "Relocation advisory",
    description: "Advice for families relocating to Oakville, King City and Toronto from abroad: areas, leasing, lenders, schools and carrying costs, answered before you commit.",
    url: `${SITE}${href("relocating")}`,
    areaServed: { "@type": "AdministrativeArea", name: "Ontario" },
    provider: { "@type": "RealEstateAgent", name: BROKERAGE, url: SITE },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: RELOCATION.questions.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  const ld = (o: unknown) => JSON.stringify(o).replace(/</g, "\\u003c");

  return (
    <div id="relocating">
      <MotionController rootId="relocating" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(faq) }} />

      <Chapter inner="pb-24 pt-[calc(var(--nav-h)_+_64px)] lg:pt-[calc(var(--nav-h)_+_96px)] lg:pb-40">
        {/* ── head */}
        <div className="col-span-12 lg:col-span-8">
          <h1 className="max-w-[18ch] font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-medium leading-[1.02] tracking-[-.01em]">You are moving a family, not buying a house.</h1>
          <p className="mt-4 font-display text-[clamp(1.35rem,2.4vw,2rem)] italic leading-[1.1] text-brass">Usually, that means a lease first.</p>
        </div>
        <p data-reveal className={`${s.rise} col-span-12 mt-10 max-w-[48ch] text-[16px] leading-[1.85] text-ink/80 lg:col-span-6 lg:col-start-7 lg:mt-16`}>
          We advise high-net-worth and ultra-high-net-worth families relocating to the Greater Toronto Area
          from abroad: Oakville, King City, central Toronto and the surrounding high-end markets.
          Most of them arrive with the same five questions, and the honest answer to several of them
          is lease first.
        </p>

        {/* ── origins, one row */}
        <p className="meta col-span-12 mt-14 border-y border-forest/14 py-6 leading-[2] text-ink/70 lg:mt-20">
          <span className="text-brass">Arriving from</span>
          {RELOCATION.origins.map((o) => (
            <span key={o}><span className="mx-4 opacity-40">·</span>{o}</span>
          ))}
        </p>

        {/* ── the five questions */}
        <div className="col-span-12 mt-20 lg:mt-28">
          <Lines lines={["Five questions, answered the way", "we would answer them to a friend."]} className={`${HEAD} mb-10 lg:mb-14`} />
          <Rows items={RELOCATION.questions} number />
        </div>

        {/* ── the sequence */}
        <div className="col-span-12 mt-20 lg:mt-28">
          <Lines lines={["The order matters", "more than the effort."]} className={`${HEAD} mb-10 lg:mb-14`} />
          <Rows items={SEQUENCE} number />
        </div>

        {/* ── ownership, the Home chapter 2 pattern */}
        {/* the sticky column's container ends with the copy; proof rows sit below it */}
        <div className="col-span-12 mt-24 border-t border-forest/14 pt-16 lg:mt-32 lg:pt-20">
          <div className={GRID}>
            <div className="col-span-12 lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
              <Lines lines={["We own what", "we advise on."]} className={HEAD} />
              <blockquote data-reveal className={`${s.rise} mt-12 max-w-[26ch] border-t border-forest/14 pt-6 font-display text-[clamp(1.2rem,1.8vw,1.5rem)] font-medium leading-[1.3] text-forest`}>
                {OWNERSHIP.pull}
              </blockquote>
            </div>
            <div className="col-span-12 mt-12 space-y-8 lg:col-span-6 lg:col-start-7 lg:mt-0">
              {OWNERSHIP.body.map((para, i) => (
                <p key={i} data-reveal className={`${s.rise} max-w-[48ch] text-[16px] leading-[1.85] text-ink/80`} style={delay(i)}>{para}</p>
              ))}
            </div>
          </div>
          <div className="mt-16 lg:mt-24">
            <Rows items={OWNERSHIP.proof} number={false} />
          </div>
        </div>

        {/* ── close */}
        <div className={`col-span-12 mt-20 ${GRID} border-t border-forest/14 pt-12 lg:mt-28 lg:pt-16`}>
          <div className="col-span-12 lg:col-span-6">
            <Lines lines={["Arrange an orientation."]} className={`${HEAD} max-w-[18ch]`} />
          </div>
          <div className="col-span-12 mt-8 flex flex-col items-start gap-6 lg:col-span-5 lg:col-start-7 lg:mt-2">
            <p className="max-w-[46ch] text-[15px] leading-[1.8] text-ink/80">A half day on the ground, or an hour on a call if you are still abroad. Nothing is shown and nothing is signed.</p>
            <EnquireButton className={`${s.tlink} font-display text-[1.35rem] font-medium leading-tight text-forest`}>Arrange an orientation</EnquireButton>
          </div>
        </div>
      </Chapter>
    </div>
  );
}
