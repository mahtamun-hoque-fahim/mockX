import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { mockups } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import type { Mockup } from "@/lib/db/schema";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MockupsGrid } from "@/components/mockups/mockups-grid";
import { Plus } from "lucide-react";

export const metadata = { title: "Saved Mockups — mockX" };

async function getUserMockups(userId: string): Promise<Mockup[]> {
  try {
    return await db
      .select()
      .from(mockups)
      .where(eq(mockups.userId, userId))
      .orderBy(desc(mockups.createdAt))
      .limit(50);
  } catch {
    return [];
  }
}

export default async function MockupsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const rows = session ? await getUserMockups(session.user.id) : [];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-syne font-bold text-2xl text-text-primary mb-1">Saved Mockups</h1>
          <p className="text-text-secondary text-sm">{rows.length} of 20 saved</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/app/screen">
            <Button size="sm" variant="secondary" className="gap-1.5">
              <Plus size={13}/> Screen
            </Button>
          </Link>
          <Link href="/app/scene">
            <Button size="sm" className="gap-1.5">
              <Plus size={13}/> Scene
            </Button>
          </Link>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-white/7 bg-surface p-14 flex flex-col items-center gap-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-surface-elevated border border-white/8 flex items-center justify-center">
            <Plus size={22} className="text-text-secondary"/>
          </div>
          <div>
            <p className="text-text-primary font-medium mb-1">No saved mockups yet</p>
            <p className="text-sm text-text-secondary max-w-xs">Create a mockup in the editor and hit Save to store it here.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/app/screen"><Button size="sm" variant="secondary">Screen Mockup</Button></Link>
            <Link href="/app/scene"><Button size="sm">Scene Mockup</Button></Link>
          </div>
        </div>
      ) : (
        <MockupsGrid initialMockups={rows} />
      )}
    </div>
  );
}
