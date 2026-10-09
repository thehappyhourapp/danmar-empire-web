import { test } from "node:test";
import assert from "node:assert/strict";
import { FIXTURE_MEDIA, FIXTURE_PROPERTIES } from "./__fixtures__/proptx.ts";
import { ACTIVE_FILTER, activeFilter, areaFrom, displayAllowed, featuresOf, isActive, kebab, kindOf, looksLikeOfficeKey, looksLikeToken, mapProperty, orderMedia, slugFor, tenureOf, yn } from "./proptx.ts";
import type { PropTxProperty } from "./proptx.ts";

const by = (key: string) => FIXTURE_PROPERTIES.find((p) => p.ListingKey === key)!;
const mapAll = () => { const taken = new Set<string>(); return FIXTURE_PROPERTIES.map((p) => mapProperty(p, taken, orderMedia(FIXTURE_MEDIA[p.ListingKey] ?? []))).filter((l) => l !== null); };

test("Y/N fields read as booleans, strings or unknown", () => {
  assert.equal(yn(true), true); assert.equal(yn("N"), false); assert.equal(yn("yes"), true); assert.equal(yn("false"), false);
  assert.equal(yn(undefined), undefined); assert.equal(yn("maybe"), undefined);
});

test("a record with display permission N is dropped everywhere", () => {
  assert.equal(displayAllowed(by("FIX0005")), false);
  const taken = new Set<string>();
  assert.equal(mapProperty(by("FIX0005"), taken), null);
  const all = mapAll();
  assert.ok(all.every((l) => l.key !== "FIX0005"));
  assert.equal(all.length, 5);
});

test("the legacy perm_adv name is honoured when the RESO name is absent", () => {
  const p: PropTxProperty = { ListingKey: "X", City: "Oakville", UnparsedAddress: "1 A St", perm_adv: "N" };
  assert.equal(mapProperty(p, new Set()), null);
});

test("address display N: no street in the slug, the name, the address or the row", () => {
  const l = mapAll().find((x) => x.key === "FIX0004")!;
  assert.equal(l.addressWithheld, true);
  assert.equal(l.id, "listing-w0000004");
  assert.equal(l.address, "");
  assert.equal(l.name, "King City");
  assert.equal(l.region, "Fixture Estates");
  assert.ok(!JSON.stringify(l).includes("Hidden"), "the street must not appear in any field");
});

test("slugs: address and city, lowercase kebab, listing id only on collision", () => {
  const taken = new Set<string>();
  assert.equal(slugFor(by("FIX0001"), taken), "12-example-crescent-oakville");
  taken.add("12-example-crescent-oakville");
  assert.equal(slugFor(by("FIX0006"), taken), "12-example-crescent-oakville-w0000006");
  assert.equal(slugFor(by("FIX0002"), new Set()), "88-sample-street-unit-2104-toronto");
  assert.equal(kebab("Côte-Saint-Luc Rd."), "cote-saint-luc-rd");
});

test("kind, use class and tenure from the feed's type fields", () => {
  assert.equal(kindOf("Residential Freehold", "Detached"), "Detached");
  assert.equal(kindOf("Residential Freehold", "Att/Row/Townhouse"), "Townhouse");
  assert.equal(kindOf("Residential Condo & Other", "Condo Apt"), "Condominium");
  assert.equal(kindOf("Commercial", "Industrial"), "Industrial");
  assert.equal(kindOf("Commercial", "Vacant Land"), "Land");
  assert.equal(kindOf("Commercial", "Office"), "Commercial");
  assert.equal(kindOf("Residential Freehold", "Multiplex"), "Multi-Residential");
  assert.equal(kindOf("Residential Freehold", undefined), "Detached");
  assert.equal(kindOf("Commercial", undefined), "Commercial");
  assert.equal(tenureOf("Freehold"), "Freehold"); assert.equal(tenureOf("Condominium"), "Condominium"); assert.equal(tenureOf("Leasehold"), "Leasehold"); assert.equal(tenureOf(undefined), "");
  const all = mapAll();
  assert.equal(all.find((l) => l.key === "FIX0003")!.useClass, "investment");
  assert.equal(all.find((l) => l.key === "FIX0001")!.useClass, "residential");
});

test("price, intent, area, features and the verbatim remarks", () => {
  const all = mapAll();
  const house = all.find((l) => l.key === "FIX0001")!;
  assert.equal(house.price, 2450000); assert.equal(house.intent, "sale"); assert.equal(house.sqft, 3250);
  assert.deepEqual(house.features, ["6 parking", "Attached garage", "Basement: Finished, Walk-Out", "Heat: Forced Air", "Cooling: Central Air", "Lot 60 Feet", "Taxes $9,800 (2026)"]);
  assert.ok(house.features.length <= 8);
  assert.equal(house.body[0], by("FIX0001").PublicRemarks);
  assert.equal(house.standfirst, "");
  const lease = all.find((l) => l.key === "FIX0002")!;
  assert.equal(lease.intent, "lease"); assert.equal(lease.price, 6900); assert.equal(lease.sqft, 1100);
  const ind = all.find((l) => l.key === "FIX0003")!;
  assert.equal(ind.sqft, 24000); assert.equal(ind.capRate, 5.8); assert.equal(ind.noi, 420000);
  assert.equal(areaFrom("5000+"), 5000); assert.equal(areaFrom(undefined, undefined), null);
  assert.equal(featuresOf({ ListingKey: "Z" }).length, 0);
});

test("every feed listing carries its MLS number, no tier, and status Available", () => {
  for (const l of mapAll()) { assert.ok(l.mls); assert.equal(l.tier, null); assert.equal(l.status, "Available"); }
});

test("media: the preferred photograph first, then by Order", () => {
  assert.deepEqual(orderMedia(FIXTURE_MEDIA.FIX0001), ["/photos/fixture/a.jpg", "/photos/fixture/b.jpg", "/photos/fixture/c.jpg"]);
  const house = mapAll().find((l) => l.key === "FIX0001")!;
  assert.equal(house.photo, "/photos/fixture/a.jpg");
  assert.deepEqual(house.photos, ["/photos/fixture/b.jpg", "/photos/fixture/c.jpg"]);
});

test("the on-market filter is StandardStatus Active, and the fixture's six records all pass it", () => {
  assert.equal(ACTIVE_FILTER, "StandardStatus eq 'Active'");
  assert.equal(FIXTURE_PROPERTIES.filter(isActive).length, FIXTURE_PROPERTIES.length);
  assert.equal(isActive({ StandardStatus: "Expired" }), false);
  assert.equal(isActive({ StandardStatus: undefined }), false);
  // what goes on the wire: percent-encoded spaces, never '+'
  assert.equal(encodeURIComponent(ACTIVE_FILTER), "StandardStatus%20eq%20'Active'");
});

test("the office clause uses a plain ListOfficeKey and ignores anything else", () => {
  assert.equal(activeFilter("249200"), "StandardStatus eq 'Active' and ListOfficeKey eq '249200'");
  assert.equal(activeFilter(undefined), "StandardStatus eq 'Active' and contains(ListOfficeName,'DANMAR')");
  const jwt = "eyJ" + "a".repeat(40) + "." + "b".repeat(40) + "." + "c".repeat(40);
  assert.equal(looksLikeToken(jwt), true);
  assert.equal(looksLikeOfficeKey(jwt), false);
  assert.equal(looksLikeOfficeKey("249200"), true);
  assert.equal(activeFilter(jwt), "StandardStatus eq 'Active' and contains(ListOfficeName,'DANMAR')");
});
