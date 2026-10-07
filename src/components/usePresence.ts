"use client";

import { useEffect, useState } from "react";

export type Presence = "enter" | "open" | "exit" | null;

/**
 * Mount state for an overlay (drawer, dialog, menu) on the interface clock.
 * Opening mounts it at "enter" (adopted during render) and moves it to "open"
 * two frames later, so the CSS transition has a start state to run from.
 * Closing holds it at "exit" for exitMs, then unmounts. Under reduced motion it
 * mounts and unmounts at once.
 */
export function usePresence(open: boolean, exitMs = 200): Presence {
  const [stage, setStage] = useState<Presence>(open ? "open" : null);
  const [seen, setSeen] = useState(open);
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // adopt the change of `open` during render: the first frame of an entrance or an exit
  if (open !== seen) {
    setSeen(open);
    if (open) setStage(reduce ? "open" : "enter");
    else setStage(reduce ? null : stage ? "exit" : null);
  }

  // the frames and timers that follow are asynchronous, so nothing paints in between
  useEffect(() => {
    if (stage === "enter") {
      let r2 = 0;
      const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => setStage("open")); });
      return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
    }
    if (stage === "exit") {
      const t = window.setTimeout(() => setStage(null), exitMs);
      return () => window.clearTimeout(t);
    }
  }, [stage, exitMs]);
  return stage;
}
