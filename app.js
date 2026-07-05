(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const icons = window.NONCENT_ICONS;

  let profile, projects, expertise, timeline, testimonials, thoughts, gallery, github, stackoverflow, repos;
  let activeFilter = "All";
  let countersDone = false;
  const DEFAULT_IMG = "assets/covers/default.jpg";
  const PHOTO_FALLBACKS = ["git-profile.jpg", "git-profile.png", "dist/img/profile.jpg"];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
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

  function fmtDate(iso) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short" });
  }

  function fmtNum(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return String(n);
  }

  /* ---- Render: Hero & About ---- */
  function renderHero() {
    const hl = $("hero-headline");
    if (hl && profile.headline) {
      hl.innerHTML = profile.headline.map((l) => esc(l)).join("<br />");
    }
    const sub = $("hero-sub");
    if (sub) sub.textContent = profile.subheadline || "";

    const photo = $("hero-photo");
    if (photo) {
      const chain = [profile.photo || PHOTO_FALLBACKS[0], ...PHOTO_FALLBACKS.filter((p) => p !== profile.photo)];
      let idx = 0;
      photo.src = chain[0];
      photo.onerror = () => {
        idx += 1;
        if (idx < chain.length) photo.src = chain[idx];
      };
    }
  }

  function renderAbout() {
    const intro = $("about-intro");
    if (intro) intro.textContent = profile.about?.intro || "";

    const pillars = $("about-pillars");
    if (pillars && profile.about?.pillars) {
      pillars.innerHTML = profile.about.pillars.map((p) => `<li>${esc(p)}</li>`).join("");
    }

    const statsEl = $("about-stats");
    if (statsEl && profile.stats) {
      statsEl.innerHTML = profile.stats
        .map(
          (s, i) => `
        <article class="stat-card" style="--i:${i}">
          <span class="stat-value">${esc(s.value)}</span>
          <span class="stat-label">${esc(s.label)}</span>
        </article>`
        )
        .join("");
    }
  }

  /* ---- Render: Featured ---- */
  function renderFeatured() {
    const grid = $("featured-grid");
    if (!grid || !projects?.items) return;
    grid.innerHTML = projects.items
      .map(
        (p, i) => `
      <article class="project-card" style="--i:${i}">
        <div class="project-thumb">
          <img src="${esc(p.thumbnail)}" alt="" loading="lazy" data-fallback="${DEFAULT_IMG}" />
        </div>
        <div class="project-body">
          <h3 class="project-name">${esc(p.name)}</h3>
          <p class="project-desc">${esc(p.description)}</p>
          <ul class="project-outcomes">${(p.outcomes || []).map((o) => `<li>${esc(o)}</li>`).join("")}</ul>
          <div class="tech-pills">${(p.tech || []).map((t) => `<span class="tech-pill">${esc(t)}</span>`).join("")}</div>
          <a class="btn btn-outline btn-sm" href="${esc(p.caseStudyUrl)}" target="_blank" rel="noopener">View Case Study</a>
        </div>
      </article>`
      )
      .join("");
    initImageFallbacks(grid);
  }

  /* ---- Render: Engineering Impact ---- */
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

  function renderEngineering() {
    const hl = $("impact-headline");
    const sub = $("impact-sub");
    if (hl) hl.textContent = profile.engineeringImpact?.headline || "Engineering Through Code.";
    if (sub) sub.textContent = profile.engineeringImpact?.subheadline || "";

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
      grid.innerHTML = cards
        .map((c, i) => {
          const display = typeof c.value === "number" ? fmtNum(c.value) : esc(String(c.value));
          const target = typeof c.value === "number" ? c.value : 0;
          const inner = `
          ${icons ? icons.icon(IMPACT_ICONS[c.key] || "folder", "impact-icon") : ""}
          <span class="impact-value" data-target="${target}">${display}</span>
          <span class="impact-label">${esc(c.label)}</span>`;
          if (c.href) {
            return `<a class="impact-card impact-card--link" href="${esc(c.href)}" target="_blank" rel="noopener" style="--i:${i}">${inner}</a>`;
          }
          return `<article class="impact-card" style="--i:${i}">${inner}</article>`;
        })
        .join("");
    }

    const lb = $("lang-breakdown");
    const breakdown = github?.languageBreakdown || [];
    if (lb && breakdown.length) {
      lb.innerHTML = `
        <h3>Most Used Languages</h3>
        <div class="lang-bars">
          ${breakdown
            .slice(0, 6)
            .map(
              (l) => `
            <div class="lang-bar-row">
              <span class="lang-bar-name">${esc(l.name)}</span>
              <div class="lang-bar-track"><div class="lang-bar-fill" style="width:${l.pct}%"></div></div>
              <span class="lang-bar-pct">${l.pct}%</span>
            </div>`
            )
            .join("")}
        </div>`;
    }
  }

  /* ---- Render: Repos ---- */
  function renderRepoFilters() {
    const el = $("repo-filters");
    if (!el) return;
    const cats = repos?.filterCategories || ["All"];
    const items = ["All", ...cats.filter((c) => c !== "All")];
    el.innerHTML = items
      .map(
        (c) =>
          `<button class="filter-chip${activeFilter === c ? " active" : ""}" type="button" data-filter="${esc(c)}" role="tab">${esc(c)}</button>`
      )
      .join("");
  }

  function scoreRepo(r, query) {
    if (activeFilter !== "All" && r.category !== activeFilter) return null;
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

  function renderRepos() {
    const summary = $("repos-summary");
    const gs = github?.stats || {};
    const rs = repos?.stats || {};
    if (summary) {
      summary.textContent = `${rs.public || 0} public repositories · ${fmtNum(gs.totalStars || rs.totalStars || 0)} stars · ${rs.languages || 0} languages`;
    }

    const query = ($("repo-search")?.value || "").trim();
    const results = (repos?.repos || [])
      .map((r) => scoreRepo(r, query))
      .filter(Boolean)
      .sort((a, b) => b.repo.stars - a.repo.stars || new Date(b.repo.updatedAt) - new Date(a.repo.updatedAt));

    const grid = $("repo-grid");
    if (grid) {
      grid.innerHTML = results
        .map(
          (r, i) => `
        <a class="repo-card" role="listitem" href="${esc(r.repo.url)}" target="_blank" rel="noopener" style="--i:${i}">
          <div class="repo-thumb">
            <img src="${esc(r.repo.cover)}" alt="" loading="lazy" data-fallback="${esc(r.repo.fallback || DEFAULT_IMG)}" />
          </div>
          <div class="repo-body">
            <div class="repo-head">
              <h3 class="repo-name">${esc(r.repo.name)}</h3>
              <svg class="repo-ext" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
            </div>
            <div class="repo-meta-row">
              ${r.repo.language ? `<span class="repo-pill">${esc(r.repo.language)}</span>` : ""}
              <span class="repo-pill">${esc(r.repo.category)}</span>
              ${r.repo.stars ? `<span class="repo-pill repo-pill--stars">${r.repo.stars} ★</span>` : ""}
            </div>
            <p class="repo-desc">${esc(r.repo.description || "Open-source project")}</p>
            <div class="repo-date">Updated ${esc(fmtDate(r.repo.updatedAt))}</div>
          </div>
        </a>`
        )
        .join("");
    }

    const count = $("repo-count");
    if (count) {
      const total = repos?.repos?.length || 0;
      if (query) count.textContent = `Showing ${results.length} of ${total} · matching "${query}"`;
      else if (activeFilter !== "All") count.textContent = `Showing ${results.length} of ${total} · ${activeFilter}`;
      else count.textContent = `${total} public repositories`;
    }

    $("repo-empty")?.classList.toggle("hidden", results.length > 0);
    initImageFallbacks(grid);
  }

  /* ---- Render: Expertise ---- */
  function renderExpertise() {
    const grid = $("expertise-grid");
    if (!grid || !expertise?.items) return;
    grid.innerHTML = expertise.items
      .map(
        (e, i) => `
      <article class="expertise-card" style="--i:${i}">
        ${icons ? icons.icon(e.icon || "folder", "expertise-icon") : ""}
        <h3 class="expertise-title">${esc(e.title)}</h3>
        <p class="expertise-desc">${esc(e.description)}</p>
      </article>`
      )
      .join("");
  }

  /* ---- Render: Timeline ---- */
  function renderTimeline() {
    const el = $("timeline");
    if (!el || !timeline?.items) return;
    el.innerHTML = timeline.items
      .map(
        (t, i) => `
      <article class="timeline-item" style="--i:${i}">
        <span class="timeline-dot" aria-hidden="true"></span>
        <p class="timeline-period">${esc(t.period)}</p>
        <h3 class="timeline-title">${esc(t.title)}</h3>
        <p class="timeline-company">${esc(t.company)}</p>
        <ul class="timeline-achievements">${(t.achievements || []).map((a) => `<li>${esc(a)}</li>`).join("")}</ul>
        <p class="timeline-impact">${esc(t.impact)}</p>
      </article>`
      )
      .join("");
  }

  /* ---- Render: Gallery ---- */
  function renderGallery() {
    const grid = $("gallery-grid");
    if (!grid || !gallery?.items) return;
    grid.innerHTML = gallery.items
      .map(
        (g, i) => `
      <button class="gallery-item" type="button" style="--i:${i}"
        data-src="${esc(g.image)}" data-caption="${esc(g.caption)}" data-title="${esc(g.title)}">
        <div class="gallery-thumb">
          <img src="${esc(g.image)}" alt="${esc(g.title)}" loading="lazy" data-fallback="${DEFAULT_IMG}" />
        </div>
        <div class="gallery-info">
          <p class="gallery-cat">${esc(g.category)}</p>
          <h3 class="gallery-title">${esc(g.title)}</h3>
        </div>
      </button>`
      )
      .join("");

    grid.querySelectorAll(".gallery-item").forEach((btn) => {
      btn.addEventListener("click", () => openModal(btn.dataset.src, btn.dataset.caption || btn.dataset.title));
    });
    initImageFallbacks(grid);
  }

  function openModal(src, caption) {
    const modal = $("gallery-modal");
    const img = $("modal-img");
    const cap = $("modal-caption");
    if (!modal || !img) return;
    img.src = src;
    img.alt = caption || "";
    if (cap) cap.textContent = caption || "";
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    $("gallery-modal")?.classList.add("hidden");
    document.body.style.overflow = "";
  }

  /* ---- Render: Testimonials ---- */
  function renderTestimonials() {
    const section = $("testimonials");
    const grid = $("testimonial-grid");
    if (!section || !grid || !testimonials?.items?.length) return;
    section.classList.add("has-content");
    section.classList.remove("hidden-section");
    grid.innerHTML = testimonials.items
      .map(
        (t, i) => `
      <article class="testimonial-card" style="--i:${i}">
        <p class="testimonial-quote">${esc(t.quote)}</p>
        <p class="testimonial-name">${esc(t.name)}</p>
        <p class="testimonial-role">${esc(t.role)} · ${esc(t.company)}</p>
      </article>`
      )
      .join("");
  }

  /* ---- Render: Thought Leadership ---- */
  function renderThoughts() {
    const section = $("thought-leadership");
    const grid = $("thought-grid");
    if (!section || !grid || !thoughts?.items?.length) return;
    section.classList.add("has-content");
    section.classList.remove("hidden-section");
    grid.innerHTML = thoughts.items
      .map(
        (t, i) => `
      <a class="thought-card" href="${esc(t.url)}" target="_blank" rel="noopener" style="--i:${i}">
        <span class="thought-type">${esc(t.type)}</span>
        <h3 class="thought-title">${esc(t.title)}</h3>
        <p class="thought-excerpt">${esc(t.excerpt)}</p>
        <span class="thought-date">${esc(t.date)}</span>
      </a>`
      )
      .join("");
  }

  /* ---- Render: Contact ---- */
  function renderContact() {
    const el = $("contact-actions");
    const c = profile.contact || {};
    if (!el) return;
    el.innerHTML = `
      ${c.linkedin ? `<a class="btn btn-primary" href="${esc(c.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>` : ""}
      ${c.github ? `<a class="btn btn-outline" href="${esc(c.github)}" target="_blank" rel="noopener">GitHub</a>` : ""}
      ${c.email ? `<a class="btn btn-outline" href="${esc(c.email)}">Email</a>` : ""}`;
  }

  /* ---- Utilities ---- */
  function initImageFallbacks(root) {
    if (!root) return;
    root.querySelectorAll("img").forEach((img) => {
      const fb = img.dataset.fallback || DEFAULT_IMG;
      if (!img.dataset.fallback) img.dataset.fallback = fb;
      img.addEventListener("error", function onErr() {
        if (this.dataset.fellBack === "1") return;
        const target = this.dataset.fallback || DEFAULT_IMG;
        if (!this.src.includes(target)) {
          this.dataset.fellBack = "1";
          this.src = target;
        }
      });
    });
  }

  function initScrollReveal() {
    const targets = document.querySelectorAll(".reveal, .reveal-stagger");
    if (reducedMotion) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            if (e.target.id === "engineering" || e.target.closest("#engineering")) animateImpact();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach((el) => io.observe(el));
    io.observe($("engineering"));
  }

  function animateImpact() {
    if (countersDone || reducedMotion) return;
    countersDone = true;
    document.querySelectorAll(".impact-value[data-target]").forEach((el) => {
      const target = parseInt(el.dataset.target, 10);
      if (!target || el.textContent.includes("+")) return;
      const dur = 1200;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = fmtNum(Math.round(target * ease));
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  function initNav() {
    const header = $("site-header");
    const links = document.querySelectorAll(".nav-link[data-section]");
    const sections = [...links].map((l) => document.getElementById(l.dataset.section)).filter(Boolean);

    function onScroll() {
      const y = window.scrollY + 80;
      let current = sections[0]?.id || "hero";
      sections.forEach((s) => { if (s.offsetTop <= y) current = s.id; });
      links.forEach((l) => l.classList.toggle("active", l.dataset.section === current));
      header?.classList.toggle("scrolled", window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    $("nav-toggle")?.addEventListener("click", () => {
      const nav = document.querySelector(".nav");
      const open = nav?.classList.toggle("open");
      $("nav-toggle")?.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---- Events ---- */
  function bindEvents() {
    $("repo-filters")?.addEventListener("click", (e) => {
      const chip = e.target.closest(".filter-chip");
      if (!chip) return;
      activeFilter = chip.dataset.filter;
      renderRepoFilters();
      renderRepos();
    });

    $("repo-search")?.addEventListener("input", renderRepos);

    $("gallery-modal")?.querySelector(".modal-close")?.addEventListener("click", closeModal);
    $("gallery-modal")?.addEventListener("click", (e) => { if (e.target.id === "gallery-modal") closeModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
  }

  /* ---- Boot ---- */
  async function boot() {
    try {
      const [p, pr, ex, tl, te, th, ga, gh, so, re] = await Promise.all([
        fetch("data/profile.json").then((r) => r.json()),
        fetch("data/projects.json").then((r) => r.json()),
        fetch("data/expertise.json").then((r) => r.json()),
        fetch("data/timeline.json").then((r) => r.json()),
        fetch("data/testimonials.json").then((r) => r.json()),
        fetch("data/thought-leadership.json").then((r) => r.json()),
        fetch("data/gallery.json").then((r) => r.json()),
        fetch("data/github.json").then((r) => r.json()),
        fetch("data/stackoverflow.json").then((r) => r.json()),
        fetch("data/repos.json").then((r) => r.json()),
      ]);

      profile = p;
      projects = pr;
      expertise = ex;
      timeline = tl;
      testimonials = te;
      thoughts = th;
      gallery = ga;
      github = gh;
      stackoverflow = so;
      repos = re;

      document.title = `${profile.name} — Solution Architect & Engineering Leader`;
      $("footer-year").textContent = new Date().getFullYear();

      renderHero();
      renderAbout();
      renderFeatured();
      renderEngineering();
      renderRepoFilters();
      renderRepos();
      renderExpertise();
      renderTimeline();
      renderGallery();
      renderTestimonials();
      renderThoughts();
      renderContact();

      initScrollReveal();
      initNav();
      bindEvents();
    } catch (err) {
      console.error(err);
      $("repo-grid").innerHTML = `<p class="empty-state">Failed to load portfolio data.</p>`;
    }
  }

  boot();
})();
