import Link from "next/link";
import type { Listing } from "@/lib/data";
import { money } from "@/lib/parse";
import { propertyHref } from "@/lib/routes";
import { ImageFrame } from "./ImageFrame";
import { SaveLink } from "./SaveLink";
import { EnquireLink } from "./EnquireLink";
import { GRID, delay } from "./Chapter";
import s from "./motion.module.css";

/**
 * A listing as a full-width row, the pattern Home's Collection chapter set:
 * frame alternating 4:5 and 3:4 and stepping one column in on alternate rows,
 * name and address, one line of description, one figure in Bodoni 500 brass,
 * the tier as a .meta label, a hairline below. Never a card.
 */
export function ListingRow({ l, index, save = true }: { l: Listing; index: number; save?: boolean }) {
  const lease = l.intent === "lease";
  const odd = index % 2 === 1;
  if (l.tier === "Off-Market") return <OffMarketRow l={l} index={index} />;
  return (
    <div data-reveal className={`${s.rise} ${GRID} border-t border-forest/14 py-8 last:border-b md:py-10`} style={delay(index)}>
      <Link href={propertyHref(l.id)} aria-label={l.name} className={`col-span-5 self-center md:col-span-3 md:row-span-2 ${odd ? "md:col-start-2" : ""}`}>
        <ImageFrame src={`/photos/${l.id}.jpg`} hue={l.hue} ratio={odd ? "3/4" : "4/5"} alt="" fallback="flat" />
      </Link>
      <div className="col-span-7 self-center md:col-span-6 md:col-start-5 md:self-end md:pb-2">
        <h3 className="font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-[1.1]">
          <Link href={propertyHref(l.id)} className={`${s.rowlink} hover:text-forest-mid`}>{l.name}</Link>
        </h3>
        <p className="meta mt-3 text-ink/70">
          <span className="block md:inline">{l.address}</span>
          <span className="mx-1.5 hidden opacity-40 md:inline">/</span>
          <span className="block md:inline">{l.region}, {l.city}</span>
          {l.tier && <><span className="mx-1.5 hidden opacity-40 md:inline">/</span><span className="block text-brass md:inline">{l.tier}</span></>}
        </p>
      </div>
      <p className="col-span-12 mt-4 max-w-[52ch] text-[15px] leading-[1.8] text-ink/75 md:col-span-6 md:col-start-5 md:mt-0 md:self-start md:pt-2">{l.standfirst}</p>
      <div className="col-span-12 mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 md:col-span-2 md:col-start-11 md:row-span-2 md:row-start-1 md:mt-0 md:block md:self-center md:text-right">
        <span className="fig block text-[clamp(1.5rem,1.8vw,1.7rem)] text-brass">{money(l.price, lease)}</span>
        <span className="meta mt-2 block text-ink/70">{lease ? "To lease" : "For sale"} · {l.kind}</span>
        {save && <span className="block basis-full md:mt-4"><SaveLink id={l.id} /></span>}
      </div>
    </div>
  );
}

/** Off-market stays off the site: no street address, price, photograph or page.
 *  The row names the area, the type and the tier, and its one action is the
 *  enquire drawer with the listing reference prefilled. */
function OffMarketRow({ l, index }: { l: Listing; index: number }) {
  const lease = l.intent === "lease";
  const odd = index % 2 === 1;
  return (
    <div data-reveal className={`${s.rise} ${GRID} border-t border-forest/14 py-8 last:border-b md:py-10`} style={delay(index)}>
      <div aria-hidden className={`col-span-5 self-center md:col-span-3 md:row-span-2 ${odd ? "md:col-start-2" : ""}`}>
        <ImageFrame hue={l.hue} ratio={odd ? "3/4" : "4/5"} alt="" fallback="flat" />
      </div>
      <div className="col-span-7 self-center md:col-span-6 md:col-start-5 md:self-end md:pb-2">
        <h3 className="font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-[1.1]">{l.name}</h3>
        <p className="meta mt-3 text-ink/70">
          <span className="block md:inline">{l.region}, {l.city}</span>
          <span className="mx-1.5 hidden opacity-40 md:inline">/</span>
          <span className="block md:inline">{l.kind}</span>
          <span className="mx-1.5 hidden opacity-40 md:inline">/</span>
          <span className="block text-brass md:inline">{l.tier}</span>
        </p>
      </div>
      <p className="col-span-12 mt-4 max-w-[52ch] text-[15px] leading-[1.8] text-ink/75 md:col-span-6 md:col-start-5 md:mt-0 md:self-start md:pt-2">
        Held off the public record at the owner's instruction. Particulars are shared on enquiry.
      </p>
      <div className="col-span-12 mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 md:col-span-2 md:col-start-11 md:row-span-2 md:row-start-1 md:mt-0 md:block md:self-center md:text-right">
        <span className="fig block text-[clamp(1.5rem,1.8vw,1.7rem)] text-brass">By enquiry</span>
        <span className="meta mt-2 block text-ink/70">{lease ? "To lease" : "For sale"} · {l.kind}</span>
        <span className="block basis-full md:mt-4"><EnquireLink listing={{ id: l.id, name: l.name }}>Enquire</EnquireLink></span>
      </div>
    </div>
  );
}
