export const metadata = {
  title: "AI Brand Assets — Double Diffusion",
  description: "Custom-trained visual style models exclusive to your brand.",
};

export default function AIBrandAssets() {
  return (
    <main className="legal-page">
      <div className="legal-inner">
        <a href="/" className="legal-back">← Back to Home</a>
        <h1 className="legal-title">AI Brand Assets</h1>
        <p className="legal-date">Custom-trained visual style models for your brand</p>

        <section className="legal-section">
          <h2>Overview</h2>
          <p>We build private, fine-tuned AI models that encode your brand&apos;s visual DNA — color palettes, typography treatments, photographic style, lighting preferences, and compositional rules. Once trained, these models generate on-brand assets at infinite scale with zero style drift.</p>
        </section>

        <section className="legal-section">
          <h2>What You Get</h2>
          <ul>
            <li><strong>Brand Style Model:</strong> A custom-trained diffusion model fine-tuned on your approved brand assets</li>
            <li><strong>Style Guide Automation:</strong> Generate unlimited on-brand images, textures, backgrounds, and compositions</li>
            <li><strong>Consistency Engine:</strong> Automated brand compliance checks across all generated outputs</li>
            <li><strong>Asset Library Generation:</strong> Bulk produce seasonal, campaign-specific, or channel-specific visual assets</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>How It Works</h2>
          <ul>
            <li><strong>Ingest:</strong> We collect your brand guidelines, approved imagery, color systems, and style references</li>
            <li><strong>Train:</strong> Our ML team fine-tunes a private model exclusively on your brand assets — never shared across clients</li>
            <li><strong>Validate:</strong> Human creative review ensures the model captures your brand essence accurately</li>
            <li><strong>Deploy:</strong> The model integrates into your production pipeline for on-demand asset generation</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Security & IP</h2>
          <p>Your brand model is stored in an isolated, encrypted environment. It is never used for other clients, never shared, and can be deleted upon request. All training data remains your intellectual property.</p>
        </section>

        <section className="legal-section">
          <h2>Get Started</h2>
          <p>Interested in a custom brand model? Contact us at <a href="mailto:creative@doublediffusion.co">creative@doublediffusion.co</a></p>
        </section>
      </div>
    </main>
  );
}
