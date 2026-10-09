import Link from "next/link";
import { AREAS } from "@/lib/data";
import { getListings } from "@/lib/listings";
import { href } from "@/lib/routes";
import { Chapter, Lines } from "@/components/Chapter";
import { GRID, HEAD, delay } from "@/lib/layout";
import { MotionController } from "@/components/MotionController";
import { EnquireButton } from "@/components/SiteShell";
import s from "@/components/motion.module.css";

/* Areas: cream, line rise only. Three tiers, each a section title row, then one
   row per area: name, its note, and what the data holds about it as .meta. */

const TIERS: { t: 1 | 2 | 3; label: string; blurb: string }[] = [
  { t: 1, label: "Core markets", blurb: "Where we hold inventory, keep an office, or trade every month." },
  { t: 2, label: "Greater Toronto", blurb: "Regular mandates across the western and northern GTA." },
  { t: 3, label: "Ontario-wide", blurb: "Recreational and specialist markets we are licensed and equipped to act in." },
];

export async function Areas() {
  const listings = await getListings();
  return (
    <div id="areas">
      <MotionController rootId="areas" />
      <Chapter inner="pb-24 pt-[calc(var(--nav-h)_+_64px)] lg:pt-[calc(var(--nav-h)_+_96px)] lg:pb-40">
        {/* ── head */}
        <div className="col-span-12 lg:col-span-8">
          <h1 className="max-w-[18ch] font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-medium leading-[1.02] tracking-[-.01em]">Oakville first. Ontario throughout.</h1>
        </div>
        <p className="col-span-12 mt-10 max-w-[48ch] text-[16px] leading-[1.85] text-ink/80 lg:col-span-6 lg:col-start-7 lg:mt-16">
          The firm keeps offices in Oakville and Vaughan and is licensed across Ontario. Oakville is where the
          depth is: it is our home market and the town we know street by street. Beyond it we
          act throughout the Greater Toronto Area and in the province&apos;s recreational and specialist markets.
        </p>

        {TIERS.map((tier) => {
          const list = AREAS.filter((a) => a.tier === tier.t);
          return (
            <section key={tier.t} className="col-span-12 mt-20 lg:mt-28">
              {/* tier title row */}
              <div className={`${GRID} pb-8 lg:pb-10`}>
                <Lines lines={[tier.label]} className={`${HEAD} col-span-12 md:col-span-6`} />
                <p className="meta col-span-12 mt-4 max-w-[52ch] leading-[1.9] text-ink/70 md:col-span-5 md:col-start-8 md:mt-0 md:self-end">{tier.blurb}</p>
              </div>
              {list.map((a, i) => {
                const count = listings.filter((l) => l.city === a.name).length;
                return (
                  <div key={a.slug} data-reveal className={`${s.rise} ${GRID} border-t border-forest/14 py-8 last:border-b md:py-10`} style={delay(i)}>
                    <div className="col-span-12 md:col-span-5">
                      <h3 className="font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-[1.1]">{a.name}</h3>
                      <p className="meta mt-4 text-ink/70">
                        <span className="block md:inline">{a.region}</span>
                        {count > 0 && <><span className="mx-2 hidden opacity-40 md:inline">/</span><Link href={href("collection")} className={`${s.tlink} block md:inline`}><span className="fig text-[14px] tracking-normal text-brass">{count}</span> in the Collection</Link></>}
                      </p>
                    </div>
                    <div className="col-span-12 mt-4 md:col-span-6 md:col-start-7 md:mt-0">
                      <p className="max-w-[48ch] text-[15px] leading-[1.85] text-ink/80">{a.note}</p>
                      <p className="meta mt-4 max-w-[60ch] leading-[1.9] text-ink/70">{a.pockets.join(" · ")}</p>
                    </div>
                  </div>
                );
              })}
            </section>
          );
        })}

        {/* ── close */}
        <div className={`col-span-12 mt-20 ${GRID} border-t border-forest/14 pt-12 lg:mt-28 lg:pt-16`}>
          <div className="col-span-12 lg:col-span-6">
            <Lines lines={["Somewhere that is not", "on this list?"]} className={`${HEAD} max-w-[18ch]`} />
          </div>
          <div className="col-span-12 mt-8 flex flex-col items-start gap-6 lg:col-span-5 lg:col-start-7 lg:mt-2">
            <p className="max-w-[46ch] text-[15px] leading-[1.8] text-ink/80">
              We are licensed province-wide and we travel for the right mandate. If it is outside our depth we
              will tell you that, and refer you to someone whose market it is.
            </p>
            <EnquireButton className={`${s.tlink} font-display text-[1.35rem] font-medium leading-tight text-forest`}>Tell us where</EnquireButton>
          </div>
        </div>
      </Chapter>
    </div>
  );
}
