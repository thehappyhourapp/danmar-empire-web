import type { Metadata } from "next";
import Link from "next/link";
import { toMetadata } from "@/lib/metadata";
import { metaFor } from "@/lib/seo";
import { href } from "@/lib/routes";
import { Chapter } from "@/components/Chapter";
import s from "@/components/motion.module.css";

export const metadata: Metadata = { ...toMetadata(metaFor("notfound")), alternates: undefined, robots: { index: false, follow: true } };

/* The 404: cream, one headline, two ways back. Nothing animates. */
export default function NotFound() {
  return (
    <Chapter inner="min-h-[70svh] content-start pb-24 pt-[calc(var(--nav-h)_+_64px)] lg:pt-[calc(var(--nav-h)_+_96px)] lg:pb-40">
      <h1 className="col-span-12 max-w-[16ch] font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-medium leading-[1.02] tracking-[-.01em] lg:col-span-8">
        There is nothing at this address.
      </h1>
      <div className="col-span-12 mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-forest/14 pt-8 lg:mt-16">
        <Link href={href("home")} className={`${s.tlink} font-display text-[1.35rem] font-medium leading-tight text-forest`}>Home</Link>
        <Link href={href("collection")} className={`${s.tlink} font-display text-[1.35rem] font-medium leading-tight text-forest`}>The Collection</Link>
      </div>
    </Chapter>
  );
}
