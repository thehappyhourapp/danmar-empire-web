"use client";

import { useEffect, useId, useRef } from "react";
import { AREAS } from "@/lib/data";
import { track } from "@/lib/analytics";
import { DEFAULTS, LIMITS, PROPERTY_TYPES, estimate, money, valueBand } from "@/lib/estimator";
import { GRID } from "@/lib/layout";
import s from "@/components/motion.module.css";
import { Bars } from "./Bars";
import { useCapital } from "./store";
import type { PropertyType } from "./store";
import c from "./capital.module.css";

/* The estimator: client-side only, results update as the inputs change, nothing
   is stored or sent. Figures are indicative and before tax; the disclaimer under
   the result is always visible. */

const LOCATIONS = [...AREAS.map((a) => a.name), "Other Ontario"];
const field = "w-full border-0 border-b border-paper/45 bg-transparent py-3 text-[16px] text-paper outline-none focus:border-paper";
const digits = (v: string) => Number(v.replace(/[^\d]/g, "")) || 0;
const pct = (n: number, dp = 0) => `${(n * 100).toFixed(dp)}%`;

export function Estimator() {
  const { est, setEst, requestReview } = useCapital();
  const id = useId();
  const r = estimate(est);
  const interacted = useRef(false);
  const timer = useRef<number>(0);

  // first change, then "completed" once the inputs have rested for a moment
  useEffect(() => {
    if (!est.touched) return;
    if (!interacted.current) { interacted.current = true; track("estimator_interacted"); }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => track("estimator_completed", { band: valueBand(est.value) }), 1500);
    return () => window.clearTimeout(timer.current);
  }, [est]);

  const review = () => {
    requestReview({ type: est.type, location: est.location, band: valueBand(est.value) });
    track("capital_review_cta_click", { location: "estimator" });
    const form = document.getElementById("capital-review");
    form?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => form?.querySelector<HTMLElement>("input, select, textarea")?.focus({ preventScroll: true }), 600);
  };

  return (
    <div className={`${GRID} border-t border-paper/12 pt-10 md:pt-12`}>
      {/* ── inputs */}
      <div className="col-span-12 md:col-span-5">
        <div className="space-y-8">
          <label className="block">
            <span className="meta block text-paper/70">Property type</span>
            <select value={est.type} onChange={(e) => setEst({ type: e.target.value as PropertyType })} className={field}>
              {PROPERTY_TYPES.map((t) => <option key={t} value={t} className="text-ink">{t}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="meta block text-paper/70">Location</span>
            <select value={est.location} onChange={(e) => setEst({ location: e.target.value })} className={field}>
              {LOCATIONS.map((l) => <option key={l} value={l} className="text-ink">{l}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="meta block text-paper/70">Estimated market value</span>
            <input inputMode="numeric" value={money(est.value)} aria-describedby={`${id}-vr`}
              onChange={(e) => setEst({ value: digits(e.target.value) })}
              onBlur={() => setEst({ value: Math.min(LIMITS.value.max, Math.max(LIMITS.value.min, est.value)), mortgage: Math.min(est.mortgage, Math.min(LIMITS.value.max, Math.max(LIMITS.value.min, est.value))) })}
              className={`${field} fig tabular-nums`} />
            <span id={`${id}-vr`} className="meta mt-2 block text-paper/60">{money(LIMITS.value.min)} to {money(LIMITS.value.max)}</span>
          </label>
          <label className="block">
            <span className="meta block text-paper/70">Existing mortgage balance</span>
            <input inputMode="numeric" value={money(est.mortgage)} aria-describedby={`${id}-mr`}
              onChange={(e) => setEst({ mortgage: digits(e.target.value) })}
              onBlur={() => setEst({ mortgage: Math.min(est.value, Math.max(0, est.mortgage)) })}
              className={`${field} fig tabular-nums`} />
            <span id={`${id}-mr`} className="meta mt-2 block text-paper/60">$0 to the value</span>
          </label>

          <details className="group border-t border-paper/12 pt-6">
            <summary className={`${s.tlink} meta inline-block cursor-pointer list-none text-paper/80 [&::-webkit-details-marker]:hidden`}>
              <span className="group-open:hidden">Adjust assumptions</span><span className="hidden group-open:inline">Assumptions</span>
            </summary>
            <div className="mt-8 space-y-8">
              {([
                ["Refinance loan-to-value", "ltv", pct(est.ltv), LIMITS.ltv],
                ["Sale transaction costs", "costs", pct(est.costs, 1), LIMITS.costs],
                ["Cap rate", "cap", pct(est.cap, 2).replace(/0%$/, "%").replace(/\.0%$/, "%"), LIMITS.cap],
              ] as const).map(([label, key, shown, lim]) => (
                <label key={key} className="block">
                  <span className="flex items-baseline justify-between">
                    <span className="meta text-paper/70">{label}</span>
                    <span className="fig text-[16px] text-brass-light tabular-nums">{shown}</span>
                  </span>
                  <input type="range" min={lim.min} max={lim.max} step={lim.step} value={est[key]} onChange={(e) => setEst({ [key]: Number(e.target.value) })} className={`${c.range} mt-3`} />
                  <span className="meta flex justify-between text-paper/60"><span>{pct(lim.min, key === "costs" ? 0 : 0)}</span><span>{pct(lim.max, 0)}</span></span>
                </label>
              ))}
              <button type="button" onClick={() => setEst({ ltv: DEFAULTS.ltv, costs: DEFAULTS.costs, cap: DEFAULTS.cap })} className={`${s.tlink} meta text-paper/70`}>Reset assumptions</button>
            </div>
          </details>
        </div>
      </div>

      {/* ── result */}
      <div className="col-span-12 mt-12 md:col-span-6 md:col-start-7 md:mt-0" aria-live="polite">
        <Bars ariaLabel="Indicative capital released" rows={[
          { label: "Sale-leaseback", value: r.saleLeaseback, note: r.saleNote },
          { label: "Refinance", value: r.refinance, note: r.refinanceNote },
        ]} />
        <p className="mt-10 text-[16px] leading-[1.7] text-paper/90">
          Indicative rent: <span className="fig text-brass-light tabular-nums">{money(r.rentYear)}</span> a year (<span className="fig text-brass-light tabular-nums">{money(r.rentMonth)}</span> a month), net.
        </p>
        <button type="button" onClick={review} className={`${s.tlink} mt-8 font-display text-[1.35rem] font-medium leading-tight text-paper`}>Get a property-specific review</button>
        <p className="meta mt-10 max-w-[60ch] leading-[1.9] text-paper/70">
          Indicative only. Actual value, rent and terms depend on the property, the lease and the market. Before tax. Not financial, tax or legal advice. Refinancing figures are for comparison only; Danmar does not arrange mortgages.
        </p>
      </div>
    </div>
  );
}
