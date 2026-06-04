export default function AppLoading() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        {/* Animated logo */}
        <div className="relative">
          <div
            className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center"
            style={{ animation: "pulse 1.5s ease-in-out infinite" }}
          >
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="3" width="12" height="9" rx="2" stroke="rgba(108,99,255,0.8)" strokeWidth="1.4"/>
              <path d="M1 6h12" stroke="rgba(108,99,255,0.8)" strokeWidth="1.4"/>
            </svg>
          </div>
          <div
            className="absolute inset-0 rounded-xl border border-accent/40"
            style={{ animation: "ping 1.5s ease-in-out infinite" }}
          />
        </div>
        <p className="text-xs text-text-secondary">Loading…</p>
      </div>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes ping  { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.6);opacity:0} }
      `}</style>
    </div>
  );
}
