import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 flex flex-col items-center text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/8 text-accent text-xs font-medium mb-8 animate-fade-in">
        <Sparkles size={11}/>
        MacBook M4 · Two mockup types · Export at 3×
      </div>

      {/* Headline */}
      <h1 className="font-syne font-bold text-5xl md:text-7xl leading-[1.06] tracking-tight text-text-primary max-w-4xl mb-6 animate-slide-up">
        Turn any screenshot into a{" "}
        <span className="text-accent">pixel-perfect</span>{" "}
        MacBook mockup
      </h1>

      <p className="text-text-secondary text-lg md:text-xl max-w-2xl mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: "0.08s" }}>
        Drop your screenshot, pick an app frame, choose a desk scene.
        Export as high-res PNG in seconds — no design skills needed.
      </p>

      {/* CTAs */}
      <div className="flex items-center gap-3 animate-slide-up" style={{ animationDelay: "0.14s" }}>
        <Link href="/signup">
          <Button size="lg" className="gap-2 shadow-xl shadow-accent/25">
            Start for free
            <ArrowRight size={16}/>
          </Button>
        </Link>
        <Link href="/app/screen">
          <Button size="lg" variant="secondary" className="gap-2">
            Try without signing up
          </Button>
        </Link>
      </div>

      {/* Social proof */}
      <p className="mt-8 text-text-secondary text-xs animate-fade-in" style={{ animationDelay: "0.22s" }}>
        No credit card needed · Free tier forever · Export up to 2×
      </p>
    </section>
  );
}
