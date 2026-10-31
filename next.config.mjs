/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve modern formats to browsers that accept them; Next falls back
    // automatically for the rest.
    formats: ["image/avif", "image/webp"],
  },

  // The four original service pages were folded into the homepage
  // AI/VFX Solutions section in the October 2026 redesign.
  async redirects() {
    return [
      { source: "/services/:slug", destination: "/#services", permanent: true },
      // The solution detail pages moved into the Work portfolio.
      { source: "/solutions/work-case", destination: "/work/berry-law-firm-commercial", permanent: true },
      { source: "/work/example-work-case", destination: "/work/berry-law-firm-commercial", permanent: true },
      { source: "/solutions/pure-ai", destination: "/work?type=pure-ai", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        // Videos and their poster frames are content-addressed by filename and
        // never mutated in place, so they can be cached aggressively.
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
