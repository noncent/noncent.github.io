#!/usr/bin/env node
/**
 * Sync GitHub repos into data/repos.json via gh CLI.
 * Usage: node scripts/sync-repos.mjs
 */
import { execSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pickImages } from "./image-pools.mjs";

const __dir = dirname(fileURLToPath(import.meta.url));
const root = join(__dir, "..");
const outPath = join(root, "data", "repos.json");

function categorize(name, desc, lang) {
  const n = name.toLowerCase();
  const d = (desc || "").toLowerCase();
  const l = (lang || "").toLowerCase();
  const text = `${n} ${d}`;

  if (/ai|bot|chat|speech|dialogflow|alexa|prompt|salesiq|aira|agent-human/.test(text)) return "ai";
  if (/instagram|twitter|tweet|social|scraper|follower/.test(text)) return "social";
  if (/crypto|encrypt|security|htaccess|xss|escape/.test(text)) return "security";
  if (l === "swift" || /ios|android|macos|bruos/.test(text)) return "mobile";
  if (l === "rust" || n === "discope") return "rust";
  if (/pagespeed|lighthouse|discope|devtools|cheat|host-manager|host-entry|wamp|windows-host|bulk-page/.test(text)) return "devtools";
  if (l === "php" || /laravel|lumen|codeigniter|mysql|pdo/.test(text)) return "php";
  if (/javascript|typescript|node|angular|vue|jquery|js/.test(l) || /\.js$|node|angular|ssr|bot-browser/.test(text)) return "javascript";
  return "default";
}

function runGh() {
  const raw = execSync(
    'gh repo list noncent --limit 200 --json name,visibility,description,primaryLanguage,updatedAt,url,isPrivate',
    { encoding: "utf8" }
  );
  return JSON.parse(raw);
}

const rows = runGh().filter((r) => !r.isPrivate);
const repos = rows.map((r) => {
  const lang = r.primaryLanguage?.name || null;
  const category = categorize(r.name, r.description, lang);
  const images = pickImages(category, r.name);
  return {
    name: r.name,
    description: r.description || "",
    language: lang,
    category,
    cover: images.cover,
    montage: images.montage,
    fallback: images.fallback,
    url: r.url,
    updatedAt: r.updatedAt,
  };
});

repos.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

const stats = {
  public: repos.length,
  total: repos.length,
  languages: new Set(repos.map((r) => r.language).filter(Boolean)).size,
  categories: new Set(repos.map((r) => r.category)).size,
};

const payload = {
  generatedAt: new Date().toISOString(),
  owner: "noncent",
  stats,
  repos,
};

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(payload, null, 2) + "\n");
console.log(`Wrote ${repos.length} public repos → ${outPath}`);
