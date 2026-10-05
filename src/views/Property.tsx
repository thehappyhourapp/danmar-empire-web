import Image from "next/image";
import Link from "next/link";
import { LISTINGS } from "@/lib/data";
import type { Listing } from "@/lib/data";
import { money } from "@/lib/parse";
import { href, propertyHref } from "@/lib/routes";
import { SITE } from "@/lib/metadata";
import { Chapter, GRID, delay } from "@/components/Chapter";
import { ListingRow } from "@/components/ListingRow";
import { listingPhoto } from "@/lib/photos";
import { MotionController } from "@/components/MotionController";
import { SaveLink } from "@/components/SaveLink";
import { EnquireButton } from "@/components/SiteShell";
import s from "@/components/motion.module.css";

const BROKERAGE = "Danmar Empire Real Estate Corp., Brokerage";

/** Three to five fields from the listing's own data, never one that repeats what
 *  the page already shows. Land has type, tenure and status; nothing is invented. */
function specs(l: Listing): [string, string][] {
  const out: [string, string][] = [["Type", l.kind], ["Tenure", l.tenure]];
  if (l.beds) out.push(["Bedrooms", String(l.beds)]);
  if (l.baths) out.push(["Bathrooms", String(l.baths)]);
  if (l.sqft) out.push(["Area", `${l.sqft.toLocaleString("en-CA")} sq ft`]);
  if (l.capRate) out.push(["Going-in yield", `${l.capRate.toFixed(1)}%`]);
  if (l.noi) out.push(["Net operating income", `$${l.noi.toLocaleString("en-CA")}`]);
  out.push(["Status", l.status]);
  return out.slice(0, 5);
}

/* Spans per field count that keep every divider on a drawn column line. */
const SPANS: Record<number, string[]> = {
  3: ["md:col-span-4", "md:col-span-4", "md:col-span-4"],
  4: ["md:col-span-3", "md:col-span-3", "md:col-span-3", "md:col-span-3"],
  5: ["md:col-span-3", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-3"],
};

function jsonLd(l: Listing, photo?: string) {
  const lease = l.intent === "lease";
  const available = l.status === "Available" || l.status === "Conditional";
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: l.name,
    description: l.standfirst,
    url: `${SITE}${propertyHref(l.id)}`,
    ...(photo ? { image: `${SITE}${photo}` } : {}),
    offers: {
      "@type": "Offer",
      itemOffered: {
        "@type": l.useClass === "residential" ? "SingleFamilyResidence" : "Place",
        name: l.name,
        address: { "@type": "PostalAddress", streetAddress: l.address, addressLocality: l.city, addressRegion: "ON", addressCountry: "CA" },
      },
      price: l.price,
      priceCurrency: "CAD",
      ...(lease ? { priceSpecification: { "@type": "UnitPriceSpecification", price: l.price, priceCurrency: "CAD", unitCode: "MON" } } : {}),
      availability: available ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
      businessFunction: lease ? "http://purl.org/goodrelations/v1#LeaseOut" : "http://purl.org/goodrelations/v1#Sell",
      offeredBy: { "@type": "RealEstateAgent", name: BROKERAGE, url: SITE },
    },
  };
}

