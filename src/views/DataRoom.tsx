"use client";

import { useState } from "react";

/**
 * Sold data sits behind a registration wall by design.
 * RECO: sold price shown publicly is advertising and needs written consent.
 * The same information on a password-protected VOW is not advertising and is permitted.
 * So the wall is not a growth hack bolted on — it is the compliance boundary,
 * and it happens to be the best lead capture on the site.
 */
const SOLD = [
  { addr: "Joshua Creek, Oakville", type: "Detached", list: 2299000, sold: 2415000, dom: 8, date: "Aug 2026" },
  { addr: "Bronte, Oakville", type: "Detached", list: 3695000, sold: 3540000, dom: 47, date: "Jul 2026" },
  { addr: "Maple, Vaughan", type: "Townhouse", list: 1449000, sold: 1502000, dom: 6, date: "Aug 2026" },
  { addr: "Streetsville, Mississauga", type: "Detached", list: 2450000, sold: 2380000, dom: 31, date: "Jun 2026" },
  { addr: "Kingsway, Toronto", type: "Condominium", list: 1195000, sold: 1140000, dom: 52, date: "Jul 2026" },
  { addr: "Cooksville, Mississauga", type: "Multi-Residential", list: 2750000, sold: 2610000, dom: 88, date: "May 2026" },
];

const f = (n: number) => "$" + n.toLocaleString("en-CA");

export function DataRoom() {
  const [open, setOpen] = useState(false);
  const [bona, setBona] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="pt-[88px]">
      <section className="mx-auto max-w-[1560px] px-6 pb-16 pt-10 md:px-10 md:pb-24 md:pt-14">
        <div className="meta mb-6 text-brass">Sold Data</div>
        <h1 className="max-w-[20ch] font-display text-[clamp(2.4rem,5.6vw,4.8rem)] leading-[1] tracking-[-.015em]">
          What things actually sold for.
        </h1>
        <p className="mt-8 max-w-[60ch] text-[16px] leading-[1.8] text-ink/70">
          Sold prices, days on market and list-to-sold ratios across the Greater Toronto Area, drawn from the
          TRREB VOW feed. This is the single most useful thing on this website, and it is the one thing we cannot
          put on an open page.
        </p>
      </section>

      <section className="mx-auto max-w-[1560px] px-6 pb-24 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          {/* the data, gated */}
          <div className="relative border border-forest/14">
            <table className="w-full">
              <thead>
                <tr className="border-b border-forest/14">
                  {["Property", "Type", "List", "Sold", "DOM", "Closed"].map((h) => (
                    <th key={h} className="meta px-5 py-4 text-left text-mute">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SOLD.map((s) => (
                  <tr key={s.addr} className="border-b border-forest/12 last:border-b-0">
                    <td className="px-5 py-4 text-[14px]">{s.addr}</td>
                    <td className="meta px-5 py-4 text-mute">{s.type}</td>
                    <td className="px-5 py-4 fig text-[12px] tabular-nums text-mute">{f(s.list)}</td>
                    <td className={`px-5 py-4 fig text-[12px] tabular-nums ${open ? (s.sold >= s.list ? "text-brass" : "text-ink") : ""} ${open ? "" : "select-none blur-[6px]"}`}>
                      {open ? f(s.sold) : "$0,000,000"}
                    </td>
                    <td className={`px-5 py-4 fig text-[12px] tabular-nums ${open ? "" : "select-none blur-[6px]"}`}>{open ? s.dom : "00"}</td>
                    <td className="meta px-5 py-4 text-mute">{s.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!open && (
              <div className="absolute inset-0 flex items-center justify-center bg-paper/70 backdrop-blur-[3px]">
                <div className="w-full max-w-[420px] border border-forest/20 bg-paper p-8 shadow-2xl">
                  <div className="meta mb-4 text-brass">Registered access</div>
                  <h2 className="font-display text-[26px] leading-tight">Sold data is available to registered users.</h2>
                  <p className="mt-4 text-[13px] leading-[1.8] text-mute">
                    TRREB permits sold prices to be shown on a password-protected site to consumers with a bona fide
                    interest in buying, selling or leasing. One field and one confirmation, and it opens.
                  </p>
                  <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="mt-6 w-full border border-forest/25 bg-white px-4 py-3 text-[14px] outline-none focus:border-ink/60"
                  />
                  <label className="mt-4 flex cursor-pointer items-start gap-3 text-[12px] leading-[1.65] text-mute">
                    <input type="checkbox" checked={bona} onChange={(e) => setBona(e.target.checked)}
                      className="mt-[3px] h-3.5 w-3.5 shrink-0 accent-[#A0803F]" />
                    I confirm I have a bona fide interest in the purchase, sale or lease of real estate.
                  </label>
                  <button
                    disabled={!bona || !email.includes("@")}
                    onClick={() => setOpen(true)}
                    className="meta mt-6 w-full border border-forest/25 py-3.5 transition-colors hover:bg-forest hover:text-paper disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
                  >
                    Open the data
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* why it works this way */}
          <aside>
            <div className="meta mb-5 text-brass">Why there is a wall here</div>
            <div className="space-y-5 text-[14px] leading-[1.9] text-ink/72">
              <p>
                A sold price published on an open web page is advertising under Ontario rules, and advertising a
                sold property requires written consent from the parties. That consent is rarely in place, which is
                why most brokerage sites simply do not show sold data at all.
              </p>
              <p>
                The same information behind a registration is not advertising. It is a Virtual Office Website, and
                TRREB's VOW agreement expressly contemplates it: a bona fide interest confirmation, an audit trail,
                a cap on results per query, and the listing brokerage credited on every record.
              </p>
              <p>
                So the wall is the compliance boundary, not a marketing device. That it also produces the best
                qualified leads on the site is a happy consequence rather than the point.
              </p>
            </div>
            <div className="mt-8 border-t border-forest/14 pt-6">
              <div className="meta mb-3 text-mute">Requires</div>
              <ul className="space-y-2 text-[13px] text-ink/70">
                {["TRREB VOW data agreement", "Broker of Record signature", "Display compliance review", "Consumer audit trail"].map((r) => (
                  <li key={r} className="flex items-baseline gap-3">
                    <span className="mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full bg-brass" />{r}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {open && (
          <p className="meta mt-8 max-w-[100ch] leading-[1.8] text-mute">
            Data shown is illustrative until the TRREB VOW feed is connected. Once live, records are refreshed at
            least every 24 hours, capped at 100 results per query, and each record carries the name of the listing
            brokerage. Information is deemed reliable but not guaranteed.
          </p>
        )}
      </section>
    </div>
  );
}
