import type { Metadata, Viewport } from "next";
import "@/fonts.css";
import "./globals.css";
import { SiteShell } from "@/components/SiteShell";
import { SITE } from "@/lib/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#0F3B2F" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA">
      <body>
        {/* scroll reveals start hidden on the server; without JS, show everything */}
        <noscript><style>{`.rv{opacity:1!important;transform:none!important}`}</style></noscript>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
