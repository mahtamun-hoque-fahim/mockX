"use client";
import { useState } from "react";

interface DockProps {
  mode?: "dark" | "light";
  activeApp?: string;
}

const DOCK_APPS = [
  { name: "Finder" },
  { name: "Safari" },
  { name: "Mail" },
  { name: "Photos" },
  { name: "Messages" },
  { name: "Music" },
  { name: "Settings" },
];

// Minimal SVG icons for each dock app
function DockIcon({ name, active }: { name: string; active: boolean }) {
  const s = { stroke: "white", strokeWidth: "1.4", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
  const icons: Record<string, React.ReactNode> = {
    Finder: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="3" {...s}/>
        <path d="M3 9h18" {...s}/>
        <circle cx="7" cy="6.5" r="1" fill="white" opacity=".6"/>
        <circle cx="10.5" cy="6.5" r="1" fill="white" opacity=".6"/>
        <circle cx="14" cy="6.5" r="1" fill="white" opacity=".6"/>
        <path d="M8 14l2.5-3 2 2.5 1.5-1.5L17 16H7l1-2z" fill="white" opacity=".5" stroke="none"/>
      </svg>
    ),
    Safari: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" {...s}/>
        <path d="M12 3v18M3 12h18" stroke="white" strokeWidth=".6" opacity=".3"/>
        <circle cx="12" cy="12" r="2" fill="white"/>
        <path d="M8 8l3.5 3 4.5 4.5-4.5-3L8 8z" fill="white" opacity=".85" stroke="none"/>
      </svg>
    ),
    Mail: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="13" rx="2.5" {...s}/>
        <path d="M3 8l9 6 9-6" {...s}/>
      </svg>
    ),
    Photos: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="15" rx="2.5" {...s}/>
        <circle cx="8.5" cy="10.5" r="2" {...s}/>
        <path d="M3 17l5-5 3.5 3.5L16 11l5 6" {...s}/>
      </svg>
    ),
    Messages: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 4h16a2 2 0 012 2v9a2 2 0 01-2 2H8l-4 3V6a2 2 0 012-2z" {...s}/>
        <path d="M8 10h8M8 13h5" {...s}/>
      </svg>
    ),
    Music: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 18V6l12-2v12" {...s}/>
        <circle cx="6" cy="18" r="3" {...s}/>
        <circle cx="18" cy="16" r="3" {...s}/>
      </svg>
    ),
    Settings: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" {...s}/>
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" {...s}/>
      </svg>
    ),
  };
  return icons[name] ?? null;
}

export function MacOSDock({ mode = "dark", activeApp = "Safari" }: DockProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const isDark = mode === "dark";

  return (
    <div
      className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-end gap-1.5 px-2.5 py-1.5"
      style={{
        background: isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.5)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.08)"}`,
        borderRadius: 18,
        boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.4)" : "0 4px 24px rgba(0,0,0,0.15)",
      }}
    >
      {DOCK_APPS.map((app) => {
        const isHovered = hovered === app.name;
        const isActive = activeApp === app.name;
        return (
          <div
            key={app.name}
            className="flex flex-col items-center gap-0.5"
            onMouseEnter={() => setHovered(app.name)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className="flex items-center justify-center rounded-xl transition-all duration-150"
              style={{
                width: 44,
                height: 44,
                transform: isHovered ? "scale(1.2) translateY(-5px)" : "scale(1)",
                background: isActive
                  ? "linear-gradient(135deg,#007aff,#5ac8fa)"
                  : isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                boxShadow: isActive ? "0 2px 12px rgba(0,122,255,0.35)" : "none",
              }}
            >
              <DockIcon name={app.name} active={isActive} />
            </div>
            {isActive && (
              <div className="w-1 h-1 rounded-full" style={{ background: isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.4)" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}
