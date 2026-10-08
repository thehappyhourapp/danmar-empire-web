import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/* GET /api/revalidate?secret=... drops every cached feed read (the "proptx" tag),
   so a new or withdrawn listing shows within seconds instead of within the hour.
   The secret lives in REVALIDATE_SECRET; without it the route is off. */

export const runtime = "nodejs";

export async function GET(req: Request) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || expected === "X") return NextResponse.json({ error: "unavailable" }, { status: 503 });
  const given = new URL(req.url).searchParams.get("secret") ?? "";
  const a = Buffer.from(given), b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  revalidateTag("proptx");
  return NextResponse.json({ revalidated: true, tag: "proptx", at: new Date().toISOString() });
}
