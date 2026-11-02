import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  metadataBase: new URL("https://www.doublediffusion.co"),
  title: "Double Diffusion Studios — AI/VFX Solutions for Professional Productions",
  description:
    "Double Diffusion Studios is a Los Angeles-based production studio providing AI/VFX solutions and hybrid workflows for professional productions.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Double Diffusion Studios — AI/VFX Solutions for Professional Productions",
    description:
      "Los Angeles-based production studio providing AI/VFX solutions and hybrid workflows for professional productions.",
    url: "https://www.doublediffusion.co",
    siteName: "Double Diffusion",
    images: [
      {
        url: "/images/upgrade-11.jpg",
        width: 2400,
        height: 1339,
        alt: "Double Diffusion Studios — AI/VFX solutions for professional productions",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Double Diffusion Studios — AI/VFX Solutions for Professional Productions",
    description:
      "Los Angeles-based production studio providing AI/VFX solutions and hybrid workflows for professional productions.",
    images: ["/images/upgrade-11.jpg"],
  },
};

const SITE = "https://www.doublediffusion.co";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "Double Diffusion",
  alternateName: "Double Diffusion Studios",
  url: SITE,
  logo: {
    "@type": "ImageObject",
    url: `${SITE}/dd-logo-dark.png`,
    width: 512,
    height: 512,
  },
  description:
    "Los Angeles-based production studio providing AI/VFX solutions and hybrid workflows for professional productions.",
  foundingDate: "2026",
  telephone: "+1-832-951-3171",
  email: "hello@doublediffusion.co",
  // Two production bases. Street addresses are omitted rather than guessed;
  // add them here if a Google Business Profile is ever registered.
  location: [
    {
      "@type": "Place",
      name: "Los Angeles",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Los Angeles",
        addressRegion: "CA",
        addressCountry: "US",
      },
    },
    {
      "@type": "Place",
      name: "Houston",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Houston",
        addressRegion: "TX",
        addressCountry: "US",
      },
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hello@doublediffusion.co",
      telephone: "+1-832-951-3171",
      availableLanguage: ["en"],
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "creative@doublediffusion.co",
      availableLanguage: ["en"],
    },
    {
      "@type": "ContactPoint",
      contactType: "partnerships",
      email: "partnerships@doublediffusion.co",
      availableLanguage: ["en"],
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/double-diffusion-studios",
    "https://www.instagram.com/doublediffusionstudios",
    "https://www.youtube.com/@DoubleDiffusion",
    "https://www.tiktok.com/@doublediffusionstudios",
  ],
};

// Lets search engines resolve the site as a named entity alongside the org.
const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: SITE,
  name: "Double Diffusion",
  publisher: { "@id": `${SITE}/#organization` },
  inLanguage: "en",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Exo+2:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
