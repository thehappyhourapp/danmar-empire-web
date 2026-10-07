import Image from "next/image";
import Link from "next/link";
import { TEAM, TESTIMONIALS } from "@/lib/data";
import type { Person as P } from "@/lib/data";
import { ORG_ID, SITE } from "@/lib/metadata";
import { splitName } from "@/lib/people";
import { href, personHref } from "@/lib/routes";
import { Chapter, Lines } from "@/components/Chapter";
import { GRID, HEAD, delay } from "@/lib/layout";
import { ImageFrame } from "@/components/ImageFrame";
import { MotionController } from "@/components/MotionController";
import { EnquireButton } from "@/components/SiteShell";
import s from "@/components/motion.module.css";

const BROKERAGE = "Danmar Empire Real Estate Corp., Brokerage";

/* A person: cream. The name, the role, the portrait (or the emblem filler where
   there is no published portrait), the biography in the person's own words, then
   Background, Education, Certifications, Experience and Achievements as rows, one
   line per item, a links row, and a contact row of text links. Nothing on this
   page is written for the person; absent fields are left out. */

/** The first two sentences of a quote, for a pull row. */
const firstTwo = (q: string) => q.split(/(?<=[.!?]['"]?)\s+/).slice(0, 2).join(" ");

export function Person({ p }: { p: P }) {
  const { name, designations } = splitName(p.name);
  const others = TEAM.filter((t) => t.slug !== p.slug);
  const telHref = p.tel ? `tel:+1${p.tel.replace(/\D/g, "")}` : null;
  const certifications = p.certifications ?? p.creds;
  const pull = p.slug === "martin-sheikhan" ? TESTIMONIALS.find((t) => t.name === "Mala & Bunnie N.") : undefined;
  const schools = (p.education ?? []).map((e) => e.split(", ").slice(1).join(", ")).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    ...(designations ? { honorificSuffix: designations } : {}),
    jobTitle: p.role,
    url: `${SITE}${personHref(p.slug)}`,
    ...(p.portrait ? { image: `${SITE}${p.portrait}` } : {}),
    ...(p.email ? { email: p.email } : {}),
    ...(p.tel ? { telephone: `+1 ${p.tel}` } : {}),
    ...(p.links?.length ? { sameAs: p.links.map((l) => l.href) } : {}),
    ...(schools.length ? { alumniOf: schools.map((n) => ({ "@type": "EducationalOrganization", name: n })) } : {}),
    ...(certifications?.length ? { hasCredential: certifications.map((c) => ({ "@type": "EducationalOccupationalCredential", name: c })) } : {}),
    worksFor: { "@type": "RealEstateAgent", "@id": ORG_ID, name: BROKERAGE, url: SITE },
  };

  const rows: [string, string[]][] = ([
    ["Background", p.background],
    ["Education", p.education],
    ["Certifications", certifications],
    ["Experience", p.experience],
    ["Achievements", p.achievements],
  ] as [string, string[] | undefined][]).filter((r): r is [string, string[]] => !!r[1]?.length);

  return (
    <div id="person">
      <MotionController rootId="person" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Chapter inner="pb-24 pt-[calc(var(--nav-h)_+_64px_-_49px)] lg:pt-[calc(var(--nav-h)_+_96px_-_49px)] lg:pb-40">
        <nav aria-label="Breadcrumb" className="col-span-12">
          <Link href={href("firm")} className={`${s.tlink} meta text-ink/70 hover:text-forest`}>The Firm</Link>
        </nav>

        {/* the name leads at 390; from md the portrait takes the left of the same row */}
        <header className="col-span-12 mt-6 md:col-span-7 md:col-start-6 md:row-start-2 lg:col-span-6 lg:col-start-5">
          <h1 className="max-w-[16ch] font-display text-[clamp(2.1rem,4.6vw,3.6rem)] font-medium leading-[1.04] tracking-[-.01em]">{name}</h1>
          <p className="meta mt-4 text-ink/70">
            <span className="block md:inline">{p.role}</span>
            {designations && <><span className="mx-2 hidden opacity-40 md:inline">/</span><span className="block md:inline">{designations}</span></>}
          </p>
          {p.bio?.length ? (
            <div className="mt-8 space-y-6">
              {p.bio.map((b, i) => (
                <p key={i} data-reveal className={`${s.rise} max-w-[48ch] text-[15.5px] leading-[1.9] text-ink/80`} style={delay(i)}>{b}</p>
              ))}
            </div>
          ) : null}
        </header>
        <div className="col-span-12 mt-10 md:col-span-4 md:col-start-1 md:row-start-2 md:mt-6 lg:col-span-3">
          {p.portrait ? (
            <div className="relative aspect-[4/5] overflow-hidden bg-forest/10">
              <Image src={p.portrait} alt={name} fill priority sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw" className="object-cover" />
            </div>
          ) : (
            <ImageFrame ratio="4/5" alt="" fallback="flat" filler="emblem" />
          )}
        </div>

        {/* one client statement, above the background */}
        {pull && (
          <figure className={`col-span-12 mt-16 ${GRID} border-y border-forest/14 py-8 md:py-10 lg:mt-20`}>
            <blockquote className="col-span-12 max-w-[40ch] font-display text-[clamp(1.2rem,1.8vw,1.5rem)] font-medium leading-[1.35] text-forest md:col-span-6 md:col-start-7">
              {firstTwo(pull.quote)}
            </blockquote>
            <figcaption className="meta col-span-12 mt-4 text-brass md:col-span-6 md:col-start-7">{pull.name}</figcaption>
          </figure>
        )}

        {/* background, education, certifications, experience, achievements */}
        {rows.length > 0 && <div className={`col-span-12 ${pull ? "mt-0 [&>div:first-child]:border-t-0" : "mt-16 lg:mt-20"}`}>
          {rows.map(([k, items], i) => (
            <div key={k} data-reveal className={`${s.rise} ${GRID} border-t border-forest/14 py-6 last:border-b md:py-8`} style={delay(i)}>
              <h2 className="col-span-12 font-display text-[1.25rem] font-medium leading-[1.15] md:col-span-5">{k}</h2>
              <div className="col-span-12 mt-3 max-w-[48ch] space-y-2 text-[15px] leading-[1.8] text-ink/80 md:col-span-6 md:col-start-7 md:mt-0">
                {items.map((it) => <p key={it}>{it}</p>)}
              </div>
            </div>
          ))}
        </div>}

        {/* links: external text links, no icons */}
        {p.links?.length ? (
          <div className={`col-span-12 ${rows.length ? "[&>div]:border-t-0" : "mt-16 lg:mt-20"}`}>
            <div className={`${GRID} border-y border-forest/14 py-6 md:py-8`}>
              <h2 className="col-span-12 font-display text-[1.25rem] font-medium leading-[1.15] md:col-span-5">Links</h2>
              <ul className="col-span-12 mt-3 flex flex-wrap gap-x-8 gap-y-2 md:col-span-6 md:col-start-7 md:mt-0">
                {p.links.map((l) => (
                  <li key={l.href}><a href={l.href} target="_blank" rel="noopener" className={`${s.tlink} text-[15px] text-ink/80 hover:text-forest`}>{l.label}</a></li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}

        {/* contact row, only where the person has a direct line */}
        {(p.email || p.tel) && <div className={`col-span-12 mt-16 ${GRID} border-t border-forest/14 pt-12 lg:mt-20 lg:pt-16`}>
          <div className="col-span-12 lg:col-span-6">
            <Lines lines={[`Speak with ${name.split(" ")[0]}.`]} className={`${HEAD} max-w-[18ch]`} />
          </div>
          <div className="col-span-12 mt-8 flex flex-col items-start gap-4 lg:col-span-5 lg:col-start-7 lg:mt-2">
            {p.email && <a href={`mailto:${p.email}`} className={`${s.tlink} font-display text-[1.3rem] font-medium leading-tight text-forest`}>{p.email}</a>}
            {telHref && <a href={telHref} className={`${s.tlink} text-[15px] text-ink/80 hover:text-forest`}>{p.tel}</a>}
            <EnquireButton className={`${s.tlink} meta text-ink/70 hover:text-forest`}>Enquire through the desk</EnquireButton>
          </div>
        </div>}

        {/* the rest of the firm */}
        <div className="col-span-12 mt-20 lg:mt-28">
          <h2 className="meta mb-6 text-brass">The rest of the firm</h2>
          <div>
            {others.map((o) => {
              const n = splitName(o.name);
              return (
                <div key={o.slug} className={`${s.row} ${GRID} border-t border-forest/14 py-6 last:border-b`}>
                  <h3 className="col-span-12 font-display text-[1.2rem] font-medium leading-[1.15] md:col-span-5">
                    <Link href={personHref(o.slug)} className={s.rowlink}>{n.name}</Link>
                  </h3>
                  <p className="meta col-span-12 mt-2 text-ink/70 md:col-span-6 md:col-start-7 md:mt-0">{o.role}{n.designations ? ` · ${n.designations}` : ""}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Chapter>
    </div>
  );
}
