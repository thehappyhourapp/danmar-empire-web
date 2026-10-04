"use client";

import { useSite } from "./SiteShell";
import s from "./motion.module.css";

/** Save to shortlist as a text link. State lives in SiteShell and persists in
 *  localStorage; the SAVED counter in the nav reads the same set. */
export function SaveLink({ id, className = "" }: { id: string; className?: string }) {
  const { saved, toggleSave } = useSite();
  const on = saved.has(id);
  return (
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSave(id); }}
      aria-pressed={on}
      className={`${s.tlink} meta ${on ? `${s.tlinkOn} text-forest` : "text-ink/70 hover:text-forest"} ${className}`}
    >
      {on ? "Saved" : "Save"}
    </button>
  );
}
