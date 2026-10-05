"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const SAVED_KEY = "danmar:saved";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LISTINGS } from "@/lib/data";
import { EMPTY, money } from "@/lib/parse";
import type { Query } from "@/lib/parse";
import { groundFor, pageFor, propertyHref } from "@/lib/routes";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { ImageFrame } from "./ImageFrame";
import { TypeSwitch } from "./TypeSwitch";
import { ClientAccess } from "./ClientAccess";
import { usePresence } from "./MotionController";
import { useFocusTrap } from "./useFocusTrap";
import m from "./motion.module.css";
import { EnquiryForm } from "./EnquiryForm";
import type { ListingRef } from "./EnquiryForm";

/* Visit-level state that used to live in App.tsx. It sits in the root layout, so it
   survives client-side navigation between routes exactly as it did in the SPA. */
interface Site {
  saved: Set<string>;
  toggleSave: (id: string) => void;
  enquire: (listing?: ListingRef) => void;
  requestAccess: () => void;
  q: Query; setQ: (q: Query) => void;
  text: string; setText: (s: string) => void;
  search: (q: Query, t: string) => void;
}

const Ctx = createContext<Site | null>(null);
export function useSite() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useSite outside SiteShell");
  return s;
}

/* ───────────────── Drawer shell: the right edge, on the interface clock ───────────────── */
/* The backdrop fades and the panel slides in from the right edge over 280ms, and
   both leave the same way over 200ms (motion.module.css .backdrop and .drawer).
   Focus moves into the panel as it opens, stays there, and returns on close. */
function Drawer({ open, close, label, width, children }: {
  open: boolean; close: () => void; label: string; width: string; children: React.ReactNode;
}) {
  const stage = usePresence(open, 200);
  const panel = useRef<HTMLElement>(null);
  useFocusTrap(panel, open && stage !== null, close);
  if (!stage) return null;
  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      <div aria-hidden data-state={stage} className={`${m.backdrop} absolute inset-0 bg-forest-deep/60`} onClick={close} />
      <aside ref={panel} tabIndex={-1} data-state={stage} role="dialog" aria-modal="true" aria-label={label}
        className={`${m.drawer} relative h-full w-full ${width} overflow-y-auto bg-paper outline-none thin`}>
        {children}
      </aside>
    </div>
  );
}

/* ───────────────── Enquiry drawer: an invitation, not a lead-capture form ─────────────── */
export type { ListingRef };

function Enquire({ open, close, listing }: { open: boolean; close: () => void; listing: ListingRef | null }) {
  // the drawer unmounts after it closes, so every open starts the form idle
  return (
    <Drawer open={open} close={close} label="Enquire" width="max-w-[520px]">
      <div className="flex items-start justify-between p-8 md:p-10">
        <div>
          <div className="meta text-brass">Enquire</div>
          <h2 className="mt-4 max-w-[16ch] font-display text-[30px] leading-[1.08] md:text-[36px]">
            Tell us what you are trying to do.
          </h2>
          {listing && <p className="meta mt-5 text-ink/70">Regarding <span className="text-forest">{listing.name}</span></p>}
        </div>
        <button onClick={close} aria-label="Close" className="mt-1 text-mute hover:text-ink">
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M1 1l20 20M21 1L1 21" stroke="currentColor" strokeWidth="1.2" /></svg>
        </button>
      </div>

      <EnquiryForm listing={listing} className="px-8 pb-16 md:px-10" />
    </Drawer>
  );
}

/* ───────────────────────────── Saved drawer ───────────────────────────── */
function Saved({ open, close, ids, toggle }: {
  open: boolean; close: () => void; ids: Set<string>; toggle: (id: string) => void;
}) {
  const items = LISTINGS.filter((l) => ids.has(l.id));
  return (
    <Drawer open={open} close={close} label="Saved" width="max-w-[440px]">
      <div className="flex items-center justify-between border-b border-forest/14 p-7">
        <div className="meta text-brass">Saved · {items.length}</div>
        <button onClick={close} aria-label="Close" className="text-mute hover:text-ink">
          <svg width="18" height="18" viewBox="0 0 22 22" fill="none"><path d="M1 1l20 20M21 1L1 21" stroke="currentColor" strokeWidth="1.2" /></svg>
        </button>
      </div>
      {items.length === 0 ? (
        <p className="p-8 text-[14px] leading-[1.8] text-mute">
          Nothing saved yet. The bookmark on any property keeps it here for the rest of your visit.
        </p>
      ) : items.map((l) => (
        <div key={l.id} className="flex gap-4 border-b border-forest/12 p-5">
          <Link href={propertyHref(l.id)} onClick={close} className="shrink-0">
            <ImageFrame src={l.photo} hue={l.hue} ratio="1/1" className="w-[80px]" alt={l.name} />
          </Link>
          <div className="min-w-0 flex-1">
            <Link href={propertyHref(l.id)} onClick={close} className="block text-left">
              <h3 className="truncate font-display text-[18px] leading-tight">{l.name}</h3>
              <p className="meta mt-1.5 text-mute">{l.region}, {l.city}</p>
            </Link>
            <div className="mt-2 flex items-center justify-between">
              <span className="fig text-[12px] tabular-nums">{money(l.price, l.intent === "lease")}</span>
              <button onClick={() => toggle(l.id)} className="meta text-mute hover:text-ink">Remove</button>
            </div>
          </div>
        </div>
      ))}
    </Drawer>
  );
}

