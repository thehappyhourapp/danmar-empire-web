"use client";

import { useEffect, useId, useRef, useState } from "react";
import { emblemCream, emblemForest } from "@/lib/marks";

/**
 * Photography carries this design. Where a photograph has not loaded yet (or the
 * viewer is offline / the host blocks the CDN) we fall back to a deterministic
 * architectural field rather than a grey box, so the page never looks broken.
 */
export function ImageFrame({
  src, srcSet, sizes, hue = 30, ratio = "4/3", className = "", alt = "", tone = "dark", fallback = "art", ground = "cream", filler, children,
}: {
  src?: string; srcSet?: string; sizes?: string; hue?: number; ratio?: string; className?: string; alt?: string;
  tone?: "dark" | "light";
  /** `flat` reserves the aspect ratio as a plain forest/10 block, with no generated art. */
  fallback?: "art" | "flat";
  /** The page ground under a flat frame: forest/10 reads on cream, paper/5 on forest. */
  ground?: "cream" | "forest";
  /** `emblem` sets the building mark, single colour, centred at low opacity on a flat frame:
   *  the deliberate stand-in for a person without a published portrait. */
  filler?: "emblem";
  children?: React.ReactNode;
}) {
  // "ssr": as rendered on the server, visible, so a photograph never depends on
  // JavaScript to appear. After mount: "loaded" if the browser already has it,
  // "pending" (hidden, then faded in on load) only if it is still on its way.
  const [state, setState] = useState<"ssr" | "pending" | "loaded" | "failed">("ssr");
  const dark = tone === "dark";
  const flat = fallback === "flat";
  // pull every seed toward the forest family so placeholder art reads as one palette
  const h = 148 + ((hue % 72) - 36) * 1.15;       // forest family, with real spread
  const lift = (hue % 5) * 3;                      // per-seed lightness variation
  const sat = 12 + (hue % 4) * 7;
  const a = dark ? `hsl(${h} ${sat + 16}% ${7 + lift * 0.5}%)`  : `hsl(${h} ${sat}% ${78 + lift * 0.3}%)`;
  const b = dark ? `hsl(${h} ${sat + 8}% ${17 + lift}%)`        : `hsl(${h} ${sat - 2}% ${66 + lift * 0.4}%)`;
  const c = dark ? `hsl(${h + 16} ${sat}% ${30 + lift}%)`       : `hsl(${h + 12} ${sat - 4}% ${87 + lift * 0.2}%)`;
  // useId, not Math.random: the id has to match between the server render and hydration
  const uid = "g" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = img.current;
    if (!el) return;
    // a photograph that finished loading before hydration never fires its load event
    if (el.complete) { setState(el.naturalWidth > 0 ? "loaded" : "failed"); return; }
    setState("pending");
    const done = () => setState(el.naturalWidth > 0 ? "loaded" : "failed");
    const fail = () => setState("failed");
    el.addEventListener("load", done, { once: true });
    el.addEventListener("error", fail, { once: true });
    return () => { el.removeEventListener("load", done); el.removeEventListener("error", fail); };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${flat ? (ground === "forest" ? "bg-paper/5" : "bg-forest/10") : "bg-forest-deep grain"} ${className}`} style={{ aspectRatio: ratio }}>
      {!flat && (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id={uid} x1="0" y1="0" x2="0.6" y2="1">
              <stop offset="0%" stopColor={c} /><stop offset="52%" stopColor={b} /><stop offset="100%" stopColor={a} />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill={`url(#${uid})`} />
          <g stroke={dark ? "rgba(255,255,255,.13)" : "rgba(20,22,28,.12)"} fill="none" strokeWidth="1">
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={i} x1={(hue * 3 + i * 47) % 400} y1="0" x2={(hue * 3 + i * 47) % 400} y2="300" />
            ))}
            <path d={`M0 ${210 + (hue % 40)} L ${120 + (hue % 60)} ${150 + (hue % 30)} L ${250 + (hue % 40)} ${190 + (hue % 25)} L400 ${140 + (hue % 50)}`} strokeWidth="1.2" />
            <rect x={(hue * 5) % 220} y={110 + (hue % 40)} width={120 + (hue % 70)} height={170} />
          </g>
        </svg>
      )}
      {flat && filler === "emblem" && (
        <img src={ground === "forest" ? emblemCream : emblemForest} alt="" aria-hidden
          className="absolute left-1/2 top-1/2 h-[36%] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[.08]" />
      )}
      {src && (
        <img
          ref={img} src={src} srcSet={srcSet} sizes={srcSet ? sizes : undefined} alt={alt} loading="lazy" decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-opacity [transition-duration:1200ms] motion-reduce:transition-none"
          style={state === "pending" || state === "failed" ? { opacity: 0 } : undefined}
        />
      )}
      {children}
    </div>
  );
}
