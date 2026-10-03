"use client";

import { useEffect, useRef, useState } from "react";

/** Scroll progress 0→1 across the first viewport. rAF-throttled, and it
 *  returns 0 forever under prefers-reduced-motion so nothing moves. */
export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const read = () => {
      raf = 0;
      const h = window.innerHeight || 1;
      setP(Math.min(1, Math.max(0, window.scrollY / h)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return p;
}

/**
 * The house comes toward you as you scroll: the frame pushes in, the overlay
 * deepens, and the type lifts away. One gesture, used once, on the homepage only.
 * Repeat it on every section and it stops being an effect and becomes a tax.
 */
export function ScrollStage({ progress, children, media }: {
  progress: number; children: React.ReactNode; media: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scale = 1 + progress * 0.34;
  const shade = 0.55 + progress * 0.42;
  const lift = progress * -90;
  const fade = Math.max(0, 1 - progress * 1.55);

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden bg-forest-deep text-paper">
      <div className="absolute inset-0 will-change-transform"
        style={{ transform: `scale(${scale})`, transformOrigin: "52% 46%" }}>
        {media}
      </div>
      <div className="absolute inset-0"
        style={{ background: `linear-gradient(to bottom, rgba(7,36,27,.88) 0%, rgba(7,36,27,${shade}) 42%, rgba(7,36,27,.97) 100%)` }} />
      <div className="relative h-full will-change-transform"
        style={{ transform: `translate3d(0,${lift}px,0)`, opacity: fade }}>
        {children}
      </div>
    </section>
  );
}
