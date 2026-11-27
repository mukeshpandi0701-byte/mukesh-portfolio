import Image from "next/image";
import type { Project } from "@/content/projects";

type Props = { project: Project; index: number };

/** Renders verified supplied product media; keeps an explicitly labeled art direction placeholder otherwise. */
export function ProjectShowcaseMedia({ project, index }: Props) {
  const media = project.media;
  return <div className={`project-story__frame project-art art-${index + 1}${media ? " project-story__frame--media" : ""}`}>
    {media ? <div className="project-showcase-device" data-has-desktop={Boolean(media.desktopScreenshot)} data-has-mobile={Boolean(media.mobileScreenshot)}>
      {media.desktopScreenshot && <Image className="project-showcase-image project-showcase-image--desktop" src={media.desktopScreenshot} alt={media.alt} fill sizes="(max-width: 700px) 90vw, 55vw" />}
      {media.mobileScreenshot && <Image className="project-showcase-image project-showcase-image--mobile" src={media.mobileScreenshot} alt={`${media.alt} on mobile`} fill sizes="(max-width: 700px) 82vw, 28vw" />}
      {media.videoDemo && <video className="project-showcase-video" controls playsInline preload="metadata" poster={media.videoDemo.poster} aria-label={`${project.title} product demonstration`}><source src={media.videoDemo.src} /></video>}
    </div> : <>
      <div className="art-noise"/><div className="art-orbit orbit-a"/><div className="art-orbit orbit-b"/>
      <span className="project-story__placeholder">VISUAL PLACEHOLDER / NO PRODUCT IMAGE</span>
      <span className="project-story__mark">{project.mark}</span>
      <span className="project-story__figure">FIG. 0{index + 1} / {project.category}</span>
    </>}
  </div>;
}
