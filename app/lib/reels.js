// Reels shown in click-to-play windows across the site. A reel without a
// `src` renders as a "coming soon" placeholder until the file is added under
// /public/videos.
export const REELS = {
  // The homepage hero clips, cut together in carousel order (1080p H.264).
  pureAi: { title: "Pure AI", src: "/videos/pure-ai-reel.mp4", poster: "/videos/posters/pure-ai-reel.jpg" },
  hybrid: { title: "Hybrid Workflow", src: null, poster: "/images/upgrade-08.jpg" },
  cola: { title: "Cola", src: null, poster: null },
  jogging: { title: "Jogging", src: null, poster: null },
  worldCup: { title: "World Cup", src: null, poster: null },
};
