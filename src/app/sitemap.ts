import { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { mockups } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

type SlugRow = { shareSlug: string | null; updatedAt: Date };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://mockx.app";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: appUrl,             lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${appUrl}/login`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${appUrl}/signup`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  let shareRoutes: MetadataRoute.Sitemap = [];
  try {
    const rows: SlugRow[] = await db
      .select({ shareSlug: mockups.shareSlug, updatedAt: mockups.updatedAt })
      .from(mockups)
      .where(eq(mockups.isPublic, true));

    shareRoutes = rows
      .filter((r: SlugRow): r is { shareSlug: string; updatedAt: Date } =>
        r.shareSlug !== null && r.shareSlug.length > 0
      )
      .map((r: { shareSlug: string; updatedAt: Date }) => ({
        url: `${appUrl}/share/${r.shareSlug}`,
        lastModified: r.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.4,
      }));
  } catch { /* DB may not be connected at build time */ }

  return [...staticRoutes, ...shareRoutes];
}
