import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Investments } from "@/views/Investments";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("investments");
}

export default function Page() {
  return <Investments />;
}
