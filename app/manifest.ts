import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cruz Plumbing",
    short_name: "Cruz Plumbing",
    description: "Family-owned plumbing service for Avondale, Goodyear, and West Valley AZ.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    orientation: "portrait",
    icons: [
      {
        src: "/cruz.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/cruz.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
