/**
 * Per-repo semantic banner themes for SVG generation.
 * Each repo gets a unique icon + gradient tuned to its purpose.
 */

export const GRADIENTS = {
  purple: ["#6C5CE7", "#EDE9FE"],
  yellow: ["#FDCB6E", "#FFF8E7"],
  rust: ["#C97B5A", "#FFF0E8"],
  blue: ["#3178C6", "#E8F0FE"],
  green: ["#42B883", "#E8F8F0"],
  security: ["#4A5568", "#EDE9FE"],
  social: ["#D63384", "#FCE4F0"],
  twitter: ["#1DA1F2", "#E3F2FD"],
  windows: ["#0078D4", "#E8F4FC"],
  php: ["#777BB4", "#EEEEF8"],
  orange: ["#F48024", "#FFF3E8"],
  teal: ["#0D9488", "#E6FFFA"],
  indigo: ["#4338CA", "#EEF2FF"],
};

/** @type {Record<string, { icon: string, gradient: keyof typeof GRADIENTS, accent?: string }>} */
export const REPO_THEMES = {
  "instagram-data-scraper": { icon: "scraper", gradient: "social", accent: "Automation" },
  "pdo_class_wrapper": { icon: "database", gradient: "php", accent: "Platforms" },
  "htaccess-best-web-security-practices": { icon: "security", gradient: "security", accent: "Security" },
  "mysql-find-replace-php": { icon: "mysql", gradient: "php", accent: "Platforms" },
  "Image-Video-Slider-For-iOS-Android": { icon: "mobile", gradient: "purple", accent: "Mobile" },
  "jQuery.escapeHtml": { icon: "javascript", gradient: "yellow", accent: "Automation" },
  "kcfinder_ckeditor_absolute_url": { icon: "cms", gradient: "php", accent: "Web" },
  "simple-error-templates": { icon: "error", gradient: "blue", accent: "Web" },
  "noncent.github.io": { icon: "github", gradient: "purple", accent: "Portfolio" },
  "developers-cheat-sheet": { icon: "cheatsheet", gradient: "indigo", accent: "AI" },
  "bruos": { icon: "mobile", gradient: "rust", accent: "Swift" },
  "windows-host-entry-manager": { icon: "windows", gradient: "windows", accent: "Automation" },
  "twitter-hashtag-gallery": { icon: "twitter", gradient: "twitter", accent: "Social" },
  "twitter-auto-tweets": { icon: "twitter", gradient: "twitter", accent: "Social" },
  "wamp-create-virtualhost": { icon: "wamp", gradient: "windows", accent: "Automation" },
  "windows-host-manager": { icon: "windows", gradient: "windows", accent: "Automation" },
  "codeigniter-log-viewer": { icon: "code", gradient: "php", accent: "Web" },
  "jConfig": { icon: "config", gradient: "javascript", accent: "Web" },
  "PHP-JSON-With-Ajax": { icon: "json", gradient: "php", accent: "Web" },
  "promptvault": { icon: "ai", gradient: "purple", accent: "AI" },
  "nono": { icon: "github", gradient: "indigo", accent: "Profile" },
  "discope": { icon: "disk", gradient: "rust", accent: "Rust" },
  "crypto": { icon: "crypto", gradient: "security", accent: "Security" },
  "bot-browser": { icon: "browser", gradient: "teal", accent: "AI" },
  "poc": { icon: "demo", gradient: "javascript", accent: "Web" },
  "ssr-demo": { icon: "ssr", gradient: "blue", accent: "Web" },
  "noncent": { icon: "github", gradient: "purple", accent: "Meta" },
  "Alexa-PHP-Endpoint": { icon: "alexa", gradient: "indigo", accent: "AI" },
  "wampserver-ssl-auto-config": { icon: "ssl", gradient: "windows", accent: "Automation" },
  "git-course": { icon: "git", gradient: "orange", accent: "Education" },
  "instagram-follower-bot": { icon: "bot", gradient: "social", accent: "AI" },
  "phpjs": { icon: "php", gradient: "php", accent: "Web" },
  "laravel-surveyjs": { icon: "survey", gradient: "green", accent: "Platforms" },
  "google-api-php-client": { icon: "api", gradient: "blue", accent: "Web" },
  "mysql-tricks": { icon: "mysql", gradient: "php", accent: "Platforms" },
  "chatbot": { icon: "chat", gradient: "purple", accent: "AI" },
  "lumendingojwtapi": { icon: "jwt", gradient: "php", accent: "Platforms" },
  "lumen-jwt": { icon: "jwt", gradient: "php", accent: "Platforms" },
  "rest-api-with-lumen": { icon: "api", gradient: "php", accent: "Platforms" },
  "lumen-api-demo": { icon: "api", gradient: "php", accent: "Platforms" },
  "web-speech-ai": { icon: "speech", gradient: "purple", accent: "AI" },
  "agent-human-handoff-nodejs": { icon: "handoff", gradient: "teal", accent: "AI" },
  "google-cloud-php-dialogflow": { icon: "dialogflow", gradient: "blue", accent: "AI" },
  "laravel-admin": { icon: "laravel", gradient: "orange", accent: "Platforms" },
  "mysql-workbench-export-laravel-5-migrations": { icon: "migration", gradient: "green", accent: "Platforms" },
  "captcha.class.php": { icon: "captcha", gradient: "security", accent: "Web" },
};

const CATEGORY_FALLBACK = {
  AI: { icon: "ai", gradient: "purple" },
  Cloud: { icon: "cloud", gradient: "blue" },
  Architecture: { icon: "architecture", gradient: "indigo" },
  Automation: { icon: "automation", gradient: "yellow" },
  Platforms: { icon: "database", gradient: "php" },
  "Web Engineering": { icon: "code", gradient: "javascript" },
};

const LANG_GRADIENT = {
  PHP: "php",
  JavaScript: "yellow",
  TypeScript: "blue",
  Rust: "rust",
  Swift: "rust",
  Vue: "green",
  Python: "green",
  HTML: "purple",
  Batchfile: "windows",
};

export function getRepoTheme(repo) {
  if (REPO_THEMES[repo.name]) return REPO_THEMES[repo.name];
  const cat = CATEGORY_FALLBACK[repo.category] || CATEGORY_FALLBACK["Web Engineering"];
  const gradKey = LANG_GRADIENT[repo.language] || cat.gradient;
  return { icon: cat.icon, gradient: gradKey, accent: repo.category };
}
