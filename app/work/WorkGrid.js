import Image from "next/image";
import { PROJECTS, categoryLabel } from "../lib/projects";

/**
 * Every project in one grid. Each card matches the homepage reel windows:
 * title and category above a rounded poster.
 */
export default function WorkGrid() {
  return (
    <div className="work-grid">
      {PROJECTS.map((p) => (
        <a key={p.slug} href={`/work/${p.slug}`} className="work-tile">
          <div className="work-tile-caption">
            <h2 className="work-tile-title">{p.title}</h2>
            <span className="work-tile-category">{categoryLabel(p.category)}</span>
          </div>
          <div className="work-tile-media">
            {p.reel.poster ? (
              <Image
                src={p.reel.poster}
                alt=""
                className="work-tile-img"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : null}
          </div>
        </a>
      ))}
    </div>
  );
}
