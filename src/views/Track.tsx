import Link from "next/link";
import { TRACK } from "@/lib/data";
import { money } from "@/lib/parse";
import { photo } from "@/lib/photos";
import { href } from "@/lib/routes";
import { Chapter, Lines } from "@/components/Chapter";
import { GRID, HEAD } from "@/lib/layout";
import { ImageFrame } from "@/components/ImageFrame";
import { MotionController } from "@/components/MotionController";
import { EnquireButton } from "@/components/SiteShell";
import s from "@/components/motion.module.css";

/* The proof page: the properties behind the number. Whole-page cream, line rise
   on the headings only. Nothing that carries a figure is ever hidden by a reveal,
   and nothing counts up. Figures come from TRACK and nowhere else. */

const figure = (list: number, kind: "Sold" | "Leased") => (kind === "Leased" ? `$${list.toLocaleString("en-CA")}/mo` : money(list));

export function Track() {
  return (
    <div id="track">
      <MotionController rootId="track" />
      <Chapter inner="pb-24 pt-[calc(var(--nav-h)_+_64px)] lg:pt-[calc(var(--nav-h)_+_96px)] lg:pb-40">
        {/* ── head */}
        <div className="col-span-12 lg:col-span-8">
          <h1 className="max-w-[18ch] font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-medium leading-[1.02] tracking-[-.01em]">Every figure has an address.</h1>
          <p className="mt-4 font-display text-[clamp(1.35rem,2.4vw,2rem)] italic leading-[1.1] text-brass">Sold and leased, one address at a time.</p>
        </div>

        {/* ── the number, never hidden, never counted up */}
        <div className="col-span-12 mt-16 lg:col-span-5 lg:mt-24">
          <p className="fig text-[clamp(3.25rem,7.5vw,6.5rem)] leading-[0.9] tracking-[-.02em] text-brass">$1B+</p>
          <p className="meta mt-6 max-w-[60ch] leading-[1.9] text-ink/70">
            Aggregate value of sale and lease transactions in which the principals have acted over their careers. Methodology on request.
          </p>
        </div>
        <p className="col-span-12 mt-8 max-w-[48ch] text-[16px] leading-[1.85] text-ink/80 lg:col-span-6 lg:col-start-7 lg:mt-24 lg:self-end">
          Sale and lease transactions in which the firm acted for a party are listed here one at a time, with the
          list price at the time of the transaction, each published with the written consent of the parties involved.
        </p>

        {/* ── the gallery, as rows */}
        <div className="col-span-12 mt-16 lg:mt-24">
          {TRACK.length === 0 && (
            <div className={`${GRID} border-y border-forest/14 py-8 md:py-10`}>
              <p className="col-span-12 max-w-[48ch] text-[16px] leading-[1.85] text-ink/80 md:col-span-6">
                Sold and leased properties appear here as consents are confirmed. Representative transactions on request.
              </p>
              <div className="col-span-12 mt-6 md:col-span-5 md:col-start-8 md:mt-0 md:self-end md:text-right">
                <EnquireButton className={`${s.tlink} meta text-forest`}>Request transactions</EnquireButton>
              </div>
            </div>
          )}
          {TRACK.map((t, i) => {
            const odd = i % 2 === 1;
            return (
              <div key={t.id} className={`${GRID} border-t border-forest/14 py-8 last:border-b md:py-10`}>
                <div aria-hidden className={`col-span-5 self-center md:col-span-3 md:row-span-2 ${odd ? "md:col-start-2" : ""}`}>
                  <ImageFrame src={photo(`/photos/track/${t.id}.jpg`)} hue={t.hue} ratio={odd ? "3/4" : "4/5"} alt="" fallback="flat" />
                </div>
                <div className="col-span-12 mt-6 md:col-span-6 md:col-start-5 md:mt-0 md:self-end md:pb-2">
                  <h2 className="font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-[1.1]">{t.place}</h2>
                  <p className="meta mt-4 text-ink/70">
                    <span className="block md:inline">{t.city}</span>
                    <span className="mx-2 hidden opacity-40 md:inline">/</span>
                    <span className="block md:inline">{t.type}</span>
                  </p>
                </div>
                <p className="col-span-12 mt-4 max-w-[48ch] text-[15px] leading-[1.8] text-ink/75 md:col-span-6 md:col-start-5 md:mt-0 md:self-start md:pt-2">{t.note}</p>
                <div className="col-span-12 mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 md:col-span-8 md:col-start-5 lg:col-span-2 lg:col-start-11 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:block lg:self-center lg:text-right">
                  <span className="fig block text-[clamp(1.5rem,1.8vw,1.7rem)] text-brass">{figure(t.list, t.kind)}</span>
                  <span className="meta mt-2 block text-ink/70">{t.kind} {t.year}</span>
                </div>
              </div>
            );
          })}
          {TRACK.length > 0 && <p className="meta mt-6 max-w-[60ch] leading-[2] text-ink/70">
            Transactions are published with the written consent of the relevant party. Figures shown are list prices
            at the time of the transaction and are not sale prices. Danmar Empire Real Estate Corp., Brokerage acted
            for one or more parties in each transaction shown; acting for a party does not imply the firm acted for
            all parties. Not intended to solicit properties currently under contract.
          </p>}
        </div>

        {/* ── close */}
        <div className={`col-span-12 mt-20 ${GRID} border-t border-forest/14 pt-12 lg:mt-28 lg:pt-16`}>
          <div className="col-span-12 lg:col-span-6">
            <Lines lines={["Some of what we transact", "is never published at all."]} className={`${HEAD} max-w-[18ch]`} />
          </div>
          <div className="col-span-12 mt-8 flex flex-col items-start gap-6 lg:col-span-5 lg:col-start-7 lg:mt-2">
            <p className="max-w-[46ch] text-[15px] leading-[1.8] text-ink/80">
              Off-market files are not shown here at any price. If discretion matters more than exposure, that is
              the conversation to have.
            </p>
            <EnquireButton className={`${s.tlink} font-display text-[1.35rem] font-medium leading-tight text-forest`}>Speak privately</EnquireButton>
            <Link href={href("collection")} className={`${s.tlink} meta text-ink/70`}>The Collection</Link>
          </div>
        </div>
      </Chapter>
    </div>
  );
}
