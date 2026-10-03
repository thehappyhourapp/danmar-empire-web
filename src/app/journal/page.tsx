import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Journal } from "@/views/Journal";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("journal");
}

export default function Page() {
  return <Journal />;
}
