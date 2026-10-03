import { useMemo, useState } from "react";
import { LISTINGS } from "@/lib/data";
import { apply, isEmpty, readback } from "@/lib/parse";
import type { Query } from "@/lib/parse";
import { IntelBar } from "@/components/IntelBar";
import { ListingCard } from "@/components/ListingCard";

/* Own listings only. The firm signs the TRREB DLA (its own listings with full
   agent detail) and deliberately not IDX or VOW: a searchable map of every
   board listing is the generic portal look this site exists to avoid, and the
   curated book is the thing a boutique firm is actually judged on. */

const LENSES: { id: string; label: string; patch: Partial<Query> }[] = [
  { id: "all", label: "Everything", patch: { intent: null, lens: null } },
  { id: "invest", label: "Investment", patch: { lens: "investment", intent: "sale" } },
  { id: "sales", label: "Private Sales", patch: { lens: "residential", intent: "sale" } },
  { id: "lease", label: "Executive Leasing", patch: { intent: "lease", lens: null } },
];

export function Collection({
  q, setQ, text, setText, open, saved, toggleSave,
}: {
  q: Query; setQ: (q: Query) => void; text: string; setText: (s: string) => void;
  open: (id: string) => void; saved: Set<string>; toggleSave: (id: string) => void;
}) {
  const [sort, setSort] = useState<"new" | "asc" | "desc">("new");

  const results = useMemo(() => {
    const r = apply(LISTINGS, q);
    if (sort === "asc") return [...r].sort((a, b) => a.price - b.price);
    if (sort === "desc") return [...r].sort((a, b) => b.price - a.price);
    return r;
  }, [q, sort]);

  const activeLens = LENSES.find((l) =>
    (l.patch.lens ?? null) === (q.lens ?? null) && (l.patch.intent ?? null) === (q.intent ?? null))?.id
    ?? (isEmpty(q) ? "all" : "");

  return (
    <div className="pt-[88px]">
      {/* header */}
      <div className="mx-auto max-w-[1560px] px-6 pb-8 pt-10 md:px-10 md:pt-12">
        <div className="meta mb-5 text-brass">The Collection</div>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h1 className="max-w-[18ch] font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] tracking-[-.005em]">
            Our own listings, and nothing else.
          </h1>
          <p className="max-w-[44ch] text-[14px] font-normal leading-[1.85] text-mute">
            Properties held by Danmar Empire Real Estate Corp., Brokerage. Every one has been underwritten,
            photographed and written by us before it was priced. We do not republish the rest of the board,
            because a list of everything is not an opinion about anything.
          </p>
        </div>

        <div className="mt-10 max-w-[820px]">
          <IntelBar tone="light" value={text} onValue={setText} onOpen={(nq, t) => { setQ(nq); setText(t); }} />
        </div>
      </div>

      {/* control strip */}
      <div className="sticky top-[var(--stick)] z-30 border-y border-forest/14 bg-paper/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1560px] flex-wrap items-center gap-x-8 gap-y-3 px-6 py-4 md:px-10">
          <div className="flex flex-wrap items-center gap-6">
            {LENSES.map((l) => (
              <button key={l.id} onClick={() => { setQ({ ...q, ...l.patch } as Query); }}
                className={`meta transition-colors ${activeLens === l.id ? "text-ink" : "text-mute hover:text-ink"}`}>
                {l.label}
                {activeLens === l.id && <span className="mt-1 block h-px w-full bg-brass" />}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-6">
            <span className="meta text-mute">{results.length} {results.length === 1 ? "property" : "properties"}</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as "new" | "asc" | "desc")}
              className="meta cursor-pointer border-0 bg-transparent text-ink outline-none">
              <option value="new">Most recent</option>
              <option value="desc">Price, high to low</option>
              <option value="asc">Price, low to high</option>
            </select>
          </div>
        </div>

        {!isEmpty(q) && (
          <div className="mx-auto flex max-w-[1560px] flex-wrap items-center gap-4 border-t border-forest/12 px-6 py-3 md:px-10">
            <span className="meta text-brass">Reading</span>
            <span className="text-[13px] text-ink/75">{readback(q)}</span>
            <button onClick={() => { setQ({ intent: null, minPrice: null, maxPrice: null, beds: null, baths: null, cities: [], kinds: [], features: [], lens: null, unparsed: [] }); setText(""); }}
              className="meta ml-auto text-mute hover:text-ink">Reset</button>
          </div>
        )}
      </div>

      {/* body */}
      <div className="mx-auto max-w-[1560px] px-6 pb-16 pt-10 md:px-10 md:pb-24 md:pt-14">
        {results.length ? (
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-12">
            {results.map((l, i) => {
              const pat = [
                ["md:col-span-7", "16/11"], ["md:col-span-5 md:pt-20", "4/5"],
                ["md:col-span-5", "4/5"], ["md:col-span-7 md:pt-16", "16/11"],
                ["md:col-span-6", "5/4"], ["md:col-span-6 md:pt-14", "5/4"],
              ][i % 6];
              return (
                <div key={l.id} className={pat[0]}>
                  <ListingCard l={l} go={open} saved={saved.has(l.id)} toggle={() => toggleSave(l.id)}
                    ratio={pat[1]} size={i % 3 === 0 ? "lg" : "md"} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-28 text-center">
            <p className="font-display text-[26px] text-ink/70">Nothing on the books matches that brief.</p>
            <p className="mx-auto mt-4 max-w-[48ch] text-[14px] leading-[1.8] text-mute">
              We hold inventory that is never published. Tell us what you are looking for and we will check the
              off-market book before you widen the search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
