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

const FILTER_CATEGORIES = ["AI", "Cloud", "Architecture", "Automation", "Platforms", "Web Engineering"];

const POOL_MAP = {
  AI: "ai",
  Cloud: "default",
  Architecture: "devtools",
  Automation: "devtools",
  Platforms: "php",
  "Web Engineering": "javascript",
};

function categorize(name, desc, lang) {
  const n = name.toLowerCase();
  const d = (desc || "").toLowerCase();
  const l = (lang || "").toLowerCase();
  const text = `${n} ${d} ${l}`;

  if (/ai|bot|chat|speech|dialogflow|alexa|prompt|salesiq|aira|agent-human|llm|openai/.test(text)) return "AI";
  if (/cloud|aws|azure|gcp|kubernetes|docker|terraform|serverless|lambda/.test(text)) return "Cloud";
  if (/architect|microservice|api-gateway|platform|enterprise|scalab/.test(text)) return "Architecture";
  if (/automat|scraper|bot-browser|cron|pipeline|ci|deploy|host-manager|host-entry|wamp|windows-host/.test(text)) return "Automation";
  if (/drupal|laravel|lumen|cms|headless|mysql|pdo|survey|commerce|platform/.test(text)) return "Platforms";
  if (/javascript|typescript|node|angular|vue|jquery|php|swift|rust|html|css|web|ssr|pagespeed|lighthouse|discope|devtools|cheat/.test(text)) return "Web Engineering";
  if (l === "rust" || n === "discope") return "Web Engineering";
  if (/security|crypto|encrypt|htaccess|xss/.test(text)) return "Architecture";
  return "Web Engineering";
}

function runGh() {
  const raw = execSync(
    "gh repo list noncent --limit 200 --json name,visibility,description,primaryLanguage,updatedAt,url,isPrivate,stargazerCount,forkCount",
    { encoding: "utf8" }
  );
  return JSON.parse(raw);
}

const rows = runGh().filter((r) => !r.isPrivate);
const repos = rows.map((r) => {
  const lang = r.primaryLanguage?.name || null;
  const category = categorize(r.name, r.description, lang);
  const images = pickImages(POOL_MAP[category] || "default", r.name);
  return {
    name: r.name,
    description: r.description || "",
    language: lang,
    category,
    stars: r.stargazerCount || 0,
    forks: r.forkCount || 0,
    cover: images.cover,
    fallback: images.fallback,
    url: r.url,
    updatedAt: r.updatedAt,
  };
});

repos.sort((a, b) => b.stars - a.stars || new Date(b.updatedAt) - new Date(a.updatedAt));

const stats = {
  public: repos.length,
  total: repos.length,
  languages: new Set(repos.map((r) => r.language).filter(Boolean)).size,
  categories: FILTER_CATEGORIES.length,
  totalStars: repos.reduce((s, r) => s + r.stars, 0),
  totalForks: repos.reduce((s, r) => s + r.forks, 0),
};

const payload = {
  generatedAt: new Date().toISOString(),
  owner: "noncent",
  filterCategories: FILTER_CATEGORIES,
  stats,
  repos,
};

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(payload, null, 2) + "\n");
console.log(`Wrote ${repos.length} public repos → ${outPath}`);
