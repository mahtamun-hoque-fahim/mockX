export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;
  const role = (session.user as { role?: string }).role;
  if (role !== "admin") return null;
  return session;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await req.json() as { role?: string; banned?: boolean };

  const patch: Partial<{ role: "guest"|"user"|"pro"|"admin"; banned: boolean; updatedAt: Date }> = {
    updatedAt: new Date(),
  };
  if (body.role !== undefined) {
    const valid = ["guest","user","pro","admin"] as const;
    if (!valid.includes(body.role as never)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }
    patch.role = body.role as "guest"|"user"|"pro"|"admin";
  }
  if (body.banned !== undefined) patch.banned = body.banned;

  const [updated] = await db.update(users).set(patch).where(eq(users.id, id)).returning();
  if (!updated) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(updated);
}
