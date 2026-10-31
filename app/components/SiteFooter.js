
/**
 * Site-wide footer.
 *
 * Every subpage used to end with a single "Back to Home" link, which left the
 * service pages as crawl dead ends with no path to each other.
 * Rendering this on every page gives the whole site one shared link graph.
 */
export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-name">Double Diffusion®</span>
          <span className="footer-sub">AI/VFX Solutions for Professional Productions</span>
        </div>
        <div className="footer-cols">
          <nav className="footer-col" aria-label="Work">
            <span className="footer-col-title">Work</span>
            <a href="/work" className="footer-link">All Work</a>
            <a href="/work?type=pure-ai" className="footer-link">Pure AI</a>
            <a href="/work?type=hybrid" className="footer-link">Hybrid</a>
          </nav>
          <nav className="footer-col" aria-label="Company">
            <span className="footer-col-title">Company</span>
            <a href="/" className="footer-link">Home</a>
            <a href="/#services" className="footer-link">AI/VFX Solutions</a>
            <a href="/about" className="footer-link">About</a>
            <a href="/support" className="footer-link">Support</a>
          </nav>
          <nav className="footer-col" aria-label="Legal">
            <span className="footer-col-title">Legal</span>
            <a href="/compliance" className="footer-link">Ethical AI &amp; Compliance</a>
            <a href="/privacy" className="footer-link">Privacy Policy</a>
            <a href="/terms" className="footer-link">Terms of Service</a>
          </nav>
        </div>
      </div>
      <div className="footer-copy">© 2026 Double Diffusion. All rights reserved.</div>
    </footer>
  );
}
