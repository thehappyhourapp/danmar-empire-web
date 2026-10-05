"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { href } from "@/lib/routes";
import { emblemCream, emblemForest } from "@/lib/marks";
import { usePresence } from "./MotionController";
import { useFocusTrap } from "./useFocusTrap";
import m from "./motion.module.css";

export const NAV = [
  { id: "management", label: "Asset Management" },
  { id: "investments", label: "Investments" },
  { id: "leasing", label: "Executive Leasing" },
  { id: "collection", label: "The Collection" },
  { id: "relocating", label: "Relocating" },
  { id: "track", label: "Track Record" },
  { id: "firm", label: "The Firm" },
];

/** The building emblem from Daniel's seal, without the ring lettering, which cannot
 *  resolve at header size. Forest on cream, cream on forest. The full seal is used
 *  only at 120px or larger (the Home hero corner, the footer). */
export function Emblem({ size = 30, className = "", light = false }: { size?: number; className?: string; light?: boolean }) {
  const w = Math.round(size * 0.804); // the emblem's own aspect, 95.965 x 119.34
  return (
    <img src={light ? emblemCream : emblemForest} alt="" aria-hidden
      width={w} height={size} className={className} style={{ width: w, height: size }} />
  );
}

/** `registered` adds the full registered name beneath. The header never shows it;
 *  the footer carries it on every page, which is where RECO identification lives. */
export function Wordmark({ light = false, className = "", stacked = false, registered = true }: { light?: boolean; className?: string; stacked?: boolean; registered?: boolean }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="leading-none">
        <div className={`font-display font-medium tracking-[.085em] ${stacked ? "text-[21px]" : "text-[16.5px]"} ${light ? "text-paper" : "text-forest"}`}>
          DANMAR EMPIRE
        </div>
        {registered && (
          <div className={`meta mt-[6px] ${light ? "text-paper/85" : "text-ink/70"}`}>
            Real Estate Corp., Brokerage
          </div>
        )}
      </div>
    </div>
  );
}

type Tone = "clear" | "forest" | "deep" | "cream";
const BG: Record<Tone, string> = { clear: "bg-transparent", forest: "bg-forest", deep: "bg-forest-deep", cream: "bg-paper" };

/**
 * The nav takes the ground of the page it is on, and changes as a cut, never a
 * fade: on a route change it switches in the same frame as the page. On Home,
 * where the page itself cuts between forest and cream, it takes the ground of
 * the chapter beneath it ([data-ground] sections), so the nav cuts exactly when
 * the boundary passes under it. It is transparent over the top of the hero.
 */
