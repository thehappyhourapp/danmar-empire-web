"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { href } from "@/lib/routes";
import { sealCream, sealForest } from "@/lib/marks";

export const NAV = [
  { id: "management", label: "Asset Management" },
  { id: "investments", label: "Investments" },
  { id: "leasing", label: "Executive Leasing" },
  { id: "collection", label: "The Collection" },
  { id: "relocating", label: "Relocating" },
  { id: "track", label: "Track Record" },
  { id: "firm", label: "The Firm" },
];

/** Daniel's seal, drawn in Canva and exported as outlined SVG. Two colourways so
 *  it never sits on a background rectangle of its own: forest on light, cream on dark. */
export function Seal({ size = 34, className = "", light = false }: { size?: number; className?: string; light?: boolean }) {
  return (
    <img src={light ? sealCream : sealForest} alt="" aria-hidden
      width={size} height={size} className={className} style={{ width: size, height: size, objectFit: "contain" }} />
  );
}
export const Monogram = Seal;

/** `registered` adds the full registered name beneath. The header never shows it;
 *  the footer carries it on every page, which is where RECO identification lives. */
export function Wordmark({ light = false, className = "", stacked = false, registered = true }: { light?: boolean; className?: string; stacked?: boolean; registered?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="leading-none">
        <div className={`font-display font-medium tracking-[.085em] ${stacked ? "text-[21px]" : "text-[16.5px]"} ${light ? "text-paper" : "text-forest"}`}>
          DANMAR EMPIRE
        </div>
        {registered && (
          <div className={`meta mt-[6px] ${light ? "text-paper/85" : "text-mute"}`}>
            Real Estate Corp., Brokerage
          </div>
        )}
      </div>
    </div>
  );
}

export function Nav({
  page, saved, onSaved, onEnquire, offset = 0,
}: { page: string; saved: number; onSaved: () => void; onEnquire: () => void; offset?: number }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const overHero = page === "home" && !solid;

  useEffect(() => {
    const f = () => setSolid(window.scrollY > 100);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => setOpen(false), [page]);

  const light = overHero;

  return (
    <>
      <header
        style={{ top: offset }}
        className={`fixed inset-x-0 z-50 transition-all duration-500 ${
          overHero ? "bg-transparent" : "bg-paper/94 backdrop-blur-md border-b border-forest/12"
        }`}
      >
        <div className="mx-auto flex max-w-[1560px] items-center gap-8 px-6 py-5 md:px-10">
          <Link href="/" aria-label="Danmar Empire, home" className="flex shrink-0 items-center gap-3 text-left">
            <Seal size={38} light={light} />
            <Wordmark light={light} registered={false} />
          </Link>

          <nav className="ml-auto hidden items-center gap-7 xl:flex">
            {NAV.map((n) => (
              <Link
                key={n.id} href={href(n.id)}
                className={`link-u text-[13px] tracking-[.01em] transition-colors ${
                  light ? "text-paper/80 hover:text-paper" : page === n.id ? "text-forest" : "text-forest/60 hover:text-forest"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-5 xl:ml-0">
            <button
              onClick={onSaved}
              className={`meta hidden items-center gap-2 sm:flex ${light ? "text-paper/85 hover:text-paper" : "text-mute hover:text-forest"}`}
            >
              Saved
              <span className={`grid h-[19px] min-w-[19px] place-items-center rounded-full px-1 text-[9px] ${
                saved ? "bg-brass text-paper" : light ? "bg-paper/15 text-paper/80" : "bg-forest/10 text-forest/60"}`}>
                {saved}
              </span>
            </button>
            <button
              onClick={onEnquire}
              className={`meta hidden border px-4 py-2 transition-colors md:block ${
                light ? "border-paper/35 text-paper hover:bg-paper hover:text-ink"
                      : "border-forest/25 text-forest hover:bg-forest hover:text-paper"}`}
            >
              Enquire
            </button>
            <button onClick={() => setOpen(true)} className={`xl:hidden ${light ? "text-paper" : "text-forest"}`} aria-label="Menu">
              <svg width="24" height="14" viewBox="0 0 24 14" fill="none"><path d="M0 1h24M0 7h24M0 13h16" stroke="currentColor" strokeWidth="1.2"/></svg>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[90] bg-forest-deep text-paper animate-fadeIn">
          <div className="flex items-center justify-between px-6 py-5 md:px-10">
            <div className="flex items-center gap-3">
              <Seal size={38} light />
              <Wordmark light registered={false} />
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="text-paper">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M1 1l20 20M21 1L1 21" stroke="currentColor" strokeWidth="1.2"/></svg>
            </button>
          </div>
          <nav className="mt-10 px-6 md:px-10">
            {NAV.map((n, i) => (
              <Link key={n.id} href={href(n.id)} onClick={() => setOpen(false)}
                className="block w-full border-b border-paper/12 py-6 text-left font-display text-[34px] leading-none text-paper/90 hover:text-paper">
                <span className="meta mr-4 align-middle text-paper/60">0{i + 1}</span>{n.label}
              </Link>
            ))}
            <button onClick={() => { setOpen(false); onEnquire(); }}
              className="mt-10 w-full border border-paper/35 py-4 meta text-paper">Enquire</button>
          </nav>
        </div>
      )}
    </>
  );
}
