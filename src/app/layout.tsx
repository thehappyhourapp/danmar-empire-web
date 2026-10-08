import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import "@/fonts.css";
import "./globals.css";
import { SiteShell } from "@/components/SiteShell";
import { getListings } from "@/lib/listings";
import { ORGANIZATION, SITE } from "@/lib/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#0F3B2F" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // the brokerage's active listings, for the saved drawer and the brief bar; [] when the feed is off
  const listings = await getListings();
  // The two faces the first viewport is set in. Italics load on demand.
  preload("/fonts/bodoni-moda.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/fonts/libre-franklin.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  return (
    <html lang="en-CA">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION).replace(/</g, "\\u003c") }} />
        <SiteShell listings={listings}>{children}</SiteShell>
      </body>
    </html>
  );
}
