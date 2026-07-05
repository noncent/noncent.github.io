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

  const BRAND_META = {
    github: {
      color: "#24292f",
      path: `<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>`,
    },
    stackoverflow: {
      color: "#F48024",
      path: `<path d="M15.725 24l-1.72-3.72 8.955-4.1-8.955-4.1 1.72-3.72L24 12l-8.275 3.72zM12.58 10.11l-7.37 3.39 1.55 3.36 7.37-3.39-1.55-3.36zm-1.12-4.98L4.09 8.52l1.55 3.36 7.37-3.39-1.55-3.36zM1.72 0l1.72 3.72L0 7.82l8.275 3.72-1.72 3.72L12 24l8.275-8.74-1.72-3.72L24 7.82 10.555 3.72 8.835 0 1.72 0z"/>`,
    },
    medium: {
      color: "#000000",
      path: `<path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>`,
    },
  };

  const CLOUD_BRAND_META = {
    aws: {
      color: "#FF9900",
      path: `<path d="M6.5 14.5c3.5 2.5 9 2.5 12.5 0 .3-.2.7 0 .5.4-1 1.5-4 2.5-6.8 2.5s-5.8-1-6.8-2.5c-.2-.4.2-.6.5-.4z"/><path d="M12 4l-1 6h2L12 4zm-4 3l2 5h2L8 7zm8 0l-2 5h-2l2-5z"/>`,
    },
    gcp: {
      color: "#4285F4",
      path: `<path d="M12 4c2.5 0 4.6 1.4 5.7 3.5l-2.5 1.4A3.5 3.5 0 0012 6.5 3.5 3.5 0 008.5 10H6a6 6 0 0112 0h-2.5A3.5 3.5 0 0012 4z"/><circle cx="8.5" cy="14" r="2.5" fill="#34A853"/><circle cx="15.5" cy="14" r="2.5" fill="#FBBC05"/><circle cx="12" cy="17.5" r="2.5" fill="#EA4335"/>`,
    },
    azure: {
      color: "#0078D4",
      path: `<path d="M5 4h6.5l2 4.5L12 19 5 4zm7 0H19l-7 15 2.5-6L12 4z"/>`,
    },
    docker: {
      color: "#2496ED",
      path: `<path d="M4 10h2v2H4v-2zm3 0h2v2H7v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm-9-3h2v2H4V7zm3 0h2v2H7V7zm3 0h2v2h-2V7zm8 1h-2a4 4 0 00-3.8 2.8 5 5 0 002.8 6.5H20a3 3 0 000-6h-1v-3z"/>`,
    },
  };

  function brandIcon(name, className) {
    const meta = BRAND_META[String(name || "").toLowerCase()];
    if (!meta) return "";
    const cls = className ? ` class="${className}"` : "";
    return `<svg${cls} viewBox="0 0 24 24" aria-hidden="true" fill="${meta.color}">${meta.path}</svg>`;
  }

  function cloudIcon(name, className) {
    const meta = CLOUD_BRAND_META[String(name || "").toLowerCase()];
    if (!meta) return "";
    const cls = className ? ` class="${className}"` : "";
    return `<svg${cls} viewBox="0 0 24 24" aria-hidden="true" fill="${meta.color}">${meta.path}</svg>`;
  }

  global.NONCENT_ICONS = {
    icon,
    langIcon,
    langColor,
    brandIcon,
    cloudIcon,
    categoryIcon(cat) {
      return icon(categoryIcons[cat] || categoryIcons.default, "chip-icon");
    },
    paths,
    categoryIcons,
    LANG_META,
    BRAND_META,
    CLOUD_BRAND_META,
  };
})(typeof window !== "undefined" ? window : globalThis);
