import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { ACTIVE_FILTER, BASE, looksLikeOfficeKey } from "@/lib/proptx";

/* Feed diagnostics for the desk: GET /api/feed-status?secret=<REVALIDATE_SECRET>.
   Answers JSON only, with what the build can see of the two PropTx variables and
   the upstream answer to a count-only Active query. Never a listing record, never
   the token. docs/LIVE-CHECK.md step 0. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const clean = (v?: string) => (v && v !== "X" ? v : undefined);
const looksLikeJwt = (v?: string) => !!v && v.length > 100 && v.split(".").length === 3;
function same(a: string, b: string) {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export async function GET(req: Request) {
  const expected = clean(process.env.REVALIDATE_SECRET);
  if (!expected) return NextResponse.json({ error: "unavailable: REVALIDATE_SECRET is not set" }, { status: 503 });
  const given = new URL(req.url).searchParams.get("secret") ?? "";
  if (!same(given, expected)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const token = clean(process.env.PROPTX_TOKEN);
  const key = clean(process.env.PROPTX_OFFICE_KEY);
  const out: Record<string, unknown> = {
    tokenPresent: !!token,
    tokenLooksLikeJwt: looksLikeJwt(token),
    officeKeyValue: key ?? null,
    officeKeyUsable: looksLikeOfficeKey(key),
    officeKeyLooksLikeJwt: looksLikeJwt(key),
    query: `Property?$top=0&$count=true&$filter=${ACTIVE_FILTER}`,
    upstreamStatus: null,
    count: null,
    error: token ? null : "PROPTX_TOKEN is not set in this build",
    checkedAt: new Date().toISOString(),
  };
  if (token) {
    try {
      const res = await fetch(`${BASE}Property?$top=0&$count=true&$filter=${encodeURIComponent(ACTIVE_FILTER)}`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        cache: "no-store",
      });
      out.upstreamStatus = res.status;
      const text = await res.text();
      if (res.ok) {
        const json = JSON.parse(text) as { "@odata.count"?: number };
        out.count = json["@odata.count"] ?? null;
      } else {
        out.error = text.slice(0, 600);
      }
    } catch (e) {
      out.error = (e as Error).message;
    }
  }
  return NextResponse.json(out, { headers: { "Cache-Control": "no-store" } });
}
