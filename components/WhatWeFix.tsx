"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Droplets, Flame, Wind, Wrench, AlertTriangle, Gauge, ArrowRight, Phone } from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────────── */
const featured = {
  icon: AlertTriangle,
  pain: "Pipe burst? Water pouring? Can't wait?",
  title: "Emergency Plumbing",
  desc: "When your home is under threat, you need someone calm, fast, and on their way. We answer. We show up. We stop the damage.",
  callout: "We don't guess. We fix it right.",
  color: "#EF4444",
  bg: "rgba(239,68,68,0.06)",
  border: "rgba(239,68,68,0.2)",
};

const secondary = [
  {
    icon: Droplets,
    pain: "Got a leak?",
    title: "Leak Detection & Repair",
    desc: "Hidden or obvious — we find it fast and seal it right the first time.",
    color: "#3B82F6",
    border: "rgba(59,130,246,0.18)",
  },
  {
    icon: Flame,
    pain: "No hot water?",
    title: "Water Heater Repair",
    desc: "Same-day repair or replacement. We carry units on the truck.",
    color: "#F97316",
    border: "rgba(249,115,22,0.18)",
  },
  {
    icon: Wind,
    pain: "Drain backing up?",
    title: "Drain Cleaning",
    desc: "Cleared fast, root causes identified. Not a band-aid fix.",
    color: "#10B981",
    border: "rgba(16,185,129,0.18)",
  },
];

const strip = [
  { icon: Gauge,  label: "Low Pressure" },
  { icon: Wrench, label: "Fixture Install" },
  { icon: Droplets, label: "Toilet Repair" },
  { icon: Wrench, label: "Pipe Reroute" },
  { icon: Flame,  label: "Water Softeners" },
  { icon: Wind,   label: "Sewer Line" },
];

/* ─── COMPONENT ─────────────────────────────────────────────────── */
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
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0,
          duration: 0.65, stagger: 0.1,
          ease: "power3.out",
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
      className="relative py-24 lg:py-32 blueprint-bg overflow-hidden"
      style={{ background: "linear-gradient(180deg, #080E1A 0%, #0C1626 100%)" }}
    >
      {/* Subtle directional light from top-left */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(30,64,175,0.07) 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header — left-aligned, not centered ── */}
        <div className="mb-14 svc-reveal" style={{ opacity: 0 }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-6 bg-brand-accent-hot" />
            <span className="authority-badge text-brand-accent-hot">What We Fix</span>
          </div>
          <h2
            className="font-display font-bold text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.06, letterSpacing: "-0.02em", maxWidth: "560px" }}
          >
            Whatever&apos;s Wrong,
            <br />
            <span style={{ color: "#93C5FD" }}>We Handle It.</span>
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-lg">
            You&apos;re not just another job to us. Every call gets a real plumber — not a dispatcher, not an estimate factory.
          </p>
        </div>

        {/* ── ASYMMETRIC LAYOUT ── */}
        <div className="grid lg:grid-cols-[1.45fr_1fr] gap-5">

          {/* ── FEATURED BLOCK — dominant left ── */}
          <a
            href="#quote"
            className="svc-reveal group relative flex flex-col justify-between overflow-hidden p-8 lg:p-10"
            style={{
              opacity: 0,
              background: featured.bg,
              border: `1px solid ${featured.border}`,
              borderRadius: "6px",
              minHeight: "340px",
            }}
          >
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(239,68,68,0.08) 0%, transparent 70%)" }} />

            <div>
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 flex items-center justify-center"
                  style={{ background: "rgba(239,68,68,0.1)", border: `1px solid ${featured.border}`, borderRadius: "4px" }}>
                  <featured.icon className="w-7 h-7" style={{ color: featured.color }} />
                </div>
                {/* Live indicator */}
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                  </span>
                  <span className="text-red-400 text-xs font-semibold tracking-wide">24/7 Available</span>
                </div>
              </div>

              <p className="text-slate-500 text-sm italic mb-2">{featured.pain}</p>
              <h3
                className="font-display font-bold text-white mb-3"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", lineHeight: 1.05 }}
              >
                {featured.title}
              </h3>
              <p className="text-slate-300 text-base leading-relaxed max-w-md">{featured.desc}</p>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <span className="text-sm font-semibold italic" style={{ color: featured.color }}>
                &ldquo;{featured.callout}&rdquo;
              </span>
              <div className="flex items-center gap-2 font-semibold text-sm transition-all duration-200 group-hover:gap-3"
                style={{ color: featured.color }}>
                Get help now <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </a>

          {/* ── SECONDARY STACK — right column ── */}
          <div className="flex flex-col gap-4">
            {secondary.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.title}
                  href="#quote"
                  className="svc-reveal group flex items-start gap-5 p-6 transition-all duration-200"
                  style={{
                    opacity: 0,
                    background: "rgba(12,22,38,0.7)",
                    border: `1px solid ${s.border}`,
                    borderRadius: "6px",
                  }}
                >
                  <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{ background: `${s.color}12`, border: `1px solid ${s.border}`, borderRadius: "4px" }}>
                    <Icon className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-500 text-xs italic mb-0.5">{s.pain}</p>
                    <h4 className="font-display font-bold text-white text-lg mb-1">{s.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0 mt-1 transition-all duration-200 group-hover:text-slate-300 group-hover:translate-x-0.5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* ── HORIZONTAL SERVICE STRIP ── */}
        <div
          className="svc-reveal mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x"
          style={{
            opacity: 0,
            border: "1px solid rgba(59,130,246,0.12)",
            borderRadius: "6px",
            background: "rgba(8,14,26,0.8)",
          }}
        >
          {strip.map((item, i) => {
            const Icon = item.icon;
            return (
              <a
                key={i}
                href="#quote"
                className="group flex items-center gap-3 px-5 py-4 transition-all duration-200 hover:bg-white/3"
                style={{
                  borderRight: i < strip.length - 1 ? "1px solid rgba(59,130,246,0.1)" : "none",
                  borderBottom: "none",
                }}
              >
                <Icon className="w-4 h-4 text-slate-500 group-hover:text-brand-blue-light transition-colors duration-200 flex-shrink-0" />
                <span className="text-slate-400 group-hover:text-slate-200 text-sm font-medium transition-colors duration-200 whitespace-nowrap">{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 px-6 py-5"
          style={{
            background: "rgba(12,22,38,0.6)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "6px",
          }}
        >
          <div>
            <p className="text-white font-semibold text-base">Not sure what&apos;s wrong?</p>
            <p className="text-slate-400 text-sm mt-0.5">Call us. We&apos;ll diagnose it over the phone — for free.</p>
          </div>
          <a
            href="tel:6235513781"
            className="hero-pulse flex items-center gap-2 font-bold text-sm px-6 py-3 text-white flex-shrink-0"
            style={{ background: "#E8960A", borderRadius: "5px", letterSpacing: "0.01em" }}
          >
            <Phone className="w-4 h-4" />
            (623) 551-3781
          </a>
        </motion.div>
      </div>
    </section>
  );
}
