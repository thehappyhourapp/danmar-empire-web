"use client";

import { useEffect } from "react";

/**
 * Motion controller for the Home route. Renders nothing.
 *
 * It switches on html[data-motion="on"] after hydration, and only when the
 * visitor has not asked for reduced motion. Home.module.css keys every hidden
 * start state off that attribute, so the server HTML is the finished page for
 * everyone else. Before switching on, anything already in the viewport is
 * marked shown in place, so nothing on screen flashes hidden and back.
 *
 * Follow motion (the hero lift and the Collection parallax) uses frame-rate
 * independent damping, x += (target - x) * (1 - e^(-k dt)), k = 8, and the loop
 * runs only while something is still settling.
 */
export function HomeMotion({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup: (() => void) | null = null;

    const start = () => {
      const html = document.documentElement;
      const vh = () => window.innerHeight || 1;

      // Switch motion on first: the wipe overlays are display:none until then, and a
      // hidden element measures as top 0, which would mark every wipe as already seen.
      // The measuring and the class changes all run in this one task, so nothing
      // paints in a hidden state that is not meant to stay hidden.
      html.dataset.motion = "on";
      const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal], [data-wipe]"));
      const pending: HTMLElement[] = [];
      for (const el of targets) {
        if (el.getBoundingClientRect().top < vh() * 0.95) el.classList.add("in", "instant");
        else pending.push(el);
      }

      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.02 },
      );
      pending.forEach((el) => io.observe(el));

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
        window.removeEventListener("scroll", kick);
        window.removeEventListener("resize", kick);
        cancelAnimationFrame(raf);
        delete html.dataset.motion;
        targets.forEach((el) => el.classList.remove("in", "instant"));
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
