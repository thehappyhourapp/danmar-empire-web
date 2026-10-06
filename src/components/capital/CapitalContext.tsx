"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { DEFAULTS, PROPERTY_TYPES } from "@/lib/estimator";
import type { EstimatorInputs } from "@/lib/estimator";

/* Shared state for the capital page: the estimator's inputs, so the form can
   carry them as hidden fields, and the pre-fill the estimator hands the form
   when the visitor asks for a property-specific review. Nothing here is stored
   or sent until the form is submitted. */

export type PropertyType = (typeof PROPERTY_TYPES)[number];

export interface EstimatorState extends EstimatorInputs {
  type: PropertyType;
  location: string;
  /** the visitor changed something */
  touched: boolean;
}

export interface Prefill { type: PropertyType; location: string; band: string; at: number }

interface Capital {
  est: EstimatorState;
  setEst: (patch: Partial<EstimatorState>) => void;
  prefill: Prefill | null;
  requestReview: (p: Omit<Prefill, "at">) => void;
}

const Ctx = createContext<Capital | null>(null);

export function useCapital() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCapital outside CapitalProvider");
  return c;
}

export function CapitalProvider({ children }: { children: React.ReactNode }) {
  const [est, setState] = useState<EstimatorState>({ ...DEFAULTS, type: "Industrial", location: "Oakville", touched: false });
  const [prefill, setPrefill] = useState<Prefill | null>(null);
  const setEst = useCallback((patch: Partial<EstimatorState>) => setState((s) => ({ ...s, ...patch, touched: true })), []);
  const requestReview = useCallback((p: Omit<Prefill, "at">) => setPrefill({ ...p, at: Date.now() }), []);
  const value = useMemo(() => ({ est, setEst, prefill, requestReview }), [est, setEst, prefill, requestReview]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
