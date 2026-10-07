"use client";

import { useEffect } from "react";

/**
 * Motion controller for a route. Renders nothing. Hero lift, scroll cue and parallax hooks are optional; a page without them gets reveals and wipes only.
 *
 * It switches on html[data-motion="on"] after hydration, and only when the
 * visitor has not asked for reduced motion. The motion CSS keys every hidden
 * start state off that attribute, so the server HTML is the finished page for
 * everyone else. Before switching on, anything already in the viewport is
 * marked shown in place, so nothing on screen flashes hidden and back.
 *
 * Reveal units. A [data-reveal] element reveals on its own. A [data-reveal-group]
 * reveals every [data-reveal] inside it on one trigger, so a title and its text
 * read as one object; each member keeps its own --d offset for the stagger.
 *
 * Wipes. A [data-wipe] overlay holds the previous ground over the first viewport
 * of a new chapter. It fires when the real boundary reaches 60% of the viewport,
 * and the reveal units it covers start as the wipe's edge passes them, so the
 * cut and the chapter's first content move as one.
 *
 * Swaps. Rows that arrive inside a [data-swap] container after first render (a
 * Collection lens change) enter on the interface clock, 40ms apart.
 *
 * Follow motion (the hero lift and the Collection parallax) uses frame-rate
 * independent damping, x += (target - x) * (1 - e^(-k dt)), k = 8, and the loop
 * runs only while something is still settling.
 */

const REVEAL = "[data-reveal-group], [data-reveal]";
const WIPE_MS = 1000;

/** When the wipe's edge, travelling on cubic-bezier(0.7, 0, 0.3, 1), has covered
 *  fraction o of the overlay: solve y(s) = o for the curve parameter, return x(s). */
function edgeTime(o: number) {
  const b = (s: number, p1: number, p2: number) => 3 * p1 * s * (1 - s) ** 2 + 3 * p2 * s * s * (1 - s) + s ** 3;
  let lo = 0, hi = 1;
  for (let n = 0; n < 24; n++) {
    const mid = (lo + hi) / 2;
    if (b(mid, 0, 1) < o) lo = mid; else hi = mid;
  }
  return Math.round(b((lo + hi) / 2, 0.7, 0.3) * WIPE_MS);
}

/** A reveal unit's own elements: the group's members, or the element itself. */
const members = (unit: HTMLElement) =>
  unit.hasAttribute("data-reveal-group") ? Array.from(unit.querySelectorAll<HTMLElement>("[data-reveal]")) : [unit];

/** Units are groups and the reveals that are not inside one. */
const unitsIn = (root: ParentNode) =>
  Array.from(root.querySelectorAll<HTMLElement>(REVEAL)).filter((el) => el.hasAttribute("data-reveal-group") || !el.parentElement?.closest("[data-reveal-group]"));

