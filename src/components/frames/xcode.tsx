"use client";

interface XcodeFrameProps {
  screenshot: string | null;
  title?: string;
  mode?: "dark" | "light";
}

const NAV_ITEMS = ["MyApp","Views","Models","Controllers","Tests","Assets"];

export function XcodeFrame({ screenshot, title = "ContentView.swift", mode = "dark" }: XcodeFrameProps) {
  const isDark = mode === "dark";
  const toolbarBg = isDark ? "#2b2b2b" : "#e8e8e8";
  const navBg     = isDark ? "#222222" : "#e0e0e0";
  const editorBg  = isDark ? "#1e1e1e" : "#ffffff";
  const textDim   = isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)";
  const textMain  = isDark ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.82)";
  const borderC   = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";

  return (
    <div style={{ borderRadius: "10px", overflow: "hidden", fontFamily: "-apple-system,BlinkMacSystemFont,'SF Pro Text',sans-serif", boxShadow: isDark ? "0 25px 60px rgba(0,0,0,0.65),0 0 0 0.5px rgba(255,255,255,0.07)" : "0 25px 60px rgba(0,0,0,0.2)" }}>
      {/* Toolbar */}
      <div style={{ background: toolbarBg, height: 44, display: "flex", alignItems: "center", padding: "0 14px", gap: 8, borderBottom: `1px solid ${borderC}` }}>
        {(["#ff5f57","#febc2e","#28c840"] as const).map(c => (
          <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }}/>
        ))}
        <div style={{ width: 6 }}/>
        {/* Run/Stop */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2l8 4-8 4V2z" fill={isDark ? "#28c840" : "#1a9e2d"}/>
            </svg>
          </div>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <rect x="1.5" y="1.5" width="7" height="7" rx="1" fill={textDim}/>
            </svg>
          </div>
        </div>
        {/* Scheme */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", borderRadius: 6, padding: "4px 12px", fontSize: 11, color: textMain, display: "flex", alignItems: "center", gap: 4 }}>
            MyApp — iPhone 16 Pro
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 2.5L4 5.5L7 2.5" stroke={textDim} strokeWidth="1.2" strokeLinecap="round"/></svg>
          </div>
        </div>
        {/* Panel toggles */}
        <div style={{ display: "flex", gap: 2 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: 26, height: 26, borderRadius: 5, background: i === 0 ? (isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)") : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 14, height: 10, display: "flex", gap: 1, alignItems: "stretch" }}>
                {i === 0 && <div style={{ width: 4, background: textDim, borderRadius: 1 }}/>}
                <div style={{ flex: 1, background: textDim, borderRadius: 1 }}/>
                {i === 2 && <div style={{ width: 4, background: textDim, borderRadius: 1 }}/>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex" }}>
        {/* Navigator */}
        <div style={{ width: 200, background: navBg, borderRight: `1px solid ${borderC}`, flexShrink: 0 }}>
          {/* Nav icons */}
          <div style={{ display: "flex", borderBottom: `1px solid ${borderC}`, padding: "0 4px" }}>
            {[
              "M3 3h18M3 9h18M3 15h18",    // files
              "M11 11a4 4 0 100-8 4 4 0 000 8zM21 21l-4.35-4.35", // search
              "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2",  // issues
              "M14 2H6a2 2 0 00-2 2v16", // report
            ].map((path, i) => (
              <div key={i} style={{ flex: 1, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: i === 0 ? `2px solid #1a73e8` : "none" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? "#1a73e8" : textDim} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={path}/>
                </svg>
              </div>
            ))}
          </div>
          {/* File tree */}
          <div style={{ padding: "6px 0" }}>
            {NAV_ITEMS.map((item, i) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", background: i === 0 ? (isDark ? "rgba(26,115,232,0.2)" : "rgba(26,115,232,0.12)") : "transparent" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? "#1a73e8" : textDim} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
                </svg>
                <span style={{ fontSize: 11, color: i === 0 ? (isDark ? "#4da8ff" : "#1a73e8") : textDim }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Tab bar */}
          <div style={{ height: 28, background: isDark ? "#252525" : "#ebebeb", display: "flex", alignItems: "center", padding: "0 8px", borderBottom: `1px solid ${borderC}` }}>
            <div style={{ padding: "2px 12px", background: editorBg, borderRadius: "4px 4px 0 0", fontSize: 11, color: textMain, display: "flex", gap: 5, alignItems: "center" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#f8c337" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              {title}
            </div>
          </div>
          {/* Content */}
          <div style={{ flex: 1, background: editorBg, lineHeight: 0, overflow: "hidden" }}>
            {screenshot
              ? <img src={screenshot} alt="Screenshot" style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "top" }}/>
              : <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center", color: textDim, fontSize: 12, lineHeight: 1 }}>Drop screenshot here</div>
            }
          </div>
          {/* Status bar */}
          <div style={{ height: 20, background: "#1a73e8", display: "flex", alignItems: "center", padding: "0 10px", gap: 12 }}>
            {["Build Succeeded","0 warnings","0 errors"].map(s => (
              <span key={s} style={{ fontSize: 10, color: "rgba(255,255,255,0.85)" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
