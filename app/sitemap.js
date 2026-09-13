const baseUrl = "https://www.doublediffusion.co";

// Every indexable route on the site. Keep this in sync when adding pages —
// anything missing here is absent from the sitemap Google is handed.
const routes = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/demo", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/creative-production", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/ai-evaluation", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/social-content", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/music-videos", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/narrative-production", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/support", changeFrequency: "monthly", priority: 0.5 },
  { path: "/compliance", changeFrequency: "yearly", priority: 0.4 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap() {
  const lastModified = new Date();

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
