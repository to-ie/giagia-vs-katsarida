# Giagia vs Cockroach 🪳🩴

A super-simple, mobile-optimised static scoreboard tracking how many cockroaches
Giagia has squashed. Tap **+** / **−** under each fighter to change the score.

- `index.html`, `style.css`, `script.js` — the whole site (no build step).
- `giagia.png` — the original portrait.
- `cockroach.png` — the cockroach fighter portrait.
- The score is stored in the browser via `localStorage`, so it persists per
  device. (For a single global score shared across everyone, you'd need a small
  backend — out of scope for a static site.)

## Deploy on GitHub Pages (via GitHub Actions)

1. Create a repo on GitHub and push this folder to the `main` branch.
2. In the repo, go to **Settings → Pages → Build and deployment** and set
   **Source** to **GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`, which publishes the
   site. The live URL appears in the workflow run and under **Settings → Pages**
   (typically `https://<user>.github.io/<repo>/`).

## Run locally

Just open `index.html` in a browser, or:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```
