# SECURITY_REVIEW.md

Review date 2026-10-17 (pass 3). Static review of the exported source only. No live database, no Supabase dashboard, no network, no git history were available. Secret values are never reproduced here.

## Reviewed (static)
| Area | Result |
|---|---|
| `.env` in the export | Present; **not covered by `.gitignore`** before this pass (so very likely tracked in Git — unverifiable, the ZIP has no `.git`). Contains only `*SUPABASE_URL`, `*SUPABASE_PROJECT_ID` and a `sb_publishable_…` key (client-safe key type), duplicated for `VITE_*` and server use. No service-role/secret key, JWT with `service_role`, or AI key found in `.env`. |
| Secrets elsewhere | Pattern search of `src`, `supabase`, `drizzle`, `scripts`, `vite.config.ts` found no committed credentials. Server code reads `SUPABASE_SERVICE_ROLE_KEY`, `LOVABLE_API_KEY`, `LOVABLE_CRON_SECRET` from `process.env` only. |
| Action taken | `.env`, `.env.*` added to `.gitignore` (except `.env.example`); placeholder-only `.env.example` added; `.env` excluded from the delivered ZIP. **Not done (needs your approval):** `git rm --cached .env`. Caution: Lovable may regenerate `.env`; untrack and confirm the preview still gets its variables. |
| Rotation | Publishable keys are designed to be public; rotation is **not required** by this finding. If the service-role key, `LOVABLE_API_KEY` or `LOVABLE_CRON_SECRET` was ever pasted into chat, a ticket, or the repo, rotate it. Nothing was rotated by me. |
| RLS / migrations (`drizzle/migrations/0000`, `0001`) | All four tables (`animals`, `livestock_activities`, `poultry_groups`, `poultry_records`) enable RLS with owner-only policies (`auth.uid() = user_id`) for the `authenticated` role; no grants to `anon`; `touch_updated_at` sets `search_path`. |
| Server functions | `livestock.functions.ts` and `poultry.functions.ts` use `requireSupabaseAuth` and zod validation with length/range bounds; user id comes from the verified context. |
| Prompt-injection surface | `translateGuide` maps `lang` through `languageNames` (no raw interpolation). |

## Findings (not fixed in code this pass — no test/build environment)
| # | Severity | Finding | Recommendation |
|---|---|---|---|
| S1 | Medium | `askPlantExpert` and `translateGuide` are **unauthenticated** AI endpoints with unbounded inputs (`query: z.string().min(1)`, `lang: z.string().min(2)`, translate arrays unbounded). Cost-abuse / large-payload / prompt-injection risk. | Add `.max()` limits, an allow-list for `lang`, per-IP rate limiting, and optionally require auth. |
| S2 | Low | `poultry_records` INSERT/UPDATE policies check only `user_id`; they do not verify `group_id` belongs to the same user (cross-tenant foreign-key reference; no read leak because SELECT is owner-only). | Add `WITH CHECK (EXISTS (SELECT 1 FROM poultry_groups g WHERE g.id = group_id AND g.user_id = auth.uid()))`. |
| S3 | Info | `.env` tracked in Git (probable). | See "Action taken". |
| S4 | Info | `__root.tsx` og:image/twitter:image point to a temporary-looking `r2.dev` "id-preview" URL. | Host a permanent image. |

## BLOCKED / not reviewed
- Live Supabase state (applied policies, grants, storage buckets, auth settings, leaked-password protection): no access — migrations ≠ deployed state.
- Dependency vulnerability scan (`npm audit` / `bun audit`): no network.
- Rate limiting, CSRF/XSS dynamic testing, file uploads (none found in source), authorization tests against a running app.
- Git history scan for previously committed secrets: no `.git`.

---
# Pass 4 (2026-10-17) — S1 and S2 addressed in code; nothing here is verified against a live deployment

## Status of earlier findings
| # | Was | Now | Evidence | Still open |
|---|---|---|---|---|
| S1 | Unauthenticated AI endpoints with unbounded input | **Mitigated in code** (5 endpoints: `askPlantExpert`, `translateGuide`, `translateStrings`, `livestockInsights`, `poultryInsights`) | strict validators + shared rate limiter + safe errors; 24 offline tests incl. 5 mutation checks | endpoints are still anonymous by design (behaviour preserved); runtime, deployed-DB and load behaviour NOT verified |
| S2 | `poultry_records` could reference another user's `group_id` | **Fixed in migration 0003 (not applied anywhere yet)** | composite FK + tightened RLS; static SQL tests; SQL test script written | NOT executed: no Postgres in the sandbox. Must be applied/tested on a scratch DB, then production |
| S3 | `.env` probably tracked | Unchanged: ignored for future commits, excluded from ZIPs, `.env.example` placeholder-only | `npm run test:hygiene`; Lovable's project file list at HEAD shows `.env` | **Awaiting your explicit approval for `git rm --cached .env`** |
| S4 | temporary social-share URL | Unchanged | | open |

