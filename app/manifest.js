export default function manifest() {
  return {
    name: "Double Diffusion",
    short_name: "Double Diffusion",
    description:
      "AI-powered creative studio specializing in short films, ads, and cutting-edge production.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    // Every icon is a fully opaque, edge-to-edge square with the mark inside a
    // safe zone. A square slot shows a filled square; a round slot crops it to
    // a filled circle. Shipping circular artwork instead would leave the
    // corners empty wherever the slot is square.
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
