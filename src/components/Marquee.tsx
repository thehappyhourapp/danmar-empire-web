"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Record_ } from "@/lib/data";
import { money } from "@/lib/parse";
import { ImageFrame } from "./ImageFrame";

/**
 * Horizontal band inside a vertical page. Drag, wheel or arrow through it.
 * Used once, for the track record, where the point is volume of proof.
 */
export function Marquee({ items, href }: { items: Record_[]; href: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const f = () => setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 24);
    el.addEventListener("scroll", f, { passive: true }); f();
    return () => el.removeEventListener("scroll", f);
  }, []);

  const nudge = (d: number) => ref.current?.scrollBy({ left: d * 460, behavior: "smooth" });

  return (
    <div className="relative">
      <div ref={ref}
        className="thin flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6"
        style={{ scrollbarWidth: "thin" }}>
        {items.map((t) => (
          <Link key={t.id} href={href}
            className="group w-[300px] shrink-0 snap-start text-left md:w-[420px]">
            <ImageFrame src={t.photo} hue={t.hue} ratio="4/5" alt={t.place}
              className="transition-[filter] duration-700 group-hover:brightness-110">
              <span className="meta absolute left-4 top-4 border border-paper/50 bg-forest-deep/45 px-2.5 py-1 text-paper backdrop-blur-sm">
                {t.kind} {t.year}
              </span>
            </ImageFrame>
            <div className="flex items-baseline justify-between gap-4 pt-5">
              <h3 className="font-display text-[21px] leading-tight md:text-[24px]">{t.place}</h3>
              <span className="fig shrink-0 text-[14px] text-brass-light">
                {t.kind === "Leased" ? `$${t.list.toLocaleString("en-CA")}/mo` : money(t.list)}
              </span>
            </div>
            <p className="meta mt-2.5 text-paper/60">{t.city}</p>
          </Link>
        ))}
        <Link href={href}
          className="flex w-[240px] shrink-0 snap-start flex-col items-start justify-center border border-paper/25 p-8 text-left transition-colors hover:border-paper/60">
          <span className="font-display text-[26px] leading-tight text-paper">The full record</span>
          <span className="meta mt-4 text-brass-light">View all →</span>
        </Link>
      </div>

      <div className="mt-2 flex items-center gap-4">
        <button onClick={() => nudge(-1)} aria-label="Previous"
          className="grid h-10 w-10 place-items-center border border-paper/25 text-paper/70 transition-colors hover:border-paper hover:text-paper">←</button>
        <button onClick={() => nudge(1)} aria-label="Next"
          className={`grid h-10 w-10 place-items-center border text-paper/70 transition-colors hover:border-paper hover:text-paper ${atEnd ? "border-paper/12" : "border-paper/25"}`}>→</button>
        <span className="meta ml-2 text-paper/45">Drag or scroll</span>
      </div>
    </div>
  );
}
