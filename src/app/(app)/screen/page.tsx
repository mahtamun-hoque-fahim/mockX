import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { mockups } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { ScreenEditor } from "@/components/editor/screen-editor";
import type { ScreenConfig } from "@/components/editor/screen-editor";

export const metadata = { title: "Screen Mockup — mockX" };

interface Props { searchParams: Promise<{ id?: string }> }

export default async function ScreenPage({ searchParams }: Props) {
  const { id } = await searchParams;

  if (!id) return <ScreenEditor />;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return <ScreenEditor />;

  try {
    const [row] = await db.select().from(mockups).where(and(eq(mockups.id, id), eq(mockups.userId, session.user.id)));
    if (row && row.type === "screen") {
      return <ScreenEditor mockupId={id} initialConfig={row.config as ScreenConfig} />;
    }
  } catch {}

  return <ScreenEditor />;
}
