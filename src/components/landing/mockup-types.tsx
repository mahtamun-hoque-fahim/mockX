import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Laptop, Monitor } from "lucide-react";

function TypeCard({
  icon: Icon,
  badge,
  title,
  description,
  features,
  href,
  gradient,
}: {
  icon: React.ElementType;
  badge: string;
  title: string;
  description: string;
  features: string[];
  href: string;
  gradient: string;
}) {
  return (
    <div className="flex-1 rounded-2xl border border-white/8 bg-surface overflow-hidden flex flex-col">
      {/* Visual preview */}
      <div className="h-48 relative overflow-hidden" style={{ background: gradient }}>
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <Icon size={80} strokeWidth={1}/>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16" style={{ background: "linear-gradient(to top,var(--surface),transparent)" }}/>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-accent/25 bg-accent/8 text-accent text-xs font-medium w-fit mb-4">
          <Icon size={10}/>
          {badge}
        </div>
        <h3 className="font-syne font-bold text-xl text-text-primary mb-2">{title}</h3>
        <p className="text-text-secondary text-sm mb-5 leading-relaxed">{description}</p>
        <ul className="space-y-2 mb-6">
          {features.map(f => (
            <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5.5" fill="rgba(108,99,255,0.15)" stroke="rgba(108,99,255,0.3)"/>
                <path d="M3.5 6l1.5 1.5L8.5 4" stroke="#6C63FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {f}
            </li>
          ))}
        </ul>
        <Link href={href} className="mt-auto">
          <Button variant="secondary" className="w-full text-sm">Open {badge}</Button>
        </Link>
      </div>
    </div>
  );
}

export function MockupTypes() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-syne font-bold text-4xl text-text-primary mb-3">Two ways to mockup</h2>
          <p className="text-text-secondary text-lg">Pick the format that fits your use case</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <TypeCard
            icon={Laptop}
            badge="Scene Mockup"
            title="Full MacBook on a desk"
            description="Generate a complete product-photo-style mockup. Choose your MacBook model, desk environment, and day/night lighting."
            features={[
              "MacBook Air 13/15 M4 · Pro 14/16 M4",
              "4 MacBook color options",
              "5 desk environments",
              "Day & night lighting toggle",
              "Changeable canvas background",
              "Export at 1×, 2×, or 3×",
            ]}
            href="/app/scene"
            gradient="linear-gradient(135deg,#1a1c22,#302b63)"
          />
          <TypeCard
            icon={Monitor}
            badge="Screen Mockup"
            title="macOS desktop screenshot"
            description="Wrap your screenshot in a realistic macOS environment. Pick any app frame — Safari, Chrome, Arc, VS Code, and more."
            features={[
              "6 app frames — Safari, Chrome, Arc, VS Code…",
              "macOS Light & Dark mode",
              "8 wallpaper presets",
              "Paste with ⌘V or drag & drop",
              "Editable URL & window title",
              "Dock show/hide toggle",
            ]}
            href="/app/screen"
            gradient="linear-gradient(135deg,#0f3460,#533483)"
          />
        </div>
      </div>
    </section>
  );
}
