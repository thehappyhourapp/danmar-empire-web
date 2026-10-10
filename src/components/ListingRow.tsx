import Link from "next/link";
import type { Listing } from "@/lib/data";
import { money } from "@/lib/parse";
import { propertyHref } from "@/lib/routes";
import { ImageFrame } from "./ImageFrame";
import { SaveLink } from "./SaveLink";
import { EnquireLink } from "./EnquireLink";
import { GRID, delay } from "@/lib/layout";
import { cityLine, specLine } from "@/lib/listing-format";
import s from "./motion.module.css";

/**
 * A listing as a full-width row, the pattern Home's Collection chapter set: a 3:2
 * landscape frame (4:5 when the hero photograph is itself portrait, so it is never
 * cropped to a strip), the street address, the city on its own heavier meta line so
 * the towns read as the list goes by, the neighbourhood, one specification line,
 * one figure in Bodoni 500 brass, a hairline below. Never a card. The registered
 * name is in the footer on every page; the detail page repeats it.
 */
export function ListingRow({ l, index, save = true, photo, level = 3 }: { l: Listing; index: number; save?: boolean; photo?: string; level?: 2 | 3 }) {
  const H = `h${level}` as "h2" | "h3";
  const lease = l.intent === "lease";
  if (l.tier === "Off-Market") return <OffMarketRow l={l} index={index} level={level} />;
  const portrait = !!(photo && l.portrait);
  const specs = specLine(l);
  return (
    <div data-reveal className={`${s.rise} ${s.row} ${GRID} border-t border-forest/14 py-8 last:border-b md:py-10`} style={delay(index)}>
      <Link href={propertyHref(l.id)} aria-label={l.name} className={`self-center md:row-span-2 ${portrait ? "col-span-8 md:col-span-3" : "col-span-12 md:col-span-4"}`}>
        <ImageFrame src={photo} hue={l.hue} ratio={portrait ? "4/5" : "3/2"} alt="" fallback="flat" />
      </Link>
      <div className="col-span-12 mt-6 md:col-span-5 md:col-start-6 md:mt-0 md:self-end md:pb-2">
        <H className="font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-[1.1]">
          <Link href={propertyHref(l.id)} className={s.rowlink}>{l.name}</Link>
        </H>
        <p className="meta mt-3 font-semibold text-ink/85">{cityLine(l)}</p>
      </div>
      <div className="col-span-12 mt-3 md:col-span-5 md:col-start-6 md:mt-0 md:self-start md:pt-2">
        {(l.addressWithheld || l.region || l.tier) && (
          <p className="meta text-ink/70">
            {[l.addressWithheld ? "Address available on enquiry" : "", l.region].filter(Boolean).join(" · ")}
            {l.tier && <><span className="mx-2 opacity-40">/</span><span className="text-brass">{l.tier}</span></>}
          </p>
        )}
        {specs && <p className="meta mt-2 text-ink/70">{specs}</p>}
      </div>
      <div className="col-span-12 mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 md:col-span-7 md:col-start-6 lg:col-span-2 lg:col-start-11 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:block lg:self-center lg:text-right">
        <span className="fig block text-[clamp(1.5rem,1.8vw,1.7rem)] text-brass">{money(l.price, lease)}</span>
        <span className="meta mt-2 block text-ink/70">{lease ? "To lease" : "For sale"} · {l.kind}</span>
        {save && <span className="block basis-full lg:mt-4"><SaveLink id={l.id} /></span>}
      </div>
    </div>
  );
}

/** Off-market stays off the site: no street address, price, photograph or page.
 *  The row names the area, the type and the tier, and its one action is the
 *  enquire drawer with the listing reference prefilled. */
function OffMarketRow({ l, index, level }: { l: Listing; index: number; level: 2 | 3 }) {
  const H = `h${level}` as "h2" | "h3";
  const lease = l.intent === "lease";
  return (
    <div data-reveal className={`${s.rise} ${GRID} border-t border-forest/14 py-8 last:border-b md:py-10`} style={delay(index)}>
      <div aria-hidden className="col-span-12 self-center md:col-span-4 md:row-span-2">
        <ImageFrame hue={l.hue} ratio="3/2" alt="" fallback="flat" />
      </div>
      <div className="col-span-12 mt-6 md:col-span-5 md:col-start-6 md:mt-0 md:self-end md:pb-2">
        <H className="font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-[1.1]">{l.name}</H>
        <p className="meta mt-4 text-ink/70">
          <span className="block md:inline">{l.region}, {l.city}</span>
          <span className="mx-2 hidden opacity-40 md:inline">/</span>
          <span className="block md:inline">{l.kind}</span>
          <span className="mx-2 hidden opacity-40 md:inline">/</span>
          <span className="block text-brass md:inline">{l.tier}</span>
        </p>
      </div>
      <p className="col-span-12 mt-4 max-w-[48ch] text-[15px] leading-[1.8] text-ink/75 md:col-span-5 md:col-start-6 md:mt-0 md:self-start md:pt-2">
        Held off the public record at the owner's instruction. Particulars are shared on enquiry.
      </p>
      <div className="col-span-12 mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 md:col-span-7 md:col-start-6 lg:col-span-2 lg:col-start-11 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:block lg:self-center lg:text-right">
        <span className="fig block text-[clamp(1.5rem,1.8vw,1.7rem)] text-brass">By enquiry</span>
        <span className="meta mt-2 block text-ink/70">{lease ? "To lease" : "For sale"} · {l.kind}</span>
        <span className="block basis-full lg:mt-4"><EnquireLink listing={{ id: l.id, name: l.name }}>Enquire</EnquireLink></span>
      </div>
    </div>
  );
}
