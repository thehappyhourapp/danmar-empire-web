import Link from "next/link";
import { LISTINGS, OWNERSHIP, PILLARS, TRACK } from "@/lib/data";
import { money } from "@/lib/parse";
import { listingPhoto } from "@/lib/photos";
import { href, propertyHref } from "@/lib/routes";
import { ImageFrame } from "@/components/ImageFrame";
import { MotionController } from "@/components/MotionController";
import s from "./Home.module.css";
import m from "@/components/motion.module.css";

/* Home is five chapters on two temperature cuts: forest, then cream for three
   chapters, then forest-deep running straight into the footer. The footer is
   chrome and does not count as a cut. Everything below is server HTML; HomeMotion
   adds the motion afterwards, and only for visitors who have not asked it not to. */

type Tone = "cream" | "forest" | "deep";

const FEATURED = ["bronte-harbour", "namron-gate", "keele-wilson", "yorkville-penthouse"];
const RECORD = ["t3", "t5", "t1", "t8", "t2", "t7"];
const PRACTICE_ROUTES = ["management", "investments", "collection", "leasing"];

const GRID = "grid grid-cols-12 gap-x-4 md:gap-x-8";
const HEAD = "font-display font-medium text-[clamp(2.1rem,4.8vw,3.75rem)] leading-[1] tracking-[-.01em]";
const delay = (i: number) => ({ ["--d" as string]: `${Math.min(i, 3) * 120}ms` }) as React.CSSProperties;

const GROUND: Record<Tone, string> = {
  cream: "bg-paper text-ink",
  forest: "bg-forest text-paper",
  deep: "bg-forest-deep text-paper",
};

