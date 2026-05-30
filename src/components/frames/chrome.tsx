"use client";
import { useState } from "react";

interface ChromeFrameProps {
  screenshot: string | null;
  url?: string;
  title?: string;
  mode?: "dark" | "light";
}

export function ChromeFrame({
  screenshot,
  url = "https://example.com",
  title,
  mode = "dark",
}: ChromeFrameProps) {
  const [tlHovered, setTlHovered] = useState(false);
  const isDark = mode === "dark";

  return (
    <div
      style={{
        borderRadius: "10px",
        overflow: "hidden",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Google Sans', sans-serif",
        boxShadow: isDark
          ? "0 25px 60px rgba(0,0,0,0.65), 0 0 0 0.5px rgba(255,255,255,0.07)"
          : "0 25px 60px rgba(0,0,0,0.2), 0 0 0 0.5px rgba(0,0,0,0.1)",
      }}
    >
      {/* Chrome toolbar */}
      <div
        style={{
          background: isDark ? "#35363a" : "#dee1e6",
          padding: "10px 12px 0",
        }}
      >
        {/* Tab row */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 0 }}>
          <div
            style={{ display: "flex", gap: 6, alignItems: "center", paddingBottom: 8 }}
            onMouseEnter={() => setTlHovered(true)}
            onMouseLeave={() => setTlHovered(false)}
          >
            {(["red", "yellow", "green"] as const).map((c) => {
              const colors = {
                red: "#ff5f57",
                yellow: "#febc2e",
                green: "#28c840",
              };
              return (
                <div
                  key={c}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: colors[c],
                  }}
                />
              );
            })}
          </div>
          {/* Tab */}
          <div
            style={{
              marginLeft: 8,
              background: isDark ? "#292a2e" : "#f1f3f4",
              borderRadius: "8px 8px 0 0",
              padding: "6px 16px",
              fontSize: 11,
              color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.75)",
              display: "flex",
              alignItems: "center",
              gap: 5,
              minWidth: 140,
            }}
          >
            {/* Chrome favicon circle */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5.5" fill="#4285f4" />
              <circle cx="6" cy="6" r="2.5" fill="white" />
            </svg>
            <span className="truncate">{title || url.replace(/^https?:\/\//, "").split("/")[0]}</span>
          </div>
          <span
            style={{
              marginLeft: 4,
              marginBottom: 6,
              color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)",
              fontSize: 14,
            }}
          >
            +
          </span>
        </div>

        {/* Address bar row */}
        <div
          style={{
            background: isDark ? "#292a2e" : "#f1f3f4",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 10px",
          }}
        >
          {["←", "→", "↻"].map((icon, i) => (
            <span
              key={i}
              style={{
                color: isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.25)",
                fontSize: 14,
                userSelect: "none",
              }}
            >
              {icon}
            </span>
          ))}
          <div
            style={{
              flex: 1,
              background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
              borderRadius: 20,
              padding: "3.5px 12px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 12" fill="none">
              <rect
                x="1"
                y="4"
                width="8"
                height="7.5"
                rx="1.5"
                fill={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)"}
              />
              <path
                d="M3 4V2.5C3 1.1 7.5 1.1 7.5 2.5V4"
                stroke={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)"}
                strokeWidth="1.1"
                fill="none"
              />
            </svg>
            <span style={{ fontSize: 11, color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)" }}>
              {url}
            </span>
          </div>
          {/* Profile + Extensions */}
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#4285f4", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontSize: 11, fontWeight: 600 }}>M</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ background: isDark ? "#292a2e" : "#fff", lineHeight: 0, overflow: "hidden" }}>
        {screenshot ? (
          <img src={screenshot} alt="Screenshot" style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "top" }} />
        ) : (
          <div style={{ height: 240, display: "flex", alignItems: "center", justifyContent: "center", color: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)", fontSize: 13 }}>
            Drop screenshot here
          </div>
        )}
      </div>
    </div>
  );
}
