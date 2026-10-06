/* The capital unlock estimator: pure arithmetic, no React, so it can be unit
   tested with node --test. V is the property's market value and M the existing
   mortgage balance.

     sale-leaseback capital = V × (1 − costs) − M
     refinance capital      = max(0, V × LTV − M)
     indicative net rent    = V × cap rate, a year; ÷ 12 a month

   Capital figures round to the nearest $10,000. The annual rent rounds to the
   nearest $10,000 and the monthly rent to the nearest $1,000, so the two agree
   (a monthly figure rounded to $10,000 would misstate the year). Every figure
   is indicative and before tax. */

export interface EstimatorInputs {
  /** market value, dollars */
  value: number;
  /** existing mortgage balance, dollars */
  mortgage: number;
  /** refinance loan-to-value, 0 to 1 */
  ltv: number;
  /** sale transaction costs, 0 to 1 */
  costs: number;
  /** capitalisation rate, 0 to 1 */
  cap: number;
}

export interface EstimatorResult {
  saleLeaseback: number;
  refinance: number;
  rentYear: number;
  rentMonth: number;
  /** shown when the sale would not clear the mortgage */
  saleNote?: string;
  /** shown when a refinance at this loan-to-value releases nothing */
  refinanceNote?: string;
}

export const DEFAULTS: EstimatorInputs = { value: 10_000_000, mortgage: 3_000_000, ltv: 0.65, costs: 0.03, cap: 0.065 };

export const LIMITS = {
  value: { min: 1_000_000, max: 100_000_000, step: 100_000 },
  ltv: { min: 0.5, max: 0.75, step: 0.01 },
  costs: { min: 0.01, max: 0.05, step: 0.005 },
  cap: { min: 0.05, max: 0.08, step: 0.0025 },
} as const;

export const SALE_NOTE = "Sale proceeds would not cover the existing mortgage.";
export const REFINANCE_NOTE = "No new capital at this loan-to-value.";

export const roundTo = (n: number, step: number) => Math.round(n / step) * step;

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/** Inputs held inside their limits; the mortgage never exceeds the value. */
export function clampInputs(i: EstimatorInputs): EstimatorInputs {
  const value = clamp(Number.isFinite(i.value) ? i.value : DEFAULTS.value, LIMITS.value.min, LIMITS.value.max);
  const mortgage = clamp(Number.isFinite(i.mortgage) ? i.mortgage : 0, 0, value);
  return {
    value,
    mortgage,
    ltv: clamp(i.ltv, LIMITS.ltv.min, LIMITS.ltv.max),
    costs: clamp(i.costs, LIMITS.costs.min, LIMITS.costs.max),
    cap: clamp(i.cap, LIMITS.cap.min, LIMITS.cap.max),
  };
}

export function estimate(raw: EstimatorInputs): EstimatorResult {
  const { value: V, mortgage: M, ltv, costs, cap } = clampInputs(raw);
  const saleRaw = V * (1 - costs) - M;
  const refiRaw = V * ltv - M;
  const saleLeaseback = saleRaw > 0 ? roundTo(saleRaw, 10_000) : 0;
  const refinance = refiRaw > 0 ? roundTo(refiRaw, 10_000) : 0;
  const rent = V * cap;
  return {
    saleLeaseback,
    refinance,
    rentYear: roundTo(rent, 10_000),
    rentMonth: roundTo(rent / 12, 1_000),
    ...(saleRaw <= 0 ? { saleNote: SALE_NOTE } : {}),
    ...(refiRaw <= 0 ? { refinanceNote: REFINANCE_NOTE } : {}),
  };
}

/** Whole dollars in Canadian English: $8,640,000. */
export const money = (n: number) => "$" + Math.round(n).toLocaleString("en-CA", { maximumFractionDigits: 0 });

/** The form's value bands; the estimator passes one across when it pre-fills. */
export const VALUE_BANDS = ["Under $2M", "$2M to $5M", "$5M to $10M", "$10M to $25M", "$25M to $50M", "Over $50M"] as const;
export type ValueBand = (typeof VALUE_BANDS)[number];

export function valueBand(v: number): ValueBand {
  if (v < 2_000_000) return "Under $2M";
  if (v < 5_000_000) return "$2M to $5M";
  if (v < 10_000_000) return "$5M to $10M";
  if (v < 25_000_000) return "$10M to $25M";
  if (v < 50_000_000) return "$25M to $50M";
  return "Over $50M";
}

export const PROPERTY_TYPES = ["Industrial", "Office", "Retail", "Medical", "Automotive", "Mixed-use"] as const;
export const DRIVERS = ["Growth or expansion", "Acquisition or buyout", "Debt maturity or refinancing", "Working capital", "Succession", "Too much space", "Lease renewal", "Other"] as const;
export const TIMING = ["Within 3 months", "3 to 6 months", "6 to 12 months", "Just exploring"] as const;
export const OWNERS = ["The operating company", "A related holding company", "Not sure"] as const;
