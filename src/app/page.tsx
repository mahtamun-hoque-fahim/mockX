import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { MockupTypes } from "@/components/landing/mockup-types";
import { FramesMarquee } from "@/components/landing/frames-marquee";
import { Pricing } from "@/components/landing/pricing";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <main>
        <Hero />
        <MockupTypes />
        <FramesMarquee />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
