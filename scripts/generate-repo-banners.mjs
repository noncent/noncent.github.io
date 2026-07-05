#!/usr/bin/env node
/**
 * Generate v2-branded SVG banners for each repo in data/repos.json.
 * Usage: node scripts/generate-repo-banners.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GRADIENTS, getRepoTheme } from "./repo-banner-themes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const REPOS_JSON = path.join(ROOT, "data", "repos.json");
const OUT_DIR = path.join(ROOT, "assets", "covers", "repos");

const W = 640;
const H = 400;

/** Inline icon paths (24×24 viewBox, scaled in banner) */
const ICONS = {
  scraper: `<path fill="currentColor" d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6zM10 10h4v4h-4v-4z"/>`,
  database: `<path fill="currentColor" d="M12 3C7 3 3 4.8 3 7v10c0 2.2 4 4 9 4s9-1.8 9-4V7c0-2.2-4-4-9-4zm0 2c4.4 0 7 .9 7 2s-2.6 2-7 2-7-.9-7-2 2.6-2 7-2zm-7 5.5c1.8 1 4.5 1.5 7 1.5s5.2-.5 7-1.5V12c0 1.1-2.6 2-7 2s-7-.9-7-2v-1.5zm0 5c1.8 1 4.5 1.5 7 1.5s5.2-.5 7-1.5V17c0 1.1-2.6 2-7 2s-7-.9-7-2v-1.5z"/>`,
  security: `<path fill="currentColor" d="M12 2L4 5v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V5l-8-3zm0 2.2l6 2.3v4.5c0 4.3-2.9 8.4-6 9.5-3.1-1.1-6-5.2-6-9.5V6.5l6-2.3zM11 10h2v5h-2v-5zm0-3h2v2h-2V7z"/>`,
  mysql: `<path fill="currentColor" d="M12 2C8 2 5 3.5 5 5.5v13C5 20.5 8 22 12 22s7-1.5 7-3.5v-13C19 3.5 16 2 12 2zm0 2c2.8 0 5 .8 5 1.5S14.8 7 12 7 7 6.2 7 5.5 9.2 4 12 4z"/>`,
  mobile: `<path fill="currentColor" d="M8 2h8a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2zm4 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>`,
  javascript: `<path fill="currentColor" d="M4 4h16v16H4V4zm10.5 11.5c.3 1.5 1.5 2.5 3.2 2.5 2 0 3.3-1 3.3-2.5 0-1.1-.6-1.8-2.5-2.4l-1-.3c-1.2-.4-1.7-.7-1.7-1.3 0-.6.6-1 1.5-1 1 0 1.5.4 1.8 1.1l1.6-.9c-.6-1.2-1.7-1.9-3.4-1.9-2 0-3.3 1.2-3.3 2.7 0 1.3.8 2 2.4 2.5l1 .3c1.3.4 1.8.8 1.8 1.5 0 .7-.7 1.2-1.8 1.2-1.2 0-2-.6-2.3-1.6l-1.5.8zM9 11.5h2.2l1.3 6.5H10l-1-6.5z"/>`,
  cms: `<path fill="currentColor" d="M4 4h16v4H4V4zm0 6h10v4H4v-4zm0 6h16v4H4v-4z"/>`,
  error: `<path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>`,
  github: `<path fill="currentColor" d="M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-3 .7-3.6-1.3-3.6-1.3-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.7 1.7 2.5 2.4.8.4 1.4.6 1.7.5-.1-.4-.4-.7-.7-1 0 0-1.8-.7-1.8-2.8 0-.6.2-1.1.6-1.5-.1-.6-.3-1.5.1-2.2 0 0 .5-.2 1.7 1.1.5-.2 1-.3 1.5-.3s1 .1 1.5.3c1.2-1.3 1.7-1.1 1.7-1.1.4.7.2 1.6.1 2.2.4.4.6.9.6 1.5 0 2.1-1.8 2.8-1.8 2.8-.3.3-.5.8-.5 1.3v2c0 .3.2.6.7.5A10 10 0 0012 2z"/>`,
  cheatsheet: `<path fill="currentColor" d="M6 2h12a2 2 0 012 2v16l-4-2-4 2-4-2-4 2V4a2 2 0 012-2zm2 6h8v2H8V8zm0 4h8v2H8v-2z"/>`,
  windows: `<path fill="currentColor" d="M3 5.5l7-1v7H3v-6zm0 7.5h7V20l-7-1.2V13zm9-8.7l8-1.2v9.4h-8V4.3zm0 10.7h8V22l-8-1.2v-6.2z"/>`,
  twitter: `<path fill="currentColor" d="M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.2 1.7-2.1-.8.5-1.6.8-2.5 1-0.7-.8-1.8-1.3-3-1.3-2.3 0-4.1 1.8-4.1 4.1 0 .3 0 .6.1.9-3.4-.2-6.4-1.8-8.4-4.3-.4.6-.6 1.3-.6 2.1 0 1.4.7 2.7 1.8 3.4-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4-.3.1-.7.2-1.1.2-.3 0-.5 0-.8-.1.5 1.5 1.9 2.6 3.5 2.6-1.3 1-2.9 1.6-4.7 1.6-.3 0-.6 0-.9-.1 1.7 1.1 3.7 1.7 5.9 1.7 7.1 0 11-5.9 11-11v-.5c.8-.5 1.4-1.2 1.9-2z"/>`,
  wamp: `<path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1 5h2v6h-2V7zm0 8h2v2h-2v-2z"/>`,
  code: `<path fill="currentColor" d="M8.5 6L4 10.5 8.5 15l1.4-1.4L6.8 10.5l3.1-3.1L8.5 6zm7 0l-1.4 1.4 3.1 3.1-3.1 3.1 1.4 1.4L20 10.5 15.5 6z"/>`,
  config: `<path fill="currentColor" d="M12 8a4 4 0 110 8 4 4 0 010-8zm8.9 4.5l1.6 1.4-1.5 2.6 1.9 1.1-.3 2.1-2.2.3-.8 2-2.3-.8-1.9 1.5-1.6-1.4-1.5 2.6-1.9-1.1.3-2.2 2.2-.3.8-2 2.3.8 1.9-1.5 1.6 1.4 1.5-2.6 1.9 1.1-.3 2.1-2.2-.3-.8 2-2.3-.8-1.9-1.5z"/>`,
  json: `<path fill="currentColor" d="M6 6h2v12H6c-1.5 0-2-1-2-2V8c0-1 0.5-2 2-2zm12 0c1.5 0 2 1 2 2v8c0 1-0.5 2-2 2h-2V6h2zM9 8h6v2H9V8zm0 4h6v2H9v-2z"/>`,
  ai: `<path fill="currentColor" d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 17l-6.3 4 2.3-7-6-4.6h7.6L12 2z"/>`,
  disk: `<path fill="currentColor" d="M4 4h16v16H4V4zm2 2v12h12V6H6zm8 8a2 2 0 110-4 2 2 0 010 4z"/>`,
  crypto: `<path fill="currentColor" d="M12 2L4 6v12l8 4 8-4V6l-8-4zm0 2.2l5.5 2.8L12 9.8 6.5 7 12 4.2zM6 8.5l5 2.5v5.8l-5-2.5V8.5zm12 0v5.8l-5 2.5v-5.8l5-2.5z"/>`,
  browser: `<path fill="currentColor" d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 4v8h16V8H4zm3 2h4v2H7v-2z"/>`,
  demo: `<path fill="currentColor" d="M8 5v14l11-7L8 5z"/>`,
  ssr: `<path fill="currentColor" d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>`,
  alexa: `<path fill="currentColor" d="M12 3a9 9 0 00-6.4 15.4l1.4-1.4A7 7 0 1112 5a7 7 0 016.4 4.2l1.4-1.4A9 9 0 0012 3zm-3 8h6v2H9v-2z"/>`,
  ssl: `<path fill="currentColor" d="M12 2L4 5v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V5l-8-3zm-1 9h2v5h-2v-5zm0-3h2v2h-2v-2z"/>`,
  git: `<path fill="currentColor" d="M12 2l-2 2 1.4 1.4L12 4.8l.6.6L13.4 4 12 2zM6 8l-2 2 6 6 2-2-6-6zm12 0l-6 6 2 2 6-6-2-2zM12 14l-2 2 2 2 2-2-2-2z"/>`,
  bot: `<path fill="currentColor" d="M12 2a2 2 0 012 2v1h3a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h3V4a2 2 0 012-2zm-3 8a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/>`,
  php: `<path fill="currentColor" d="M4 4h16v16H4V4zm3 5h2.5c2 0 3.5 1.2 3.5 3s-1.5 3-3.5 3H8v2H6V9h1zm2 2v2h1c.8 0 1.5-.5 1.5-1s-.7-1-1.5-1H9zm5-2h4v1.5h-2.5V12H18v1.5h-2.5V15H18V16h-4V9z"/>`,
  survey: `<path fill="currentColor" d="M4 4h16v3H4V4zm0 5h10v3H4V9zm0 5h16v3H4v-3z"/>`,
  api: `<path fill="currentColor" d="M4 8h4v8H4V8zm6-3h4v14h-4V5zm6 6h4v8h-4v-8z"/>`,
  chat: `<path fill="currentColor" d="M4 4h16v10H6l-2 4V4zm4 3h8v2H8V7zm0 3h5v2H8v-2z"/>`,
  jwt: `<path fill="currentColor" d="M12 2L4 6v12l8 4 8-4V6l-8-4zm0 3l5 2.5v5L12 15 7 12.5v-5L12 5z"/>`,
  speech: `<path fill="currentColor" d="M12 3a3 3 0 00-3 3v6a3 3 0 006 0V6a3 3 0 00-3-3zm-5 9a5 5 0 0010 0h2a7 7 0 01-14 0h2zM11 19h2v2h-2v-2z"/>`,
  handoff: `<path fill="currentColor" d="M8 8h8v2H8V8zm0 4h5v2H8v-2zM4 4h16v12H4V4zm2 2v8h12V6H6z"/>`,
  dialogflow: `<path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 5h4v2h-4V7zm0 4h4v2h-4v-2zm0 4h4v2h-4v-2z"/>`,
  laravel: `<path fill="currentColor" d="M12 2L4 6v12l8 4 8-4V6l-8-4zm0 2.5L17 7.5v9L12 18.5 7 16.5v-9L12 4.5z"/>`,
  migration: `<path fill="currentColor" d="M12 4l-4 4h3v8h2V8h3l-4-4zm-6 12h12v2H6v-2z"/>`,
  captcha: `<path fill="currentColor" d="M4 4h16v16H4V4zm4 4h2v2H8V8zm4 0h2v2h-2V8zm4 0h2v2h-2V8zM8 12h2v2H8v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zM8 16h2v2H8v-2zm4 0h2v2h-2v-2z"/>`,
  cloud: `<path fill="currentColor" d="M6 8a4 4 0 014-3.9A5 5 0 0119 10h1a3 3 0 010 6H6a4 4 0 010-8z"/>`,
  architecture: `<path fill="currentColor" d="M4 18h16v2H4v-2zm2-4h4v4H6v-4zm6 0h4v4h-4v-4zM8 6h8v6H8V6z"/>`,
  automation: `<path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2a8 8 0 110 16 8 8 0 010-16zm-1 3v5h4v2h-6V7h2z"/>`,
};

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function truncateName(name, max = 28) {
  if (name.length <= max) return name;
  return name.slice(0, max - 1) + "…";
}

