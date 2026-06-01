import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://mockx.app";
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/share/"],
        disallow: ["/app/", "/admin/", "/api/"],
      },
    ],
    sitemap: `${appUrl}/sitemap.xml`,
  };
}
