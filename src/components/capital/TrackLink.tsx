"use client";

import { track } from "@/lib/analytics";
import s from "@/components/motion.module.css";

/** An in-page text link that reports the click. Server content stays server
 *  rendered; this only adds the listener. */
export function TrackLink({ href, location, className, children }: { href: string; location: "hero" | "estimator" | "footer"; className?: string; children: React.ReactNode }) {
  return (
    <a href={href} onClick={() => track("capital_review_cta_click", { location })} className={`${s.tlink} ${className ?? ""}`}>
      {children}
    </a>
  );
}
