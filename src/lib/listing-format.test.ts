import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LEASE_FIRST_MIN, cityLine, cleanCommunity, collectionOrder, isPortrait, jpegSize, specLine } from "./listing-format.ts";

test("cleanCommunity strips the TRREB code and the area abbreviation", () => {
  assert.equal(cleanCommunity("1021 - WP Winston Park"), "Winston Park");
  // no code
  assert.equal(cleanCommunity("WP Winston Park"), "Winston Park");
  // code, no abbreviation
  assert.equal(cleanCommunity("1020 - Eastlake"), "Eastlake");
  // neither
  assert.equal(cleanCommunity("Glen Abbey"), "Glen Abbey");
  // a capitals word that is the whole name, or longer than three letters, survives
  assert.equal(cleanCommunity("1010 - YMCA"), "YMCA");
  assert.equal(cleanCommunity("BRONTE West"), "BRONTE West");
  assert.equal(cleanCommunity("WP"), "WP");
  assert.equal(cleanCommunity(undefined), "");
});

test("collection order: leases from $8,000, then sales, then smaller leases, each highest first", () => {
  assert.equal(LEASE_FIRST_MIN, 8000);
  const L = (id: string, intent: "sale" | "lease", price: number) => ({ id, intent, price });
  const order = collectionOrder([
    L("sale-2m", "sale", 2_000_000), L("lease-5k", "lease", 5_000), L("lease-8k", "lease", 8_000),
    L("sale-9m", "sale", 9_000_000), L("lease-12k", "lease", 12_000), L("lease-7999", "lease", 7_999),
  ]).map((l) => l.id);
  assert.deepEqual(order, ["lease-12k", "lease-8k", "sale-9m", "sale-2m", "lease-7999", "lease-5k"]);
  assert.deepEqual(collectionOrder([]), []);
});

test("spec line: residential beds, baths, area; commercial and land size and type; no zeros", () => {
  assert.equal(specLine({ useClass: "residential", kind: "Detached", beds: 4, baths: 4, sqft: 3250 }), "4 bed · 4 bath · 3,250 sq ft");
  assert.equal(specLine({ useClass: "residential", kind: "Condominium", beds: 2, baths: 0, sqft: null }), "2 bed");
  assert.equal(specLine({ useClass: "investment", kind: "Industrial", beds: null, baths: null, sqft: 24000 }), "24,000 sq ft · Industrial");
  assert.equal(specLine({ useClass: "investment", kind: "Land", beds: null, baths: null, sqft: null, acres: "12.5" }), "12.5 acres · Land");
  assert.equal(cityLine({ city: "Oakville", province: "ON" }), "Oakville, Ontario");
});

test("JPEG header size, and portrait detection", () => {
  const land = jpegSize(readFileSync("public/photos/fixture/a.jpg"));
  assert.deepEqual(land, { width: 1600, height: 1000 });
  assert.equal(isPortrait(land), false);
  const port = jpegSize(readFileSync("public/photos/fixture/p.jpg"));
  assert.deepEqual(port, { width: 800, height: 1000 });
  assert.equal(isPortrait(port), true);
  // only the first bytes are fetched in production: a truncated header gives up rather than guessing
  assert.equal(jpegSize(readFileSync("public/photos/fixture/a.jpg").subarray(0, 10)), undefined);
  assert.equal(jpegSize(new Uint8Array([1, 2, 3])), undefined);
});
