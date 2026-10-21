# TEST_REPORT.md

## Run 5 — 2026-10-17 (Node v22.22.2; no network, no node_modules, **no PostgreSQL** — searched for postgres/initdb/psql/docker/pglite/embedded-postgres: none)

### Executed and PASSED
- `npm test` -> exit 0: `test:data` 8/8, `test:security` **29/29** (5 new: NULL-safe 0003, 0004 content, journal + snapshot chain, SQL-test assertions present and no COMMIT, read-only preflight, runbook content), `test:assets` OK, `test:hygiene` OK.
- Mutation checks on the new protections (each must fail the suite): 0003 preflight loses NULL handling (fail), 0003 policies stop allowing NULL group (fail), 0004 gains a destructive statement (fail), SQL test loses a security assertion (fail), snapshot chain broken (fail). One first attempt hit a comment instead of the policy and did not fail; it was redone against the real policy lines and failed as required. Files restored byte-identical.

### BLOCKED (not executed — do not read as passed)
- Applying 0002/0003/0004 to any database; `supabase/scripts/preflight_readonly.sql`; `supabase/tests/poultry_ownership_and_rate_limit.test.sql`; the vanilla bootstrap. **All database-level S2 and rate-limit verification remains outstanding.**
- Install from `bun.lock`, real `tsc --noEmit`, `eslint`, `vite build`, browser/UI tests, deployed-runtime checks, `npm audit`.

### Static inspection only
- SQL syntax of 0002/0003/0004, the SQL test script, the bootstrap and the preflight script were read and structure-checked (parentheses/`$$` balance, statement lists); no parser or Postgres was available. Test-script corrections were made by reading, not by observing a failure.

### Executed and FAILED
- None this pass.

## Run 4 — 2026-10-17 (Node v22.22.2, global TypeScript 6.0.3; no network, no node_modules, no Postgres; install/build **not retried** — conditions unchanged)

### Executed and PASSED (commands exactly as run)
- `npm run test:data` -> 8/8.
- `npm run test:security` -> `node --experimental-strip-types --test src/lib/ai-guard.test.ts`: **24/24 pass**. Covers: language allow-list incl. 15-code parity with `i18n.tsx` and rejection of `xx`, `EN`, `__proto__`, oversized/non-string values; expert input (valid, whitespace/control-char normalisation, 120-char limit, 1M-char payload, blank, missing/typed-wrong fields, null/array/string bodies, extra fields dropped); guide validation (limits, total-size cap, real bundled guides accepted); UI-string validation (keys, forbidden keys, sizes, 49-label real shape accepted); livestock and poultry insights validation; **rate limiting**: client limit + retry-after + window reset, client/endpoint isolation, global backstop against rotating clients, shared store as source of truth across two simulated instances, degraded fallback when the store throws, bounded memory; client-address extraction/hash; safe errors (no leaks) and UI-code compatibility; wiring of all 5 endpoints (middleware + strict validator + `generateJsonSafe`, no raw `generateJson`); prompt-injection hardening; static SQL checks for migrations 0002/0003 (composite FK, RLS insert/update checks, privileges, no data-destroying statements, balanced parentheses/`$$`, journal order).
- Mutation checks (tests must fail when protections are removed): language allow-list disabled -> 9 failures; limiter always-allow -> 5; expert endpoint loses rate limit -> 1; composite FK reduced to `group_id` -> 1; expert length cap removed -> 1. All files restored byte-identical afterwards; suite green again.
- `npm run test:assets` -> OK. `npm run test:hygiene` -> OK (`.gitignore` rules; `.env.example` placeholder-only; negative control proved it fails if an `.env` value is copied into the example; tracking status reported UNVERIFIABLE because the export has no `.git`).
- `npm test` (all four) -> exit 0.
- **Real** strict `tsc` (repo `tsconfig.json` flags, `types: []`) on the dependency-free files `src/lib/ai-guard.shared.ts` + `src/lib/languages.ts`: exit 0, no errors.

