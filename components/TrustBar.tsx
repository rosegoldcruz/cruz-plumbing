"use client";

import { useEffect, useRef } from "react";
import { Clock, Shield, DollarSign, Phone, Heart, Award } from "lucide-react";

const pillars = [
  { icon: Clock,      label: "Same Day Service",   sub: "We show up when it matters" },
  { icon: Shield,     label: "Licensed & Insured",  sub: "AZ License #1050063" },
  { icon: DollarSign, label: "Upfront Pricing",     sub: "No surprise bills. Ever." },
  { icon: Phone,      label: "24/7 Emergency",      sub: "We pick up the phone" },
  { icon: Heart,      label: "Family Owned",        sub: "Real people. Real care." },
  { icon: Award,      label: "5-Star Rated",        sub: "West Valley's go-to plumber" },
];

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!ref.current) return;

      gsap.fromTo(
        ref.current.querySelectorAll(".pillar"),
        { opacity: 0, y: 22 },
        {
          opacity: 1, y: 0,
          duration: 0.5, stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
        }
      );
    };
    load();
  }, []);

  return (
    <div
      ref={ref}
      className="relative py-10"
      style={{ background: "#000000" }}
    >
      {/* Top + bottom edge lines */}
      <div className="sharp-divider" />
      <div className="absolute bottom-0 left-0 right-0 sharp-divider" />

      {/* Very subtle blueprint grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(0,82,204,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,82,204,0.04) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        opacity: 0.6,
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.label}
                className="pillar flex flex-col items-center text-center gap-2.5 px-4 py-5 group"
                style={{
                  opacity: 0,
                  borderRight: i < pillars.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}
              >
                <div className="w-9 h-9 flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                  style={{ background: "rgba(0,82,204,0.09)", border: "1px solid rgba(0,82,204,0.18)", borderRadius: "4px" }}>
                  <Icon className="w-4 h-4" style={{ color: "#2684FF" }} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">{p.label}</p>
                  <p className="text-slate-600 text-xs mt-0.5">{p.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
