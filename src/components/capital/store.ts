"use client";

import { createContext, useContext } from "react";
import { PROPERTY_TYPES } from "@/lib/estimator";
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

export const CapitalCtx = createContext<Capital | null>(null);

export function useCapital() {
  const c = useContext(CapitalCtx);
  if (!c) throw new Error("useCapital outside CapitalProvider");
  return c;
}
