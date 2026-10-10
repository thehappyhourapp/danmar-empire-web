import type { Person } from "./data";

/** Names in TEAM are plain; degrees live in `postnominals`. splitName stays for any
 *  name that still carries designations after a comma. */
export function splitName(full: string): { name: string; designations: string } {
  const i = full.indexOf(",");
  return i < 0 ? { name: full, designations: "" } : { name: full.slice(0, i), designations: full.slice(i + 1).trim() };
}

export const roleLine = (p: Person) => (p.postnominals?.length ? `${p.role} · ${p.postnominals.join(" ")}` : p.role);
