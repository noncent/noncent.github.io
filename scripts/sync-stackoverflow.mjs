#!/usr/bin/env node
/**
 * Fetch Stack Overflow profile stats into data/stackoverflow.json.
 * Usage: node scripts/sync-stackoverflow.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const USER_ID = 584262;
const BASE = `https://api.stackexchange.com/2.3/users/${USER_ID}`;
const __dir = dirname(fileURLToPath(import.meta.url));
const root = join(__dir, "..");
const outPath = join(root, "data", "stackoverflow.json");

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`SO API failed ${url}: ${res.status}`);
  return res.json();
}

const [profile, answers, questions] = await Promise.all([
  fetchJson(`${BASE}?site=stackoverflow`),
  fetchJson(`${BASE}/answers?site=stackoverflow&pagesize=1&filter=total`),
  fetchJson(`${BASE}/questions?site=stackoverflow&pagesize=1&filter=total`),
]);

const user = profile.items?.[0];
if (!user) throw new Error("Stack Overflow user not found");

const payload = {
  generatedAt: new Date().toISOString(),
  profileUrl: user.link || "https://stackoverflow.com/users/584262/nono",
  displayName: user.display_name,
  reputation: user.reputation,
  answers: answers.total ?? 0,
  questions: questions.total ?? 0,
  badges: {
    gold: user.badge_counts?.gold ?? 0,
    silver: user.badge_counts?.silver ?? 0,
    bronze: user.badge_counts?.bronze ?? 0,
  },
};

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(payload, null, 2) + "\n");
console.log(`Wrote SO stats → ${outPath}`);
console.log(`  ${payload.reputation} reputation, ${payload.answers} answers, ${payload.questions} questions`);
