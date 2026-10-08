import { NextResponse } from "next/server";

/* Listing photographs are served through this proxy so that the host the feed
   actually uses, and any signed or expiring URL, never reaches the page markup
   or breaks it. Only the feed's hosts are allowed; the image is passed through
   with an hour's cache, the transient cache the licence permits. Nothing is
   written to disk. */

export const runtime = "nodejs";

const ALLOWED = [/(^|\.)ampre\.ca$/i, /(^|\.)proptx\.ca$/i];
const MAX_BYTES = 15 * 1024 * 1024;

export async function GET(req: Request) {
  const u = new URL(req.url).searchParams.get("u") ?? "";
  let target: URL;
  try { target = new URL(u); } catch { return new NextResponse("Bad request", { status: 400 }); }
  if (target.protocol !== "https:" || !ALLOWED.some((re) => re.test(target.hostname))) return new NextResponse("Forbidden", { status: 403 });

  let upstream: Response;
  try { upstream = await fetch(target, { next: { revalidate: 3600 } }); } catch { return new NextResponse("Bad gateway", { status: 502 }); }
  if (!upstream.ok || !upstream.body) return new NextResponse("Bad gateway", { status: 502 });
  const type = upstream.headers.get("content-type") ?? "";
  if (!type.startsWith("image/")) return new NextResponse("Unsupported", { status: 415 });
  const length = Number(upstream.headers.get("content-length") ?? 0);
  if (length > MAX_BYTES) return new NextResponse("Too large", { status: 413 });

  return new NextResponse(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": type,
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      ...(length ? { "Content-Length": String(length) } : {}),
      "X-Content-Type-Options": "nosniff",
    },
  });
}
