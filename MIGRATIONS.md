# MIGRATIONS.md — how database migrations are applied in this project

Status: **NOTHING has been applied to any database by this checkpoint.** NOT PRODUCTION READY. Written 2026-10-17 from the repository and Lovable's project history only; no database connection was available.

## 1. What the repository actually contains (verified by reading the files)
- `drizzle.config.ts`: dialect `postgresql`, `schema: ./drizzle/schema.ts`, `out: ./drizzle/migrations`, connection from **`LOVABLE_DB_MIGRATION_URL`** (an environment variable Lovable's own pipeline provides; it is not in `.env`/`.env.example` and is not available to this repo's scripts). `package.json` has **no** `db:*`/`migrate` script.
- `drizzle/schema.ts` is `// auto-generated and intentionally left blank, do not edit`. The `meta/*_snapshot.json` files all contain `"tables": []`. So Drizzle's schema-diff tooling knows about no tables: migrations here are **hand-written raw SQL files** mirrored into `drizzle/migrations/` plus a `_journal.json` list.
- There is **no `supabase/migrations/` directory** (only `supabase/config.toml`, `supabase/tests/`, `supabase/scripts/`). The Supabase CLI (`supabase db push`, `supabase migration up`) discovers only `supabase/migrations/<timestamp>_name.sql`, so it **does not see** any file in `drizzle/migrations/`. Do not assume it does.
- Journal/files now: 0000_create_animals, 0001_create_poultry (original, applied by Lovable), plus **0002_rate_limits, 0003_poultry_records_group_owner, 0004_poultry_records_group_id_nullable** (added by this work, unapplied). Snapshots 0002-0004 were added as copies of 0001 with a valid `id`/`prevId` chain so `drizzle-kit check` style tooling sees an unbroken chain.

## 2. Evidence of how migrations were really applied (Lovable project history)
- 0001 was applied on 2026-10-01 by Lovable's agent tool **`lov_database--migration`** (name `create_poultry`), i.e. **not** by `drizzle-kit migrate` and not by the Supabase CLI. The `.sql` file in the repo is the mirror of that tool call.
- On 2026-10-03 Lovable ran `ALTER TABLE public.poultry_records ALTER COLUMN group_id DROP NOT NULL;` through **`supabase--run_sql`** (direct SQL, **no migration file**), then regenerated types (`types.ts` now says `group_id: string | null`). So the live database has **drifted** from `0001_create_poultry.sql` (which says `NOT NULL`). Migration 0004 records that drift; it is a no-op on production and makes a rebuilt scratch DB match production.
- This drift mattered: my first 0003 would have aborted on production (its preflight counted group-less records as violations) and its policies would have blocked group-less inserts the app permits. Fixed: 0003 ignores `NULL group_id` and the composite FK (default `MATCH SIMPLE`) is simply not checked for NULL.

## 3. NOT verified (needs a person with database access)
- Whether production has a tracking table (`drizzle.__drizzle_migrations` and/or `supabase_migrations.schema_migrations`) and what is in it. Run `supabase/scripts/preflight_readonly.sql` (SELECT-only) and read section 1 of its output.
- Whether you have a SQL editor / connection string for the production database or can only go through Lovable's tool.

## 4. Things NOT to do
- **Never run `drizzle-kit push`** here: `schema.ts` is blank, so it would diff the live DB against an empty schema and propose dropping tables.
- Do not run `drizzle-kit migrate` against production until the tracking table is verified (section 3) to contain rows matching 0000/0001 by hash; if it is empty/missing, Drizzle would try to re-run 0000 and fail (inside its transaction), or worse, record a wrong baseline.
- Do not run `supabase db push` expecting it to apply these files (it will say nothing to push), and do not move the files into `supabase/migrations/` as part of an emergency change: that would create a second, competing convention.
- Never run the SQL test script or the bootstrap on production.

## 5. Scratch database (disposable only)
Order is always 0000 -> 0001 -> 0002 -> 0003 -> 0004, each file as one transaction (`psql -1` = single transaction; a failure leaves nothing half-applied).

**A. Throw-away vanilla PostgreSQL 15+ (container/local):**
```
createdb scratch
psql scratch -v ON_ERROR_STOP=1 -f supabase/tests/00_bootstrap_vanilla_postgres.sql   # roles + auth.uid() (NOT for Supabase)
for f in drizzle/migrations/000{0,1,2,3,4}_*.sql; do psql scratch -v ON_ERROR_STOP=1 -1 -f "$f"; done
psql scratch -v ON_ERROR_STOP=1 -f supabase/tests/poultry_ownership_and_rate_limit.test.sql
```
**B. A scratch Supabase project or branch (never the production project):** run the same four migration files in order in its SQL editor (or `psql` with its direct connection string, using `-1`), skip the bootstrap (Supabase already has the roles and `auth.uid()`), then run the test script. Expected final output: `poultry ownership + rate limit SQL tests passed`. Any `RAISE EXCEPTION` is a failure; do not proceed to production.
Before applying, run `supabase/scripts/preflight_readonly.sql` on the scratch DB too, to see it behave as expected.

