import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Terms } from "@/views/Terms";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("terms");
}

export default function Page() {
  return <Terms />;
}
