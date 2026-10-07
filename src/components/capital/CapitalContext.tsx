"use client";

import { useCallback, useMemo, useState } from "react";
import { DEFAULTS } from "@/lib/estimator";
import { CapitalCtx } from "./store";
import type { EstimatorState, Prefill } from "./store";

export function CapitalProvider({ children }: { children: React.ReactNode }) {
  const [est, setState] = useState<EstimatorState>({ ...DEFAULTS, type: "Industrial", location: "Oakville", touched: false });
  const [prefill, setPrefill] = useState<Prefill | null>(null);
  const setEst = useCallback((patch: Partial<EstimatorState>) => setState((s) => ({ ...s, ...patch, touched: true })), []);
  const requestReview = useCallback((p: Omit<Prefill, "at">) => setPrefill({ ...p, at: Date.now() }), []);
  const value = useMemo(() => ({ est, setEst, prefill, requestReview }), [est, setEst, prefill, requestReview]);
  return <CapitalCtx.Provider value={value}>{children}</CapitalCtx.Provider>;
}
