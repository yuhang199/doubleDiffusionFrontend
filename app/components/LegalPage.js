import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import LegalToc from "./LegalToc";

/**
 * Shared layout for the long-form policy pages (compliance, privacy, terms):
 * site nav, a title block, then the sections beside a sticky contents list.
 * Children are the page's <section className="legal-section"> blocks.
 */
export default function LegalPage({ title, updated, children }) {
  return (
    <div className="subpage">
      <SiteNav />
      <main className="policy-page">
        <div className="policy-inner">
          <header className="policy-header">
            <h1 className="policy-title">{title}</h1>
            {updated && <p className="policy-updated">Last updated: {updated}</p>}
          </header>
          <div className="policy-body">
            <LegalToc />
            <article className="policy-content">{children}</article>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
