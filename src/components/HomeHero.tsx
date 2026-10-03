"use client";

import Link from "next/link";
import { LISTINGS } from "@/lib/data";
import { href } from "@/lib/routes";
import { ImageFrame } from "./ImageFrame";
import { ScrollStage, useScrollProgress } from "./ScrollStage";

export function HomeHero() {
  const hero = LISTINGS.find((l) => l.id === "bronte-harbour")!;
  const sp = useScrollProgress();
  return (
    <>
      {/* ───────── Hero */}
      <ScrollStage progress={sp} media={
        <ImageFrame src={hero.photo} hue={hero.hue} ratio="auto" className="!absolute inset-0 h-full w-full" alt={hero.name} />
      }>
        <div className="mx-auto flex h-full max-w-[1520px] flex-col px-6 pb-10 pt-36 md:px-12 md:pt-44">
          <div className="flex flex-1 flex-col justify-center">
            <div className="meta mb-10 text-paper/60 animate-riseIn">
              Oakville <span className="mx-2 opacity-50">·</span> King City <span className="mx-2 opacity-50">·</span> Toronto
              <span className="mx-3 opacity-40">/</span> Est. 2016
            </div>
            <h1 className="max-w-[15ch] font-display text-[clamp(2.7rem,7.4vw,6.4rem)] leading-[1] animate-riseIn"
                style={{ animationDelay: "80ms" }}>
              Lawyer-led real estate.
            </h1>
            <p className="mt-9 max-w-[46ch] text-[17px] leading-[1.75] text-paper/85 animate-riseIn md:text-[19px]"
               style={{ animationDelay: "160ms" }}>
              Private portfolios from $10M to $250M. Executive leases from $10,000+.
              Commercial and investment across Ontario.
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-6 animate-riseIn" style={{ animationDelay: "240ms" }}>
              <Link href={href("track")}
                className="meta border border-paper/45 px-8 py-4 transition-colors hover:bg-paper hover:text-forest">
                $1B+ transacted
              </Link>
              <Link href={href("management")} className="meta text-paper/80 link-u hover:text-paper">Asset management →</Link>
            </div>
          </div>
          <div className="meta flex items-center gap-3 text-paper/50 animate-riseIn" style={{ animationDelay: "320ms" }}>
            <span className="inline-block h-[26px] w-px bg-paper/35" style={{ transform: `scaleY(${1 - sp})`, transformOrigin: "top" }} />
            Scroll
          </div>
        </div>
      </ScrollStage>
    </>
  );
}
