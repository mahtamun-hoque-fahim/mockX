"use client";

interface VSCodeFrameProps {
  screenshot: string | null;
  title?: string;
  mode?: "dark" | "light";
}

function ActivityIcon({ path }: { path: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

const ACTIVITY_ICONS = [
  "M3 12h18M3 6h18M3 18h18",          // explorer
  "M11 11a4 4 0 100-8 4 4 0 000 8zM21 21l-4.35-4.35", // search
  "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77", // git
  "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", // extensions
];

export function VSCodeFrame({ screenshot, title = "index.tsx", mode = "dark" }: VSCodeFrameProps) {
  const isDark = mode === "dark";

  return (
    <div style={{ borderRadius: "10px", overflow: "hidden", fontFamily: "'JetBrains Mono','Cascadia Code',monospace", boxShadow: isDark ? "0 25px 60px rgba(0,0,0,0.65), 0 0 0 0.5px rgba(255,255,255,0.07)" : "0 25px 60px rgba(0,0,0,0.2)" }}>
      {/* Title bar */}
      <div style={{ background: isDark ? "#323233" : "#dddddd", padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
        {(["#ff5f57","#febc2e","#28c840"] as const).map(c => (
          <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
        ))}
        <span style={{ flex: 1, textAlign: "center", fontSize: 11, color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)" }}>
          {title} — Visual Studio Code
        </span>
      </div>

      <div style={{ display: "flex" }}>
        {/* Activity bar */}
        <div style={{ width: 44, background: isDark ? "#2c2c2c" : "#e8e8e8", display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 0", gap: 4, flexShrink: 0 }}>
          {ACTIVITY_ICONS.map((path, i) => (
            <div key={i} style={{ width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", borderLeft: i === 0 ? "2px solid rgba(255,255,255,0.7)" : "2px solid transparent" }}>
              <ActivityIcon path={path} />
            </div>
          ))}
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Tab bar */}
          <div style={{ background: isDark ? "#252526" : "#ececec", display: "flex", alignItems: "stretch" }}>
            <div style={{ padding: "6px 16px", background: isDark ? "#1e1e1e" : "#fff", fontSize: 11, color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.75)", borderBottom: `1px solid ${isDark ? "#007acc" : "#005fb8"}`, display: "flex", gap: 5, alignItems: "center" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#e8bf6a" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              {title}
            </div>
          </div>

          {/* Content */}
          <div style={{ background: isDark ? "#1e1e1e" : "#fff", lineHeight: 0, overflow: "hidden" }}>
            {screenshot
              ? <img src={screenshot} alt="Screenshot" style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "top" }} />
              : <div style={{ height: 240, display: "flex", alignItems: "center", justifyContent: "center", color: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)", fontSize: 13, lineHeight: 1 }}>Drop screenshot here</div>
            }
          </div>

          {/* Status bar */}
          <div style={{ background: "#007acc", padding: "2px 10px", display: "flex", alignItems: "center", gap: 12 }}>
            {["main","⚠ 0","✓ 0","Ln 1, Col 1"].map((item, i) => (
              <span key={i} style={{ fontSize: 10, color: "rgba(255,255,255,0.85)" }}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