export function Property({ l }: { l: Listing }) {
  const lease = l.intent === "lease";
  const photo = listingPhoto(l.id);
  const more = LISTINGS.filter((x) => x.id !== l.id && x.tier !== "Off-Market" && (x.city === l.city || x.useClass === l.useClass)).slice(0, 3);
  const rows = specs(l);

  return (
    <div id="property">
      <MotionController rootId="property" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(l, photo)).replace(/</g, "\\u003c") }} />

      {/* ───────── Hero: full-bleed, the LCP element. Paints at full opacity and never animates. */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-forest/10 md:aspect-[21/10] lg:max-h-[62svh]">
        {photo ? (
          <Image src={photo} alt={`${l.name}, ${l.address}, ${l.city}`} fill priority sizes="100vw" className="object-cover" />
        ) : (
          <span className="sr-only">Photography to follow</span>
        )}
      </div>

      <Chapter inner="pb-20 pt-10 md:pt-14 lg:pb-28">
        <nav aria-label="Breadcrumb" className="col-span-12">
          <Link href={href("collection")} className={`${s.tlink} meta text-ink/70 hover:text-forest`}>The Collection</Link>
        </nav>

        {/* name alone, then one line of data */}
        <header className="col-span-12 mt-10 lg:col-span-8">
          <h1 className="max-w-[18ch] font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-medium leading-[1] tracking-[-.015em]">{l.address}</h1>
          <p className="meta mt-5 text-ink/70">
            <span className="block md:inline">{l.name}</span>
            <span className="mx-1.5 hidden opacity-40 md:inline">/</span>
            <span className="block md:inline">{l.region}, {l.city}</span>
            {l.tier && <><span className="mx-1.5 hidden opacity-40 md:inline">/</span><span className="block text-brass md:inline">{l.tier}</span></>}
          </p>
        </header>
        <div className="col-span-12 mt-8 lg:col-span-3 lg:col-start-10 lg:mt-10 lg:self-end lg:text-right">
          <p className="fig text-[clamp(1.75rem,2.6vw,2.4rem)] text-brass">{money(l.price, lease)}</p>
          <p className="meta mt-2 text-ink/70">{lease ? "To lease, per month" : "For sale"} · Listed by the brokerage</p>
        </div>

        {/* five fields, one row, hairlines between */}
        {/* three to five fields on the 12-column grid, spans chosen so every divider sits on a drawn column line */}
        <dl className={`col-span-12 mt-12 ${GRID} border-y border-forest/14 lg:mt-16`}>
          {rows.map(([k, v], i) => (
            <div key={k} className={`${i === rows.length - 1 && rows.length % 2 ? "col-span-12" : "col-span-6"} flex flex-col-reverse gap-1.5 py-5 pr-4 ${i % 2 ? "border-l border-forest/14 pl-4" : ""} ${i >= 2 ? "border-t border-forest/14 md:border-t-0" : ""} ${i % 2 === 0 && !(i === rows.length - 1 && rows.length % 2) ? "-mr-4 md:mr-0" : ""} ${SPANS[rows.length][i]} md:border-l md:pl-4 md:first:border-l-0 md:first:pl-0`}>
              <dt className="meta text-ink/70">{k}</dt>
              <dd className="fig text-[15px] text-brass">{v}</dd>
            </div>
          ))}
        </dl>

        {/* prose before specification, the standfirst first */}
        <p data-reveal className={`${s.rise} col-span-12 mt-16 max-w-[30ch] font-display text-[clamp(1.5rem,3vw,2.4rem)] font-medium leading-[1.18] tracking-[-.01em] lg:col-span-7 lg:mt-24`}>
          {l.standfirst}
        </p>
        <div className="col-span-12 mt-8 space-y-6 lg:col-span-6 lg:mt-10">
          {l.body.map((p, i) => (
            <p key={i} data-reveal className={`${s.rise} max-w-[60ch] text-[15.5px] leading-[1.9] text-ink/80`} style={delay(i)}>{p}</p>
          ))}
          <p className="meta pt-4 text-ink/70">Listed by {BROKERAGE}</p>
        </div>
        <aside className="col-span-12 mt-12 lg:col-span-4 lg:col-start-9 lg:mt-10">
          {l.features.length > 0 && (
            <>
              <h2 className="meta text-brass">Notable</h2>
              <ul className="mt-4 border-t border-forest/14">
                {l.features.map((f) => (
                  <li key={f} className="border-b border-forest/14 py-3 text-[14.5px] text-ink/80 first-letter:uppercase">{f}</li>
                ))}
              </ul>
            </>
          )}
          <div className="mt-10 flex flex-col items-start gap-4">
            <EnquireButton className={`${s.tlink} font-display text-[1.3rem] font-medium leading-tight text-forest`}>
              {lease ? "Request a viewing" : "Request a private viewing"}
            </EnquireButton>
            <EnquireButton className={`${s.tlink} text-[15px] text-ink/75 hover:text-forest`}>
              {l.useClass === "investment" ? "Request the diligence package" : "Register for similar properties"}
            </EnquireButton>
            <SaveLink id={l.id} />
          </div>
          <p className="meta mt-10 max-w-[36ch] leading-[1.9] text-ink/70">
            Measured floorplans and the full brochure are released with the viewing confirmation.
          </p>
        </aside>
      </Chapter>

      {/* related, as rows */}
      {more.length > 0 && (
        <Chapter inner="pb-24 pt-4 lg:pb-32">
          <div className={`${GRID} col-span-12 items-baseline`}>
            <h2 className="col-span-12 font-display text-[clamp(1.6rem,2.8vw,2.25rem)] font-medium leading-[1.05] md:col-span-5">Also on the books</h2>
            <p className="col-span-12 mt-3 text-[15px] leading-[1.8] text-ink/75 md:col-span-6 md:col-start-7 md:mt-0">
              Held by the brokerage in the same market or the same class.
            </p>
          </div>
          <div className="col-span-12 mt-10">
            {more.map((m, i) => <ListingRow key={m.id} l={m} index={i} photo={listingPhoto(m.id)} />)}
          </div>
        </Chapter>
      )}
    </div>
  );
}
