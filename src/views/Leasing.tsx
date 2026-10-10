import { COVENANTS, FURNISHING, PILLARS } from "@/lib/data";
import { practiceImage } from "@/lib/photos";
import { ImageFrame } from "@/components/ImageFrame";
import { href } from "@/lib/routes";
import { Lines } from "@/components/Chapter";
import { GRID, HEAD, delay } from "@/lib/layout";
import { Practice, PracticeLink } from "@/components/Practice";
import s from "@/components/motion.module.css";

/* Executive leasing: built from the Asset Management template. Whole-page cream.
   The only practice page with the covenant list and the furnishing row. */

const FOR_LANDLORDS = [
  { title: "Covenant verification", text: "We qualify the guarantee behind the tenant: corporate undertaking, parent-company covenant, or diplomatic note. Personal credit files are the fallback, not the standard." },
  { title: "Term and escalation", text: "Twelve to thirty-six months with fixed escalation, not a twelve-month term that has to be renegotiated in month nine." },
  { title: "Turnkey presentation", text: "Furnishing, photography and the relocation package are produced in-house. A furnished executive property lets at a materially higher rate than the same house empty." },
  { title: "Managed handover", text: "Move-in inspection, schedule of condition, utilities transfer and a single point of contact for the term." },
];

const FOR_RELOCATION = [
  { title: "One shortlist", text: "We are given a brief by your relocation department and we return a shortlist, not a portal link. Most placements close on the first or second viewing." },
  { title: "School and commute mapping", text: "Catchments, private-school proximity and realistic drive times, checked rather than assumed." },
  { title: "Discretion", text: "We do not name our tenants or their employers, publicly or to other landlords." },
  { title: "Paperwork that survives review", text: "Leases drafted to survive a corporate legal review, including assignment, early-termination and diplomatic-clause provisions." },
];

function Extras() {
  return (
    <>
      {/* covenants, as rows */}
      <div className="col-span-12 mt-20 lg:mt-28">
        <Lines lines={["Covenants we place against."]} className={`${HEAD} mb-10 max-w-[20ch] lg:mb-14`} />
        <div>
          {COVENANTS.map((c, i) => (
            <p key={c} data-reveal className={`${s.rise} ${GRID} border-t border-forest/14 py-6 last:border-b`} style={delay(i)}>
              <span className="col-span-12 text-[16px] leading-[1.7] text-ink/80 md:col-span-8 md:col-start-2">{c}</span>
            </p>
          ))}
        </div>
        <p className="meta mt-6 text-ink/70">We describe the covenant, never the client.</p>
      </div>

      {/* furnishing, one row */}
      <div data-reveal className={`${s.rise} col-span-12 mt-20 ${GRID} border-y border-forest/14 py-10 lg:mt-28`}>
        <div className="col-span-12 md:col-span-5">
          <h3 className="font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-[1.1]">Furnished, where the brief calls for it</h3>
          <p className="fig mt-6 text-[clamp(1.6rem,2.6vw,2.4rem)] text-brass">+{FURNISHING.uplift}</p>
          <p className="meta mt-2 text-ink/70">of base rent, fully furnished and installed</p>
          <div className="mt-8 max-w-[480px]">
            {(() => { const img = practiceImage("executive-leasing-2"); return <ImageFrame src={img?.src} srcSet={img?.srcSet} sizes="(min-width: 768px) 40vw, 100vw" ratio="16/10" alt={img?.alt ?? ""} fallback="flat" />; })()}
          </div>
        </div>
        <div className="col-span-12 mt-6 md:col-span-6 md:col-start-7 md:mt-0">
          <p className="max-w-[48ch] text-[15px] leading-[1.85] text-ink/80">{FURNISHING.note}</p>
          <p className="meta mt-6 max-w-[60ch] text-ink/70">
            Specified and installed by us through {FURNISHING.sources.join(", ")}. Not affiliated with any of them.
          </p>
        </div>
      </div>
    </>
  );
}

export function Leasing() {
  return (
    <Practice
      tone="cream"
      id="leasing"
      path={href("leasing")}
      photo={practiceImage("executive-leasing")}
      eyebrow="Executive Leasing"
      headline={["Ten thousand a month and up, placed against a verified covenant."]}
      italic="We qualify the guarantee, not a credit file."
      intro={[
        "We act on both sides of the executive lease: for landlords who want the rent to arrive without a monthly conversation about it, and for relocation departments who want the search finished before the family lands.",
      ]}
      numbers={[["Entry point", "$10,000 per month"], ...PILLARS[3].stats]}
      numbersNote={PILLARS[3].statsNote}
      sections={[
        { heading: "For landlords.", items: FOR_LANDLORDS },
        { heading: "For relocation departments.", items: FOR_RELOCATION },
      ]}
      extras={<Extras />}
      close={{
        headline: "Brief the leasing desk.",
        enquire: "Brief the desk",
        login: "Client login",
        aside: <PracticeLink href={href("collection")}>Executive leases are in the Collection</PracticeLink>,
      }}
      service={{ name: "Executive and luxury home leasing", type: "Executive leasing", description: "Executive leasing for corporate and diplomatic relocation from $10,000 per month, placed against verified covenants across Oakville, King City and Toronto." }}
    />
  );
}
