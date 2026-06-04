import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with the basics",
    features: [
      "Both mockup types",
      "All app frames",
      "Export at 1× & 2×",
      "Save up to 20 mockups",
      "8 wallpaper presets",
      "Watermark on exports",
    ],
    cta: "Get started free",
    href: "/signup",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "For designers & developers who ship",
    features: [
      "Everything in Free",
      "Export at 3× (ultra sharp)",
      "No watermark",
      "Unlimited saved mockups",
      "Custom background upload",
      "Public share links",
      "Priority support",
    ],
    cta: "Upgrade to Pro — $9/mo",
    href: "/api/billing/checkout",
    highlight: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-syne font-bold text-4xl text-text-primary mb-3">Simple pricing</h2>
          <p className="text-text-secondary text-lg">Start free. Upgrade when you need more.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PLANS.map(plan => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-8 flex flex-col ${plan.highlight ? "border-accent/40 bg-accent/5 relative overflow-hidden" : "border-white/8 bg-surface"}`}
            >
              {plan.highlight && (
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"/>
              )}

              {plan.highlight && (
                <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-accent text-white text-[10px] font-semibold uppercase tracking-wide">
                  Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-syne font-bold text-xl text-text-primary mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-syne font-bold text-text-primary">{plan.price}</span>
                  <span className="text-text-secondary text-sm">/{plan.period}</span>
                </div>
                <p className="text-text-secondary text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-text-secondary">
                    <Check size={14} className={plan.highlight ? "text-accent" : "text-text-secondary"}/>
                    {f}
                  </li>
                ))}
              </ul>

              <Link href={plan.href}>
                <Button variant={plan.highlight ? "primary" : "secondary"} className="w-full" size="lg">
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