/** A heading set one authored line per mask box, so each line can rise on its own. */
function Lines({ lines, as = "h2", className = "", d }: { lines: string[]; as?: "h2" | "h3" | "p"; className?: string; d?: number }) {
  const Tag = as;
  return (
    <Tag className={`${s.mask} ${className}`} data-reveal style={d ? delay(d) : undefined}>
      {lines.map((line, i) => (
        <span key={line} className={s.line}>
          <span style={{ ["--i" as string]: i } as React.CSSProperties}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

function Chapter({ tone, wipeFrom, className = "", inner = "", children }: {
  tone: Tone; wipeFrom?: Tone; className?: string; inner?: string; children: React.ReactNode;
}) {
  return (
    <section data-ground={tone} className={`${s.chapter} ${GROUND[tone]} ${tone === "cream" ? "" : s.dark} ${className}`}>
      <div className="relative mx-auto max-w-[1440px]">
        <div className={`relative z-10 px-4 py-24 md:px-12 lg:py-40 ${GRID} ${inner}`}>{children}</div>
      </div>
      {wipeFrom && (
        <div aria-hidden data-wipe className={`${s.wipe} ${wipeFrom === "cream" ? "bg-paper" : "bg-forest"}`} />
      )}
    </section>
  );
}

export function Home() {
  const featured = FEATURED.map((id) => LISTINGS.find((l) => l.id === id)!);
  const record = RECORD.map((id) => TRACK.find((t) => t.id === id)!);

  return (
    <div id="home">
      <MotionController rootId="home" />

      {/* ───────── 1. Hero: forest. The headline is the LCP element and never animates. */}
      <section data-ground="forest" className={`${s.chapter} ${s.dark} bg-forest text-paper`}>
        <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col">
          <div className="relative z-10 flex flex-1 flex-col px-4 pb-16 pt-28 md:px-12 md:pb-20 md:pt-36">
            <div className={GRID}>
              <p className="meta col-span-12 text-paper/60 md:col-span-6">
                <span className="block md:inline">Oakville <span className="mx-2 opacity-50">·</span> King City <span className="mx-2 opacity-50">·</span> Toronto</span>
                <span className="mx-4 hidden opacity-40 md:inline">/</span>
                <span className="mt-2 block md:mt-0 md:inline">Est. 2016</span>
              </p>
            </div>

            <div className={`${GRID} flex-1 content-center py-16 ${s.lift}`} data-hero-lift>
              <h1 className="col-span-12 font-display text-[clamp(2.75rem,7.5vw,6.5rem)] font-medium leading-[0.98] tracking-[-.015em] lg:col-span-11">
                Lawyer-led real estate.
              </h1>
              <p className="col-span-12 mt-6 font-display text-[clamp(1.5rem,3vw,2.75rem)] italic leading-[1.1] text-brass-light lg:col-span-11">
                Our own capital in the markets we advise on.
              </p>
              <p className="col-span-12 mt-10 max-w-[46ch] text-[16px] leading-[1.75] text-paper/80 md:col-span-7 md:text-[18px] lg:col-span-5">
                We manage private portfolios from $10M to $250M, arrange executive leases from $10,000 a month,
                and buy and sell high-end residential, commercial and investment property across Ontario.
              </p>
            </div>

            <div className={`${GRID} items-end`}>
              <div className="col-span-6 flex items-center gap-4" data-cue>
                <span aria-hidden className="block h-10 w-px bg-paper/40" />
                <span className="meta text-paper/70">Scroll</span>
              </div>
              <div className="col-span-6 flex justify-end lg:col-span-3 lg:col-start-10">
                <img src="/marks/seal-cream.svg" alt="" width={160} height={160} decoding="async" className="h-[120px] w-[120px] md:h-[160px] md:w-[160px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 2. Ownership: first cut, forest to cream. */}
      <Chapter tone="cream" wipeFrom="forest" className="lg:min-h-[100svh]">
        {/* The sticky column's container ends with the two-column copy, so the
            headline releases before the full-width proof rows reach it. */}
        <div data-reveal-group className={`col-span-12 ${GRID}`}>
          <div className="col-span-12 lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
            <Lines lines={["We own what", "we advise on."]} className={HEAD} />
            <Lines as="p" d={2} lines={["Financed, held and sold."]} className="mt-4 font-display text-[clamp(1.35rem,2.4vw,2rem)] italic leading-[1.1] text-brass" />
            <blockquote data-reveal style={delay(3)} className={`${s.reveal} mt-12 max-w-[26ch] border-t border-forest/14 pt-6 font-display text-[clamp(1.2rem,1.8vw,1.5rem)] font-medium leading-[1.3] text-forest`}>
              {OWNERSHIP.pull}
            </blockquote>
          </div>
          <div className="col-span-12 mt-12 space-y-8 lg:col-span-6 lg:col-start-7 lg:mt-0">
            {OWNERSHIP.body.map((para, i) => (
              <p key={i} data-reveal className={`${s.reveal} max-w-[48ch] text-[16px] leading-[1.85] text-ink/80`} style={delay(i + 1)}>{para}</p>
            ))}
          </div>
        </div>
        <div className="col-span-12 mt-20 lg:mt-32">
          {OWNERSHIP.proof.map(([k, v], i) => (
            <div key={k} data-reveal className={`${s.reveal} ${GRID} border-t border-forest/14 py-8 last:border-b`} style={delay(i)}>
              <h3 className="col-span-12 font-display text-[1.5rem] font-medium leading-[1.1] md:col-span-5">{k}</h3>
              <p className="col-span-12 mt-2 text-[15px] leading-[1.8] text-ink/75 md:col-span-6 md:col-start-7 md:mt-0">{v}</p>
            </div>
          ))}
        </div>
      </Chapter>

      {/* ───────── 3. The Collection: cream continues. Own listings as rows. */}
      <Chapter tone="cream" className="lg:min-h-[100svh]">
        <div data-reveal-group className={`col-span-12 ${GRID}`}>
          <div className="col-span-12 lg:col-span-7">
            <Lines lines={["From the Collection."]} className={HEAD} />
          </div>
          <div className="col-span-12 mt-6 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
            <p data-reveal style={delay(1)} className={`${s.reveal} max-w-[40ch] text-[15px] leading-[1.8] text-ink/75`}>
              Held by the brokerage, underwritten and written by us before they were priced.
              Nothing is republished from the board.
            </p>
            <Link href={href("collection")} className={`${m.tlink} meta mt-6 inline-block text-forest`}>The collection</Link>
          </div>
        </div>
        <div className="col-span-12 mt-16 lg:mt-24">
          {featured.map((l, i) => {
            const lease = l.intent === "lease";
            return (
              <Link key={l.id} href={propertyHref(l.id)} data-reveal
                className={`${s.reveal} ${m.row} group ${GRID} border-t border-forest/14 py-8 last:border-b md:py-10`}
                style={delay(i)}>
                {/* alternate rows take the taller frame and step one column in, so the
                    list reads as offset portrait frames rather than an even stack */}
                <div className={`col-span-5 self-center md:col-span-3 md:row-span-2 ${i % 2 ? "md:col-start-2" : ""}`}>
                  <div className="overflow-hidden">
                    <div className={s.plx} data-parallax>
                      <ImageFrame src={listingPhoto(l.id)} hue={l.hue} ratio={i % 2 ? "3/4" : "4/5"} alt={l.name} fallback="flat" />
                    </div>
                  </div>
                </div>
                <div className="col-span-12 mt-6 md:col-span-6 md:col-start-5 md:mt-0 md:self-end md:pb-2">
                  <h3 className="font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-[1.1]">
                    <span className={m.rowlink}>{l.name}</span>
                  </h3>
                  <p className="meta mt-4 text-ink/70">
                    {l.address} <span className="mx-2 opacity-40">/</span> {l.region}, {l.city}
                  </p>
                </div>
                <p className="col-span-12 mt-4 max-w-[48ch] text-[15px] leading-[1.8] text-ink/75 md:col-span-6 md:col-start-5 md:mt-0 md:self-start md:pt-2">{l.standfirst}</p>
                <div className="col-span-12 mt-6 flex items-baseline justify-between md:col-span-8 md:col-start-5 lg:col-span-2 lg:col-start-11 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:block lg:self-center lg:text-right">
                  <span className="fig block text-[clamp(1.5rem,1.8vw,1.7rem)] text-brass">{money(l.price, lease)}</span>
                  <span className="meta mt-2 block text-ink/70">{lease ? "To lease" : "For sale"} · {l.kind}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </Chapter>

      {/* ───────── 4. Track record and practices: cream continues. */}
      <Chapter tone="cream" className="lg:min-h-[100svh]">
        <div data-reveal-group className={`col-span-12 ${GRID}`}>
          <div className="col-span-12 lg:col-span-5 lg:self-end">
            <p data-reveal className={`${s.reveal} fig text-[clamp(3.25rem,7.5vw,6.5rem)] leading-[0.9] tracking-[-.02em] text-brass`}>$1B+</p>
          </div>
          <div className="col-span-12 mt-12 lg:col-span-6 lg:col-start-7 lg:mt-0 lg:self-end">
            <Lines d={1} lines={["The number, and", "the properties behind it."]} className={HEAD} />
            <p data-reveal style={delay(2)} className={`${s.reveal} mt-6 max-w-[48ch] text-[15.5px] leading-[1.85] text-ink/80`}>
              A total is easy to publish. These are some of the properties behind ours, with what they were asking,
              published only with the parties' written consent.
            </p>
          </div>
          <p data-reveal className={`${s.reveal} meta col-span-12 mt-6 max-w-[60ch] leading-[1.9] text-ink/70 lg:col-span-5`} style={delay(3)}>
            Aggregate list value of transactions the firm acted in, sale and lease, 2016 to date. Methodology on request.
          </p>
        </div>

        <div className="col-span-12 mt-16 lg:mt-24">
          {record.map((t, i) => (
            <div key={t.id} data-reveal className={`${s.reveal} ${GRID} items-baseline border-t border-forest/14 py-6 last:border-b md:py-6`} style={delay(i)}>
              <h3 className="col-span-8 font-display text-[1.25rem] font-medium leading-[1.15] md:col-span-4">{t.place}</h3>
              <p className="fig col-span-4 text-right text-[14px] text-forest md:order-last md:col-span-2 md:col-start-11">
                {t.kind === "Leased" ? `$${t.list.toLocaleString("en-CA")}/mo` : money(t.list)}
              </p>
              <p className="meta col-span-8 mt-2 text-ink/70 md:col-span-4 md:col-start-5 md:mt-0">
                {t.city} <span className="mx-2 opacity-40">/</span> {t.type}
              </p>
              <p className="meta col-span-4 mt-2 text-right text-ink/70 md:col-span-2 md:col-start-9 md:mt-0 md:text-left">{t.kind} {t.year}</p>
            </div>
          ))}
          <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4">
            <p className="meta max-w-[60ch] leading-[1.9] text-ink/70">List prices at the time of the transaction, not sale prices.</p>
            <Link href={href("track")} className={`${m.tlink} meta text-forest`}>The full record</Link>
          </div>
        </div>

        <div className="col-span-12 mt-32 lg:mt-40">
          <Lines lines={["One set of books.", "One standard of diligence."]} className={`${HEAD} max-w-[20ch]`} />
          <div className="mt-12 lg:mt-16">
            {PILLARS.map((p, i) => (
              <div key={p.title} data-reveal className={`${s.reveal} ${GRID} border-t border-forest/14 py-10 last:border-b md:py-12`} style={delay(i)}>
                <div className="col-span-12 md:col-span-5">
                  <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.1rem)] font-medium leading-[1.1]">{p.title}</h3>
                  <p className="mt-4 max-w-[34ch] text-[15px] leading-[1.8] text-ink/75">{p.line}</p>
                  <Link href={href(PRACTICE_ROUTES[i])} className={`${m.tlink} meta mt-6 inline-block text-forest`}>The practice</Link>
                </div>
                <div className="col-span-12 mt-6 md:col-span-6 md:col-start-7 md:mt-0">
                  <p className="max-w-[48ch] text-[14.5px] leading-[1.9] text-ink/70">{p.detail}</p>
                  <dl className="mt-8 grid grid-cols-1 gap-y-4 border-t border-forest/14 pt-4 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0">
                    {p.stats.filter(([k]) => k !== "Furnishing").map(([k, v]) => (
                      <div key={k} className="flex flex-col-reverse">
                        <dt className="meta mt-2 text-ink/70">{k}</dt>
                        <dd className="fig text-[14px] text-forest">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Chapter>

      {/* ───────── 5. Close: second cut, cream to forest-deep, running into the footer. */}
      <Chapter tone="deep" wipeFrom="cream" inner="lg:min-h-[100svh] lg:content-center">
        <div data-reveal-group className={`col-span-12 ${GRID}`}>
          <div className="col-span-12 lg:col-span-6">
            <Lines lines={["Tell us what you", "are trying to do."]} className={HEAD} />
          </div>
          <div className="col-span-12 mt-10 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:self-end">
            <p data-reveal style={delay(1)} className={`${s.reveal} max-w-[46ch] text-[16px] leading-[1.85] text-paper/80`}>
              A purchase, a sale, a lease, or a portfolio that needs a second pair of eyes. Someone from the desk
              will be in touch inside one business day. We do not sell or share what you send, and we do not add
              you to a list without asking.
            </p>
            <div className="mt-10 flex flex-col items-start gap-6">
              <Link href="/contact" className={`${m.tlink} font-display text-[1.35rem] font-medium leading-tight text-paper`}>Start a conversation</Link>
              <Link href={href("relocating")} className={`${m.tlink} text-[15px] text-paper/70`}>
                Relocating to the Toronto area? Begin with the questions everyone asks
              </Link>
            </div>
          </div>
        </div>
      </Chapter>
    </div>
  );
}
