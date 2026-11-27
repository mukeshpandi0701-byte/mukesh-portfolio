# Asset requirements

## Approved portrait set

Milestone 3 integrates the supplied PNGs without editing their pixels:

| Asset | Use |
| --- | --- |
| `portraits/master.png` | Overlapping editorial image layer in the journey |
| `portraits/architectural.png` | Intro frame and hero background portrait |
| `portraits/studio.png` | Identity transformation and journey image layer |
| `portraits/rooftop.png` | Finale atmosphere |
| `character/front.png` | Full-body hero foreground |
| `character/three-quarter.png` | Intro match-cut pose |
| `character/side-walking.png` | Intro side-facing reveal; a static pose |
| `character/rear-walking.png` | Finale foreground pose; a static pose |

`src/data/assets.ts` holds the approved paths, dimensions and alt text. `CinematicMedia` uses Next Image for responsive resizing and modern-format delivery; originals in `public/assets/` remain unchanged. Transparent pose PNGs are rendered with `object-fit: contain` so browser image optimization retains their transparent contour.

The side and three-quarter poses are separate stills. The intro uses short, restrained opacity and camera-position match cuts; it does not simulate walking. `characterRegistry.motion` exposes named replaceable slots for `walkingEntrance`, `headTurn`, `rearWalkingExit`, and `laptopTransition`. Each slot accepts a still, video with a required poster, or a scroll-controlled sequence. `transparentVideo` remains a video slot. For the entrance, place future files at `public/assets/videos/entrance.webm` and `public/assets/videos/entrance.mp4`, then assign a `kind: "video"` asset to `walkingEntrance` with the approved architectural/hero-compatible poster and source MIME types. Include the approved side pose as the `CinematicMedia` fallback. The main video path is intentionally left unset until footage exists, so visitors do not receive missing-file requests. Autoplay rejection keeps the poster; a decode/network error swaps to the still fallback.

Prepare `head-turn.webm`, `laptop-transition.webm` and `rear-exit.webm` only when approved media is available. For scroll-driven video include `scrollControlled: true`, a poster, and short footage with stable keyframes. If seeking stutters on target devices, supply an optimized ordered AVIF/WebP sequence and poster; the sequence renderer uses bounded memory and plays in both directions. Do not use separate unrelated still poses as a walking sequence.

Future footage should provide a silent web-ready H.264/VP9 or alpha-capable WebM encode, a correctly framed poster, and a non-transparent still fallback. Confirm alpha playback on target browsers before relying on it. To prevent a composition jump, align the last entrance frame and poster to the hero subject's size, position, and pose. For a laptop-screen transition, supply a clean plate and composited screen replacement or an authored frame sequence; do not fake screen content by cropping a head-turn clip.

## Project media and publishing

Only use project screenshots, diagrams, or logos supplied and approved for publication. `ProjectShowcaseMedia` in `src/components/media/project-showcase-media.tsx` accepts desktop/mobile screenshots or a poster-backed demonstration video through each project's optional `media` object. Until those files are configured, panels use abstract typography and are labeled `VISUAL PLACEHOLDER / NO PRODUCT IMAGE`. Confirm project status, role, dates, links, and every case-study statement before removing verification labels. Email, GitHub, LinkedIn and resume destinations live in `src/data/profile.ts`; leave a value `null` until verified, and the corresponding public link is omitted.
