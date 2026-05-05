import ScrollReveal from "../../components/ScrollReveal";

export const metadata = {
  title: "Social Content — Double Diffusion",
  description: "AI-powered social media content and vertical video production.",
};

export default function SocialContent() {
  return (
    <main className="legal-page legal-page--has-hero">
      <ScrollReveal />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className="subpage-hero">
        <img className="subpage-hero-img" src="/images/work-02.png" alt="" />
        <div className="subpage-hero-overlay" />
        <div className="subpage-hero-content">
          <a href="/" className="legal-back">← Back to Home</a>
          <h1 className="subpage-hero-title">Social Content</h1>
          <p className="subpage-hero-sub">AI-powered social media &amp; vertical video</p>
        </div>
      </div>
      <div className="legal-inner">
        <section className="legal-section--card has-media reveal">
          <div className="card-with-media">
            <div className="card-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/gallery-reel-new-02.jpg" alt="Social content fashion shoot" />
            </div>
            <div className="card-text">
              <h2>Overview</h2>
              <p>Scroll-stopping vertical video and social-first content designed for the platforms your audience lives on. We combine AI-powered production with deep platform knowledge to create content that performs — Instagram Reels, TikTok, YouTube Shorts, and beyond.</p>
            </div>
          </div>
        </section>

        <section className="legal-section--card reveal reveal-delay-1">
          <h2>What We Deliver</h2>
          <ul>
            <li>UGC-style video content with AI-generated visuals</li>
            <li>Vertical-first product demos and unboxings</li>
            <li>Platform-optimized ad creatives (9:16, 1:1, 4:5)</li>
            <li>Social campaign packages with rapid turnaround</li>
            <li>Trend-responsive content produced in days, not weeks</li>
          </ul>
        </section>

        <section className="legal-section--card has-media reveal reveal-delay-2">
          <div className="card-with-media card-with-media--reversed">
            <div className="card-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/gallery-reel-04-b.jpg" alt="Social content production" />
            </div>
            <div className="card-text">
              <h2>Why AI-Powered?</h2>
              <p>Social moves fast. Traditional production can&apos;t keep up with the volume and velocity platforms demand. Our AI-powered pipeline lets you produce dozens of high-quality social assets in the time it takes to shoot one — without sacrificing the cinematic quality your brand deserves.</p>
            </div>
          </div>
        </section>

        <section className="legal-section--card reveal reveal-delay-3">
          <h2>Get Started</h2>
          <p>Ready to scale your social content? Contact us at <a href="mailto:creative@doublediffusion.co">creative@doublediffusion.co</a></p>
        </section>
      </div>
    </main>
  );
}
