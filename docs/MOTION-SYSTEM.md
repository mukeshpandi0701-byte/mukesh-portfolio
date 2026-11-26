# Motion system

GSAP and ScrollTrigger own the opening, pinned hero-to-identity transformation and horizontal project exploration. React owns theme and menu state, and the interactive technical universe selection. Scene progress stays in CSS properties rather than React render state. Each GSAP context is scoped and reverted on teardown.

## Scene behavior

- **Opening:** monogram, architectural still, side pose, short side-to-three-quarter match cut, masked MUKESH reveal, dock materialization and clipped handoff. The sequence is about 2.7 seconds, skippable and shown once per tab. Skipping clears in-flight dock transforms so the fixed navigation appears immediately.
- **Hero to identity:** a finite pin moves and reframes the foreground character and oversized wordmark, fades the architectural layer into noir, and reveals the studio portrait and identity typography.
- **Projects:** a reversible horizontal track moves through three separate, verified-placeholder project panels with expanding graphic masks.
- **Journey and finale:** layered approved portraits, large date treatment, and a rooftop/rear-pose close frame the remaining semantic content.

No pose alternation is presented as a walk. All pose transitions are deliberate editorial cuts; actual walking, head-turn or alpha-video motion can replace the still media registry when supplied. Native scrolling stays enabled. `prefers-reduced-motion` removes the pins and shows the same content in normal document flow, with project panels stacked. Mobile pins are shorter and the navigation collapses to an operable menu. Theme changes update semantic tokens without rebuilding active scroll timelines.

The media registry exposes named future slots for walking entry, head turn, rear exit, and laptop transition. A video always carries a poster; a sequence keeps its poster visible until a decoded frame is available, caps device pixel ratio, and tears down its observer and ScrollTrigger. Reduced motion disables autoplay and sequence scrubbing.

GSAP exclusively owns animated transforms and clips while the scene controller is armed. CSS owns layout and static fallbacks. Do not animate the same properties in another motion system.
