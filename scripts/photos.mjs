#!/usr/bin/env node
/* Photo pipeline, first pass: photos-inbox/ (raw, gitignored) -> public/photos/
   (committed). People and offices only; listings, track and places are left
   alone. Idempotent: every run rewrites the same outputs from the same sources.

   people/<slug>/<any>.png|jpg  -> people/<slug>.jpg (800w) and <slug>@2x.jpg (1600w)
                                  4:5, cropped around the upper third of the frame
   offices/Oakville.jpg         -> offices/oakville.jpg   (16:10, 1600w)
   offices/Vaughan.jpg          -> offices/vaughan.jpg    (16:10, cropped to leave out the
                                  watermark and the tenant's sign, at the crop's own width)
   software/<name>.jpg          -> app/<name>.jpg (16:10 taken from the top so the header
                                  stays, 1400w at most, never upscaled)
   places/<area>/<chosen file>  -> places/<slug>.jpg and <slug>-800.jpg (16:10, 1600w and
                                  800w), plus <slug>-2.jpg where a strong second exists;
                                  the choice per area is the PLACES table below
   practices/<folder>/<chosen>  -> practices/<slug>.jpg, <slug>-800.jpg and, for a second
                                  frame, <slug>-2.jpg and <slug>-2-800.jpg (16:10); the
                                  PRACTICE_PHOTOS table below

   sRGB, JPEG quality 82, metadata stripped. Run: node scripts/photos.mjs */

import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { basename, join } from "node:path";
import sharp from "sharp";
import { writePhotoManifest } from "./photo-manifest.mjs";

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

/** A 16:10 export. With a crop rectangle the output keeps the crop's own width
 *  (never upscaled); without one the whole frame is covered to 1600w. */
async function office(src, name, crop) {
  const img = sharp(src).rotate();
  const { width, height } = await img.metadata();
  const out = join(OUT, "offices", `${name}.jpg`);
  let pipe = sharp(src).rotate();
  if (crop) pipe = pipe.extract(crop).resize({ width: Math.min(1600, crop.width), withoutEnlargement: true });
  else pipe = pipe.resize({ width: 1600, height: 1000, fit: "cover", position: "centre", withoutEnlargement: false });
  await pipe.toColourspace("srgb").jpeg(JPEG).toFile(out);
  console.log(`offices/${name}.jpg  from ${basename(src)} ${width}x${height}${crop ? `, crop ${crop.width}x${crop.height}@${crop.left},${crop.top}` : ""}`);
}

/** A screenshot of the reporting platform: 16:10 anchored at the top of the
 *  frame so the header survives, at most 1400w, never upscaled, EXIF dropped. */
