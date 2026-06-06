import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "*.cloudinary.com" },
    ],
    unoptimized: process.env.CF_PAGES === "1",
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webpack(config: any) {
    // better-auth bundles @better-auth/kysely-adapter which imports kysely
    // internals not present in the installed version. We use drizzle adapter
    // only, so stub the entire kysely-adapter to avoid webpack build errors.
    config.resolve ??= {};
    config.resolve.alias ??= {};
    config.resolve.alias["@better-auth/kysely-adapter"] = false;
    return config;
  },
};

export default nextConfig;
