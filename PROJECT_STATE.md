# PROJECT_STATE.md

Project: المزارع الذكي (08) — Lovable project `88feb0f3-4bdd-4a74-97aa-9131006ccbfa`; GitHub repo reported by owner: `elhassanali36-art/smart-arab-gardener`.
Last updated: 2026-10-17 (Claude, offline sandbox from the ZIP export). History below is **reconstructed**, not recorded by the project.

## Stack (from source)
TanStack Start + React 19 + Vite, Tailwind 4, Supabase (auth + data, publishable keys in `.env`), Drizzle migrations (`animals`, `poultry`), server functions in `src/lib/*.functions.ts`, AI via `@ai-sdk/openai-compatible`. Arabic RTL + English; other languages via a translation server function.

## Verified facts
- The ZIP has **no `.git` and no previous PROJECT_STATE / PHASE_CHECKPOINT / TEST_REPORT / CHANGELOG**; no commit SHA can be stated for the ZIP. Lovable reported HEAD `0ce0a172…` (edit 2026-10-10) and later `14df4e3b…` (edit 2026-10-17 09:51 UTC). Whether the ZIP equals either commit, and whether GitHub is in sync, is **UNVERIFIED**.
- Reconstructed history (Lovable chat): public Seafood/Aquaculture section (2026-10-05) -> Animals continuation request (2026-10-07) -> catalogue `src/data/animal-knowledge.ts` added (2026-10-10), ending with "preview still has build errors".
- Before this checkpoint `animal-knowledge.ts` was imported by **nothing**: the Animals integration had not started in the UI.
- Not found in source or docs: **Ankara/Konya demo farms** and **120 daily data points** (searched `src` and README). They are not part of this project as it exists; none were implemented or claimed.
- No IoT telemetry, forecasting, computer vision or sensor ingestion code was found. The AI features are LLM insight calls on user-entered herd data via existing server functions (not evaluated here).

## Implemented across checkpoints 2026-10-17 (code written; NOT runtime/build verified)
- `src/components/animal-knowledge-panel.tsx` (new), wired into `src/routes/livestock.tsx` with validated URL search state (`view`, `type`, `breed`, `compare`).
- Search-param validator caps comparison at 3 breeds and now uses bracket access (fixes 5 TS4111 errors that the repo's `noPropertyAccessFromIndexSignature` would reject; plausible cause of the 2026-10-10 "build errors", unconfirmed).
- Catalogue size, measured: 11 animal types, 33 breeds (an earlier note saying 31 was wrong).
- Per-species poultry/rabbit images (7 crops of bundled collages); `/expert` no longer shows an unrelated generic photo for unknown plants.
- Offline validators: `npm run test:data`, `npm run test:assets`; `ASSET_MANIFEST.json`.
- Emoji fallbacks replaced by icons (see ASSET_INVENTORY.md).
- Data-integrity tests `src/data/animal-knowledge.test.ts` (`npm run test:data`).

## Known issues / blockers
1. **Build errors reported by Lovable on 2026-10-10 are unreproduced.** No `node_modules`, no network: the real typecheck/lint/build could not run. A limited `tsc` run found and fixed TS4111 in the catalogue validator, but other causes cannot be excluded. All changed `.tsx` files are compiler-unverified.
2. Photographs: **0 verified genuine photos**; provenance/licence unrecorded for all 25 JPEGs and 31 pointers; several look generated. Replacement with licensed real photos is BLOCKED (offline). Full per-page missing list: ASSET_INVENTORY.md.
3. `.env` is tracked in the repo (contains Supabase URL + publishable key; values not reproduced here). Publishable keys are designed to be public, but confirm RLS policies; a secrets review of Supabase RLS was NOT done.
4. Release status: **NOT PRODUCTION READY / BLOCKED — VERIFICATION REQUIRED** (build, runtime, RLS and security audit unverified).

## Next exact task
On a machine with network: `bun install` (or `npm install`), run `npx tsc --noEmit`, `npm run lint`, `npm run build`, `npm run test:data`, `npm run test:assets`; fix any errors (likely in the 2026-10-10 additions), open `/livestock`, `/livestock?type=cattle&compare=holstein,jersey`, `/livestock?view=farm` on mobile + desktop in ar and en, and confirm signed-in inventory/Add Animal still work. Then replace the images per ASSET_INVENTORY.md.

## Update 2026-10-17 (third pass)
- Run tests: `npm run test:data` (needs Node >= 22.6; flag included) and `npm run test:assets`.
- Security: see SECURITY_REVIEW.md. `.env` holds publishable-type Supabase values only; now git-ignored but, if it is already tracked, still needs `git rm --cached .env` (approval pending).
- Images: 0 verified genuine photos, 0 verified licences; per-image provenance fields now exist in `ASSET_MANIFEST.json`. Missing subjects: ASSET_INVENTORY.md "Pass 3 status".
- Still unverified: the real build/typecheck/lint (blocked), GitHub sync, live Supabase state. Release status: NOT PRODUCTION READY / BLOCKED — VERIFICATION REQUIRED.

## Update 2026-10-17 (fourth pass)
- S1 (AI endpoint abuse) and S2 (cross-user poultry group reference) are addressed **in code and migrations**, not verified live. Details and manual actions: SECURITY_REVIEW.md "Pass 4".
- Migrations 0002 and 0003 exist in the repo but have **not been applied anywhere**; apply to a scratch DB first and run `supabase/tests/poultry_ownership_and_rate_limit.test.sql`.
- Run the offline suite with `npm test` (data, security, assets, hygiene). Real install/tsc/eslint/build and browser checks remain BLOCKED (no network).
- `.env`: ignored for future commits and excluded from ZIPs; probably tracked (present in Lovable's HEAD file list) — **explicit approval needed before `git rm --cached .env`**.
- Real-photo replacement is still unfinished (0 verified genuine photos / 0 verified licences); the manifest tooling does not complete it.
- Release status: **NOT PRODUCTION READY / BLOCKED — VERIFICATION REQUIRED.**

## Update 2026-10-17 (fifth pass) — migration deployment path
- **Nothing applied anywhere.** Migrations 0002 (rate limits), 0003 (poultry ownership, now NULL-safe) and the new 0004 (records the live `group_id` nullable drift) exist as files + journal entries + snapshots only. PostgreSQL is not available in the sandbox: **no migration or SQL test has been executed (BLOCKED)**.
- How to apply and record them (scratch and production), what not to do (`drizzle-kit push`, Supabase CLI assumptions), and file fingerprints: **MIGRATIONS.md**. Read-only production check: `supabase/scripts/preflight_readonly.sql`.
- Verified from history: 0001 was applied by Lovable's migration tool; on 2026-10-03 an un-filed `ALTER ... DROP NOT NULL` changed production. Unverified: the production migration-tracking mechanism and your access route.
- Offline suite: `npm test` (data 8, security 29, assets, hygiene) passes. Real install/tsc/eslint/build, browser tests, DB tests and runtime checks are all still BLOCKED.
- `.env` untouched. Real-photo replacement unfinished (0 verified genuine photos / 0 verified licences).
- Release status: **NOT PRODUCTION READY / BLOCKED — VERIFICATION REQUIRED.**

