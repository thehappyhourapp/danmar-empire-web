import { useMemo, useState } from "react";
import { TRACK } from "@/lib/data";
import { money } from "@/lib/parse";
import { ImageFrame, useReveal } from "@/components/ImageFrame";

function Reveal({ children, className = "", delay = 0 }: any) {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref} className={className} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

type Filter = "all" | "Sold" | "Leased";

/**
 * The proof page. Competitors publish a dollar total; this publishes the houses.
 * Every entry requires written consent from the parties before it goes live —
 * see the note at the foot of the page.
 */
export function Track({ onEnquire }: { onEnquire: () => void }) {
  const [f, setF] = useState<Filter>("all");
  const rows = useMemo(() => (f === "all" ? TRACK : TRACK.filter((t) => t.kind === f)), [f]);
  const sold = TRACK.filter((t) => t.kind === "Sold");
  const leased = TRACK.filter((t) => t.kind === "Leased");

  return (
    <div className="pt-[88px]">
      <section className="mx-auto max-w-[1520px] px-6 pb-12 pt-12 md:px-12 md:pt-16">
        <div className="meta mb-7 text-brass">Track Record</div>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <h1 className="max-w-[18ch] font-display text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1.04] tracking-[-.005em]">
            Anyone can print a number. These are the houses.
          </h1>
          <p className="max-w-[42ch] text-[14.5px] font-normal leading-[1.9] text-mute">
            Selected sale and lease transactions in which the firm acted for a party. Figures shown are list
            prices at the time of the transaction, published with the written consent of the parties involved.
          </p>
        </div>
      </section>

      <div className="sticky top-[var(--stick)] z-30 border-y border-forest/14 bg-paper/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1520px] flex-wrap items-center gap-x-8 gap-y-3 px-6 py-4 md:px-12">
          {([["all", "Everything"], ["Sold", `Sold · ${sold.length}`], ["Leased", `Leased · ${leased.length}`]] as [Filter, string][]).map(([id, label]) => (
            <button key={id} onClick={() => setF(id)}
              className={`meta transition-colors ${f === id ? "text-forest" : "text-mute hover:text-forest"}`}>
              {label}{f === id && <span className="mt-1 block h-px w-full bg-brass" />}
            </button>
          ))}
          <span className="meta ml-auto text-mute">{rows.length} shown</span>
        </div>
      </div>

      {/* the visual wall */}
      <section className="mx-auto max-w-[1520px] px-6 py-16 md:px-12 md:py-24">
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-12">
          {rows.map((t, i) => {
            const pat = [
              ["md:col-span-8", "16/9"], ["md:col-span-4 md:pt-24", "3/4"],
              ["md:col-span-4", "3/4"], ["md:col-span-8 md:pt-16", "16/9"],
              ["md:col-span-6", "5/4"], ["md:col-span-6 md:pt-14", "5/4"],
            ][i % 6];
            const lease = t.kind === "Leased";
            return (
              <Reveal key={t.id} className={pat[0]} delay={(i % 2) * 100}>
                <article className="group">
                  <ImageFrame src={t.photo} hue={t.hue} ratio={pat[1]} alt={t.place}
                    className="transition-[filter] duration-[900ms] group-hover:brightness-110">
                    <span className="meta absolute left-5 top-5 border border-paper/50 bg-forest-deep/45 px-2.5 py-1 text-paper backdrop-blur-sm">
                      {t.kind} {t.year}
                    </span>
                  </ImageFrame>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-6">
                    <h2 className="font-display text-[clamp(1.35rem,2.4vw,1.95rem)] leading-tight">{t.place}</h2>
                    <span className="shrink-0 fig text-[14px] tabular-nums text-forest">
                      {lease ? `$${t.list.toLocaleString("en-CA")}/mo` : money(t.list)}
                    </span>
                  </div>
                  <p className="meta mt-3 text-mute">
                    {t.city} <span className="mx-1.5 opacity-40">/</span> {t.type}
                    <span className="mx-1.5 opacity-40">/</span> List price
                  </p>
                  <p className="mt-4 max-w-[44ch] text-[14px] font-normal leading-[1.9] text-mute">{t.note}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* the table, for the reader who wants it dense */}
      <section className="border-t border-forest/14 bg-paper-deep py-20 md:py-24">
        <div className="mx-auto max-w-[1520px] px-6 md:px-12">
          <div className="meta mb-8 text-brass">The same record, as a table</div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr className="border-b border-forest/20">
                  {["Property", "Market", "Type", "Transaction", "Year", "List price"].map((h) => (
                    <th key={h} className="meta px-4 py-4 text-left text-mute first:pl-0">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((t) => (
                  <tr key={t.id} className="border-b border-forest/12">
                    <td className="px-4 py-4 font-display text-[17px] first:pl-0">{t.place}</td>
                    <td className="meta px-4 py-4 text-mute">{t.city}</td>
                    <td className="meta px-4 py-4 text-mute">{t.type}</td>
                    <td className="meta px-4 py-4 text-forest">{t.kind}</td>
                    <td className="meta px-4 py-4 text-mute">{t.year}</td>
                    <td className="px-4 py-4 fig text-[12.5px] tabular-nums">
                      {t.kind === "Leased" ? `$${t.list.toLocaleString("en-CA")}/mo` : money(t.list)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-forest py-20 text-paper md:py-28">
        <div className="mx-auto flex max-w-[1520px] flex-wrap items-end justify-between gap-10 px-6 md:px-12">
          <div>
            <h2 className="max-w-[24ch] font-display text-[clamp(1.7rem,3.4vw,2.7rem)] leading-[1.12]">
              Most of what we transact is never published at all.
            </h2>
            <p className="mt-6 max-w-[54ch] text-[15px] font-normal leading-[1.9] text-paper/80">
              Roughly one file in four is off-market, and those are not shown here at any price. If you are
              buying or selling at this level and discretion matters more than exposure, that is the conversation
              to have.
            </p>
          </div>
          <button onClick={onEnquire} className="meta border border-paper/35 px-8 py-4 transition-colors hover:bg-paper hover:text-forest">
            Speak privately
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-[1520px] px-6 py-14 md:px-12">
        <p className="meta max-w-[104ch] leading-[2] text-mute">
          Transactions are published with the written consent of the relevant party. Figures shown are list prices
          at the time of the transaction and are not sale prices. Danmar Empire Real Estate Corp., Brokerage acted
          for one or more parties in each transaction shown; acting for a party does not imply the firm acted for
          all parties. Not intended to solicit properties currently under contract.
        </p>
      </section>
    </div>
  );
}