async function screen(src, name) {
  const { width, height } = await sharp(src).metadata();
  let cw = width, ch = Math.round(width * 0.625);
  if (ch > height) { ch = height; cw = Math.round(height * 1.6); }
  const region = { left: Math.round((width - cw) / 2), top: 0, width: cw, height: ch };
  const out = join(OUT, "app", `${name}.jpg`);
  await sharp(src).extract(region).resize({ width: Math.min(1400, cw), withoutEnlargement: true })
    .toColourspace("srgb").jpeg(JPEG).toFile(out);
  console.log(`app/${name}.jpg  from ${basename(src)} ${width}x${height}, crop ${cw}x${ch}@${region.left},0`);
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

/* Vaughan: the source carries a watermark in its lower right corner and a tenant's
   sign on the left bay; the crop keeps the entrance and the 9131 tower and leaves
   both out. */
const OFFICES = { "Oakville.jpg": ["oakville"], "Vaughan.jpg": ["vaughan", { left: 640, top: 180, width: 1408, height: 880 }] };
for (const [file, [name, crop]] of Object.entries(OFFICES)) {
  const src = join(IN, "offices", file);
  if (existsSync(src)) await office(src, name, crop); else console.log(`offices/${file}: missing, skipped`);
}

/** A 16:10 landscape export at the given widths, centre crop, never upscaled. */
async function landscape(src, outBase, widths) {
  const { width, height } = await sharp(src).rotate().metadata();
  let cw = width, ch = Math.round(width * 0.625);
  if (ch > height) { ch = height; cw = Math.round(height * 1.6); }
  const region = { left: Math.round((width - cw) / 2), top: Math.round((height - ch) / 2), width: cw, height: ch };
  for (const [suffix, w] of widths) {
    await sharp(src).rotate().extract(region).resize({ width: Math.min(w, cw), withoutEnlargement: true })
      .toColourspace("srgb").jpeg(JPEG).toFile(`${outBase}${suffix}.jpg`);
  }
  console.log(`${outBase.replace(OUT + "/", "")}.jpg  from ${basename(src)} ${width}x${height}, crop ${cw}x${ch}`);
}

/* Place photographs: the chosen frame per area, by judgement on 9 Oct 2026 (exterior,
   daylight, no people, no plates, no other firm's signage, landscape, sharp). Vaughan has
   no usable frame in the inbox (both are of a theme park), so it reuses the office crop. */
const PLACES = {
  oakville: ["oakville-dude-n09MJayeeWw-unsplash.jpg", "jason-ng-s9KUrz3wfxc-unsplash.jpg"],
  toronto: ["marcin-skalij-AhmLdXl_azU-unsplash.jpg", "white-rainforest-5Sd2SUCaPWs-unsplash.jpg"],
  niagara: ["wendy-shervington-QSVr4Gu1hFM-unsplash.jpg", "bianca-ackermann-KslJIer2IPA-unsplash.jpg"],
  muskoka: ["alex-makarov-aewB2HOSL3g-unsplash.jpg", "april-barber-M4RVCkMpb1I-unsplash.jpg"],
  mississauga: ["scott-webb-jAnIMsABjEA-unsplash.jpg", "mark-ashford-Rqth2xRNRyY-unsplash.jpg"],
};
mkdirSync(join(OUT, "places"), { recursive: true });
for (const [slug, files] of Object.entries(PLACES)) {
  for (const [i, f] of files.entries()) {
    const src = join(IN, "places", slug, f);
    if (!existsSync(src)) { console.log(`places/${slug}/${f}: missing, skipped`); continue; }
    await landscape(src, join(OUT, "places", i === 0 ? slug : `${slug}-2`), i === 0 ? [["", 1600], ["-800", 800]] : [["", 1600]]);
  }
}
{
  const src = join(IN, "offices", "Vaughan.jpg");
  if (existsSync(src)) {
    const crop = { left: 640, top: 180, width: 1408, height: 880 };
    for (const [suffix, w] of [["", 1600], ["-800", 800]]) await sharp(src).rotate().extract(crop).resize({ width: Math.min(w, crop.width), withoutEnlargement: true }).toColourspace("srgb").jpeg(JPEG).toFile(join(OUT, "places", `vaughan${suffix}.jpg`));
    console.log("places/vaughan.jpg  from offices/Vaughan.jpg (the office crop)");
  }
}

/* Practice-page scenes: AI-generated illustrations Daniel supplied (image-catalog.json in
   photos-inbox/practices/). The opening frame first, then the page's second frame where it
   has one. Chosen for reading most like Ontario and least like a render; -v2 colour grades
   preferred over their originals. Each becomes <slug>.jpg (the source's own width, at most
   1600, never upscaled) and <slug>-800.jpg; a second image becomes <slug>-2.jpg and
   <slug>-2-800.jpg. */
const PRACTICE_PHOTOS = {
  investments: ["investments/big-box-retail-plaza.png"],
  "asset-management": ["asset-management/asset-management-v2.png", "asset-management/courtyard-rental-community.png"],
  "executive-leasing": ["executive-leasing/executive-kitchen-and-dining.png", "executive-leasing/executive-leasing.png"],
  "property-management": ["property-management/property-management-v2.png", "asset-management/courtyard-rental-community.png"],
  "corporate-real-estate-capital": ["corporate-real-estate-capital/logistics-and-industrial.png", "corporate-real-estate-capital/corporate-real-estate-capital-v2.png"],
  relocating: ["relocating/lakeside-neighbourhood.png"],
};
mkdirSync(join(OUT, "practices"), { recursive: true });
for (const [slug, files] of Object.entries(PRACTICE_PHOTOS)) {
  for (const [i, rel] of files.entries()) {
    const src = join(IN, "practices", rel);
    if (!existsSync(src)) { console.log(`practices/${rel}: missing, skipped`); continue; }
    await landscape(src, join(OUT, "practices", i === 0 ? slug : `${slug}-2`), [["", 1600], ["-800", 800]]);
  }
}

mkdirSync(join(OUT, "app"), { recursive: true });
for (const name of ["dashboard", "properties", "reports"]) {
  const src = join(IN, "software", `${name}.jpg`);
  if (existsSync(src)) await screen(src, name); else console.log(`software/${name}.jpg: missing, skipped`);
}
// the frames read this list, not the filesystem
writePhotoManifest();
console.log("done");