### Executed and FAILED
- First `test:security` run: 1 failure from an over-broad regex in my own test (matched `ON DELETE CASCADE`); test corrected, no product change. `tsc` flagged two `unknown` narrowing errors in my test file; fixed, re-run clean.

### Static inspection only / compiler-unverified
- `ai-guard.server.ts` (stub-typechecked only: no errors in that file; the stubs are not real typings), the edits in `plant-expert.functions.ts`, `translate.functions.ts`, `livestock.functions.ts`, `poultry.functions.ts`, `expert.tsx`. Project-wide limited `tsc` shows no non-noise errors in these files, but that run lacks React/TanStack/zod typings.
- SQL syntax of 0002/0003 read manually and checked structurally (no SQL parser or Postgres available).

### BLOCKED (not executed)
- Applying migrations 0002/0003 and running `supabase/tests/poultry_ownership_and_rate_limit.test.sql` (no Postgres) — **no live or scratch DB verification of S2 or the rate-limit function was performed**.
- Dependency install from `bun.lock`, real `tsc --noEmit`, `eslint`, `vite build`, browser/UI tests, behaviour on the deployed Cloudflare Worker, `npm audit`.

### NOT RUN
- Load/abuse testing against a running server; git-history secret scan.

## Run 3 — 2026-10-17 (same sandbox: Node v22.22.2, no network; `curl` to the npm registry returned nothing, so dependency installation was **not retried**)

### Executed and PASSED
- `npm run test:data` -> `node --experimental-strip-types --test src/data/animal-knowledge.test.ts`: exit 0, **8/8 pass** (two new: documented baseline counts 11 types / 33 breeds / buffalo 2 / horses 2 / 22 disease entries / 10 aquaculture species / 11 poultry species; comparison cap of 3).
- `npm run test:assets` -> `node scripts/validate-assets.mjs`: exit 0. Now also checks that all 31 plants have a photo reference and that no poultry species maps to a multi-animal collage.
- Max-three-breeds rule: validator test passes (cattle has 8 breeds, result capped at 3); panel code additionally disables further checkboxes once 3 are selected (static inspection of `toggleCompare`).

### Test-runner compatibility
- Cause (as reported on Node 22.16): `.ts` test files need type stripping, which is behind `--experimental-strip-types` until Node 22.18. Fix: flag added to `test:data`; `engines.node >= 22.6.0` added to `package.json`. **Verified only on 22.22.2** (where it passes with the flag); behaviour on 22.16 is inferred from your report, not executed here.

### BLOCKED (not executed) — unchanged conditions, not retried
- Install from the lockfile (`bun install --frozen-lockfile` / `npm ci`), real `tsc --noEmit`, `eslint .`, `vite build`, any browser/UI test (/livestock, /expert, plant detail, comparison; Arabic/English/mobile) — no network, no `node_modules`. **Pass 2's stub typecheck is not a substitute and is not counted as compiler verification.**
- Live Supabase/RLS checks, `npm audit`, git-history secret scan.
- Visual inspection of the 31 hosted plant photos: bytes not in the ZIP; `web_fetch` refused the published/preview URL.

### Static inspection only
- `animal-knowledge.ts`, `animal-knowledge-panel.tsx`, `livestock.tsx`, `expert.tsx`, `plant-photo.tsx`, `account.tsx`, `plants.$plantId.tsx` re-read; no new defects found; all remain **compiler-unverified**.
- SECURITY_REVIEW.md (RLS migrations, server-function auth/validation, secret scan).
- One observation from Lovable's latest screenshot of the live home page: the 👋 in the greeting rendered as an empty glyph in that capture (an emoji-font issue in the capture environment; not changed).

### Executed and FAILED
- None this pass.

## Run 2 — 2026-10-17, same offline sandbox (Node 22.22, global TypeScript 6.0.3, no node_modules, no network)

