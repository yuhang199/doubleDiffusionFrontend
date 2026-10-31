import { REELS } from "./reels";

// Work categories, in the order the /work filter tabs show them.
export const CATEGORIES = [
  { id: "pure-ai", label: "Pure AI" },
  { id: "hybrid", label: "Hybrid" },
];

// Portfolio shown on /work, each with a detail page at /work/[slug].
// `phases` and `steps` are optional sections on the detail page.
export const PROJECTS = [
  {
    slug: "example-work-case",
    title: "Example Work Case",
    category: "hybrid",
    reel: REELS.hybrid,
    summary:
      "A real professional commercial project, from pre-production through post-production, showing how we bring AI and VFX into a production while meeting industry standards.",
    note: "Full case breakdown coming soon",
    phases: [
      {
        title: "Pre-production",
        text: "Our VFX supervisor works with the producer and director from day one to lay the groundwork for visual effects, generation, background replacement, and performance enhancement.",
        points: [
          "Shot-by-shot AI/VFX analysis",
          "Storyboard previsualization",
          "Location scouting for model compatibility",
          "Tracking markers for key props and actors",
          "AI/VFX tests with the director and DP",
        ],
      },
      {
        title: "Production",
        text: "Our AI/VFX team is on set alongside the director and 1st AD, confirming every shot is captured the way post-production needs it.",
        points: [
          "Shot compatibility checks in real time",
          "On-set rendering fed to the monitors",
          "Fast assessment of creative changes",
          "Schedule guidance for the 1st AD",
        ],
      },
      {
        title: "Post-production",
        text: "We work with the editor, then take over once the edit is locked, delivering visuals ready for broadcast, theatrical, and online distribution.",
        points: [
          "Editorial support",
          "Shot extension, trimming, and new shots",
          "Photoreal AI/VFX compositing",
          "Delivery to professional specs",
        ],
      },
    ],
  },
  {
    slug: "pure-ai-reel",
    title: "Pure AI Reel",
    category: "pure-ai",
    reel: REELS.pureAi,
    summary:
      "Pure AI workflows are recommended for productions with little to no acting. They follow the same process as a physical production.",
    steps: [
      { title: "Script", text: "Story and structure, written for the screen." },
      { title: "Storyboard", text: "Every shot planned before anything is generated." },
      { title: "Shooting", text: "Visual generation, shot by shot, on our in-house models." },
      { title: "Editing", text: "Cut, paced, and refined like any production." },
      { title: "Color & Sound", text: "Final grade and audio to professional specs." },
    ],
  },
  {
    slug: "cola",
    title: "Cola",
    category: "pure-ai",
    reel: REELS.cola,
    summary: "A pure AI spot.",
  },
  {
    slug: "jogging",
    title: "Jogging",
    category: "pure-ai",
    reel: REELS.jogging,
    summary: "A pure AI spot.",
  },
  {
    slug: "world-cup",
    title: "World Cup",
    category: "pure-ai",
    reel: REELS.worldCup,
    summary: "A pure AI spot.",
  },
];

export function categoryLabel(id) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
