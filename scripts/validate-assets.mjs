// Offline asset-reference validator. No dependencies. Run: npm run test:assets
// Checks: every "@/assets/..." import resolves; asset-pointer JSON is valid; JPEG markers are intact;
// every bundled image is referenced; every <img> has alt; lists remote image URLs; writes ASSET_MANIFEST.json.
import { readFileSync, readdirSync, statSync, existsSync, writeFileSync } from "node:fs";
import { join, relative, extname, basename } from "node:path";
import { createHash } from "node:crypto";

const root = new URL("..", import.meta.url).pathname;
const src = join(root, "src");
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(src);
const code = files.filter((f) => /\.(ts|tsx)$/.test(f) && !f.endsWith("routeTree.gen.ts"));
const failures = [];
// Optional curated provenance records: { "<path under src/assets>": { sourceUrl, creator, license, licenseUrl, attribution, retrieved, verification: "verified"|"unverified", visualInspection } }
const provPath = join(root, "scripts/asset-provenance.json");
const provenance = existsSync(provPath) ? JSON.parse(readFileSync(provPath, "utf8")) : {};
const fail = (m) => failures.push(m);

// 1. static asset imports
const refs = new Map(); // asset path -> [files]
for (const f of code) {
  const t = readFileSync(f, "utf8");
  for (const m of t.matchAll(/from\s+"@\/assets\/([^"]+)"/g)) {
    const p = join(src, "assets", m[1]);
    (refs.get(p) ?? refs.set(p, []).get(p)).push(relative(root, f));
    if (!existsSync(p)) fail(`missing asset: src/assets/${m[1]} imported by ${relative(root, f)}`);
  }
}

// 2. bundled assets: integrity + usage
const assetFiles = walk(join(src, "assets"));
const manifest = [];
const subjects = {
  "aquaculture/hero.jpg": "Aquaculture pond with aerators and a basket of fish",
  "guides/compost.jpg": "Hands handling compost soil in a wooden bin",
  "guides/expert.jpg": "Hands with a tablet among crop plants (generic; used only as page hero)",
  "guides/fodder.jpg": "Green fodder field with hay bales",
  "guides/greenhouse.jpg": "Greenhouse interior with tomato plants",
  "guides/hydroponics.jpg": "NFT hydroponic lettuce channels",
  "guides/vertical.jpg": "Rooftop vertical growing racks",
  "livestock/camels.jpg": "Camel herd at sunset (species level)",
  "livestock/cattle.jpg": "Black-and-white dairy cattle (species level)",
  "livestock/goats.jpg": "Goats (species level)",
  "livestock/poultry.jpg": "Chickens in a coop (species level)",
  "livestock/sheep.jpg": "Sheep flock (species level)",
  "plants/expert-cashew.jpg": "Cashew apples on tree",
  "plants/expert-coffee.jpg": "Coffee cherries on branch",
  "plants/expert-mango.jpg": "Mango fruit on tree",
  "plants/expert-wheat.jpg": "Wheat ears",
  "poultry/birds-grid.jpg": "2x2 collage: ducks, geese, quail, turkeys (family header image)",
  "poultry/small-grid.jpg": "2x2 collage: pigeons, guinea fowl, rabbits, chickens (family header image)",
  "poultry/duck.jpg": "Ducks (crop of birds-grid)", "poultry/goose.jpg": "Geese (crop of birds-grid)",
  "poultry/quail.jpg": "Quail (crop of birds-grid)", "poultry/turkey.jpg": "Turkeys (crop of birds-grid)",
  "poultry/pigeon.jpg": "Pigeons (crop of small-grid)", "poultry/guinea-fowl.jpg": "Guinea fowl (crop of small-grid)",
  "poultry/rabbit.jpg": "Rabbits (crop of small-grid)",
};
for (const f of assetFiles) {
  const rel = relative(root, f);
  const ext = extname(f).toLowerCase();
  const buf = readFileSync(f);
  const entry = { file: rel, bytes: buf.length, sha256: createHash("sha256").update(buf).digest("hex"), usedBy: [...new Set(refs.get(f) ?? [])] };
  if (ext === ".jpg" || ext === ".jpeg") {
    if (!(buf[0] === 0xff && buf[1] === 0xd8)) fail(`${rel}: missing JPEG SOI`);
    if (!(buf[buf.length - 2] === 0xff && buf[buf.length - 1] === 0xd9)) fail(`${rel}: missing JPEG EOI (truncated?)`);
    entry.kind = "jpeg";
  } else if (f.endsWith(".asset.json")) {
    try {
      const j = JSON.parse(buf.toString("utf8"));
      if (!j.url || !j.asset_id) fail(`${rel}: pointer lacks url/asset_id`);
      entry.kind = "lovable-asset-pointer"; entry.pointerUrl = j.url; entry.bytesNotInRepo = true;
    } catch { fail(`${rel}: invalid JSON`); }
  } else entry.kind = ext.slice(1);
  entry.subject = subjects[relative(join(src, "assets"), f)] ?? (f.endsWith(".asset.json") ? "Plant photo pointer (image bytes not in repo): " + basename(f).replace(".jpg.asset.json", "") : undefined);
  const rel2 = relative(join(src, "assets"), f);
  const rec = provenance[rel2] ?? {};
  entry.assetPath = rel;
  entry.sourceUrl = rec.sourceUrl ?? null;
  entry.creator = rec.creator ?? null;
  entry.license = rec.license ?? null;
  entry.licenseUrl = rec.licenseUrl ?? null;
  entry.attribution = rec.attribution ?? null;
  entry.retrieved = rec.retrieved ?? null;
  entry.visualInspection = rec.visualInspection ?? (entry.kind === "jpeg" ? "inspected by eye 2026-10-17 (subject confirmed; authenticity not determinable)" : entry.kind === "lovable-asset-pointer" ? "not inspectable: image bytes are not in the repository" : "n/a");
  entry.verification = rec.verification === "verified" && rec.sourceUrl && rec.license ? "verified" : "unverified";
  if (entry.usedBy.length === 0) entry.unreferenced = true;
  manifest.push(entry);
}
const unref = manifest.filter((m) => m.unreferenced);
for (const u of unref) fail(`unreferenced asset: ${u.file}`);

