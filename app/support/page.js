import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

export const metadata = {
  title: "Support — Double Diffusion",
  description: "Get help with Double Diffusion services, projects, and technical inquiries.",
  alternates: {
    canonical: "/support",
  },
};

const CONTACTS = [
  {
    title: "New Creative Projects",
    text: "Interested in working with us? Have questions about our creative production capabilities, pricing, or project timelines?",
    email: "creative@doublediffusion.co",
  },
  {
    title: "Technology Partnerships",
    text: "Looking to collaborate on AI technology, integrate our pipeline, or explore technical consulting engagements?",
    email: "creative@doublediffusion.co",
  },
  {
    title: "General Inquiries & Press",
    text: "Media inquiries, speaking requests, general questions, or anything else — we'd love to hear from you.",
    email: "manager@doublediffusion.co",
  },
];

export default function Support() {
  return (
    <div className="subpage">
      <SiteNav />
      <main className="support-page">
        <div className="support-inner">
          <header className="support-header">
            <h1 className="support-title">Support</h1>
            <p className="support-lead">
              We&apos;re here to help. For the fastest response, reach out to the right team below.
            </p>
          </header>

          <div className="support-contacts">
            {CONTACTS.map((c) => (
              <section key={c.title} className="support-card">
                <h2>{c.title}</h2>
                <p>{c.text}</p>
                <a href={`mailto:${c.email}`} className="support-link">{c.email}</a>
              </section>
            ))}
          </div>

          <div className="support-info">
            <section>
              <h2>Existing Clients</h2>
              <p>
                If you are an existing client with an active project or retainer, please contact your
                dedicated project manager directly. For urgent matters outside business hours, email{" "}
                <a href="mailto:manager@doublediffusion.co">manager@doublediffusion.co</a>{" "}
                with &quot;URGENT&quot; in the subject line.
              </p>
            </section>
            <section>
              <h2>Response Times</h2>
              <p>
                We aim to respond to all inquiries within one business day. For active projects, our
                typical response time is under 4 hours during business hours (9 AM – 6 PM PT, Monday –
                Friday).
              </p>
            </section>
            <section>
              <h2>Report an Issue</h2>
              <p>
                If you encounter technical issues with deliverables, need to report a concern about
                AI-generated content, or have a compliance-related question, please contact us at{" "}
                <a href="mailto:manager@doublediffusion.co">manager@doublediffusion.co</a> with a detailed
                description of the issue.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
