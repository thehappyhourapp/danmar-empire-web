#!/usr/bin/env node
/* Favicon and app icons from the brand emblem (the building mark alone, cream),
   set on a forest square. Writes public/favicon.svg, public/icon.png (512) and
   public/apple-icon.png (180). Run: node scripts/icons.mjs */
import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const marks = readFileSync("src/lib/marks.ts", "utf8");
const b64 = marks.match(/emblemCream = "data:image\/svg\+xml;base64,([^"]+)"/)[1];
const inner = Buffer.from(b64, "base64").toString("utf8");
const vb = inner.match(/viewBox="([^"]+)"/)[1];
const [, , vw, vh] = vb.split(/\s+/).map(Number);
const body = inner.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");

const S = 64, H = 42, W = (H * vw) / vh; // the mark on 66% of the square's height
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">` +
  `<rect width="${S}" height="${S}" fill="#0F3B2F"/>` +
  `<svg x="${((S - W) / 2).toFixed(3)}" y="${((S - H) / 2).toFixed(3)}" width="${W.toFixed(3)}" height="${H}" viewBox="${vb}" preserveAspectRatio="xMidYMid meet">${body}</svg></svg>`;
writeFileSync("public/favicon.svg", svg);
for (const [file, size] of [["public/icon.png", 512], ["public/apple-icon.png", 180]]) {
  await sharp(Buffer.from(svg), { density: 600 }).resize(size, size).flatten({ background: "#0F3B2F" }).png({ compressionLevel: 9 }).toFile(file);
  console.log(file, size);
}
console.log("public/favicon.svg", svg.length, "bytes");
