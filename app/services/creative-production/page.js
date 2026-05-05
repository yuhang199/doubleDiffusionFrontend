import ScrollReveal from "../../components/ScrollReveal";

export const metadata = {
  title: "Creative Production — Double Diffusion",
  description: "End-to-end AI-powered ad production from concept to final cut.",
};

export default function CreativeProduction() {
  return (
    <main className="legal-page legal-page--has-hero">
      <ScrollReveal />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className="subpage-hero">
        <img className="subpage-hero-img" src="/images/gallery-reel-new-06.jpg" alt="" />
        <div className="subpage-hero-overlay" />
        <div className="subpage-hero-content">
          <a href="/" className="legal-back">← Back to Home</a>
          <h1 className="subpage-hero-title">Creative Production</h1>
          <p className="subpage-hero-sub">End-to-end AI-powered ad production</p>
        </div>
      </div>
      <div className="legal-inner">
        <section className="legal-section--card has-media reveal">
          <div className="card-with-media">
            <div className="card-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/gallery-reel-01.jpg" alt="Creative production reel" />
            </div>
            <div className="card-text">
              <h2>Overview</h2>
              <p>Our Creative Production service delivers high-converting video ads and visual content at unprecedented speed and cinematic quality. We combine AI-powered workflows with experienced creative direction to produce campaigns that move at the speed of culture.</p>
            </div>
          </div>
        </section>

        <section className="legal-section--card reveal reveal-delay-1">
          <h2>What We Deliver</h2>
          <ul>
            <li>Hero video ads (15s, 30s, 60s) for TV, streaming, and digital platforms</li>
            <li>Social-first video content optimized for Instagram, TikTok, YouTube, and Meta</li>
            <li>Product launch films and brand anthems</li>
            <li>Performance-driven direct response creatives</li>
            <li>Seasonal campaign packages with rapid turnaround</li>
          </ul>
        </section>

        <section className="legal-section--card has-media reveal reveal-delay-2">
          <div className="card-with-media card-with-media--reversed">
            <div className="card-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/work-01.png" alt="Creative production process" />
            </div>
            <div className="card-text">
              <h2>Our Process</h2>
              <p>Every project follows our proven four-phase pipeline:</p>
              <ul>
                <li><strong>Discover:</strong> Deep-dive into your brand, audience, and KPIs. We define the creative territory and identify where AI amplifies your vision.</li>
                <li><strong>Conceive:</strong> AI-assisted ideation generates hundreds of concepts, storyboards, and visual directions. Human creative directors curate and refine to the strongest options.</li>
                <li><strong>Produce:</strong> Our AI-powered pipeline generates cinematic visuals, motion graphics, and complete video sequences. Every frame is reviewed and polished by our production team.</li>
                <li><strong>Deliver:</strong> Final assets are optimized for every platform, encoded to spec, and delivered with full usage documentation.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="legal-section--card has-media reveal reveal-delay-3">
          <div className="card-with-media">
            <div className="card-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/gallery-reel-new-03.jpg" alt="Cinematic macro shot" />
            </div>
            <div className="card-text">
              <h2>Why AI-Powered?</h2>
              <p>Traditional production timelines of 8–12 weeks compress to days. Budgets that would cover a single hero spot now fund entire multi-platform campaigns. And quality doesn&apos;t suffer — it scales.</p>
            </div>
          </div>
        </section>

        <section className="legal-section--card reveal reveal-delay-4">
          <h2>Get Started</h2>
          <p>Ready to produce your next campaign? Contact us at <a href="mailto:creative@doublediffusion.co">creative@doublediffusion.co</a></p>
        </section>
      </div>
    </main>
  );
}
