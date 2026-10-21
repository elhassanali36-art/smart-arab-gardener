// Git/secret hygiene check. Never prints secret values. Run: npm run test:hygiene
import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const failures = [];
const notes = [];
const read = (f) => (existsSync(join(root, f)) ? readFileSync(join(root, f), "utf8") : null);

// 1. .gitignore must ignore .env (and still allow .env.example)
const gi = (read(".gitignore") ?? "").split(/\r?\n/).map((l) => l.trim());
if (!gi.includes(".env")) failures.push(".gitignore does not ignore .env");
if (!gi.includes("!.env.example")) failures.push(".gitignore does not re-include .env.example");

// 2. .env.example must be placeholder-only
const example = read(".env.example");
if (example === null) failures.push(".env.example is missing");
else {
  const patterns = [/sb_publishable_[A-Za-z0-9_-]{8,}/, /sb_secret_[A-Za-z0-9_-]{8,}/, /eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/, /\bsk-[A-Za-z0-9]{16,}/, /[a-z0-9]{20}\.supabase\.co/];
  for (const p of patterns) if (p.test(example)) failures.push(`.env.example contains a real-looking value (${p.source.slice(0, 24)}...)`);
  // Values from the real .env (if present locally) must not appear in the example. Values are never printed.
  const env = read(".env");
  if (env) {
    for (const line of env.split(/\r?\n/)) {
      const v = line.includes("=") ? line.slice(line.indexOf("=") + 1).trim().replace(/^"|"$/g, "") : "";
      if (v.length >= 8 && example.includes(v)) failures.push(".env.example repeats a value from .env");
    }
    notes.push("local .env present (left untouched; values not read into output)");
  } else notes.push("no local .env present");
}

// 3. Is .env tracked by Git? Only answerable with a .git directory.
if (existsSync(join(root, ".git"))) {
  try {
    execFileSync("git", ["ls-files", "--error-unmatch", ".env"], { cwd: root, stdio: "ignore" });
    notes.push("TRACKED: .env is tracked by Git -> needs `git rm --cached .env` (requires explicit approval; not run)");
    process.exitCode = process.exitCode ?? 0;
  } catch {
    notes.push(".env is NOT tracked by Git");
  }
} else notes.push("tracking status UNVERIFIABLE: no .git directory in this export");

for (const n of notes) console.log("note:", n);
if (failures.length) { console.error("FAILURES:\n- " + failures.join("\n- ")); process.exit(1); }
console.log("env hygiene checks: OK");