export function MotionController({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup: (() => void) | null = null;

    const start = () => {
      const html = document.documentElement;
      const vh = () => window.innerHeight || 1;
      const show = (unit: HTMLElement, instant = false) => {
        unit.classList.add("in");
        for (const el of members(unit)) el.classList.add("in", ...(instant ? ["instant"] : []));
        if (instant) unit.classList.add("instant");
      };

      // Switch motion on first: the wipe overlays are display:none until then, and a
      // hidden element measures as top 0, which would mark every wipe as already seen.
      // The measuring and the class changes all run in this one task, so nothing
      // paints in a hidden state that is not meant to stay hidden.
      html.dataset.motion = "on";

      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            show(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.02 },
      );

      // wipes: those already on screen are spent; the rest hold what they cover
      const held = new Map<HTMLElement, HTMLElement[]>();
      for (const w of Array.from(root.querySelectorAll<HTMLElement>("[data-wipe]"))) {
        if (w.getBoundingClientRect().top < vh() * 0.95) w.classList.add("in", "instant");
        else held.set(w, []);
      }
      const coveringWipe = (el: HTMLElement) => {
        const top = el.getBoundingClientRect().top;
        for (const w of held.keys()) {
          const r = w.getBoundingClientRect();
          if (top >= r.top && top < r.bottom) return w;
        }
        return null;
      };

      for (const unit of unitsIn(root)) {
        if (unit.getBoundingClientRect().top < vh() * 0.95) { show(unit, true); continue; }
        const w = coveringWipe(unit);
        if (w) held.get(w)!.push(unit);
        else io.observe(unit);
      }

      const wipeIo = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            const w = e.target as HTMLElement;
            wipeIo.unobserve(w);
            const wr = w.getBoundingClientRect();
            w.classList.add("in");
            for (const unit of held.get(w) ?? []) {
              if (unit.getBoundingClientRect().top >= vh() * 0.9) { io.observe(unit); continue; }
              unit.classList.add("in");
              for (const el of members(unit)) {
                const o = Math.min(1, Math.max(0, (el.getBoundingClientRect().top - wr.top) / wr.height));
                const own = parseFloat(el.style.getPropertyValue("--d")) || 0;
                el.style.setProperty("--d", `${edgeTime(o) + own}ms`);
                el.classList.add("in");
              }
            }
            held.delete(w);
          }
        },
        { rootMargin: "0px 0px -40% 0px", threshold: 0 },
      );
      held.forEach((_, w) => wipeIo.observe(w));

      // Filtering remounts rows. Rows inside a swap container enter on the interface
      // clock; anything else that arrives later is shown in place when it lands on
      // screen and observed otherwise, so nothing is left in a hidden state.
      const arrive = (el: HTMLElement, swaps: HTMLElement[]) => {
        if (el.classList.contains("in")) return;
        if (el.closest("[data-swap]")) {
          el.classList.add("swap");
          el.style.setProperty("--d", `${Math.min(swaps.length, 3) * 40}ms`);
          swaps.push(el);
          return;
        }
        if (el.getBoundingClientRect().top < vh() * 0.95) show(el, true);
        else io.observe(el);
      };
      const mo = new MutationObserver((records) => {
        const swaps: HTMLElement[] = [];
        for (const r of records) r.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          if (n.matches(REVEAL)) arrive(n, swaps);
          unitsIn(n).forEach((u) => arrive(u, swaps));
        });
        if (!swaps.length) return;
        void root.offsetWidth; // one reflow commits every start state before the targets
        swaps.forEach((el) => el.classList.add("in"));
      });
      mo.observe(root, { childList: true, subtree: true });

      const lift = root.querySelector<HTMLElement>("[data-hero-lift]");
      const cue = root.querySelector<HTMLElement>("[data-cue]");
      const plx = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]")).map((el) => ({ el, y: 0 }));
      const K = 8;
      let liftY = 0;
      let raf = 0;
      let last = 0;
      let running = false;

      const step = (t: number) => {
        const dt = Math.min(0.05, (t - last) / 1000 || 0.016);
        last = t;
        const a = 1 - Math.exp(-K * dt);
        const h = vh();
        const s = window.scrollY;
        let moving = false;

        if (lift) {
          // at most 8% of the hero's height, reached by the time the hero has scrolled away
          const target = -Math.min(s / h, 1) * h * 0.08;
          liftY += (target - liftY) * a;
          lift.style.transform = `translate3d(0, ${liftY.toFixed(2)}px, 0)`;
          if (Math.abs(target - liftY) > 0.05) moving = true;
        }
        if (cue) cue.style.opacity = String(Math.max(0, 1 - s / (h * 0.3)));

        for (const p of plx) {
          const r = p.el.getBoundingClientRect();
          const c = Math.max(-1, Math.min(1, (r.top + r.height / 2 - h / 2) / h));
          const target = c * -4; // percent of the layer's own height: 8% of travel in all
          p.y += (target - p.y) * a;
          p.el.style.transform = `translate3d(0, ${p.y.toFixed(3)}%, 0) scale(1.08)`;
          if (Math.abs(target - p.y) > 0.01) moving = true;
        }

        if (moving) raf = requestAnimationFrame(step);
        else { running = false; raf = 0; }
      };
      const kick = () => {
        if (running) return;
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(step);
      };
      kick();
      window.addEventListener("scroll", kick, { passive: true });
      window.addEventListener("resize", kick, { passive: true });

      cleanup = () => {
        io.disconnect();
        wipeIo.disconnect();
        mo.disconnect();
        window.removeEventListener("scroll", kick);
        window.removeEventListener("resize", kick);
        cancelAnimationFrame(raf);
        delete html.dataset.motion;
        root.querySelectorAll(`${REVEAL}, [data-wipe]`).forEach((el) => el.classList.remove("in", "instant", "swap"));
        if (lift) lift.style.transform = "";
        if (cue) cue.style.opacity = "";
        plx.forEach((p) => { p.el.style.transform = ""; });
      };
    };

    const stop = () => { cleanup?.(); cleanup = null; };
    const apply = () => { if (mq.matches) stop(); else if (!cleanup) start(); };
    apply();
    mq.addEventListener("change", apply);
    return () => { mq.removeEventListener("change", apply); stop(); };
  }, [rootId]);

  return null;
}
