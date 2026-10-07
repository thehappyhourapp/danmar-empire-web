"use client";

import Link from "next/link";
import { OFFICES } from "@/lib/data";
import { href } from "@/lib/routes";
import { sealCream } from "@/lib/marks";
import { GRID } from "@/lib/layout";
import { Wordmark } from "./Nav";
import s from "./motion.module.css";

/* The footer is chrome, not a chapter: forest-deep, the ground Home's close runs
   into without a seam, with cream type, the full seal at 120px, a link to every
   route, the offices, and the full registered name with the disclosure block. */

const PRACTICE_LINKS: [string, string][] = [
  ["management", "Asset Management"],
  ["investments", "Investments"],
  ["leasing", "Executive Leasing"],
  ["property", "Property Management"],
  ["capital", "Corporate Real Estate Capital"],
  ["relocating", "Relocating"],
];
const SITE_LINKS: [string, string][] = [
  ["home", "Home"],
  ["collection", "The Collection"],
  ["track", "Track Record"],
  ["firm", "The Firm"],
  ["areas", "Areas"],
  ["journal", "Journal"],
  ["contact", "Contact"],
];

const YEAR = new Date().getFullYear();
const link = `${s.tlink} text-[14px] text-paper/80 hover:text-paper`;

function Links({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <nav aria-label={title}>
      <p className="meta mb-6 text-paper/60">{title}</p>
      <ul className="space-y-4">
        {items.map(([id, label]) => (
          <li key={id}><Link href={href(id)} className={link}>{label}</Link></li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer({ onEnquire, onAccess }: { onEnquire: () => void; onAccess: () => void }) {
  return (
    <footer data-ground="deep" className={`relative bg-forest-deep text-paper ${s.dark}`}>
      <div className="relative mx-auto max-w-[1440px]">
        <div className={`relative z-10 px-4 pb-10 pt-24 md:px-12 lg:pt-28 ${GRID}`}>
          {/* identity */}
          <div className="col-span-12 lg:col-span-4">
            <img src={sealCream} alt="Danmar Empire" width={120} height={120} className="block h-[120px] w-[120px] object-contain" />
            <div className="mt-8"><Wordmark light /></div>
            <p className="mt-8 max-w-[26ch] font-display text-[clamp(1.35rem,1.9vw,1.6rem)] font-medium leading-[1.3] text-paper/90">
              Asset management, investment, private sales and executive leasing. Oakville, Vaughan, and across Ontario.
            </p>
            <button onClick={() => onEnquire()} className={`${s.tlink} meta mt-8 inline-block text-paper`}>Start a conversation</button>
          </div>

          {/* every route */}
          <div className="col-span-6 mt-16 md:col-span-3 lg:col-span-2 lg:col-start-5 lg:mt-0">
            <Links title="Practices" items={PRACTICE_LINKS} />
          </div>
          <div className="col-span-6 mt-16 md:col-span-3 lg:col-span-2 lg:mt-0">
            <Links title="The firm" items={SITE_LINKS} />
          </div>

          {/* offices */}
          <div className="col-span-12 mt-12 md:col-span-3 md:mt-16 lg:col-span-2 lg:mt-0">
            <p className="meta mb-6 text-paper/60">Offices</p>
            <ul className="space-y-6">
              {OFFICES.map((o) => (
                <li key={o.addr}>
                  <address className="text-[14px] not-italic leading-[1.7] text-paper/75">
                    <span className="meta mb-2 block text-paper/85">{o.city}</span>
                    {o.addr}<br />{o.post}
                  </address>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div className="col-span-12 mt-12 md:col-span-3 md:mt-16 lg:col-span-2 lg:mt-0">
            <p className="meta mb-6 text-paper/60">Contact</p>
            <ul className="space-y-4">
              <li><a href="tel:+19059015011" className={link}>905 901 5011</a></li>
              <li><a href="tel:+18773262671" className={link}>1 877 DANMAR 1</a></li>
              <li><a href="mailto:info@danmarempire.com" className={link}>info@danmarempire.com</a></li>
              <li><button onClick={() => onAccess()} className={link}>Client access</button></li>
            </ul>
            <p className="meta mb-4 mt-10 text-paper/60">Follow</p>
            <ul className="flex gap-6">
              <li><a href="https://instagram.com/danmarempire" className={link}>Instagram</a></li>
              <li><a href="https://linkedin.com/company/danmar-empire-group" className={link}>LinkedIn</a></li>
            </ul>
          </div>

          {/* Compliance block. RECO requires the registered brokerage name, unabbreviated;
              CREA requires attribution wherever the REALTOR® and MLS® marks appear. */}
          <div className="col-span-12 mt-20 border-t border-paper/12 pt-8 lg:mt-24">
            <p className="max-w-[48ch] text-[14px] leading-[1.85] lg:max-w-[1114px] lg:columns-3 lg:gap-x-8 lg:text-[12px] text-paper/65">
              Danmar Empire Real Estate Corp., Brokerage. Registered with the Real Estate Council of Ontario.
              The firm does not provide legal services. Daniel Sheikhan is licensed as a lawyer in Ontario, New York
              and Minnesota, and acts for clients of the firm as a real estate broker, not as their solicitor;
              nothing on this site is legal advice or an offer of legal services. Asset and portfolio management is
              advisory and administrative work carried out for the owner of a portfolio and is not an offer of
              securities or of any interest in a fund. Daniel Sheikhan holds an interest in Khan Law Professional
              Corporation and Daniel &amp; Co. Law Professional Corporation; instructing either firm is never a
              condition of any transaction with the brokerage and clients are free to instruct any solicitor.
              The trademarks REALTOR<sup>®</sup>, REALTORS<sup>®</sup> and the REALTOR<sup>®</sup> logo are controlled by
              The Canadian Real Estate Association (CREA) and identify real estate professionals who are members of CREA.
              The trademarks MLS<sup>®</sup>, Multiple Listing Service<sup>®</sup> and the associated logos are owned by CREA and
              identify the quality of services provided by real estate professionals who are members of CREA.
              Every listing on this site is listed by Danmar Empire Real Estate Corp., Brokerage. Listing information is
              deemed reliable but is not guaranteed accurate. Prices shown are list prices and are subject to change
              without notice. Not intended to solicit properties currently under contract.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <span className="meta text-paper/60">© {YEAR} Danmar Empire Real Estate Corp., Brokerage</span>
              <span className="flex flex-wrap items-center gap-x-8 gap-y-2">
                <Link href={href("privacy")} className={`${s.tlink} meta text-paper/60 hover:text-paper`}>Privacy</Link>
                <span className="meta text-paper/60">Oakville · Vaughan · Toronto</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
