"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Laptop, Menu, Moon, Sun, X } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useTheme } from "@/components/theme-provider";
import { GlassPanel } from "@/components/glass/glass-panel";
import { CinematicMedia } from "@/components/media/cinematic-media";
import { ProjectShowcaseMedia } from "@/components/media/project-showcase-media";
import { projects } from "@/content/projects";
import { characterRegistry, portraitRegistry } from "@/data/assets";
import { profile } from "@/data/profile";
import { useCinematicSceneController } from "@/animation/controllers/use-cinematic-scene-controller";

const introCharacter = characterRegistry.motion.walkingEntrance ?? characterRegistry.poses.sideWalking;
const introIsVideo = introCharacter.kind === "video";

function ProjectStory() {
  return <section className="project-story" id="work" data-project-story aria-label="Project exploration">
    <div className="project-story__header"><span>03 — PROJECTS / IN PROGRESS</span><span>SCROLL TO EXPLORE ↘</span></div>
    {characterRegistry.motion.laptopTransition && <CinematicMedia asset={characterRegistry.motion.laptopTransition} playOnVisible className="project-story__transition" placeholderLabel="LAPTOP SCREEN TRANSITION"/>}
    <div className="project-story__viewport"><div className="project-story__track">
      {projects.slice(0, 3).map((project, index) => <article className={`project-story__panel project-story__panel--${index + 1}`} key={project.slug}>
        <ProjectShowcaseMedia project={project} index={index} />
        <div className="project-story__copy">
          <span className="project-story__index">0{index + 1} / 03 · {project.status}</span>
          <h2 className="project-story__title">{project.title}<i>.</i></h2>
          <div className="project-story__details"><p>{project.description}</p><div className="project-story__meta"><span>{project.year}</span><Link href={`/projects/${project.slug}`} aria-label={`Open ${project.title} case study`}>CASE STUDY <ArrowUpRight size={17}/></Link></div></div>
        </div>
      </article>)}
    </div></div>
    <div className="project-story__wipe" aria-hidden="true"/>
  </section>;
}

