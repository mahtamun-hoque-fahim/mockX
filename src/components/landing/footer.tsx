import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/7 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="3" width="12" height="9" rx="2" stroke="white" strokeWidth="1.4"/>
              <path d="M1 6h12" stroke="white" strokeWidth="1.4"/>
            </svg>
          </div>
          <span className="font-syne font-bold text-sm text-text-primary">mock<span className="text-accent">X</span></span>
        </div>

        <nav className="flex items-center gap-6 text-sm text-text-secondary">
          {[["#features","Features"],["#pricing","Pricing"],["/login","Sign in"],["/signup","Sign up"]].map(([href,label]) => (
            <Link key={href} href={href} className="hover:text-text-primary transition-colors">{label}</Link>
          ))}
        </nav>

        <p className="text-xs text-text-secondary">
          &copy; {new Date().getFullYear()} mockX · Built by Mahtamun
        </p>
      </div>
    </footer>
  );
}
