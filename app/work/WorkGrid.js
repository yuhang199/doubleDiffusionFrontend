import Image from "next/image";
import { PROJECTS, projectLabel } from "../lib/projects";

function WorkTile({ project, sizes }) {
  return (
    <a href={`/work/${project.slug}`} className="work-tile">
      <div className="work-tile-caption">
        <h2 className="work-tile-title">{project.title}</h2>
        <span className="work-tile-category">{projectLabel(project)}</span>
      </div>
      <div className="work-tile-media">
        {project.reel.poster ? (
          <Image
            src={project.reel.poster}
            alt=""
            className="work-tile-img"
            fill
            sizes={sizes}
          />
        ) : null}
      </div>
    </a>
  );
}

/**
 * The two reels side by side at the top, the other projects in a smaller
 * row underneath. Cards match the homepage reel windows: title and label
 * above a rounded poster.
 */
export default function WorkGrid() {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);
  return (
    <>
      <div className="work-grid work-grid--featured">
        {featured.map((p) => (
          <WorkTile key={p.slug} project={p} sizes="(max-width: 768px) 100vw, 50vw" />
        ))}
      </div>
      <div className="work-grid">
        {rest.map((p) => (
          <WorkTile key={p.slug} project={p} sizes="(max-width: 768px) 100vw, 33vw" />
        ))}
      </div>
    </>
  );
}
