import { JOURNAL } from "@/lib/data";
import { Chapter, GRID, HEAD, Lines, delay } from "@/components/Chapter";
import { MotionController } from "@/components/MotionController";
import { EnquireButton } from "@/components/SiteShell";
import s from "@/components/motion.module.css";

/* The Journal: cream, line rise only. A list of what the firm has written, as
   rows. The pieces have no published bodies yet, so the rows do not link. */

export function Journal() {
  return (
    <div id="journal">
      <MotionController rootId="journal" />
      <Chapter inner="pb-24 pt-32 md:pt-40 lg:pb-40">
        {/* ── head */}
        <div className="col-span-12 lg:col-span-8">
          <h1 className="max-w-[20ch] font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-medium leading-[1.02] tracking-[-.01em]">Market reports, field notes, and the occasional argument.</h1>
        </div>
        <p className="col-span-12 mt-10 max-w-[48ch] text-[16px] leading-[1.85] text-ink/80 lg:col-span-5 lg:col-start-8 lg:mt-16 lg:self-end">
          Written for owners rather than for headlines. The Prime Report comes out twice a year; the rest
          appears when there is something worth saying.
        </p>

        {/* ── the list */}
        <div className="col-span-12 mt-16 lg:mt-24">
          {JOURNAL.map((j, i) => (
            <article key={j.id} data-reveal className={`${s.rise} ${GRID} border-t border-forest/14 py-8 last:border-b md:py-10`} style={delay(i)}>
              <div className="col-span-12 md:col-span-5">
                <p className="meta text-ink/70">
                  <time>{j.date}</time><span className="mx-2 opacity-40">/</span>{j.kind}
                </p>
                <h2 className="mt-4 max-w-[24ch] font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-[1.15]">{j.title}</h2>
              </div>
              <p className="col-span-12 mt-4 max-w-[48ch] text-[15px] leading-[1.85] text-ink/80 md:col-span-6 md:col-start-7 md:mt-0 md:self-end">{j.dek}</p>
            </article>
          ))}
        </div>

        {/* ── close */}
        <div className={`col-span-12 mt-20 ${GRID} border-t border-forest/14 pt-12 lg:mt-28 lg:pt-16`}>
          <div className="col-span-12 lg:col-span-6">
            <Lines lines={["The Prime Report,", "twice a year."]} className={`${HEAD} max-w-[18ch]`} />
          </div>
          <div className="col-span-12 mt-8 flex flex-col items-start gap-6 lg:col-span-5 lg:col-start-7 lg:mt-2">
            <p className="max-w-[46ch] text-[15px] leading-[1.8] text-ink/80">
              Sent to clients of the firm and to anyone who asks the desk for it. Two emails a year, and
              nothing else unless you ask.
            </p>
            <EnquireButton className={`${s.tlink} font-display text-[1.35rem] font-medium leading-tight text-forest`}>Ask for the report</EnquireButton>
          </div>
        </div>
      </Chapter>
    </div>
  );
}
