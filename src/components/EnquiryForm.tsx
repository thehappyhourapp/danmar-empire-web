"use client";

import { useState } from "react";
import { DESK_ADDRESS_CLASS, DESK_EMAIL, submitEnquiry } from "@/lib/enquire";
import type { SubmitResult } from "@/lib/enquire";

export interface ListingRef { id: string; name: string }

/* The one enquiry form. The drawer and the contact page both render it, so they
   post to /api/enquire the same way and show the same states: idle, sending,
   sent, unavailable (no key configured) and failed. */
export function EnquiryForm({ listing = null, className = "" }: { listing?: ListingRef | null; className?: string }) {
  const [state, setState] = useState<"idle" | "sending" | SubmitResult>("idle");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "sending") return;
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const note = [`I am: ${v("role")}`, v("tel") ? `Telephone: ${v("tel")}` : null, "", v("brief")].filter((l) => l !== null).join("\n");
    setState("sending");
    setState(await submitEnquiry({ kind: "enquiry", name: v("name"), email: v("email"), note, listingRef: listing ? `${listing.id} (${listing.name})` : undefined, website: v("website") }));
  };

  if (state === "sent") {
    return (
      <div className={className}>
        <div className="border border-forest/16 p-8" role="status">
          <div className="meta text-brass">Received</div>
          <p className="mt-4 font-display text-[24px] leading-snug">Someone from the desk will be in touch inside one business day.</p>
          <p className="mt-4 text-[14px] leading-[1.8] text-mute">
            If it is urgent, call the Oakville office on 905 901 5011.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className={`relative ${className}`} onSubmit={submit}>
      <div className="meta mb-4 text-mute">I am</div>
      <div className="mb-8 grid grid-cols-2 gap-2">
        {["Buying", "Selling", "Leasing", "Investing"].map((r) => (
          <label key={r} className="cursor-pointer">
            <input type="radio" name="role" value={r} className="peer sr-only" defaultChecked={r === "Buying"} />
            <span className="meta block border border-forest/20 px-4 py-3 text-center text-mute peer-checked:border-ink peer-checked:bg-forest peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-forest">{r}</span>
          </label>
        ))}
      </div>

      {[["Name", "text", "Your name", "name", "name"], ["Email", "email", "you@company.com", "email", "email"], ["Telephone", "tel", "Optional", "tel", "tel"]].map(([l, t, ph, n, ac]) => (
        <div key={l} className="mb-6">
          <label className="meta mb-2 block text-mute">{l}</label>
          <input type={t} name={n} autoComplete={ac} placeholder={ph} required={t !== "tel"} aria-label={l}
            className="w-full border-0 border-b border-forest/25 bg-transparent py-3 text-[15px] outline-none focus:border-ink" />
        </div>
      ))}

      <div className="mb-8">
        <label className="meta mb-2 block text-mute">What you are looking for</label>
        <textarea name="brief" rows={4} placeholder="Budget, area, timing, and anything that actually matters to you." aria-label="What you are looking for"
          className="w-full resize-none border-0 border-b border-forest/25 bg-transparent py-3 text-[15px] outline-none focus:border-ink" />
      </div>
      {/* honeypot: hidden from people, filled by scripts */}
      <div aria-hidden className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <button type="submit" disabled={state === "sending"} aria-busy={state === "sending"}
        className="meta w-full border border-forest/25 py-4 hover:bg-forest hover:text-paper disabled:opacity-60">
        {state === "sending" ? "Sending" : "Send"}
      </button>
      {state === "unavailable" && (
        <p role="status" className="mt-5 text-[14px] leading-[1.8] text-ink/80">
          The form is not connected yet. Email <span className={DESK_ADDRESS_CLASS}>{DESK_EMAIL}</span>.
        </p>
      )}
      {state === "failed" && (
        <p role="status" className="mt-5 text-[14px] leading-[1.8] text-ink/80">
          That did not send. Try again, or email <span className={DESK_ADDRESS_CLASS}>{DESK_EMAIL}</span>.
        </p>
      )}
      <p className="meta mt-5 leading-[1.8] text-mute">
        We use what you send to answer you. We do not sell or share it, and we do not add you to a list
        without asking.
      </p>
    </form>
  );
}
