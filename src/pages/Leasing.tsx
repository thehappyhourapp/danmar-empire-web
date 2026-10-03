import { COVENANTS, LISTINGS } from "@/lib/data";
import { ImageFrame, useReveal } from "@/components/ImageFrame";
import { ListingCard } from "@/components/ListingCard";

function Reveal({ children, className = "", delay = 0 }: any) {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref} className={className} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

const FOR_LANDLORDS = [
  ["Covenant verification", "We qualify the guarantee behind the tenant: corporate undertaking, parent-company covenant, or diplomatic note. Personal credit files are the fallback, not the standard."],
  ["Term and escalation", "Twelve to thirty-six months with fixed escalation, not a twelve-month term that has to be renegotiated in month nine."],
  ["Turnkey presentation", "Furnishing, photography and the relocation package are produced in-house. A furnished executive property lets at a materially higher rate than the same house empty."],
  ["Managed handover", "Move-in inspection, schedule of condition, utilities transfer and a single point of contact for the term."],
];

const FOR_TENANTS = [
  ["One shortlist", "We are given a brief by your relocation department and we return a shortlist, not a portal link. Most placements close on the first or second viewing."],
  ["School and commute mapping", "Catchments, private-school proximity and realistic drive times, checked rather than assumed."],
  ["Discretion", "We do not name our tenants or their employers, publicly or to other landlords."],
  ["Paperwork that survives review", "Leases drafted to survive a corporate legal review, including assignment, early-termination and diplomatic-clause provisions."],
];

export function Leasing({ open, saved, toggleSave, onEnquire }: {
  open: (id: string) => void; saved: Set<string>; toggleSave: (id: string) => void; onEnquire: () => void;
}) {
  const leases = LISTINGS.filter((l) => l.intent === "lease");
  const top = leases.find((l) => l.id === "bridle-path")!;

  return (
    <div className="pt-[88px]">
      <section className="relative bg-forest-deep text-paper">
        <ImageFrame src={top.photo} hue={top.hue} ratio="auto" className="!absolute inset-0 h-full w-full" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/95 via-forest-deep/78 to-forest-deep" />
        <div className="relative mx-auto max-w-[1560px] px-6 py-24 md:px-10 md:py-36">
          <div className="meta mb-6 text-brass-light">Executive Leasing</div>
          <h1 className="max-w-[19ch] font-display text-[clamp(2.4rem,5.6vw,4.8rem)] leading-[1] tracking-[-.015em]">
            Ten thousand a month and up, placed against a verified covenant.
          </h1>
          <p className="mt-8 max-w-[58ch] text-[16px] leading-[1.8] text-paper/80">
            We act on both sides of the executive lease: for landlords who want the rent to arrive without a
            monthly conversation about it, and for relocation departments who want the search finished before
            the family lands.
          </p>
          <div className="mt-12 grid max-w-[760px] grid-cols-2 gap-px bg-paper/15 md:grid-cols-4">
            {[["$12,000+", "Average lease"], ["12–36", "Months, typical term"], ["$10k+", "Entry point"], ["+30–45%", "Furnished uplift"]].map(([v, k]) => (
              <div key={k} className="bg-forest-deep p-5">
                <div className="font-display text-[clamp(1.3rem,2.4vw,2rem)] leading-none">{v}</div>
                <div className="meta mt-2 text-paper/85">{k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1560px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <div className="meta mb-6 text-brass">For landlords</div>
            <h2 className="max-w-[18ch] font-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.06]">
              You are not letting a house. You are underwriting a payer.
            </h2>
            <dl className="mt-10 border-t border-forest/14">
              {FOR_LANDLORDS.map(([t, d]) => (
                <div key={t} className="border-b border-forest/14 py-6">
                  <dt className="font-display text-[19px]">{t}</dt>
                  <dd className="mt-2.5 max-w-[54ch] text-[14px] leading-[1.85] text-mute">{d}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={110}>
            <div className="meta mb-6 text-brass">For relocation departments</div>
            <h2 className="max-w-[18ch] font-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.06]">
              One brief in, one shortlist back.
            </h2>
            <dl className="mt-10 border-t border-forest/14">
              {FOR_TENANTS.map(([t, d]) => (
                <div key={t} className="border-b border-forest/14 py-6">
                  <dt className="font-display text-[19px]">{t}</dt>
                  <dd className="mt-2.5 max-w-[54ch] text-[14px] leading-[1.85] text-mute">{d}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-deep py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-6 md:px-10">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="meta mb-5 text-brass">Currently available</div>
              <h2 className="max-w-[20ch] font-display text-[clamp(1.8rem,3.6vw,2.9rem)] leading-[1.06]">
                Executive inventory, including properties held off the portals.
              </h2>
            </div>
            <span className="meta text-mute">{leases.length} properties</span>
          </div>
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {leases.map((l, i) => (
              <Reveal key={l.id} delay={(i % 3) * 90}>
                <ListingCard l={l} go={open} saved={saved.has(l.id)} toggle={() => toggleSave(l.id)} ratio={i === 0 ? "4/5" : "4/5"} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-deep py-20 text-paper md:py-28">
        <div className="mx-auto grid max-w-[1560px] gap-14 px-6 md:px-10 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <div className="meta mb-6 text-brass-light">Covenants we place against</div>
            <ul className="border-t border-paper/12">
              {COVENANTS.map((c) => (
                <li key={c} className="flex items-baseline gap-5 border-b border-paper/12 py-5 text-[15px] text-paper/80">
                  <span className="mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full bg-brass" />{c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="max-w-[20ch] font-display text-[clamp(1.7rem,3.2vw,2.6rem)] leading-[1.1]">
              We describe the covenant. We never name the client.
            </h2>
            <p className="mt-7 max-w-[52ch] text-[15px] leading-[1.9] text-paper/85">
              Tenant identity, employer and posting are confidential information held on behalf of our clients.
              We will confirm the strength and form of a covenant to a landlord in writing, because that is what
              the decision actually turns on. We will not publish who lives where, and we will not trade on a
              name for marketing.
            </p>
            <button onClick={onEnquire} className="meta mt-9 border border-paper/35 px-7 py-4 transition-colors hover:bg-paper hover:text-ink">
              Brief the leasing desk
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
