import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Relocating } from "@/views/Relocating";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("relocating");
}

export default function Page() {
  return <Relocating />;
}
