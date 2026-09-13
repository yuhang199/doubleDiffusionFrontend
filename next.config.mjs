/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve modern formats to browsers that accept them; Next falls back
    // automatically for the rest.
    formats: ["image/avif", "image/webp"],
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
