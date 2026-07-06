/**
 * Topic themes for certificate SVG cards.
 */

export const GRADIENTS = {
  aws: ["#FF9900", "#232F3E"],
  php: ["#777BB4", "#4F5B93"],
  wordpress: ["#21759B", "#1D2327"],
  python: ["#3776AB", "#FFD43B"],
  ionic: ["#3880FF", "#5260FF"],
  serverless: ["#0D9488", "#134E4A"],
  linkedin: ["#0A66C2", "#004182"],
  default: ["#6C5CE7", "#5A4BD1"],
};

const TOPIC_RULES = [
  { re: /aws|amazon web services|saa-c01|cloud services|compute services|identity and access/i, topic: "aws" },
  { re: /wordpress/i, topic: "wordpress" },
  { re: /php/i, topic: "php" },
  { re: /python/i, topic: "python" },
  { re: /ionic/i, topic: "ionic" },
  { re: /serverless/i, topic: "serverless" },
];

export function topicForTitle(title) {
  for (const { re, topic } of TOPIC_RULES) {
    if (re.test(title)) return topic;
  }
  return "linkedin";
}

export function gradientForTopic(topic) {
  return GRADIENTS[topic] || GRADIENTS.default;
}

export const ICONS = {
  aws: `<path fill="currentColor" d="M6.5 14.5l1.2-4.5h8.6l1.2 4.5H6.5zm1.8-6.2L4 18h16l-4.3-9.7H8.3z"/>`,
  php: `<path fill="currentColor" d="M12 3C7 3 3 7 3 12s4 7 9 7 9-4 9-7-4-9-9-9zm-2 6h4v2h-4V9zm0 4h6v2h-6v-2z"/>`,
  wordpress: `<path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 3c1.2 0 2.3.3 3.3.8L8.8 15.2A6.9 6.9 0 0112 5zM5 12c0-1 .2-2 .6-2.9l4.3 11.8A7 7 0 015 12zm7 7a6.9 6.9 0 01-3.3-.8l4.5-12.4A7 7 0 0119 12c0 3.9-3.1 7-7 7z"/>`,
  python: `<path fill="currentColor" d="M12 2C8 2 6 3.5 6 6v2h6V6.5c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5V9h2c2.5 0 4 1.5 4 4v1c0 2-1.5 3.5-4 3.5h-2v-2h2c1 0 1.5-.5 1.5-1.5V13c0-1-.5-1.5-1.5-1.5H6v5c0 2.5 1.5 4 4 4h2v-2H8c-1 0-1.5-.5-1.5-1.5V16h8v2c0 2.5-1.5 4-4 4H8c-3 0-6-1.5-6-4V6c0-2.5 3-4 6-4h4zm-1 3.5a1 1 0 100-2 1 1 0 000 2zm9 9.5a1 1 0 100-2 1 1 0 000 2z"/>`,
  ionic: `<path fill="currentColor" d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2zm0 3.2L6.5 7.5 12 10.8l5.5-3.3L12 5.2z"/>`,
  serverless: `<path fill="currentColor" d="M4 6h16v4H4V6zm0 8h10v4H4v-4zm12 0h4v4h-4v-4z"/>`,
  linkedin: `<path fill="currentColor" d="M6 6h4v12H6V6zm2-4a2 2 0 110 4 2 2 0 010-4zm4 4h3.5v2h.1c.5-.9 1.7-2 3.5-2 3.7 0 4.4 2.4 4.4 5.5V18h-4v-5.2c0-1.2 0-2.8-1.7-2.8-1.7 0-2 1.3-2 2.7V18h-4V6z"/>`,
  default: `<path fill="currentColor" d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 17l-6.3 4 2.3-7-6-4.6h7.6L12 2z"/>`,
};

export function iconForTopic(topic) {
  return ICONS[topic] || ICONS.default;
}
