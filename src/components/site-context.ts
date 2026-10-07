"use client";

import { createContext, useContext } from "react";
import type { Query } from "@/lib/parse";
import type { ListingRef } from "./EnquiryForm";

/* Visit-level state that used to live in App.tsx. It sits in the root layout, so it
   survives client-side navigation between routes exactly as it did in the SPA. */
interface Site {
  saved: Set<string>;
  toggleSave: (id: string) => void;
  enquire: (listing?: ListingRef) => void;
  requestAccess: () => void;
  q: Query; setQ: (q: Query) => void;
  text: string; setText: (s: string) => void;
  search: (q: Query, t: string) => void;
}

export const SiteCtx = createContext<Site | null>(null);
export function useSite() {
  const s = useContext(SiteCtx);
  if (!s) throw new Error("useSite outside SiteShell");
  return s;
}