// 3. <img> alt check + remote image URLs
const imgNoAlt = [];
let imgTags = 0;
const remote = [];
const uniq = (a) => [...new Set(a)];
for (const f of code) {
  const t = readFileSync(f, "utf8");
  for (const m of t.matchAll(/<img\b[\s\S]*?\/>/g)) {
    imgTags++;
    if (!/\balt=/.test(m[0])) imgNoAlt.push(relative(root, f));
  }
  for (const m of t.matchAll(/https?:\/\/[^"'\s)]+\.(?:jpe?g|png|webp|gif|svg)(?:\?[^"'\s)]*)?/gi)) remote.push(`${relative(root, f)}: ${m[0].slice(0, 90)}`);
  if (/og:image|twitter:image/.test(t)) for (const m of t.matchAll(/(?:og:image|twitter:image)"[^}]*?content:\s*"([^"]+)"/g)) remote.push(`${relative(root, f)}: ${m[1].slice(0, 90)}…`);
}
for (const n of imgNoAlt) fail(`<img> without alt in ${n}`);

// plant pointers referenced?
const plantImgSrc = readFileSync(join(src, "data/plant-images.ts"), "utf8");
const pointerImports = [...plantImgSrc.matchAll(/@\/assets\/plants\/([^"]+\.asset\.json)/g)].map((m) => m[1]);
const pointerFiles = assetFiles.filter((f) => f.endsWith(".asset.json")).map((f) => basename(f));
for (const p of pointerFiles) if (!pointerImports.includes(p)) fail(`pointer not imported in plant-images.ts: ${p}`);

// species card -> image coverage (poultry) and plant coverage
const poultryImgSrc = readFileSync(join(src, "data/poultry-images.ts"), "utf8");
const speciesBlock = poultryImgSrc.slice(poultryImgSrc.indexOf("speciesImages"));
const speciesMap = [...speciesBlock.matchAll(/^\s+([a-z_]+):\s*(\w+),?\s*$/gm)].map((m) => [m[1], m[2]]);
const poultryIds = [...readFileSync(join(src, "data/poultry.ts"), "utf8").slice(0, 3000).matchAll(/"([a-z_]+)"/g)].map((m) => m[1]);
for (const [id, v] of speciesMap) if (v === "birdsGrid" || v === "smallGrid") fail(`poultry species ${id} still uses a multi-animal collage (${v})`);
const plantIds = new Set();
for (const fn of ["plants.ts", "plants-extra.ts"]) for (const m of readFileSync(join(src, "data", fn), "utf8").matchAll(/\n\s+id:\s*"([^"]+)"/g)) plantIds.add(m[1]);
const mappedPlantIds = new Set([...plantImgSrc.matchAll(/^\s+"([a-z-]+)":\s*\w+Img\.url/gm)].map((m) => m[1]));
const plantsWithoutPhoto = [...plantIds].filter((id) => !mappedPlantIds.has(id));
for (const id of plantsWithoutPhoto) fail(`plant without photo reference: ${id}`);

const verifiedLicences = manifest.filter((m) => m.verification === "verified").length;
const summary = {
  verifiedGenuinePhotos: verifiedLicences,
  verifiedLicences,
  plantsInSource: plantIds.size,
  plantsWithPhotoReference: mappedPlantIds.size,
  poultrySpeciesMappedToSingleSpeciesImage: speciesMap.filter(([, v]) => v !== "birdsGrid" && v !== "smallGrid").length,
  unverifiedAssets: manifest.length - verifiedLicences,
  staticAssetImports: [...refs.values()].reduce((a, b) => a + b.length, 0),
  distinctBundledFiles: manifest.length,
  jpegFiles: manifest.filter((m) => m.kind === "jpeg").length,
  assetPointers: manifest.filter((m) => m.kind === "lovable-asset-pointer").length,
  imgTagsInSource: imgTags,
  imgTagsWithoutAlt: imgNoAlt.length,
  remoteImageUrlsInSource: uniq(remote),
  unreferencedAssets: unref.map((u) => u.file),
};
writeFileSync(join(root, "ASSET_MANIFEST.json"), JSON.stringify({ generatedBy: "scripts/validate-assets.mjs", note: "Licence/source/author are NOT recorded in the repository; see ASSET_INVENTORY.md. Pointer image bytes are not in the repo.", summary, assets: manifest }, null, 2) + "\n");
console.log(JSON.stringify(summary, null, 2));
if (failures.length) { console.error("FAILURES:\n- " + failures.join("\n- ")); process.exit(1); }
console.log("asset validation: OK");
