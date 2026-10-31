import { REELS } from "./reels";

// Work categories, in the order the /work filter tabs show them.
export const CATEGORIES = [
  { id: "pure-ai", label: "Pure AI" },
  { id: "hybrid", label: "Hybrid" },
];

// The pure AI workflow, shown under every pure AI reel.
const PURE_AI_STEPS = [
  { title: "Script", text: "Story and structure, written for the screen." },
  { title: "Storyboard", text: "Every shot planned before anything is generated." },
  { title: "Shooting", text: "Visual generation, shot by shot, on our in-house models." },
  { title: "Editing", text: "Cut, paced, and refined like any production." },
  { title: "Color & Sound", text: "Final grade and audio to professional specs." },
];

// Portfolio shown on /work, each with a detail page at /work/[slug].
// `phases` and `steps` are optional sections on the detail page.
export const PROJECTS = [
  {
    slug: "berry-law-firm-commercial",
    title: "Berry Law Firm Commercial",
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
    steps: PURE_AI_STEPS,
  },
  {
    slug: "crack-the-routine",
    title: "Crack the Routine",
    category: "pure-ai",
    reel: REELS.crackTheRoutine,
    steps: PURE_AI_STEPS,
  },
  {
    slug: "run-on",
    title: "Run On",
    category: "pure-ai",
    reel: REELS.runOn,
    steps: PURE_AI_STEPS,
  },
  {
    slug: "try-not-to-look",
    title: "Try Not to Look",
    category: "pure-ai",
    reel: REELS.tryNotToLook,
    steps: PURE_AI_STEPS,
  },
];

export function categoryLabel(id) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
