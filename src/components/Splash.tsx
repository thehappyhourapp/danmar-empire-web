"use client";

import { useEffect, useState } from "react";
import { sealCream } from "@/lib/marks";

/**
 * The emblem gets one moment, on arrival, and is then retired to the footer.
 * Skippable on any input, and skipped entirely for reduced-motion users.
 */
export function Splash({ onDone }: { onDone: () => void }) {
  const [out, setOut] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { onDone(); return; }
    const a = setTimeout(() => setOut(true), 1650);
    const b = setTimeout(onDone, 2500);
    const skip = () => { setOut(true); setTimeout(onDone, 500); };
    window.addEventListener("wheel", skip, { passive: true, once: true });
    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });
    return () => { clearTimeout(a); clearTimeout(b); window.removeEventListener("wheel", skip); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[200] grid place-items-center bg-forest-deep transition-opacity duration-[850ms]"
      style={{ opacity: out ? 0 : 1, pointerEvents: out ? "none" : "auto" }}
    >
      <div className="grain absolute inset-0" />
      <div className="relative text-center">
        <img
          src={sealCream} alt="Danmar Empire" width={400} height={400}
          className="mx-auto block"
          style={{
            width: 400, height: 400, objectFit: "contain", maxWidth: "76vw",
            animation: "sealIn 1.5s cubic-bezier(.16,.84,.44,1) both",
          }}
        />
        <div
          className="mt-4 font-display text-[19px] tracking-[.26em] text-paper/90 md:text-[22px]"
          style={{ animation: "sealIn 1.4s cubic-bezier(.16,.84,.44,1) .45s both" }}
        >
          INVEST WITH CONFIDENCE
        </div>
      </div>
      <style>{`@keyframes sealIn{
        from{opacity:0;transform:scale(.88);filter:blur(6px)}
        to{opacity:1;transform:none;filter:none}
      }`}</style>
    </div>
  );
}
