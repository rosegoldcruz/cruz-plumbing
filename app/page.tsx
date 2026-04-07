import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import StickyCallButton from "@/components/StickyCallButton";

const TrustBar = dynamic(() => import("@/components/TrustBar"));
const WhatWeFix = dynamic(() => import("@/components/WhatWeFix"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const SocialProof = dynamic(() => import("@/components/SocialProof"));
const AboutFamily = dynamic(() => import("@/components/AboutFamily"));
const FieldGallery = dynamic(() => import("@/components/FieldGallery"));
const HardCTA = dynamic(() => import("@/components/HardCTA"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <main className="site-shell min-h-screen" style={{ background: "transparent" }}>
      <Navigation />
      <Hero />
      <TrustBar />
      <WhatWeFix />
      <HowItWorks />
      <SocialProof />
      <AboutFamily />
      <FieldGallery />
      <HardCTA />
      <Footer />
      <StickyCallButton />
    </main>
  );
}
