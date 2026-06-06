export const dynamic = "force-dynamic";
import { db } from "@/lib/db";
import { users, mockups, feedback } from "@/lib/db/schema";
import { sql, eq, gte } from "drizzle-orm";
import { Users, Images, MessageSquare, TrendingUp } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { User } from "@/lib/db/schema";

async function getStats() {
  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const [
      [{ total: totalUsers }],
      [{ total: totalMockups }],
      [{ total: openFeedback }],
      [{ total: recentMockups }],
    ] = await Promise.all([
      db.select({ total: sql<number>`count(*)::int` }).from(users),
      db.select({ total: sql<number>`count(*)::int` }).from(mockups),
      db.select({ total: sql<number>`count(*)::int` }).from(feedback).where(eq(feedback.status, "open")),
      db.select({ total: sql<number>`count(*)::int` }).from(mockups).where(gte(mockups.createdAt, oneDayAgo)),
    ]);
    return { totalUsers, totalMockups, openFeedback, recentMockups };
  } catch {
    return { totalUsers: 0, totalMockups: 0, openFeedback: 0, recentMockups: 0 };
  }
}

async function getRecentUsers(): Promise<User[]> {
  try {
    return await db.select().from(users)
      .orderBy(sql`created_at desc`)
      .limit(8);
  } catch { return []; }
}

export default async function AdminDashboard() {
  const [stats, recentUsers] = await Promise.all([getStats(), getRecentUsers()]);

  const cards = [
    { label: "Total Users",       value: stats.totalUsers,    icon: Users,         color: "#6c63ff" },
    { label: "Total Mockups",     value: stats.totalMockups,  icon: Images,        color: "#007aff" },
    { label: "Mockups (24h)",     value: stats.recentMockups, icon: TrendingUp,    color: "#28c840" },
    { label: "Open Feedback",     value: stats.openFeedback,  icon: MessageSquare, color: "#febc2e" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-syne font-bold text-2xl text-text-primary mb-1">Admin Overview</h1>
        <p className="text-text-secondary text-sm">mockX platform stats</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map(card => (
          <div key={card.label} className="bg-surface border border-white/7 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-text-secondary font-medium">{card.label}</span>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: card.color + "18" }}>
                <card.icon size={14} style={{ color: card.color }}/>
              </div>
            </div>
            <div className="font-syne font-bold text-3xl text-text-primary">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Recent users */}
      <div className="bg-surface border border-white/7 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/7">
          <h2 className="font-syne font-semibold text-base text-text-primary">Recent signups</h2>
        </div>
        {recentUsers.length === 0 ? (
          <div className="px-6 py-10 text-sm text-text-secondary text-center">No users yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Name","Email","Role","Joined"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] uppercase tracking-wider text-text-secondary font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentUsers.map(u => (
                <tr key={u.id} className="border-b border-white/5 hover:bg-white/2 transition-colors last:border-0">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center text-xs font-semibold text-accent shrink-0">
                        {u.name?.charAt(0).toUpperCase() ?? "?"}
                      </div>
                      <span className="text-text-primary font-medium">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-text-secondary">{u.email}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex px-2 py-0.5 rounded-md text-[11px] font-medium ${u.role === "admin" ? "bg-red-500/15 text-red-400" : u.role === "pro" ? "bg-accent/15 text-accent" : "bg-white/8 text-text-secondary"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-text-secondary">{formatDate(u.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
