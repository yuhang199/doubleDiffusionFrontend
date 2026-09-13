import SiteFooter from "./components/SiteFooter";

export const metadata = {
  title: "Page Not Found — Double Diffusion",
  description: "The page you were looking for doesn't exist.",
  // Next already emits noindex for not-found; no canonical is claimed here.
};

export default function NotFound() {
  return (
    <>
      <main className="legal-page">
        <div className="legal-inner">
          <h1 className="legal-title">Page Not Found</h1>
          <p className="legal-date">Error 404</p>

          <section className="legal-section">
            <p>
              The page you were looking for doesn&apos;t exist, or has moved.
              Here&apos;s where to go instead:
            </p>
            <ul>
              <li><a href="/">Home</a> — our work and how we produce it</li>
              <li><a href="/about">About</a> — who we are</li>
              <li><a href="/demo">Book a demo</a> — tell us about your project</li>
              <li><a href="/support">Support</a> — help with an existing project</li>
            </ul>
            <p>
              Still stuck? Email{" "}
              <a href="mailto:creative@doublediffusion.co">creative@doublediffusion.co</a>.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
