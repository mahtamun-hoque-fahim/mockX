import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ActiveNav } from "@/components/layout/active-nav";
import { LayoutDashboard, Monitor, Laptop, Images, Settings } from "lucide-react";

const NAV = [
  { href: "/app/dashboard", label: "Dashboard",    icon: LayoutDashboard },
  { href: "/app/screen",    label: "Screen",        icon: Monitor         },
  { href: "/app/scene",     label: "Scene",         icon: Laptop          },
  { href: "/app/mockups",   label: "Saved",         icon: Images          },
  { href: "/app/settings",  label: "Settings",      icon: Settings        },
];

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const user   = session.user;
  const role   = (user as { role?: string }).role ?? "user";
  const isPro  = role === "pro" || role === "admin";

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <header
        className="h-14 border-b border-white/7 flex items-center justify-between px-4 shrink-0 sticky top-0 z-40"
        style={{ background: "rgba(10,12,16,0.92)", backdropFilter: "blur(12px)" }}
      >
        {/* Logo */}
        <Link href="/app/dashboard" className="flex items-center gap-2 shrink-0">
          <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center shadow shadow-accent/30">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="3" width="12" height="9" rx="2" stroke="white" strokeWidth="1.4"/>
              <path d="M1 6h12" stroke="white" strokeWidth="1.4"/>
            </svg>
          </div>
          <span className="font-syne font-bold text-sm text-text-primary">
            mock<span className="text-accent">X</span>
          </span>
        </Link>

        {/* Active-aware nav (client) */}
        <ActiveNav items={NAV}/>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">
          {isPro && (
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-accent/15 text-accent border border-accent/20">
              Pro
            </span>
          )}
          <span className="text-xs text-text-secondary hidden sm:block truncate max-w-28">
            {user.name}
          </span>
          <Link href="/app/settings">
            <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-xs font-semibold text-accent hover:bg-accent/30 transition-colors cursor-pointer">
              {user.name?.charAt(0).toUpperCase() ?? "?"}
            </div>
          </Link>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
