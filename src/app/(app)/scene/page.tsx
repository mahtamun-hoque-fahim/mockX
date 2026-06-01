import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { mockups } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { SceneEditor } from "@/components/editor/scene-editor";
import type { SceneConfig } from "@/components/editor/scene-editor";

export const metadata = { title: "Scene Mockup — mockX" };

interface Props { searchParams: Promise<{ id?: string }> }

export default async function ScenePage({ searchParams }: Props) {
  const { id } = await searchParams;
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string } | undefined)?.role ?? "user";

  if (!id) return <SceneEditor userRole={role} />;

  if (session) {
    try {
      const [row] = await db.select().from(mockups)
        .where(and(eq(mockups.id, id), eq(mockups.userId, session.user.id)));
      if (row?.type === "scene") {
        return <SceneEditor mockupId={id} initialConfig={row.config as SceneConfig} userRole={role} />;
      }
    } catch {}
  }

  return <SceneEditor userRole={role} />;
}
