import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Management } from "@/views/Management";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("management");
}

export default function Page() {
  return <Management />;
}
