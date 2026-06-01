import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for @opennextjs/cloudflare
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ...require("@opennextjs/cloudflare").initOpenNextCloudflare?.({ nextConfig: {} }) ?? {},

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "*.cloudinary.com" },
    ],
    // Use unoptimized for CF Pages (no Next.js image optimization)
    unoptimized: process.env.CF_PAGES === "1",
  },

  // Strict mode for better error detection
  reactStrictMode: true,
};

export default nextConfig;
