export const metadata = {
  title: "Support — Double Diffusion",
  description: "Get help with Double Diffusion services, projects, and technical inquiries.",
};

export default function Support() {
  return (
    <main className="legal-page">
      <div className="legal-inner">
        <a href="/" className="legal-back">← Back to Home</a>
        <h1 className="legal-title">Support</h1>
        <p className="legal-date">We&apos;re here to help.</p>

        <section className="legal-section">
          <h2>Contact Our Team</h2>
          <p>For the fastest response, please reach out to the appropriate team below:</p>
          
          <div className="support-grid">
            <div className="support-card">
              <h3>New Creative Projects</h3>
              <p>Interested in working with us? Have questions about our creative production capabilities, pricing, or project timelines?</p>
              <a href="mailto:creative@doublediffusion.co" className="support-link">creative@doublediffusion.co</a>
            </div>

            <div className="support-card">
              <h3>Technology Partnerships</h3>
              <p>Looking to collaborate on AI technology, integrate our pipeline, or explore technical consulting engagements?</p>
              <a href="mailto:partnerships@doublediffusion.co" className="support-link">partnerships@doublediffusion.co</a>
            </div>

            <div className="support-card">
              <h3>General Inquiries & Press</h3>
              <p>Media inquiries, speaking requests, general questions, or anything else — we&apos;d love to hear from you.</p>
              <a href="mailto:hello@doublediffusion.co" className="support-link">hello@doublediffusion.co</a>
            </div>
          </div>
        </section>

        <section className="legal-section">
          <h2>Existing Clients</h2>
          <p>If you are an existing client with an active project or retainer, please contact your dedicated project manager directly. For urgent matters outside business hours, email <a href="mailto:hello@doublediffusion.co">hello@doublediffusion.co</a> with &quot;URGENT&quot; in the subject line.</p>
        </section>

        <section className="legal-section">
          <h2>Response Times</h2>
          <p>We aim to respond to all inquiries within one business day. For active projects, our typical response time is under 4 hours during business hours (9 AM – 6 PM PT, Monday – Friday).</p>
        </section>

        <section className="legal-section">
          <h2>Report an Issue</h2>
          <p>If you encounter technical issues with deliverables, need to report a concern about AI-generated content, or have a compliance-related question, please contact us at <a href="mailto:hello@doublediffusion.co">hello@doublediffusion.co</a> with a detailed description of the issue.</p>
        </section>
      </div>
    </main>
  );
}
