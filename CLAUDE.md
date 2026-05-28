# SSC Estimating Website — CLAUDE.md

## Project Context
Marketing website for **SSC Estimating**, a construction cost estimating software product
built by Spencer Stephens Construction (SSC Homes). This is a static 6-page site deployed
to Azure Static Web Apps via GitHub Actions.

**Parent company:** Spencer Stephens Construction / SSC Homes
**Phone:** 385-396-7647
**Address:** 1357 N 2000 W Suite 200, Farr West, UT 84404
**Parent site:** https://sschomesutah.com

## Branch Strategy
- `main` / `master` — production, auto-deploys to Azure SWA
- `develop` — staging previews via SWA preview environments

## Pages
| File | Purpose |
|------|---------|
| index.html | Home — hero, stats, features preview, process, testimonials |
| about.html | Company story, values, timeline |
| services.html | Features deep-dive, pricing |
| gallery.html | Case studies with filterable grid |
| resources.html | Free calculator + estimating glossary |
| contact.html | Demo request form + contact info |

## Design System
- **Primary:** `#7D1A28` (crimson — from SSC Homes logo)
- **Accent:** `#1B4B82` (steel blue — tech feel)
- **Fonts:** Oswald (headlines), Inter (body), Source Serif 4 (quotes)
- All CSS variables defined in `css/style.css` `:root`

## When Making Edits
- Keep all contact info consistent: **385-396-7647** and **1357 N 2000 W Suite 200, Farr West, UT 84404**
- Don't hardcode colors — use CSS variables
- All pages share the same nav/footer structure — update all 6 pages if nav/footer changes
- JS calculator lives in `js/main.js` — base rates are 2026 Northern Utah market data

## Deployment
- GitHub repo: SSCHomes/ssc-estimating
- Azure subscription: Spencer Stephens Construction (ca52d64c-8783-4ec8-a3b3-b25d5ec4603c)
- Azure SWA name: ssc-estimating
- SWA token stored as GitHub secret: AZURE_STATIC_WEB_APPS_API_TOKEN
