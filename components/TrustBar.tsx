"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Clock, Shield, DollarSign, Phone, Award, Heart } from "lucide-react";

const pillars = [
  {
    icon: Clock,
    title: "Same Day Service",
    sub: "We show up when it matters",
    color: "text-brand-blue-light",
    bg: "bg-brand-blue/10",
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    sub: "AZ License #1050063",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    icon: DollarSign,
    title: "Upfront Pricing",
    sub: "No surprises. Ever.",
    color: "text-brand-accent",
    bg: "bg-brand-accent/10",
  },
  {
    icon: Phone,
    title: "24/7 Emergency",
    sub: "We pick up the phone",
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    icon: Heart,
    title: "Family Owned",
    sub: "Real people. Real care.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
  {
    icon: Award,
    title: "5-Star Rated",
    sub: "West Valley's trusted plumber",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
];

export default function TrustBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!barRef.current) return;

      gsap.fromTo(
        barRef.current.querySelectorAll(".trust-item"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: barRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    };
    loadGSAP();
  }, []);

  return (
    <section ref={barRef} className="relative py-16 overflow-hidden">
      {/* Divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-blue-dark/20 to-brand-navy" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-500 text-xs font-semibold tracking-widest uppercase mb-10"
        >
          Why West Valley Homeowners Choose Cruz Plumbing
        </motion.p>

        {/* Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="trust-item flex flex-col items-center text-center gap-3 p-4 rounded-2xl bg-white/3 border border-white/5 hover:border-white/15 transition-all duration-300 group"
                style={{ opacity: 0 }}
              >
                <div className={`w-12 h-12 rounded-xl ${p.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${p.color}`} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">{p.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{p.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
