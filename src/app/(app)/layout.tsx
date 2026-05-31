import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

import { LayoutDashboard, Monitor, Laptop, Images, Settings } from "lucide-react";

const NAV = [
  { href: "/app/dashboard", label: "Dashboard",    icon: LayoutDashboard },
  { href: "/app/screen",    label: "Screen Mockup", icon: Monitor },
  { href: "/app/scene",     label: "Scene Mockup",  icon: Laptop },
  { href: "/app/mockups",   label: "Saved",         icon: Images },
  { href: "/app/settings",  label: "Settings",      icon: Settings },
];

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const user = session.user;

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Top bar */}
      <header className="h-14 border-b border-white/7 flex items-center justify-between px-4 shrink-0" style={{ background: "rgba(10,12,16,0.9)", backdropFilter: "blur(12px)" }}>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center shadow shadow-accent/30">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="3" width="12" height="9" rx="2" stroke="white" strokeWidth="1.4"/>
              <path d="M1 6h12" stroke="white" strokeWidth="1.4"/>
            </svg>
          </div>
          <span className="font-syne font-bold text-sm text-text-primary">mock<span className="text-accent">X</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all">
              <Icon size={13}/>
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="text-xs text-text-secondary hidden sm:block">{user.name}</div>
          <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-xs font-semibold text-accent">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      {/* Page content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
