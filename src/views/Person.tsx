import Link from "next/link";
import { TEAM } from "@/lib/data";
import type { Person as P } from "@/lib/data";
import { SITE } from "@/lib/metadata";
import { splitName } from "@/lib/people";
import { href, personHref } from "@/lib/routes";
import { Chapter, GRID, HEAD, Lines, delay } from "@/components/Chapter";
import { ImageFrame } from "@/components/ImageFrame";
import { MotionController } from "@/components/MotionController";
import { EnquireButton } from "@/components/SiteShell";
import s from "@/components/motion.module.css";

const BROKERAGE = "Danmar Empire Real Estate Corp., Brokerage";

/* A person: cream, the portrait frame flat until photography, the biography,
   credentials and practice as rows, and a contact row of text links. */

export function Person({ p }: { p: P }) {
  const { name, designations } = splitName(p.name);
  const others = TEAM.filter((t) => t.slug !== p.slug);
  const telHref = p.tel ? `tel:+1${p.tel.replace(/\D/g, "")}` : null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    ...(designations ? { honorificSuffix: designations } : {}),
    jobTitle: p.role,
    url: `${SITE}${personHref(p.slug)}`,
    ...(p.email ? { email: p.email } : {}),
    ...(p.tel ? { telephone: `+1 ${p.tel}` } : {}),
    worksFor: { "@type": "RealEstateAgent", name: BROKERAGE, url: SITE },
  };

  const rows = ([
    ["Credentials", p.creds?.join(" · ")],
    ["Practice", p.focus?.join(" · ")],
    ["Areas", p.areas],
  ] as [string, string | undefined][]).filter((r): r is [string, string] => !!r[1]);

  return (
    <div id="person">
      <MotionController rootId="person" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Chapter inner="pb-24 pt-32 md:pt-40 lg:pb-32">
        <nav aria-label="Breadcrumb" className="col-span-12">
          <Link href={href("firm")} className={`${s.tlink} meta text-ink/70 hover:text-forest`}>The Firm</Link>
        </nav>

        <div className="col-span-12 mt-10 md:col-span-4 lg:col-span-3">
          <ImageFrame ratio="4/5" alt={name} fallback="flat" />
        </div>
        <header className="col-span-12 mt-8 md:col-span-7 md:col-start-6 md:mt-10 lg:col-span-6 lg:col-start-5">
          <h1 className="max-w-[16ch] font-display text-[clamp(2.1rem,4.6vw,3.6rem)] font-medium leading-[1.04] tracking-[-.01em]">{name}</h1>
          <p className="meta mt-4 text-ink/70">
            <span className="block md:inline">{p.role}</span>
            {designations && <><span className="mx-1.5 hidden opacity-40 md:inline">/</span><span className="block md:inline">{designations}</span></>}
          </p>
          {p.bio?.length ? (
            <div className="mt-8 space-y-6">
              {p.bio.map((b, i) => (
                <p key={i} data-reveal className={`${s.rise} max-w-[60ch] text-[15.5px] leading-[1.9] text-ink/80`} style={delay(i)}>{b}</p>
              ))}
            </div>
          ) : null}
        </header>

        {/* credentials, practice, areas as rows */}
        {rows.length > 0 && <div className="col-span-12 mt-16 lg:mt-20">
          {rows.map(([k, v], i) => (
            <div key={k} data-reveal className={`${s.rise} ${GRID} border-t border-forest/14 py-6 last:border-b`} style={delay(i)}>
              <h2 className="col-span-12 font-display text-[1.25rem] font-medium leading-[1.15] md:col-span-5">{k}</h2>
              <p className="col-span-12 mt-2 text-[15px] leading-[1.8] text-ink/80 md:col-span-6 md:col-start-7 md:mt-0">{v}</p>
            </div>
          ))}
        </div>}

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
          <p className="meta mb-6 text-brass">The rest of the firm</p>
          <div>
            {others.map((o) => {
              const n = splitName(o.name);
              return (
                <div key={o.slug} className={`${GRID} border-t border-forest/14 py-5 last:border-b`}>
                  <h3 className="col-span-12 font-display text-[1.2rem] font-medium leading-[1.15] md:col-span-5">
                    <Link href={personHref(o.slug)} className={`${s.rowlink} hover:text-forest-mid`}>{n.name}</Link>
                  </h3>
                  <p className="meta col-span-12 mt-1 text-ink/70 md:col-span-6 md:col-start-7 md:mt-0">{o.role}{n.designations ? ` · ${n.designations}` : ""}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Chapter>
    </div>
  );
}
