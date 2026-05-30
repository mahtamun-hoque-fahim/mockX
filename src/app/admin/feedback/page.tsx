import { db } from "@/lib/db";
import { feedback, users } from "@/lib/db/schema";
import type { Feedback } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

async function getFeedback(): Promise<{ fb: Feedback; userName: string | null }[]> {
  try {
    return await db
      .select({ fb: feedback, userName: users.name })
      .from(feedback)
      .leftJoin(users, eq(feedback.userId, users.id))
      .orderBy(desc(feedback.createdAt))
      .limit(100);
  } catch {
    return [];
  }
}

export default async function AdminFeedbackPage() {
  const rows = await getFeedback();
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-syne font-bold text-2xl text-text-primary mb-1">Feedback</h1>
        <p className="text-text-secondary text-sm">{rows.length} submissions</p>
      </div>
      <div className="space-y-3">
        {rows.length === 0 ? (
          <div className="bg-surface border border-white/7 rounded-2xl p-12 text-center text-text-secondary text-sm">No feedback yet.</div>
        ) : (
          rows.map(({ fb, userName }) => (
            <div key={fb.id} className="bg-surface border border-white/7 rounded-2xl p-5">
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <Badge variant={fb.type === "bug" ? "danger" : fb.type === "suggestion" ? "pro" : "default"}>{fb.type}</Badge>
                <Badge variant={fb.status === "open" ? "warning" : fb.status === "reviewed" ? "default" : "success"}>{fb.status}</Badge>
                <span className="text-xs text-text-secondary">{userName ?? "Anonymous"} · {formatDate(fb.createdAt)}</span>
              </div>
              <p className="text-sm text-text-primary leading-relaxed">{fb.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
