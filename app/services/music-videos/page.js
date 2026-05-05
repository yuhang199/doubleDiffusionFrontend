import ScrollReveal from "../../components/ScrollReveal";

export const metadata = {
  title: "Music Videos — Double Diffusion",
  description: "AI-powered music video production at cinematic quality.",
};

export default function MusicVideos() {
  return (
    <main className="legal-page legal-page--has-hero">
      <ScrollReveal />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className="subpage-hero">
        <img className="subpage-hero-img" src="/images/gallery-reel-new-05-b.jpg" alt="" />
        <div className="subpage-hero-overlay" />
        <div className="subpage-hero-content">
          <a href="/" className="legal-back">← Back to Home</a>
          <h1 className="subpage-hero-title">Music Videos</h1>
          <p className="subpage-hero-sub">Cinematic music video production powered by AI</p>
        </div>
      </div>
      <div className="legal-inner">
        <section className="legal-section--card has-media reveal">
          <div className="card-with-media">
            <div className="card-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/work-05.png" alt="Music video visual" />
            </div>
            <div className="card-text">
              <h2>Overview</h2>
              <p>Visually stunning music videos produced with AI-native workflows. We bring together cinematic storytelling, cutting-edge generative AI, and professional post-production to deliver music videos that rival major label productions — at a fraction of the timeline and cost.</p>
            </div>
          </div>
        </section>

        <section className="legal-section--card reveal reveal-delay-1">
          <h2>What We Deliver</h2>
          <ul>
            <li>Full music video production from concept to final master</li>
            <li>AI-generated visual worlds, environments, and effects</li>
            <li>Hybrid live-action + AI production options</li>
            <li>Lyric videos and visualizers</li>
            <li>Platform-specific cuts for YouTube, social, and streaming</li>
          </ul>
        </section>

        <section className="legal-section--card has-media reveal reveal-delay-2">
          <div className="card-with-media card-with-media--reversed">
            <div className="card-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/work-03.png" alt="Music video narrative" />
            </div>
            <div className="card-text">
              <h2>Our Process</h2>
              <p>Every music video follows our collaborative pipeline:</p>
              <ul>
                <li><strong>Listen:</strong> We immerse ourselves in the track, mood, and artistic vision.</li>
                <li><strong>Conceive:</strong> AI-assisted visual development generates concepts, mood boards, and storyboards tailored to the music.</li>
                <li><strong>Produce:</strong> Our AI-native pipeline creates cinematic visuals, motion sequences, and complete scenes — reviewed and refined by our creative team.</li>
                <li><strong>Deliver:</strong> Final color grade, sound sync, and platform-optimized exports ready for release.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="legal-section--card reveal reveal-delay-3">
          <h2>Get Started</h2>
          <p>Ready to create your next music video? Contact us at <a href="mailto:creative@doublediffusion.co">creative@doublediffusion.co</a></p>
        </section>
      </div>
    </main>
  );
}
