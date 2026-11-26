# Mukesh - Cinematic Portfolio

A cinematic personal portfolio built with Next.js App Router, strict TypeScript, Tailwind CSS, GSAP and ScrollTrigger. Milestone 3 integrates the supplied portrait set and transparent character poses, including a pose-based introduction, full-body hero, pinned identity transformation, horizontal project exploration, editorial skills interaction, visual journey, rooftop finale, Light/Dark/System themes and OriginOS glass lab.

## Run locally

```bash
npm install
npm.cmd run dev
```

Open [http://localhost:3000](http://localhost:3000). The Next 16 CSS pipeline uses `@tailwindcss/postcss` through `postcss.config.mjs`. Turbopack still intermittently exits while spawning its CSS worker in this Windows environment, including with the official PostCSS setup, so the documented dev and production scripts explicitly use Webpack.

Run the verification commands from PowerShell:

```powershell
npx.cmd tsc --noEmit
npm.cmd run lint
npm.cmd run build
npm.cmd run test:e2e
```

Playwright uses the installed Chrome channel and a production server. Run `npm.cmd run build` first. The suite captures viewports and scene states in `artifacts/screenshots/`.

## Routes

- `/` - cinematic portfolio experience
- `/projects/classygenz`, `/projects/resync`, `/projects/invenzo-ai` - editable case-study pages
- `/lab/glass` - moving-background glass material comparison

The opening sequence runs once per tab, can be skipped, and uses static still poses as brief match cuts. It does not represent those stills as walking footage. The hero-to-identity scene and horizontal project scene use a shared GSAP controller; reduced motion switches them back to semantic document flow. See `docs/MOTION-SYSTEM.md` and `docs/ARCHITECTURE.md`.

## Content and assets

The approved supplied assets are registered in `src/data/assets.ts`. Original PNG files remain unchanged; Next Image performs responsive modern-format delivery. Character pose images are static transparent cutouts. Named motion slots are ready for entrance footage, head turns, rear exits and laptop transitions, alongside poster-backed transparent video and scroll-controlled WebP/AVIF frames. Project facts, the email address, and social URLs remain visibly marked for verification. See `docs/ASSET-REQUIREMENTS.md`.

## Notes

Theme choice supports Light, Dark and System and is persisted by `next-themes`. ScrollTrigger timelines are scoped and reverted on unmount. The contact destination is an `example.invalid` placeholder. OriginOS is a proprietary native rendering system; the glass lab documents browser compositing approximations and cannot provide physical refraction or verified native fidelity.
