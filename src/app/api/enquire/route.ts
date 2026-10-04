import { NextResponse } from "next/server";
import { Resend } from "resend";

/* The one submission path for the site. The enquire drawer and the client access
   request both POST here. Mail goes to the desk through Resend, from the address in
   RESEND_FROM, with reply-to set to the visitor so a reply from any mail client
   reaches them. Without RESEND_API_KEY and RESEND_FROM the route answers 503 and
   the forms show the desk address as text instead. */

export const runtime = "nodejs";

const TO = "daniel@danmarempire.com";
const KINDS = { enquiry: "Enquiry", "client-access": "Client access request" } as const;
type Kind = keyof typeof KINDS;

/* Per-IP limit: five submissions in ten minutes. In memory, so it is per server
   instance; on Vercel that is best effort, which is enough to blunt a script. */
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (now - (v[v.length - 1] ?? 0) > WINDOW_MS) hits.delete(k);
  return recent.length > LIMIT;
}

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max) : "";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = (await req.json()) as Record<string, unknown>; } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  // Honeypot: a field no visitor sees. A filled one is answered as if it had sent.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const kind = typeof body.kind === "string" && body.kind in KINDS ? (body.kind as Kind) : null;
  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const firm = clean(body.firm, 120);
  const note = typeof body.note === "string" ? body.note.replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, " ").trim().slice(0, 2000) : "";
  const listingRef = clean(body.listingRef, 80);
  if (!kind) return NextResponse.json({ error: "Unknown request type." }, { status: 400 });
  if (name.length < 2 || !EMAIL.test(email)) return NextResponse.json({ error: "A name and a valid email address are required." }, { status: 400 });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many requests. Try again shortly." }, { status: 429 });

  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!key || !from) return NextResponse.json({ error: "unavailable" }, { status: 503 });

  const subject = `${KINDS[kind]} from ${name}${listingRef ? ` (ref ${listingRef})` : ""}`;
  const text = [
    `${KINDS[kind]} via danmarempire.com`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    firm ? `Firm: ${firm}` : null,
    listingRef ? `Listing reference: ${listingRef}` : null,
    "",
    note || "(no note)",
  ].filter((l) => l !== null).join("\n");

  try {
    const { error } = await new Resend(key).emails.send({ from, to: TO, replyTo: email, subject, text });
    if (error) return NextResponse.json({ error: "Sending failed." }, { status: 502 });
  } catch {
    return NextResponse.json({ error: "Sending failed." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