export function Nav({
  page, ground = "cream", saved, savedPulse = 0, onSaved, onEnquire, offset = 0,
}: { page: string; ground?: "forest" | "cream"; saved: number; savedPulse?: number; onSaved: () => void; onEnquire: () => void; offset?: number }) {
  const [solid, setSolid] = useState(false);
  const [under, setUnder] = useState<Tone | null>(null);
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const home = page === "home";

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      setSolid(window.scrollY > 100);
      if (!home) return;
      const y = (header.current?.getBoundingClientRect().bottom ?? 0) - 1;
      for (const el of Array.from(document.querySelectorAll<HTMLElement>("[data-ground]"))) {
        const r = el.getBoundingClientRect();
        if (r.top <= y && r.bottom > y) { setUnder(el.dataset.ground as Tone); return; }
      }
    };
    const f = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    window.addEventListener("scroll", f, { passive: true });
    window.addEventListener("resize", f, { passive: true });
    return () => { window.removeEventListener("scroll", f); window.removeEventListener("resize", f); cancelAnimationFrame(raf); };
  }, [home]);
  useEffect(() => setOpen(false), [page]);

  const tone: Tone = home ? (solid ? under ?? "forest" : "clear") : ground;
  const light = tone !== "cream";

  return (
    <>
      <header ref={header} style={{ top: offset }} className={`fixed inset-x-0 z-50 ${BG[tone]} ${light ? m.dark : ""}`}>
        <div className="mx-auto flex max-w-[1560px] items-center gap-8 px-6 py-5 md:px-10">
          <Link href="/" aria-label="Danmar Empire, home" className="flex shrink-0 items-center gap-3 text-left">
            <Emblem size={30} light={light} />
            <Wordmark light={light} registered={false} />
          </Link>

          <nav className="ml-auto hidden items-center gap-8 xl:flex">
            {NAV.map((n) => (
              <Link
                key={n.id} href={href(n.id)} aria-current={page === n.id ? "page" : undefined}
                className={`${m.navlink} ${page === n.id ? m.navOn : ""} text-[13px] tracking-[.01em] ${
                  light ? (page === n.id ? "text-paper" : "text-paper/75 hover:text-paper") : page === n.id ? "text-forest" : "text-forest/75 hover:text-forest"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-6 xl:ml-0">
            <button
              onClick={onSaved}
              className={`meta hidden items-center gap-2 sm:flex ${light ? "text-paper/85 hover:text-paper" : "text-ink/70 hover:text-forest"}`}
            >
              Saved
              {/* settles when a save is toggled (savedPulse), never when the list is restored on load */}
              <span key={savedPulse} className={`${savedPulse ? m.settle : ""} grid h-[19px] min-w-[19px] place-items-center rounded-full px-1 text-[9px] ${
                saved ? "bg-brass text-paper" : light ? "bg-paper/15 text-paper/80" : "bg-forest/10 text-forest/60"}`}>
                {saved}
              </span>
            </button>
            <button
              onClick={() => onEnquire()}
              className={`meta hidden border px-4 py-2 md:block ${
                light ? "border-paper/45 text-paper hover:bg-paper hover:text-ink"
                      : "border-forest/55 text-forest hover:bg-forest hover:text-paper"}`}
            >
              Enquire
            </button>
            <button onClick={() => setOpen(true)} className={`xl:hidden ${light ? "text-paper" : "text-forest"}`} aria-label="Menu" aria-expanded={open}>
              <svg width="24" height="14" viewBox="0 0 24 14" fill="none"><path d="M0 1h24M0 7h24M0 13h16" stroke="currentColor" strokeWidth="1.2"/></svg>
            </button>
          </div>
        </div>
      </header>

      <Menu open={open} close={() => setOpen(false)} page={page} onEnquire={onEnquire} />
    </>
  );
}

/** The mobile menu: a forest-deep sheet drawn down from the top edge over 280ms
 *  and drawn back up over 200ms (motion.module.css .menu), a cut rather than a
 *  fade. Focus lands on the close control, stays inside, and returns to the menu
 *  button; Escape closes it. */
function Menu({ open, close, page, onEnquire }: { open: boolean; close: () => void; page: string; onEnquire: () => void }) {
  const stage = usePresence(open, 200);
  const panel = useRef<HTMLDivElement>(null);
  useFocusTrap(panel, open && stage !== null, close, "[data-close]");
  if (!stage) return null;
  return (
    <div ref={panel} role="dialog" aria-modal="true" aria-label="Menu" data-state={stage}
      className={`${m.menu} ${m.dark} fixed inset-0 z-[90] overflow-y-auto bg-forest-deep text-paper`}>
      <div className="flex items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-center gap-3">
          <Emblem size={30} light />
          <Wordmark light registered={false} />
        </div>
        <button data-close onClick={close} aria-label="Close" className="text-paper">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M1 1l20 20M21 1L1 21" stroke="currentColor" strokeWidth="1.2"/></svg>
        </button>
      </div>
      <nav className="mt-10 px-6 md:px-10">
        {NAV.map((n, i) => (
          <Link key={n.id} href={href(n.id)} onClick={close} aria-current={page === n.id ? "page" : undefined}
            className="block w-full border-b border-paper/12 py-6 text-left font-display text-[34px] leading-none text-paper/90 hover:text-paper">
            <span className="meta mr-4 align-middle text-paper/60">0{i + 1}</span>
            <span className={`${m.navlink} ${page === n.id ? m.navOn : ""}`}>{n.label}</span>
          </Link>
        ))}
        <button onClick={() => { close(); onEnquire(); }}
          className="mt-10 w-full border border-paper/45 py-4 meta text-paper">Enquire</button>
      </nav>
    </div>
  );
}
