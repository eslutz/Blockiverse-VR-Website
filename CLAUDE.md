# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Local Development

This is a plain static site — no build step, no package manager. Serve it with any HTTP server from the repo root:

```bash
python3 -m http.server 8765
```

The `.claude/launch.json` config starts this server automatically via `preview_start`.

## Deployment

Pushing to `main` triggers `.github/workflows/pages.yml`, which deploys the repo root directly to GitHub Pages at [blockiversevr.com](https://blockiversevr.com). The `CNAME` file sets the custom domain; `.nojekyll` disables Jekyll processing.

## Architecture

Four standalone HTML pages, one shared stylesheet, no JavaScript:

| Path | Purpose |
|---|---|
| `index.html` | Marketing homepage |
| `privacy/index.html` | Privacy policy |
| `support/index.html` | Support / contact |
| `404.html` | Custom 404 (no nav header — minimal layout) |

All pages share `/assets/styles.css` (single file, ~560 lines) and reference `/favicon.svg` for the browser tab icon.

### Design tokens (CSS custom properties on `:root`)

The palette is defined once in `styles.css`:
- `--leaf` `#2f7d47`, `--sky` `#1f91bd`, `--amber` `#f3a51d`, `--night` `#10191d`
- `--ink`, `--ink-soft`, `--surface`, `--surface-alt`, `--line` for text and backgrounds

The navbar brand-mark (`span.brand-mark`) is rendered entirely in CSS — gradient background with `::before`/`::after` pseudo-elements forming a plus shape. The `favicon.svg` replicates this mark exactly.

### Header variants

- `site-header` (no modifier) — absolute-positioned, transparent, for the hero homepage
- `site-header inner-page` — sticky, dark semi-transparent blur, for interior pages
