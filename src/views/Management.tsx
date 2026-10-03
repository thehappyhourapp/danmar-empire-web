import Link from "next/link";
import { href } from "@/lib/routes";
import { Reveal } from "@/components/Reveal";
import { EnquireButton } from "@/components/SiteShell";
import { ImageFrame } from "@/components/ImageFrame";

const NUMBERS: [string, string][] = [
  ["$10M – $250M", "Mandate range"],
  ["Quarterly", "Written reporting"],
  ["Domestic & international", "Coverage"],
  ["Discretionary or advisory", "Engagement"],
];

const SERVICES = [
  { n: "01", t: "Portfolio construction", d: "We start from the return you need and the risk you can actually carry, then build toward it: asset class weighting, leverage policy, geographic concentration limits, and a disposal calendar rather than a vague intention to hold." },
  { n: "02", t: "Financing and capital calendar", d: "Every mortgage maturity, every lease expiry and every capital item on one calendar, worked eighteen months forward. Refinancing is arranged before a renewal window closes, not during it." },
  { n: "03", t: "Operating oversight", d: "Property management is supervised rather than assumed. We review the operating statements, challenge the variances, tender the recurring contracts, and report what actually happened against what was budgeted." },
  { n: "04", t: "Structure and tax coordination", d: "Holding structure, inter-corporate flows, and the question of which entity should own what. We work alongside your accountant and counsel rather than in place of them, and we say plainly when a question belongs to them." },
  { n: "05", t: "Acquisition and disposition", d: "Sourcing, underwriting and execution through the firm's investment desk, with the brokerage acting on the trade where a trade in real estate is involved." },
  { n: "06", t: "International portfolios", d: "Cross-border holdings coordinated with local counsel, local managers and local tax advice. The principal is licensed in Ontario, New York and Minnesota, which shortens the conversation on North American files considerably." },
];

export function Management() {
  return (
    <div className="pt-[88px]">
      <section className="relative bg-forest-deep text-paper">
        <ImageFrame hue={150} ratio="auto" className="!absolute inset-0 h-full w-full" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/95 via-forest-deep/80 to-forest-deep" />
        <div className="relative mx-auto max-w-[1520px] px-6 py-24 md:px-12 md:py-36">
          <div className="meta mb-7 text-brass-light">Asset & Portfolio Management</div>
          <h1 className="max-w-[19ch] font-display text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1.04] tracking-[-.005em]">
            Someone has to hold the whole portfolio in view.
          </h1>
          <p className="mt-9 max-w-[58ch] text-[16px] font-normal leading-[1.9] text-paper/82">
            We manage private real estate portfolios from $10 million to $250 million, in Ontario and abroad,
            on a discretionary or advisory basis. The work is unglamorous and it is the work that compounds:
            maturities, expiries, vacancy, capital, structure and tax, tracked on one calendar and reported in writing.
          </p>
          <p className="mt-6 max-w-[58ch] text-[14px] leading-[1.9] text-paper/60">
            Mandates are typically held by high-net-worth and ultra-high-net-worth (UHNW) families,
            private holding companies and the advisors who act for them.
          </p>
          <div className="mt-12 flex flex-wrap gap-5">
            <EnquireButton className="meta border border-paper/35 px-8 py-4 transition-colors hover:bg-paper hover:text-forest">
              Request a mandate call
            </EnquireButton>
            <EnquireButton className="meta border border-paper/20 px-8 py-4 text-paper/80 transition-colors hover:border-paper/50 hover:text-paper">
              Client login
            </EnquireButton>
          </div>
        </div>
      </section>

      <section className="border-b border-forest/14">
        <div className="mx-auto max-w-[1520px] px-6 md:px-12"><div className="grid grid-cols-2 gap-px bg-forest/12 lg:grid-cols-4">
          {NUMBERS.map(([v, k], i) => (
            <Reveal key={k} delay={i * 70}
              className="flex flex-col items-center bg-paper px-4 py-12 text-center md:py-16">
              <div className="fig text-[clamp(1.15rem,2.3vw,1.85rem)] font-medium leading-[1.2] text-forest">{v}</div>
              <div className="meta mt-4 text-mute">{k}</div>
            </Reveal>
          ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1520px] px-6 py-24 md:px-12 md:py-32">
        <Reveal className="mb-16 max-w-[54ch]">
          <div className="meta mb-6 text-brass">The mandate</div>
          <h2 className="font-display text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.1]">
            What we actually do, in the order it gets done.
          </h2>
        </Reveal>
        <div className="grid gap-px border border-forest/14 bg-forest/14 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} delay={(i % 3) * 80} className="bg-paper p-9 md:p-11">
              <div className="meta text-brass">{s.n}</div>
              <h3 className="mt-6 font-display text-[23px] leading-[1.2]">{s.t}</h3>
              <p className="mt-4 text-[14px] font-normal leading-[1.95] text-mute">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-forest py-24 text-paper md:py-32">
        <div className="mx-auto grid max-w-[1520px] gap-16 px-6 md:px-12 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal>
            <div className="meta mb-6 text-brass-light">Reporting</div>
            <h2 className="max-w-[20ch] font-display text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.12]">
              A quarterly document, not a phone call and a feeling.
            </h2>
            <p className="mt-8 max-w-[52ch] text-[15.5px] font-normal leading-[1.95] text-paper/82">
              Each quarter you receive a written report: position by asset, income against budget, occupancy
              and lease expiry schedule, debt schedule with maturities, capital spent and committed, and a
              recommendation list with our reasoning attached. It is reconciled to the operating accounts before
              it is sent.
            </p>
          </Reveal>
          <Reveal delay={110}>
            <dl className="border-t border-paper/15">
              {[["Position by asset", "Book and current value, ownership entity"],
                ["Income", "Actual against budget, with variance notes"],
                ["Occupancy", "Vacancy, expiries and renewal exposure"],
                ["Debt", "Rate, maturity, covenant headroom"],
                ["Capital", "Spent, committed, and deferred"],
                ["Recommendations", "With the reasoning, not just the conclusion"]].map(([k, v]) => (
                <div key={k} className="border-b border-paper/15 py-5">
                  <dt className="meta text-brass-light">{k}</dt>
                  <dd className="mt-2 text-[14px] font-normal text-paper/82">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1520px] px-6 py-24 md:px-12 md:py-32">
        <div className="max-w-[62ch]">
          <div className="meta mb-6 text-brass">A note on scope</div>
          <p className="text-[15.5px] font-normal leading-[1.95] text-ink/78">
            Asset and portfolio management is advisory and administrative work carried out for the owner of the
            portfolio. Where a mandate involves a trade in real estate, that trade is carried out by Danmar Empire
            Real Estate Corp., Brokerage. We do not offer securities, pooled investment products, or interests in
            any fund, and nothing on this page is an offer to do so.
          </p>
          <Link href={href("investments")} className="meta mt-10 border border-forest/25 px-8 py-4 transition-colors hover:bg-forest hover:text-paper">
            The investment practice
          </Link>
        </div>
      </section>
    </div>
  );
}
