import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Privacy } from "@/views/Privacy";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("privacy");
}

export default function Page() {
  return <Privacy />;
}
