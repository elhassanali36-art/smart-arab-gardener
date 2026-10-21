# ASSET_INVENTORY.md

Audit: 2026-10-17, offline. Method: scripts/validate-assets.mjs (executed) + visual review of every bundled JPEG + reading each render site.
Machine-readable list: `ASSET_MANIFEST.json` (regenerate with `npm run test:assets`).

## Headline status
- **Genuine, verified photographs: 0.** No image in the repo has a recorded source, author or licence, and nothing could be checked online. Every entry below is `provenance: unverified, license: unrecorded`.
- Several images look AI-generated or composited (see per group). They are described as "photographic-looking", never as "authentic".
- No cartoon/illustration imagery exists in the app (icons are Lucide). Emoji existed only as plant fallbacks and two list/avatar decorations (changed, see below).

## References audited: 75
57 static `@/assets` imports (31 plant pointers + 26 JPEG imports) · 11 `<img>` render sites (0 without alt) · 5 `heroImage` props (compost, greenhouse, hydroponics, fodder, vertical) · 2 remote meta-image URLs (og:image/twitter:image in `__root.tsx`, a temporary-looking `r2.dev` "id-preview" URL, unchanged). Plus 3 `PlantPhoto` call sites (plant-card, plant detail, account) that resolve through the 31 pointers.

## Bundled JPEGs (25 = 18 original + 7 new per-species crops)
| File | px | Subject (what the image actually shows) | Used by |
|---|---|---|---|
| `aquaculture/hero.jpg` | 1280×720 | Aquaculture pond with aerators and a basket of fish | routes/aquaculture.tsx |
| `guides/compost.jpg` | 1280×720 | Hands handling compost soil in a wooden bin | data/guide-images.ts |
| `guides/expert.jpg` | 1280×720 | Hands with a tablet among crop plants (generic; used only as page hero) | data/guide-images.ts |
| `guides/fodder.jpg` | 1280×720 | Green fodder field with hay bales | data/guide-images.ts |
| `guides/greenhouse.jpg` | 1280×720 | Greenhouse interior with tomato plants | data/guide-images.ts |
| `guides/hydroponics.jpg` | 1280×720 | NFT hydroponic lettuce channels | data/guide-images.ts |
| `guides/vertical.jpg` | 1280×720 | Rooftop vertical growing racks | data/guide-images.ts |
| `livestock/camels.jpg` | 768×768 | Camel herd at sunset (species level) | data/livestock-images.ts |
| `livestock/cattle.jpg` | 768×768 | Black-and-white dairy cattle (species level) | data/livestock-images.ts |
| `livestock/goats.jpg` | 768×768 | Goats (species level) | data/livestock-images.ts |
| `livestock/poultry.jpg` | 768×768 | Chickens in a coop (species level) | data/livestock-images.ts, data/poultry-images.ts |
| `livestock/sheep.jpg` | 768×768 | Sheep flock (species level) | data/livestock-images.ts |
| `plants/expert-cashew.jpg` | 1024×1024 | Cashew apples on tree | data/expert-plant-images.ts |
| `plants/expert-coffee.jpg` | 1024×1024 | Coffee cherries on branch | data/expert-plant-images.ts |
| `plants/expert-mango.jpg` | 1024×1024 | Mango fruit on tree | data/expert-plant-images.ts |
| `plants/expert-wheat.jpg` | 1024×1024 | Wheat ears | data/expert-plant-images.ts |
| `poultry/birds-grid.jpg` | 1536×1536 | 2x2 collage: ducks, geese, quail, turkeys (family header image) | data/poultry-images.ts |
| `poultry/duck.jpg` | 768×768 | Ducks (crop of birds-grid) | data/poultry-images.ts |
| `poultry/goose.jpg` | 768×768 | Geese (crop of birds-grid) | data/poultry-images.ts |
| `poultry/guinea-fowl.jpg` | 768×768 | Guinea fowl (crop of small-grid) | data/poultry-images.ts |
| `poultry/pigeon.jpg` | 768×768 | Pigeons (crop of small-grid) | data/poultry-images.ts |
| `poultry/quail.jpg` | 768×768 | Quail (crop of birds-grid) | data/poultry-images.ts |
| `poultry/rabbit.jpg` | 768×768 | Rabbits (crop of small-grid) | data/poultry-images.ts |
| `poultry/small-grid.jpg` | 1536×1536 | 2x2 collage: pigeons, guinea fowl, rabbits, chickens (family header image) | data/poultry-images.ts |
| `poultry/turkey.jpg` | 768×768 | Turkeys (crop of birds-grid) | data/poultry-images.ts |

Authenticity notes (visual, not proof): `livestock/*`, `guides/*`, `aquaculture/hero`, `plants/expert-*` are photoreal but uniformly polished; the `poultry/*-grid` collages and their crops have the look of generated images. **Treat all as possibly synthetic.** The 31 plant pointers (`*.asset.json`) reference Lovable-hosted bytes that are not in the ZIP, so their appearance could not be reviewed; `plant-images.ts` claims Wikimedia Commons but records no per-image licence/author.

