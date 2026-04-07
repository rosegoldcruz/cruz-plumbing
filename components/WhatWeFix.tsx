"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

const services = [
  {
    title: "Emergency Plumbing",
    desc: "Burst pipe? Flooding? We answer 24/7 and show up fast.",
    color: "#EF4444",
    emergency: true,
  },
  {
    title: "Leak Detection & Repair",
    desc: "Hidden or obvious — we find it and fix it right the first time.",
    color: "#2684FF",
  },
  {
    title: "Water Heater Repair",
    desc: "Same-day repair or replacement. We carry units on the truck.",
    color: "#F97316",
  },
  {
    title: "Drain Cleaning",
    desc: "Cleared fast, root causes identified. Not a band-aid fix.",
    color: "#10B981",
  },
];

export default function WhatWeFix() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!sectionRef.current) return;
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".svc-reveal"),
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0,
          duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
        }
      );
    };
    load();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#000000" }}
    >
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="mb-14 svc-reveal" style={{ opacity: 0 }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-6" style={{ background: "#2684FF" }} />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#2684FF" }}>What We Fix</span>
          </div>
          <h2
            style={{
              fontFamily: "'Archivo Narrow', 'Arial Narrow', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              fontWeight: 700,
              color: "#fff",
              maxWidth: "480px",
            }}
          >
            Whatever&apos;s Wrong,{" "}
            <span style={{ color: "#2684FF" }}>We Handle It.</span>
          </h2>
        </div>

        {/* Service cards — clean grid, no images */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s) => (
            <a
              key={s.title}
              href="#quote"
              className="svc-reveal group relative flex flex-col justify-between p-6 transition-all duration-200 hover:border-white/12"
              style={{
                opacity: 0,
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "6px",
              }}
            >
              {s.emergency && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                  </span>
                  <span className="text-red-400 text-xs font-semibold">24/7</span>
                </div>
              )}
              {!s.emergency && <div className="mb-4"><div className="w-2 h-2 rounded-full" style={{ background: s.color }} /></div>}

              <div>
                <h3
                  className="text-white font-bold text-lg mb-2"
                  style={{ fontFamily: "'Archivo Narrow', 'Arial Narrow', sans-serif" }}
                >
                  {s.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>

              <div className="flex items-center gap-1 mt-6 text-sm font-semibold transition-all duration-200 group-hover:gap-2"
                style={{ color: s.color }}>
                Get help <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5"
          style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "6px" }}
        >
          <div>
            <p className="text-white font-semibold text-base">Not sure what&apos;s wrong?</p>
            <p className="text-slate-500 text-sm mt-0.5">Call us — we&apos;ll diagnose it over the phone for free.</p>
          </div>
          <a
            href="tel:9093914033"
            className="hero-pulse metal-button flex items-center gap-2 font-bold text-sm px-6 py-3 text-white flex-shrink-0"
            style={{ borderRadius: "5px" }}
          >
            <Phone className="w-4 h-4" />
            (909) 391-4033
          </a>
        </motion.div>
      </div>
    </section>
  );
}
