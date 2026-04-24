export const metadata = {
  title: "Ad Testing & Optimization — Double Diffusion",
  description: "A/B test creative variants at scale with data-driven iteration.",
};

export default function AdTesting() {
  return (
    <main className="legal-page">
      <div className="legal-inner">
        <a href="/" className="legal-back">← Back to Home</a>
        <h1 className="legal-title">Ad Testing & Optimization</h1>
        <p className="legal-date">Data-driven creative performance</p>

        <section className="legal-section">
          <h2>Overview</h2>
          <p>Great creative is only great if it converts. Our Ad Testing & Optimization service pairs AI-generated creative variants with systematic A/B testing methodology to find your highest-performing ads faster than traditional approaches allow.</p>
        </section>

        <section className="legal-section">
          <h2>How It Works</h2>
          <ul>
            <li><strong>Variant Generation:</strong> We produce dozens of creative variants with different hooks, visuals, CTAs, and messaging frameworks</li>
            <li><strong>Structured Testing:</strong> Variants are deployed in controlled A/B and multivariate test configurations across your ad platforms</li>
            <li><strong>Performance Analysis:</strong> We analyze results across CTR, CVR, CPA, ROAS, and custom KPIs to identify winning patterns</li>
            <li><strong>Iterative Refinement:</strong> Top performers are used as seeds for the next generation of variants — each cycle improves on the last</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>What Makes This Different</h2>
          <p>Traditional creative testing is limited by production capacity — you can only test as many variants as you can afford to produce. Our AI pipeline removes that constraint entirely. Test 50 variants instead of 5. Find your winner in days instead of months.</p>
        </section>

        <section className="legal-section">
          <h2>Reporting</h2>
          <p>Every test cycle includes a comprehensive performance report with actionable insights: which visual styles resonate, which hooks drive clicks, which messaging converts — quantified and ready for your next campaign brief.</p>
        </section>

        <section className="legal-section">
          <h2>Get Started</h2>
          <p>Optimize your creative performance at <a href="mailto:creative@doublediffusion.co">creative@doublediffusion.co</a></p>
        </section>
      </div>
    </main>
  );
}
