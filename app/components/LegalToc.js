"use client";
import { useEffect, useState } from "react";

// Builds the contents list from the article's section headings after mount,
// so the policy copy itself stays plain server-rendered markup.
export default function LegalToc() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const headings = [...document.querySelectorAll(".policy-content .legal-section > h2")];
    headings.forEach((h, i) => {
      if (!h.id) h.id = `section-${i + 1}`;
    });
    setItems(headings.map((h) => ({ id: h.id, label: h.textContent.replace(/^\d+\.\s*/, "") })));

    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-90px 0px -70% 0px" }
    );
    headings.forEach((h) => obs.observe(h));
    return () => obs.disconnect();
  }, []);

  if (!items.length) return <nav className="policy-toc" aria-label="Contents" />;

  return (
    <nav className="policy-toc" aria-label="Contents">
      <span className="policy-toc-title">Contents</span>
      <ol>
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} className={active === it.id ? "is-active" : undefined}>
              {it.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
