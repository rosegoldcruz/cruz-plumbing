import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import WhatWeFix from "@/components/WhatWeFix";
import SocialProof from "@/components/SocialProof";
import HowItWorks from "@/components/HowItWorks";
import AboutFamily from "@/components/AboutFamily";
import HardCTA from "@/components/HardCTA";
import Footer from "@/components/Footer";
import StickyCallButton from "@/components/StickyCallButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-navy">
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
