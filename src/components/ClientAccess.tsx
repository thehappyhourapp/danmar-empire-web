"use client";

import { useEffect, useId, useRef, useState } from "react";
import { DESK_ADDRESS_CLASS, DESK_EMAIL, submitEnquiry } from "@/lib/enquire";
import type { SubmitResult } from "@/lib/enquire";
import { usePresence } from "./MotionController";
import { useFocusTrap } from "./useFocusTrap";
import m from "./motion.module.css";

/**
 * Client access is by invitation. The control never links to a login of any
 * kind; it opens this request, which posts to /api/enquire. A small dialog:
 * Escape and a click outside close it, focus stays inside while it is open and
 * returns to the trigger after. It rises 8px into place over 200ms and leaves
 * over 180ms on the interface curve (motion.module.css .dialog); under reduced
 * motion it appears and disappears at once.
 */
export function ClientAccess({ open, close }: { open: boolean; close: () => void }) {
  const [state, setState] = useState<"idle" | "sending" | SubmitResult>("idle");
  const panel = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const stage = usePresence(open, 180);
  const active = open && stage !== null;
  // land on the first field; the close button is reachable by Shift+Tab or Escape
  useFocusTrap(panel, active, close, "input:not([tabindex='-1'])");
  useEffect(() => { if (open) setState("idle"); }, [open]);

  if (!stage) return null;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "sending") return;
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "");
    setState("sending");
    setState(await submitEnquiry({ kind: "client-access", name: v("name"), email: v("email"), firm: v("firm"), note: v("note"), website: v("website") }));
  };

  const field = "w-full border-0 border-b border-forest/55 bg-transparent py-2 text-[15px] outline-none focus:border-ink";

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center p-4" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div aria-hidden data-state={stage} className={`${m.backdrop} pointer-events-none absolute inset-0 bg-forest-deep/60`} />
      <div ref={panel} role="dialog" aria-modal="true" aria-labelledby={titleId} data-state={stage}
        className={`${m.dialog} relative w-full max-w-[440px] bg-paper p-8 text-ink md:p-10`}>
        <div className="flex items-start justify-between gap-6">
          <h2 id={titleId} className="font-display text-[28px] font-medium leading-[1.05]">Client access</h2>
          <button type="button" onClick={close} aria-label="Close" className="mt-2 text-ink/70 hover:text-ink">
            <svg width="16" height="16" viewBox="0 0 22 22" fill="none" aria-hidden><path d="M1 1l20 20M21 1L1 21" stroke="currentColor" strokeWidth="1.4" /></svg>
          </button>
        </div>
        <p className="mt-4 text-[15px] leading-[1.7] text-ink/80">
          Client access is issued by invitation. Request access and we will reply from a danmarempire.com address.
        </p>

        {state === "sent" ? (
          <p role="status" className="mt-8 border-t border-forest/14 pt-6 text-[14px] leading-[1.75] text-ink/80">
            Received. We will reply from a danmarempire.com address, usually inside one business day.
          </p>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-6">
            <label className="block"><span className="meta block text-ink/70">Name</span><input name="name" required autoComplete="name" className={field} /></label>
            <label className="block"><span className="meta block text-ink/70">Email</span><input name="email" type="email" required autoComplete="email" className={field} /></label>
            <label className="block"><span className="meta block text-ink/70">Firm <span className="normal-case tracking-normal">(optional)</span></span><input name="firm" autoComplete="organization" className={field} /></label>
            <label className="block"><span className="meta block text-ink/70">Note</span><input name="note" maxLength={160} placeholder="Which mandate or property this relates to" className={field} /></label>
            {/* honeypot: hidden from people, filled by scripts */}
            <div aria-hidden className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
              <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
            <button type="submit" disabled={state === "sending"} aria-busy={state === "sending"}
              className="meta mt-2 w-full border border-forest/55 py-4 text-forest hover:border-forest active:translate-y-px disabled:opacity-60">
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
