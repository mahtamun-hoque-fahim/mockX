import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://mockx.app";
  return {
    name: "mockX — MacBook Mockup Tool",
    short_name: "mockX",
    description: "Turn any screenshot into a pixel-perfect MacBook mockup",
    start_url: "/",
    display: "standalone",
    orientation: "landscape",
    background_color: "#0A0C10",
    theme_color: "#6C63FF",
    categories: ["productivity", "design", "utilities"],
    icons: [
      {
        src: `${appUrl}/api/icon?size=192`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${appUrl}/api/icon?size=512`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: `${appUrl}/api/og?title=Screen+Mockup+Editor&type=screen`,
        sizes: "1200x630",
    form_factor: "wide",
      },
    ],
  };
}