function buildSvg(repo, theme) {
  const [c1, c2] = GRADIENTS[theme.gradient] || GRADIENTS.purple;
  const iconKey = theme.icon in ICONS ? theme.icon : "code";
  const iconPath = ICONS[iconKey];
  const label = truncateName(repo.name);
  const accent = theme.accent || repo.category || "";
  const iconColor = theme.gradient === "yellow" ? "#6C5CE7" : "#FFFFFF";
  const iconOpacity = theme.gradient === "yellow" ? "0.85" : "0.92";
  const textColor = theme.gradient === "yellow" ? "#2D3436" : "#FFFFFF";
  const subColor = theme.gradient === "yellow" ? "rgba(45,52,54,0.65)" : "rgba(255,255,255,0.75)";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeXml(repo.name)}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="560" cy="60" r="48" fill="${c1}" opacity="0.15"/>
  <circle cx="80" cy="340" r="64" fill="${c1}" opacity="0.12"/>
  <line x1="0" y1="320" x2="640" y2="280" stroke="${c1}" stroke-width="1" opacity="0.2"/>
  <g transform="translate(48, 48) scale(4.5)" fill="${iconColor}" opacity="${iconOpacity}">
    ${iconPath}
  </g>
  ${accent ? `<text x="48" y="340" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="${subColor}" letter-spacing="0.08em">${escapeXml(accent.toUpperCase())}</text>` : ""}
  <text x="48" y="372" font-family="system-ui,sans-serif" font-size="22" font-weight="700" fill="${textColor}">${escapeXml(label)}</text>
  <circle cx="600" cy="360" r="4" fill="${c1}" opacity="0.4"/>
  <circle cx="580" cy="380" r="3" fill="${c1}" opacity="0.3"/>
  <circle cx="620" cy="370" r="2" fill="${c1}" opacity="0.35"/>
</svg>
`;
}

function main() {
  const data = JSON.parse(fs.readFileSync(REPOS_JSON, "utf8"));
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let generated = 0;
  for (const repo of data.repos) {
    const theme = getRepoTheme(repo);
    const svg = buildSvg(repo, theme);
    const filename = `${repo.name}.svg`;
    const filepath = path.join(OUT_DIR, filename);
    fs.writeFileSync(filepath, svg, "utf8");
    repo.cover = `assets/covers/repos/${filename}`;
    generated++;
  }

  fs.writeFileSync(REPOS_JSON, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(`Generated ${generated} banners in ${OUT_DIR}`);
  console.log(`Updated cover paths in ${REPOS_JSON}`);
}

main();
