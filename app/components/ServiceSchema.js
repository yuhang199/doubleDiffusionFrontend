const SITE = "https://www.doublediffusion.co";

/**
 * Breadcrumb + Service structured data for a /services/* page.
 *
 * Deliberately conservative: it states what the service is, who provides it,
 * and where it is offered. It does not assert pricing, ratings, or delivery
 * guarantees, none of which are substantiated yet.
 */
export default function ServiceSchema({ slug, name, description }) {
  const url = `${SITE}/services/${slug}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE}/#services` },
      { "@type": "ListItem", position: 3, name, item: url },
    ],
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    serviceType: name,
    url,
    provider: { "@id": `${SITE}/#organization` },
    areaServed: [
      { "@type": "City", name: "Los Angeles" },
      { "@type": "City", name: "Houston" },
      { "@type": "Country", name: "United States" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
    </>
  );
}
