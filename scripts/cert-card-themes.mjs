/**
 * V2-aligned certificate card themes (purple / yellow portfolio palette + platform accents).
 */

export const V2 = {
  purple: "#6C5CE7",
  purpleDark: "#5A4BD1",
  purpleSoft: "#EDE9FE",
  yellow: "#FFF8E7",
  yellowAccent: "#FDCB6E",
  text: "#2D3436",
  muted: "#636E72",
  white: "#FFFFFF",
  border: "#E8E4F3",
};

/** @type {Record<string, { stripe: string, iconBg: string, iconColor: string, pill: string, pillText: string }>} */
export const TOPICS = {
  aws: { stripe: "#FF9900", iconBg: "#FFF3E8", iconColor: "#232F3E", pill: "#FFE8CC", pillText: "#C45C00" },
  php: { stripe: "#777BB4", iconBg: "#EEEEF8", iconColor: "#4F5B93", pill: "#E8E4F3", pillText: "#5A4BD1" },
  wordpress: { stripe: "#21759B", iconBg: "#E8F4FA", iconColor: "#21759B", pill: "#D4EBF7", pillText: "#1D2327" },
  python: { stripe: "#3776AB", iconBg: "#FFF8E0", iconColor: "#3776AB", pill: "#EDE9FE", pillText: "#5A4BD1" },
  ionic: { stripe: "#3880FF", iconBg: "#E8F0FE", iconColor: "#3880FF", pill: "#D6E4FF", pillText: "#1A4FBF" },
  serverless: { stripe: "#0D9488", iconBg: "#E6FFFA", iconColor: "#0D9488", pill: "#CCFBF1", pillText: "#0F766E" },
  linkedin: { stripe: "#0A66C2", iconBg: "#E8F4FC", iconColor: "#0A66C2", pill: "#D6EBFA", pillText: "#004182" },
  coursera: { stripe: "#0056D2", iconBg: "#E8F0FE", iconColor: "#0056D2", pill: "#D6E4FF", pillText: "#003D99" },
  default: { stripe: V2.purple, iconBg: V2.purpleSoft, iconColor: V2.purple, pill: V2.purpleSoft, pillText: V2.purpleDark },
};

const TOPIC_RULES = [
  { re: /coursera/i, topic: "coursera" },
  { re: /aws|amazon web services|saa-c01|cloud services|compute services|identity and access/i, topic: "aws" },
  { re: /wordpress/i, topic: "wordpress" },
  { re: /php/i, topic: "php" },
  { re: /python/i, topic: "python" },
  { re: /ionic/i, topic: "ionic" },
  { re: /serverless/i, topic: "serverless" },
  { re: /linkedin learning/i, topic: "linkedin" },
];

export function topicForCert({ title = "", issuer = "" }) {
  const text = `${title} ${issuer}`;
  for (const { re, topic } of TOPIC_RULES) {
    if (re.test(text)) return topic;
  }
  if (/coursera/i.test(issuer)) return "coursera";
  if (/linkedin/i.test(issuer)) return "linkedin";
  return "default";
}

export function themeForTopic(topic) {
  return TOPICS[topic] || TOPICS.default;
}

export const ICONS = {
  aws: `<path fill="currentColor" d="M6.5 14.5l1.2-4.5h8.6l1.2 4.5H6.5zm1.8-6.2L4 18h16l-4.3-9.7H8.3z"/>`,
  php: `<path fill="currentColor" d="M4 4h16v16H4V4zm3 5h2.5c2 0 3.5 1.2 3.5 3s-1.5 3-3.5 3H8v2H6V9h1zm2 2v2h1c.8 0 1.5-.5 1.5-1s-.7-1-1.5-1H9zm5-2h4v1.5h-2.5V12H18v1.5h-2.5V15H18V16h-4V9z"/>`,
  wordpress: `<path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 3c1.2 0 2.3.3 3.3.8L8.8 15.2A6.9 6.9 0 0112 5zM5 12c0-1 .2-2 .6-2.9l4.3 11.8A7 7 0 015 12zm7 7a6.9 6.9 0 01-3.3-.8l4.5-12.4A7 7 0 0119 12c0 3.9-3.1 7-7 7z"/>`,
  python: `<path fill="currentColor" d="M12 2C8 2 6 3.5 6 6v2h6V6.5c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5V9h2c2.5 0 4 1.5 4 4v1c0 2-1.5 3.5-4 3.5h-2v-2h2c1 0 1.5-.5 1.5-1.5V13c0-1-.5-1.5-1.5-1.5H6v5c0 2.5 1.5 4 4 4h2v-2H8c-1 0-1.5-.5-1.5-1.5V16h8v2c0 2.5-1.5 4-4 4H8c-3 0-6-1.5-6-4V6c0-2.5 3-4 6-4h4z"/>`,
  ionic: `<path fill="currentColor" d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2zm0 3.2L6.5 7.5 12 10.8l5.5-3.3L12 5.2z"/>`,
  serverless: `<path fill="currentColor" d="M4 6h16v4H4V6zm0 8h10v4H4v-4zm12 0h4v4h-4v-4z"/>`,
  linkedin: `<path fill="currentColor" d="M6 6h4v12H6V6zm2-4a2 2 0 110 4 2 2 0 010-4zm4 4h3.5v2h.1c.5-.9 1.7-2 3.5-2 3.7 0 4.4 2.4 4.4 5.5V18h-4v-5.2c0-1.2 0-2.8-1.7-2.8-1.7 0-2 1.3-2 2.7V18h-4V6z"/>`,
  coursera: `<path fill="currentColor" d="M12 2l9 5v10l-9 5-9-5V7l9-5zm0 3.5L6.5 8.5 12 11.5 17.5 8.5 12 5.5zM6 10.5v5L11 18v-5.5L6 10.5zm12 0l-5 2.5V18l5-2.5v-5z"/>`,
  default: `<path fill="currentColor" d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 17l-6.3 4 2.3-7-6-4.6h7.6L12 2z"/>`,
};

export function iconForTopic(topic) {
  return ICONS[topic] || ICONS.default;
}

/** @deprecated use topicForCert */
export function topicForTitle(title) {
  return topicForCert({ title });
}

export function gradientForTopic() {
  return [V2.purple, V2.purpleDark];
}
