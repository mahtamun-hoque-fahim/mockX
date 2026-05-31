"use client";
import { useState } from "react";

interface FirefoxFrameProps {
  screenshot: string | null;
  url?: string;
  title?: string;
  mode?: "dark" | "light";
}

export function FirefoxFrame({ screenshot, url = "https://example.com", title, mode = "dark" }: FirefoxFrameProps) {
  const [tlHovered, setTlHovered] = useState(false);
  const isDark = mode === "dark";

  return (
    <div style={{ borderRadius: "10px", overflow: "hidden", fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", boxShadow: isDark ? "0 25px 60px rgba(0,0,0,0.65), 0 0 0 0.5px rgba(255,255,255,0.07)" : "0 25px 60px rgba(0,0,0,0.2), 0 0 0 0.5px rgba(0,0,0,0.1)" }}>
      {/* Toolbar */}
      <div style={{ background: isDark ? "#38383d" : "#e0e0e3", padding: "8px 12px 0" }}>
        {/* Tab row */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 0, marginBottom: 0 }}>
          <div
            style={{ display: "flex", gap: 6, alignItems: "center", paddingBottom: 7 }}
            onMouseEnter={() => setTlHovered(true)}
            onMouseLeave={() => setTlHovered(false)}
          >
            {(["#ff5f57","#febc2e","#28c840"] as const).map(c => (
              <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
            ))}
          </div>
          {/* Active tab */}
          <div style={{ marginLeft: 8, background: isDark ? "#1d1b1e" : "#f9f9fb", borderRadius: "6px 6px 0 0", padding: "6px 14px", fontSize: 11, color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", gap: 5, minWidth: 140 }}>
            {/* Firefox fox icon simplified */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5.5" fill="#ff6611"/>
              <path d="M6 2C4 2 2.5 3.5 2.5 5.5C2.5 7.8 4.5 9.5 6.5 9.5C8 9.5 9.5 8.5 9.5 6.5C9.5 5 8.5 4 7.5 3.5C8 4.5 8 5.5 7 6C6 5.5 5 4.5 6 2Z" fill="#ffaa00"/>
            </svg>
            <span className="truncate">{title || url.replace(/^https?:\/\//, "").split("/")[0]}</span>
          </div>
          <span style={{ marginLeft: 3, marginBottom: 5, color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)", fontSize: 15 }}>+</span>
        </div>

        {/* Nav bar */}
        <div style={{ background: isDark ? "#1d1b1e" : "#f9f9fb", display: "flex", alignItems: "center", gap: 6, padding: "5px 10px" }}>
          {["←","→","↻"].map((a, i) => (
            <span key={i} style={{ color: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)", fontSize: 14, userSelect: "none" }}>{a}</span>
          ))}
          {/* Address bar */}
          <div style={{ flex: 1, background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)", borderRadius: 8, padding: "3.5px 10px", display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="9" height="11" viewBox="0 0 9 12" fill="none">
              <rect x="0.5" y="4" width="8" height="7.5" rx="1.5" fill={isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.22)"} />
              <path d="M2.5 4V2.5C2.5 1.1 7 1.1 7 2.5V4" stroke={isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.22)"} strokeWidth="1.1" fill="none" />
            </svg>
            <span style={{ fontSize: 11, color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)" }}>{url}</span>
          </div>
          {/* Extensions / menu */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)"} strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="5" r="1.5" fill="currentColor"/>
            <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
            <circle cx="12" cy="19" r="1.5" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div style={{ background: isDark ? "#1d1b1e" : "#fff", lineHeight: 0, overflow: "hidden" }}>
        {screenshot
          ? <img src={screenshot} alt="Screenshot" style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "top" }} />
          : <div style={{ height: 240, display: "flex", alignItems: "center", justifyContent: "center", color: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)", fontSize: 13, lineHeight: 1 }}>Drop screenshot here</div>
        }
      </div>
    </div>
  );
}