## S1 design (what changed)
- **Validation** (`src/lib/ai-guard.shared.ts`, dependency-free so it is testable offline): body must be an object; unknown fields dropped; control characters stripped; hard limits — expert query 120 chars (also `maxLength` on the input), guide intro 2 000 / 30 sections / 40 items per section / 1 000 per item / 40 000 total, UI strings <= 200 keys / key regex `[A-Za-z0-9_.-]{1,80}` / value 400 / 30 000 total (`__proto__`, `constructor`, `prototype` rejected), herd <= 60, flock groups <= 60, records <= 80, question 400, notes 400, finite numbers only. Real data fits with wide margin (bundled guides ~2 000 chars; UI table 49 short keys; a test feeds the real guides through the validator).
- **Strict language allow-list**: the 15 codes in `src/lib/languages.ts` (single source, re-exported from `plant-expert.shared.ts`; a test checks parity with `i18n.tsx`). Unsupported codes are now rejected (previously silently mapped to a default language).
- **Prompt hardening**: the expert query is `JSON.stringify`-encoded and labelled as plain text in the prompt.
- **Rate limiting, compatible with the deployment**: the Vite config builds with the Nitro **cloudflare** preset (many isolates/instances), so an in-memory limiter alone would not hold. The limiter's source of truth is Postgres: `public.rate_limit_hit()` (migration 0002; atomic upsert counter; executable by `service_role` only; table has RLS on and no policies). It reuses the existing server-side service-role client, so no new service or dependency. Policies (tunable in `RATE_POLICIES`): expert 15 / 10 min per client + 1 500 / h global; translate 30 / 10 min + 1 200 / h; insights 10 / 10 min + 800 / h. Clients are keyed by SHA-256 of the address (`cf-connecting-ip`, else `x-real-ip`, else first `x-forwarded-for`); raw addresses are never stored. The global bucket is the backstop against address rotation or spoofed headers on non-Cloudflare hosts. The middleware runs before validation, so malformed floods are counted too.
- **Failure behaviour**: if the shared store errors (e.g. migration 0002 not applied yet, DB outage) the request is decided by a per-instance limiter (`degraded`, logged as a warning) instead of failing open without limits or taking the feature down. Deploy migrations before the code to avoid running degraded.
- **Safe client errors**: clients see only `"<status> <code>"` — `400 invalid_request`, `429 rate_limited`, `402 ai_credits`, `502 ai_unavailable` (the 429/402 substrings keep the existing `/expert` messages working). Zod details, upstream/AI text and stack traces go to server logs only (never prompts).
- **Known limits**: fixed windows allow up to 2x bursts across a boundary; many users behind one NAT share a client bucket; limits are judgement calls until real traffic is observed; two RPC round-trips per AI request; `types.ts` is not regenerated (the RPC is called through a narrow cast).

## S2 design
- Migration `0003_poultry_records_group_owner.sql`: (1) `UNIQUE (id, user_id)` on `poultry_groups` + composite FK `poultry_records (group_id, user_id) -> poultry_groups (id, user_id)` — enforced for every role, including `service_role`/table owner; (2) INSERT and UPDATE policies re-created so `WITH CHECK` also requires an owned group (clean denial at the RLS layer). A preflight aborts with a clear message if any existing row already violates ownership; it never changes data. Rollback steps are in the file header.
- `addPoultryRecord` maps `23503`/`42501` to a generic `400 invalid_group` instead of returning database error text.
- Tests: static SQL structure tests run (pass); `supabase/tests/poultry_ownership_and_rate_limit.test.sql` covers valid INSERT/UPDATE, cross-user INSERT/UPDATE denial, FK enforcement with RLS bypassed, `rate_limit_hit` counting/windows/privileges — **written but NOT executed**.
- Pre-existing observation (not changed): `addPoultryRecord` accepts an omitted `groupId` although the column is `NOT NULL` — such a request fails at the database.

