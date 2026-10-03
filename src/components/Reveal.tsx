"use client";

import { useReveal } from "./ImageFrame";

/* Rendered with .rv on the server so content does not flash visible and then hide
   on hydration; the <noscript> rule in the root layout shows it without JS. */
export function Reveal({ children, className = "", delay = 0 }: { children?: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref} className={`rv ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}
