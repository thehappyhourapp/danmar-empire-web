import { useState } from "react";
import { LISTINGS } from "@/lib/data";
import type { Listing } from "@/lib/data";
import { money } from "@/lib/parse";
import { ImageFrame } from "@/components/ImageFrame";
import { SaveBtn, Tier, ListingCard } from "@/components/ListingCard";
import { project, VB, LAKE, ROADS, PLACES } from "@/lib/geo";

const TABS = ["Details", "Location", "Floorplan", "Brochure"] as const;

function MiniMap({ l }: { l: Listing }) {
  const p = project(l.lng, l.lat);
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#07241B]">
      <svg viewBox={`${Math.max(0, p.x - 190)} ${Math.max(0, p.y - 107)} 380 214`} className="h-full w-full">
        <rect x="0" y="0" width={VB.w} height={VB.h} fill="#07241B" />
        <path d={LAKE} fill="#11332A" stroke="rgba(198,169,107,.3)" strokeWidth="1" />
        {ROADS.map((r) => <path key={r.label} d={r.d} fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="1.2" />)}
        {PLACES.map((pl) => {
          const q = project(pl.lng, pl.lat);
          return <text key={pl.name} x={q.x + 6} y={q.y + 3} fill="rgba(243,241,236,.4)" fontSize="9"
            fontFamily="Libre Franklin, sans-serif" fontWeight="500" letterSpacing="1.4">{pl.name.toUpperCase()}</text>;
        })}
        <circle cx={p.x} cy={p.y} r="16" fill="rgba(198,169,107,.18)" />
        <circle cx={p.x} cy={p.y} r="5" fill="#C6A96B" stroke="#07241B" strokeWidth="1.5" />
      </svg>
      <p className="meta absolute bottom-3 left-3 text-paper/85">Approximate location</p>
    </div>
  );
}

