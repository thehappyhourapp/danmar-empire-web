import { money } from "@/lib/estimator";
import c from "./capital.module.css";

/* Two horizontal bars on one shared scale. The track is forest-deep, the fill
   paper, the figure brass. No hooks, so the illustrative example renders it on
   the server and the estimator on the client. */

export interface BarRow { label: string; value: number; note?: string }

export function Bars({ rows, ariaLabel }: { rows: BarRow[]; ariaLabel: string }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <div role="group" aria-label={ariaLabel} className="space-y-8">
      {rows.map((r) => (
        <div key={r.label}>
          <p className="flex items-baseline justify-between gap-6">
            <span className="meta text-paper/70">{r.label}</span>
            <span className="fig text-[clamp(1.5rem,2.2vw,2rem)] leading-none text-brass-light tabular-nums">{money(r.value)}</span>
          </p>
          <div aria-hidden className="mt-3 h-4 w-full bg-forest-deep">
            <div className={`${c.bar} h-full w-full bg-paper`} style={{ transform: `scaleX(${r.value / max})` }} />
          </div>
          {r.note && <p className="meta mt-3 text-paper/70">{r.note}</p>}
        </div>
      ))}
    </div>
  );
}