## Reviewed vs blocked (pass 4)
Reviewed (static + offline tests): validators, limiter logic, wiring of all 5 AI endpoints, migrations 0002/0003 text, journal, hygiene.
BLOCKED: running either migration or the SQL test script (no Postgres), live RLS/grant state, behaviour on the deployed Worker (real header values, latency), real build/typecheck/lint, browser tests, `npm audit`, git-history secret scan.

## Manual actions for you
1. Apply 0002 and 0003 first to a scratch/branch database, run `supabase/tests/poultry_ownership_and_rate_limit.test.sql`, then production. If 0003's preflight reports violating rows, resolve them manually.
2. Confirm `SUPABASE_SERVICE_ROLE_KEY` is set in the runtime (the limiter uses it); regenerate `src/integrations/supabase/types.ts` after migrating.
3. Approve (or run yourself) untracking `.env` — `git rm --cached .env && git commit -m "Stop tracking .env"` — and confirm Lovable still injects its variables. I did not run it, and did not delete or print your local `.env`.
4. Rotate secrets only if one was ever exposed (see pass 3). Nothing was rotated.
5. After deploy, watch logs for `[rate-limit] shared store unavailable` and tune `RATE_POLICIES`.

---
# Pass 5 (2026-10-17) — migration deployment path, live-DB drift, SQL test review
Everything below is static review plus offline tests. **No PostgreSQL was available, so no migration and no SQL test was executed; nothing was applied to any database.**

## New finding D1 — live database has drifted from the migration files (High for deployment, not an exposure)
Lovable's project history shows `ALTER TABLE public.poultry_records ALTER COLUMN group_id DROP NOT NULL` was run directly (`supabase--run_sql`, 2026-10-03) with no migration file; the generated `types.ts` agrees (`group_id: string | null`). Consequences for pass-4 work, now fixed: (a) the 0003 preflight would have **aborted on production** if any record had no group; (b) the 0003 INSERT/UPDATE policies would have **rejected group-less records** the app currently creates. Fix: 0003 ignores/permits `NULL group_id` (composite FK is `MATCH SIMPLE`, unchecked for NULL; ownership is still enforced whenever `group_id` is set); new `0004_poultry_records_group_id_nullable.sql` records the drift idempotently. S2 protection is unchanged: a non-NULL `group_id` must belong to the same user, at RLS and constraint level.
Unverified: that production really is nullable (inferred from history + `types.ts`), and whether other manual changes exist. `supabase/scripts/preflight_readonly.sql` (SELECT-only) checks this on the real database before anything is applied.

## Deployment path (details in MIGRATIONS.md)
Migrations here are hand-written raw SQL mirrored in `drizzle/migrations/` (blank `schema.ts`, empty snapshots); 0001 was applied by Lovable's `lov_database--migration` tool. The Supabase CLI does not discover these files (no `supabase/migrations/`), `drizzle-kit migrate` must not be used until the production tracking table is verified, and **`drizzle-kit push` must never be run** (blank schema -> it could propose dropping tables). Apply 0002 -> 0003 -> 0004, each as a single transaction, first on a scratch database, then production only after your approval. Where applied migrations are recorded in production is **unverified**.

## SQL test review (`supabase/tests/poultry_ownership_and_rate_limit.test.sql`) — corrections made by reading, none by execution
- Constraint-layer assertions now impersonate `service_role` (BYPASSRLS) instead of relying on the session user, which on a managed database may not bypass RLS.
- Removed an unneeded `GRANT ... TO PUBLIC` on a temp function; added fail-fast checks that 0002/0003/0004 are applied.
- Added cases the first version lacked: group-less records stay legal, non-existent `group_id` denied, FK enforced on UPDATE with RLS bypassed, cascade delete still works, `anon` cannot call `rate_limit_hit`, boundary parameters rejected, u2 cannot read u1's records.
- No security assertion was removed or weakened (a test checks every assertion phrase is still present). Added `supabase/tests/00_bootstrap_vanilla_postgres.sql` (roles + `auth.uid()`) for disposable vanilla Postgres only.
- These remain **unproven until run**: the script has never executed.

## Status table (S1/S2 carried forward)
| Item | Status |
|---|---|
| S1 validation + rate limiting | implemented; offline tests pass; deployed behaviour unverified |
| S2 ownership | implemented in 0003 (NULL-safe) + 0004; **not applied, not executed** |
| D1 drift | recorded in 0004; production state **unverified** until the read-only preflight is run |
| `.env` | unchanged this pass: not modified, not untracked, not printed; still awaiting your approval for `git rm --cached .env` |
| Production migration | **BLOCKED** (needs scratch run + your approval + verified access route) |

