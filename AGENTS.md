# Project guidance

- Keep content, rendering, motion, and shared styles in their existing directories.
- Preserve semantic HTML, keyboard access, responsive behavior, and reduced-motion support.
- Keep portfolio statements factual. Unconfirmed details must remain visibly identified as placeholders.
- Use design tokens in `src/app/globals.css`; avoid adding raw palette values to components.
- GSAP owns scene and scroll motion. React state owns interaction state. Always scope/revert GSAP contexts.
- Do not represent the procedural hero silhouette as Mukesh. See `docs/ASSET-REQUIREMENTS.md`.
- Check `npx tsc --noEmit`, `npm run lint`, and `npm run build` after implementation changes.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
