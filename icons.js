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

  function icon(name, className) {
    const p = paths[name];
    if (!p) return "";
    const cls = className ? ` class="${className}"` : "";
    return `<svg${cls} viewBox="0 0 24 24" aria-hidden="true" ${stroke}>${p}</svg>`;
  }

  global.NONCENT_ICONS = {
    icon,
    categoryIcon(cat) {
      return icon(categoryIcons[cat] || categoryIcons.default, "chip-icon");
    },
    paths,
    categoryIcons,
  };
})(typeof window !== "undefined" ? window : globalThis);
