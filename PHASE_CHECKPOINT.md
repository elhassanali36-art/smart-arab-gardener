# PHASE_CHECKPOINT.md

## Checkpoint 2026-10-17 — "Animals knowledge integration (code complete, unverified)"
Starting point: ZIP `smart-arab-gardener-main.zip` (no Git metadata; commit unknown). Previous checkpoint: none recorded (reconstructed: Animals catalogue added 2026-10-10, UI not wired).

Completed: knowledge panel + URL state in `/livestock`; emoji fallbacks replaced; catalogue validator hardened; node tests added; docs added.
Not completed: build/typecheck/lint verification; real-photo replacement; mobile/RTL visual testing; signed-in regression; roadmap item 4.
Frozen/untouched: authentication, Supabase client, server functions, migrations, `.env`, all other routes.
Rollback: revert the files listed in CHANGELOG.md; `roadmap.md`, `AGENTS.md` history preserved (roadmap lines only annotated).

## Checkpoint 2026-10-17 (second pass) — "Image relevance + type fix (compiler-unverified)"
Starting point: first checkpoint above (still no Git metadata; commit unknown).
Completed (code): TS4111 fix in the search validator; per-species poultry/rabbit images; expert-page placeholder instead of an unrelated photo; asset validator + manifest + rewritten inventory; docs corrected (33 breeds, not 31).
Executed: `test:data` 6/6, `test:assets` OK, stub typecheck of new/changed data+panel (clean apart from stub noise).
Not completed / BLOCKED: real `tsc`/lint/build; runtime and RTL/mobile checks; signed-in inventory regression; licensed real photos (offline); roadmap item 4.
Roadmap: items annotated, none newly ticked.
Rollback: revert the files in CHANGELOG.md; deleting the 7 new `poultry/*.jpg` crops and restoring `poultry-images.ts` returns to the collage mapping.

## Checkpoint 2026-10-17 (third pass) — "Runner fix + security hygiene + provenance tooling"
Starting point: `smart-arab-gardener-checkpoint-2026-10-17-pass2.zip`; uploaded patch is byte-identical to the pass-2 patch (not re-applied).
Completed: `test:data` Node-compat fix; `.env` hygiene; SECURITY_REVIEW.md; provenance schema in the manifest; baseline-count tests.
Executed: `test:data` 8/8, `test:assets` OK.
BLOCKED: dependency install, real tsc/eslint/vite build, browser checks, licensed-photo sourcing, hosted plant-photo inspection, live RLS check. No new photos added; 0 verified genuine photos / 0 verified licences.
Status: NOT PRODUCTION READY / BLOCKED — VERIFICATION REQUIRED.
Rollback: revert `package.json`, `.gitignore`, test file, scripts and the added docs.

## Checkpoint 2026-10-17 (fourth pass) — "S1/S2 remediation (unverified at runtime)"
Starting point: pass-3 ZIP. Completed: strict validation + language allow-list + shared Postgres-backed rate limiter + safe errors on 5 AI endpoints; poultry ownership migration; 24 security tests (+5 mutation checks); env hygiene check; docs.
Executed: `npm test` green (8 + 24 + assets + hygiene); real strict tsc clean on the dependency-free guard file.
BLOCKED: running migrations/SQL tests (no Postgres), install, real tsc/eslint/build, browser tests, live deployment checks, photo sourcing.
Pending your action: apply migrations on scratch then production, approve `.env` untracking, regenerate Supabase types, tune limits.
Rollback: revert the files in CHANGELOG (fourth pass); DB rollback SQL is in each migration header.
Status: NOT PRODUCTION READY / BLOCKED — VERIFICATION REQUIRED.

## Checkpoint 2026-10-17 (fifth pass) — "Migration deployment path + drift fix (nothing applied)"
Starting point: pass-4 ZIP (identical to the working tree). Completed: deployment path documented from repo + Lovable history; drift D1 found and fixed in 0003, recorded in 0004; journal/snapshots extended; SQL test reviewed and extended; read-only preflight and vanilla bootstrap added; 29 offline tests green.
BLOCKED: any database execution; real build; browser; runtime. Pending your action: run the read-only preflight on production, run 0000-0004 + SQL tests on a scratch DB, approve production apply and `.env` untracking.
Status: NOT PRODUCTION READY / BLOCKED — VERIFICATION REQUIRED.

