import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Contact } from "@/views/Contact";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("contact");
}

export default function Page() {
  return <Contact />;
}
