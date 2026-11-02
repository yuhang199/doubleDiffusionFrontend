import { notFound } from "next/navigation";
import ScrollReveal from "../../components/ScrollReveal";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import ReelPlayer from "../../components/ReelPlayer";
import { PROJECTS, categoryLabel } from "../../lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  const title = `${project.title} — Double Diffusion`;
  const image = project.reel.poster ?? "/videos/posters/pure-ai-reel.jpg";
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title,
      description: project.summary,
      url: `https://www.doublediffusion.co/work/${slug}`,
      images: [{ url: image, alt: project.title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
      images: [image],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="subpage">
      <SiteNav active="/work" />
      <main className="case-page">
        <ScrollReveal />
        <div className="case-inner">
          <a href="/work" className="case-back">
            ← All Work
          </a>

          <header className="reveal">
            <span className="case-eyebrow">{categoryLabel(project.category)}</span>
            <h1 className="case-title">{project.title}</h1>
            {project.summary && <p className="case-lead">{project.summary}</p>}
          </header>

          <div className="case-reel reveal">
            {/* The page title already names the reel, so no caption here */}
            <ReelPlayer reel={project.reel} label={null} />
          </div>

          {project.phases && (
            <section className="case-section">
              <div className="case-section-head reveal">
                <h2 className="case-section-title">How We Work</h2>
                {project.note && <span className="case-section-note">{project.note}</span>}
              </div>
              <div className="case-phases">
                {project.phases.map((phase, i) => (
                  <article key={phase.title} className={`case-phase reveal reveal-delay-${i + 1}`}>
                    <span className="case-phase-index">0{i + 1}</span>
                    <h3>{phase.title}</h3>
                    <p>{phase.text}</p>
                    <ul>
                      {phase.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          )}

          {project.steps && (
            <section className="case-section">
              <div className="case-section-head reveal">
                <h2 className="case-section-title">Workflow</h2>
              </div>
              <ol className="case-steps reveal">
                {project.steps.map((step) => (
                  <li key={step.title} className="case-step">
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section className="case-cta reveal">
            <h2>Planning a Production?</h2>
            <p>Talk to us about bringing AI/VFX into your next project.</p>
            <a href="mailto:creative@doublediffusion.co" className="contact-cta">creative@doublediffusion.co</a>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
