import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/content/projects";
import { GlassPanel } from "@/components/glass/glass-panel";
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params; const project = projects.find((item) => item.slug === slug); if (!project) notFound();
 return <main className="case-page"><header><Link className="case-brand" href="/">m<span>.</span></Link><Link className="case-back" href="/#work">← BACK TO WORK</Link></header><div className="case-visual"><span>FIGURE / {project.mark}</span><strong>{project.mark}</strong><span>{project.artLabel}</span></div><span className="section-kicker">PROJECT / {project.category}</span><h1>{project.title}<i>.</i></h1><p className="case-description">{project.description}</p><GlassPanel className="case-glass"><span>PROJECT NOTES</span><p>{project.detail}</p></GlassPanel><div className="case-foot"><span>STATUS: {project.status}</span><Link href="/#work">EXPLORE OTHER WORK ↗</Link></div></main>;
}
