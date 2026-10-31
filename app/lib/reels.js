// Reels shown in click-to-play windows across the site. A reel without a
// `src` renders as a "coming soon" placeholder until the file is added under
// /public/videos.
export const REELS = {
  // The homepage hero clips, cut together in carousel order (1080p H.264).
  pureAi: { title: "Pure AI", src: "/videos/pure-ai-reel.mp4", poster: "/videos/posters/pure-ai-reel.jpg" },
  hybrid: { title: "Hybrid Workflow", src: "/videos/hybrid-reel.mp4", poster: "/videos/posters/hybrid-reel-v2.jpg" },
  crackTheRoutine: { title: "Crack the Routine", src: "/videos/cola.mp4", poster: "/videos/posters/cola.jpg" },
  runOn: { title: "Run On", src: "/videos/jogging.mp4", poster: "/videos/posters/jogging.jpg" },
  tryNotToLook: { title: "Try Not to Look", src: "/videos/try-not-to-look.mp4", poster: "/videos/posters/try-not-to-look.jpg" },
};
