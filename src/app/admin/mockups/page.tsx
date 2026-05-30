import { db } from "@/lib/db";
import { mockups, users } from "@/lib/db/schema";
import type { Mockup } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

async function getMockups(): Promise<{ mockup: Mockup; userName: string | null }[]> {
  try {
    return await db
      .select({ mockup: mockups, userName: users.name })
      .from(mockups)
      .leftJoin(users, eq(mockups.userId, users.id))
      .orderBy(desc(mockups.createdAt))
      .limit(100);
  } catch {
    return [];
  }
}

export default async function AdminMockupsPage() {
  const rows = await getMockups();
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-syne font-bold text-2xl text-text-primary mb-1">Mockups</h1>
        <p className="text-text-secondary text-sm">{rows.length} total mockups</p>
      </div>
      <div className="bg-surface border border-white/7 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/7">
                {["Title","User","Type","Public","Created"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] uppercase tracking-wider text-text-secondary font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr><td colSpan={5} className="px-5 py-12 text-center text-text-secondary">No mockups yet</td></tr>
              ) : (
                rows.map(({ mockup: m, userName }) => (
                  <tr key={m.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3.5 text-text-primary font-medium">{m.title ?? <span className="text-text-secondary italic">Untitled</span>}</td>
                    <td className="px-5 py-3.5 text-text-secondary">{userName ?? "—"}</td>
                    <td className="px-5 py-3.5"><Badge variant="default">{m.type}</Badge></td>
                    <td className="px-5 py-3.5"><Badge variant={m.isPublic ? "success" : "default"}>{m.isPublic ? "Public" : "Private"}</Badge></td>
                    <td className="px-5 py-3.5 text-text-secondary">{formatDate(m.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
