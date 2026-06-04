import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const size = parseInt(req.nextUrl.searchParams.get("size") ?? "512");

  return new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%)",
          borderRadius: size * 0.22,
        }}
      >
        {/* Outer glow */}
        <div
          style={{
            position: "absolute",
            width: size * 0.7,
            height: size * 0.7,
            borderRadius: "50%",
            background: "radial-gradient(ellipse,rgba(108,99,255,0.35) 0%,transparent 70%)",
          }}
        />
        {/* MacBook icon */}
        <svg
          width={size * 0.52}
          height={size * 0.52}
          viewBox="0 0 56 56"
          fill="none"
        >
          {/* Screen */}
          <rect x="8" y="6" width="40" height="28" rx="4" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>
          {/* Screen content lines */}
          <rect x="12" y="10" width="32" height="2.5" rx="1.25" fill="rgba(255,255,255,0.25)"/>
          <rect x="12" y="15" width="24" height="2.5" rx="1.25" fill="rgba(108,99,255,0.7)"/>
          <rect x="12" y="20" width="28" height="2.5" rx="1.25" fill="rgba(255,255,255,0.2)"/>
          <rect x="12" y="25" width="20" height="2.5" rx="1.25" fill="rgba(255,255,255,0.15)"/>
          {/* Hinge */}
          <rect x="6" y="34" width="44" height="3" rx="1.5" fill="rgba(255,255,255,0.2)"/>
          {/* Base */}
          <rect x="4" y="37" width="48" height="5" rx="2.5" fill="rgba(255,255,255,0.15)"/>
          {/* Trackpad */}
          <rect x="22" y="38.5" width="12" height="2" rx="1" fill="rgba(255,255,255,0.25)"/>
        </svg>
        {/* X badge */}
        <div
          style={{
            position: "absolute",
            bottom: size * 0.1,
            right: size * 0.1,
            width: size * 0.26,
            height: size * 0.26,
            borderRadius: size * 0.07,
            background: "#6C63FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(108,99,255,0.5)",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: size * 0.14,
              fontWeight: 800,
              fontFamily: "sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            X
          </span>
        </div>
      </div>
    ),
    { width: size, height: size }
  );
}
