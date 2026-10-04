"use client";

import { useEffect, useRef, useState } from "react";
import { LISTINGS } from "@/lib/data";
import { apply, EXAMPLES, isEmpty, parse, readback, suggestions, money } from "@/lib/parse";
import type { Query } from "@/lib/parse";
import { useSite } from "./SiteShell";
import m from "./motion.module.css";

/**
 * "What are you looking for?" — a natural-language brief bar.
 * Parsing is deterministic and runs entirely in the browser: no API, no key, no cost.
 * A hosted model slots in behind `parse()` only for queries this misses.
 */
export function IntelBar({
  tone = "dark", onOpen, autofocus = false, value, onValue,
}: {
  tone?: "dark" | "light";
  onOpen: (q: Query, text: string) => void;
  autofocus?: boolean;
  value?: string;
  onValue?: (s: string) => void;
}) {
  const [text, setText] = useState(value ?? "");
  const [focus, setFocus] = useState(false);
  const [ph, setPh] = useState(0);
  const ref = useRef<HTMLInputElement>(null);
  const dark = tone === "dark";

  useEffect(() => { if (value !== undefined) setText(value); }, [value]);
  useEffect(() => {
    if (text || focus) return;
    const t = setInterval(() => setPh((p) => (p + 1) % EXAMPLES.length), 4200);
    return () => clearInterval(t);
  }, [text, focus]);
  useEffect(() => { if (autofocus) ref.current?.focus(); }, [autofocus]);

  const q: Query = parse(text);
  const empty = isEmpty(q);
  const hits = empty ? [] : apply(LISTINGS, q);
  const read = readback(q);
  const sugg = suggestions(q, hits.length);
  const live = text.trim().length > 2 && focus;

  const set = (s: string) => { setText(s); onValue?.(s); };

  return (
    <div className="relative w-full">
      <div
        className={`flex items-center gap-4 border-b py-3 transition-colors duration-200 md:py-4 ${
          dark ? "border-paper/25" : "border-forest/14"
        } ${focus ? (dark ? "border-paper/60" : "border-forest/40") : ""}`}
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className={dark ? "text-paper/50" : "text-mute"}>
          <circle cx="7" cy="7" r="5.2" stroke="currentColor" strokeWidth="1.2" /><path d="M11 11l4 4" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <input
          ref={ref} value={text}
          onChange={(e) => set(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setTimeout(() => setFocus(false), 180)}
          onKeyDown={(e) => { if (e.key === "Enter" && !empty) onOpen(q, text); }}
          placeholder={EXAMPLES[ph]}
          className={`w-full bg-transparent text-[15px] font-normal outline-none md:text-[17px] ${
            dark ? "text-paper placeholder:text-paper/62" : "text-ink placeholder:text-forest/60"}`}
        />
        {text && (
          <button onClick={() => set("")} className={`meta shrink-0 ${dark ? "text-paper/62 hover:text-paper" : "text-mute hover:text-ink"}`}>Clear</button>
        )}
        <button
          onClick={() => onOpen(q, text)} disabled={empty}
          className={`${m.tlink} meta shrink-0 transition-colors duration-200 disabled:opacity-40 ${
            dark ? "text-paper" : "text-forest"}`}
        >
          {empty ? "Ask" : `${hits.length} match${hits.length === 1 ? "" : "es"}`}
        </button>
      </div>

      {/* read-back panel: the bar shows its work */}
      {live && (
        <div className={`absolute inset-x-0 top-full z-40 mt-2 border p-5 md:p-6 ${
          dark ? "border-paper/20 bg-forest-deep" : "border-forest/14 bg-paper"}`}>
          {empty ? (
            <p className={`text-[13px] ${dark ? "text-paper/55" : "text-mute"}`}>
              Describe it the way you would to a person. Bedrooms, budget, city, and what actually matters to you.
            </p>
          ) : (
            <>
              <div className={`meta mb-2 ${dark ? "text-brass-light" : "text-brass"}`}>Understood as</div>
              <p className={`font-display text-[19px] leading-snug md:text-[22px] ${dark ? "text-paper" : "text-ink"}`}>{read}</p>

              <div className={`my-4 h-px ${dark ? "bg-paper/12" : "bg-forest/12"}`} />

              {hits.length ? (
                <ul className="space-y-2">
                  {hits.slice(0, 4).map((l) => (
                    <li key={l.id} className={`flex items-baseline justify-between gap-6 text-[13px] ${dark ? "text-paper/85" : "text-ink/75"}`}>
                      <span className="truncate">
                        <span className={dark ? "text-paper" : "text-ink"}>{l.name}</span>
                        <span className={`ml-2 ${dark ? "text-paper/85" : "text-mute"}`}>{l.region}, {l.city}</span>
                      </span>
                      <span className="meta shrink-0">{l.tier === "Off-Market" ? "By enquiry" : money(l.price, l.intent === "lease")}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={`text-[13px] ${dark ? "text-paper/60" : "text-mute"}`}>
                  Nothing on the books matches that exactly. These would open it up:
                </p>
              )}

              {sugg.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {sugg.map((s) => (
                    <button key={s.label} onMouseDown={(e) => e.preventDefault()}
                      onClick={() => onOpen({ ...q, ...s.patch } as Query, text)}
                      className={`${m.tlink} meta transition-colors duration-200 ${
                        dark ? "text-paper/80 hover:text-paper" : "text-ink/70 hover:text-forest"}`}>
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

/** The bar as it sits on the homepage: a brief sends you to the collection. */
export function SiteIntelBar() {
  const { search } = useSite();
  return <IntelBar tone="light" onOpen={search} />;
}
