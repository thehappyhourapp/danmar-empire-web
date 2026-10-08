import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getListing, getListings } from "@/lib/listings";
import { detailMetadata } from "@/lib/metadata";
import { propertyHref } from "@/lib/routes";
import { Property } from "@/views/Property";

type Props = { params: Promise<{ slug: string }> };

/* Listing pages are built from the feed at build time and on demand after it, and
   re-rendered at most once an hour, so a withdrawn listing drops within the hour.
   A slug the feed no longer carries is a 404. */
// Next needs a literal here; it mirrors REVALIDATE in src/lib/proptx.ts
export const revalidate = 3600;
export const dynamicParams = true;
export async function generateStaticParams() {
  const listings = await getListings();
  return listings.map((l) => ({ slug: l.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const l = await getListing(slug);
  if (!l) return {};
  const where = [l.region, l.city].filter(Boolean).join(", ");
  const base = detailMetadata("collection", l.addressWithheld ? `${l.kind} in ${where}` : `${l.name}, ${where}`, (l.standfirst || l.body[0] || "").slice(0, 160), propertyHref(l.id));
  // the feed's licence forbids providing its data to AI systems
  return { ...base, other: { robots: "noai, noimageai" } };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const l = await getListing(slug);
  if (!l) notFound();
  const all = await getListings();
  return <Property l={l} all={all} />;
}
