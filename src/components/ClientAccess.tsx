"use client";

import { useEffect, useId, useRef, useState } from "react";
import { DESK_EMAIL, sendByMail } from "@/lib/mailto";

/**
 * Client access is by invitation. The control never links to a login of any
 * kind; it opens this request. A small dialog: Escape and a click outside close
 * it, focus stays inside while it is open and returns to the trigger after.
 * Entrance is 200ms on the interface curve; reduced motion fades only.
 */
export function ClientAccess({ open, close }: { open: boolean; close: () => void }) {
  const [sent, setSent] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    setSent(false);
    returnTo.current = document.activeElement as HTMLElement | null;
    // land on the first field; the close button is reachable by Shift+Tab or Escape
    const first = panel.current?.querySelector<HTMLElement>("input") ?? panel.current?.querySelector<HTMLElement>("button");
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key !== "Tab" || !panel.current) return;
      const items = [...panel.current.querySelectorAll<HTMLElement>("input, button, textarea, a[href]")].filter((el) => !el.hasAttribute("disabled"));
      if (!items.length) return;
      const firstEl = items[0], lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); returnTo.current?.focus(); };
  }, [open, close]);

  if (!open) return null;

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "");
    sendByMail("Client access request", [["Name", v("name")], ["Email", v("email")], ["Firm", v("firm")], ["Note", v("note")]]);
    setSent(true);
  };

  const field = "w-full border-0 border-b border-forest/25 bg-transparent py-2.5 text-[15px] outline-none transition-colors duration-200 focus:border-ink";

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center p-4" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-forest-deep/60 motion-safe:animate-[dlgFade_200ms_cubic-bezier(.25,1,.5,1)_both]" />
      <div ref={panel} role="dialog" aria-modal="true" aria-labelledby={titleId}
        className="relative w-full max-w-[440px] bg-paper p-7 text-ink motion-safe:animate-[dlgRise_200ms_cubic-bezier(.25,1,.5,1)_both] motion-reduce:animate-[dlgFade_200ms_ease_both] md:p-9">
        <div className="flex items-start justify-between gap-6">
          <h2 id={titleId} className="font-display text-[28px] font-medium leading-[1.05]">Client access</h2>
          <button type="button" onClick={close} aria-label="Close" className="mt-1 text-ink/70 transition-colors duration-200 hover:text-ink">
            <svg width="16" height="16" viewBox="0 0 22 22" fill="none" aria-hidden><path d="M1 1l20 20M21 1L1 21" stroke="currentColor" strokeWidth="1.4" /></svg>
          </button>
        </div>
        <p className="mt-4 text-[15px] leading-[1.7] text-ink/80">
          Client access is issued by invitation. Request access and we will reply from a danmarempire.com address.
        </p>

        {sent ? (
          <p className="mt-7 border-t border-forest/14 pt-5 text-[14px] leading-[1.75] text-ink/80">
            Your email app should have opened with the request. If it did not, write to{" "}
            <a href={`mailto:${DESK_EMAIL}`} className="underline decoration-forest/35 underline-offset-4 hover:decoration-forest">{DESK_EMAIL}</a>.
          </p>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-5">
            <label className="block"><span className="meta block text-ink/70">Name</span><input name="name" required autoComplete="name" className={field} /></label>
            <label className="block"><span className="meta block text-ink/70">Email</span><input name="email" type="email" required autoComplete="email" className={field} /></label>
            <label className="block"><span className="meta block text-ink/70">Firm <span className="normal-case tracking-normal">(optional)</span></span><input name="firm" autoComplete="organization" className={field} /></label>
            <label className="block"><span className="meta block text-ink/70">Note</span><input name="note" maxLength={160} placeholder="Which mandate or property this relates to" className={field} /></label>
            <button type="submit" className="meta mt-2 w-full border border-forest/25 py-3.5 text-forest transition-colors duration-200 hover:border-forest active:translate-y-px">Request access</button>
          </form>
        )}
      </div>
    </div>
  );
}
