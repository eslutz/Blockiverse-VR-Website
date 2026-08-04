# AGENTS.md

This file applies to the entire Blockiverse VR Website repository.

## Purpose

This repository is the Eleventy source for the public Blockiverse VR website at <https://blockiversevr.com>.

## Shared Website Pattern

- Keep this site aligned with the PumpSync and Gus website repositories.
- Use Eleventy with Nunjucks templates from `src/` and plain generated HTML/CSS in `_site/`.
- Keep shared page chrome, metadata, navigation, and footer behavior in `src/_includes/layouts/base.njk`.
- Keep site styling in the existing stylesheet path for this repo.
- Use the shared house typefaces: [Mona Sans](https://github.com/github/mona-sans) for body copy and [Hubot Sans](https://github.com/github/hubot-sans) for display text (`h1`, `h2`, the header wordmark). Self-host them from `src/assets/fonts/` and declare them with `@font-face` plus a `preload` link; never load fonts from a CDN. Both are SIL OFL 1.1 with Reserved Font Names, so ship them unmodified and keep `src/assets/fonts/OFL.txt` beside them. Always keep a system-font fallback stack after the family name so text renders before the woff2 arrives. Declare only the axes the files actually have — weight and width, no slant.
- Keep public routes slash-normalized in links and canonical URLs.
- Do not add runtime JavaScript unless a concrete user-facing requirement needs it.
- Do not add visible App Store, TestFlight, or download links unless a real public URL exists.
- Do not publish literal support email addresses in README or AGENTS docs; state that email is secondary.
- Do not manually hard-wrap prose sentences in Markdown. Keep each sentence on one line and let the browser or editor wrap text.

## README Pattern

Keep `README.md` in this shared section order: title and public URL, Eleventy overview, `Site Structure`, `Routes`, `Support Intake`, `Local Development`, `Validation`, and `Deployment`.

## Local Development

Use `npm install` once, then `npm run start`. Open the local URL printed by Eleventy. Changes hot-reload.

## Validation

Run `npm run build` before committing changes that affect source, routes, layout, metadata, or documentation.

## Deployment

Pushing to `main` triggers `.github/workflows/pages.yml`, builds the site, and deploys `_site/` to GitHub Pages. The custom domain is emitted through `src/CNAME`.

## Repository-Specific Facts

- Public URL: <https://blockiversevr.com>
- Custom domain file: `src/CNAME`
- Robots file: `src/robots.txt`
- Stylesheet: `src/assets/styles.css`
- Fonts: `src/assets/fonts/MonaSans.woff2`, `src/assets/fonts/HubotSans.woff2`, `src/assets/fonts/OFL.txt`
- Deployment workflow: `.github/workflows/pages.yml`
- Validation command: `npm run build`
- Required routes: `/`, `/support/`, `/privacy/`
- Generated art assets: `src/assets/blockiverse-hero.jpg` and `src/assets/blockiverse-coop.jpg`
