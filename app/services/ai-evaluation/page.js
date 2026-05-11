import ScrollReveal from "../../components/ScrollReveal";

export const metadata = {
  title: "AI Evaluation — Double Diffusion",
  description: "AI-powered creative evaluation to identify cost-saving production opportunities before a single frame is shot.",
};

export default function AIEvaluation() {
  return (
    <main className="legal-page legal-page--has-hero">
      <ScrollReveal />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className="subpage-hero">
        <img className="subpage-hero-img" src="/images/upgrade-09.png" alt="" />
        <div className="subpage-hero-overlay" />
        <div className="subpage-hero-content">
          <a href="/" className="legal-back">← Back to Home</a>
          <h1 className="subpage-hero-title">AI Evaluation</h1>
          <p className="subpage-hero-sub">Know exactly where AI saves you money — before production begins</p>
        </div>
      </div>
      <div className="legal-inner">
        <section className="legal-section--card has-media reveal">
          <div className="card-with-media">
            <div className="card-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/upgrade-03.png" alt="AI Evaluation dashboard" />
            </div>
            <div className="card-text">
              <h2>Overview</h2>
              <p>Our AI Evaluation service analyzes your creative brief scene-by-scene, identifying exactly where AI-assisted production can replace traditional methods. You get a detailed cost breakdown, feasibility score, and an optimized production roadmap — all before a single frame is shot.</p>
            </div>
          </div>
        </section>

        <section className="legal-section--card has-media reveal reveal-delay-1">
          <div className="card-with-media card-with-media--reversed">
            <div className="card-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/upgrade-04.png" alt="AI evaluation deliverables" />
            </div>
            <div className="card-text">
              <h2>What You Get</h2>
              <ul>
                <li>Scene-by-scene AI feasibility analysis of your creative brief or storyboard</li>
                <li>Detailed cost comparison: traditional production vs. AI-hybrid pipeline</li>
                <li>Visual proof-of-concept renders for key scenes</li>
                <li>Optimized production roadmap with timeline estimates</li>
                <li>Clear recommendations on which scenes benefit most from AI workflows</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="legal-section--card has-media reveal reveal-delay-2">
          <div className="card-with-media">
            <div className="card-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/upgrade-05.png" alt="AI evaluation process" />
            </div>
            <div className="card-text">
              <h2>How It Works</h2>
              <ul>
                <li><strong>Submit:</strong> Share your creative brief, storyboard, or script. The more detail, the more precise our evaluation.</li>
                <li><strong>Analyze:</strong> Our AI pipeline processes every scene, evaluating visual complexity, motion requirements, and production feasibility for generative workflows.</li>
                <li><strong>Report:</strong> You receive a comprehensive evaluation report with cost projections, AI readiness scores, and a recommended hybrid production plan.</li>
                <li><strong>Decide:</strong> Move forward with full confidence — knowing exactly where every dollar goes and where AI delivers the biggest savings.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="legal-section--card has-media reveal reveal-delay-3">
          <div className="card-with-media card-with-media--reversed">
            <div className="card-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/upgrade-07.png" alt="AI production results" />
            </div>
            <div className="card-text">
              <h2>Why It Matters</h2>
              <p>Most studios guess at where AI fits into their pipeline. We quantify it. Our evaluations have helped clients cut production budgets by up to 80% — turning $80K campaigns into $15K projects without sacrificing cinematic quality.</p>
            </div>
          </div>
        </section>

        <section className="legal-section--card reveal reveal-delay-4">
          <h2>Get Started</h2>
          <p>Ready to evaluate your next project? Contact us at <a href="mailto:creative@doublediffusion.co">creative@doublediffusion.co</a></p>
        </section>
      </div>
    </main>
  );
}
