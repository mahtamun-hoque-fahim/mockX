export const dynamic = "force-dynamic";
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
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string } | undefined)?.role ?? "user";

  if (!id) return <ScreenEditor userRole={role} />;

  if (session) {
    try {
      const [row] = await db.select().from(mockups)
        .where(and(eq(mockups.id, id), eq(mockups.userId, session.user.id)));
      if (row?.type === "screen") {
        return <ScreenEditor mockupId={id} initialConfig={row.config as ScreenConfig} userRole={role} />;
      }
    } catch {}
  }

  return <ScreenEditor userRole={role} />;
}
