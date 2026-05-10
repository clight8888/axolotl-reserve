# CLAUDE.md

Notes for Claude Code/Cowork when working in this repo.

## Project

Next.js app for an Axolotl Reserve demo site. Deploys from `main` to AWS Amplify app `ddoeb9lzgzkb6` (`https://main.ddoeb9lzgzkb6.amplifyapp.com`).

## Recent OpenClaw Changes

- Added `scripts/list-axolotls.js` and `npm run list-axolotls` to print all axolotl names from `data/axolotls.json`.
- Replaced emoji placeholders with `AxolotlIcon` in buyer dashboard and reserve form.
- Added `amplify.yml` for Amplify SSR deployment and auth env export during build.
- Improved mobile navigation in `app/components/Navbar.tsx` so menu items fit on iPhone.
- Added Master's real axolotl image at `public/images/real-axolotl.jpg` as an optional per-axolotl image reference. `types/index.ts` now supports `imageUrl?: string`; `data/axolotls.json` uses it for Luna only. Components should show `AxolotlImage`, which falls back to the cartoon icon plus “Image unavailable” when no image is set.

## Deployment Notes

Amplify needs these branch environment variables:

- `NEXTAUTH_URL=https://main.ddoeb9lzgzkb6.amplifyapp.com`
- `NEXTAUTH_SECRET`
- `ADMIN_PASSWORD`

Do not commit secret values. They are configured in Amplify branch/app env vars.
