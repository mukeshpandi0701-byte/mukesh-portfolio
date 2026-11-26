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

The side and three-quarter poses are separate stills. The intro uses short, restrained opacity and camera-position match cuts; it does not simulate walking. `characterRegistry.motion` exposes named replaceable slots for `walkingEntrance`, `headTurn`, `rearWalkingExit`, and `laptopTransition`. Each slot accepts a still, video with a required poster, or a scroll-controlled sequence. `transparentVideo` remains a video slot, while the existing sequence canvas caps DPR and falls back to its poster if drawing is unavailable. Reduced-motion disables sequence scrubbing and autoplay. Replace the media assigned to these slots without restructuring scene markup.

Future footage should provide a silent web-ready H.264/VP9 or alpha-capable WebM encode, a correctly framed poster, and a non-transparent still fallback. Confirm alpha playback on target browsers before relying on it. For a laptop-screen transition, supply a clean plate and composited screen replacement or an authored frame sequence; do not fake screen content by cropping a head-turn clip.

## Project media and publishing

Only use project screenshots, diagrams, or logos supplied and approved for publication. Project panels use abstract typography and are labeled `VISUAL PLACEHOLDER / NO PRODUCT IMAGE`. Confirm project status, role, dates, links, and every case-study statement before removing verification labels. The email uses the reserved `example.invalid` placeholder; social URLs remain marked for addition.
