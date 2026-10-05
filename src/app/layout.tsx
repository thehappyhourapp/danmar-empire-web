import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import "@/fonts.css";
import "./globals.css";
import { SiteShell } from "@/components/SiteShell";
import { ORGANIZATION, SITE } from "@/lib/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#0F3B2F" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // The two faces the first viewport is set in. Italics load on demand.
  preload("/fonts/bodoni-moda.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/fonts/libre-franklin.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  return (
    <html lang="en-CA">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION).replace(/</g, "\\u003c") }} />
        {/* scroll reveals start hidden on the server; without JS, show everything */}
        <noscript><style>{`.rv{opacity:1!important;transform:none!important}`}</style></noscript>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
