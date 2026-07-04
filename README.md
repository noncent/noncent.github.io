# noncent.github.io — Portfolio SPA

Scroll-driven portfolio dashboard at **https://noncent.github.io/** showcasing 46 public open-source repositories.

## Features

- Full-viewport hero with parallax and CTAs
- Scroll-triggered section animations (Intersection Observer)
- Animated stat counters
- Bento featured grid + searchable repo library
- Light/dark theme, 3D card tilt on hover
- Category filters and fuzzy search

## Refresh repo data

```bash
node scripts/sync-repos.mjs
```

Requires authenticated `gh` CLI. Only **public** repos are synced.

## Local preview

```bash
python3 -m http.server 8788
# open http://localhost:8788
```
