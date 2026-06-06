"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Monitor, Laptop, Images, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/screen",    label: "Screen",    icon: Monitor          },
  { href: "/app/scene",     label: "Scene",     icon: Laptop           },
  { href: "/app/mockups",   label: "Saved",     icon: Images           },
  { href: "/app/settings",  label: "Settings",  icon: Settings         },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-white/7 flex items-stretch"
      style={{ background: "rgba(10,12,16,0.96)", backdropFilter: "blur(16px)" }}
    >
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition-colors",
              active ? "text-accent" : "text-text-secondary hover:text-text-primary"
            )}
          >
            <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
