#!/usr/bin/env node
/* Photo pipeline, first pass: photos-inbox/ (raw, gitignored) -> public/photos/
   (committed). People and offices only; listings, track and places are left
   alone. Idempotent: every run rewrites the same outputs from the same sources.

   people/<slug>/<any>.png|jpg  -> people/<slug>.jpg (800w) and <slug>@2x.jpg (1600w)
                                  4:5, cropped around the upper third of the frame
   offices/Oakville.jpg         -> offices/oakville.jpg   (16:10, 1600w)
   offices/Vaughan.jpg          -> offices/vaughan.jpg    (16:10, 1600w)

   sRGB, JPEG quality 82, metadata stripped. Run: node scripts/photos.mjs */

import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { basename, join } from "node:path";
import sharp from "sharp";

const IN = "photos-inbox";
const OUT = join("public", "photos");
const JPEG = { quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" };
const isImage = (f) => /\.(png|jpe?g|webp|tiff?|heic)$/i.test(f) && !f.startsWith(".");

/** A 4:5 crop whose vertical centre sits on the upper third of the source. */
function portraitCrop(w, h) {
  let cw = Math.min(w, Math.round(h * 0.8));
  let ch = Math.round(cw * 1.25);
  if (ch > h) { ch = h; cw = Math.round(h * 0.8); }
  const left = Math.round((w - cw) / 2);
  const top = Math.max(0, Math.min(h - ch, Math.round(h / 3 - ch / 2)));
  return { left, top, width: cw, height: ch };
}

async function person(slug, file) {
  const img = sharp(file).rotate();
  const { width, height } = await img.metadata();
  const region = portraitCrop(width, height);
  for (const [suffix, target] of [["", 800], ["@2x", 1600]]) {
    const out = join(OUT, "people", `${slug}${suffix}.jpg`);
    await sharp(file).rotate().extract(region).resize({ width: Math.min(target, region.width), withoutEnlargement: true })
      .toColourspace("srgb").jpeg(JPEG).toFile(out);
    console.log(`people/${slug}${suffix}.jpg  from ${basename(file)} ${width}x${height}, crop ${region.width}x${region.height}@${region.left},${region.top}`);
  }
}

async function office(src, name) {
  const img = sharp(src).rotate();
  const { width, height } = await img.metadata();
  const out = join(OUT, "offices", `${name}.jpg`);
  await sharp(src).rotate().resize({ width: 1600, height: 1000, fit: "cover", position: "centre", withoutEnlargement: false })
    .toColourspace("srgb").jpeg(JPEG).toFile(out);
  console.log(`offices/${name}.jpg  from ${basename(src)} ${width}x${height}`);
}

mkdirSync(join(OUT, "people"), { recursive: true });
mkdirSync(join(OUT, "offices"), { recursive: true });

const peopleDir = join(IN, "people");
if (existsSync(peopleDir)) {
  for (const slug of readdirSync(peopleDir).filter((d) => !d.startsWith(".") && statSync(join(peopleDir, d)).isDirectory())) {
    const files = readdirSync(join(peopleDir, slug)).filter(isImage).sort();
    if (!files.length) { console.log(`people/${slug}: no image, skipped`); continue; }
    if (files.length > 1) console.log(`people/${slug}: ${files.length} images, using ${files[0]}`);
    await person(slug, join(peopleDir, slug, files[0]));
  }
}

const OFFICES = { "Oakville.jpg": "oakville", "Vaughan.jpg": "vaughan" };
for (const [file, name] of Object.entries(OFFICES)) {
  const src = join(IN, "offices", file);
  if (existsSync(src)) await office(src, name); else console.log(`offices/${file}: missing, skipped`);
}
console.log("done");