/* ───────────────────────────────── Shell ───────────────────────────────── */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState<Query>(EMPTY);
  const [text, setText] = useState("");
  const [saved, setSaved] = useState<Set<string>>(new Set());
  /* The shortlist persists in localStorage. It is read after mount so the server
     and first client render agree (an empty set), and nothing is written back
     until that read has happened. */
  const savedLoaded = useRef(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVED_KEY);
      if (raw) setSaved(new Set(JSON.parse(raw) as string[]));
    } catch { /* storage unavailable: the shortlist lasts the visit */ }
    savedLoaded.current = true;
  }, []);
  useEffect(() => {
    if (!savedLoaded.current) return;
    try { localStorage.setItem(SAVED_KEY, JSON.stringify([...saved])); } catch { /* ignore */ }
  }, [saved]);
  const [enq, setEnq] = useState(false);
  const [enqListing, setEnqListing] = useState<ListingRef | null>(null);
  const [access, setAccess] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);
  const [notice, setNotice] = useState(true);
  /* The notice bar sits in the flow at a fixed 36px, so its height is in the server
     HTML and nothing shifts after hydration. Hiding it is a user action. */
  const noticeH = notice ? 36 : 0;

  // counts toggles only, so the nav badge acknowledges a save and not a restore
  const [savedPulse, setSavedPulse] = useState(0);
  const toggleSave = (id: string) => {
    setSaved((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });
    setSavedPulse((p) => p + 1);
  };
  const search = (nq: Query, t: string) => { setQ(nq); setText(t); router.push("/collection"); };
  const enquire = (listing?: ListingRef) => { setEnqListing(listing ?? null); setEnq(true); };
  const requestAccess = () => setAccess(true);
  const closeAccess = useCallback(() => setAccess(false), []);

  return (
    <Ctx.Provider value={{ saved, toggleSave, enquire, requestAccess, q, setQ, text, setText, search }}>
      <div className="min-h-screen bg-paper antialiased">
        {notice && (
          <div className="sticky top-0 z-[80] flex h-9 items-center gap-3 bg-forest-soft px-4 text-paper sm:gap-4 sm:px-5">
            <span className="meta shrink-0">Prototype</span>
            <span className="min-w-0 truncate text-[11.5px] leading-none text-paper/90 sm:text-[12px]">
              <span className="sm:hidden">Placeholder content. Do not publish as-is.</span>
              <span className="hidden sm:inline">Design prototype. Listings, transactions and figures are placeholder content pending the PropTx feed and your sign-off. Do not publish as-is.</span>
            </span>
            <button onClick={() => setNotice(false)} className="meta ml-auto shrink-0 text-paper/80 hover:text-paper">Hide</button>
          </div>
        )}

        <div style={{ ["--stick" as string]: `${noticeH + 74}px` } as React.CSSProperties}>
          <Nav page={pageFor(pathname)} ground={groundFor(pathname)} saved={saved.size} savedPulse={savedPulse} onSaved={() => setSavedOpen(true)} onEnquire={enquire} offset={noticeH} />
          <main>{children}</main>
          <Footer onEnquire={() => enquire()} onAccess={requestAccess} />
        </div>

        <TypeSwitch />
        <Enquire open={enq} close={() => setEnq(false)} listing={enqListing} />
        <ClientAccess open={access} close={closeAccess} />
        <Saved open={savedOpen} close={() => setSavedOpen(false)} ids={saved} toggle={toggleSave} />
      </div>
    </Ctx.Provider>
  );
}

/** Client access is by invitation: this opens the request dialog, never a login. */
export function ClientAccessButton({ className, children }: { className?: string; children: React.ReactNode }) {
  const { requestAccess } = useSite();
  return <button type="button" onClick={requestAccess} className={className}>{children}</button>;
}

/** A button anywhere on a server-rendered page that opens the enquiry drawer. */
export function EnquireButton({ className, children }: { className?: string; children: React.ReactNode }) {
  const { enquire } = useSite();
  return <button type="button" onClick={() => enquire()} className={className}>{children}</button>;
}
