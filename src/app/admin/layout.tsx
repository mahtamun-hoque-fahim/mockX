import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LayoutDashboard, Users, Images, Sliders, MessageSquare, Settings } from "lucide-react";

const NAV = [
  { href: "/admin",          label: "Overview",  icon: LayoutDashboard },
  { href: "/admin/users",    label: "Users",     icon: Users },
  { href: "/admin/mockups",  label: "Mockups",   icon: Images },
  { href: "/admin/presets",  label: "Presets",   icon: Sliders },
  { href: "/admin/feedback", label: "Feedback",  icon: MessageSquare },
  { href: "/admin/settings", label: "Settings",  icon: Settings },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const userWithRole = session.user as { role?: string }; if (userWithRole.role !== "admin") redirect("/app/dashboard");

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Sidebar */}
      <aside className="w-52 border-r border-white/7 bg-surface flex flex-col shrink-0">
        <div className="h-14 flex items-center px-4 border-b border-white/7">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="3" width="12" height="9" rx="2" stroke="white" strokeWidth="1.4"/>
                <path d="M1 6h12" stroke="white" strokeWidth="1.4"/>
              </svg>
            </div>
            <span className="font-syne font-bold text-sm text-text-primary">mock<span className="text-accent">X</span></span>
          </Link>
          <span className="ml-auto text-[10px] text-red-400 font-semibold uppercase tracking-wide">Admin</span>
        </div>
        <nav className="p-3 space-y-0.5 flex-1">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all">
              <Icon size={15}/>
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-white/7">
          <Link href="/app/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all">
            Back to App
          </Link>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
