import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Firm } from "@/views/Firm";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("firm");
}

export default function Page() {
  return <Firm />;
}
