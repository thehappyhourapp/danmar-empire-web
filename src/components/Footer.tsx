"use client";

import Link from "next/link";
import { OFFICES } from "@/lib/data";
import { href } from "@/lib/routes";
import { NAV, Wordmark } from "./Nav";
import { sealCream } from "@/lib/marks";

export function Footer({ onEnquire }: { onEnquire: () => void }) {
  return (
    <footer className="bg-forest-deep text-paper">
      <div className="mx-auto max-w-[1560px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div>
            <img src={sealCream} alt="Danmar Empire" width={120} height={120}
              className="mb-9 block" style={{ width: 120, height: 120, objectFit: "contain" }} />
            <Wordmark light />
            <p className="mt-7 max-w-[30ch] font-display text-[22px] leading-[1.35] text-paper/85 md:text-[26px]">
              Asset management, investment, private sales and executive leasing. Oakville, Vaughan, and across Ontario.
            </p>
            <button onClick={() => onEnquire()}
              className="meta mt-8 border border-paper/30 px-6 py-3 text-paper transition-colors hover:bg-paper hover:text-ink">
              Start a conversation
            </button>
          </div>

          <div>
            <div className="meta mb-5 text-paper/60">Navigate</div>
            <ul className="space-y-3">
              {NAV.map((n) => (
                <li key={n.id}>
                  <Link href={href(n.id)} className="link-u text-[13px] text-paper/80 hover:text-paper">{n.label}</Link>
                </li>
              ))}
              {[["areas", "Areas"], ["journal", "Journal"]].map(([id, label]) => (
                <li key={id}>
                  <Link href={href(id)} className="link-u text-[13px] text-paper/80 hover:text-paper">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="meta mb-5 text-paper/60">Offices</div>
            <ul className="space-y-5">
              {OFFICES.map((o) => (
                <li key={o.city} className="text-[13px] leading-relaxed text-paper/60">
                  <div className="meta mb-1 text-paper/80">{o.city}</div>
                  {o.addr}<br />{o.post}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="meta mb-5 text-paper/60">Contact</div>
            <ul className="space-y-2 text-[13px] text-paper/80">
              <li><a href="tel:+19059015011" className="link-u">905 901 5011</a></li>
              <li><a href="tel:+18773262671" className="link-u">1 877 DANMAR 1</a></li>
              <li><a href="mailto:info@danmarempire.com" className="link-u">info@danmarempire.com</a></li>
            </ul>
            <div className="meta mb-4 mt-9 text-paper/60">Follow</div>
            <ul className="flex gap-5 text-[13px] text-paper/80">
              <li><a href="https://instagram.com/danmarempire" className="link-u">Instagram</a></li>
              <li><a href="https://linkedin.com/company/danmar-empire-group" className="link-u">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        {/* Compliance block. CREA requires MLS(R)/REALTOR(R) attribution wherever the marks
            appear; RECO requires the registered brokerage name, unabbreviated, and
            attribution of the listing brokerage on every IDX listing. */}
        <div className="mt-20 border-t border-paper/12 pt-8">
          <p className="max-w-[110ch] text-[11px] leading-[1.8] text-paper/62">
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
            Listing information is deemed reliable but is not guaranteed accurate. Listings held by brokerages other than
            Danmar Empire Real Estate Corp., Brokerage are marked with the name of the listing brokerage. Prices shown are
            listing prices and are subject to change without notice. Not intended to solicit properties currently under contract.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            <span className="meta text-paper/55">© {new Date().getFullYear()} Danmar Empire Real Estate Corp.</span>
            <span className="meta text-paper/55">Oakville · Vaughan · Toronto</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
