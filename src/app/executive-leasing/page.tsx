import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Leasing } from "@/views/Leasing";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("leasing");
}

export default function Page() {
  return <Leasing />;
}
