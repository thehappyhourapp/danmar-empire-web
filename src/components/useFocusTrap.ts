"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE = "a[href], button:not([disabled]), input:not([type='hidden']), textarea, select, [tabindex]:not([tabindex='-1'])";

/**
 * Focus for an overlay. While active: focus moves into the panel (to `initial`,
 * or the panel itself) as it opens, Tab and Shift+Tab stay inside it, and Escape
 * closes it. When it closes, focus returns to whatever opened it. Focus moves
 * with preventScroll, so a panel still sliding in is never scrolled to.
 */
export function useFocusTrap(panel: React.RefObject<HTMLElement | null>, active: boolean, onEscape: () => void, initial?: string) {
  const escape = useRef(onEscape);
  escape.current = onEscape;

  useEffect(() => {
    if (!active) return;
    const el = panel.current;
    if (!el) return;
    const returnTo = document.activeElement as HTMLElement | null;
    const first = (initial && el.querySelector<HTMLElement>(initial)) || el;
    first.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); escape.current(); return; }
      if (e.key !== "Tab") return;
      const items = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => n.tabIndex >= 0 && n.offsetParent !== null);
      if (!items.length) { e.preventDefault(); return; }
      const a = items[0], z = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === a || document.activeElement === el)) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      returnTo?.focus?.({ preventScroll: true });
    };
  }, [active, panel, initial]);
}
