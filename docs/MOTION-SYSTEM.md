# Motion system

GSAP and ScrollTrigger own the opening, pinned hero-to-identity transformation and horizontal project exploration. React owns theme and menu state, and the interactive technical universe selection. Scene progress stays in CSS properties rather than React render state. Each GSAP context is scoped and reverted on teardown.

## Scene behavior

- **Opening:** monogram and masked MUKESH reveal coordinate with one dominant subject. Until supplied footage is registered, approved side and three-quarter stills are restrained editorial match cuts. A registered entrance video uses one continuous subject and removes the competing still-pose cut; the title and dock choreography still completes in roughly 2.5–3 seconds. The intro is skippable and shown once per tab. Skipping clears in-flight dock transforms so the fixed navigation appears immediately.
- **Hero to identity:** a finite pin moves and reframes the foreground character and oversized wordmark, fades the architectural layer into noir, and reveals the studio portrait and identity typography.
- **Projects:** a reversible horizontal track moves through three separate, verified-placeholder project panels with expanding graphic masks.
- **Journey and finale:** layered approved portraits, large date treatment, and a rooftop/rear-pose close frame the remaining semantic content.

No pose alternation is presented as a walk. All pose transitions are deliberate editorial cuts; actual walking, head-turn or alpha-video motion can replace the still media registry when supplied. Native scrolling stays enabled. `prefers-reduced-motion` removes the pins and shows the same content in normal document flow, with project panels stacked. Mobile pins are shorter and the navigation collapses to an operable menu. Theme changes update semantic tokens without rebuilding active scroll timelines.

The media registry exposes named slots for walking entry, head turn, rear exit, and laptop transition. Videos accept ordered WebM/MP4 sources, require a poster, are muted and inline, preserve the poster when autoplay is blocked, and can fall back to an approved still on load failure. Set `scrollControlled: true` only for short footage authored for seeking; seek updates are coalesced into animation frames and naturally run in both scroll directions. Video seeking is browser and codec dependent, so use an image sequence when it does not remain smooth. A sequence keeps its poster visible until a decoded frame is available, caps DPR, bounds its decoded-frame cache and in-flight requests, and tears down its observer and ScrollTrigger. Reduced motion uses the poster/still path and disables autoplay and sequence scrubbing.

For a seamless entrance handoff, the supplied footage should be framed to match the hero subject scale and position; its final frame and poster should visually align with the hero cutout. The application cannot infer this match from a video it has not received. The cinematic clip should be silent, web optimized, roughly 2.5–3 seconds, and tested on mobile Safari/Chrome before replacing the still-based opening.

GSAP exclusively owns animated transforms and clips while the scene controller is armed. CSS owns layout and static fallbacks. Do not animate the same properties in another motion system.
