"use client";

import { useSite } from "./SiteShell";
import s from "./motion.module.css";

/** Opens the enquire drawer about one listing, with its reference prefilled.
 *  The only action an Off-Market row offers. */
export function EnquireLink({ listing, className = "", children }: { listing: { id: string; name: string }; className?: string; children: React.ReactNode }) {
  const { enquire } = useSite();
  return (
    <button type="button" onClick={() => enquire(listing)} className={`${s.tlink} meta text-forest ${className}`}>
      {children}
    </button>
  );
}
