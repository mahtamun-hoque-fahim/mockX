import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Monitor, Laptop, ArrowRight, Plus } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userName = session?.user.name?.split(" ")[0] ?? "there";

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Greeting */}
      <div className="mb-10">
        <h1 className="font-syne font-bold text-3xl text-text-primary mb-1">
          Hey, {userName}
        </h1>
        <p className="text-text-secondary">What are we mocking up today?</p>
      </div>

      {/* Quick start cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {[
          {
            href: "/app/screen",
            icon: Monitor,
            title: "Screen Mockup",
            description: "Wrap your screenshot in a macOS desktop with the browser or app frame of your choice.",
            gradient: "linear-gradient(135deg,#0f3460,#533483)",
          },
          {
            href: "/app/scene",
            icon: Laptop,
            title: "Scene Mockup",
            description: "Place your MacBook on a desk. Pick the model, environment, and lighting.",
            gradient: "linear-gradient(135deg,#1a1c22,#302b63)",
          },
        ].map(card => (
          <Link key={card.href} href={card.href} className="group rounded-2xl border border-white/8 bg-surface overflow-hidden hover:border-accent/25 transition-all duration-200">
            <div className="h-32 flex items-center justify-center relative" style={{ background: card.gradient }}>
              <card.icon size={48} strokeWidth={1} className="text-white opacity-30 group-hover:opacity-50 transition-opacity"/>
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,transparent,rgba(19,23,32,0.6))" }}/>
            </div>
            <div className="p-5 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-syne font-bold text-base text-text-primary mb-1">{card.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{card.description}</p>
              </div>
              <ArrowRight size={16} className="text-text-secondary group-hover:text-accent transition-colors shrink-0 mt-1"/>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent mockups placeholder */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-syne font-semibold text-lg text-text-primary">Recent mockups</h2>
          <Link href="/app/mockups">
            <Button variant="ghost" size="sm" className="text-xs gap-1.5">
              View all <ArrowRight size={12}/>
            </Button>
          </Link>
        </div>

        <div className="rounded-2xl border border-white/7 bg-surface p-10 flex flex-col items-center gap-4 text-center">
          <div className="w-12 h-12 rounded-xl bg-surface-elevated border border-white/8 flex items-center justify-center">
            <Plus size={20} className="text-text-secondary"/>
          </div>
          <div>
            <p className="text-text-primary font-medium mb-1">No saved mockups yet</p>
            <p className="text-sm text-text-secondary">Create your first mockup above and hit Save.</p>
          </div>
          <Link href="/app/screen">
            <Button size="sm" className="gap-1.5">
              <Plus size={13}/> Create mockup
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
