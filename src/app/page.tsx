import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Home } from "@/views/Home";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("home");
}

/* KNOWN VIOLATION: the current chapter order in src/views/Home.tsx alternates
   forest and cream about five times. The Design DNA in CLAUDE.md allows Home exactly
   two temperature cuts (forest hero, cut to cream, cut back to forest, then the
   footer). Left as-is on purpose: Home is rebuilt in the Home design pass, so
   restructuring it now would mean doing it twice. */
export default function Page() {
  return <Home />;
}
