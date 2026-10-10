import type { Person } from "@/lib/data";

/** Degrees beside a name, smaller and lighter than the name: Libre Franklin 400 at
 *  about two fifths of the heading size, never a lighter Bodoni. */
export function PostNominals({ p, className = "" }: { p: Person; className?: string }) {
  if (!p.postnominals?.length) return null;
  // a plain space at the heading's size, not a margin, so a wrapped line starts flush
  return (
    <>
      {" "}
      <span className={`inline-block whitespace-nowrap pl-1 align-baseline font-sans text-[0.42em] font-normal tracking-[0.06em] ${className}`}>
        {p.postnominals.join("\u2002")}
      </span>
    </>
  );
}
