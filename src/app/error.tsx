"use client";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#0a0c10", color: "#f2f2f3", fontFamily: "-apple-system,BlinkMacSystemFont,sans-serif", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", textAlign: "center" }}>
        <div style={{ maxWidth: 420, padding: "0 24px" }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,95,87,0.12)", border: "1px solid rgba(255,95,87,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff5f57" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4M12 16h.01"/>
            </svg>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Something went wrong</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginBottom: 24, lineHeight: 1.6 }}>
            An unexpected error occurred. This has been noted.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button
              onClick={reset}
              style={{ padding: "10px 22px", borderRadius: 10, background: "#6c63ff", color: "white", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{ padding: "10px 22px", borderRadius: 10, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 13, textDecoration: "none" }}
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
