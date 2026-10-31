"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CATEGORIES, PROJECTS, categoryLabel } from "../lib/projects";

const TABS = [{ id: "all", label: "All" }, ...CATEGORIES];

/**
 * Filter tabs plus a full-bleed two-column grid of project tiles.
 *
 * The active filter lives in `?type=` so a filtered view can be linked to,
 * but it is read on the client so /work itself stays statically rendered.
 */
export default function WorkGrid() {
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const type = new URLSearchParams(window.location.search).get("type");
    if (type && TABS.some((t) => t.id === type)) setFilter(type);
  }, []);

  const choose = (id) => {
    setFilter(id);
    const url = id === "all" ? "/work" : `/work?type=${id}`;
    window.history.replaceState(null, "", url);
  };

  const shown = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <>
      <div className="work-tabs" role="tablist" aria-label="Filter work">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={filter === t.id}
            className={`work-tab${filter === t.id ? " work-tab--active" : ""}`}
            onClick={() => choose(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="work-grid">
        {shown.map((p) => (
          <a key={p.slug} href={`/work/${p.slug}`} className="work-tile">
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
            <div className="work-tile-caption">
              <h2 className="work-tile-title">{p.title}</h2>
              <span className="work-tile-category">{categoryLabel(p.category)}</span>
              {!p.reel.src && <span className="work-tile-soon">Coming soon</span>}
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
