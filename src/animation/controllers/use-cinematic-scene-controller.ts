"use client";

import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { heroToIdentity, projectFrameReveal, projectToNextScene } from "@/animation/transitions/scene-transitions";

export function useCinematicSceneController() {
  useLayoutEffect(() => {
    const scope = document.querySelector<HTMLElement>("[data-cinematic-root]");
    if (!scope) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      scope.dataset.motionMode = "static";
      return;
    }

    const isSmall = () => window.matchMedia("(max-width: 700px)").matches;
    let revert: (() => void) | undefined;
    try {
      const ctx = gsap.context(() => {
      scope.dataset.motionMode = "cinematic";
      const entry = scope.querySelector<HTMLElement>("[data-cinematic-entry]");
      if (entry) {
        const entryTimeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: entry,
            start: "top top",
            end: () => isSmall() ? "+=125%" : "+=205%",
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => entry.style.setProperty("--scene-progress", self.progress.toFixed(3)),
          },
        });
        heroToIdentity(entryTimeline, isSmall());
      }

      const projectScene = scope.querySelector<HTMLElement>("[data-project-story]");
      const track = projectScene?.querySelector<HTMLElement>(".project-story__track");
      const cards = projectScene ? gsap.utils.toArray<HTMLElement>(".project-story__panel", projectScene) : [];
      if (projectScene && track && cards.length > 1) {
        const travel = () => Math.max(0, track.scrollWidth - projectScene.clientWidth);
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: projectScene,
            start: "top top",
            end: () => `+=${Math.max(projectScene.clientWidth * (isSmall() ? 1.7 : 2.25), travel())}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => projectScene.style.setProperty("--scene-progress", self.progress.toFixed(3)),
          },
        });
        const laptopTransition = projectScene.querySelector<HTMLElement>(".project-story__transition");
        if (laptopTransition) {
          timeline.fromTo(laptopTransition, { clipPath: "inset(16% 16% 16% 16%)", scale: 0.94, opacity: 0 }, { clipPath: "inset(0% round 2px)", scale: 1, opacity: 1, duration: 0.26, ease: "none" }, 0);
          timeline.to(laptopTransition, { clipPath: "inset(0 0 100% 0)", opacity: 0, duration: 0.3, ease: "none" }, 0.26);
        }
        timeline.to(track, { x: () => -travel(), duration: cards.length - 1, ease: "none" }, 0);
        cards.forEach((card, index) => projectFrameReveal(timeline, card, index));
        projectToNextScene(timeline, cards.length - 1 + 0.52);
      }
      }, scope);
      revert = () => ctx.revert();
    } catch {
      scope.dataset.motionMode = "static";
      ScrollTrigger.getAll().filter((trigger) => trigger.trigger instanceof Node && scope.contains(trigger.trigger)).forEach((trigger) => trigger.kill());
      return;
    }

    return () => {
      delete scope.dataset.motionMode;
      revert?.();
    };
  }, []);
}
