# CHANGELOG

## 2026-10-17 (fifth pass) — migration path, live-DB drift fix, SQL test review (nothing applied)
Fixed
- `0003_poultry_records_group_owner.sql`: preflight ignores `NULL group_id`; INSERT/UPDATE policies allow `group_id IS NULL OR <owned group>` (live column is nullable; the first version would have aborted on, or broken group-less records in, production).
Added
- `0004_poultry_records_group_id_nullable.sql` (idempotent record of the ad-hoc 2026-10-03 production change); journal entry idx 4; snapshots `0002`-`0004` (unbroken `prevId` chain).
- `MIGRATIONS.md` (deployment path, scratch + production procedure, do-not list, rollback, SHA-256 fingerprints), `supabase/scripts/preflight_readonly.sql` (SELECT-only), `supabase/tests/00_bootstrap_vanilla_postgres.sql`.
- 5 more offline tests (29 total): NULL-safety, 0004, journal/snapshot chain, SQL-test assertions preserved, preflight read-only, runbook content.
Changed
- `supabase/tests/poultry_ownership_and_rate_limit.test.sql`: service_role used for the constraint-layer assertions, fail-fast schema checks, new cases (group-less record, non-existent group, FK on UPDATE with RLS bypassed, cascade, anon denied, parameter bounds). No assertion weakened. Never executed.
Not changed: `.env` (untouched, not untracked), application code, previous migrations 0000/0001, security fixes from pass 4.

## 2026-10-17 (fourth pass) — S1 and S2 fixes (compiler-unverified, migrations unapplied)
Added
- `src/lib/ai-guard.shared.ts` (validators, limits, rate-limit logic, safe errors; dependency-free) and `src/lib/ai-guard.server.ts` (Postgres-backed limiter, function middleware, `generateJsonSafe`).
- `src/lib/languages.ts` (strict language allow-list source; re-exported by `plant-expert.shared.ts`).
- `drizzle/migrations/0002_rate_limits.sql` (+ journal entry): `rate_limits` table and `rate_limit_hit()` (service_role only).
- `drizzle/migrations/0003_poultry_records_group_owner.sql` (+ journal entry): composite FK and tightened RLS for poultry record ownership; preflight, no data changes.
- `supabase/tests/poultry_ownership_and_rate_limit.test.sql` (written, not executed), `src/lib/ai-guard.test.ts` (24 tests), `scripts/check-env-hygiene.mjs`; npm scripts `test:security`, `test:hygiene`, `test`.
Changed
- `askPlantExpert`, `translateGuide`, `translateStrings`, `livestockInsights`, `poultryInsights`: rate-limit middleware, strict validators, safe errors; expert prompt now JSON-encodes the query. `expert.tsx`: `maxLength={120}`. `addPoultryRecord`: ownership violations return `400 invalid_group`.
Behaviour changes to know about: unsupported language codes are now rejected (were silently defaulted); over-limit inputs are rejected; heavy users can receive `429`.
Not changed: authentication on these endpoints (still anonymous), `.env` tracking (approval pending), `src/integrations/supabase/types.ts`, images.

## 2026-10-17 (third pass) — test runner, secrets hygiene, provenance tooling (still compiler-unverified)
Fixed
- `package.json`: `test:data` now runs `node --experimental-strip-types --test ...` (fails on Node 22.6-22.17 without the flag); added `engines.node >= 22.6.0`.
Added
- `.gitignore`: `.env`, `.env.*` (except `.env.example`). `.env.example` with placeholders only.
- `SECURITY_REVIEW.md` (reviewed vs blocked items; findings S1-S4).
- `scripts/asset-provenance.json` (empty by design) and provenance fields in `ASSET_MANIFEST.json`; `scripts/validate-assets.mjs` now checks plant-photo coverage and poultry single-species mapping.
- Two tests in `animal-knowledge.test.ts` (baseline counts; 3-breed cap).
Not changed: application code, images, auth, database, migrations.
Not done: `git rm --cached .env`, key rotation, RLS/server-function hardening (S1/S2) — awaiting approval / a runnable test environment.

## 2026-10-17 (second pass) — image relevance, type fix, offline validators (compiler-unverified)
Fixed
- `src/data/animal-knowledge.ts`: `validateAnimalKnowledgeSearch` used `input.view/type/breed/compare` on a `Record<string, unknown>`; the repo's `noPropertyAccessFromIndexSignature` makes that TS4111 (5 errors). Replaced with bracket access. This is the most likely cause of the "preview has build errors" reported on 2026-10-10 — **not confirmed**, because the real build could not run.
Changed
- `src/data/poultry-images.ts` + 7 new files `src/assets/poultry/{duck,goose,quail,turkey,pigeon,guinea-fowl,rabbit}.jpg`: each species card now shows a single-species crop of the existing collages (originals kept for family headers).
- `src/data/expert-plant-images.ts`, `src/routes/expert.tsx`: unknown plants no longer get an unrelated generic photo; a Sprout icon is shown instead.
- `src/components/animal-knowledge-panel.tsx`: photos for rabbits, quail, pigeons, turkeys now come from the matching crops; buffalo/horses keep the icon.
Added
- `scripts/validate-assets.mjs` (`npm run test:assets`) and generated `ASSET_MANIFEST.json`; `ASSET_INVENTORY.md` rewritten (75 references audited, per-page missing-photo list).
Corrected
- Earlier docs said the catalogue had 31 breeds; the measured count is **33 breeds across 11 types**.

## 2026-10-17 — Animals knowledge integration (unverified build)
Added
- `src/components/animal-knowledge-panel.tsx`: public type -> breed -> profile browser, bilingual search (Arabic-normalised), same-type comparison (max 3), safety/sources notes; species-level photos only where they exist, otherwise an icon.
- `src/data/animal-knowledge.test.ts` and `npm run test:data`.
- `PROJECT_STATE.md`, `PHASE_CHECKPOINT.md`, `TEST_REPORT.md`, `ASSET_INVENTORY.md`.
Changed
- `src/routes/livestock.tsx`: `validateSearch`, Guide / My herd switch, panel rendering; inventory code untouched (shown when `view=farm` or below the guide).
- `src/data/animal-knowledge.ts`: comparison param capped at 3.
- `src/components/plant-photo.tsx`, `src/routes/account.tsx`, `src/routes/plants.$plantId.tsx`: emoji placeholders -> icons/CSS marker.
- `package.json`: added script `test:data` only. `roadmap.md`: status annotations, history kept.
Not changed: auth, database, migrations, server functions, `.env`, lockfile.
