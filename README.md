# Blockiverse VR Website

Static public website for Blockiverse VR at <https://blockiversevr.com>.

The site is built with [Eleventy](https://www.11ty.dev/) from Nunjucks templates in `src/`. Shared page chrome, navigation, footer links, and metadata live in `src/_includes/layouts/base.njk`. The output is plain HTML and CSS with no runtime JavaScript.

## Site Structure

- `src/index.njk` - home page.
- `src/_includes/layouts/base.njk` - shared layout, metadata, header, and footer.
- `src/assets/styles.css` - site styling.
- `src/assets/blockiverse-hero.jpg` - first-person VR voxel-world hero image.
- `src/assets/blockiverse-coop.jpg` - LAN co-op building scene image.
- `src/favicon.svg`, `src/favicon.ico`, `src/favicon-16x16.png`, `src/favicon-32x32.png`, and `src/apple-touch-icon.png` - icon assets.
- `src/CNAME` - GitHub Pages custom domain.
- `src/robots.txt` - search crawler rules.
- `.github/workflows/pages.yml` - GitHub Pages deployment workflow.

## Routes

- `/` - product overview.
- `/support/` - support URL.
- `/privacy/` - privacy policy URL.

## Support Intake

GitHub Issues are the primary support route for reproducible bugs and development tasks. GitHub Discussions are used for questions, gameplay feedback, Quest setup help, feature ideas, and community build reports. Email is secondary.

## Local Development

```sh
npm install
npm run start
```

Then open the local URL printed by Eleventy. Changes hot-reload.

## Validation

```sh
npm run build
```

This repository currently has no dedicated `npm test` script. Use the build output and manual browser checks for route, layout, and asset validation.

## Deployment

Pushing to `main` triggers `.github/workflows/pages.yml`, which builds the site with Eleventy and deploys `_site/` to GitHub Pages. The custom domain `blockiversevr.com` is configured in GitHub Pages and emitted through `src/CNAME`.
