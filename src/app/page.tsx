import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Home } from "@/views/Home";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("home");
}

export default function Page() {
  return <Home />;
}
