# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Local Development

The site uses [Eleventy (11ty)](https://www.11ty.dev/) as a static site generator. Install dependencies and start the dev server:

```bash
npm install
npm start        # serves at http://localhost:8765 with live reload
npm run build    # outputs to _site/
```

The `.claude/launch.json` config starts the dev server automatically via `preview_start` (uses `npm start`).

## Deployment

Pushing to `main` triggers `.github/workflows/pages.yml`, which runs `npm ci && npm run build` and deploys `_site/` to GitHub Pages at [blockiversevr.com](https://blockiversevr.com). `src/CNAME` sets the custom domain; `src/.nojekyll` disables Jekyll processing — both are passed through to `_site/` by Eleventy.

## Architecture

Eleventy processes `src/` and outputs to `_site/`. All nav and footer HTML lives once in `src/_includes/layouts/base.njk`; all pages inherit it via front matter.

| Path | Purpose |
|---|---|
| `src/_includes/layouts/base.njk` | Shared HTML shell — `<head>`, nav, footer |
| `src/index.njk` | Marketing homepage |
| `src/privacy/index.njk` | Privacy policy |
| `src/support/index.njk` | Support / contact |
| `src/404.njk` | Custom 404 — standalone HTML, no layout |
| `src/assets/styles.css` | Single stylesheet (~580 lines) |

### Front matter convention

Each page sets `layout`, `title`, `navCurrent` (matches a nav link name for `aria-current="page"`), and `innerPage` (true on interior pages to activate the sticky dark header):

```yaml
---
layout: layouts/base.njk
title: Support | Blockiverse VR
navCurrent: support
innerPage: true
---
```

### Design tokens (CSS custom properties on `:root`)

The palette is defined once in `src/assets/styles.css`:
- `--leaf` `#2f7d47`, `--sky` `#1f91bd`, `--amber` `#f3a51d`, `--night` `#10191d`
- `--ink`, `--ink-soft`, `--surface`, `--surface-alt`, `--line` for text and backgrounds

The navbar brand-mark (`span.brand-mark`) is rendered entirely in CSS — gradient background with `::before`/`::after` pseudo-elements forming a plus shape. `src/favicon.svg` replicates this mark exactly.

### Header variants

- `site-header` (no modifier) — absolute-positioned, transparent, for the hero homepage (`innerPage: false`)
- `site-header inner-page` — sticky, dark semi-transparent blur, for interior pages (`innerPage: true`)
