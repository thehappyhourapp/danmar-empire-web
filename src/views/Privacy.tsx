import { Chapter } from "@/components/Chapter";
import Link from "next/link";
import { GRID } from "@/lib/layout";
import { href } from "@/lib/routes";
import s from "@/components/motion.module.css";

/* A plain privacy page, cream, in the row pattern. Short and standard; marked
   for Daniel's review in docs/CONFIRM.md before launch. */

const SECTIONS: [string, string[]][] = [
  ["What we collect", [
    "What you type into a form on this site: your name, email address, telephone number, company, title, and whatever you tell us about a property or an enquiry. If you arrive from a link that carries campaign parameters, we keep those with your enquiry so we know how you found us.",
    "The site keeps a shortlist of saved properties in your own browser. It never leaves your device.",
    "The site does not use analytics or advertising cookies.",
  ]],
  ["Why", ["To reply to you, to arrange the conversation you asked for, and to keep a record of it. We do not sell personal information, and we do not add you to a mailing list without asking."]],
  ["Who sees it", ["People at Danmar Empire Real Estate Corp. who handle your enquiry. Messages sent through the site are delivered by an email service provider acting on our instructions."]],
  ["How long we keep it", ["As long as the enquiry and any work that follows it are open, and afterwards for as long as the law and our regulator require brokerage records to be kept."]],
  ["Your choices", ["You can ask what we hold about you, ask us to correct it, or ask us to delete it where we are not required to keep it. You can withdraw consent to be contacted at any time. Write to the desk and we will act on it."]],
  ["The law", ["We handle personal information under Canada's Personal Information Protection and Electronic Documents Act and Canada's Anti-Spam Legislation, and under the record-keeping requirements of the Real Estate Council of Ontario."]],
];

export function Privacy() {
  return (
    <div id="privacy">
      <Chapter inner="pb-24 pt-[calc(var(--nav-h)_+_64px)] lg:pt-[calc(var(--nav-h)_+_96px)] lg:pb-40">
        <div className="col-span-12 lg:col-span-8">
          <h1 className="max-w-[18ch] font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-medium leading-[1.02] tracking-[-.01em]">Privacy.</h1>
        </div>
        <p className="col-span-12 mt-10 max-w-[48ch] text-[16px] leading-[1.85] text-ink/80 lg:col-span-6 lg:col-start-7 lg:mt-16">
          How Danmar Empire Real Estate Corp. handles what you send through this site.
        </p>
        <div className="col-span-12 mt-16 lg:mt-24">
          {SECTIONS.map(([title, paras]) => (
            <div key={title} className={`${GRID} border-t border-forest/14 py-8 last:border-b md:py-10`}>
              <h2 className="col-span-12 font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-[1.1] md:col-span-5">{title}</h2>
              <div className="col-span-12 mt-4 max-w-[48ch] space-y-4 text-[15px] leading-[1.85] text-ink/80 md:col-span-6 md:col-start-7 md:mt-0">
                {paras.map((p) => <p key={p}>{p}</p>)}
              </div>
            </div>
          ))}
        </div>
        <p className="meta col-span-12 mt-10 max-w-[60ch] leading-[1.9] text-ink/70">
          Questions about this page go to the desk: 905 901 5011, or the contact page. Last reviewed October 2026. See also the <Link href={href("terms")} className={`${s.tlink} text-ink/80`}>terms of use</Link>.
        </p>
      </Chapter>
    </div>
  );
}
