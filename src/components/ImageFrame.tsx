import { useEffect, useRef, useState } from "react";

/**
 * Photography carries this design. Where a photograph has not loaded yet (or the
 * viewer is offline / the host blocks the CDN) we fall back to a deterministic
 * architectural field rather than a grey box, so the page never looks broken.
 */
export function ImageFrame({
  src, hue = 30, ratio = "4/3", className = "", alt = "", tone = "dark", children,
}: {
  src?: string; hue?: number; ratio?: string; className?: string; alt?: string;
  tone?: "dark" | "light"; children?: React.ReactNode;
}) {
  const [ok, setOk] = useState(false);
  const dark = tone === "dark";
  // pull every seed toward the forest family so placeholder art reads as one palette
  const h = 148 + ((hue % 72) - 36) * 1.15;       // forest family, with real spread
  const lift = (hue % 5) * 3;                      // per-seed lightness variation
  const sat = 12 + (hue % 4) * 7;
  const a = dark ? `hsl(${h} ${sat + 16}% ${7 + lift * 0.5}%)`  : `hsl(${h} ${sat}% ${78 + lift * 0.3}%)`;
  const b = dark ? `hsl(${h} ${sat + 8}% ${17 + lift}%)`        : `hsl(${h} ${sat - 2}% ${66 + lift * 0.4}%)`;
  const c = dark ? `hsl(${h + 16} ${sat}% ${30 + lift}%)`       : `hsl(${h + 12} ${sat - 4}% ${87 + lift * 0.2}%)`;
  const uid = useRef("g" + Math.random().toString(36).slice(2, 8)).current;

  return (
    <div className={`relative overflow-hidden bg-forest-deep grain ${className}`} style={{ aspectRatio: ratio }}>
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
      {src && (
        <img
          src={src} alt={alt} loading="lazy" decoding="async"
          onLoad={() => setOk(true)} onError={() => setOk(false)}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms]"
          style={{ opacity: ok ? 1 : 0 }}
        />
      )}
      {children}
    </div>
  );
}

/** Fires once when the element first enters the viewport. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { el.classList.add("in"); io.unobserve(el); } }),
      { rootMargin: "0px 0px -12% 0px", threshold: 0.06 }
    );
    el.classList.add("rv"); io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