### Executed and PASSED
- `npm run test:data` (`node --test`): 6/6 pass.
- `npm run test:assets` (`scripts/validate-assets.mjs`): exit 0. 57 static asset imports all resolve; 25 JPEGs have intact SOI/EOI markers; 31 plant pointers are valid JSON and all imported; no unreferenced assets; 11 `<img>` tags, 0 missing `alt`. Also reports 2 remote meta-image URLs (`__root.tsx`) — informational, not failed.
- Stub-typecheck of the new panel and the changed data modules (`tsc` with the repo's strict flags, hand-written stubs for `react`, `lucide-react`, `@/lib/utils`): no errors other than expected stub noise (missing Node types for the test file, `*.asset.json` typings, implicit `any` on an event handler because stubbed intrinsic elements are untyped).

### Executed and FAILED (informational)
- Project-wide `tsc` in "limited mode" (`types: []`, dependencies absent) reports 2373 lines of errors: 1475 TS7026 + 269 TS7006 + 264 TS7031 + 235 TS2307 + 68 TS2875 + 14 TS2503 + 12 TS2591 are all caused by missing React/Radix/TanStack/Supabase typings; the remaining TS2322/TS7053/TS2339/TS2344 are downstream of `any` from those missing types. **This is not a real type check.** It did surface one real defect: 5× TS4111 in `animal-knowledge.ts` (fixed; now 0).

### Static inspection only
- `src/routes/livestock.tsx` (`validateSearch`, `useNavigate({ from })`, `Route.useSearch()`), `src/routes/expert.tsx`, `src/components/plant-photo.tsx`, `src/routes/account.tsx`, `src/routes/plants.$plantId.tsx`: **compiler-unverified**. The comparison-table change (`cellText`, `compareRows`) typechecked only against the stubs.
- Visual review of the 25 JPEGs and the 7 new crops (each shows its labelled species).

### BLOCKED
- Dependency install, real `tsc --noEmit`, `eslint`, `vite build`; any browser/RTL/mobile/accessibility run; Supabase and AI flows; downloading licensed photos — no network, no installed dependencies (global TypeScript exists but there are no `@types/react`, Radix, TanStack or lucide packages).

### NOT RUN
- Security audit beyond noting `.env` is tracked; dependency vulnerability scan.

## 2026-10-17 (sandbox: Node 22.22, Python; no network, no node_modules)

### Executed and PASSED
- `node --test src/data/animal-knowledge.test.ts` — 6/6 pass (unique ids; breed->type integrity; every type has breeds; ar/en text non-empty; search-param validation incl. cross-type breed dropped and 3-breed cap; Arabic normalisation). Type stripping only — **not** a TypeScript type check.
- Asset integrity: all 18 bundled JPEGs open and decode (Pillow); dimensions/hashes in ASSET_INVENTORY.md.
- Visual inspection of all 18 JPEGs on a contact sheet.

### Executed and FAILED
- First test run failed once on a wrong expectation in the new test (comparison returns catalogue order). Test corrected; no product code change for that. A real gap found and fixed: the `compare` URL param had no length cap.

### Static inspection only (not executed)
- `animal-knowledge-panel.tsx`, `livestock.tsx`, `plant-photo.tsx`, `account.tsx`, `plants.$plantId.tsx` reviewed by reading, including strict-TS options (`exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`). Compile correctness is **not** confirmed.
- Search for Ankara / Konya / 120-daily-points: absent from `src` and README.

### BLOCKED (cannot run here)
- Dependency install, `tsc --noEmit`, `eslint`, `vite build` — no network access to the package registry.
- Browser/UI smoke, responsive, RTL/LTR and accessibility runtime checks — no dependencies/browser.
- Supabase-backed flows (sign-in, inventory CRUD), AI insight calls — no network or credentials.
- Replacement of images with licensed photographs — no network.

### NOT RUN
- Security audit of RLS/server functions beyond noting `.env` is tracked; dependency vulnerability scan.
