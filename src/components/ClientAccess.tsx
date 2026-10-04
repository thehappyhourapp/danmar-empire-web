"use client";

import { useEffect, useId, useRef, useState } from "react";
import { DESK_ADDRESS_CLASS, DESK_EMAIL, submitEnquiry } from "@/lib/enquire";
import type { SubmitResult } from "@/lib/enquire";

/**
 * Client access is by invitation. The control never links to a login of any
 * kind; it opens this request, which posts to /api/enquire. A small dialog:
 * Escape and a click outside close it, focus stays inside while it is open and
 * returns to the trigger after. Entrance is 200ms on the interface curve;
 * reduced motion fades only.
 */
export function ClientAccess({ open, close }: { open: boolean; close: () => void }) {
  const [state, setState] = useState<"idle" | "sending" | SubmitResult>("idle");
  const panel = useRef<HTMLDivElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    setState("idle");
    returnTo.current = document.activeElement as HTMLElement | null;
    // land on the first field; the close button is reachable by Shift+Tab or Escape
    const first = panel.current?.querySelector<HTMLElement>("input:not([tabindex='-1'])") ?? panel.current?.querySelector<HTMLElement>("button");
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key !== "Tab" || !panel.current) return;
      const items = [...panel.current.querySelectorAll<HTMLElement>("input, button, textarea, a[href]")].filter((el) => !el.hasAttribute("disabled") && el.tabIndex >= 0);
      if (!items.length) return;
      const firstEl = items[0], lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); returnTo.current?.focus(); };
  }, [open, close]);

  if (!open) return null;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "sending") return;
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "");
    setState("sending");
    setState(await submitEnquiry({ kind: "client-access", name: v("name"), email: v("email"), firm: v("firm"), note: v("note"), website: v("website") }));
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

        {state === "sent" ? (
          <p role="status" className="mt-7 border-t border-forest/14 pt-5 text-[14px] leading-[1.75] text-ink/80">
            Received. We will reply from a danmarempire.com address, usually inside one business day.
          </p>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-5">
            <label className="block"><span className="meta block text-ink/70">Name</span><input name="name" required autoComplete="name" className={field} /></label>
            <label className="block"><span className="meta block text-ink/70">Email</span><input name="email" type="email" required autoComplete="email" className={field} /></label>
            <label className="block"><span className="meta block text-ink/70">Firm <span className="normal-case tracking-normal">(optional)</span></span><input name="firm" autoComplete="organization" className={field} /></label>
            <label className="block"><span className="meta block text-ink/70">Note</span><input name="note" maxLength={160} placeholder="Which mandate or property this relates to" className={field} /></label>
            {/* honeypot: hidden from people, filled by scripts */}
            <div aria-hidden className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
              <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
            <button type="submit" disabled={state === "sending"} aria-busy={state === "sending"}
              className="meta mt-2 w-full border border-forest/25 py-3.5 text-forest transition-colors duration-200 hover:border-forest active:translate-y-px disabled:opacity-60">
              {state === "sending" ? "Sending" : "Request access"}
            </button>
            {state === "unavailable" && (
              <p role="status" className="text-[14px] leading-[1.7] text-ink/80">
                The form is not connected yet. Email <span className={DESK_ADDRESS_CLASS}>{DESK_EMAIL}</span>.
              </p>
            )}
            {state === "failed" && (
              <p role="status" className="text-[14px] leading-[1.7] text-ink/80">
                That did not send. Try again, or email <span className={DESK_ADDRESS_CLASS}>{DESK_EMAIL}</span>.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
