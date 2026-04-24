export const metadata = {
  title: "Ethical AI & Compliance — Double Diffusion",
  description: "Our commitment to responsible AI use, model licensing, and legal compliance.",
};

export default function Compliance() {
  return (
    <main className="legal-page">
      <div className="legal-inner">
        <a href="/" className="legal-back">← Back to Home</a>
        <h1 className="legal-title">Ethical AI & Compliance</h1>
        <p className="legal-date">Last updated: April 23, 2026</p>

        <section className="legal-section">
          <h2>1. Our Commitment</h2>
          <p>At Double Diffusion, responsible AI is not an afterthought — it is foundational to how we build, deploy, and deliver creative work. We are committed to transparency, fairness, and compliance at every level of our AI-native production pipeline.</p>
        </section>

        <section className="legal-section">
          <h2>2. Model Licensing & Commercial Rights</h2>
          <p>All generative AI models used in our production pipeline are commercially licensed for professional use. We maintain a rigorous model governance framework that includes:</p>
          <ul>
            <li><strong>Commercial Use Authorization:</strong> Every model in our stack (including image generation, video synthesis, and language models) is licensed for commercial output. We do not use research-only or non-commercial models in client work.</li>
            <li><strong>Vendor Compliance:</strong> We partner exclusively with AI model providers who offer clear commercial licensing terms, including but not limited to enterprise-tier agreements with major AI platforms.</li>
            <li><strong>License Auditing:</strong> Our legal team periodically reviews model licenses and terms of service to ensure continued compliance as provider policies evolve.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. Training Data Compliance</h2>
          <p>We take the provenance of training data seriously:</p>
          <ul>
            <li><strong>Third-Party Models:</strong> We select model providers who have disclosed their training data practices and have addressed copyright concerns through licensing agreements, opt-out mechanisms, or curated datasets.</li>
            <li><strong>Custom Fine-Tuning:</strong> When we fine-tune models for specific brand identities, we use only client-provided assets and properly licensed stock content. No third-party copyrighted material is used without authorization.</li>
            <li><strong>No Unauthorized Reproduction:</strong> Our pipeline includes content verification steps to ensure outputs do not substantially reproduce copyrighted works.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. Intellectual Property Protection</h2>
          <p>We implement multiple safeguards to protect our clients&apos; intellectual property and the IP rights of third parties:</p>
          <ul>
            <li>All AI-generated deliverables are reviewed by human creative directors before delivery</li>
            <li>Automated similarity detection is used to flag potential IP conflicts</li>
            <li>Client brand assets and fine-tuned models are stored in isolated, encrypted environments</li>
            <li>We do not use client data to train general-purpose models or share it across engagements</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. Transparency & Disclosure</h2>
          <p>We believe in transparency regarding AI involvement in creative production:</p>
          <ul>
            <li>Clients are fully informed about which components of their deliverables involve AI generation, AI-assisted editing, or traditional production methods</li>
            <li>We provide detailed production reports upon request, documenting the tools and techniques used</li>
            <li>We support emerging industry standards for AI content labeling and provenance tracking (e.g., C2PA, Content Credentials)</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>6. Bias & Fairness</h2>
          <p>We actively monitor our AI outputs for bias, stereotyping, or harmful representations. Our quality assurance process includes human review checkpoints specifically designed to catch and correct biased or inappropriate content before delivery.</p>
        </section>

        <section className="legal-section">
          <h2>7. Data Privacy in AI Workflows</h2>
          <p>Client data processed through our AI pipeline is subject to the same privacy protections outlined in our Privacy Policy. Specifically:</p>
          <ul>
            <li>Client assets are not used for model training without explicit written consent</li>
            <li>Processing occurs on secure, SOC 2-compliant infrastructure</li>
            <li>Data is encrypted at rest and in transit</li>
            <li>Client data is deleted from processing environments upon project completion, per retention policy</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>8. Regulatory Compliance</h2>
          <p>We monitor and adapt to evolving AI regulations across jurisdictions, including:</p>
          <ul>
            <li>EU AI Act requirements for transparency and risk classification</li>
            <li>FTC guidelines on AI-generated content and advertising</li>
            <li>California Consumer Privacy Act (CCPA) data handling requirements</li>
            <li>Industry-specific regulations for advertising and media content</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>9. Continuous Improvement</h2>
          <p>Our compliance framework is a living document. We conduct quarterly reviews of our AI practices, update our policies as regulations evolve, and engage with industry working groups on responsible AI standards.</p>
        </section>

        <section className="legal-section">
          <h2>10. Contact</h2>
          <p>For questions about our AI ethics practices or compliance framework, contact us at:<br /><a href="mailto:hello@doublediffusion.co">hello@doublediffusion.co</a></p>
        </section>
      </div>
    </main>
  );
}
