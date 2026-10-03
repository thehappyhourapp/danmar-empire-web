import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { LISTINGS, TEAM } from "@/lib/data";
import { EMPTY, money } from "@/lib/parse";
import type { Query } from "@/lib/parse";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ImageFrame } from "@/components/ImageFrame";
import { Home } from "@/pages/Home";
import { Collection } from "@/pages/Collection";
import { Property } from "@/pages/Property";
import { Investments } from "@/pages/Investments";
import { Leasing } from "@/pages/Leasing";
import { Firm } from "@/pages/Firm";
import { Journal } from "@/pages/Journal";
import { DataRoom } from "@/pages/DataRoom";
import { Management } from "@/pages/Management";
import { Relocating } from "@/pages/Relocating";
import { metaFor } from "@/lib/seo";
import { Areas } from "@/pages/Areas";
import { Track } from "@/pages/Track";
import { Person } from "@/pages/Person";
import { Splash } from "@/components/Splash";
import { TypeSwitch } from "@/components/TypeSwitch";

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
function Saved({ open, close, ids, go, toggle }: {
  open: boolean; close: () => void; ids: Set<string>; go: (id: string) => void; toggle: (id: string) => void;
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
            <button onClick={() => { close(); go(l.id); }} className="shrink-0">
              <ImageFrame src={l.photo} hue={l.hue} ratio="1/1" className="w-[80px]" alt={l.name} />
            </button>
            <div className="min-w-0 flex-1">
              <button onClick={() => { close(); go(l.id); }} className="block text-left">
                <h3 className="truncate font-display text-[18px] leading-tight">{l.name}</h3>
                <p className="meta mt-1.5 text-mute">{l.region}, {l.city}</p>
              </button>
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

/* ───────────────────────────────── App ───────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");
  const [propId, setPropId] = useState<string | null>(null);
  const [q, setQ] = useState<Query>(EMPTY);
  const [text, setText] = useState("");
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [enq, setEnq] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);
  const [notice, setNotice] = useState(true);
  const [splash, setSplash] = useState(true);
  /* Title and description track the route. In the production build these should be
     rendered server-side; here they at least keep the map honest and testable. */
  useEffect(() => {
    const m = metaFor(page);
    document.title = m.title;
    let el = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!el) { el = document.createElement("meta"); el.name = "description"; document.head.appendChild(el); }
    el.content = m.description;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = "https://danmarempire.com" + m.canonical;
  }, [page]);

  const noticeRef = useRef<HTMLDivElement>(null);
  const [noticeH, setNoticeH] = useState(0);

  useLayoutEffect(() => {
    if (!notice) { setNoticeH(0); return; }
    const el = noticeRef.current; if (!el) return;
    const measure = () => setNoticeH(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure); ro.observe(el);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [notice]);

  const go = (p: string) => { setPropId(null); setPage(p); window.scrollTo({ top: 0, behavior: "auto" }); };
  const open = (id: string) => { setPropId(id); setPage("property"); window.scrollTo({ top: 0, behavior: "auto" }); };
  const search = (nq: Query, t: string) => { setQ(nq); setText(t); setPropId(null); setPage("collection"); window.scrollTo({ top: 0 }); };
  const toggleSave = (id: string) =>
    setSaved((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const listing = useMemo(() => LISTINGS.find((l) => l.id === propId) ?? null, [propId]);
  const person = useMemo(() => TEAM.find((t) => t.slug === page) ?? null, [page]);

  return (
    <div className="min-h-screen bg-paper antialiased">
      {notice && (
        <div ref={noticeRef} className="fixed inset-x-0 top-0 z-[80] flex items-center gap-3 bg-forest-soft px-4 py-2 text-paper sm:gap-4 sm:px-5">
          <span className="meta shrink-0">Prototype</span>
          <span className="text-[11.5px] leading-[1.35] text-paper/90 sm:text-[12px]">
            Design prototype. Listings, transactions and figures are placeholder content pending the PropTx feed and your sign-off. Do not publish as-is.
          </span>
          <button onClick={() => setNotice(false)} className="meta ml-auto shrink-0 text-paper/80 hover:text-paper">Hide</button>
        </div>
      )}

      <div style={{ paddingTop: noticeH, ["--stick" as any]: `${noticeH + 74}px` }}>
        <Nav page={page} go={go} saved={saved.size} onSaved={() => setSavedOpen(true)} onEnquire={() => setEnq(true)} offset={noticeH} />

        <main>
          {page === "home" && (
            <Home go={go} open={open} search={search} saved={saved} toggleSave={toggleSave} onEnquire={() => setEnq(true)} />
          )}
          {page === "collection" && (
            <Collection q={q} setQ={setQ} text={text} setText={setText} open={open} saved={saved} toggleSave={toggleSave} />
          )}
          {page === "property" && listing && (
            <Property l={listing} open={open} back={() => go("collection")} saved={saved} toggleSave={toggleSave} onEnquire={() => setEnq(true)} />
          )}
          {page === "management" && <Management onEnquire={() => setEnq(true)} go={go} />}
          {page === "relocating" && <Relocating onEnquire={() => setEnq(true)} go={go} />}
          {page === "areas" && <Areas go={go} onEnquire={() => setEnq(true)} />}
          {page === "track" && <Track onEnquire={() => setEnq(true)} />}
          {page === "investments" && <Investments open={open} onEnquire={() => setEnq(true)} />}
          {page === "leasing" && <Leasing open={open} saved={saved} toggleSave={toggleSave} onEnquire={() => setEnq(true)} />}
          {page === "firm" && <Firm onEnquire={() => setEnq(true)} go={go} />}
          {person && (
            <Person p={person} back={() => go("firm")} go={go} onEnquire={() => setEnq(true)} />
          )}
          {page === "journal" && <Journal onEnquire={() => setEnq(true)} />}
          {page === "dataroom" && <DataRoom />}
        </main>

        <Footer go={go} onEnquire={() => setEnq(true)} />
      </div>

      {splash && <Splash onDone={() => setSplash(false)} />}
      <TypeSwitch />
      <Enquire open={enq} close={() => setEnq(false)} />
      <Saved open={savedOpen} close={() => setSavedOpen(false)} ids={saved} go={open} toggle={toggleSave} />
    </div>
  );
}
