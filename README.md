# noncent.github.io — Repository Dashboard

Welcome dashboard at **https://noncent.github.io/** listing all GitHub repositories (public + private).

## Features

- 51 repositories (46 public with links, 5 private with lock badges)
- AI-generated category cover images
- Search, visibility/language/category filters
- Light/dark theme (default: light)
- Featured PromptVault card

## Refresh repo data

```bash
node scripts/sync-repos.mjs
```

Requires authenticated `gh` CLI (`gh auth status`).

## Local preview

```bash
python3 -m http.server 8788
# open http://localhost:8788
```

## Security note

Private repository names and descriptions are included in the static `data/repos.json` deployed publicly. They are not linkable without GitHub access.
