type Timeline = GSAPTimeline;

export function heroToIdentity(timeline: Timeline, small: boolean) {
  timeline
    .to(".entry-backdrop", { backgroundColor: "#111111", duration: 1, ease: "none" }, 0)
    .to(".entry-grid", { opacity: 0.12, scale: 1.16, duration: 1, ease: "none" }, 0)
    .to(".entry-title", { xPercent: -8, yPercent: -105, scale: 0.39, transformOrigin: "left center", duration: 0.72, ease: "none" }, 0)
    .to(".entry-portrait", { width: small ? "44vw" : "25vw", height: small ? "48vh" : "58vh", right: small ? "4%" : "7%", top: small ? "23%" : "19%", rotate: -3, scale: 1.08, opacity: 0.34, clipPath: "inset(0% 0% 0% 0% round 46% 46% 3px 3px)", duration: 0.7, ease: "none" }, 0)
    .to(".entry-character", { xPercent: small ? 24 : 17, yPercent: 8, scale: small ? 0.8 : 0.76, opacity: 0.62, duration: 0.76, ease: "none" }, 0)
    .to(".entry-copy", { yPercent: -9, duration: 0.72, ease: "none" }, 0)
    .to(".entry-portrait", { opacity: 0, scale: 1.14, filter: "blur(9px)", duration: 0.2, ease: "none" }, 0.72)
    .fromTo(".identity-curtain", { clipPath: "inset(0 0 0 100%)" }, { clipPath: "inset(0 0 0 0%)", duration: 0.6, ease: "none" }, 0.34)
    .fromTo(".identity-title", { xPercent: 9, opacity: 0.25 }, { xPercent: 0, opacity: 1, duration: 0.48, ease: "none" }, 0.43)
    .fromTo(".identity-portrait", { clipPath: "inset(0 0 100% 0)", yPercent: 8 }, { clipPath: "inset(0 0 0% 0)", yPercent: 0, duration: 0.45, ease: "none" }, 0.56)
    .fromTo(".identity-role", { y: 22, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.36, ease: "none" }, 0.62);
  return timeline;
}

export function projectFrameReveal(timeline: Timeline, card: HTMLElement, at: number) {
  const frame = card.querySelector<HTMLElement>(".project-story__frame");
  const title = card.querySelector<HTMLElement>(".project-story__title");
  const details = card.querySelector<HTMLElement>(".project-story__details");
  if (frame) timeline.fromTo(frame, { clipPath: "inset(18% 16% 18% 16% round 2px)", scale: 0.92 }, { clipPath: "inset(0% round 2px)", scale: 1, duration: 0.7, ease: "none" }, at);
  if (title) timeline.fromTo(title, { xPercent: 5, opacity: 0.78 }, { xPercent: 0, opacity: 1, duration: 0.42, ease: "none" }, at + 0.12);
  if (details) timeline.fromTo(details, { y: 12, opacity: 0.72 }, { y: 0, opacity: 1, duration: 0.32, ease: "none" }, at + 0.24);
}

export function projectToNextScene(timeline: Timeline, at: number) {
  timeline.to(".project-story__wipe", { clipPath: "inset(0 0 0 0)", duration: 0.32, ease: "power2.in" }, at);
}
