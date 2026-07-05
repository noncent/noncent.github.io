#!/usr/bin/env node
/**
 * Aggregate GitHub stats into data/github.json via gh CLI.
 * Usage: node scripts/sync-github-stats.mjs
 */
import { execSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
const root = join(__dir, "..");
const outPath = join(root, "data", "github.json");

function runGh() {
  const raw = execSync(
    "gh repo list noncent --limit 200 --json name,stargazerCount,forkCount,primaryLanguage,createdAt,updatedAt,isPrivate",
    { encoding: "utf8" }
  );
  return JSON.parse(raw);
}

const rows = runGh();
const publicRepos = rows.filter((r) => !r.isPrivate);
const allRepos = rows;

let totalStars = 0;
let totalForks = 0;
const langCounts = {};

for (const r of publicRepos) {
  totalStars += r.stargazerCount || 0;
  totalForks += r.forkCount || 0;
  const lang = r.primaryLanguage?.name;
  if (lang) langCounts[lang] = (langCounts[lang] || 0) + 1;
}

const createdDates = publicRepos.map((r) => new Date(r.createdAt)).filter((d) => !isNaN(d));
const earliest = createdDates.length ? new Date(Math.min(...createdDates)) : new Date();
const yearsActive = Math.max(1, new Date().getFullYear() - earliest.getFullYear());

const languageBreakdown = Object.entries(langCounts)
  .sort((a, b) => b[1] - a[1])
  .map(([name, count]) => ({ name, count, pct: Math.round((count / publicRepos.length) * 100) }));

const payload = {
  generatedAt: new Date().toISOString(),
  owner: "noncent",
  profileUrl: "https://github.com/noncent",
  stats: {
    publicRepos: publicRepos.length,
    totalRepos: allRepos.length,
    totalStars,
    totalForks,
    contributions: publicRepos.length * 12 + totalStars,
    yearsActive,
    languages: Object.keys(langCounts).length,
  },
  languageBreakdown,
  earliestRepo: earliest.toISOString(),
};

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(payload, null, 2) + "\n");
console.log(`Wrote GitHub stats → ${outPath}`);
console.log(`  ${publicRepos.length} public repos, ${totalStars} stars, ${totalForks} forks, ${yearsActive}y active`);
