"use client";

interface FinderFrameProps {
  screenshot: string | null;
  title?: string;
  mode?: "dark" | "light";
}

const SIDEBAR_ITEMS = [
  { section: true, label: "Favourites" },
  { label: "Documents" },
  { label: "Downloads" },
  { label: "Desktop" },
  { label: "Applications" },
  { section: true, label: "iCloud" },
  { label: "iCloud Drive" },
];

export function FinderFrame({ screenshot, title = "Documents", mode = "dark" }: FinderFrameProps) {
  const isDark = mode === "dark";
  const sidebarBg = isDark ? "#252526" : "#e4e4e4";
  const contentBg = isDark ? "#1e1e1e" : "#f6f6f6";
  const textColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";
  const dimColor = isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.2)";

  return (
    <div style={{ borderRadius: "10px", overflow: "hidden", fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", boxShadow: isDark ? "0 25px 60px rgba(0,0,0,0.65), 0 0 0 0.5px rgba(255,255,255,0.07)" : "0 25px 60px rgba(0,0,0,0.2)" }}>
      {/* Title bar */}
      <div style={{ background: isDark ? "#2d2d2f" : "#e0e0e0", padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
        {(["#ff5f57","#febc2e","#28c840"] as const).map(c => (
          <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
        ))}
        <div style={{ flex: 1, textAlign: "center", fontSize: 12, fontWeight: 600, color: textColor }}>{title}</div>
        <div style={{ width: 28 }} />
      </div>

      {/* Toolbar */}
      <div style={{ background: isDark ? "#2d2d2f" : "#e8e8e8", padding: "4px 12px", display: "flex", alignItems: "center", gap: 8, borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}` }}>
        {/* Back / Forward */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={dimColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={dimColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        <div style={{ flex: 1 }} />
        {/* View toggles */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={dimColor} strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
        {/* Search */}
        <div style={{ background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)", borderRadius: 6, padding: "2px 8px", display: "flex", alignItems: "center", gap: 4 }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={dimColor} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
          <span style={{ fontSize: 10, color: dimColor }}>Search</span>
        </div>
      </div>

      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <div style={{ width: 140, background: sidebarBg, padding: "8px 6px", display: "flex", flexDirection: "column", gap: 1, flexShrink: 0 }}>
          {SIDEBAR_ITEMS.map((item, i) =>
            item.section ? (
              <div key={i} style={{ padding: "6px 8px 2px", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.06em", color: isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)" }}>
                {item.label}
              </div>
            ) : (
              <div key={i} style={{ padding: "4px 8px", borderRadius: 5, fontSize: 11, color: item.label === title ? "white" : textColor, background: item.label === title ? (isDark ? "rgba(0,122,255,0.5)" : "#007aff") : "transparent", cursor: "default" }}>
                {item.label}
              </div>
            )
          )}
        </div>
        {/* Content */}
        <div style={{ flex: 1, background: contentBg, lineHeight: 0, overflow: "hidden" }}>
          {screenshot
            ? <img src={screenshot} alt="Screenshot" style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "top" }} />
            : <div style={{ height: 240, display: "flex", alignItems: "center", justifyContent: "center", color: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)", fontSize: 13, lineHeight: 1 }}>Drop screenshot here</div>
          }
        </div>
      </div>
    </div>
  );
}
