#!/usr/bin/env node
/**
 * Generate SVG certificate cards from data/certificates.json.
 * Usage: node scripts/generate-cert-cards.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { gradientForTopic, iconForTopic } from "./cert-card-themes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CERTS_JSON = path.join(ROOT, "data", "certificates.json");
const OUT_DIR = path.join(ROOT, "assets", "certs");

const SIZES = {
  portrait: { w: 280, h: 360 },
  landscape: { w: 400, h: 280 },
  square: { w: 320, h: 320 },
};

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapTitle(title, max = 42) {
  const words = title.split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (next.length > max && line) {
      lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function svgForCert(cert) {
  const sizeKey = cert.size || "landscape";
  const { w, h } = SIZES[sizeKey] || SIZES.landscape;
  const topic = cert.topic || "linkedin";
  const [c1, c2] = gradientForTopic(topic);
  const icon = iconForTopic(topic);
  const lines = wrapTitle(cert.title);
  const year = (cert.issued || "").replace(/.*(\d{4}).*/, "$1") || "";
  const lineY = h * 0.52;
  const lineStep = 22;

  const titleSvg = lines
    .map(
      (ln, i) =>
        `<text x="24" y="${lineY + i * lineStep}" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#FFFFFF">${esc(ln)}</text>`
    )
    .join("\n  ");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(cert.title)}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" rx="16" fill="url(#bg)"/>
  <circle cx="${w - 40}" cy="40" r="60" fill="#FFFFFF" opacity="0.08"/>
  <circle cx="30" cy="${h - 30}" r="50" fill="#FFFFFF" opacity="0.06"/>
  <g transform="translate(24, 28) scale(1.4)" fill="#FFFFFF" opacity="0.9">
    ${icon}
  </g>
  <text x="24" y="${h - 52}" font-family="system-ui,sans-serif" font-size="11" font-weight="600" fill="#FFFFFF" opacity="0.85">${esc(cert.issuer || "Certificate")}</text>
  ${year ? `<text x="24" y="${h - 32}" font-family="system-ui,sans-serif" font-size="11" fill="#FFFFFF" opacity="0.7">Issued ${esc(year)}</text>` : ""}
  ${titleSvg}
  <rect x="${w - 56}" y="${h - 36}" width="32" height="20" rx="4" fill="#FFFFFF" opacity="0.2"/>
  <text x="${w - 40}" y="${h - 22}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" font-weight="700" fill="#FFFFFF" opacity="0.9">CERT</text>
</svg>`;
}

function main() {
  const data = JSON.parse(fs.readFileSync(CERTS_JSON, "utf8"));
  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const cert of data.items || []) {
    const rel = `assets/certs/${cert.id}.svg`;
    const out = path.join(ROOT, rel);
    fs.writeFileSync(out, svgForCert(cert));
    cert.cover = rel;
    console.log("wrote", rel);
  }

  fs.writeFileSync(CERTS_JSON, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Updated ${data.items.length} certificate covers in certificates.json`);
}

main();
