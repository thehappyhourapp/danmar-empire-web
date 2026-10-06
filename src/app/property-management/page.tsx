import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { PropertyManagement } from "@/views/PropertyManagement";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("property");
}

export default function Page() {
  return <PropertyManagement />;
}
