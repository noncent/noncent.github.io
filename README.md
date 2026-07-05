# noncent.github.io — Premium Executive Portfolio

Personal portfolio for **Neeraj Singh** — Senior Solution Architect & Engineering Leader.

Live: **https://noncent.github.io/**

## Sync data

```bash
node scripts/sync-repos.mjs
node scripts/sync-github-stats.mjs
```

Requires authenticated `gh` CLI. Syncs public repos, stars, forks, and language breakdown.

## Local preview

```bash
python3 -m http.server 8788
# open http://localhost:8788
```

## Content

Edit JSON files in `data/` — `profile.json`, `projects.json`, `timeline.json`, etc.

Add headshot: `assets/profile.jpg`

