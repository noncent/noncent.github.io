/**
 * Curated Unsplash photo IDs per category (tech/code/abstract themes).
 * Params appended at runtime for consistent sizing.
 */
const Q = "?w=640&h=360&fit=crop&q=80&auto=format";

function u(id) {
  return `https://images.unsplash.com/photo-${id}${Q}`;
}

export const IMAGE_POOLS = {
  ai: [
    u("1677442136019-21780ecad995"),
    u("1620712943543-bcc4688e7485"),
    u("1535378917042-10a22c959f86"),
    u("1485827404703-89b55fcc595e"),
    u("1676299081847-824962444863"),
    u("1555949963-aa79d659981b"),
    u("1504639725590-34d0984388bd"),
    u("1516321318423-f06f85e504b3"),
    u("1555255707-c079660666b0"),
    u("1624124504840-b891167f2b16"),
    u("1633356122544-f134324a6cee"),
    u("1526374965328-7f61d4dc18c5"),
  ],
  devtools: [
    u("1461749280684-dccba630e2f6"),
    u("1555066931-4365d14bab8c"),
    u("1498050108023-c5249f4df085"),
    u("1517694714252-d478e3f206a2"),
    u("1587620962725-abab7fe55159"),
    u("1605372956342-d5263b5246ae"),
    u("1555066931-bf19f8d78937"),
    u("1516116216624-53e697fedbea"),
    u("1551650975-87deedd944c3"),
    u("1542831371-d531d36971e6"),
    u("1555949963-ff9fe0c870eb"),
    u("1515879218367-8466d910aaa4"),
  ],
  php: [
    u("1555066931-4365d14bab8c"),
    u("1542831371-d531d36971e6"),
    u("1517694714252-d478e3f206a2"),
    u("1460925895917-afdab827c52f"),
    u("1551288049-bebda4e38f71"),
    u("1555949963-aa79d659981b"),
    u("1504639725590-34d0984388bd"),
    u("1555066931-bf19f8d78937"),
    u("1587620962725-abab7fe55159"),
    u("1516321318423-f06f85e504b3"),
    u("1498050108023-c5249f4df085"),
    u("1605372956342-d5263b5246ae"),
  ],
  javascript: [
    u("1627398242454-45a1465c2479"),
    u("1633356122544-f134324a6cee"),
    u("1555066931-4365d14bab8c"),
    u("1517694714252-d478e3f206a2"),
    u("1498050108023-c5249f4df085"),
    u("1587620962725-abab7fe55159"),
    u("1555949963-ff9fe0c870eb"),
    u("1515879218367-8466d910aaa4"),
    u("1542831371-d531d36971e6"),
    u("1551650975-87deedd944c3"),
    u("1461749280684-dccba630e2f6"),
    u("1605372956342-d5263b5246ae"),
  ],
  security: [
    u("1563986768602-0256452762db"),
    u("1555949963-aa79d659981b"),
    u("1550751827-4bd374c3f58b"),
    u("1614064641938-3bbee51942b7"),
    u("1555949963-ff9fe0c870eb"),
    u("1563013545537-0042511b5937"),
    u("1526374965328-7f61d4dc18c5"),
    u("1551288049-bebda4e38f71"),
    u("1516321318423-f06f85e504b3"),
    u("1504639725590-34d0984388bd"),
    u("1639321677271-a45611e0629b"),
    u("1555949963-aa79d659981b"),
  ],
  mobile: [
    u("1512941937669-90a1ee58b7fb"),
    u("1551650975-87deedd944c3"),
    u("1517694714252-d478e3f206a2"),
    u("1555949963-ff9fe0c870eb"),
    u("1516321318423-f06f85e504b3"),
    u("1498050108023-c5249f4df085"),
    u("1587620962725-abab7fe55159"),
    u("1555066931-bf19f8d78937"),
    u("1460925895917-afdab827c52f"),
    u("1551288049-bebda4e38f71"),
    u("1515879218367-8466d910aaa4"),
    u("1605372956342-d5263b5246ae"),
  ],
  rust: [
    u("1555949963-aa79d659981b"),
    u("1515879218367-8466d910aaa4"),
    u("1461749280684-dccba630e2f6"),
    u("1555066931-4365d14bab8c"),
    u("1542831371-d531d36971e6"),
    u("1587620962725-abab7fe55159"),
    u("1517694714252-d478e3f206a2"),
    u("1551650975-87deedd944c3"),
    u("1498050108023-c5249f4df085"),
    u("1605372956342-d5263b5246ae"),
    u("1555066931-bf19f8d78937"),
    u("1639321677271-a45611e0629b"),
  ],
  social: [
    u("1611162617474-5b21e279e025"),
    u("1611162616305-c69b3fa7a284"),
    u("1432888622747-4ebee53c3b70"),
    u("1522075469751-3a6694fb8f78"),
    u("1551288049-bebda4e38f71"),
    u("1460925895917-afdab827c52f"),
    u("1555949963-ff9fe0c870eb"),
    u("1516321318423-f06f85e504b3"),
    u("1555066931-4365d14bab8c"),
    u("1504639725590-34d0984388bd"),
    u("1498050108023-c5249f4df085"),
    u("1587620962725-abab7fe55159"),
  ],
  default: [
    u("1498050108023-c5249f4df085"),
    u("1461749280684-dccba630e2f6"),
    u("1517694714252-d478e3f206a2"),
    u("1555066931-4365d14bab8c"),
    u("1587620962725-abab7fe55159"),
    u("1542831371-d531d36971e6"),
    u("1555949963-aa79d659981b"),
    u("1516321318423-f06f85e504b3"),
    u("1605372956342-d5263b5246ae"),
    u("1551650975-87deedd944c3"),
    u("1460925895917-afdab827c52f"),
    u("1515879218367-8466d910aaa4"),
  ],
};

export const FALLBACK_COVERS = {
  ai: "assets/covers/ai-tools.png",
  devtools: "assets/covers/devtools.png",
  php: "assets/covers/php.png",
  javascript: "assets/covers/javascript.png",
  security: "assets/covers/security.png",
  mobile: "assets/covers/mobile.png",
  rust: "assets/covers/rust.png",
  social: "assets/covers/social.png",
  default: "assets/covers/default.png",
};

export function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/** Pick 3 distinct image URLs from a category pool based on repo name. */
export function pickImages(category, repoName) {
  const pool = IMAGE_POOLS[category] || IMAGE_POOLS.default;
  const h = hashString(repoName);
  const len = pool.length;
  const i0 = h % len;
  const i1 = (h + 7) % len;
  const i2 = (h + 13) % len;
  const indices = i1 === i0 ? [i0, (i0 + 1) % len, (i0 + 2) % len] : i2 === i0 || i2 === i1 ? [i0, i1, (i1 + 1) % len] : [i0, i1, i2];
  return {
    cover: pool[indices[0]],
    montage: [pool[indices[1]], pool[indices[2]]],
    fallback: FALLBACK_COVERS[category] || FALLBACK_COVERS.default,
  };
}
