import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Untitled mockup";
  const type  = searchParams.get("type")  ?? "screen";
  const user  = searchParams.get("user")  ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#0a0c10 0%,#0f0c29 50%,#1a1a2e 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 600,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(ellipse,rgba(108,99,255,0.18) 0%,transparent 70%)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#6C63FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="3" width="12" height="9" rx="2" stroke="white" strokeWidth="1.4"/>
              <path d="M1 6h12" stroke="white" strokeWidth="1.4"/>
            </svg>
          </div>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#F2F2F3", letterSpacing: "-0.03em" }}>
            mock<span style={{ color: "#6C63FF" }}>X</span>
          </span>
        </div>

        {/* Type badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(108,99,255,0.15)",
            border: "1px solid rgba(108,99,255,0.3)",
            borderRadius: 20,
            padding: "6px 14px",
            marginBottom: 20,
          }}
        >
          <span style={{ fontSize: 13, color: "#6C63FF", fontWeight: 600, textTransform: "capitalize" }}>
            {type} Mockup
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 40 ? 32 : 42,
            fontWeight: 700,
            color: "#F2F2F3",
            textAlign: "center",
            maxWidth: 760,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            marginBottom: user ? 20 : 0,
          }}
        >
          {title}
        </div>

        {/* Shared by */}
        {user && (
          <div style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>
            Shared by {user}
          </div>
        )}

        {/* Bottom CTA */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.35)" }}>
            Create your own at
          </span>
          <span style={{ fontSize: 14, color: "#6C63FF", fontWeight: 600 }}>
            mockx.app
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
