#!/usr/bin/env node
/**
 * Import certificates into data/certificates.json.
 *
 * Usage:
 *   node scripts/import-certs.mjs --seed
 *   node scripts/import-certs.mjs --export /path/to/Certifications.csv
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { topicForTitle } from "./cert-card-themes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "data", "certificates.json");

const SIZES_CYCLE = ["landscape", "portrait", "square", "landscape", "square", "portrait"];

const SEED = [
  {
    title: "Advanced WordPress: Action and Filter Hooks (2017)",
    issuer: "LinkedIn Learning",
    issued: "Sep 2020",
    url: "https://linkedin.com/learning/certificates/5d221293c10134f1ae33eba6e4ffd416251ed5e80404a427c2ca08aec37c6ea2",
  },
  {
    title: "Amazon Web Services: High Availability (2016)",
    issuer: "LinkedIn Learning",
    issued: "Sep 2020",
    url: "https://linkedin.com/learning/certificates/83a24db586ecafb3961ebc39283a937bf8e449614be367214d8d40244768afe1",
  },
  {
    title: "AWS Certified Solutions Architect - Associate (SAA-C01): 1 Cloud Services Overview (2019)",
    issuer: "LinkedIn Learning",
    issued: "Sep 2020",
    url: "https://linkedin.com/learning/certificates/bf78d84a7395866eb8ad7374d2b90a783535b6bb71c6fbaaa28949f7512f2f5c",
  },
  {
    title: "AWS Certified Solutions Architect - Associate (SAA-C01): 4 Compute Services",
    issuer: "LinkedIn Learning",
    issued: "Sep 2020",
    url: "https://linkedin.com/learning/certificates/935939ecf679b314b062e4fc8377f30dfff8071072720756f195ce5a1f87b913",
  },
  {
    title: "AWS Certified Solutions Architect - Associate (SAA-C01): 5 Identity and Access Management",
    issuer: "LinkedIn Learning",
    issued: "Sep 2020",
    url: "https://linkedin.com/learning/certificates/4b1a37f5dc4950b09f568dcfcf9ce5f511b4bf1efa9a498f5c126b37bc02f562",
  },
  {
    title: "Exam Tips: AWS Certified Solutions Architect - Associate (SAA-C01)",
    issuer: "LinkedIn Learning",
    issued: "Sep 2020",
    url: "https://linkedin.com/learning/certificates/3c45208ada66b1f179f69f67ca5fb891d4c0ff9e00311c8313e3b6af8abbedb9",
  },
  {
    title: "Ionic 4.0 : Deploying Ionic Apps",
    issuer: "LinkedIn Learning",
    issued: "Sep 2020",
    url: "https://linkedin.com/learning/certificates/1ad83515ea44d9c0e60888b59a8bdc691a40f2422b78768e3575e96a6b211603",
  },
  {
    title: "Learning Cloud Computing: Serverless Computing (2018)",
    issuer: "LinkedIn Learning",
    issued: "Sep 2020",
    url: "https://linkedin.com/learning/certificates/9abc82aad0163a2c2555e2976d00602721ecda1dc3f261e493111bd5d37655b8",
  },
  {
    title: "Python Data Analysis",
    issuer: "LinkedIn Learning",
    issued: "Sep 2020",
    url: "https://linkedin.com/learning/certificates/50cb6713696e37e72a282d2360baf0b4e5b09e2e8b1a6be294e7c0309f45ee75",
  },
  {
    title: "Advanced PHP",
    issuer: "LinkedIn Learning",
    issued: "Aug 2020",
    url: "https://linkedin.com/learning/certificates/0b0aea138f3947bc63c77ad8e85fb4c89ec8f01af6d6e51e2119295080d623aa",
  },
];

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function toItem(raw, i) {
  const title = raw.title || raw.Name || raw["Certification Name"] || "";
  const issuer = raw.issuer || raw.Authority || raw["Issuing Organization"] || "LinkedIn Learning";
  const issued = raw.issued || raw["Started On"] || raw["Issue Date"] || "";
  const url = raw.url || raw.Url || raw["Certification URL"] || "";
  const topic = topicForTitle(title);
  return {
    id: slugify(title) || `cert-${i + 1}`,
    title,
    issuer,
    issued,
    url,
    topic,
    size: SIZES_CYCLE[i % SIZES_CYCLE.length],
    cover: "",
  };
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  return lines.slice(1).map((line) => {
    const cols = [];
    let cur = "";
    let inQ = false;
    for (const ch of line) {
      if (ch === '"') inQ = !inQ;
      else if (ch === "," && !inQ) {
        cols.push(cur.trim());
        cur = "";
      } else cur += ch;
    }
    cols.push(cur.trim());
    const row = {};
    headers.forEach((h, i) => {
      row[h] = (cols[i] || "").replace(/^"|"$/g, "");
    });
    return row;
  });
}

function writeJson(items) {
  const data = {
    summary: `${items.length} professional certification${items.length === 1 ? "" : "s"}`,
    items,
  };
  fs.writeFileSync(OUT, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Wrote ${items.length} certs to ${OUT}`);
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes("--seed") || args.length === 0) {
    writeJson(SEED.map((r, i) => toItem(r, i)));
    return;
  }
  const idx = args.indexOf("--export");
  if (idx !== -1 && args[idx + 1]) {
    const csvPath = args[idx + 1];
    const text = fs.readFileSync(csvPath, "utf8");
    const rows = parseCsv(text).filter((r) => r.Name || r.title || r["Certification Name"]);
    writeJson(rows.map((r, i) => toItem(r, i)));
    return;
  }
  console.error("Usage: node scripts/import-certs.mjs --seed | --export path/to/Certifications.csv");
  process.exit(1);
}

main();
