"use client";

import { useMemo } from "react";
import { LISTINGS } from "@/lib/data";
import { apply, EMPTY, isEmpty, readback } from "@/lib/parse";
import type { Query } from "@/lib/parse";
import { IntelBar } from "@/components/IntelBar";
import { ListingRow } from "@/components/ListingRow";
import { useSite } from "@/components/SiteShell";
import s from "@/components/motion.module.css";

/* Progressive enhancement over the server-rendered list: the first render is
   every listing (the query starts empty), so the HTML is complete without
   JavaScript. The brief bar and the lenses only narrow what is already there. */

const LENSES: { id: string; label: string; patch: Partial<Query> }[] = [
  { id: "all", label: "Everything", patch: { intent: null, lens: null } },
  { id: "invest", label: "Investment", patch: { lens: "investment", intent: "sale" } },
  { id: "sales", label: "Private Sales", patch: { lens: "residential", intent: "sale" } },
  { id: "lease", label: "Executive Leasing", patch: { intent: "lease", lens: null } },
];

export function CollectionList({ photos }: { photos: Record<string, string> }) {
  const { q, setQ, text, setText } = useSite();
  const results = useMemo(() => apply(LISTINGS, q), [q]);
  const activeLens =
    LENSES.find((l) => (l.patch.lens ?? null) === (q.lens ?? null) && (l.patch.intent ?? null) === (q.intent ?? null))?.id
    ?? (isEmpty(q) ? "all" : "");

  return (
    <>
      <div className="col-span-12 mt-14 lg:col-span-8 lg:mt-20">
        <IntelBar tone="light" value={text} onValue={setText} onOpen={(nq, t) => { setQ(nq); setText(t); }} />
        <p className="meta mt-3 text-ink/70">Bedrooms, budget, city, covenant. Your words.</p>
      </div>

      {/* lenses: plain text in a .meta row, the active one underlined */}
      <div className="sticky top-[var(--stick)] z-30 col-span-12 mt-12 border-y border-forest/14 bg-paper py-4">
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
          {LENSES.map((l) => (
            <button key={l.id} type="button" onClick={() => setQ({ ...q, ...l.patch } as Query)} aria-pressed={activeLens === l.id}
              className={`${s.tlink} meta ${activeLens === l.id ? `${s.tlinkOn} text-forest` : `${s.tlinkOff} text-ink/70 hover:text-forest`}`}>
              {l.label}
            </button>
          ))}
          <span className="meta ml-auto text-ink/70">{results.length} {results.length === 1 ? "property" : "properties"}</span>
        </div>
        {!isEmpty(q) && (
          <div className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-forest/14 pt-3">
            <span className="meta text-brass">Reading</span>
            <span className="text-[13px] text-ink/75">{readback(q)}</span>
            <button type="button" onClick={() => { setQ(EMPTY); setText(""); }} className={`${s.tlink} meta ml-auto text-ink/70 hover:text-forest`}>Reset</button>
          </div>
        )}
      </div>

      <div className="col-span-12 [&>div:first-child]:border-t-0">
        {results.length ? results.map((l, i) => <ListingRow key={l.id} l={l} index={i} photo={photos[l.id]} />) : (
          <div className="border-y border-forest/14 py-20">
            <p className="font-display text-[26px] font-medium text-ink/80">Nothing on the books matches that brief.</p>
            <p className="mt-4 max-w-[48ch] text-[14px] leading-[1.8] text-ink/70">
              We hold inventory that is never published. Tell us what you are looking for and we will check the
              off-market book before you widen the search.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
