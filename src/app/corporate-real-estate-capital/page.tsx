import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Capital } from "@/views/Capital";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("capital");
}

export default function Page() {
  return <Capital />;
}
