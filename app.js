(function () {
  "use strict";

  const els = {
    search: document.getElementById("search"),
    chips: document.getElementById("chips"),
    grid: document.getElementById("grid"),
    bento: document.getElementById("bento"),
    empty: document.getElementById("empty"),
    themeToggle: document.getElementById("theme-toggle"),
    siteNav: document.getElementById("site-nav"),
    statRepos: document.getElementById("stat-repos"),
    statLangs: document.getElementById("stat-langs"),
    statCats: document.getElementById("stat-cats"),
    heroParallax: document.getElementById("hero-parallax"),
    parallaxOrbs: document.getElementById("parallax-orbs"),
  };

  let DATA = null;
  let activeFilter = "All";
  let countersDone = false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function fuzzy(query, text) {
    if (!query) return { score: 1 };
    const q = query.toLowerCase();
    const t = (text || "").toLowerCase();
    if (!t) return null;
    let qi = 0;
    for (let i = 0; i < t.length && qi < q.length; i++) {
      if (t[i] === q[qi]) qi++;
    }
    if (qi < q.length) return null;
    return { score: q.length / t.length };
  }

  function formatDate(iso) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }

  function extSvg() {
    return '<svg class="repo-ext" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>';
  }

  /* ---- render ---- */
  function renderChips() {
    const cats = [...new Set(DATA.repos.map((r) => r.category))].sort();
    const items = [{ key: "All", label: "All" }, ...cats.map((c) => ({ key: c, label: c }))];
    els.chips.innerHTML = items
      .map(
        ({ key, label }) =>
          `<button class="chip${activeFilter === key ? " active" : ""}" type="button" data-filter="${escapeHtml(key)}">${escapeHtml(label)}</button>`
      )
      .join("");
  }

  function matchesFilter(repo) {
    if (activeFilter === "All") return true;
    return repo.category === activeFilter;
  }

  function scoreRepo(repo, query) {
    if (!matchesFilter(repo)) return null;
    const featured = ["promptvault", "discope", "bruos", "developers-cheat-sheet"];
    if (featured.includes(repo.name)) return null;
    if (!query) return { repo, score: 1 };
    const name = fuzzy(query, repo.name);
    const desc = fuzzy(query, repo.description);
    const lang = fuzzy(query, repo.language || "");
    if (!name && !desc && !lang) return null;
    return {
      repo,
      score: (name ? name.score * 6 : 0) + (desc ? desc.score * 2 : 0) + (lang ? lang.score * 3 : 0),
    };
  }

  function bentoCard(repo, cls) {
    return `
      <a class="bento-card ${cls || ""}" href="${escapeHtml(repo.url)}" target="_blank" rel="noopener" style="--i:${0}">
        <img class="bento-cover" src="${escapeHtml(repo.cover)}" alt="" loading="lazy" />
        <div class="bento-overlay"></div>
        <div class="bento-body">
          <div class="bento-tag">${escapeHtml(repo.category)}</div>
          <h3 class="bento-title">${escapeHtml(repo.name)}</h3>
          <p class="bento-desc">${escapeHtml(repo.description || "Open-source project")}</p>
        </div>
      </a>`;
  }

  function renderBento() {
    const pv = DATA.repos.find((r) => r.name === "promptvault");
    const picks = ["discope", "bruos", "developers-cheat-sheet"]
      .map((n) => DATA.repos.find((r) => r.name === n))
      .filter(Boolean);
    let html = "";
    if (pv) html += bentoCard(pv, "bento-card--hero");
    picks.forEach((r, i) => {
      html += bentoCard(r, i === 0 ? "bento-card--wide" : "");
    });
    els.bento.innerHTML = html;
    initCardTilt(els.bento.querySelectorAll(".bento-card"));
  }

  function repoCard(repo, index) {
    return `
      <a class="repo-card" role="listitem" href="${escapeHtml(repo.url)}" target="_blank" rel="noopener" style="--i:${index}">
        <div class="repo-cover-wrap">
          <img class="repo-cover" src="${escapeHtml(repo.cover)}" alt="" loading="lazy" />
        </div>
        <div class="repo-body">
          <div class="repo-head">
            <h3 class="repo-name">${escapeHtml(repo.name)}</h3>
            ${extSvg()}
          </div>
          <div class="repo-badges">
            ${repo.language ? `<span class="badge badge--lang">${escapeHtml(repo.language)}</span>` : ""}
            <span class="badge">${escapeHtml(repo.category)}</span>
          </div>
          <p class="repo-desc">${escapeHtml(repo.description || "No description.")}</p>
          <div class="repo-meta">Updated ${escapeHtml(formatDate(repo.updatedAt))}</div>
        </div>
      </a>`;
  }

  function renderGrid() {
    const query = els.search.value.trim();
    const results = DATA.repos
      .map((r) => scoreRepo(r, query))
      .filter(Boolean)
      .sort((a, b) => b.score - a.score || new Date(b.repo.updatedAt) - new Date(a.repo.updatedAt));

    els.grid.innerHTML = results.map((r, i) => repoCard(r.repo, i)).join("");
    els.empty.classList.toggle("hidden", results.length > 0);
    initCardTilt(els.grid.querySelectorAll(".repo-card"));
  }

  function render() {
    renderGrid();
  }

  /* ---- scroll reveal ---- */
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
            if (e.target.id === "stats") animateCounters();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach((el) => {
      if (!el.classList.contains("hero-content")) io.observe(el);
    });
  }

  /* ---- counters ---- */
  function animateCounters() {
    if (countersDone || !DATA) return;
    countersDone = true;
    const targets = [
      { el: els.statRepos, val: DATA.stats.total },
      { el: els.statLangs, val: DATA.stats.languages },
      { el: els.statCats, val: DATA.stats.categories },
    ];
    targets.forEach(({ el, val }) => {
      if (!el) return;
      if (reducedMotion) { el.textContent = val; return; }
      const dur = 1400;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(val * ease);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  /* ---- nav spy ---- */
  function initNavSpy() {
    const links = document.querySelectorAll(".nav-link[data-section]");
    const sections = [...links].map((l) => document.getElementById(l.dataset.section)).filter(Boolean);

    function update() {
      const scrollY = window.scrollY + varNavH() + 20;
      let current = sections[0]?.id || "hero";
      sections.forEach((sec) => {
        if (sec.offsetTop <= scrollY) current = sec.id;
      });
      links.forEach((l) => l.classList.toggle("active", l.dataset.section === current));
      els.siteNav.classList.toggle("scrolled", window.scrollY > 40);
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function varNavH() {
    return parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 64;
  }

  /* ---- parallax ---- */
  function initParallax() {
    if (reducedMotion) return;
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        if (els.heroParallax) els.heroParallax.style.transform = `translateY(${y * 0.35}px)`;
        if (els.parallaxOrbs) els.parallaxOrbs.style.transform = `translateY(${y * 0.15}px)`;
      },
      { passive: true }
    );
  }

  /* ---- card tilt ---- */
  function initCardTilt(cards) {
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ---- theme ---- */
  const THEME_KEY = "noncent-theme";
  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
  }
  function toggleTheme() {
    setTheme(document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light");
  }
  if (els.themeToggle) els.themeToggle.addEventListener("click", toggleTheme);

  /* ---- events ---- */
  els.chips.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    activeFilter = chip.dataset.filter;
    renderChips();
    render();
  });
  els.search.addEventListener("input", render);

  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== els.search) {
      e.preventDefault();
      els.search.focus();
    } else if (e.key === "Escape" && document.activeElement === els.search) {
      els.search.value = "";
      render();
    } else if ((e.key === "t" || e.key === "T") && document.activeElement !== els.search) {
      toggleTheme();
    }
  });

  /* ---- boot ---- */
  fetch("data/repos.json")
    .then((r) => r.json())
    .then((json) => {
      DATA = json;
      renderChips();
      renderBento();
      render();
      initScrollReveal();
      initNavSpy();
      initParallax();
    })
    .catch((err) => {
      els.grid.innerHTML = `<p class="empty">Failed to load: ${escapeHtml(err.message)}</p>`;
    });
})();
