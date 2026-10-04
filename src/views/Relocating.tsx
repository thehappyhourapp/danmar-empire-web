import Link from "next/link";
import { href } from "@/lib/routes";
import { Reveal } from "@/components/Reveal";
import { EnquireButton } from "@/components/SiteShell";
import { OWNERSHIP, RELOCATION } from "@/lib/data";
import { ImageFrame } from "@/components/ImageFrame";

/* The arrival sequence. Relocating principals do not want a list of services,
   they want to know what happens first, second and third. */
const SEQUENCE: [string, string, string][] = [
  ["01", "Orientation, before you commit", "A half day on the ground, or an hour on a call if you are still abroad. We drive the three or four areas that plausibly fit, and we tell you which ones to stop considering. No property is shown. Nothing is signed."],
  ["02", "A lease, usually", "Twelve to twenty-four months in the area you think you want, at a rent that buys you the right to be wrong. Executive tenancies from $10,000 per month, furnished where the family is arriving ahead of the container."],
  ["03", "Banking, credit and counsel", "Introductions to a lender who writes against foreign income, an accountant who has filed a first Canadian return before, and, where the file needs it, counsel. Arranged before you are under contract."],
  ["04", "The purchase", "By the time you buy you have lived a winter here, driven the commute, and seen the street in February. That is when a $3M to $15M decision should be made, and that is when our opinion is worth something."],
];