export function Property({ l, open, back, saved, toggleSave, onEnquire }: {
  l: Listing; open: (id: string) => void; back: () => void;
  saved: Set<string>; toggleSave: (id: string) => void; onEnquire: () => void;
}) {
  const [tab, setTab] = useState<typeof TABS[number]>("Details");
  const lease = l.intent === "lease";
  const more = LISTINGS.filter((x) => x.id !== l.id && (x.city === l.city || x.useClass === l.useClass)).slice(0, 3);

  const specs: [string, string][] = [
    ["Address", l.address],
    ["Submarket", `${l.region}, ${l.city}`],
    ["Type", l.kind],
    ["Tenure", l.tenure],
    ...(l.beds ? ([["Bedrooms", String(l.beds)]] as [string, string][]) : []),
    ...(l.baths ? ([["Bathrooms", String(l.baths)]] as [string, string][]) : []),
    ...(l.sqft ? ([["Area", `${l.sqft.toLocaleString("en-CA")} sq ft`]] as [string, string][]) : []),
    ...(l.capRate ? ([["Going-in yield", `${l.capRate.toFixed(1)}%`]] as [string, string][]) : []),
    ...(l.noi ? ([["Net operating income", `$${l.noi.toLocaleString("en-CA")}`]] as [string, string][]) : []),
    ["Status", l.status],
  ];

  return (
    <div className="pt-[88px]">
      <div className="mx-auto max-w-[1560px] px-6 md:px-10">
        <button onClick={back} className="meta py-8 text-mute link-u hover:text-ink">← The Collection</button>

        {/* name alone, then one line of data */}
        <header className="max-w-[22ch]">
          <div className="mb-5 flex items-center gap-3"><Tier t={l.tier} /></div>
          <h1 className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[.98] tracking-[-.015em]">{l.name}</h1>
        </header>
        <p className="meta mt-7 text-mute">
          {money(l.price, lease)} <span className="mx-2 opacity-40">/</span> {l.tenure}
          <span className="mx-2 opacity-40">/</span> {l.region}, {l.city}
        </p>

        <div className="relative mt-10">
          <ImageFrame src={l.photo} hue={l.hue} ratio="21/10" alt={l.name} />
          <div className="absolute right-5 top-5"><SaveBtn on={saved.has(l.id)} toggle={() => toggleSave(l.id)} /></div>
        </div>

        {/* invitations, not a lead-capture form */}
        <div className="mt-8 flex flex-wrap items-center gap-4 border-b border-forest/14 pb-10">
          <button onClick={onEnquire} className="meta border border-forest/25 px-7 py-4 transition-colors hover:bg-forest hover:text-paper">
            {lease ? "Request a viewing" : "Request a private viewing"}
          </button>
          <button onClick={onEnquire} className="meta border border-forest/16 px-7 py-4 text-ink/70 transition-colors hover:border-ink/40 hover:text-ink">
            {l.useClass === "investment" ? "Request the diligence package" : "Register for similar properties"}
          </button>
          <div className="meta ml-auto flex gap-5 text-mute">
            <a className="link-u" href={`mailto:?subject=${encodeURIComponent(l.name)}`}>Email</a>
            <a className="link-u" href="#" onClick={(e) => e.preventDefault()}>WhatsApp</a>
          </div>
        </div>

        {/* prose before specification, pull-quote first */}
        <div className="grid gap-16 py-16 md:py-20 lg:grid-cols-[1.35fr_1fr] lg:gap-24">
          <div>
            <blockquote className="max-w-[30ch] font-display text-[clamp(1.6rem,3.2vw,2.5rem)] leading-[1.18] tracking-[-.01em]">
              “{l.standfirst}”
            </blockquote>
            <div className="mt-10 max-w-[62ch] space-y-6 text-[15px] leading-[1.9] text-ink/78">
              {l.body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <p className="meta mt-10 text-mute">
              Listed by Danmar Empire Real Estate Corp., Brokerage
            </p>
          </div>

          <aside>
            <div className="meta mb-5 text-brass">Particulars</div>
            <dl className="border-t border-forest/14">
              {specs.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-6 border-b border-forest/14 py-3.5">
                  <dt className="meta text-mute">{k}</dt>
                  <dd className="text-right fig text-[12px] tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
            {l.features.length > 0 && (
              <>
                <div className="meta mb-4 mt-10 text-brass">Notable</div>
                <ul className="space-y-2.5">
                  {l.features.map((f) => (
                    <li key={f} className="flex items-baseline gap-3 text-[14px] capitalize text-ink/75">
                      <span className="mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full bg-brass" />{f}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </aside>
        </div>

        {/* gallery: a grid with a link out, not a carousel you are trapped in */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <ImageFrame key={i} src={l.photo} hue={l.hue + i * 34} ratio="1/1" alt="" />
          ))}
        </div>
        <button className="meta mt-4 text-mute link-u hover:text-ink">More photographs →</button>

        {/* every MLS artefact deferred into one quiet tab row */}
        <div className="mt-20">
          <div className="flex flex-wrap gap-8 border-b border-forest/14">
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`meta pb-4 transition-colors ${tab === t ? "text-ink" : "text-mute hover:text-ink"}`}>
                {t}{tab === t && <span className="mt-[15px] block h-px w-full bg-brass" />}
              </button>
            ))}
          </div>
          <div className="py-10">
            {tab === "Location" && <MiniMap l={l} />}
            {tab === "Details" && (
              <div className="grid gap-x-14 gap-y-3 md:grid-cols-2">
                {specs.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-6 border-b border-forest/12 py-3">
                    <span className="meta text-mute">{k}</span><span className="fig text-[12px]">{v}</span>
                  </div>
                ))}
              </div>
            )}
            {(tab === "Floorplan" || tab === "Brochure") && (
              <div className="flex flex-wrap items-center gap-6 border border-dashed border-forest/25 p-10">
                <p className="max-w-[46ch] text-[14px] leading-[1.8] text-mute">
                  {tab === "Floorplan"
                    ? "Measured floorplans are released with the viewing confirmation."
                    : "The full brochure, including survey and mechanical schedules, is available on request."}
                </p>
                <button onClick={onEnquire} className="meta ml-auto border border-forest/25 px-6 py-3 hover:bg-forest hover:text-paper">Request</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* related */}
      <section className="mt-16 border-t border-forest/14 bg-paper-deep py-20 md:py-28">
        <div className="mx-auto max-w-[1560px] px-6 md:px-10">
          <div className="meta mb-10 text-brass">Also on the books</div>
          <div className="grid gap-8 md:grid-cols-3">
            {more.map((m) => (
              <ListingCard key={m.id} l={m} go={open} saved={saved.has(m.id)} toggle={() => toggleSave(m.id)} ratio="4/5" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
