import { ArrowUpRight } from "lucide-react";
import { CinematicExperience } from "@/components/scenes/cinematic-experience";
import { TechnicalUniverse } from "@/components/scenes/technical-universe";
import { CinematicMedia } from "@/components/media/cinematic-media";
import { GlassPanel } from "@/components/glass/glass-panel";
import { characterRegistry } from "@/data/assets";
import { profile } from "@/data/profile";

function Journey() {
  return <section className="journey" id="journey"><div className="journey-head"><span className="section-kicker">05 / THE JOURNEY SO FAR</span><h2>Early chapters.<br/><em>Open ending.</em></h2></div><div className="journey-layout"><div className="journey-track"><article><span className="journey-date">LEARNING</span><span className="journey-dot"/><div><h3>{profile.education.program}</h3><p>{profile.education.institution}</p><small>Learning the fundamentals; putting them to work.</small></div></article>{profile.experience.map((experience) => <article key={experience.organization}><span className="journey-date">TEAM</span><span className="journey-dot"/><div><h3>{experience.organization}</h3><p>{experience.role}</p><small>{experience.details}</small></div></article>)}</div><div className="journey-images"><CinematicMedia portraitRole="master" className="journey-master" placeholderLabel="MASTER PORTRAIT"/><CinematicMedia portraitRole="studio" className="journey-portrait" placeholderLabel="STUDIO PORTRAIT"/><span>LEARNING / BUILDING / REFINING</span></div></div><p className="journey-note">This timeline is intentionally brief. More detail will be added as it is verified.</p></section>;
}

function Finale() {
  const contactLinks = [
    profile.contact.email && { label: "Email Mukesh", href: `mailto:${profile.contact.email}` },
    profile.contact.linkedIn && { label: "LinkedIn", href: profile.contact.linkedIn },
    profile.contact.github && { label: "GitHub", href: profile.contact.github },
    profile.contact.resume && { label: "Resume", href: profile.contact.resume },
  ].filter((link): link is { label: string; href: string } => Boolean(link));
  return <section className="finale" id="contact"><span className="section-kicker">07 / YOUR TURN</span><div className="finale-composition"><CinematicMedia portraitRole="rooftop" className="finale-rooftop" placeholderLabel="ROOFTOP PORTRAIT"/><CinematicMedia asset={characterRegistry.motion.rearWalkingExit ?? characterRegistry.poses.rearWalking} fallbackAsset={characterRegistry.poses.rearWalking} playOnVisible className="finale-character" placeholderLabel="REAR CHARACTER POSE"/><p className="finale-note">Have a good question, an ambitious idea,<br/>or simply want to compare notes?</p><h2 className="finale-link" aria-label="LET&apos;S TALK."><span>LET&apos;S<br/><em>TALK</em><i>.</i></span><ArrowUpRight size={38}/></h2>{contactLinks.length > 0 && <GlassPanel className="finale-contact"><nav aria-label="Contact links">{contactLinks.map((link) => <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>{link.label} <ArrowUpRight size={16}/></a>)}</nav></GlassPanel>}<div className="finale-mark">M<span>.</span></div></div><div className="footer-line"><span>© 2026 MUKESH / MADE WITH INTENTION</span>{contactLinks.length > 0 && <nav aria-label="Footer links">{contactLinks.map((link) => <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>{link.label}</a>)}</nav>}</div></section>;
}

export default function Home() {
  return <main>
    <CinematicExperience/>
    <TechnicalUniverse/>
    <Journey/>
    <section className="beyond"><div className="beyond-top"><span className="section-kicker">06 / BEYOND THE TERMINAL</span><span>THERE&apos;S MORE TO MAKING</span></div><div className="beyond-composition"><span className="beyond-number">06</span><h2>Make room<br/>for <em>the unexpected.</em></h2><div className="beyond-orb" aria-hidden="true"><div/><div/><div/><span>✳</span></div><p>AI. Software. Entrepreneurship. Mathematics teaching.<br/>Design, and the useful detours that become the work.</p></div></section>
    <Finale/>
    <div className="page-index">EXPERIENCE 01 / 07</div>
  </main>;
}
