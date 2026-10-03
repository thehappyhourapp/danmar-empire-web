import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Track } from "@/views/Track";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("track");
}

export default function Page() {
  return <Track />;
}
