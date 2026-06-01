import { Navbar }       from "@/components/landing/navbar";
import { Hero }         from "@/components/landing/hero";
import { HowItWorks }   from "@/components/landing/how-it-works";
import { MockupTypes }  from "@/components/landing/mockup-types";
import { FramesMarquee }from "@/components/landing/frames-marquee";
import { Pricing }      from "@/components/landing/pricing";
import { Footer }       from "@/components/landing/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "mockX — MacBook Mockup Tool",
  description: "Turn any screenshot into a pixel-perfect MacBook mockup. Safari, Chrome, Arc, VS Code and more. Export at 1×, 2×, or 3×. Free to start.",
  keywords: ["macbook mockup","screenshot mockup","safari mockup","browser mockup","mac mockup tool","design tool"],
  openGraph: {
    title: "mockX — MacBook Mockup Tool",
    description: "Turn any screenshot into a pixel-perfect MacBook mockup in seconds.",
    type: "website",
    images: [{ url: "/api/og?title=MacBook+Mockup+Tool&type=screen", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "mockX — MacBook Mockup Tool",
    description: "Turn any screenshot into a pixel-perfect MacBook mockup in seconds.",
    images: ["/api/og?title=MacBook+Mockup+Tool&type=screen"],
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <MockupTypes />
        <FramesMarquee />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
