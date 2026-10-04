"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Listing } from "@/lib/data";
import { propertyHref } from "@/lib/routes";
import { useSite } from "./SiteShell";
import { money } from "@/lib/parse";
import { ImageFrame } from "./ImageFrame";

/** The internal tier badge. Curation signal, not a filter — it says this one is ours
 *  and we stand behind it, which is the thing a portal can never say. */
export function Tier({ t, onDark = false }: { t: Listing["tier"]; onDark?: boolean }) {
  if (!t) return null;
  return (
    <span className={`meta inline-flex items-center gap-2 border px-3 py-[5px] backdrop-blur-sm ${
      onDark ? "border-brass-light/70 bg-forest-deep/45 text-brass-light" : "border-brass/70 bg-paper/80 text-brass"}`}>
      <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
        <path d="M5 0l1.3 3.2L9.7 4 7 6.1l.8 3.5L5 7.8 2.2 9.6 3 6.1.3 4l3.4-.8z" />
      </svg>
      {t}
    </span>
  );
}

export function SaveBtn({ on, toggle }: { on: boolean; toggle: () => void }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); toggle(); }}
      aria-label={on ? "Remove from saved" : "Save"}
      className={`grid h-9 w-9 place-items-center border backdrop-blur-sm transition-colors ${
        on ? "border-brass bg-brass text-paper" : "border-paper/40 bg-forest-deep/30 text-paper hover:border-paper"}`}
    >
      <svg width="13" height="13" viewBox="0 0 14 14" fill={on ? "currentColor" : "none"}>
        <path d="M2.5 1.5h9v11l-4.5-3-4.5 3z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

/**
 * Five fields maximum: name, price, region, tenure/type, one status badge.
 * No bed/bath/car icon row — that row is the template tell.
 */
export function ListingCard({
  l, ratio = "4/5", size = "md",
}: {
  l: Listing; ratio?: string; size?: "md" | "lg";
}) {
  const router = useRouter();
  const site = useSite();
  const saved = site.saved.has(l.id);
  const toggle = () => site.toggleSave(l.id);
  const lease = l.intent === "lease";
  const dim = l.status === "Sold" || l.status === "Leased";
  return (
    <article className="group cursor-pointer" onClick={() => router.push(propertyHref(l.id))}>
      <div className="relative">
        <ImageFrame src={l.photo} hue={l.hue} ratio={ratio} alt={l.name}
          className="transition-[filter,transform] [transition-duration:900ms] group-hover:brightness-[1.06]" />
        <div className="absolute left-4 top-4 flex gap-2"><Tier t={l.tier} onDark /></div>
        <div className="absolute right-4 top-4"><SaveBtn on={saved} toggle={toggle} /></div>
        {dim && (
          <div className="absolute inset-0 flex items-end bg-forest-deep/45">
            <span className="meta m-4 border border-paper/50 px-2 py-1 text-paper">{l.status}</span>
          </div>
        )}
      </div>

      <div className="pt-4">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className={`font-display leading-tight ${size === "lg" ? "text-[26px] md:text-[30px]" : "text-[20px]"}`}>
            <Link href={propertyHref(l.id)} onClick={(e) => e.stopPropagation()}>{l.name}</Link>
          </h3>
          <span className={`shrink-0 fig ${size === "lg" ? "text-[15px]" : "text-[13px]"}`}>
            {money(l.price, lease)}
          </span>
        </div>
        {/* metadata as a typographic line, never as chips */}
        <p className="meta mt-2 text-mute">
          {l.region}, {l.city} <span className="mx-1.5 opacity-40">/</span> {l.kind} <span className="mx-1.5 opacity-40">/</span> {l.tenure}
          {l.capRate ? <> <span className="mx-1.5 opacity-40">/</span> {l.capRate.toFixed(1)}% cap</> : null}
        </p>
      </div>
    </article>
  );
}