export function CinematicExperience() {
  const controllerRoot = useRef<HTMLDivElement>(null);
  const introTimeline = useRef<GSAPTimeline | null>(null);
  const introSafetyTimer = useRef<number | null>(null);
  const [introVisible, setIntroVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeReady, setThemeReady] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  useCinematicSceneController();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setThemeReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useLayoutEffect(() => {
    const scope = controllerRoot.current;
    if (!scope) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try { seen = sessionStorage.getItem("mukesh-intro-seen") === "1"; } catch { seen = false; }
    if (reduced || seen) {
      const frame = requestAnimationFrame(() => setIntroVisible(false));
      return () => cancelAnimationFrame(frame);
    }

    const close = () => {
      if (introSafetyTimer.current) window.clearTimeout(introSafetyTimer.current);
      introSafetyTimer.current = null;
      gsap.set(".dock-wrap", { clearProps: "opacity,transform" });
      try { sessionStorage.setItem("mukesh-intro-seen", "1"); } catch { /* The intro remains skippable without storage. */ }
      delete scope.dataset.introActive;
      setIntroVisible(false);
    };
    scope.dataset.introActive = "true";
    introSafetyTimer.current = window.setTimeout(() => { introTimeline.current?.kill(); close(); }, 4200);
    try {
      const context = gsap.context(() => {
        const timeline = gsap.timeline({ onComplete: close });
        introTimeline.current = timeline;
        timeline.fromTo(".intro-mark", { scale: 0.72, opacity: 0, rotate: -12 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.52, ease: "power3.out" });
        if (introCharacter.kind === "video") {
          timeline.fromTo(".intro-side-character", { xPercent: 3, opacity: 0, scale: 0.99 }, { xPercent: 0, opacity: 1, scale: 1, duration: 0.48, ease: "power3.out" }, "-=0.12")
            .fromTo(".intro-word", { yPercent: 120, rotateX: -22 }, { yPercent: 0, rotateX: 0, duration: 0.68, stagger: 0.035, ease: "power4.out" }, "-=0.18")
            .fromTo(".dock-wrap", { y: -14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, ease: "power2.out" }, ">-.08")
            .to(".intro-screen", { clipPath: "inset(0 0 100% 0)", duration: 0.56, ease: "power4.inOut" }, ">-.06");
        } else {
          timeline.fromTo(".intro-side-character", { xPercent: 24, opacity: 0, scale: 0.96 }, { xPercent: 0, opacity: 1, scale: 1, duration: 0.62, ease: "power3.out" }, "-=0.12")
            .fromTo(".intro-word", { yPercent: 120, rotateX: -22 }, { yPercent: 0, rotateX: 0, duration: 0.68, stagger: 0.035, ease: "power4.out" }, "-=0.22")
            .to(".intro-side-character", { opacity: 0, duration: 0.14, ease: "power2.in" }, ">-.16")
            .fromTo(".intro-three-quarter", { xPercent: -3, opacity: 0, scale: 0.985 }, { xPercent: 0, opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" }, ">+=0.025")
            .fromTo(".dock-wrap", { y: -14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, ease: "power2.out" }, ">-.08")
            .to(".intro-screen", { clipPath: "inset(0 0 100% 0)", duration: 0.56, ease: "power4.inOut" }, ">-.06");
        }
      }, scope);
      return () => { if (introSafetyTimer.current) window.clearTimeout(introSafetyTimer.current); introSafetyTimer.current = null; context.revert(); introTimeline.current = null; };
    } catch {
      if (introSafetyTimer.current) window.clearTimeout(introSafetyTimer.current);
      introSafetyTimer.current = null;
      delete scope.dataset.introActive;
      close();
    }
    return () => { if (introSafetyTimer.current) window.clearTimeout(introSafetyTimer.current); introSafetyTimer.current = null; };
  }, []);

  const skipIntro = () => {
    introTimeline.current?.kill();
    introTimeline.current = null;
    gsap.set(".dock-wrap", { clearProps: "opacity,transform" });
    if (introSafetyTimer.current) window.clearTimeout(introSafetyTimer.current);
    introSafetyTimer.current = null;
    try { sessionStorage.setItem("mukesh-intro-seen", "1"); } catch { /* Skip remains functional when storage is unavailable. */ }
    if (controllerRoot.current) delete controllerRoot.current.dataset.introActive;
    setIntroVisible(false);
  };
  const cycleTheme = () => setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light");
  return <div ref={controllerRoot} className="cinematic-experience" data-cinematic-root="">
    {introVisible && <div className="intro-screen" role="region" aria-label="Mukesh portfolio introduction"><div className="intro-grain"/><div className="intro-mark" aria-hidden="true">M<span>.</span></div><CinematicMedia asset={introCharacter} fallbackAsset={characterRegistry.poses.sideWalking} className={`intro-pose intro-side-character${introIsVideo ? " intro-video" : ""}`} priority placeholderLabel="ENTRANCE CHARACTER POSE"/>{!introIsVideo && <CinematicMedia asset={characterRegistry.poses.threeQuarter} className="intro-pose intro-three-quarter" placeholderLabel="THREE-QUARTER CHARACTER POSE"/>}<div className="intro-title">{"MUKESH".split("").map((letter, index) => <span className="intro-word" key={`${letter}-${index}`}>{letter}</span>)}</div><button className="intro-skip" onClick={skipIntro} type="button">Skip introduction <ArrowUpRight size={14}/></button></div>}
    <nav className="dock-wrap" aria-label="Main navigation"><GlassPanel className="dock"><Link href="#top" className="dock-brand" aria-label="Mukesh home">m<span>.</span></Link><div className={`dock-links ${menuOpen ? "open" : ""}`}><a href="#work" onClick={() => setMenuOpen(false)}>Work</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#journey" onClick={() => setMenuOpen(false)}>Journey</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></div><div className="dock-actions"><button className="icon-button" onClick={cycleTheme} title="Cycle light, dark, and system themes" aria-label="Change color theme" type="button">{!themeReady || theme === "system" ? <Laptop size={16}/> : resolvedTheme === "dark" ? <Moon size={16}/> : <Sun size={16}/>}<span className="theme-label">{themeReady ? theme : "system"}</span></button><a className="availability" href="#contact"><i/> Available for a conversation</a><button className="mobile-menu icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} type="button">{menuOpen ? <X size={18}/> : <Menu size={18}/>}</button></div></GlassPanel></nav>

    <div className="entry-scene" data-cinematic-entry>
      <section className="entry-hero entry-backdrop" id="top" aria-labelledby="hero-title">
        <div className="entry-grid" aria-hidden="true"/>
        <div className="entry-meta"><span>PORTFOLIO — 2026</span><span>COIMBATORE, INDIA <i className="live-dot"/></span></div>
        <div className="entry-copy"><p className="eyebrow">SOFTWARE DEVELOPER · PRODUCT BUILDER</p><h1 className="entry-title" id="hero-title">{profile.name.toUpperCase()}<span>.</span></h1><p className="entry-deck">Building thoughtful software<br/>for a world that moves forward.</p><p className="entry-caption">{profile.education.program}<br/>{profile.education.institution}<br/>{profile.experience[0]?.organization} / {profile.experience[0]?.role}</p></div>
        <CinematicMedia portraitRole="architectural" className="entry-portrait" priority placeholderLabel="ARCHITECTURAL HERO"/>
        <CinematicMedia asset={characterRegistry.poses.front} className="entry-character" priority placeholderLabel="FRONT CHARACTER POSE"/>
        <div className="entry-portrait-label">01 / CHARACTER STUDY</div>
        <div className="entry-footer"><a href="#work" className="scroll-cue"><span className="scroll-icon"><ArrowDown size={15}/></span><span>SCROLL TO ENTER</span></a><p>Curiosity, made tangible.</p><span>01—03</span></div>
        <div className="entry-side">INDEPENDENTLY INQUISITIVE <span>✳</span> INTENTIONALLY BUILT</div>
      </section>
      <section className="entry-identity identity-curtain" id="about" aria-labelledby="identity-title">
        <div className="identity-top"><span>02 — A FEW WAYS TO DESCRIBE IT</span><span>SCROLL TO TRANSFORM</span></div>
        <div className="identity-composition"><div className="identity-orbit" aria-hidden="true"><div/><div/><div/><span>02</span></div>
          <div className="identity-copy"><span className="section-kicker">SOFTWARE · DESIGN · APPLIED AI</span><h2 className="identity-title" id="identity-title">I MAKE<br/><em>THINGS</em><br/>MOVE<span>.</span></h2><p className="identity-lede">{profile.biography}</p></div>
          <CinematicMedia asset={characterRegistry.motion.headTurn ?? undefined} portraitRole="studio" fallbackAsset={portraitRegistry.studio.media} playOnVisible className="identity-portrait" placeholderLabel="STUDIO INTRODUCTION"/>
          <div className="identity-roles"><p className="identity-role"><b>01</b><span>Developer</span><small>Systems with a human side.</small></p><p className="identity-role"><b>02</b><span>Creator</span><small>Ideas shaped into experiences.</small></p><p className="identity-role"><b>03</b><span>Product builder</span><small>Useful things, made with intent.</small></p></div>
        </div>
        <div className="identity-footer"><span>ALWAYS IN PROGRESS</span><span>SCENE 02 / IDENTITY</span></div>
      </section>
    </div>
    <ProjectStory/>
  </div>;
}
