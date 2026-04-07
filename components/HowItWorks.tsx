"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, Search, CheckCircle2 } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Phone,
    title: "Call or Request a Quote",
    desc: "One call or one form. We answer — no hold music, no call centers. Just us.",
    accent: "#3B82F6",
  },
  {
    n: "02",
    icon: Search,
    title: "We Diagnose Fast",
    desc: "On time. Upfront price before anything starts. No pressure, no mystery.",
    accent: "#0052CC",
  },
  {
    n: "03",
    icon: CheckCircle2,
    title: "Fixed. Right. Clean.",
    desc: "We do the work, clean up, and you get your home back exactly how it should be.",
    accent: "#10B981",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!ref.current) return;

      gsap.fromTo(
        ref.current.querySelectorAll(".step"),
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0,
          duration: 0.65, stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 72%", once: true },
        }
      );
    };
    load();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#000000" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(0,82,204,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,82,204,0.035) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-6" style={{ background: "#2684FF" }} />
              <span className="authority-badge" style={{ color: "#2684FF" }}>How It Works</span>
            </div>
            <h2
              className="font-display font-bold text-white"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
            >
              Simple. Fast.
              <br />
              <span style={{ color: "#2684FF" }}>Done Right.</span>
            </h2>
            <p className="text-slate-400 text-lg mt-4">
              Three steps. No runaround. From your call to a fixed home.
            </p>
          </motion.div>
        </div>

        {/* Steps — slightly offset, not perfectly aligned */}
        <div className="grid lg:grid-cols-3 gap-5 lg:gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.n}
                className="step relative flex flex-col gap-5 p-7 lg:p-8"
                style={{
                  opacity: 0,
                  background: "#1A1A1A",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "5px",
                  marginTop: i === 1 ? "24px" : "0",  // middle card pushed down = asymmetry
                }}
              >
                {/* Step number — large, ghosted */}
                <span
                  className="absolute top-5 right-6 font-display font-bold pointer-events-none select-none"
                  style={{ fontSize: "4rem", lineHeight: 1, color: "rgba(255,255,255,0.04)", letterSpacing: "-0.05em" }}
                >
                  {s.n}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center"
                  style={{ background: `${s.accent}12`, border: `1px solid ${s.accent}30`, borderRadius: "4px" }}>
                  <Icon className="w-6 h-6" style={{ color: s.accent }} />
                </div>

                <div>
                  <h3 className="font-display font-bold text-white text-xl mb-2">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </div>

                {/* Connector arrow (desktop, between cards) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-slate-700 text-lg">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
