import HomeClient from "./HomeClient";

// Server component wrapper: `metadata` is ignored in files marked "use client",
// so the interactive landing page lives in HomeClient.js instead.
export const metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
