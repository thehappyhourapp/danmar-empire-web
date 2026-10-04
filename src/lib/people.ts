import type { Person } from "./data";

/** TEAM stores designations inside the name ("Martin Sheikhan, PMP"). The pages
 *  set the name in Bodoni and the designations as .meta, so they come apart here. */
export function splitName(full: string): { name: string; designations: string } {
  const i = full.indexOf(",");
  return i < 0 ? { name: full, designations: "" } : { name: full.slice(0, i), designations: full.slice(i + 1).trim() };
}

export const roleLine = (p: Person) => {
  const { designations } = splitName(p.name);
  return designations ? `${p.role} · ${designations}` : p.role;
};
