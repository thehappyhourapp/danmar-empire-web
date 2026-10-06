import { test } from "node:test";
import assert from "node:assert/strict";
import { DEFAULTS, LIMITS, REFINANCE_NOTE, SALE_NOTE, clampInputs, estimate, money, roundTo, valueBand } from "./estimator.ts";

test("defaults: $10M value, $3M mortgage, 65% LTV, 3% costs, 6.5% cap", () => {
  const r = estimate(DEFAULTS);
  assert.equal(r.saleLeaseback, 6_700_000); // 10,000,000 × 0.97 − 3,000,000
  assert.equal(r.refinance, 3_500_000); // 10,000,000 × 0.65 − 3,000,000
  assert.equal(r.rentYear, 650_000); // 10,000,000 × 0.065
  assert.equal(r.rentMonth, 54_000); // 650,000 ÷ 12 = 54,167, to the nearest $1,000
  assert.equal(r.saleNote, undefined);
  assert.equal(r.refinanceNote, undefined);
});

test("the brief's illustrative example: $12M plant, $3M mortgage", () => {
  const r = estimate({ ...DEFAULTS, value: 12_000_000, mortgage: 3_000_000 });
  assert.equal(r.refinance, 4_800_000); // 7,800,000 loan less the 3,000,000 payoff
  assert.equal(r.saleLeaseback, 8_640_000); // 12,000,000 less 3% costs and the payoff, "about $8.6M"
  assert.equal(r.rentYear, 780_000);
  assert.equal(r.rentMonth, 65_000);
});

test("no mortgage: both routes release capital, nothing is deducted", () => {
  const r = estimate({ ...DEFAULTS, mortgage: 0 });
  assert.equal(r.saleLeaseback, 9_700_000);
  assert.equal(r.refinance, 6_500_000);
});

test("$0 edge: mortgage above the refinance limit shows refinance as $0 with its note", () => {
  const r = estimate({ ...DEFAULTS, mortgage: 7_000_000 }); // 7.0M > 6.5M
  assert.equal(r.refinance, 0);
  assert.equal(r.refinanceNote, REFINANCE_NOTE);
  assert.equal(r.saleLeaseback, 2_700_000); // the sale still clears it
  assert.equal(r.saleNote, undefined);
});

test("$0 edge: mortgage above the sale proceeds shows sale-leaseback as $0 with its note", () => {
  const r = estimate({ ...DEFAULTS, mortgage: 9_800_000 }); // 9.8M > 9.7M
  assert.equal(r.saleLeaseback, 0);
  assert.equal(r.saleNote, SALE_NOTE);
  assert.equal(r.refinance, 0); // and above the refinance limit too
  assert.equal(r.refinanceNote, REFINANCE_NOTE);
});

test("exactly at the limit is $0 with the note, never negative", () => {
  assert.equal(estimate({ ...DEFAULTS, mortgage: 6_500_000 }).refinance, 0);
  assert.equal(estimate({ ...DEFAULTS, mortgage: 6_500_000 }).refinanceNote, REFINANCE_NOTE);
  assert.equal(estimate({ ...DEFAULTS, mortgage: 9_700_000 }).saleLeaseback, 0);
  assert.equal(estimate({ ...DEFAULTS, mortgage: 9_700_000 }).saleNote, SALE_NOTE);
});

test("slider extremes", () => {
  const lo = estimate({ value: 10_000_000, mortgage: 3_000_000, ltv: LIMITS.ltv.min, costs: LIMITS.costs.min, cap: LIMITS.cap.min });
  assert.equal(lo.refinance, 2_000_000); // 50% LTV
  assert.equal(lo.saleLeaseback, 6_900_000); // 1% costs
  assert.equal(lo.rentYear, 500_000); // 5.0% cap
  const hi = estimate({ value: 10_000_000, mortgage: 3_000_000, ltv: LIMITS.ltv.max, costs: LIMITS.costs.max, cap: LIMITS.cap.max });
  assert.equal(hi.refinance, 4_500_000); // 75% LTV
  assert.equal(hi.saleLeaseback, 6_500_000); // 5% costs
  assert.equal(hi.rentYear, 800_000); // 8.0% cap
});

test("value range: $1M to $100M, and the mortgage never exceeds the value", () => {
  const low = estimate({ ...DEFAULTS, value: 1_000_000, mortgage: 0 });
  assert.equal(low.saleLeaseback, 970_000);
  const high = estimate({ ...DEFAULTS, value: 100_000_000, mortgage: 0 });
  assert.equal(high.refinance, 65_000_000);
  const c = clampInputs({ ...DEFAULTS, value: 500_000_000, mortgage: 999_000_000 });
  assert.equal(c.value, 100_000_000);
  assert.equal(c.mortgage, 100_000_000);
  const under = clampInputs({ ...DEFAULTS, value: 10 });
  assert.equal(under.value, 1_000_000);
});

test("rounding is to the nearest $10,000 and figures are formatted in Canadian English", () => {
  assert.equal(roundTo(8_644_999, 10_000), 8_640_000);
  assert.equal(roundTo(8_645_000, 10_000), 8_650_000);
  assert.equal(money(8_640_000), "$8,640,000");
  assert.equal(money(0), "$0");
});

test("value bands match the form's options", () => {
  assert.equal(valueBand(1_500_000), "Under $2M");
  assert.equal(valueBand(2_000_000), "$2M to $5M");
  assert.equal(valueBand(9_999_999), "$5M to $10M");
  assert.equal(valueBand(10_000_000), "$10M to $25M");
  assert.equal(valueBand(30_000_000), "$25M to $50M");
  assert.equal(valueBand(50_000_000), "Over $50M");
});
