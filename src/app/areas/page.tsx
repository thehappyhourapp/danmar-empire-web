import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Areas } from "@/views/Areas";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("areas");
}

export default function Page() {
  return <Areas />;
}
