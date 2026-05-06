import ScrollReveal from "../../components/ScrollReveal";

export const metadata = {
  title: "Narrative Production — Double Diffusion",
  description: "Hybrid live-action and AI production for films and branded narratives.",
};

export default function NarrativeProduction() {
  return (
    <main className="legal-page legal-page--has-hero">
      <ScrollReveal />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className="subpage-hero">
        <img className="subpage-hero-img" src="/images/upgrade-12.png" alt="" />
        <div className="subpage-hero-overlay" />
        <div className="subpage-hero-content">
          <a href="/" className="legal-back">← Back to Home</a>
          <h1 className="subpage-hero-title">Narrative Production</h1>
          <p className="subpage-hero-sub">Where traditional filmmaking meets AI</p>
        </div>
      </div>
      <div className="legal-inner">
        <section className="legal-section--card has-media reveal">
          <div className="card-with-media">
            <div className="card-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/upgrade-03.png" alt="Narrative production fieldwork" />
            </div>
            <div className="card-text">
              <h2>Overview</h2>
              <p>Not every project is fully synthetic — and it shouldn&apos;t be. Our Narrative Production service brings AI capabilities into traditional live-action filmmaking. We serve as technical partners and creative consultants for productions that want to leverage generative AI without abandoning the craft of real cinematography.</p>
            </div>
          </div>
        </section>

        <section className="legal-section--card reveal reveal-delay-1">
          <h2>Services</h2>
          <ul>
            <li><strong>AI-Enhanced Post-Production:</strong> Environment extension, set augmentation, sky replacement, crowd generation, and visual effects powered by AI</li>
            <li><strong>Pre-Visualization:</strong> AI-generated storyboards, animatics, and concept art that let you see the film before you shoot it</li>
            <li><strong>Technical Consulting:</strong> On-set AI supervision, pipeline integration, and workflow optimization for productions incorporating AI tools</li>
            <li><strong>Hybrid Workflows:</strong> Seamless blending of live-action footage with AI-generated elements for a cohesive final product</li>
            <li><strong>Digital Double Creation:</strong> AI-generated doubles of real talent for pickup shots, alternative takes, and multi-market versioning</li>
          </ul>
        </section>

        <section className="legal-section--card has-media reveal reveal-delay-2">
          <div className="card-with-media card-with-media--reversed">
            <div className="card-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/upgrade-04.png" alt="Cinematic cyclist silhouette" />
            </div>
            <div className="card-text">
              <h2>Who This Is For</h2>
              <ul>
                <li>Production companies exploring AI integration in their pipeline</li>
                <li>Brands that require live-action hero content enhanced with AI capabilities</li>
                <li>Directors and DPs who want to push creative boundaries with generative tools</li>
                <li>Post-production houses seeking AI workflow consultation</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="legal-section--card has-media reveal reveal-delay-3">
          <div className="card-with-media">
            <div className="card-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/gallery-reel-new-05.jpg" alt="Cinematic landscape" />
            </div>
            <div className="card-text">
              <h2>Our Approach</h2>
              <p>We believe AI should enhance the filmmaker&apos;s vision, not replace it. Our team includes experienced cinematographers and VFX supervisors who understand both the art and the technology. We speak both languages — and we bridge them for productions that want the best of both worlds.</p>
            </div>
          </div>
        </section>

        <section className="legal-section--card reveal reveal-delay-4">
          <h2>Get Started</h2>
          <p>Discuss your production at <a href="mailto:partnerships@doublediffusion.co">partnerships@doublediffusion.co</a></p>
        </section>
      </div>
    </main>
  );
}
