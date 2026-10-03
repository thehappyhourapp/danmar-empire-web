import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Collection } from "@/views/Collection";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("collection");
}

export default function Page() {
  return <Collection />;
}
