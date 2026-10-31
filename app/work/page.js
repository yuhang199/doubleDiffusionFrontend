import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import WorkGrid from "./WorkGrid";

const DESCRIPTION = "Pure AI and hybrid AI/VFX productions by Double Diffusion Studios.";

export const metadata = {
  title: "Work — Double Diffusion",
  description: DESCRIPTION,
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work — Double Diffusion",
    description: DESCRIPTION,
    url: "https://www.doublediffusion.co/work",
    images: [{ url: "/videos/posters/pure-ai-reel.jpg", width: 1920, height: 1080, alt: "Double Diffusion work" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work — Double Diffusion",
    description: DESCRIPTION,
    images: ["/videos/posters/pure-ai-reel.jpg"],
  },
};

export default function WorkPage() {
  return (
    <div className="subpage">
      <SiteNav active="/work" />
      <main className="work-page">
        <header className="work-page-header">
          <h1 className="work-page-title">Work</h1>
        </header>
        <WorkGrid />
      </main>
      <SiteFooter />
    </div>
  );
}