## Replacements / fixes made now (11)
| # | Where | Before | After |
|---|---|---|---|
| 1-7 | Poultry page cards/flock rows/detail sheet + animal guide (duck, goose, quail, turkey, pigeon, guinea fowl, rabbit) | a whole 4-animal collage cropped by `object-cover`, so a "quail" or "turkey" card could show ducks/geese/rabbits | dedicated single-species crops (`poultry/<species>.jpg`) of the same bundled collages; originals kept for family headers |
| 8 | `/expert` result card | unknown plants got the generic "hands with tablet" photo captioned with the plant's name | neutral Sprout icon unless a matching plant photo exists |
| 9 | `PlantPhoto` fallback | emoji | Lucide Sprout |
| 10 | `/account` avatar | emoji 🌱 | Lucide Leaf |
| 11 | plant detail "harvest signs" list | emoji 🌾 bullets | CSS dot |

Still present, not imagery in changed components: `emoji` data fields (`plants.ts`, `plants-extra.ts`, `livestock.ts`), a 👋 greeting string (`i18n.tsx`), ⚠ in `aquaculture.tsx`.

## Subjects that still need genuine, licensed photographs
| Page / component | Subject | Current state |
|---|---|---|
| `/livestock`, `/poultry`, animal guide | cattle, sheep, goats, camels, chickens | one provenance-unknown, species-level image each (no breed photos) |
| animal guide (33 breeds, 11 types) | every breed (8 cattle, 3 sheep, 3 goats, 2 camel, 2 buffalo, 2 horse, 3 rabbit, 4 chicken, 2 quail, 2 pigeon, 2 turkey) | no breed photos; shown at type level only |
| animal guide | buffalo, horses | no image at all (paw icon) |
| `/poultry` | duck, goose, quail, turkey, pigeon, guinea fowl, rabbit | crops of unverified collages |
| `/aquaculture` species list | vannamei shrimp, macrobrachium, mud crab, lobster, tilapia, catfish, carp, seabream, crayfish, oyster | none (only the page hero) |
| `/expert` | any plant other than the 31 catalogued + mango, cashew, coffee, wheat | icon placeholder |
| plant disease / pest pages | diseases, pests | no imagery exists |
| guide heroes | compost, greenhouse, hydroponics, vertical, fodder, expert | unverified provenance |
| `__root.tsx` | og:image / twitter:image | remote preview URL; needs a permanent local/hosted image |
| Sensors, weather stations, irrigation, farm equipment, farmers | n/a | the app has no such screens or imagery |

## Blocked
Downloading licensed photos (Wikimedia Commons, Unsplash, Pexels, FAO/CGIAR) needs internet access. Nothing was downloaded or fabricated. When online, record for each replacement: source URL, author, licence + URL, retrieval date, and update this file and `ASSET_MANIFEST.json`.

---
## Pass 3 status (2026-10-17) — counts from `npm run test:assets` and source
| Metric | Value |
|---|---|
| References audited | 75 (57 imports, 11 `<img>`, 5 hero props, 2 remote meta URLs) |
| Verified genuine photographs | **0** |
| Verified licences (sourceUrl + licence recorded and flagged verified) | **0** (`scripts/asset-provenance.json` is intentionally empty) |
| Assets with unverified provenance | 56 (25 JPEG + 31 pointers) |
| New replacements this pass | 0 (the 11 from pass 2 stand; they re-use unverified bundled images) |
| Plant photo references / plants in source | 31 / 31 (bytes not in repo; **not visually inspected** — fetching the published app was refused by the tool, and the sandbox has no network) |
| Poultry/rabbit species mapped to a single-species image | 11 / 11 |
| Animal catalogue (source) | 11 types, 33 breeds (buffalo 2, horses 2), 22 type-level disease entries — 0 breed/disease photos |
| Aquaculture species in source / with a photo | 10 / 0 |
| Plant pests | listed as text in all 31 plants; 0 pest/disease images |
| Social-share images | 1 remote preview URL (pair of meta tags) |
| Missing-photo subject groups | 33 breeds, buffalo, horses, 10 aquaculture species, disease/pest imagery (animal and plant), plants outside the 35 mapped on `/expert`, 1 permanent social-share image |
| Subjects whose only image is of unverified provenance | 5 livestock categories, 7 poultry/rabbit crops, 6 guide heroes, 1 aquaculture hero, 4 expert plants, 31 plants |

`ASSET_MANIFEST.json` now carries, per asset: `assetPath`, `sourceUrl`, `creator`, `license`, `licenseUrl`, `attribution`, `retrieved`, `visualInspection`, `verification` (all provenance fields `null` / `unverified` until recorded).
How to finish when online: for each photo you approve, save it under `src/assets/...`, add its record to `scripts/asset-provenance.json` (source URL, creator, licence + URL, attribution, retrieval date, `verification: "verified"`), run `npm run test:assets`, then update the table above. Never mark a record verified from a thumbnail or filename.

