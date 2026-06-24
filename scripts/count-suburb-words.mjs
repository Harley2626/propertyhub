import fs from "node:fs";

const slugs = ["somerset-west", "durbanville", "blouberg", "sea-point"];

function countWords(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function extractStrings(src) {
  const strings = [];
  const re = /"(?:\\.|[^"\\])*"/g;
  let match;
  while ((match = re.exec(src)) !== null) {
    const value = match[0].slice(1, -1);
    if (
      value.includes("kind:") ||
      value.includes("slug:") ||
      value.endsWith(".ts") ||
      value.match(/^[a-z-]+$/) &&
        value.length < 20 &&
        !value.includes(" ")
    ) {
      continue;
    }
    strings.push(value);
  }
  return strings.join(" ");
}

for (const slug of slugs) {
  const src = fs.readFileSync(`lib/areas/content/${slug}.ts`, "utf8");
  const bodyStart = src.indexOf("overview:");
  const bodyEnd = src.lastIndexOf("faqs:");
  const body = src.slice(bodyStart, bodyEnd);
  const words = countWords(extractStrings(body));
  console.log(`${slug}: ${words} words`);
}
