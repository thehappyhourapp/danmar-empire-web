"use client";

import { useEffect, useState } from "react";

/** Prototype-only control. Lets Daniel see each display face on the real site
 *  rather than on a specimen sheet. Not shipped to production. */
const FACES: { id: string; label: string; stack: string; note: string }[] = [
  { id: "bodoni", label: "Bodoni Moda", stack: "'Bodoni Moda', 'Bodoni Moda Fallback', Georgia, serif", note: "Bauer Bodoni lineage" },
  { id: "gilda", label: "Gilda Display", stack: "'Gilda Display', Georgia, serif", note: "Warmer, sturdier hairlines" },
  { id: "cinzel", label: "Cinzel", stack: "'Cinzel', Georgia, serif", note: "Roman inscriptional" },
  { id: "marcellus", label: "Marcellus", stack: "'Marcellus', Georgia, serif", note: "Inscriptional with lowercase" },
  { id: "prata", label: "Prata", stack: "'Prata', Georgia, serif", note: "Didone, thicker strokes" },
  { id: "cormorant", label: "Cormorant", stack: "'Cormorant Garamond', Georgia, serif", note: "Refined old-style" },
];

/* Only the prototype-only alternates come from a CDN. Bodoni Moda and Libre Franklin,
   the brand faces, are embedded in src/fonts.css and never loaded this way. */
const ALTERNATES = "https://fonts.googleapis.com/css2?family=Gilda+Display&family=Cinzel:wght@400;500;600&family=Marcellus&family=Prata&family=Cormorant+Garamond:wght@400;500;600&display=swap";

export function TypeSwitch() {
  const [open, setOpen] = useState(false);
  const [face, setFace] = useState("bodoni");

  useEffect(() => {
    if (document.querySelector(`link[href="${ALTERNATES}"]`)) return;
    const l = document.createElement("link");
    l.rel = "stylesheet"; l.href = ALTERNATES;
    document.head.appendChild(l);
  }, []);

  useEffect(() => {
    const f = FACES.find((x) => x.id === face)!;
    document.documentElement.style.setProperty("--display-face", f.stack);
  }, [face]);

  return (
    <div className="fixed bottom-5 left-5 z-[120] print:hidden">
      {open && (
        <div className="mb-2 w-[218px] border border-forest/25 bg-paper p-1 shadow-2xl">
          {FACES.map((f) => (
            <button key={f.id} onClick={() => setFace(f.id)}
              className={`block w-full px-3 py-2.5 text-left transition-colors ${face === f.id ? "bg-forest text-paper" : "hover:bg-paper-deep"}`}>
              <span className="block text-[15px]" style={{ fontFamily: f.stack }}>{f.label}</span>
              <span className={`meta mt-1 block ${face === f.id ? "text-paper/60" : "text-mute"}`}>{f.note}</span>
            </button>
          ))}
        </div>
      )}
      <button onClick={() => setOpen((o) => !o)}
        className="meta border border-forest/25 bg-paper px-4 py-2.5 text-forest shadow-lg transition-colors hover:bg-forest hover:text-paper">
        Type · {FACES.find((f) => f.id === face)!.label}
      </button>
    </div>
  );
}
