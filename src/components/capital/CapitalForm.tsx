"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AREAS } from "@/lib/data";
import { track } from "@/lib/analytics";
import { DESK_ADDRESS_CLASS, DESK_EMAIL, submitEnquiry } from "@/lib/enquire";
import type { SubmitResult } from "@/lib/enquire";
import { DRIVERS, OWNERS, PROPERTY_TYPES, TIMING, VALUE_BANDS } from "@/lib/estimator";
import { href } from "@/lib/routes";
import { GRID } from "@/components/Chapter";
import s from "@/components/motion.module.css";
import { useCapital } from "./CapitalContext";
import type { PropertyType } from "./CapitalContext";

/* The capital review form. Posts to /api/enquire as kind "capital-review" with
   the visitor's answers, the UTM parameters and the estimator's inputs as
   labelled fields. Field-level errors; the same inline states as the other
   forms; consent unticked by default. */

const UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
const CITIES = [...AREAS.map((a) => a.name), "Other Ontario"];
const field = "w-full border-0 border-b border-paper/45 bg-transparent py-3 text-[16px] text-paper outline-none focus:border-paper aria-[invalid=true]:border-brass-light";
const BROKERAGE = "Danmar Empire Real Estate Corp., Brokerage";

type Errors = Partial<Record<string, string>>;

function readUtm(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    const q = new URLSearchParams(window.location.search);
    for (const k of UTM) { const v = q.get(k); if (v) out[k] = v.slice(0, 120); }
    if (Object.keys(out).length) sessionStorage.setItem("danmar:utm", JSON.stringify(out));
    else { const saved = sessionStorage.getItem("danmar:utm"); if (saved) return JSON.parse(saved) as Record<string, string>; }
  } catch { /* storage unavailable: attribution is best effort */ }
  return out;
}

