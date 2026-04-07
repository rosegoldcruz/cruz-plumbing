"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const pillars = [
  { image: "/housecalls.png", label: "Same Day Service", sub: "We show up when it matters" },
  { image: "/apprentice.png", label: "Licensed & Insured", sub: "AZ License #1050063" },
  { image: "/summer.png", label: "Upfront Pricing", sub: "No surprise bills. Ever." },
  { image: "/van.png", label: "24/7 Emergency", sub: "We pick up the phone" },
  { image: "/pupper.png", label: "Family Owned", sub: "Real people. Real care." },
  { image: "/crew2.png", label: "5-Star Rated", sub: "West Valley's go-to plumber" },
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
      style={{ background: "#050505" }}
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {pillars.map((p) => {
            return (
              <div
                key={p.label}
                className="pillar surface-pressed grain-panel flex flex-col items-center text-center gap-3 px-3 py-4 group rounded-[6px]"
                style={{
                  opacity: 0,
                }}
              >
                <div className="relative w-full aspect-[1.25/0.86] rounded-[5px] overflow-hidden photo-frame">
                  <Image
                    src={p.image}
                    alt={p.label}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 50vw, 16vw"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex w-2 h-2 rounded-full bg-brand-blue-light led-glow" />
                  <p className="text-white font-semibold text-sm leading-tight">{p.label}</p>
                </div>
                <div>
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
