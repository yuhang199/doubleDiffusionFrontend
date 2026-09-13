import DemoForm from "./DemoForm";

// This page must stay a server component: `metadata` is ignored in files marked
// "use client", so the interactive form lives in DemoForm.js instead.
export const metadata = {
  title: "Book a Demo — Double Diffusion",
  description:
    "Tell us about your project and get a response within one business day. Book a demo with Double Diffusion for AI-powered commercial, social, and narrative production.",
  alternates: {
    canonical: "/demo",
  },
  openGraph: {
    title: "Book a Demo — Double Diffusion",
    description:
      "Tell us about your project and get a response within one business day.",
    url: "https://www.doublediffusion.co/demo",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Book a Demo — Double Diffusion",
    description:
      "Tell us about your project and get a response within one business day.",
  },
};

export default function BookDemoPage() {
  return <DemoForm />;
}
