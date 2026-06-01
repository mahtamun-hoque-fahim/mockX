import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { feedback } from "@/lib/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

const schema = z.object({
  message: z.string().min(5).max(2000),
  type: z.enum(["bug", "suggestion", "other"]).default("other"),
});

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  const body = await req.json();

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const [row] = await db.insert(feedback).values({
    id: createId(),
    userId: session?.user.id ?? null,
    message: parsed.data.message,
    type: parsed.data.type,
  }).returning();

  return NextResponse.json(row, { status: 201 });
}
