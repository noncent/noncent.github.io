#!/usr/bin/env node
/**
 * Generate uniform certificate cards — badge icon on card, title, issuer, skill, date.
 * Usage: node scripts/generate-cert-cards.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { V2 } from "./cert-card-themes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CERTS_JSON = path.join(ROOT, "data", "certificates.json");
const OUT_DIR = path.join(ROOT, "assets", "certs");

const BADGE_INNER = fs
  .readFileSync(path.join(ROOT, "assets/certs/certificate-badge.svg"), "utf8")
  .replace(/<\?xml[^>]*>\s*/i, "")
  .replace(/<svg[^>]*>/, "")
  .replace(/<\/svg>\s*$/, "")
  .trim();

const CARD = { w: 360, h: 210 };

const PLATFORM_LABEL = {
  linkedin: "LinkedIn Learning",
  coursera: "Coursera",
};

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapTitle(title, max = 40) {
  const words = title.split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (next.length > max && line) {
      lines.push(line);
      line = w;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines.slice(0, 2);
}

function truncate(s, max) {
  if (!s || s.length <= max) return s || "";
  return `${s.slice(0, max - 1)}…`;
}

function svgForCert(cert) {
  const { w, h } = CARD;
  const lines = wrapTitle(cert.title);
  const titleY = 96;
  const plat = cert.platform === "linkedin" ? "" : (PLATFORM_LABEL[cert.platform] || "");

  const titleSvg = lines
    .map(
      (ln, i) =>
        `<text x="22" y="${titleY + i * 21}" font-family="Nunito, system-ui, sans-serif" font-size="13.5" font-weight="800" fill="${V2.text}">${esc(ln)}</text>`
    )
    .join("\n  ");

  const skill = truncate(cert.skill, 28);
  const skillPill = skill
    ? `<rect x="22" y="${h - 34}" width="${Math.min(skill.length * 5.8 + 18, w - 120)}" height="20" rx="10" fill="${V2.purpleSoft}"/>
  <text x="31" y="${h - 20}" font-family="Nunito, system-ui, sans-serif" font-size="9" font-weight="700" fill="${V2.purpleDark}">${esc(skill)}</text>`
    : "";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(cert.title)}">
  <rect width="${w}" height="${h}" rx="14" fill="${V2.white}" stroke="${V2.border}" stroke-width="1"/>
  <rect width="${w}" height="3" rx="14" fill="${V2.purple}"/>
  <rect y="0" width="${w}" height="3" fill="${V2.purple}"/>
  <g transform="translate(18, 16)">${BADGE_INNER}</g>
  <text x="74" y="36" font-family="Nunito, system-ui, sans-serif" font-size="9" font-weight="700" fill="${V2.purple}" letter-spacing="0.12em">CERTIFICATE</text>
  <text x="74" y="52" font-family="Nunito, system-ui, sans-serif" font-size="11" font-weight="700" fill="${V2.text}">${esc(truncate(cert.issuer, 32))}</text>
  ${plat ? `<text x="74" y="66" font-family="Nunito, system-ui, sans-serif" font-size="9" font-weight="600" fill="${V2.muted}">via ${esc(plat)}</text>` : ""}
  <line x1="22" y1="78" x2="${w - 22}" y2="78" stroke="${V2.border}" stroke-width="1"/>
  ${titleSvg}
  ${skillPill}
  ${cert.issued ? `<text x="${w - 22}" y="${h - 18}" text-anchor="end" font-family="Nunito, system-ui, sans-serif" font-size="10" font-weight="600" fill="${V2.muted}">${esc(cert.issued)}</text>` : ""}
</svg>`;
}

function main() {
  const data = JSON.parse(fs.readFileSync(CERTS_JSON, "utf8"));
  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const cert of data.items || []) {
    cert.size = "landscape";
    const rel = `assets/certs/${cert.id}.svg`;
    fs.writeFileSync(path.join(ROOT, rel), svgForCert(cert));
    cert.cover = rel;
  }

  fs.writeFileSync(CERTS_JSON, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Generated ${data.items.length} cards`);
}

main();
