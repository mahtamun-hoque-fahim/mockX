import { Upload, Sliders, Download } from "lucide-react";

const STEPS = [
  {
    icon: Upload,
    number: "01",
    title: "Drop your screenshot",
    description: "Drag and drop, paste with ⌘V, or click to upload any image. Works with any screenshot — website, app, dashboard, or code.",
  },
  {
    icon: Sliders,
    number: "02",
    title: "Choose your frame",
    description: "Pick an app frame (Safari, Chrome, Arc, VS Code…) and a macOS wallpaper. Or go full scene — put your MacBook on a desk with day or night lighting.",
  },
  {
    icon: Download,
    number: "03",
    title: "Export at any resolution",
    description: "Click Export PNG. Free users get clean 2× exports. Pro users export at 3× — sharp enough for Retina displays and print.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-syne font-bold text-4xl text-text-primary mb-3">Three steps. Thirty seconds.</h2>
          <p className="text-text-secondary text-lg">No design skills, no Figma, no friction.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <div key={i} className="relative">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px z-0" style={{ background: "linear-gradient(to right,rgba(108,99,255,0.3),transparent)", width: "calc(100% - 2rem)", left: "calc(100% + 1rem)" }} />
              )}

              <div className="relative z-10 bg-surface border border-white/7 rounded-2xl p-6 h-full">
                {/* Number */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <step.icon size={17} className="text-accent" />
                  </div>
                  <span className="font-syne font-bold text-2xl text-white/10">{step.number}</span>
                </div>

                <h3 className="font-syne font-bold text-lg text-text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
