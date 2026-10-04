import Link from "next/link";
import { propertyHref } from "@/lib/routes";
import { Reveal } from "@/components/Reveal";
import { ClientAccessButton, EnquireButton } from "@/components/SiteShell";
import { LISTINGS } from "@/lib/data";
import { money } from "@/lib/parse";
import { ImageFrame } from "@/components/ImageFrame";

const NUMBERS: [string, string][] = [
  ["$750M+", "Transacted since 2016"],
  ["4.6 – 6.1%", "Going-in yield range"],
  ["3", "Asset classes underwritten"],
  ["GTA + Ontario", "Coverage"],
];

const PROCESS = [
  { n: "01", t: "Mandate", d: "We take a written mandate that states the return you need, the hold period, and the leverage you can actually get. Vague mandates produce vague inventory." },
  { n: "02", t: "Underwriting", d: "Rent roll, estoppels, environmental, zoning envelope and a stabilised pro forma before anything is shown. If an asset fails here you never see it." },
  { n: "03", t: "Structure", d: "Most of our investment files close through a corporation or a co-ownership. We work alongside your counsel and accountant on the holding structure before the offer, not after." },
  { n: "04", t: "Execution", d: "Conditions are written to protect the underwriting we have already done rather than to buy time to start it." },
];

export function Investments() {
  const assets = LISTINGS.filter((l) => l.useClass === "investment" && l.intent === "sale");

  return (
    <div className="pt-[88px]">
      {/* institutional register: numbers above the fold, unexplained */}
      <section className="border-b border-forest/14">
        <div className="mx-auto max-w-[1560px] px-6 pb-16 pt-10 md:px-10 md:pb-24 md:pt-14">
          <div className="meta mb-6 text-brass">Investment</div>
          <h1 className="max-w-[20ch] font-display text-[clamp(2.4rem,5.6vw,4.8rem)] leading-[1] tracking-[-.015em]">
            Underwritten before it is listed.
          </h1>
          <p className="mt-8 max-w-[58ch] text-[16px] leading-[1.8] text-ink/70">
            We act for private capital buying income property, land with approvals in hand, and single-tenant
            net lease across the Greater Toronto Area and the Ontario secondary markets. Diligence is done at
            our cost before an asset reaches you.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <EnquireButton className="meta border border-forest/25 px-7 py-4 transition-colors hover:bg-forest hover:text-paper">Request a mandate call</EnquireButton>
            <ClientAccessButton className="meta border border-forest/16 px-7 py-4 text-ink/70 transition-colors hover:border-ink/40 hover:text-ink">
              Investor login
            </ClientAccessButton>
          </div>
        </div>

        <div className="mx-auto max-w-[1560px] border-t border-forest/14 px-6 md:px-10">
          <div className="grid grid-cols-2 gap-px bg-forest/12 lg:grid-cols-4">
            {NUMBERS.map(([v, k], i) => (
              <Reveal key={k} delay={i * 70} className="flex flex-col items-center bg-paper px-4 py-12 text-center md:py-14">
                <div className="fig text-[clamp(1.3rem,2.8vw,2.2rem)] font-medium leading-[1.2] text-forest">{v}</div>
                <div className="meta mt-5 text-mute">{k}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* assets as case-style records, not a card grid */}
      <section className="mx-auto max-w-[1560px] px-6 py-20 md:px-10 md:py-28">
        <div className="meta mb-10 text-brass">Current mandates</div>
        <div className="border-t border-forest/14">
          {assets.map((a, i) => (
            <Reveal key={a.id} delay={i * 80}>
              <Link href={propertyHref(a.id)}
                className="group grid w-full gap-8 border-b border-forest/14 py-10 text-left md:grid-cols-[220px_1fr_auto] md:items-center md:gap-12">
                <ImageFrame src={a.photo} hue={a.hue} ratio="4/3" alt={a.name} className="transition-transform duration-700 group-hover:scale-[1.02]" />
                <div>
                  <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight transition-colors group-hover:text-brass">{a.name}</h3>
                  <p className="meta mt-3 text-mute">{a.kind} <span className="mx-2 opacity-40">/</span> {a.region}, {a.city}
                    {a.sqft ? <> <span className="mx-2 opacity-40">/</span> {a.sqft.toLocaleString("en-CA")} sq ft</> : null}</p>
                  <p className="mt-4 max-w-[62ch] text-[14px] leading-[1.8] text-ink/65">{a.standfirst}</p>
                </div>
                <dl className="shrink-0 md:text-right">
                  <dt className="meta text-mute">Price</dt>
                  <dd className="fig text-[16px] tabular-nums">{money(a.price)}</dd>
                  {a.capRate && (<>
                    <dt className="meta mt-4 text-mute">Going-in</dt>
                    <dd className="fig text-[16px] tabular-nums text-brass">{a.capRate.toFixed(1)}%</dd>
                  </>)}
                  {a.noi && (<>
                    <dt className="meta mt-4 text-mute">NOI</dt>
                    <dd className="fig text-[13px] tabular-nums">${a.noi.toLocaleString("en-CA")}</dd>
                  </>)}
                </dl>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* process */}
      <section className="bg-forest-deep py-20 text-paper md:py-28">
        <div className="mx-auto max-w-[1560px] px-6 md:px-10">
          <h2 className="mb-14 max-w-[24ch] font-display text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.06] tracking-[-.01em]">
            Four steps, in this order, without exception.
          </h2>
          <div className="grid gap-px bg-paper/12 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.n} delay={i * 80} className="bg-forest-deep p-8 md:p-10">
                <div className="meta text-brass-light">{p.n}</div>
                <h3 className="mt-5 font-display text-[24px] leading-tight">{p.t}</h3>
                <p className="mt-4 text-[14px] leading-[1.85] text-paper/60">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1560px] px-6 py-20 md:px-10 md:py-28">
        <div className="max-w-[60ch]">
          <div className="meta mb-5 text-brass">A note on disclosure</div>
          <p className="text-[15px] leading-[1.9] text-ink/75">
            Rent rolls, estoppel certificates, environmental reports and building condition assessments are released
            under a confidentiality agreement, not published. Off-market mandates are not listed on this site at all.
            If you are looking for something specific, the fastest route is to tell us the return and the hold, and let
            us check the book.
          </p>
          <EnquireButton className="meta mt-8 border border-forest/25 px-7 py-4 transition-colors hover:bg-forest hover:text-paper">
            Tell us your mandate
          </EnquireButton>
        </div>
      </section>
    </div>
  );
}
