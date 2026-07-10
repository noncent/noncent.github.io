#!/usr/bin/env node
/**
 * Import certificates from data/certs-source.json (or --file path).
 * Usage: node scripts/import-certs.mjs --from-source
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "data", "certificates.json");
const SOURCE = path.join(ROOT, "data", "certs-source.json");

const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function parseDate(s) {
  if (!s) return 0;
  const m = s.match(/^([A-Za-z]{3})\s+(\d{4})$/);
  if (!m) return 0;
  return new Date(Number(m[2]), MONTHS[m[1]] ?? 0, 1).getTime();
}

function cleanUrl(url, credentialId, title) {
  if (url && url.includes("linkedin.com/safety/go")) {
    const m = url.match(/[?&]url=([^&]+)/);
    if (m) {
      try {
        return decodeURIComponent(m[1]);
      } catch {
        /* fall through */
      }
    }
  }
  if (url && !url.startsWith("url?id=") && url.startsWith("http")) return url.split("?")[0].replace(/\?$/, "") || url;
  if (credentialId) {
    const isSpec = /specialization|foundations|principles and practices/i.test(title + url);
    const kind = isSpec || (url && url.includes("specialization")) ? "specialization" : "records";
    return `https://www.coursera.org/account/accomplishments/${kind}/${credentialId}`;
  }
  return url && url.startsWith("http") ? url : "";
}

function issuerLabel(issuer) {
  if (/^linkedin$/i.test(issuer)) return "LinkedIn Learning";
  if (/university of california/i.test(issuer)) return "UC Irvine";
  if (/queen mary/i.test(issuer)) return "Queen Mary University";
  if (/google deepmind/i.test(issuer)) return "Google DeepMind";
  if (/google cloud/i.test(issuer)) return "Google Cloud";
  if (/^google$/i.test(issuer)) return "Google";
  if (/^adobe$/i.test(issuer)) return "Adobe";
  if (/skillup/i.test(issuer)) return "SkillUp";
  return issuer;
}

function platform(issuer, url) {
  if (/linkedin/i.test(issuer) || /linkedin\.com\/learning/i.test(url || "")) return "linkedin";
  return "coursera";
}

function toItem(raw, i) {
  const title = raw.title || "";
  const issuer = raw.issuer || "";
  const issued = raw.issued_date || raw.issued || "";
  const url = cleanUrl(raw.credential_url || raw.url || "", raw.credential_id, title);
  const skills = raw.skills || [];
  return {
    id: slugify(title) || `cert-${i + 1}`,
    title,
    issuer: issuerLabel(issuer),
    issued,
    url,
    credential_id: raw.credential_id || null,
    skill: skills[0] || "",
    platform: platform(issuer, url),
    size: "landscape",
    cover: "",
    _sort: parseDate(issued),
  };
}

function main() {
  const args = process.argv.slice(2);
  const fileIdx = args.indexOf("--file");
  const src = fileIdx !== -1 ? path.resolve(args[fileIdx + 1]) : SOURCE;

  if (!fs.existsSync(src)) {
    console.error(`Source not found: ${src}`);
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(src, "utf8"));
  const list = Array.isArray(raw) ? raw : raw.items || [];
  const seen = new Map();
  const items = list
    .map((r, i) => toItem(r, i))
    .sort((a, b) => b._sort - a._sort)
    .map(({ _sort, ...c }) => {
      const base = c.id;
      const n = seen.get(base) || 0;
      seen.set(base, n + 1);
      if (n > 0) c.id = `${base}-${n}`;
      return c;
    });

  const data = {
    summary: `${items.length} professional certifications & credentials`,
    items,
  };

  fs.writeFileSync(OUT, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Imported ${items.length} certs → ${OUT}`);
}

main();
