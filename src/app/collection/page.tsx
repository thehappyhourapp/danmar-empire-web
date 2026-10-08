import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Collection } from "@/views/Collection";

/* Re-rendered at most once an hour: the licence's cadence for reading the feed. */
// Next needs a literal here; it mirrors REVALIDATE in src/lib/proptx.ts
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("collection");
}

export default function Page() {
  return <Collection />;
}
