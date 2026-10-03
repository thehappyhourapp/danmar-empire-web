import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TEAM } from "@/lib/data";
import { detailMetadata } from "@/lib/metadata";
import { personHref } from "@/lib/routes";
import { Person } from "@/views/Person";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return TEAM.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = TEAM.find((x) => x.slug === slug);
  if (!p) return {};
  return detailMetadata("firm", `${p.name}, ${p.role}`, p.line, personHref(p.slug));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const p = TEAM.find((x) => x.slug === slug);
  if (!p) notFound();
  return <Person p={p} />;
}
