import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-8 text-center">
      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(ellipse,rgba(108,99,255,0.1) 0%,transparent 70%)",
          top: "40%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-16">
        <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center shadow-lg shadow-accent/30">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="3" width="12" height="9" rx="2" stroke="white" strokeWidth="1.4"/>
            <path d="M1 6h12" stroke="white" strokeWidth="1.4"/>
          </svg>
        </div>
        <span className="font-syne font-bold text-base text-text-primary">
          mock<span className="text-accent">X</span>
        </span>
      </Link>

      {/* 404 display */}
      <div className="relative mb-6">
        <div
          className="font-syne font-bold text-text-primary select-none"
          style={{ fontSize: "clamp(80px,18vw,160px)", lineHeight: 1, opacity: 0.06, letterSpacing: "-0.04em" }}
        >
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <rect x="8" y="12" width="48" height="32" rx="5" stroke="rgba(108,99,255,0.4)" strokeWidth="2"/>
            <path d="M8 22h48" stroke="rgba(108,99,255,0.3)" strokeWidth="1.5"/>
            <circle cx="14" cy="17" r="2" fill="rgba(255,95,87,0.6)"/>
            <circle cx="21" cy="17" r="2" fill="rgba(254,188,46,0.6)"/>
            <circle cx="28" cy="17" r="2" fill="rgba(40,200,64,0.6)"/>
            <path d="M8 44h48M16 44v8M48 44v8M10 52h44" stroke="rgba(108,99,255,0.25)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <h1 className="font-syne font-bold text-3xl text-text-primary mb-3">Page not found</h1>
      <p className="text-text-secondary text-lg mb-8 max-w-sm">
        This mockup doesn&apos;t exist — or it was moved. Let&apos;s get you back to creating.
      </p>

      <div className="flex items-center gap-3">
        <Link href="/app/screen">
          <button className="px-6 py-3 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-hover transition-colors shadow-lg shadow-accent/25">
            Open editor
          </button>
        </Link>
        <Link href="/">
          <button className="px-6 py-3 rounded-xl bg-surface border border-white/10 text-sm text-text-secondary hover:text-text-primary hover:border-white/18 transition-all">
            Back to home
          </button>
        </Link>
      </div>
    </div>
  );
}
