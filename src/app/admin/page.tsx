import { db } from "@/lib/db";
import { users, mockups, feedback } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import { Users, Images, MessageSquare, TrendingUp } from "lucide-react";

async function getStats() {
  try {
    const [{ count: totalUsers }]   = await db.select({ count: sql<number>`count(*)::int` }).from(users);
    const [{ count: totalMockups }] = await db.select({ count: sql<number>`count(*)::int` }).from(mockups);
    const [{ count: openFeedback }] = await db.select({ count: sql<number>`count(*)::int` }).from(feedback);
    return { totalUsers, totalMockups, openFeedback };
  } catch {
    return { totalUsers: 0, totalMockups: 0, openFeedback: 0 };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: "Total Users",     value: stats.totalUsers,    icon: Users,         color: "#6c63ff" },
    { label: "Total Mockups",   value: stats.totalMockups,  icon: Images,        color: "#007aff" },
    { label: "Open Feedback",   value: stats.openFeedback,  icon: MessageSquare, color: "#febc2e" },
    { label: "Exports Today",   value: "—",                 icon: TrendingUp,    color: "#28c840" },
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

      {/* Recent users table */}
      <div className="bg-surface border border-white/7 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/7">
          <h2 className="font-syne font-semibold text-base text-text-primary">Recent signups</h2>
        </div>
        <div className="p-6 text-sm text-text-secondary text-center py-12">
          Connect the database to view recent signups.
        </div>
      </div>
    </div>
  );
}
