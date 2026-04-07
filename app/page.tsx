import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import WhatWeFix from "@/components/WhatWeFix";
import HowItWorks from "@/components/HowItWorks";
import SocialProof from "@/components/SocialProof";
import AboutFamily from "@/components/AboutFamily";
import HardCTA from "@/components/HardCTA";
import Footer from "@/components/Footer";
import StickyCallButton from "@/components/StickyCallButton";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "#000000" }}>
      <Navigation />
      <Hero />
      <TrustBar />
      <WhatWeFix />
      <HowItWorks />
      <SocialProof />
      <AboutFamily />
      <HardCTA />
      <Footer />
      <StickyCallButton />
    </main>
  );
}
