/**
 * Generates PropertyPilot favicon assets from SVG source.
 * Run: node scripts/generate-favicons.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import toIco from "to-ico";

const ROOT = join(import.meta.dirname, "..");
const PUBLIC = join(ROOT, "public");
const SVG_PATH = join(ROOT, "scripts", "favicon-source.svg");

const svg = readFileSync(SVG_PATH);

async function png(size) {
  return sharp(svg, { density: 300 })
    .resize(size, size, { fit: "contain", background: "#2563eb" })
    .png()
    .toBuffer();
}

const png16 = await png(16);
const png32 = await png(32);
const png180 = await png(180);

writeFileSync(join(PUBLIC, "favicon-16x16.png"), png16);
writeFileSync(join(PUBLIC, "favicon-32x32.png"), png32);
writeFileSync(join(PUBLIC, "apple-touch-icon.png"), png180);
writeFileSync(join(PUBLIC, "favicon.ico"), await toIco([png16, png32]));

console.log("Generated public/favicon.ico");
console.log("Generated public/favicon-16x16.png");
console.log("Generated public/favicon-32x32.png");
console.log("Generated public/apple-touch-icon.png (180x180)");
