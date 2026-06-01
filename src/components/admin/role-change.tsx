"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const ROLES = ["user", "pro", "admin", "guest"] as const;
type Role = typeof ROLES[number];

interface RoleChangeProps {
  userId: string;
  currentRole: string;
}

export function RoleChange({ userId, currentRole }: RoleChangeProps) {
  const [role,    setRole]    = useState<Role>(currentRole as Role);
  const [loading, setLoading] = useState(false);

  const handleChange = async (newRole: Role) => {
    if (newRole === role) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) setRole(newRole);
    } finally {
      setLoading(false);
    }
  };

  const COLORS: Record<Role, string> = {
    admin: "bg-red-500/15 text-red-400 border-red-500/25",
    pro:   "bg-accent/15 text-accent border-accent/25",
    user:  "bg-white/8 text-text-secondary border-white/10",
    guest: "bg-white/5 text-text-secondary border-white/8",
  };

  return (
    <div className="flex items-center gap-1.5">
      {loading && <Loader2 size={11} className="animate-spin text-text-secondary"/>}
      <select
        value={role}
        onChange={e => handleChange(e.target.value as Role)}
        disabled={loading}
        className={`text-[11px] font-medium px-2 py-0.5 rounded-md border bg-transparent cursor-pointer outline-none transition-all disabled:opacity-50 ${COLORS[role]}`}
      >
        {ROLES.map(r => (
          <option key={r} value={r} className="bg-surface text-text-primary">{r}</option>
        ))}
      </select>
    </div>
  );
}
