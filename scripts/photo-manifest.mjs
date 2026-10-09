#!/usr/bin/env node
/* Writes src/lib/photo-manifest.json: every photograph under public/photos as a
   sorted array of "/photos/..." paths, README.md files and the fixture/ folder
   left out. photo() in src/lib/photos.ts tests membership in it, so whether a
   frame renders is decided at build time and never by reading the filesystem at
   request time (a Vercel function has no public/ folder). Runs as the npm
   "prebuild" script and at the end of scripts/photos.mjs.
   Run: node scripts/photo-manifest.mjs */
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join("public", "photos");
const OUT = join("src", "lib", "photo-manifest.json");
const IMAGE = /\.(jpe?g|png|webp|avif)$/i;

export function writePhotoManifest() {
  const found = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      if (name.startsWith(".")) continue;
      const p = join(dir, name);
      if (statSync(p).isDirectory()) { if (relative(ROOT, p) !== "fixture") walk(p); continue; }
      if (IMAGE.test(name)) found.push("/photos/" + relative(ROOT, p).split(sep).join("/"));
    }
  };
  walk(ROOT);
  found.sort();
  writeFileSync(OUT, JSON.stringify(found, null, 1) + "\n");
  console.log(`photo manifest: ${found.length} files -> ${OUT}`);
  return found;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) writePhotoManifest();
