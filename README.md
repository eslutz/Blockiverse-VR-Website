# Blockiverse VR Website

This repository is the static GitHub Pages source for [blockiversevr.com](https://blockiversevr.com).

## Pages Deployment

The site is deployed by `.github/workflows/pages.yml` using GitHub Pages Actions. The published artifact root is the repository root, and `CNAME` configures the custom domain `blockiversevr.com`.

Action version evidence checked on 2026-06-11:

- `actions/checkout@v6` from `https://github.com/actions/checkout/releases/latest`
- `actions/configure-pages@v6` from `https://github.com/actions/configure-pages/releases/latest`
- `actions/upload-pages-artifact@v5` from `https://github.com/actions/upload-pages-artifact/releases/latest`
- `actions/deploy-pages@v5` from `https://github.com/actions/deploy-pages/releases/latest`

GitHub's custom-domain documentation confirms that GitHub Pages uses a `CNAME` file for the custom domain setting.

## Art Assets

The website art is original generated bitmap art for this project.

- `assets/blockiverse-hero.jpg` - first-person VR voxel-world hero.
- `assets/blockiverse-coop.jpg` - LAN co-op building scene.

Source prompts used the built-in Image Generation tool and explicitly excluded third-party logos, Minecraft textures, Minecraft mobs, UI labels, text, and watermarks. The generated source PNGs remain under `~/.codex/generated_images/019eb62b-85af-7403-9703-28eb9b0b59cb/`; the committed website copies are JPEGs so they do not require Git LFS while `git-lfs` is unavailable locally.
