import { OFFICES, PRACTICES, TEAM } from "@/lib/data";
import { ImageFrame, useReveal } from "@/components/ImageFrame";

function Reveal({ children, className = "", delay = 0 }: any) {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref} className={className} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function Firm({ onEnquire, go }: { onEnquire: () => void; go: (p: string) => void }) {
  return (
    <div className="pt-[88px]">
      <section className="mx-auto max-w-[1560px] px-6 pb-16 pt-10 md:px-10 md:pb-24 md:pt-14">
        <div className="meta mb-6 text-brass">The Firm</div>
        <h1 className="max-w-[20ch] font-display text-[clamp(2.4rem,5.6vw,4.8rem)] leading-[1] tracking-[-.015em]">
A family firm that runs files like a practice.
        </h1>
        <div className="mt-12 grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <div className="max-w-[62ch] space-y-6 text-[15px] leading-[1.9] text-ink/78">
            <p>
              Danmar Empire was founded in Oakville in 2016 by Martin Sheikhan, who spent three decades running
              capital projects before he ever took a listing, and by his son Daniel, who is called to the bar in
              Ontario and admitted in New York and Minnesota.
            </p>
            <p>
              That combination is the whole reason the firm looks the way it does. Project managers do not present
              a building without the numbers behind it. Lawyers do not send a document out that has not been read
              twice. Applied to real estate, those two habits produce a firm that turns down more mandates than it
              takes and does not compete on listing volume.
            </p>
            <p>
              We work in four places: asset and portfolio management for private owners holding $10 million to
              $250 million, investment property, private residential sales above $1.5 million, and executive
              leasing. We are deliberately not a generalist shop. What we know well we know very well, and we say
              so plainly when a file belongs somewhere else.
            </p>
            <p>
              It remains a family business. That is not sentiment: it means the people who answer for the advice
              are the people who own the firm, and they are still here in ten years to answer for it again.
            </p>
          </div>
          <div>
            <dl className="border-t border-forest/14">
              {[["Founded", "2016, Oakville"], ["Ownership", "Family owned"], ["Registration", "RECO, Ontario"], ["Offices", "Oakville · Vaughan"], ["Licensed", "Province-wide"], ["Transacted", "$1B+"], ["Mandates", "$10M – $250M portfolios"]].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-6 border-b border-forest/14 py-4">
                  <dt className="meta text-mute">{k}</dt><dd className="fig text-[12px]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-paper-deep py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-6 md:px-10">
          <div className="meta mb-12 text-brass">People</div>
          <div className="grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 90}>
                <button onClick={() => go(p.slug)} className="group block w-full text-left">
                  <ImageFrame hue={(i * 47) % 360} ratio="3/4" tone="dark" alt={p.name}
                    className="transition-[filter] duration-700 group-hover:brightness-110" />
                  <h3 className="mt-5 font-display text-[21px] leading-tight transition-colors group-hover:text-brass">{p.name}</h3>
                  <p className="meta mt-2 text-brass">{p.role}</p>
                  <p className="mt-3 max-w-[38ch] text-[14px] leading-[1.8] text-mute">{p.line}</p>
                  <span className="meta mt-4 inline-block text-mute transition-colors group-hover:text-forest">Profile →</span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related practices — a disclosure, placed where it can be seen */}
      <section className="bg-forest py-20 text-paper md:py-28">
        <div className="mx-auto grid max-w-[1560px] gap-14 px-6 md:px-10 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
          <div>
            <div className="meta mb-6 text-brass-light">Related practices</div>
            <h2 className="max-w-[20ch] font-display text-[clamp(1.7rem,3.4vw,2.7rem)] leading-[1.12]">
              Two law firms sit alongside the brokerage. You are never obliged to use either.
            </h2>
            <p className="mt-8 max-w-[52ch] text-[15px] font-normal leading-[1.95] text-paper/80">
              Daniel Sheikhan holds an interest in both practices below. We disclose that plainly because a
              registrant who refers you to a business they have an interest in is required to, and because you
              should be free to instruct whichever solicitor you prefer.
            </p>
          </div>
          <div>
            <ul className="border-t border-paper/15">
              {PRACTICES.map((pr) => (
                <li key={pr.name} className="border-b border-paper/15 py-7">
                  <div className="font-display text-[21px] leading-tight">{pr.name}</div>
                  <div className="meta mt-3 text-brass-light">{pr.role}</div>
                  <p className="mt-3 max-w-[54ch] text-[14px] font-normal leading-[1.9] text-paper/85">{pr.line}</p>
                </li>
              ))}
            </ul>
            <p className="meta mt-7 leading-[1.95] text-paper/60">
              Danmar Empire Real Estate Corp., Brokerage does not provide legal services, and instructing either
              firm is never a condition of any transaction with the brokerage.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1560px] px-6 py-20 md:px-10 md:py-28">
        <div className="meta mb-12 text-brass">Offices</div>
        <div className="grid gap-px border border-forest/14 bg-forest/12 md:grid-cols-3">
          {OFFICES.map((o) => (
            <div key={o.city} className="bg-paper p-8 md:p-11">
              <div className="meta text-mute">{o.city}</div>
              <p className="mt-5 font-display text-[23px] leading-snug">{o.addr}</p>
              <p className="mt-2 text-[14px] text-mute">{o.post}</p>
              <p className="meta mt-6 text-ink/70">{o.tel}</p>
            </div>
          ))}
        </div>
        <button onClick={onEnquire} className="meta mt-12 border border-forest/25 px-7 py-4 transition-colors hover:bg-forest hover:text-paper">
          Arrange a meeting
        </button>
      </section>
    </div>
  );
}
