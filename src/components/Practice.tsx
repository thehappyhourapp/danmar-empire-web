import Link from "next/link";
import { SITE } from "@/lib/metadata";
import { Chapter, Lines } from "./Chapter";
import { GRID, HEAD, delay } from "@/lib/layout";
import { ImageFrame } from "./ImageFrame";
import { MotionController } from "./MotionController";
import { ClientAccessButton, EnquireButton } from "./SiteShell";
import s from "./motion.module.css";
import { practiceTones } from "./practiceTones";

/* The practice page template. Asset Management set it; Investments, Executive
   Leasing, Property Management and Corporate Real Estate Capital are built from
   it. One ground for the whole page, no cuts, line rise only. Eyebrow, the locked
   H1, one italic brass line under it and none on section titles, an optional
   numbers strip on the column lines, rows (numbered or plain) in the order the
   page needs them with custom blocks between, and a closing row with a text link
   to the enquire drawer and the practice's Client access control. */

const BROKERAGE = "Danmar Empire Real Estate Corp., Brokerage";

export interface PracticeItem { title: string; text?: string; points?: string[] }
export interface PracticeSection {
  heading?: string;
  items: PracticeItem[];
  /** numbered rows (the default) or plain title/text rows */
  numbered?: boolean;
  /** start this section's numbering at 01 again */
  restart?: boolean;
}
/** A section of rows, or a custom block placed between sections. */
export type PracticeBlock = PracticeSection | { node: React.ReactNode };

export interface PracticeProps {
  tone: "forest" | "cream";
  id: string;
  path: string;
  eyebrow: string;
  headline: string[];
  italic: string;
  intro: string[];
  /** the opening photograph, /photos/practices/<route-slug>.jpg, through photo(); the frame stays flat until the file exists */
  photo?: string;
  /** text links under the intro, for a page whose first screen points somewhere */
  heroLinks?: React.ReactNode;
  /** a titled row between the head and the intro: the definition a first-time reader needs */
  lead?: { title: string; text: string };
  /** figures that exist in the data; two to four cells, never an invented number. Omit the strip when there are none. */
  numbers?: string[][];
  /** a .meta footnote under the numbers strip (a methodology line) */
  numbersNote?: string;
  sections: PracticeBlock[];
  /** page-specific rows between the sections and the close */
  extras?: React.ReactNode;
  /** omit on a page whose own form is the close */
  close?: { headline: string; enquire: string; login: string; aside?: React.ReactNode };
  /** a disclosure set small beneath the close, where it can be seen */
  note?: string;
  service: { name: string; type: string; description: string };
  /** further JSON-LD objects for the page (FAQPage, BreadcrumbList) */
  jsonLd?: object[];
}

