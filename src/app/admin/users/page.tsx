import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import type { User } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { RoleChange } from "@/components/admin/role-change";
import { formatDate } from "@/lib/utils";

async function getUsers(): Promise<User[]> {
  try { return await db.select().from(users).orderBy(desc(users.createdAt)).limit(100); }
  catch { return []; }
}

export default async function AdminUsersPage() {
  const rows = await getUsers();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-syne font-bold text-2xl text-text-primary mb-1">Users</h1>
        <p className="text-text-secondary text-sm">{rows.length} total users</p>
      </div>

      <div className="bg-surface border border-white/7 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/7">
                {["Name","Email","Role","Joined","Status"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] uppercase tracking-wider text-text-secondary font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0
                ? <tr><td colSpan={5} className="px-5 py-12 text-center text-text-secondary">No users yet</td></tr>
                : rows.map((u: User) => (
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
                      <RoleChange userId={u.id} currentRole={u.role} />
                    </td>
                    <td className="px-5 py-3.5 text-text-secondary">{formatDate(u.createdAt)}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant={u.banned ? "danger" : "success"}>
                        {u.banned ? "Banned" : "Active"}
                      </Badge>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
