(function () {
  "use strict";

  const els = {
    search: document.getElementById("search"),
    chips: document.getElementById("chips"),
    grid: document.getElementById("grid"),
    featured: document.getElementById("featured"),
    stats: document.getElementById("stats"),
    empty: document.getElementById("empty"),
    themeToggle: document.getElementById("theme-toggle"),
  };

  let DATA = null;
  let activeFilter = "All";

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function fuzzy(query, text) {
    if (!query) return { score: 1, indices: [] };
    const q = query.toLowerCase();
    const t = (text || "").toLowerCase();
    if (!t) return null;
    let qi = 0;
    const indices = [];
    for (let i = 0; i < t.length && qi < q.length; i++) {
      if (t[i] === q[qi]) {
        indices.push(i);
        qi++;
      }
    }
    if (qi < q.length) return null;
    return { score: q.length / t.length, indices };
  }

  function formatDate(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }

  function renderChips() {
    const cats = [...new Set(DATA.repos.map((r) => r.category))].sort();
    const items = [
      { key: "All", label: "All" },
      { key: "Public", label: "Public" },
      { key: "Private", label: "Private" },
      ...cats.map((c) => ({ key: `cat:${c}`, label: c })),
    ];
    els.chips.innerHTML = items
      .map(
        ({ key, label }) =>
          `<button class="chip${activeFilter === key ? " active" : ""}" type="button" data-filter="${escapeHtml(key)}">${escapeHtml(label)}</button>`
      )
      .join("");
  }

  function matchesFilter(repo) {
    if (activeFilter === "All") return true;
    if (activeFilter === "Public") return !repo.private;
    if (activeFilter === "Private") return repo.private;
    if (activeFilter.startsWith("cat:")) return repo.category === activeFilter.slice(4);
    return true;
  }
  function renderStats() {
    const s = DATA.stats;
    els.stats.innerHTML = `
      <span class="stat-pill"><strong>${s.total}</strong> repositories</span>
      <span class="stat-pill"><strong>${s.public}</strong> public</span>
      <span class="stat-pill"><strong>${s.private}</strong> private</span>`;
  }

  function renderFeatured() {
    const pv = DATA.repos.find((r) => r.name === "promptvault");
    if (!pv) {
      els.featured.innerHTML = "";
      return;
    }
    els.featured.innerHTML = `
      <a class="featured-card" href="https://noncent.github.io/promptvault/" target="_blank" rel="noopener">
        <img class="featured-cover" src="${escapeHtml(pv.cover)}" alt="" loading="eager" />
        <div class="featured-body">
          <div class="featured-label">Featured project</div>
          <h2 class="featured-title">PromptVault</h2>
          <p class="featured-desc">${escapeHtml(pv.description || "Fuzzy-search AI prompts, expand, and copy in one tap.")}</p>
        </div>
      </a>`;
  }

  function scoreRepo(repo, query) {
    if (!matchesFilter(repo)) return null;
    if (repo.name === "promptvault") return null;
    if (!query) return { repo, score: 1 };
    const name = fuzzy(query, repo.name);
    const desc = fuzzy(query, repo.description);
    const lang = fuzzy(query, repo.language || "");
    if (!name && !desc && !lang) return null;
    const score =
      (name ? name.score * 6 : 0) +
      (desc ? desc.score * 2 : 0) +
      (lang ? lang.score * 3 : 0);
    return { repo, score };
  }

  function lockSvg() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>';
  }

  function extSvg() {
    return '<svg class="repo-ext" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>';
  }

  function cardHtml(repo) {
    const isPrivate = repo.private;
    const tag = isPrivate
      ? `<span class="repo-lock">${lockSvg()} Private</span>`
      : "";
    const badges = `
      <div class="repo-badges">
        ${isPrivate ? '<span class="badge badge--private">Private</span>' : '<span class="badge">Public</span>'}
        ${repo.language ? `<span class="badge badge--lang">${escapeHtml(repo.language)}</span>` : ""}
        <span class="badge">${escapeHtml(repo.category)}</span>
      </div>`;
    const body = `
      <div class="repo-body">
        <div class="repo-head">
          <h3 class="repo-name">${isPrivate ? escapeHtml(repo.name) : `<a href="${escapeHtml(repo.url)}" target="_blank" rel="noopener">${escapeHtml(repo.name)}</a>`}</h3>
          ${isPrivate ? "" : extSvg()}
        </div>
        ${badges}
        <p class="repo-desc">${escapeHtml(repo.description || "No description provided.")}</p>
        <div class="repo-meta">Updated ${escapeHtml(formatDate(repo.updatedAt))}</div>
      </div>`;
    const cover = `<div class="repo-cover-wrap"><img class="repo-cover" src="${escapeHtml(repo.cover)}" alt="" loading="lazy" />${tag}</div>`;

    if (isPrivate) {
      return `<article class="repo-card repo-card--private" role="listitem" title="Private repository — not publicly accessible">${cover}${body}</article>`;
    }
    return `<a class="repo-card" role="listitem" href="${escapeHtml(repo.url)}" target="_blank" rel="noopener">${cover}${body}</a>`;
  }

  function render() {
    const query = els.search.value.trim();
    const results = DATA.repos
      .map((r) => scoreRepo(r, query))
      .filter(Boolean)
      .sort((a, b) => b.score - a.score || new Date(b.repo.updatedAt) - new Date(a.repo.updatedAt));

    els.grid.innerHTML = results.map((r) => cardHtml(r.repo)).join("");
    els.empty.classList.toggle("hidden", results.length > 0);
  }

  /* theme */
  const THEME_KEY = "noncent-theme";
  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
  }
  function toggleTheme() {
    setTheme(document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light");
  }
  if (els.themeToggle) els.themeToggle.addEventListener("click", toggleTheme);

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

  fetch("data/repos.json")
    .then((r) => r.json())
    .then((json) => {
      DATA = json;
      renderStats();
      renderFeatured();
      renderChips();
      render();
    })
    .catch((err) => {
      els.grid.innerHTML = `<p class="empty">Failed to load repositories: ${escapeHtml(err.message)}</p>`;
    });
})();
