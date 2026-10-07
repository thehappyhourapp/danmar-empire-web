import { GRID } from "@/lib/layout";
import s from "./motion.module.css";

/* Page primitives for inner pages: the 12-column layout grid (a layout system;
   nothing is drawn), a line-mask heading, and the chapter that holds them. Server components; the motion
   classes they emit are inert until MotionController switches them on. */

/** A heading set one authored line per mask box, so each line rises on its own. */
export function Lines({ lines, as = "h2", className = "" }: { lines: string[]; as?: "h1" | "h2" | "h3" | "p"; className?: string }) {
  const Tag = as;
  return (
    <Tag className={`${s.mask} ${className}`} data-reveal>
      {lines.map((line, i) => (
        <span key={line} className={s.line}>
          <span style={{ ["--i" as string]: i } as React.CSSProperties}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

/** A chapter on the 12-column layout grid. Inner pages hold one ground for the whole page. */
export function Chapter({ tone = "cream", className = "", inner = "", children }: { tone?: "cream" | "forest"; className?: string; inner?: string; children: React.ReactNode }) {
  return (
    <section className={`${s.chapter} ${tone === "forest" ? `bg-forest text-paper ${s.dark}` : "bg-paper text-ink"} ${className}`}>
      <div className="relative mx-auto max-w-[1440px]">
        <div className={`relative z-10 px-4 md:px-12 ${GRID} ${inner}`}>{children}</div>
      </div>
    </section>
  );
}
