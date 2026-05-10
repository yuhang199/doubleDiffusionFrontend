import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  metadataBase: new URL("https://www.doublediffusion.co"),
  title: "Double Diffusion — AI-Powered Creative & Production Studio",
  description:
    "Double Diffusion is an AI-powered creative studio specializing in short films, ads, and cutting-edge production.",
  openGraph: {
    title: "Double Diffusion — AI-Powered Creative & Production Studio",
    description:
      "AI-powered creative studio specializing in short films, ads, and cutting-edge production.",
    url: "https://www.doublediffusion.co",
    siteName: "Double Diffusion",
    images: [
      {
        url: "/dd-logo-dark.png",
        width: 512,
        height: 512,
        alt: "Double Diffusion Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Double Diffusion — AI-Powered Creative & Production Studio",
    description:
      "AI-powered creative studio specializing in short films, ads, and cutting-edge production.",
    images: ["/dd-logo-dark.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Double Diffusion",
  url: "https://www.doublediffusion.co",
  logo: "https://www.doublediffusion.co/dd-logo-dark.png",
  description:
    "AI-powered creative studio specializing in short films, ads, and cutting-edge production.",
  foundingDate: "2026",
  sameAs: [],
};

import PageTransition from "./components/PageTransition";

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
      </head>
      <body>
        <PageTransition />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
