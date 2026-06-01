"use client";

interface NotionFrameProps {
  screenshot: string | null;
  title?: string;
  mode?: "dark" | "light";
}

const SIDEBAR_PAGES = ["Getting Started","Projects","Notes","Tasks","Archive"];

export function NotionFrame({ screenshot, title = "My Page", mode = "dark" }: NotionFrameProps) {
  const isDark = mode === "dark";
  const appBg   = isDark ? "#191919" : "#ffffff";
  const sideBg  = isDark ? "#202020" : "#f7f7f5";
  const textMain = isDark ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.82)";
  const textDim  = isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)";
  const borderC  = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  return (
    <div style={{ borderRadius: "10px", overflow: "hidden", fontFamily: "-apple-system,BlinkMacSystemFont,sans-serif", boxShadow: isDark ? "0 25px 60px rgba(0,0,0,0.65),0 0 0 0.5px rgba(255,255,255,0.07)" : "0 25px 60px rgba(0,0,0,0.2),0 0 0 0.5px rgba(0,0,0,0.08)" }}>
      {/* Title bar */}
      <div style={{ background: sideBg, height: 40, display: "flex", alignItems: "center", padding: "0 14px", gap: 8, borderBottom: `1px solid ${borderC}` }}>
        {(["#ff5f57","#febc2e","#28c840"] as const).map(c => (
          <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }}/>
        ))}
        <div style={{ flex: 1, textAlign: "center", fontSize: 12, color: textDim }}>Notion</div>
      </div>

      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <div style={{ width: 220, background: sideBg, borderRight: `1px solid ${borderC}`, flexShrink: 0, padding: "12px 8px" }}>
          {/* Workspace */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", marginBottom: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: 4, background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "white", flexShrink: 0 }}>M</div>
            <span style={{ fontSize: 13, fontWeight: 600, color: textMain }}>My Workspace</span>
          </div>
          {/* Search */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 8px", marginBottom: 8, borderRadius: 4, background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={textDim} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
            <span style={{ fontSize: 12, color: textDim }}>Search</span>
          </div>
          {/* Pages */}
          {SIDEBAR_PAGES.map((page, i) => (
            <div key={page} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 8px", borderRadius: 4, background: i === 0 ? (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)") : "transparent", marginBottom: 1 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? textMain : textDim} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>
              </svg>
              <span style={{ fontSize: 13, color: i === 0 ? textMain : textDim }}>{page}</span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, background: appBg, display: "flex", flexDirection: "column" }}>
          {/* Page toolbar */}
          <div style={{ height: 36, display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 12px", gap: 6, borderBottom: `1px solid ${borderC}` }}>
            {["Share","Updates","Favorite"].map(btn => (
              <div key={btn} style={{ fontSize: 11, color: textDim, padding: "3px 8px", borderRadius: 4, cursor: "default", background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)" }}>{btn}</div>
            ))}
          </div>
          {/* Page content */}
          <div style={{ flex: 1, padding: "24px 48px 16px", overflow: "hidden" }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: textMain, margin: "0 0 16px", lineHeight: 1.2 }}>{title}</h1>
            {screenshot ? (
              <div style={{ lineHeight: 0, borderRadius: 4, overflow: "hidden" }}>
                <img src={screenshot} alt="Screenshot" style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "top" }}/>
              </div>
            ) : (
              <div style={{ color: textDim, fontSize: 14 }}>Drop screenshot here</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