## 6. Production (only after section 5 passed and you approve)
Prerequisites: a verified backup/point-in-time restore; `preflight_readonly.sql` output reviewed with these expectations — `group_id` `is_nullable = YES`, `violating_rows = 0`, `rate_limits_exists = false`, `rate_limit_hit_exists = false`, policy names `own poultry records insert/update` present, `touch_updated_at_exists = true`. If any differs, stop and re-assess (a manual policy/column change may exist like the 2026-10-03 one).
Apply, in this order, each as a single transaction: `0002_rate_limits.sql`, then `0003_poultry_records_group_owner.sql`, then `0004_poultry_records_group_id_nullable.sql` (no-op if already nullable). Routes, depending on what access you have:
1. **Supabase SQL editor / `psql -1` with the production connection string** (preferred if you have it): paste/run each file separately; verify after each (section 7).
2. **Lovable's `lov_database--migration` tool** (the route used for 0001): requires asking Lovable's agent and approving in its UI; it consumes agent usage and may create its own mirror file names — give it the exact file contents and check afterwards that no duplicate migration files were created.
**Recording:** a migration is "recorded" in the repo by its `.sql` file + `_journal.json` entry (already present). In the database, record only in a tracker that section 3 proved exists. If `drizzle.__drizzle_migrations` exists **and** its rows for 0000/0001 match the SHA-256 values below (this proves the convention), insert rows for 0002-0004 with the hash and `created_at` (= journal `when`) from the table; otherwise do not create or edit any tracking table.
**Deploy order:** apply migrations first, then deploy the app code. If the code runs before 0002 the AI endpoints fall back to a per-instance limiter and log `[rate-limit] shared store unavailable` (safe but degraded); 0003 does not affect running code except mapping violations to `400 invalid_group`.
After applying: regenerate `src/integrations/supabase/types.ts` (new `rate_limits` table and `rate_limit_hit` function) and confirm `SUPABASE_SERVICE_ROLE_KEY` is set in the runtime.

## 7. Verification queries after each production step (read-only)
- 0002: `SELECT to_regprocedure('public.rate_limit_hit(text,integer,integer)') IS NOT NULL;` and `SELECT relrowsecurity FROM pg_class WHERE oid = 'public.rate_limits'::regclass;` (true).
- 0003: `SELECT conname FROM pg_constraint WHERE conname = 'poultry_records_group_owner_fkey';` and `SELECT policyname, with_check FROM pg_policies WHERE tablename = 'poultry_records';`
- 0004: `SELECT is_nullable FROM information_schema.columns WHERE table_name='poultry_records' AND column_name='group_id';` (YES)
- App smoke test: create a poultry record with and without a group while signed in.

## 8. Rollback
Per-file rollback SQL is in each migration's header. 0002: drop the function and table. 0003: drop the FK and unique constraint, then recreate the two policies with `auth.uid() = user_id` only (see 0001). 0004: do not revert unless no `NULL group_id` rows exist and the app no longer sends group-less records.

## 9. Fingerprints of the files in this checkpoint (SHA-256 of the file bytes; `when` = journal value / Drizzle `created_at`)
| idx | file | when | sha256 |
|---|---|---|---|
| 0 | `0000_create_animals.sql` | 1788407257153 | `1d44800918da1c89a5af84077e5b3bf46650338548ebd36fdffbe94a1beecdf9` |
| 1 | `0001_create_poultry.sql` | 1788800496746 | `695638047e39c0efd941861d31dbca48d4fdaeebea0c1eec3d27b0f8dbed1fee` |
| 2 | `0002_rate_limits.sql` | 1788886896746 | `0764fc517bc227b04ff340e490ace2bca038cb67eab3e766aa2e603b4dff1354` |
| 3 | `0003_poultry_records_group_owner.sql` | 1788973296746 | `17980c4bdd17048079e436e87d7a2b8b92f1a6e44888a5cbc71039b1fb1a4209` |
| 4 | `0004_poultry_records_group_id_nullable.sql` | 1789059696746 | `1af1b607c01fc6473674df957dbfef7edba3b2ccef0c84605506cda16541fb26` |

Drizzle computes its tracking hash from the file text, so these values are what a `drizzle.__drizzle_migrations` row would hold *if* that table is used here (unverified). Recompute after any edit: `sha256sum drizzle/migrations/*.sql`.
