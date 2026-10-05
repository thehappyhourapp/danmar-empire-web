import Link from "next/link";
import { PRACTICES, TEAM } from "@/lib/data";
import { splitName } from "@/lib/people";
import { href, personHref } from "@/lib/routes";
import { Chapter, GRID, HEAD, Lines, delay } from "@/components/Chapter";
import { ImageFrame } from "@/components/ImageFrame";
import { MotionController } from "@/components/MotionController";
import { EnquireButton } from "@/components/SiteShell";
import s from "@/components/motion.module.css";

/* The Firm: whole-page forest, grid paper/5, line rise only. The firm's position
   as short rows, the people as full-width rows linking to their pages, and the
   related-practice disclosure where it can be seen. */

const POSITION: [string, string][] = [
  ["Founded", "2016, Oakville"],
  ["Ownership", "Family owned"],
  ["Registration", "RECO, Ontario"],
  ["Offices", "Oakville · Vaughan"],
  ["Licensed", "Province-wide"],
  ["Transacted", "$1B+"],
  ["Mandates", "$10M – $250M portfolios"],
];

const rule = "border-paper/12";

export function Firm() {
  return (
    <div id="firm">
      <MotionController rootId="firm" />
      <Chapter tone="forest" inner="pb-24 pt-32 md:pt-40 lg:pb-32">
        {/* ── head */}
        <div className="col-span-12 lg:col-span-8">
          <h1 className="max-w-[18ch] font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-medium leading-[1.02] tracking-[-.01em]">A family firm that runs files like a practice.</h1>
          <p className="mt-4 font-display text-[clamp(1.35rem,2.4vw,2rem)] italic leading-[1.1] text-brass-light">Oakville first, since 2016.</p>
        </div>
        <div className="col-span-12 mt-10 space-y-6 text-paper/80 lg:col-span-6 lg:col-start-7 lg:mt-16">
          <p data-reveal className={`${s.rise} max-w-[58ch] text-[16px] leading-[1.85]`}>
            Danmar Empire was founded in Oakville in 2016 by Martin Sheikhan, who spent three decades running
            capital projects before he ever took a listing, and by his son Daniel, who is called to the bar in
            Ontario and admitted in New York and Minnesota.
          </p>
          <p data-reveal className={`${s.rise} max-w-[58ch] text-[16px] leading-[1.85]`} style={delay(1)}>
            That combination is the whole reason the firm looks the way it does. Project managers do not present
            a building without the numbers behind it. Lawyers do not send a document out that has not been read
            twice. Applied to real estate, those two habits produce a firm that turns down more mandates than it
            takes and does not compete on listing volume.
          </p>
          <p data-reveal className={`${s.rise} max-w-[58ch] text-[16px] leading-[1.85]`} style={delay(2)}>
            We work in four places: asset and portfolio management for private owners holding $10 million to
            $250 million, investment property, private residential sales above $1.5 million, and executive
            leasing. We are deliberately not a generalist shop. What we know well we know very well, and we say
            so plainly when a file belongs somewhere else.
          </p>
          <p data-reveal className={`${s.rise} max-w-[58ch] text-[16px] leading-[1.85]`} style={delay(3)}>
            It remains a family business. That is not sentiment: it means the people who answer for the advice
            are the people who own the firm, and they are still here in ten years to answer for it again.
          </p>
        </div>

        {/* ── position, as short rows */}
        <dl className="col-span-12 mt-16 lg:mt-24">
          {POSITION.map(([k, v], i) => (
            <div key={k} data-reveal className={`${s.rise} ${GRID} border-t ${rule} py-4 last:border-b`} style={delay(i)}>
              <dt className="meta col-span-5 self-baseline text-paper/70">{k}</dt>
              <dd className="fig col-span-7 self-baseline text-[15px] text-brass-light md:col-span-6 md:col-start-7">{v}</dd>
            </div>
          ))}
        </dl>

        {/* ── people, as rows */}
        <div className="col-span-12 mt-20 lg:mt-28">
          <Lines lines={["The people who answer", "for the advice."]} className={`${HEAD} mb-10 lg:mb-14`} />
          <div>
            {TEAM.map((p, i) => {
              const { name, designations } = splitName(p.name);
              return (
                <div key={p.slug} data-reveal className={`${s.rise} ${GRID} border-t ${rule} py-8 last:border-b md:py-10`} style={delay(i)}>
                  <Link href={personHref(p.slug)} aria-label={name} className="col-span-4 self-center md:col-span-2">
                    <ImageFrame ratio="4/5" alt="" fallback="flat" ground="forest" />
                  </Link>
                  <div className="col-span-8 self-center md:col-span-6 md:col-start-4">
                    <h3 className="font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-[1.1]">
                      <Link href={personHref(p.slug)} className={`${s.rowlink} hover:text-brass-light`}>{name}</Link>
                    </h3>
                    <p className="meta mt-3 text-paper/70">
                      <span className="block md:inline">{p.role}</span>
                      {designations && <><span className="mx-1.5 hidden opacity-40 md:inline">/</span><span className="block md:inline">{designations}</span></>}
                    </p>
                  </div>
                  {p.line && <p className="col-span-12 mt-4 max-w-[48ch] text-[15px] leading-[1.8] text-paper/80 md:col-span-6 md:col-start-4 md:mt-2">{p.line}</p>}
                  <div className="col-span-12 mt-3 md:col-span-2 md:col-start-11 md:row-span-2 md:row-start-1 md:mt-0 md:self-center md:text-right">
                    <Link href={personHref(p.slug)} className={`${s.tlink} meta text-paper/70 hover:text-paper`}>Profile</Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── related practices, a disclosure placed where it can be seen */}
        <div className="col-span-12 mt-20 lg:mt-28">
          <Lines lines={["Two law firms sit alongside the brokerage.", "You are never obliged to use either."]} className={`${HEAD} mb-6 max-w-[24ch] lg:mb-8`} />
          <p data-reveal className={`${s.rise} mb-10 max-w-[58ch] text-[15px] leading-[1.85] text-paper/80`}>
            Daniel Sheikhan holds an interest in both practices below. We disclose that plainly because a
            registrant who refers you to a business they have an interest in is required to, and because you
            should be free to instruct whichever solicitor you prefer.
          </p>
          <div>
            {PRACTICES.map((pr, i) => (
              <div key={pr.name} data-reveal className={`${s.rise} ${GRID} border-t ${rule} py-7 last:border-b`} style={delay(i)}>
                <div className="col-span-12 md:col-span-5">
                  <h3 className="font-display text-[clamp(1.25rem,1.9vw,1.6rem)] font-medium leading-[1.15]">{pr.name}</h3>
                  <p className="meta mt-2 text-paper/70">{pr.role}</p>
                </div>
                <p className="col-span-12 mt-3 max-w-[56ch] text-[15px] leading-[1.85] text-paper/80 md:col-span-6 md:col-start-7 md:mt-0">{pr.line}</p>
              </div>
            ))}
          </div>
          <p className="meta mt-6 max-w-[90ch] leading-[1.9] text-paper/70">
            Danmar Empire Real Estate Corp., Brokerage does not provide legal services, and instructing either
            firm is never a condition of any transaction with the brokerage.
          </p>
        </div>

        {/* ── close */}
        <div className={`col-span-12 mt-20 ${GRID} border-t ${rule} pt-12 lg:mt-28 lg:pt-16`}>
          <div className="col-span-12 lg:col-span-6">
            <Lines lines={["Arrange a meeting."]} className={`${HEAD} max-w-[18ch]`} />
          </div>
          <div className="col-span-12 mt-8 flex flex-col items-start gap-5 lg:col-span-5 lg:col-start-7 lg:mt-2">
            <EnquireButton className={`${s.tlink} font-display text-[1.35rem] font-medium leading-tight text-paper`}>Start a conversation</EnquireButton>
            <Link href={href("contact")} className={`${s.tlink} meta text-paper/70`}>Offices and contact</Link>
          </div>
        </div>
      </Chapter>
    </div>
  );
}
