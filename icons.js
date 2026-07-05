(function (global) {
  "use strict";

  const stroke = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

  const paths = {
    bot: `<rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V7M8 7h8M9 15h.01M15 15h.01M8 3h8v4H8z"/>`,
    zap: `<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>`,
    package: `<path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>`,
    star: `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>`,
    code: `<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>`,
    shield: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
    smartphone: `<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>`,
    wrench: `<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>`,
    globe: `<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>`,
    users: `<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>`,
    cpu: `<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>`,
    folder: `<path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>`,
    layers: `<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>`,
    arrowRight: `<path d="M5 12h14M12 5l7 7-7 7"/>`,
    award: `<circle cx="12" cy="8" r="6"/><path d="M8.21 13.89L7 22l5-3 5 3-1.21-8.11"/>`,
    message: `<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>`,
  };

  const categoryIcons = {
    ai: "bot",
    devtools: "wrench",
    php: "code",
    javascript: "code",
    security: "shield",
    mobile: "smartphone",
    rust: "cpu",
    social: "users",
    default: "folder",
  };

  const LANG_META = {
    php: {
      color: "#777BB4",
      path: `<ellipse cx="12" cy="14" rx="7" ry="5"/><circle cx="12" cy="8" r="4"/><path d="M9 7h1.5l.5 2M13 7h1.5l-.5 2" fill="#fff"/>`,
    },
    javascript: {
      color: "#F7DF1E",
      path: `<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 8l-2 4 2 4M16 8l2 4-2 4M11 7l-2 10" stroke="#000" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    },
    typescript: {
      color: "#3178C6",
      path: `<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 8h3a2.5 2.5 0 010 5H9v3H8V8zm1 4h2a1.5 1.5 0 000-3H9v3zm6-4h-3v8h3a2.5 2.5 0 000-5h-2V8z" fill="#fff"/>`,
    },
    html: {
      color: "#E34F26",
      path: `<path d="M4 3l1.5 17 6.5 2 6.5-2L20 3H4zm3.2 4.5h7.1l-.4 4.2H8.8l.2 2.5 3 1 .3-.1.3 3.2-2.6.8-2.6-.8-.2-2h2.6l.1 1.2 1.4.4 1.4-.4.2-2.2H9.4l-.4-5.3z"/>`,
    },
    swift: {
      color: "#F05138",
      path: `<path d="M4 16c3-4 6-6 10-8 2-1 4-1 6 0-3 2-5 4-7 7-2 2-5 4-9 5z"/><path d="M6 18c2-2 5-4 8-5 2-.5 4-.5 5 0-2 1-4 2-6 4-1.5 1.5-3.5 2.5-7 3z" opacity=".7"/>`,
    },
    rust: {
      color: "#DEA584",
      path: `<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1l2.1-2.1M17 7l2.1-2.1"/>`,
    },
    vue: {
      color: "#42B883",
      path: `<path d="M12 4l9 16H3L12 4z"/><path d="M12 9l4 7H8l4-7z" fill="#35495E"/>`,
    },
    python: {
      color: "#3776AB",
      path: `<path d="M9 4h6v3H11v2h5a3 3 0 013 3v2H9v-2h6v-2h-4a3 3 0 01-3-3V7a3 3 0 013-3z"/><circle cx="10" cy="6" r="1" fill="#FFD43B"/><circle cx="15" cy="17" r="1" fill="#FFD43B"/>`,
    },
    batchfile: {
      color: "#4D4D4D",
      path: `<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h6M7 12h4M7 15h8" stroke="#fff" stroke-width="1.5" fill="none"/>`,
    },
    default: {
      color: "#2563eb",
      path: `<path d="M8 7l-4 5 4 5M16 7l4 5-4 5M14 5l-4 14"/>`,
    },
  };

  function normalizeLang(name) {
    return String(name || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "");
  }

  function langColor(name) {
    return (LANG_META[normalizeLang(name)] || LANG_META.default).color;
  }

  function langIcon(name, className) {
    const meta = LANG_META[normalizeLang(name)] || LANG_META.default;
    const cls = className ? ` class="${className}"` : "";
    return `<svg${cls} viewBox="0 0 24 24" aria-hidden="true" fill="${meta.color}">${meta.path}</svg>`;
  }

  function icon(name, className) {
    const p = paths[name];
    if (!p) return "";
    const cls = className ? ` class="${className}"` : "";
    return `<svg${cls} viewBox="0 0 24 24" aria-hidden="true" ${stroke}>${p}</svg>`;
  }

  global.NONCENT_ICONS = {
    icon,
    langIcon,
    langColor,
    categoryIcon(cat) {
      return icon(categoryIcons[cat] || categoryIcons.default, "chip-icon");
    },
    paths,
    categoryIcons,
    LANG_META,
  };
})(typeof window !== "undefined" ? window : globalThis);
