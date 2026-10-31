import { execFileSync } from "node:child_process";
import { PROJECTS } from "./lib/projects";

const baseUrl = "https://www.doublediffusion.co";

// Every indexable route, with the source files whose content it renders.
// Keep this in sync when adding pages — anything missing here is absent from
// the sitemap Google is handed.
const routes = [
  {
    path: "",
    files: ["app/page.js", "app/HomeClient.js", "app/lib/services.js"],
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/work",
    files: ["app/work/page.js", "app/work/WorkGrid.js", "app/lib/projects.js"],
    changeFrequency: "weekly",
    priority: 0.9,
  },
  ...PROJECTS.map((p) => ({
    path: `/work/${p.slug}`,
    files: ["app/work/[slug]/page.js", "app/lib/projects.js", "app/lib/reels.js"],
    changeFrequency: "monthly",
    priority: 0.7,
  })),
  { path: "/about", files: ["app/about/page.js"], changeFrequency: "monthly", priority: 0.8 },
  { path: "/support", files: ["app/support/page.js"], changeFrequency: "monthly", priority: 0.5 },
  { path: "/compliance", files: ["app/compliance/page.js"], changeFrequency: "yearly", priority: 0.4 },
  { path: "/privacy", files: ["app/privacy/page.js"], changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", files: ["app/terms/page.js"], changeFrequency: "yearly", priority: 0.3 },
];

/**
 * Last commit date that touched any of `files`.
 *
 * Stamping every entry with the build time — which is what this file used to
 * do — tells Google all twelve pages changed on every deploy. Google learns to
 * distrust a lastmod like that and drops the signal entirely, so an absent
 * date is better than a wrong one: returns undefined if git history isn't
 * available (shallow clones, or a build from a tarball).
 */
function lastCommitDate(files) {
  let newest;
  for (const file of files) {
    try {
      const out = execFileSync(
        "git",
        ["log", "-1", "--format=%cI", "--", file],
        { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
      ).trim();
      if (!out) continue;
      const date = new Date(out);
      if (!Number.isNaN(date.valueOf()) && (!newest || date > newest)) newest = date;
    } catch {
      // git missing or not a repo — fall through and omit the date
    }
  }
  return newest;
}

export default function sitemap() {
  return routes.map(({ path, files, changeFrequency, priority }) => {
    const lastModified = lastCommitDate(files);
    return {
      url: `${baseUrl}${path}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency,
      priority,
    };
  });
}
