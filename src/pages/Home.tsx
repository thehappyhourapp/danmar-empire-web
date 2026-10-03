import { AREAS, COVENANTS, JOURNAL, LISTINGS, OFFICES, OWNERSHIP, PILLARS, TRACK } from "@/lib/data";
import type { Query } from "@/lib/parse";
import { ImageFrame, useReveal } from "@/components/ImageFrame";
import { IntelBar } from "@/components/IntelBar";
import { ListingCard } from "@/components/ListingCard";
import { Marquee } from "@/components/Marquee";
import { ScrollStage, useScrollProgress } from "@/components/ScrollStage";

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref} className={className} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function Home({ go, open, search, saved, toggleSave, onEnquire }: {
  go: (p: string) => void; open: (id: string) => void;
  search: (q: Query, t: string) => void;
  saved: Set<string>; toggleSave: (id: string) => void; onEnquire: () => void;
}) {
  const hero = LISTINGS.find((l) => l.id === "bronte-harbour")!;
  const sp = useScrollProgress();
  const leases = LISTINGS.filter((l) => l.intent === "lease" && l.useClass === "residential").slice(0, 3);
  const commercial = LISTINGS.filter((l) => l.useClass === "investment" && l.intent === "sale").slice(0, 3);

  return (
    <div>
      {/* ───────── Hero */}
      <ScrollStage progress={sp} media={
        <ImageFrame src={hero.photo} hue={hero.hue} ratio="auto" className="!absolute inset-0 h-full w-full" alt={hero.name} />
      }>
        <div className="mx-auto flex h-full max-w-[1520px] flex-col px-6 pb-10 pt-36 md:px-12 md:pt-44">
          <div className="flex flex-1 flex-col justify-center">
            <div className="meta mb-10 text-paper/60 animate-riseIn">
              Oakville <span className="mx-2 opacity-50">·</span> King City <span className="mx-2 opacity-50">·</span> Toronto
              <span className="mx-3 opacity-40">/</span> Est. 2016
            </div>
            <h1 className="max-w-[15ch] font-display text-[clamp(2.7rem,7.4vw,6.4rem)] leading-[1] animate-riseIn"
                style={{ animationDelay: "80ms" }}>
              Lawyer-led real estate.
            </h1>
            <p className="mt-9 max-w-[46ch] text-[17px] leading-[1.75] text-paper/85 animate-riseIn md:text-[19px]"
               style={{ animationDelay: "160ms" }}>
              Private portfolios from $10M to $250M. Executive leases from $10,000+.
              Commercial and investment across Ontario.
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-6 animate-riseIn" style={{ animationDelay: "240ms" }}>
              <button onClick={() => go("track")}
                className="meta border border-paper/45 px-8 py-4 transition-colors hover:bg-paper hover:text-forest">
                $1B+ transacted
              </button>
              <button onClick={() => go("management")} className="meta text-paper/80 link-u hover:text-paper">Asset management →</button>
            </div>
          </div>
          <div className="meta flex items-center gap-3 text-paper/50 animate-riseIn" style={{ animationDelay: "320ms" }}>
            <span className="inline-block h-[26px] w-px bg-paper/35" style={{ transform: `scaleY(${1 - sp})`, transformOrigin: "top" }} />
            Scroll
          </div>
        </div>
      </ScrollStage>

      {/* ───────── The number */}
      <section className="relative z-10 overflow-hidden bg-forest-deep py-24 text-paper md:py-36">
        <div className="grain absolute inset-0" />
        <div className="relative mx-auto max-w-[1520px] px-6 md:px-12">
          <Reveal>
            <div className="meta mb-8 text-brass-light">Since 2016</div>
            <div className="fig font-medium leading-[.84] tracking-[-.02em]"
                 style={{ fontSize: "clamp(5rem,20vw,17rem)" }}>
              $1B+
            </div>
            <div className="mt-10 grid gap-10 border-t border-paper/20 pt-10 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-[34ch] font-display text-[clamp(1.4rem,2.8vw,2.2rem)] leading-[1.2]">
                In real estate transacted. Family owned, and still counting.
              </p>
              <dl className="grid grid-cols-3 gap-x-10 gap-y-2 md:gap-x-16">
                {([["$12,000+", "Avg. lease"], ["$10M–$250M", "Mandates"], ["2", "Offices"]] as [string, string][]).map(([v, k]) => (
                  <div key={k}>
                    <dd className="fig text-[clamp(1rem,2vw,1.6rem)] font-medium leading-none text-brass-light">{v}</dd>
                    <dt className="meta mt-3 text-paper/55">{k}</dt>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-8 max-w-[92ch] text-[11.5px] leading-[1.8] text-paper/45">
              Aggregate list value of sale and lease transactions in which the firm acted for a party, 2016 to date.
              Methodology on request.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────── Brief bar */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1520px] px-6 py-14 md:px-12 md:py-20">
          <IntelBar tone="light" onOpen={search} />
          <p className="meta mt-4 text-mute">Bedrooms, budget, city, covenant. Your words.</p>
        </div>
      </section>

      {/* ───────── Practices */}
      <section className="mx-auto max-w-[1520px] px-6 pb-24 md:px-12 md:pb-32">
        <Reveal className="mb-14">
          <div className="meta mb-6 text-brass">Four practices</div>
          <h2 className="max-w-[20ch] font-display text-[clamp(2.1rem,4.8vw,3.6rem)] leading-[1.06]">
            One set of books. One standard of diligence.
          </h2>
        </Reveal>
        <div className="divide-y divide-forest/14 border-y border-forest/14">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={i * 70}>
              <div className="grid gap-7 py-12 md:grid-cols-[auto_1fr_1fr] md:gap-14">
                <div className="meta pt-3 text-brass">{p.n}</div>
                <div>
                  <h3 className="font-display text-[clamp(1.6rem,3vw,2.35rem)] leading-[1.1]">{p.title}</h3>
                  <p className="mt-5 max-w-[34ch] text-[15px] leading-[1.8] text-ink/75">{p.line}</p>
                </div>
                <div>
                  <p className="max-w-[50ch] text-[14.5px] leading-[1.9] text-mute">{p.detail}</p>
                  <dl className="mt-8 border-t border-forest/14">
                    {p.stats.map(([k, v]) => (
                      <div key={k} className="flex items-baseline justify-between gap-6 border-b border-forest/14 py-3">
                        <dt className="meta text-mute">{k}</dt>
                        <dd className="fig text-[13px] text-forest">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────── The ownership argument. Our sharpest differentiator: the only way
                    to copy it is to buy the houses. Framed as judgment, not wealth. */}
      <section className="border-t border-forest/14 bg-paper-deep">
        <div className="mx-auto max-w-[1520px] px-6 py-24 md:px-12 md:py-32">
          <div className="grid items-start gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <div className="meta mb-6 text-brass">{OWNERSHIP.eyebrow}</div>
              <h2 className="max-w-[14ch] font-display text-[clamp(2.3rem,5.4vw,4.1rem)] leading-[1.02]">
                {OWNERSHIP.head}
              </h2>
              <figure className="mt-12 border-l border-brass/50 pl-7">
                <blockquote className="max-w-[26ch] font-display text-[clamp(1.25rem,2.2vw,1.72rem)] italic leading-[1.35] text-forest">
                  {OWNERSHIP.pull}
                </blockquote>
              </figure>
            </Reveal>

            <Reveal delay={80}>
              <div className="space-y-7 lg:pt-3">
                {OWNERSHIP.body.map((para, i) => (
                  <p key={i} className="max-w-[54ch] text-[15.5px] leading-[1.92] text-ink/80">{para}</p>
                ))}
              </div>
              <dl className="mt-12 border-t border-forest/14">
                {OWNERSHIP.proof.map(([k, v]) => (
                  <div key={k} className="grid gap-2 border-b border-forest/14 py-5 sm:grid-cols-[13rem_1fr] sm:gap-8">
                    <dt className="meta pt-[3px] text-forest">{k}</dt>
                    <dd className="text-[14.5px] leading-[1.75] text-mute">{v}</dd>
                  </div>
                ))}
              </dl>
              <button onClick={() => go("firm")}
                className="meta mt-10 inline-flex items-center gap-3 border-b border-forest/30 pb-2 text-forest transition-colors hover:border-brass hover:text-brass">
                The principals
                <svg width="22" height="8" viewBox="0 0 22 8" fill="none" aria-hidden>
                  <path d="M0 4h20M17 1l3.4 3-3.4 3" stroke="currentColor" strokeWidth="1" />
                </svg>
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── Track record, horizontally */}
      <section className="bg-forest py-24 text-paper md:py-32">
        <div className="mx-auto max-w-[1520px] px-6 md:px-12">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-8">
            <div>
              <div className="meta mb-6 text-brass-light">Sold &amp; leased</div>
              <h2 className="max-w-[18ch] font-display text-[clamp(2.1rem,4.8vw,3.6rem)] leading-[1.06]">
                The houses, and what they were asking.
              </h2>
            </div>
            <p className="max-w-[30ch] text-[14px] leading-[1.85] text-paper/70">
              Every competitor publishes a total. None publish the properties.
            </p>
          </Reveal>
          <Reveal delay={90}><Marquee items={TRACK} onOpen={() => go("track")} /></Reveal>
        </div>
      </section>

      {/* ───────── Available now */}
      <section className="mx-auto max-w-[1520px] px-6 py-24 md:px-12 md:py-32">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="meta mb-6 text-brass">Available now</div>
            <h2 className="max-w-[20ch] font-display text-[clamp(2.1rem,4.8vw,3.6rem)] leading-[1.06]">
              Executive leases and commercial.
            </h2>
          </div>
          <button onClick={() => go("collection")} className="meta link-u text-ink/70 hover:text-forest">The collection →</button>
        </Reveal>

        <div className="mb-16">
          <div className="meta mb-7 border-b border-forest/14 pb-4 text-mute">Executive leasing · $10,000+ per month</div>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {leases.map((l, i) => (
              <Reveal key={l.id} delay={(i % 3) * 70}>
                <ListingCard l={l} go={open} saved={saved.has(l.id)} toggle={() => toggleSave(l.id)} ratio="4/5" />
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <div className="meta mb-7 border-b border-forest/14 pb-4 text-mute">Commercial &amp; investment</div>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {commercial.map((l, i) => (
              <Reveal key={l.id} delay={(i % 3) * 70}>
                <ListingCard l={l} go={open} saved={saved.has(l.id)} toggle={() => toggleSave(l.id)} ratio="4/5" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Statement */}
      <section className="border-y border-forest/14 bg-paper-deep py-24 md:py-32">
        <div className="mx-auto max-w-[1520px] px-6 md:px-12">
          <Reveal>
            <h2 className="max-w-[22ch] font-display text-[clamp(2.2rem,5.6vw,4.4rem)] leading-[1.04]">
              Most brokerages sell you a house. We underwrite a decision.
            </h2>
            <div className="mt-12 grid gap-12 border-t border-forest/14 pt-12 md:grid-cols-3">
              {([
                ["Led by a lawyer", "Barrister & Solicitor (Ontario). Attorney at Law (NY, MN)."],
                ["Underwritten in-house", "Covenant, title, zoning, tax and downside, before price."],
                ["Family owned", "The people who answer for the advice own the firm."],
              ] as [string, string][]).map(([t, d], i) => (
                <Reveal key={t} delay={i * 80}>
                  <h3 className="font-display text-[22px] leading-tight">{t}</h3>
                  <p className="mt-4 max-w-[34ch] text-[14.5px] leading-[1.9] text-mute">{d}</p>
                </Reveal>
              ))}
            </div>
            <p className="meta mt-12 max-w-[86ch] leading-[1.9] text-mute/80">
              Danmar Empire Real Estate Corp., Brokerage does not provide legal services. Daniel Sheikhan acts for
              clients of the firm as a real estate broker, not as their solicitor.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────── Areas */}
      <section className="mx-auto max-w-[1520px] px-6 py-24 md:px-12 md:py-32">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="meta mb-6 text-brass">Where we act</div>
            <h2 className="max-w-[22ch] font-display text-[clamp(2.1rem,4.8vw,3.6rem)] leading-[1.06]">
              Oakville, King City, Toronto. Licensed Ontario-wide.
            </h2>
          </div>
          <button onClick={() => go("areas")} className="meta link-u text-ink/70 hover:text-forest">All areas →</button>
        </Reveal>
        <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.slice(0, 8).map((a, i) => (
            <Reveal key={a.slug} delay={(i % 4) * 60}>
              <button onClick={() => go("areas")} className="group block w-full border-t border-forest/14 pt-5 text-left">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-[22px] transition-colors group-hover:text-brass">{a.name}</h3>
                  <span className="meta text-mute/70">{a.region}</span>
                </div>
                <p className="meta mt-3 leading-[1.9] text-mute">{a.pockets.slice(0, 3).join(" · ")}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────── Leasing + furnishing */}
      <section className="bg-forest py-24 text-paper md:py-32">
        <div className="mx-auto grid max-w-[1520px] gap-16 px-6 md:px-12 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <Reveal>
            <div className="meta mb-6 text-brass-light">Executive leasing</div>
            <h2 className="max-w-[18ch] font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.08]">
              Landlords buy a covenant, not a tenant.
            </h2>
            <p className="mt-8 max-w-[44ch] text-[16px] leading-[1.85] text-paper/85">
              Corporate and diplomatic relocation from $10,000+ per month. We qualify the guarantee, not a credit file.
            </p>
            <div className="mt-12 flex flex-wrap items-baseline gap-x-12 gap-y-6 border-t border-paper/20 pt-10">
              <div>
                <div className="fig text-[clamp(2rem,4vw,3rem)] font-medium leading-none text-brass-light">+30–45%</div>
                <div className="meta mt-3 max-w-[22ch] leading-[1.8] text-paper/60">of base rent, fully furnished and installed</div>
              </div>
              <p className="max-w-[34ch] text-[14px] leading-[1.9] text-paper/70">
                Specified and installed by us through CB2, Crate &amp; Barrel, Anthropologie and RH. Not affiliated with any of them.
              </p>
            </div>
            <div className="mt-12 flex flex-wrap gap-5">
              <button onClick={() => go("leasing")} className="meta border border-paper/40 px-8 py-4 transition-colors hover:bg-paper hover:text-forest">
                The leasing practice
              </button>
              <button onClick={onEnquire} className="meta px-2 py-4 text-paper/75 link-u hover:text-paper">Brief the desk →</button>
            </div>
          </Reveal>
          <Reveal delay={110}>
            <div className="meta mb-7 text-paper/50">Covenants we place against</div>
            <ul className="border-t border-paper/20">
              {COVENANTS.map((c) => (
                <li key={c} className="flex items-baseline gap-5 border-b border-paper/20 py-5 text-[15px] text-paper/85">
                  <span className="mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full bg-brass-light" />{c}
                </li>
              ))}
            </ul>
            <p className="meta mt-7 leading-[1.9] text-paper/50">
              We describe the covenant, never the client.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────── Journal */}
      <section className="mx-auto max-w-[1520px] px-6 py-24 md:px-12 md:py-32">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="meta mb-6 text-brass">Journal</div>
            <h2 className="max-w-[20ch] font-display text-[clamp(2.1rem,4.8vw,3.6rem)] leading-[1.06]">
              What we publish is what we think.
            </h2>
          </div>
          <button onClick={() => go("journal")} className="meta link-u text-ink/70 hover:text-forest">All writing →</button>
        </Reveal>
        <div className="grid gap-px border border-forest/14 bg-forest/14 md:grid-cols-2">
          {JOURNAL.map((j, i) => (
            <Reveal key={j.id} delay={i * 60} className="bg-paper">
              <button onClick={() => go("journal")} className="group block h-full w-full p-9 text-left transition-colors hover:bg-paper-deep md:p-12">
                <div className="meta flex items-center gap-3 text-brass">{j.kind}<span className="text-mute">{j.date}</span></div>
                <h3 className="mt-5 max-w-[24ch] font-display text-[23px] leading-[1.2] md:text-[27px]">{j.title}</h3>
                <div className="meta mt-7 text-mute transition-colors group-hover:text-forest">Read · {j.read}</div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────── Offices */}
      <section className="border-t border-forest/14 bg-paper-deep py-20 md:py-24">
        <div className="mx-auto grid max-w-[1520px] gap-12 px-6 md:grid-cols-3 md:px-12">
          {OFFICES.map((o, i) => (
            <Reveal key={o.city} delay={i * 70}>
              <div className="meta mb-5 text-brass">{o.city}</div>
              <p className="font-display text-[21px] leading-snug">{o.addr}</p>
              <p className="mt-2 text-[14px] text-mute">{o.post}</p>
              <p className="meta mt-5 text-mute">{o.tel}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
