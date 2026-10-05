import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { sealCream } from "@/lib/marks";

/* The default share image: forest ground, the full seal in cream, and the
   wordmark in Bodoni Moda 500 (a static TTF instance, since Satori cannot
   read the variable woff2 the site uses). */

export const alt = "Danmar Empire";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const bodoni = await readFile(join(process.cwd(), "src/assets/og/bodoni-moda-500.ttf"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#0F3B2F" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={sealCream} width={260} height={260} alt="" />
        <div style={{ marginTop: 44, fontFamily: "Bodoni Moda", fontSize: 64, letterSpacing: "0.085em", color: "#EEE8E0" }}>DANMAR EMPIRE</div>
      </div>
    ),
    { ...size, fonts: [{ name: "Bodoni Moda", data: bodoni, weight: 500, style: "normal" }] },
  );
}
