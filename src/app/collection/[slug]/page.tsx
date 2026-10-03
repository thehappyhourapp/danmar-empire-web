import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LISTINGS } from "@/lib/data";
import { detailMetadata } from "@/lib/metadata";
import { propertyHref } from "@/lib/routes";
import { Property } from "@/views/Property";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return LISTINGS.map((l) => ({ slug: l.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const l = LISTINGS.find((x) => x.id === slug);
  if (!l) return {};
  return detailMetadata("collection", `${l.name}, ${l.region}, ${l.city}`, l.standfirst, propertyHref(l.id));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const l = LISTINGS.find((x) => x.id === slug);
  if (!l) notFound();
  return <Property l={l} />;
}