export function CapitalForm() {
  const { est, prefill } = useCapital();
  const id = useId();
  const [state, setState] = useState<"idle" | "sending" | SubmitResult>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [type, setType] = useState<PropertyType | "">("");
  const [city, setCity] = useState("");
  const [band, setBand] = useState("");
  const [utm, setUtm] = useState<Record<string, string>>({});
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => { setUtm(readUtm()); }, []);
  useEffect(() => { if (prefill) { setType(prefill.type); setCity(prefill.location); setBand(prefill.band); } }, [prefill]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "sending") return;
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const drivers = f.getAll("drivers").map(String);
    const errs: Errors = {};
    if (v("name").length < 2) errs.name = "Please give your full name.";
    if (!v("title")) errs.title = "Please give your title.";
    if (!v("company")) errs.company = "Please give the company.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v("email"))) errs.email = "Please give a work email address we can reply to.";
    if (!city) errs.city = "Please choose the property's city.";
    if (!type) errs.type = "Please choose the property type.";
    if (drivers.length === 0) errs.drivers = "Please choose at least one.";
    if (!f.get("consent")) errs.consent = "Please confirm we may contact you about this enquiry.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const fields: [string, string][] = [
      ["Title", v("title")],
      ["Company", v("company")],
      ["Phone", v("phone")],
      ["Property city", city],
      ["Property type", type],
      ["Approximate size (sq ft)", v("size")],
      ["Approximate value", band],
      ["Who owns the property", v("owner")],
      ["What is driving this", drivers.join(", ")],
      ["Timing", v("timing")],
      ["Consent to be contacted", "Yes"],
      ...UTM.map((k) => [k, utm[k] ?? ""] as [string, string]),
      ["Estimator used", est.touched ? "Yes" : "No"],
      ["Estimator property type", est.type],
      ["Estimator location", est.location],
      ["Estimator value", String(est.value)],
      ["Estimator mortgage", String(est.mortgage)],
      ["Estimator LTV", String(est.ltv)],
      ["Estimator costs", String(est.costs)],
      ["Estimator cap rate", String(est.cap)],
    ].filter(([, val]) => val !== "") as [string, string][];

    setState("sending");
    const result = await submitEnquiry({ kind: "capital-review", name: v("name"), email: v("email"), firm: v("company"), note: v("notes"), fields, website: v("website") });
    setState(result);
    if (result === "sent") track("capital_form_submitted", { utm_source: utm.utm_source, band });
  };

  const err = (k: string) => errors[k] ? <p id={`${id}-${k}-err`} role="alert" className="mt-2 text-[14px] leading-[1.6] text-brass-light">{errors[k]}</p> : null;
  const a11y = (k: string) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${id}-${k}-err` : undefined });

  if (state === "sent") {
    return (
      <div role="status" className="border-y border-paper/12 py-10">
        <p className="meta text-brass-light">Received</p>
        <p className="mt-4 max-w-[30ch] font-display text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-[1.2] text-paper">Thank you. Daniel will reply to arrange a confidential call.</p>
      </div>
    );
  }

  return (
    <form ref={form} onSubmit={submit} noValidate className={`relative ${GRID} gap-y-8 border-t border-paper/12 pt-10 md:pt-12`}>
      {([["name", "Full name", "text", "name"], ["title", "Title", "text", "organization-title"], ["company", "Company", "text", "organization"], ["email", "Work email", "email", "email"], ["phone", "Phone", "tel", "tel"]] as const).map(([k, label, t, ac]) => (
        <div key={k} className="col-span-12 md:col-span-6">
          <label htmlFor={`${id}-${k}`} className="meta block text-paper/70">{label}{k !== "phone" && <span aria-hidden> *</span>}</label>
          <input id={`${id}-${k}`} name={k} type={t} autoComplete={ac} required={k !== "phone"} aria-required={k !== "phone"} className={field} {...a11y(k)} />
          {err(k)}
        </div>
      ))}

      <div className="col-span-12 md:col-span-6">
        <label htmlFor={`${id}-city`} className="meta block text-paper/70">Property city <span aria-hidden>*</span></label>
        <select id={`${id}-city`} name="city" value={city} onChange={(e) => setCity(e.target.value)} required aria-required className={field} {...a11y("city")}>
          <option value="" className="text-ink">Choose</option>
          {CITIES.map((x) => <option key={x} value={x} className="text-ink">{x}</option>)}
        </select>
        {err("city")}
      </div>
      <div className="col-span-12 md:col-span-6">
        <label htmlFor={`${id}-type`} className="meta block text-paper/70">Property type <span aria-hidden>*</span></label>
        <select id={`${id}-type`} name="type" value={type} onChange={(e) => setType(e.target.value as PropertyType)} required aria-required className={field} {...a11y("type")}>
          <option value="" className="text-ink">Choose</option>
          {PROPERTY_TYPES.map((x) => <option key={x} value={x} className="text-ink">{x}</option>)}
        </select>
        {err("type")}
      </div>
      <div className="col-span-12 md:col-span-6">
        <label htmlFor={`${id}-size`} className="meta block text-paper/70">Approximate size (sq ft)</label>
        <input id={`${id}-size`} name="size" inputMode="numeric" className={field} />
      </div>
      <div className="col-span-12 md:col-span-6">
        <label htmlFor={`${id}-band`} className="meta block text-paper/70">Approximate value</label>
        <select id={`${id}-band`} name="band" value={band} onChange={(e) => setBand(e.target.value)} className={field}>
          <option value="" className="text-ink">Choose</option>
          {VALUE_BANDS.map((x) => <option key={x} value={x} className="text-ink">{x}</option>)}
        </select>
      </div>
      <div className="col-span-12 md:col-span-6">
        <label htmlFor={`${id}-owner`} className="meta block text-paper/70">Who owns the property</label>
        <select id={`${id}-owner`} name="owner" defaultValue="" className={field}>
          <option value="" className="text-ink">Choose</option>
          {OWNERS.map((x) => <option key={x} value={x} className="text-ink">{x}</option>)}
        </select>
      </div>
      <div className="col-span-12 md:col-span-6">
        <label htmlFor={`${id}-timing`} className="meta block text-paper/70">Timing</label>
        <select id={`${id}-timing`} name="timing" defaultValue="" className={field}>
          <option value="" className="text-ink">Choose</option>
          {TIMING.map((x) => <option key={x} value={x} className="text-ink">{x}</option>)}
        </select>
      </div>

      <fieldset className="col-span-12" aria-describedby={errors.drivers ? `${id}-drivers-err` : undefined}>
        <legend className="meta text-paper/70">What is driving this? <span aria-hidden>*</span></legend>
        <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
          {DRIVERS.map((d) => (
            <label key={d} className="flex items-start gap-3 text-[15px] leading-[1.6] text-paper/90">
              <input type="checkbox" name="drivers" value={d} className="mt-1.5 h-4 w-4 shrink-0 accent-paper" />
              {d}
            </label>
          ))}
        </div>
        {err("drivers")}
      </fieldset>

      <div className="col-span-12">
        <label htmlFor={`${id}-notes`} className="meta block text-paper/70">Anything else we should know</label>
        <textarea id={`${id}-notes`} name="notes" rows={3} className={`${field} resize-none`} />
      </div>

      <div className="col-span-12">
        <label className="flex items-start gap-3 text-[15px] leading-[1.6] text-paper/90">
          <input type="checkbox" name="consent" value="yes" className="mt-1.5 h-4 w-4 shrink-0 accent-paper" aria-required {...a11y("consent")} />
          <span>I agree to be contacted by {BROKERAGE} about this enquiry. <Link href={href("privacy")} className={`${s.tlink} text-paper`}>How we handle what you send</Link>.</span>
        </label>
        {err("consent")}
      </div>

      {/* hidden: attribution and the estimator's inputs travel as labelled fields on submit */}
      <div aria-hidden className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="col-span-12 md:col-span-6">
        <button type="submit" disabled={state === "sending"} aria-busy={state === "sending"} className="meta w-full border border-paper/45 py-4 text-paper hover:bg-paper hover:text-forest disabled:opacity-60">
          {state === "sending" ? "Sending" : "Request the review"}
        </button>
        {state === "unavailable" && (
          <p role="status" className="mt-6 text-[14px] leading-[1.8] text-paper/80">The form is not connected yet. Email <span className={`${DESK_ADDRESS_CLASS} text-paper`}>{DESK_EMAIL}</span>.</p>
        )}
        {state === "failed" && (
          <p role="status" className="mt-6 text-[14px] leading-[1.8] text-paper/80">That did not send. Try again, or email <span className={`${DESK_ADDRESS_CLASS} text-paper`}>{DESK_EMAIL}</span>.</p>
        )}
        <p className="meta mt-6 max-w-[60ch] leading-[1.8] text-paper/70">We use what you send to reply. We do not sell or share it, and you can withdraw consent at any time.</p>
      </div>
    </form>
  );
}
