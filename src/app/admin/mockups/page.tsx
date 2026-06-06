import { db } from "@/lib/db";
import { mockups, users } from "@/lib/db/schema";
import type { Mockup } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { AdminMockupsClient } from "./client";

async function getMockups(): Promise<{ mockup: Mockup; userName: string | null }[]> {
  try {
    return await db
      .select({ mockup: mockups, userName: users.name })
      .from(mockups)
      .leftJoin(users, eq(mockups.userId, users.id))
      .orderBy(desc(mockups.createdAt))
      .limit(200);
  } catch {
    return [];
  }
}

export default async function AdminMockupsPage() {
  const rows = await getMockups();
  return <AdminMockupsClient initialRows={rows} />;
}
