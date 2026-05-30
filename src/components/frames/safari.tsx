"use client";
import { useState } from "react";

interface SafariFrameProps {
  screenshot: string | null;
  url?: string;
  title?: string;
  mode?: "dark" | "light";
}

function TrafficLight({
  color,
  hovered,
}: {
  color: "red" | "yellow" | "green";
  hovered: boolean;
}) {
  const cfg = {
    red: { bg: "#ff5f57", ring: "#e0443e", path: "M7,4 L4,7 M4,4 L7,7" },
    yellow: { bg: "#febc2e", ring: "#d4a017", path: "M5.5,3 L5.5,8" },
    green: {
      bg: "#28c840",
      ring: "#1aab29",
      path: "M3,5.5 L5,7.5 L8,3.5",
    },
  };
  const c = cfg[color];
  return (
    <div
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: c.bg,
        boxShadow: `0 0 0 0.5px ${c.ring}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {hovered && (
        <svg width="8" height="8" viewBox="0 0 11 11" fill="none">
          <path
            d={c.path}
            stroke="rgba(0,0,0,0.55)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}

export function SafariFrame({
  screenshot,
  url = "https://example.com",
  title,
  mode = "dark",
}: SafariFrameProps) {
  const [tlHovered, setTlHovered] = useState(false);
  const isDark = mode === "dark";
  const displayUrl = url.replace(/^https?:\/\//, "").split("/")[0];

  return (
    <div
      style={{
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: isDark
          ? "0 25px 60px rgba(0,0,0,0.65), 0 0 0 0.5px rgba(255,255,255,0.07)"
          : "0 25px 60px rgba(0,0,0,0.2), 0 0 0 0.5px rgba(0,0,0,0.1)",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
      }}
    >
      {/* Tab bar */}
      <div
        style={{
          background: isDark
            ? "linear-gradient(180deg,#3a3a3c,#2c2c2e)"
            : "linear-gradient(180deg,#ececec,#e0e0e0)",
          padding: "8px 12px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 6,
          }}
        >
          <div
            style={{ display: "flex", gap: 6 }}
            onMouseEnter={() => setTlHovered(true)}
            onMouseLeave={() => setTlHovered(false)}
          >
            <TrafficLight color="red" hovered={tlHovered} />
            <TrafficLight color="yellow" hovered={tlHovered} />
            <TrafficLight color="green" hovered={tlHovered} />
          </div>
          <div
            style={{
              flex: 1,
              background: isDark ? "#1c1c1e" : "#d0d0d0",
              borderRadius: "8px 8px 0 0",
              padding: "5px 14px",
              fontSize: 11,
              color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.75)",
              display: "flex",
              alignItems: "center",
              gap: 5,
              maxWidth: 200,
            }}
          >
            <div
              style={{
                width: 13,
                height: 13,
                borderRadius: 3,
                background: "linear-gradient(135deg,#007aff,#5ac8fa)",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="8" height="8" viewBox="0 0 9 9" fill="none">
                <circle
                  cx="4.5"
                  cy="4.5"
                  r="3.5"
                  stroke="white"
                  strokeWidth="0.8"
                />
                <path
                  d="M4.5 1.5 C4.5 1.5 6 3 6 4.5 C6 6 4.5 7.5 4.5 7.5 C4.5 7.5 3 6 3 4.5 C3 3 4.5 1.5 4.5 1.5Z M1.5 4.5 L7.5 4.5"
                  stroke="white"
                  strokeWidth="0.6"
                  fill="none"
                />
              </svg>
            </div>
            <span className="truncate">{title || displayUrl}</span>
          </div>
          <span
            style={{
              color: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)",
              fontSize: 15,
              lineHeight: 1,
            }}
          >
            +
          </span>
        </div>

        {/* Toolbar */}
        <div
          style={{
            background: isDark ? "#1c1c1e" : "#d8d8d8",
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 8px",
          }}
        >
          {["←", "→"].map((a, i) => (
            <span
              key={i}
              style={{
                color: isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.2)",
                fontSize: 15,
                userSelect: "none",
                padding: "0 2px",
              }}
            >
              {a}
            </span>
          ))}
          <div
            style={{
              flex: 1,
              background: isDark
                ? "rgba(255,255,255,0.07)"
                : "rgba(0,0,0,0.06)",
              borderRadius: 6,
              padding: "3.5px 10px",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <svg width="9" height="11" viewBox="0 0 9 12" fill="none">
              <rect
                x="1"
                y="4.5"
                width="7"
                height="7"
                rx="1.5"
                fill={
                  isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.25)"
                }
              />
              <path
                d="M2.5 4.5V3C2.5 1.9 7 1.9 7 3V4.5"
                stroke={isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.25)"}
                strokeWidth="1.1"
                fill="none"
              />
            </svg>
            <span
              style={{
                fontSize: 11,
                color: isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.6)",
                letterSpacing: 0.1,
              }}
            >
              {url}
            </span>
          </div>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1V9M4 4L7 1L10 4M2 9V13H12V9"
              stroke={isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)"}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          background: isDark ? "#1c1c1e" : "#ffffff",
          lineHeight: 0,
          overflow: "hidden",
        }}
      >
        {screenshot ? (
          <img
            src={screenshot}
            alt="Screenshot"
            style={{
              width: "100%",
              display: "block",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        ) : (
          <div
            style={{
              height: 240,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
              fontSize: 13,
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            }}
          >
            Drop screenshot here
          </div>
        )}
      </div>
    </div>
  );
}
