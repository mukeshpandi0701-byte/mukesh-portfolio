# Architecture

- `src/app`: App Router routes, semantic scene content, design tokens and shared styles.
- `src/components/scenes/cinematic-experience.tsx`: title sequence, floating dock, hero/identity scene and horizontal project exploration.
- `src/components/scenes/technical-universe.tsx`: keyboard-operable editorial skill exploration.
- `src/animation/controllers/use-cinematic-scene-controller.ts`: pinned hero-to-identity and horizontal project ScrollTriggers.
- `src/animation/transitions/scene-transitions.ts`: shared transition primitives and scene handoff.
- `src/components/media/cinematic-media.tsx`: responsive stills, poster-backed video, frame sequences and accessible fallback.
- `src/components/media/project-showcase-media.tsx`: supplied project screenshots or demonstration video with a labeled placeholder until files are approved.
- `src/data/profile.ts` and `src/data/skills.ts`: editable professional facts, optional publishable links and technical-universe copy.
- `src/data/assets.ts`: dimensions, alt text and paths for supplied portraits and pose cutouts.
- `postcss.config.mjs`: standard Tailwind v4 PostCSS integration used by the Next bundlers.
- `playwright.config.ts` and `tests/e2e`: production-server browser verification and responsive screenshots.
- `src/components/glass`: reusable layered glass surface; `/lab/glass` compares materials over moving backgrounds.
- `src/components/theme-provider.tsx`: system-aware theme persistence and View Transition fallback.
- `src/content/projects.ts`: editable project statements with verification labels.
- `src/app/projects/[slug]`: independent case-study routes.

The main route is server rendered with interactive islands for GSAP scenes, the dock and skill selection. GSAP owns scene transforms and clipping inside scoped contexts and reverts on teardown. React owns theme, mobile navigation and technical-universe selection. Scroll remains native and finite pins keep the composition reversible.

The title sequence currently uses the approved side and three-quarter transparent character cutouts, a masked name, and the glass dock. These are match cuts between distinct static poses, not walking animation. When entrance video is registered, the video path becomes the single intro subject and the three-quarter still is omitted. The opening can be skipped, runs once per tab, respects reduced motion, and falls back to the approved still on media failure. The front-facing cutout becomes the hero foreground; studio, master, rooftop and rear-facing assets support later scene compositions. Project media remains optional and source-driven; no screenshots are fabricated.

Tailwind is processed through the official PostCSS plugin. The former `@tailwindcss/turbopack` custom loader rule was incorrect and has been removed. Turbopack still intermittently fails while starting its CSS worker in this Windows environment, including with the official PostCSS integration, so npm `dev` and `build` scripts explicitly select Webpack for reliability. No framework or CSS dependency upgrade was needed. Playwright browser tests use an installed Chrome channel and a built production server.
