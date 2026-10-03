import Link from "next/link";
import { href } from "@/lib/routes";
import { Reveal } from "@/components/Reveal";
import { EnquireButton } from "@/components/SiteShell";
import { AREAS, LISTINGS } from "@/lib/data";
import { ImageFrame } from "@/components/ImageFrame";

const TIERS: { t: 1 | 2 | 3; label: string; blurb: string }[] = [
  { t: 1, label: "Core markets", blurb: "Where we hold inventory, keep an office, or trade every month." },
  { t: 2, label: "Greater Toronto", blurb: "Regular mandates across the western and northern GTA." },
  { t: 3, label: "Ontario-wide", blurb: "Recreational and specialist markets we are licensed and equipped to act in." },
];

export function Areas() {
  return (
    <div className="pt-[88px]">
      <section className="mx-auto max-w-[1520px] px-6 pb-14 pt-12 md:px-12 md:pt-16">
        <div className="meta mb-7 text-brass">Where we act</div>
        <h1 className="max-w-[20ch] font-display text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1.04] tracking-[-.005em]">
          Oakville first. Ontario throughout.
        </h1>
        <p className="mt-8 max-w-[62ch] text-[16px] font-normal leading-[1.9] text-ink/72">
          The firm keeps offices in Oakville and Vaughan and is licensed across Ontario. Oakville is where the
          depth is: it is our home market, our largest book, and the town we know street by street. Beyond it we
          act throughout the Greater Toronto Area and in the province's recreational and specialist markets.
        </p>
      </section>

      {TIERS.map((tier) => {
        const list = AREAS.filter((a) => a.tier === tier.t);
        return (
          <section key={tier.t} className={tier.t === 2 ? "border-y border-forest/14 bg-paper-deep py-20 md:py-24" : "py-20 md:py-24"}>
            <div className="mx-auto max-w-[1520px] px-6 md:px-12">
              <Reveal className="mb-12 flex flex-wrap items-baseline gap-x-8 gap-y-2">
                <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.1rem)]">{tier.label}</h2>
                <p className="meta text-mute">{tier.blurb}</p>
              </Reveal>

              <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
                {list.map((a, i) => {
                  const count = LISTINGS.filter((l) => l.city === a.name).length;
                  return (
                    <Reveal key={a.slug} delay={(i % 2) * 90}>
                      <article className="group grid gap-6 sm:grid-cols-[150px_1fr]">
                        <ImageFrame hue={(a.slug.length * 37) % 360} ratio="4/5" alt={a.name}
                          className="transition-[filter] duration-700 group-hover:brightness-110" />
                        <div className="border-t border-forest/14 pt-5">
                          <div className="flex items-baseline justify-between gap-4">
                            <h3 className="font-display text-[26px] leading-none">{a.name}</h3>
                            <span className="meta text-mute">{a.region}</span>
                          </div>
                          <p className="mt-5 max-w-[46ch] text-[14px] font-normal leading-[1.9] text-mute">{a.note}</p>
                          <p className="meta mt-5 leading-[1.9] text-ink/70">{a.pockets.join(" · ")}</p>
                          <div className="mt-6 flex items-center gap-6">
                            <Link href={href("collection")} className="meta link-u text-forest/70 hover:text-forest">
                              {count ? `${count} available →` : "Enquire about inventory →"}
                            </Link>
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-forest py-20 text-paper md:py-28">
        <div className="mx-auto flex max-w-[1520px] flex-wrap items-end justify-between gap-10 px-6 md:px-12">
          <div>
            <h2 className="max-w-[24ch] font-display text-[clamp(1.7rem,3.4vw,2.7rem)] leading-[1.12]">
              Looking somewhere that is not on this list?
            </h2>
            <p className="mt-6 max-w-[52ch] text-[15px] font-normal leading-[1.9] text-paper/80">
              We are licensed province-wide and we travel for the right mandate. If it is outside our depth we
              will tell you that, and refer you to someone whose market it is.
            </p>
          </div>
          <EnquireButton className="meta border border-paper/35 px-8 py-4 transition-colors hover:bg-paper hover:text-forest">
            Tell us where
          </EnquireButton>
        </div>
      </section>
    </div>
  );
}