/** Rows in the template's own pattern: index figure, title in columns 2 to 5, text in 7 to 12. */
export function PracticeRows({ tone, items, numbered = true, start = 1 }: { tone: "forest" | "cream"; items: PracticeItem[]; numbered?: boolean; start?: number }) {
  const t = practiceTones(tone);
  return (
    <div>
      {items.map((it, i) => (
        <div key={it.title} data-reveal className={`${s.rise} ${GRID} border-t ${t.rule} py-8 last:border-b md:py-10`} style={delay(i)}>
          {numbered && <span className={`fig col-span-2 text-[14px] ${t.brass} md:col-span-1`}>{String(start + i).padStart(2, "0")}</span>}
          <h3 className={`${numbered ? "col-span-10 md:col-span-4" : "col-span-12 md:col-span-5"} font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-[1.1]`}>{it.title}</h3>
          {(it.text || it.points) && (
            <div className={`col-span-12 mt-4 max-w-[48ch] md:col-span-6 md:col-start-7 md:mt-0 ${t.body}`}>
              {it.text && <p className="text-[15px] leading-[1.85]">{it.text}</p>}
              {it.points && (
                <ul className={`${it.text ? "mt-4" : ""} space-y-2 text-[15px] leading-[1.7]`}>
                  {it.points.map((p) => (
                    <li key={p} className="flex gap-4"><span aria-hidden className={`mt-[0.85em] block h-px w-4 shrink-0 ${t.dark ? "bg-paper/40" : "bg-forest/40"}`} />{p}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function Practice(p: PracticeProps) {
  const t = practiceTones(p.tone);
  const cells = p.numbers?.length ?? 0;
  const span = cells === 2 ? "md:col-span-6" : cells === 3 ? "md:col-span-4" : "md:col-span-3";

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: p.service.name,
    serviceType: p.service.type,
    description: p.service.description,
    url: `${SITE}${p.path}`,
    areaServed: { "@type": "AdministrativeArea", name: "Ontario" },
    provider: { "@type": "RealEstateAgent", name: BROKERAGE, url: SITE },
  };
  const ld = (o: object) => JSON.stringify(o).replace(/</g, "\\u003c");

  // each numbered section's first index, derived once: numbering runs on across
  // sections unless a section restarts it
  const starts = p.sections.reduce<number[]>((acc, sec, i) => {
    const prev = i === 0 ? 0 : acc[i - 1];
    if ("node" in sec) { acc.push(prev); return acc; }
    const base = sec.restart ? 0 : prev;
    acc.push(base + ((sec.numbered ?? true) ? sec.items.length : 0));
    return acc;
  }, []);
  const startOf = (i: number) => (i === 0 ? 0 : starts[i - 1]) + 1;
  return (
    <div id={p.id}>
      <MotionController rootId={p.id} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(service) }} />
      {p.jsonLd?.map((o, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(o) }} />)}

      <Chapter tone={p.tone} inner="pb-24 pt-[calc(var(--nav-h)_+_64px_-_40px)] lg:pt-[calc(var(--nav-h)_+_96px_-_40px)] lg:pb-40">
        {/* ── head */}
        <p className={`meta col-span-12 ${t.brass}`}>{p.eyebrow}</p>
        <div className="col-span-12 mt-6 lg:col-span-8">
          <h1 className="max-w-[18ch] font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-medium leading-[1.02] tracking-[-.01em]">{p.headline.join(" ")}</h1>
          <p className={`mt-4 font-display text-[clamp(1.35rem,2.4vw,2rem)] italic leading-[1.1] ${t.brass}`}>{p.italic}</p>
        </div>

        {/* ── the definition, as a row directly under the head */}
        {p.lead && (
          <div className={`col-span-12 mt-12 ${GRID} border-y ${t.rule} py-8 md:py-10 lg:mt-16`}>
            <h2 className="col-span-12 font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-[1.1] md:col-span-5">{p.lead.title}</h2>
            <p className={`col-span-12 mt-4 max-w-[48ch] text-[16px] leading-[1.85] md:col-span-6 md:col-start-7 md:mt-0 ${t.body}`}>{p.lead.text}</p>
          </div>
        )}

        {/* the opening photograph: a 16:10 frame in columns 1 to 5, flat until the file exists */}
        <div className={`col-span-12 mt-10 lg:col-span-5 ${p.lead ? "lg:mt-12" : "lg:mt-16"}`}>
          <ImageFrame src={p.photo} ratio="16/10" alt="" fallback="flat" ground={p.tone} />
        </div>
        <div className={`col-span-12 mt-10 space-y-6 lg:col-span-6 lg:col-start-7 ${p.lead ? "lg:mt-12" : "lg:mt-16"} ${t.body}`}>
          {p.intro.map((x, i) => (
            <p key={i} data-reveal className={`${s.rise} max-w-[48ch] text-[16px] leading-[1.85]`} style={delay(i)}>{x}</p>
          ))}
          {p.heroLinks && <div className="flex flex-col items-start gap-4 pt-2">{p.heroLinks}</div>}
        </div>

        {/* ── numbers strip: cells on the column lines */}
        {cells > 0 && (
          <>
            <dl className={`col-span-12 mt-16 ${GRID} border-y ${t.rule} lg:mt-24`}>
              {p.numbers!.map(([label, value], i) => (
                <div key={label} className={`${i === cells - 1 && cells % 2 ? "col-span-12" : "col-span-6"} flex flex-col-reverse gap-2 py-6 pr-4 ${i % 2 ? `border-l ${t.rule} pl-4` : i === cells - 1 && cells % 2 ? "" : "-mr-4 md:mr-0"} ${i >= 2 ? `border-t ${t.rule} md:border-t-0` : ""} ${span} md:border-l md:pl-4 md:first:border-l-0 md:first:pl-0`}>
                  <dt className={`meta ${t.meta}`}>{label}</dt>
                  <dd className={`fig text-[clamp(1.25rem,1.8vw,1.6rem)] ${t.brass}`}>{value}</dd>
                </div>
              ))}
            </dl>
            {p.numbersNote && <p className={`meta col-span-12 mt-4 max-w-[60ch] leading-[1.9] ${t.meta}`}>{p.numbersNote}</p>}
          </>
        )}

        {/* ── rows, in the page's order, with custom blocks between */}
        {p.sections.map((sec, si) => {
          if ("node" in sec) return <div key={si} className="contents">{sec.node}</div>;
          const numbered = sec.numbered ?? true;
          const start = sec.restart ? 1 : startOf(si);
          return (
            <div key={si} className="col-span-12 mt-20 lg:mt-28">
              {sec.heading && <Lines lines={[sec.heading]} className={`${HEAD} mb-10 max-w-[22ch] lg:mb-14`} />}
              <PracticeRows tone={p.tone} items={sec.items} numbered={numbered} start={start} />
            </div>
          );
        })}

        {p.extras}

        {/* ── close */}
        {p.close && (
          <div className={`col-span-12 mt-20 ${GRID} border-t ${t.rule} pt-12 lg:mt-28 lg:pt-16`}>
            <div className="col-span-12 lg:col-span-6">
              <Lines lines={[p.close.headline]} className={`${HEAD} max-w-[18ch]`} />
            </div>
            <div className="col-span-12 mt-8 flex flex-col items-start gap-6 lg:col-span-5 lg:col-start-7 lg:mt-2">
              {p.close.aside}
              <EnquireButton className={`${s.tlink} font-display text-[1.35rem] font-medium leading-tight ${t.link}`}>{p.close.enquire}</EnquireButton>
              <ClientAccessButton className={`${s.tlink} meta ${t.meta}`}>{p.close.login}</ClientAccessButton>
            </div>
          </div>
        )}
        {p.note && <p className={`meta col-span-12 mt-12 max-w-[60ch] leading-[1.9] lg:col-span-8 ${t.meta}`}>{p.note}</p>}
      </Chapter>
    </div>
  );
}

/** A plain text link in the page's own underline style, for the closing row. */
export function PracticeLink({ href, children, dark }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return <Link href={href} className={`${s.tlink} meta ${dark ? "text-paper/70" : "text-ink/70"}`}>{children}</Link>;
}
