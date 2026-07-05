(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const icons = window.NONCENT_ICONS;

  const SKILLS = [
    { label: "Solution Architecture", pct: 95 },
    { label: "Cloud & Platform Engineering", pct: 90 },
    { label: "AI & LLM Integration", pct: 85 },
    { label: "Engineering Leadership", pct: 88 },
  ];

  const IMPACT_ICONS = {
    ghStars: "star",
    soRep: "award",
    soAnswers: "message",
    repos: "folder",
    forks: "code",
    contributions: "zap",
    years: "globe",
    languages: "layers",
  };

  const BRAND_IMPACT = {
    ghStars: "github",
    soRep: "stackoverflow",
    soAnswers: "stackoverflow",
  };

  const PHOTO_FALLBACKS = ["../git-profile.jpg", "../git-profile.png", "../dist/img/profile.jpg"];
  const DEFAULT_IMG = "../assets/covers/default.jpg";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let profile, projects, expertise, testimonials, github, stackoverflow, repos, timeline, thoughts;
  let testimonialIndex = 0;
  let activePortfolioFilter = "All";
  let activeRepoFilter = "All";
  let skillsAnimated = false;
  let langBarsAnimated = false;

  function esc(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function fmtNum(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return String(n);
  }

  function fmtDate(iso) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short" });
  }

  function fuzzy(q, text) {
    if (!q) return { score: 1 };
    const query = q.toLowerCase();
    const t = (text || "").toLowerCase();
    if (!t) return null;
    let qi = 0;
    for (let i = 0; i < t.length && qi < query.length; i++) {
      if (t[i] === query[qi]) qi++;
    }
    return qi < query.length ? null : { score: query.length / t.length };
  }

  function initImageFallbacks(root) {
    const scope = root || document;
    scope.querySelectorAll("img[data-fallback]").forEach((img) => {
      if (img.dataset.fallbackBound) return;
      img.dataset.fallbackBound = "1";
      img.addEventListener("error", function onErr() {
        const chain = (img.dataset.fallback || "").split("|").filter(Boolean);
        if (!chain.length) return;
        img.src = chain.shift();
        img.dataset.fallback = chain.join("|");
        if (!chain.length) img.removeEventListener("error", onErr);
      }, { once: false });
    });
  }

  function setupPhotos() {
    const chain = PHOTO_FALLBACKS.slice(1).join("|");
    const about = $("about-photo");
    if (about) {
      about.src = PHOTO_FALLBACKS[0];
      about.alt = profile?.name || "Neeraj Singh";
      about.dataset.fallback = chain;
    }
    const avatar = $("testimonial-avatar");
    if (avatar) avatar.dataset.fallback = "../assets/avatars/client-1.jpg";
    initImageFallbacks();
  }

  function initHeroPulse() {
    const el = $("hero-pulse");
    if (!el) return;
    const h = Math.floor(Math.random() * 360);
    const s = 65 + Math.floor(Math.random() * 20);
    const l = 50 + Math.floor(Math.random() * 15);
    el.style.setProperty("--pulse-color", `hsla(${h}, ${s}%, ${l}%, 0.48)`);
    el.style.setProperty("--pulse-ring-color", `hsla(${h}, ${s}%, ${l}%, 0.85)`);
  }

  function clientAvatarUrl(item) {
    return item?.avatar ? `../${item.avatar}` : "../assets/avatars/client-1.jpg";
  }

  function impactIconHtml(key) {
    const brand = BRAND_IMPACT[key];
    if (brand && icons?.brandIcon) {
      const wrapClass = brand === "github" ? "impact-icon-wrap--github" : "impact-icon-wrap--stackoverflow";
      return `<span class="impact-icon-wrap ${wrapClass}">${icons.brandIcon(brand, "impact-brand-icon")}</span>`;
    }
    const ic = icons ? icons.icon(IMPACT_ICONS[key] || "folder", "impact-icon") : "";
    return `<span class="impact-icon-wrap">${ic}</span>`;
  }

  function renderHero() {
    const hl = $("hero-headline");
    if (hl) {
      hl.innerHTML = 'Hey I\'m a <span class="hero-highlight">Solution Architect</span>';
    }
    const sub = $("hero-sub");
    if (sub && profile) {
      sub.textContent = `Hi I'm ${profile.name}. ${profile.title}. Welcome to my portfolio.`;
    }
  }

  function wireLinkedInCtas() {
    const url = profile?.contact?.linkedin;
    if (!url) return;
    document.querySelectorAll("[data-linkedin-cta]").forEach((a) => {
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  function renderSocial() {
    const bar = $("social-bar");
    if (!bar || !profile?.contact) return;
    const c = profile.contact;
    const links = [
      { href: c.linkedin, label: "LinkedIn", svg: '<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z"/>' },
      { href: c.github, label: "GitHub", svg: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>' },
      { href: c.email, label: "Email", svg: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/>' },
    ];
    bar.innerHTML = links
      .filter((l) => l.href)
      .map(
        (l) =>
          `<a class="social-link" href="${esc(l.href)}" target="_blank" rel="noopener" aria-label="${esc(l.label)}">` +
          `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${l.svg}</svg></a>`
      )
      .join("");
  }

  function renderAbout() {
    const intro = $("about-intro");
    if (intro && profile?.about) intro.textContent = profile.about.intro;

    const badges = $("about-badges");
    if (badges && profile?.stats) {
      badges.innerHTML = profile.stats.slice(0, 3)
        .map((s) => `<span class="about-badge">${esc(s.value)} ${esc(s.label)}</span>`)
        .join("");
    }
  }

  function renderServices() {
    const grid = $("service-grid");
    if (!grid || !expertise?.items) return;
    grid.innerHTML = expertise.items.slice(0, 3).map((item, i) => {
      const ic = icons ? icons.icon(item.icon, "service-svg") : "";
      return (
        `<article class="service-card" style="--i:${i}">` +
        `<div class="service-icon">${ic}</div>` +
        `<h3 class="service-title">${esc(item.title)}</h3>` +
        `<p class="service-desc">${esc(item.description)}</p>` +
        `</article>`
      );
    }).join("");
  }

  function renderSkills() {
    const text = $("skills-text");
    if (text && profile?.about) {
      text.textContent = profile.about.pillars?.[0] || profile.about.intro;
    }
    const grid = $("skill-grid");
    if (!grid) return;
    grid.innerHTML = SKILLS.map((s, i) =>
      `<article class="skill-card" style="--i:${i}">` +
      `<div class="skill-label"><span>${esc(s.label)}</span><span>${s.pct}%</span></div>` +
      `<div class="skill-track"><div class="skill-fill" style="--pct:${s.pct}"></div></div>` +
      `</article>`
    ).join("");
  }

  function getPortfolioTags() {
    const tags = new Set();
    (projects?.items || []).forEach((p) => (p.tech || []).forEach((t) => tags.add(t)));
    return ["All", ...Array.from(tags).sort()];
  }

  function renderPortfolioTabs() {
    const tabs = $("portfolio-tabs");
    if (!tabs) return;
    tabs.innerHTML = getPortfolioTags()
      .map(
        (t) =>
          `<button type="button" class="portfolio-tab${t === activePortfolioFilter ? " is-active" : ""}" data-filter="${esc(t)}" role="tab">${esc(t)}</button>`
      )
      .join("");
    tabs.onclick = (e) => {
      const btn = e.target.closest(".portfolio-tab");
      if (!btn) return;
      activePortfolioFilter = btn.dataset.filter;
      tabs.querySelectorAll(".portfolio-tab").forEach((b) => {
        b.classList.toggle("is-active", b.dataset.filter === activePortfolioFilter);
      });
      renderPortfolioGrid();
    };
  }

  function renderPortfolioGrid() {
    const grid = $("portfolio-grid");
    if (!grid || !projects?.items) return;
    grid.innerHTML = projects.items.map((p, i) => {
      const thumb = p.thumbnail ? `../${p.thumbnail}` : DEFAULT_IMG;
      const primaryTag = (p.tech && p.tech[0]) || "Project";
      const hidden =
        activePortfolioFilter !== "All" && !(p.tech || []).includes(activePortfolioFilter);
      return (
        `<article class="portfolio-card${hidden ? " is-hidden" : ""}" style="--i:${i}">` +
        `<a href="${esc(p.caseStudyUrl || "#portfolio")}" class="portfolio-link">` +
        `<div class="portfolio-thumb"><img src="${esc(thumb)}" alt="" loading="lazy" data-fallback="${esc(DEFAULT_IMG)}" /></div>` +
        `<div class="portfolio-body">` +
        `<span class="portfolio-tag">${esc(primaryTag)}</span>` +
        `<h3 class="portfolio-name">${esc(p.name)}</h3>` +
        `<p class="portfolio-desc">${esc(p.description)}</p>` +
        `</div></a></article>`
      );
    }).join("");
    initImageFallbacks(grid);
    refreshRevealVisibility();
  }

  function renderEngineering() {
    const hl = $("impact-headline");
    const sub = $("impact-sub");
    if (hl) hl.textContent = profile?.engineeringImpact?.headline || "Engineering Through Code.";
    if (sub) sub.textContent = profile?.engineeringImpact?.subheadline || "";

    const g = github?.stats || {};
    const so = stackoverflow || {};
    const cards = [
      { key: "ghStars", value: g.totalStars || 0, label: "GitHub Stars", href: github?.profileUrl || "https://github.com/noncent" },
      { key: "soRep", value: so.reputation || 0, label: "Stack Overflow", href: so.profileUrl },
      { key: "soAnswers", value: so.answers || 0, label: "SO Answers", href: so.profileUrl },
      { key: "repos", value: g.publicRepos || repos?.stats?.public || 0, label: "Total Repositories" },
      { key: "forks", value: g.totalForks || 0, label: "Total Forks" },
      { key: "contributions", value: g.contributions || 0, label: "Contributions" },
      { key: "years", value: (g.yearsActive || 0) + "+", label: "Years Active" },
      { key: "languages", value: g.languages || repos?.stats?.languages || 0, label: "Languages Used" },
    ];

    const grid = $("impact-grid");
    if (grid) {
      grid.innerHTML = cards.map((c, i) => {
        const display = typeof c.value === "number" ? fmtNum(c.value) : esc(String(c.value));
        const inner =
          `${impactIconHtml(c.key)}` +
          `<span class="impact-value">${display}</span>` +
          `<span class="impact-label">${esc(c.label)}</span>`;
        if (c.href) {
          return `<a class="impact-card impact-card--link" href="${esc(c.href)}" target="_blank" rel="noopener" style="--i:${i}">${inner}</a>`;
        }
        return `<article class="impact-card" style="--i:${i}">${inner}</article>`;
      }).join("");
    }

    const lb = $("lang-breakdown");
    const breakdown = github?.languageBreakdown || [];
    if (lb && breakdown.length) {
      lb.innerHTML = `
        <h3>Most Used Languages</h3>
        <div class="lang-bars reveal-stagger" id="lang-bars">
          ${breakdown.slice(0, 6).map((l, i) => {
            const color = icons?.langColor ? icons.langColor(l.name) : "#6C5CE7";
            const iconSvg = icons?.langIcon ? icons.langIcon(l.name) : "";
            return `
            <div class="lang-bar-row" style="--i:${i}" data-pct="${l.pct}">
              <div class="lang-bar-meta">
                <span class="lang-bar-icon" style="--lang-color:${esc(color)}">${iconSvg}</span>
                <span class="lang-bar-name">${esc(l.name)}</span>
              </div>
              <div class="lang-bar-track">
                <div class="lang-bar-fill" style="--pct:${l.pct}; --lang-color:${esc(color)}"></div>
              </div>
              <span class="lang-bar-pct">${l.pct}%</span>
            </div>`;
          }).join("")}
        </div>`;
    }
  }

  function renderRepoFilters() {
    const el = $("repo-filters");
    if (!el) return;
    const cats = repos?.filterCategories || ["All"];
    const items = ["All", ...cats.filter((c) => c !== "All")];
    el.innerHTML = items
      .map(
        (c) =>
          `<button class="filter-chip${activeRepoFilter === c ? " active" : ""}" type="button" data-filter="${esc(c)}" role="tab">${esc(c)}</button>`
      )
      .join("");
  }

  function scoreRepo(r, query) {
    if (activeRepoFilter !== "All" && r.category !== activeRepoFilter) return null;
    if (!query) return { repo: r, score: 1 };
    const name = fuzzy(query, r.name);
    const desc = fuzzy(query, r.description);
    const lang = fuzzy(query, r.language || "");
    if (!name && !desc && !lang) return null;
    return {
      repo: r,
      score: (name ? name.score * 6 : 0) + (desc ? desc.score * 2 : 0) + (lang ? lang.score * 3 : 0),
    };
  }

  function truncateText(text, max = 120) {
    const s = (text || "").trim();
    if (s.length <= max) return s;
    return s.slice(0, max - 1).trimEnd() + "…";
  }

  function renderRepos() {
    const summary = $("repos-summary");
    const gs = github?.stats || {};
    const rs = repos?.stats || {};
    if (summary) {
      summary.textContent = `${rs.public || 0} public repositories · ${fmtNum(gs.totalStars || rs.totalStars || 0)} stars · ${rs.languages || 0} languages`;
    }

    const cta = $("github-profile-cta");
    if (cta && github?.profileUrl) cta.href = github.profileUrl;

    const query = ($("repo-search")?.value || "").trim();
    const results = (repos?.repos || [])
      .map((r) => scoreRepo(r, query))
      .filter(Boolean)
      .sort((a, b) => b.repo.stars - a.repo.stars || new Date(b.repo.updatedAt) - new Date(a.repo.updatedAt));

    const grid = $("repo-grid");
    if (grid) {
      grid.innerHTML = results.map((r, i) => {
        const cover = r.repo.cover ? `../${r.repo.cover.replace(/^\.\.\//, "")}` : DEFAULT_IMG;
        const fallback = r.repo.fallback ? `../${r.repo.fallback.replace(/^\.\.\//, "")}` : DEFAULT_IMG;
        const tagParts = [r.repo.language, r.repo.category].filter(Boolean);
        if (r.repo.stars > 0) tagParts.push(`${r.repo.stars} ★`);
        const tag = tagParts.join(" · ");
        const desc = truncateText(r.repo.description || "Open-source project");
        return (
          `<article class="portfolio-card" role="listitem" style="--i:${i}">` +
          `<a href="${esc(r.repo.url)}" class="portfolio-link" target="_blank" rel="noopener">` +
          `<div class="portfolio-thumb"><img src="${esc(cover)}" alt="" loading="lazy" data-fallback="${esc(fallback)}" /></div>` +
          `<div class="portfolio-body">` +
          `<span class="portfolio-tag">${esc(tag)}</span>` +
          `<h3 class="portfolio-name">${esc(r.repo.name)}</h3>` +
          `<p class="portfolio-desc">${esc(desc)}</p>` +
          `</div></a></article>`
        );
      }).join("");
      initImageFallbacks(grid);
      refreshRevealVisibility();
    }

    const count = $("repo-count");
    if (count) {
      const total = repos?.repos?.length || 0;
      if (query) count.textContent = `Showing ${results.length} of ${total} · matching "${query}"`;
      else if (activeRepoFilter !== "All") count.textContent = `Showing ${results.length} of ${total} · ${activeRepoFilter}`;
      else count.textContent = `${total} public repositories`;
    }

    $("repo-empty")?.classList.toggle("hidden", results.length > 0);
  }

  function renderExpertise() {
    const grid = $("expertise-grid");
    if (!grid || !expertise?.items) return;
    grid.innerHTML = expertise.items.map((e, i) => `
      <article class="expertise-card" style="--i:${i}">
        ${icons ? `<div class="expertise-icon">${icons.icon(e.icon || "folder", "expertise-svg")}</div>` : ""}
        <h3 class="expertise-title">${esc(e.title)}</h3>
        <p class="expertise-desc">${esc(e.description)}</p>
      </article>`
    ).join("");
  }

  function renderTimeline() {
    const el = $("timeline");
    if (!el || !timeline?.items) return;
    el.innerHTML = timeline.items.map((t, i) => `
      <article class="timeline-item" style="--i:${i}">
        <span class="timeline-dot" aria-hidden="true"></span>
        <p class="timeline-period">${esc(t.period)}</p>
        <h3 class="timeline-title">${esc(t.title)}</h3>
        <p class="timeline-company">${esc(t.company)}</p>
        <ul class="timeline-achievements">${(t.achievements || []).map((a) => `<li>${esc(a)}</li>`).join("")}</ul>
        <p class="timeline-impact">${esc(t.impact)}</p>
      </article>`
    ).join("");
  }

  function renderThoughts() {
    const grid = $("thought-grid");
    if (!grid || !thoughts?.items?.length) return;
    const mediumIcon = icons?.brandIcon ? icons.brandIcon("medium", "thought-brand-icon") : "";
    grid.innerHTML = thoughts.items.map((t, i) => `
      <a class="thought-card" href="${esc(t.url)}" target="_blank" rel="noopener" style="--i:${i}">
        <div class="thought-head">
          <span class="thought-brand">${mediumIcon}</span>
          <span class="thought-type">${esc(t.type || "article")}</span>
        </div>
        <h3 class="thought-title">${esc(t.title)}</h3>
        <p class="thought-excerpt">${esc(t.excerpt)}</p>
        <span class="thought-date">${esc(t.date)}</span>
      </a>`
    ).join("");
  }

  function renderTestimonial() {
    const items = testimonials?.items || [];
    if (!items.length) return;
    const t = items[testimonialIndex];
    const q = $("testimonial-quote");
    const n = $("testimonial-name");
    const r = $("testimonial-role");
    if (q) q.textContent = t.quote;
    if (n) n.textContent = t.name;
    if (r) r.textContent = `${t.role}, ${t.company}`;
    const avatar = $("testimonial-avatar");
    if (avatar) {
      avatar.src = clientAvatarUrl(t);
      avatar.alt = t.name;
    }
  }

  function bindTestimonialNav() {
    const items = testimonials?.items || [];
    $("testimonial-prev")?.addEventListener("click", () => {
      if (!items.length) return;
      testimonialIndex = (testimonialIndex - 1 + items.length) % items.length;
      renderTestimonial();
    });
    $("testimonial-next")?.addEventListener("click", () => {
      if (!items.length) return;
      testimonialIndex = (testimonialIndex + 1) % items.length;
      renderTestimonial();
    });
  }

  function bindRepoEvents() {
    $("repo-filters")?.addEventListener("click", (e) => {
      const chip = e.target.closest(".filter-chip");
      if (!chip) return;
      activeRepoFilter = chip.dataset.filter;
      renderRepoFilters();
      renderRepos();
    });
    $("repo-search")?.addEventListener("input", renderRepos);
  }

  function renderFooter() {
    const about = $("footer-about");
    if (about && profile?.about) about.textContent = profile.about.intro;

    const links = $("footer-links");
    if (links && profile?.contact) {
      links.innerHTML = [
        profile.contact.github && `<li><a href="${esc(profile.contact.github)}" target="_blank" rel="noopener">GitHub</a></li>`,
        profile.contact.linkedin && `<li><a href="${esc(profile.contact.linkedin)}" target="_blank" rel="noopener">LinkedIn</a></li>`,
      ].filter(Boolean).join("");
    }

    const contact = $("footer-contact");
    if (contact && profile?.contact?.email) {
      contact.innerHTML = `<li><a href="${esc(profile.contact.email)}">Email</a></li>`;
    }

    const copy = $("footer-copy");
    if (copy) copy.textContent = `\u00A9 ${new Date().getFullYear()} ${profile?.name || "Neeraj Singh"}. All rights reserved.`;
  }

  function animateSkillBars() {
    if (skillsAnimated) return;
    skillsAnimated = true;
    $("skill-grid")?.classList.add("is-animated");
  }

  function animateLangBars() {
    if (langBarsAnimated) return;
    langBarsAnimated = true;
    $("lang-bars")?.classList.add("is-animated");
  }

  function revealIfInView(el) {
    if (!el || el.classList.contains("is-visible")) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh && rect.bottom > 0) {
      el.classList.add("is-visible");
      if (el.id === "engineering" || el.closest("#engineering")) animateLangBars();
    }
  }

  function refreshRevealVisibility() {
    document.querySelectorAll(".reveal, .reveal-stagger").forEach(revealIfInView);
  }

  function syncHashScroll() {
    const hash = location.hash;
    if (!hash) return;
    const target = document.querySelector(hash);
    if (!target) return;
    target.scrollIntoView({ block: "start" });
    requestAnimationFrame(() => {
      requestAnimationFrame(refreshRevealVisibility);
    });
  }

  function initScrollReveal() {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-visible");
          if (e.target.id === "skills" || e.target.closest("#skills")) animateSkillBars();
          if (e.target.id === "engineering" || e.target.closest("#engineering")) animateLangBars();
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );

    document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => obs.observe(el));
    ["skills", "engineering"].forEach((id) => {
      const el = $(id);
      if (el) obs.observe(el);
    });

    if (reducedMotion) {
      document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => el.classList.add("is-visible"));
      animateSkillBars();
      animateLangBars();
    } else {
      requestAnimationFrame(() => {
        requestAnimationFrame(refreshRevealVisibility);
      });
    }
  }

  function initNav() {
    const toggle = $("nav-toggle");
    const nav = $("nav");
    toggle?.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
    });
    nav?.querySelectorAll(".nav-link").forEach((a) => {
      a.addEventListener("click", () => nav.classList.remove("is-open"));
    });
  }

  async function boot() {
    try {
      [
        profile,
        projects,
        expertise,
        testimonials,
        github,
        stackoverflow,
        repos,
        timeline,
        thoughts,
      ] = await Promise.all([
        fetch("../data/profile.json").then((r) => r.json()),
        fetch("../data/projects.json").then((r) => r.json()),
        fetch("../data/expertise.json").then((r) => r.json()),
        fetch("../data/testimonials.json?v=photos1").then((r) => r.json()),
        fetch("../data/github.json").then((r) => r.json()),
        fetch("../data/stackoverflow.json").then((r) => r.json()),
        fetch("../data/repos.json").then((r) => r.json()),
        fetch("../data/timeline.json").then((r) => r.json()),
        fetch("../data/thought-leadership.json").then((r) => r.json()),
      ]);
    } catch (e) {
      console.error("V2 boot failed:", e);
      return;
    }

    setupPhotos();
    renderHero();
    initHeroPulse();
    wireLinkedInCtas();
    renderSocial();
    renderAbout();
    renderServices();
    renderSkills();
    renderPortfolioTabs();
    renderPortfolioGrid();
    renderEngineering();
    renderRepoFilters();
    renderRepos();
    renderExpertise();
    renderTimeline();
    renderThoughts();
    renderTestimonial();
    bindTestimonialNav();
    bindRepoEvents();
    renderFooter();
    initScrollReveal();
    initNav();
    syncHashScroll();
  }

  boot();
})();
