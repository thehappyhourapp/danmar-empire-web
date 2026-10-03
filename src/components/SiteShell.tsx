"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LISTINGS } from "@/lib/data";
import { EMPTY, money } from "@/lib/parse";
import type { Query } from "@/lib/parse";
import { pageFor, propertyHref } from "@/lib/routes";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { ImageFrame } from "./ImageFrame";
import { TypeSwitch } from "./TypeSwitch";

/* Visit-level state that used to live in App.tsx. It sits in the root layout, so it
   survives client-side navigation between routes exactly as it did in the SPA. */
interface Site {
  saved: Set<string>;
  toggleSave: (id: string) => void;
  enquire: () => void;
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

/* ───────────────── Enquiry drawer: an invitation, not a lead-capture form ─────────────── */
function Enquire({ open, close }: { open: boolean; close: () => void }) {
  const [sent, setSent] = useState(false);
  useEffect(() => { if (open) setSent(false); }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      <div className="absolute inset-0 bg-forest-deep/60 backdrop-blur-sm animate-fadeIn" onClick={close} />
      <aside className="relative h-full w-full max-w-[520px] overflow-y-auto bg-paper thin animate-riseIn">
        <div className="flex items-start justify-between p-8 md:p-10">
          <div>
            <div className="meta text-brass">Enquire</div>
            <h2 className="mt-4 max-w-[16ch] font-display text-[30px] leading-[1.08] md:text-[36px]">
              Tell us what you are trying to do.
            </h2>
          </div>
          <button onClick={close} aria-label="Close" className="mt-1 text-mute hover:text-ink">
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M1 1l20 20M21 1L1 21" stroke="currentColor" strokeWidth="1.2" /></svg>
          </button>
        </div>

        {sent ? (
          <div className="px-8 pb-16 md:px-10">
            <div className="border border-forest/16 p-8">
              <div className="meta text-brass">Received</div>
              <p className="mt-4 font-display text-[24px] leading-snug">Someone from the desk will be in touch inside one business day.</p>
              <p className="mt-4 text-[14px] leading-[1.8] text-mute">
                If it is urgent, call the Oakville office on 905 901 5011.
              </p>
            </div>
          </div>
        ) : (
          <form className="px-8 pb-16 md:px-10" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <div className="meta mb-4 text-mute">I am</div>
            <div className="mb-8 grid grid-cols-2 gap-2">
              {["Buying", "Selling", "Leasing", "Investing"].map((r) => (
                <label key={r} className="cursor-pointer">
                  <input type="radio" name="role" className="peer sr-only" defaultChecked={r === "Buying"} />
                  <span className="meta block border border-forest/20 px-4 py-3 text-center text-mute transition-colors peer-checked:border-ink peer-checked:bg-forest peer-checked:text-paper">{r}</span>
                </label>
              ))}
            </div>

            {[["Name", "text", "Your name"], ["Email", "email", "you@company.com"], ["Telephone", "tel", "Optional"]].map(([l, t, p]) => (
              <div key={l} className="mb-6">
                <label className="meta mb-2 block text-mute">{l}</label>
                <input type={t} placeholder={p} required={t !== "tel"}
                  className="w-full border-0 border-b border-forest/25 bg-transparent py-3 text-[15px] outline-none transition-colors focus:border-ink" />
              </div>
            ))}

            <div className="mb-8">
              <label className="meta mb-2 block text-mute">What you are looking for</label>
              <textarea rows={4} placeholder="Budget, area, timing, and anything that actually matters to you."
                className="w-full resize-none border-0 border-b border-forest/25 bg-transparent py-3 text-[15px] outline-none transition-colors focus:border-ink" />
            </div>

            <button type="submit" className="meta w-full border border-forest/25 py-4 transition-colors hover:bg-forest hover:text-paper">Send</button>
            <p className="meta mt-5 leading-[1.8] text-mute">
              We use what you send to answer you. We do not sell or share it, and we do not add you to a list
              without asking.
            </p>
          </form>
        )}
      </aside>
    </div>
  );
}

/* ───────────────────────────── Saved drawer ───────────────────────────── */
function Saved({ open, close, ids, toggle }: {
  open: boolean; close: () => void; ids: Set<string>; toggle: (id: string) => void;
}) {
  if (!open) return null;
  const items = LISTINGS.filter((l) => ids.has(l.id));
  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      <div className="absolute inset-0 bg-forest-deep/60 backdrop-blur-sm animate-fadeIn" onClick={close} />
      <aside className="relative h-full w-full max-w-[440px] overflow-y-auto bg-paper thin animate-riseIn">
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
      </aside>
    </div>
  );
}

/* ───────────────────────────────── Shell ───────────────────────────────── */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState<Query>(EMPTY);
  const [text, setText] = useState("");
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [enq, setEnq] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);
  const [notice, setNotice] = useState(true);
  /* The notice bar sits in the flow at a fixed 36px, so its height is in the server
     HTML and nothing shifts after hydration. Hiding it is a user action. */
  const noticeH = notice ? 36 : 0;

  const toggleSave = (id: string) =>
    setSaved((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const search = (nq: Query, t: string) => { setQ(nq); setText(t); router.push("/collection"); };
  const enquire = () => setEnq(true);

  return (
    <Ctx.Provider value={{ saved, toggleSave, enquire, q, setQ, text, setText, search }}>
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
          <Nav page={pageFor(pathname)} saved={saved.size} onSaved={() => setSavedOpen(true)} onEnquire={enquire} offset={noticeH} />
          <main>{children}</main>
          <Footer onEnquire={enquire} />
        </div>

        <TypeSwitch />
        <Enquire open={enq} close={() => setEnq(false)} />
        <Saved open={savedOpen} close={() => setSavedOpen(false)} ids={saved} toggle={toggleSave} />
      </div>
    </Ctx.Provider>
  );
}

/** A button anywhere on a server-rendered page that opens the enquiry drawer. */
export function EnquireButton({ className, children }: { className?: string; children: React.ReactNode }) {
  const { enquire } = useSite();
  return <button onClick={enquire} className={className}>{children}</button>;
}
