#!/usr/bin/env node
/**
 * Fetch Medium articles from RSS into data/thought-leadership.json.
 * Usage: node scripts/sync-medium.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const FEED_URL = "https://medium.com/@neerajsinghsonu/feed";
const __dir = dirname(fileURLToPath(import.meta.url));
const root = join(__dir, "..");
const outPath = join(root, "data", "thought-leadership.json");

function tag(xml, name) {
  const re = new RegExp(`<${name}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${name}>|<${name}[^>]*>([^<]*)<\\/${name}>`, "i");
  const m = xml.match(re);
  return (m?.[1] ?? m?.[2] ?? "").trim();
}

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function cleanUrl(url) {
  try {
    const u = new URL(url);
    u.search = "";
    return u.toString();
  } catch {
    return url.split("?")[0];
  }
}

function fmtDate(pubDate) {
  const d = new Date(pubDate);
  if (isNaN(d)) return pubDate || "";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function parseItems(xml) {
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
  return blocks.map((block) => {
    const title = tag(block, "title");
    const link = cleanUrl(tag(block, "link"));
    const pubDate = tag(block, "pubDate");
    const content = tag(block, "content:encoded") || tag(block, "description");
    const categories = [...block.matchAll(/<category[^>]*><!\[CDATA\[([^\]]+)\]\]><\/category>/gi)].map((m) => m[1]);
    const excerpt = stripHtml(content).slice(0, 160) + (stripHtml(content).length > 160 ? "…" : "");

    return {
      type: "article",
      title,
      date: fmtDate(pubDate),
      excerpt,
      url: link,
      category: categories[0] || "article",
    };
  }).filter((a) => a.title && a.url);
}

const res = await fetch(FEED_URL);
if (!res.ok) throw new Error(`Medium RSS fetch failed: ${res.status}`);
const xml = await res.text();
const items = parseItems(xml);

const payload = {
  source: "https://medium.com/@neerajsinghsonu",
  generatedAt: new Date().toISOString(),
  items,
};

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(payload, null, 2) + "\n");
console.log(`Wrote ${items.length} Medium articles → ${outPath}`);