export function Relocating() {
  return (
    <div className="pt-[88px]">
      {/* ───────── Hero */}
      <section className="relative bg-forest-deep text-paper">
        <ImageFrame hue={158} ratio="auto" className="!absolute inset-0 h-full w-full" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/95 via-forest-deep/80 to-forest-deep" />
        <div className="relative mx-auto max-w-[1520px] px-6 py-24 md:px-12 md:py-36">
          <div className="meta mb-7 text-brass-light">Relocation &amp; private client</div>
          <h1 className="max-w-[18ch] font-display text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1.04] tracking-[-.005em]">
            You are moving a family, not buying a house.
          </h1>
          <p className="mt-9 max-w-[60ch] text-[16px] leading-[1.9] text-paper/82">
            We advise high-net-worth and ultra-high-net-worth families relocating to the Greater Toronto Area
            from abroad: Oakville, King City, central Toronto and the surrounding high-end markets.
            Most of them arrive with the same five questions, and the honest answer to several of them
            is <span className="italic">lease first</span>.
          </p>
          <div className="mt-12 flex flex-wrap gap-5">
            <EnquireButton className="meta border border-paper/35 px-8 py-4 transition-colors hover:bg-paper hover:text-forest">
              Arrange an orientation
            </EnquireButton>
            <Link href={href("areas")} className="meta border border-paper/20 px-8 py-4 text-paper/80 transition-colors hover:border-paper/50 hover:text-paper">
              The areas
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── Where clients arrive from */}
      <section className="border-b border-forest/14 bg-paper-deep">
        <div className="mx-auto max-w-[1520px] px-6 py-16 md:px-12 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[22rem_1fr] lg:gap-20">
            <Reveal>
              <div className="meta text-brass">Arriving from</div>
              <p className="mt-5 max-w-[30ch] text-[14.5px] leading-[1.85] text-mute">
                The firm has acted for principals landing from each of these markets.
                Different tax positions, different credit files, different expectations of what a house should be.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <ul className="grid grid-cols-2 gap-px bg-forest/12 sm:grid-cols-3">
                {RELOCATION.origins.map((o) => (
                  <li key={o} className="bg-paper-deep px-5 py-7">
                    <span className="font-display text-[clamp(1.05rem,1.7vw,1.35rem)] leading-tight text-forest">{o}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── The five questions */}
      <section className="mx-auto max-w-[1520px] px-6 py-24 md:px-12 md:py-32">
        <Reveal className="mb-14">
          <div className="meta mb-6 text-brass">What everyone asks</div>
          <h2 className="max-w-[22ch] font-display text-[clamp(2.1rem,4.8vw,3.6rem)] leading-[1.06]">
            Five questions, answered the way we would answer them to a friend.
          </h2>
        </Reveal>
        <div className="divide-y divide-forest/14 border-y border-forest/14">
          {RELOCATION.questions.map(([q, a], i) => (
            <Reveal key={q} delay={i * 60}>
              <div className="grid gap-6 py-11 md:grid-cols-[auto_1fr_1.2fr] md:gap-14">
                <div className="fig pt-2 text-[13px] text-brass">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="max-w-[20ch] font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.15]">{q}</h3>
                <p className="max-w-[56ch] text-[15px] leading-[1.9] text-ink/78">{a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────── The sequence */}
      <section className="bg-forest py-24 text-paper md:py-32">
        <div className="mx-auto max-w-[1520px] px-6 md:px-12">
          <Reveal className="mb-14">
            <div className="meta mb-6 text-brass-light">How it runs</div>
            <h2 className="max-w-[20ch] font-display text-[clamp(2.1rem,4.8vw,3.6rem)] leading-[1.06]">
              The order matters more than the effort.
            </h2>
          </Reveal>
          <div className="grid gap-px bg-paper/14 md:grid-cols-2 xl:grid-cols-4">
            {SEQUENCE.map(([n, t, d], i) => (
              <Reveal key={n} delay={i * 70} className="bg-forest p-9 md:p-10">
                <div className="fig text-[13px] text-brass-light">{n}</div>
                <h3 className="mt-6 max-w-[16ch] font-display text-[clamp(1.25rem,2vw,1.6rem)] leading-[1.15]">{t}</h3>
                <p className="mt-5 text-[14px] leading-[1.9] text-paper/72">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Ownership, restated for the arriving principal */}
      <section className="mx-auto max-w-[1520px] px-6 py-24 md:px-12 md:py-32">
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <div className="meta mb-6 text-brass">{OWNERSHIP.eyebrow}</div>
            <h2 className="max-w-[16ch] font-display text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.05]">
              The person advising you should live in the market they are selling.
            </h2>
            <figure className="mt-11 border-l border-brass/50 pl-7">
              <blockquote className="max-w-[26ch] font-display text-[clamp(1.2rem,2vw,1.6rem)] italic leading-[1.35] text-forest">
                {OWNERSHIP.pull}
              </blockquote>
            </figure>
          </Reveal>
          <Reveal delay={80}>
            <div className="space-y-7 lg:pt-3">
              <p className="max-w-[54ch] text-[15.5px] leading-[1.92] text-ink/80">
                A relocating buyer is the most exposed client in this market. You cannot yet tell a good street
                from a street that photographs well, which is when advice from someone with something at risk matters most.
              </p>
              <p className="max-w-[54ch] text-[15.5px] leading-[1.92] text-ink/80">{OWNERSHIP.body[1]}</p>
            </div>
            <dl className="mt-12 border-t border-forest/14">
              {OWNERSHIP.proof.map(([k, v]) => (
                <div key={k} className="grid gap-2 border-b border-forest/14 py-5 sm:grid-cols-[13rem_1fr] sm:gap-8">
                  <dt className="meta pt-[3px] text-forest">{k}</dt>
                  <dd className="text-[14.5px] leading-[1.75] text-mute">{v}</dd>
                </div>
              ))}
            </dl>
            <EnquireButton
              className="meta mt-10 inline-flex items-center gap-3 border-b border-forest/30 pb-2 text-forest transition-colors hover:border-brass hover:text-brass">
              Start a conversation
              <svg width="22" height="8" viewBox="0 0 22 8" fill="none" aria-hidden>
                <path d="M0 4h20M17 1l3.4 3-3.4 3" stroke="currentColor" strokeWidth="1" />
              </svg>
            </EnquireButton>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
