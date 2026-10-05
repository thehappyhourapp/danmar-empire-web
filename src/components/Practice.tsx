import Link from "next/link";
import { SITE } from "@/lib/metadata";
import { Chapter, GRID, HEAD, Lines, delay } from "./Chapter";
import { MotionController } from "./MotionController";
import { ClientAccessButton, EnquireButton } from "./SiteShell";
import s from "./motion.module.css";

/* The practice page template. Asset Management set it; Investments and Executive
   Leasing are built from it. One ground for the whole page, no cuts, line rise
   only. Eyebrow, the locked H1, one italic brass line under it and none on section
   titles, a numbers strip on the column lines, numbered service rows, and a closing
   row with a text link to the enquire drawer and the practice's Client access control. */

const BROKERAGE = "Danmar Empire Real Estate Corp., Brokerage";

export interface PracticeProps {
  tone: "forest" | "cream";
  id: string;
  path: string;
  eyebrow: string;
  headline: string[];
  italic: string;
  intro: string[];
  /** figures that exist in the data; three or four cells, never an invented number */
  numbers: string[][];
  sections: { heading?: string; items: { title: string; text: string }[] }[];
  /** page-specific rows between the services and the close */
  extras?: React.ReactNode;
  close: { headline: string; enquire: string; login: string; aside?: React.ReactNode };
  /** a disclosure set small beneath the close, where it can be seen */
  note?: string;
  service: { name: string; type: string; description: string };
}

export function Practice(p: PracticeProps) {
  const dark = p.tone === "forest";
  const body = dark ? "text-paper/80" : "text-ink/80";
  const meta = dark ? "text-paper/70" : "text-ink/70";
  const rule = dark ? "border-paper/12" : "border-forest/14";
  const brass = dark ? "text-brass-light" : "text-brass";
  const link = dark ? "text-paper" : "text-forest";
  const span = p.numbers.length === 3 ? "md:col-span-4" : "md:col-span-3";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: p.service.name,
    serviceType: p.service.type,
    description: p.service.description,
    url: `${SITE}${p.path}`,
    areaServed: { "@type": "AdministrativeArea", name: "Ontario" },
    provider: { "@type": "RealEstateAgent", name: BROKERAGE, url: SITE },
  };

  let n = 0;
  return (
    <div id={p.id}>
      <MotionController rootId={p.id} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <Chapter tone={p.tone} inner="pb-24 pt-32 md:pt-40 lg:pb-40">
        {/* ── head */}
        <p className={`meta col-span-12 ${brass}`}>{p.eyebrow}</p>
        <div className="col-span-12 mt-6 lg:col-span-8">
          <h1 className="max-w-[18ch] font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-medium leading-[1.02] tracking-[-.01em]">{p.headline.join(" ")}</h1>
          <p className={`mt-4 font-display text-[clamp(1.35rem,2.4vw,2rem)] italic leading-[1.1] ${brass}`}>{p.italic}</p>
        </div>
        <div className={`col-span-12 mt-10 space-y-6 lg:col-span-6 lg:col-start-7 lg:mt-16 ${body}`}>
          {p.intro.map((t, i) => (
            <p key={i} data-reveal className={`${s.rise} max-w-[48ch] text-[16px] leading-[1.85]`} style={delay(i)}>{t}</p>
          ))}
        </div>

        {/* ── numbers strip: cells on the column lines */}
        <dl className={`col-span-12 mt-16 ${GRID} border-y ${rule} lg:mt-24`}>
          {p.numbers.map(([label, value], i) => (
            <div key={label} className={`${i === p.numbers.length - 1 && p.numbers.length % 2 ? "col-span-12" : "col-span-6"} flex flex-col-reverse gap-2 py-6 pr-4 ${i % 2 ? `border-l ${rule} pl-4` : i === p.numbers.length - 1 && p.numbers.length % 2 ? "" : "-mr-4 md:mr-0"} ${i >= 2 ? `border-t ${rule} md:border-t-0` : ""} ${span} md:border-l md:pl-4 md:first:border-l-0 md:first:pl-0`}>
              <dt className={`meta ${meta}`}>{label}</dt>
              <dd className={`fig text-[clamp(1.25rem,1.8vw,1.6rem)] ${brass}`}>{value}</dd>
            </div>
          ))}
        </dl>

        {/* ── services as numbered rows */}
        {p.sections.map((sec, si) => (
          <div key={si} className="col-span-12 mt-20 lg:mt-28">
            {sec.heading && <Lines lines={[sec.heading]} className={`${HEAD} mb-10 max-w-[22ch] lg:mb-14`} />}
            <div>
              {sec.items.map((it, i) => {
                n += 1;
                return (
                  <div key={it.title} data-reveal className={`${s.rise} ${GRID} border-t ${rule} py-8 last:border-b md:py-10`} style={delay(i)}>
                    <span className={`fig col-span-2 text-[14px] ${brass} md:col-span-1`}>{String(n).padStart(2, "0")}</span>
                    <h3 className="col-span-10 font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-[1.1] md:col-span-4">{it.title}</h3>
                    <p className={`col-span-12 mt-4 max-w-[48ch] text-[15px] leading-[1.85] md:col-span-6 md:col-start-7 md:mt-0 ${body}`}>{it.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {p.extras}

        {/* ── close */}
        <div className={`col-span-12 mt-20 ${GRID} border-t ${rule} pt-12 lg:mt-28 lg:pt-16`}>
          <div className="col-span-12 lg:col-span-6">
            <Lines lines={[p.close.headline]} className={`${HEAD} max-w-[18ch]`} />
          </div>
          <div className="col-span-12 mt-8 flex flex-col items-start gap-6 lg:col-span-5 lg:col-start-7 lg:mt-2">
            {p.close.aside}
            <EnquireButton className={`${s.tlink} font-display text-[1.35rem] font-medium leading-tight ${link}`}>{p.close.enquire}</EnquireButton>
            <ClientAccessButton className={`${s.tlink} meta ${meta}`}>{p.close.login}</ClientAccessButton>
          </div>
        </div>
        {p.note && <p className={`meta col-span-12 mt-12 max-w-[60ch] leading-[1.9] lg:col-span-8 ${meta}`}>{p.note}</p>}
      </Chapter>
    </div>
  );
}

/** A plain text link in the page's own underline style, for the closing row. */
export function PracticeLink({ href, children, dark }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return <Link href={href} className={`${s.tlink} meta ${dark ? "text-paper/70" : "text-ink/70"}`}>{children}</Link>;
}
