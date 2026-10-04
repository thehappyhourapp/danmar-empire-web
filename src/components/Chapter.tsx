import s from "./motion.module.css";

/* Page primitives for inner pages: the drawn 12-column grid, a line-mask
   heading, and a cream chapter that holds both. Server components; the motion
   classes they emit are inert until MotionController switches them on. */

export const GRID = "grid grid-cols-12 gap-x-4 md:gap-x-8";
export const HEAD = "font-display font-medium text-[clamp(2.1rem,4.8vw,3.75rem)] leading-[1] tracking-[-.01em]";
export const delay = (i: number) => ({ ["--d" as string]: `${Math.min(i, 3) * 120}ms` }) as React.CSSProperties;

/** The drawn 12-column grid, forest/6 on cream. Column lines run the chapter's full height. */
export function GridLines({ tone = "cream" }: { tone?: "cream" | "dark" }) {
  const rule = tone === "cream" ? "border-forest/6" : "border-paper/5";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-y-0 left-4 right-4 z-0 md:left-12 md:right-12">
      <div className={`${GRID} h-full border-r ${rule}`}>
        {Array.from({ length: 12 }, (_, i) => <div key={i} className={`border-l ${rule}`} />)}
      </div>
    </div>
  );
}

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

/** A cream chapter with the grid drawn behind it. Inner pages hold one ground. */
export function Chapter({ className = "", inner = "", children }: { className?: string; inner?: string; children: React.ReactNode }) {
  return (
    <section className={`${s.chapter} bg-paper text-ink ${className}`}>
      <div className="relative mx-auto max-w-[1440px]">
        <GridLines />
        <div className={`relative z-10 px-4 md:px-12 ${GRID} ${inner}`}>{children}</div>
      </div>
    </section>
  );
}
