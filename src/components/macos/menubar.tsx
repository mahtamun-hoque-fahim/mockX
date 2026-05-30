"use client";
import { useState, useEffect } from "react";

interface MenuBarProps {
  mode?: "dark" | "light";
  customTime?: string;
}

export function MacOSMenuBar({ mode = "dark", customTime }: MenuBarProps) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    if (customTime) return;
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, [customTime]);

  const time = customTime
    ? customTime
    : now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
  const date = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const isDark = mode === "dark";

  return (
    <div
      className="flex items-center justify-between px-3 select-none"
      style={{
        height: 24,
        background: isDark ? "rgba(28,28,30,0.92)" : "rgba(236,236,236,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        fontSize: 12,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        color: isDark ? "rgba(255,255,255,0.88)" : "rgba(0,0,0,0.85)",
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-3.5">
        <svg
          width="13"
          height="15"
          viewBox="0 0 13 15"
          fill={isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)"}
        >
          <path d="M10.5 7.9C10.5 6.2 11.5 5.3 11.5 5.3C10.6 4.1 9.3 3.9 8.8 3.9C7.6 3.8 6.4 4.6 5.8 4.6C5.2 4.6 4.1 3.9 3.2 3.9C1.7 3.9 0 5.1 0 7.6C0 10.9 2.1 14.1 3.4 14.1C4.1 14.1 4.8 13.5 5.8 13.5C6.8 13.5 7.4 14.1 8.3 14.1C9.7 14.1 11.5 11 11.5 11C11.5 11 10.5 10.5 10.5 7.9ZM8.2 2.8C8.8 2.1 9.2 1.1 9.1 0C8.2 0.1 7.1 0.6 6.4 1.3C5.8 1.9 5.3 2.9 5.5 3.9C6.5 3.9 7.6 3.4 8.2 2.8Z" />
        </svg>
        {["Finder", "File", "Edit", "View", "Go", "Window", "Help"].map(
          (item, i) => (
            <span key={item} style={{ fontWeight: i === 0 ? 600 : 400 }}>
              {item}
            </span>
          )
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Battery */}
        <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="19"
            height="10"
            rx="2.5"
            stroke={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)"}
          />
          <rect
            x="2"
            y="2"
            width="13"
            height="7"
            rx="1"
            fill={isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)"}
          />
          <path
            d="M20.5 3.5V7.5"
            stroke={isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)"}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        {/* WiFi */}
        <svg
          width="14"
          height="11"
          viewBox="0 0 16 12"
          fill={isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)"}
        >
          <path d="M8 9a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM8 6.5C6.1 6.5 4.4 7.3 3.1 8.6l1.3 1.3C5.3 9 6.6 8.5 8 8.5s2.7.5 3.6 1.4l1.3-1.3C11.6 7.3 9.9 6.5 8 6.5zM8 3.5C5.3 3.5 2.8 4.6 1 6.4l1.3 1.3C3.8 6 5.8 5 8 5s4.2 1 5.7 2.7L15 6.4C13.2 4.6 10.7 3.5 8 3.5zM8 0C4.4 0 1.1 1.4-.7 3.7L.6 5C2.8 2.7 5.3 1.5 8 1.5s5.2 1.2 7.4 3.5l1.3-1.3C14.9 1.4 11.6 0 8 0z" />
        </svg>
        <span style={{ fontSize: 11.5 }}>{date}</span>
        <span style={{ fontSize: 11.5, fontWeight: 500 }}>{time}</span>
      </div>
    </div>
  );
}
