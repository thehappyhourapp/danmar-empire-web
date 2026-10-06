"use client";

import { track } from "@/lib/analytics";

/** A details row that reports when it is opened. Rendering stays on the server;
 *  this only adds the toggle listener. */
export function FaqRow({ index, className, children }: { index: number; className?: string; children: React.ReactNode }) {
  return (
    <details className={className} onToggle={(e) => { if (e.currentTarget.open) track("faq_opened", { question: index }); }}>
      {children}
    </details>
  );
}
