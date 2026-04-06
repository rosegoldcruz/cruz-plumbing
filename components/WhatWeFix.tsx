"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Droplets, Flame, Wind, Wrench, AlertTriangle, Gauge, ShowerHead, Pipette } from "lucide-react";

const services = [
  {
    icon: Droplets,
    pain: "Got a leak?",
    title: "Leak Repair",
    desc: "Hidden or obvious — we find it, seal it, and make sure it doesn't come back.",
    color: "from-blue-500/20 to-blue-600/5",
    border: "border-blue-500/30",
    iconColor: "text-blue-400",
  },
  {
    icon: Flame,
    pain: "Water heater not working?",
    title: "Water Heaters",
    desc: "No hot water is an emergency. Same-day repair or replacement — we carry units on the truck.",
    color: "from-orange-500/20 to-orange-600/5",
    border: "border-orange-500/30",
    iconColor: "text-orange-400",
  },
  {
    icon: Wind,
    pain: "Drain backing up?",
    title: "Drain Cleaning",
    desc: "Slow drains, clogs, backups — cleared fast so your home gets back to normal.",
    color: "from-green-500/20 to-green-600/5",
    border: "border-green-500/30",
    iconColor: "text-green-400",
  },
  {
    icon: AlertTriangle,
    pain: "Pipe burst? Water everywhere?",
    title: "Emergency Plumbing",
    desc: "We show up. Fast. When your home needs us most, we're on our way — 24/7.",
    color: "from-red-500/20 to-red-600/5",
    border: "border-red-500/30",
    iconColor: "text-red-400",
  },
  {
    icon: ShowerHead,
    pain: "Toilet running or won't flush?",
    title: "Toilet Repair & Install",
    desc: "From running toilets to full installs — handled clean and quick.",
    color: "from-cyan-500/20 to-cyan-600/5",
    border: "border-cyan-500/30",
    iconColor: "text-cyan-400",
  },
  {
    icon: Gauge,
    pain: "Low water pressure?",
    title: "Pressure & Pipe Work",
    desc: "Diagnosing and fixing pressure problems, pipe repairs, and reroutes.",
    color: "from-purple-500/20 to-purple-600/5",
    border: "border-purple-500/30",
    iconColor: "text-purple-400",
  },
  {
    icon: Pipette,
    pain: "Need a new fixture installed?",
    title: "Fixture Installation",
    desc: "Faucets, sinks, shut-off valves — installed right the first time.",
    color: "from-teal-500/20 to-teal-600/5",
    border: "border-teal-500/30",
    iconColor: "text-teal-400",
  },
  {
    icon: Wrench,
    pain: "Something else broken?",
    title: "General Plumbing",
    desc: "If it's plumbing, we handle it. Just call — we'll figure it out together.",
    color: "from-slate-500/20 to-slate-600/5",
    border: "border-slate-500/30",
    iconColor: "text-slate-400",
  },
];

export default function WhatWeFix() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current.querySelectorAll(".service-card"),
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    };
    loadGSAP();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative py-24 lg:py-32 bg-brand-navy overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-brand-blue/20 border border-brand-blue/30 rounded-full px-4 py-2 mb-6"
          >
            <Wrench className="w-4 h-4 text-brand-blue-light" />
            <span className="text-brand-blue-light text-sm font-semibold tracking-widest uppercase">What We Fix</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6"
          >
            Whatever&apos;s Broken,
            <span className="gradient-text"> We Fix It.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-xl max-w-2xl mx-auto"
          >
            We don&apos;t complicate it. You have a problem — we show up, diagnose fast, and fix it right.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.title}
                href="#quote"
                className={`service-card group relative bg-gradient-to-br ${s.color} border ${s.border} rounded-2xl p-6 cursor-pointer card-lift block`}
                style={{ opacity: 0 }}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-white/5 border ${s.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${s.iconColor}`} />
                </div>

                {/* Pain point */}
                <p className="text-slate-400 text-xs font-medium italic mb-2">{s.pain}</p>

                {/* Title */}
                <h3 className="text-white font-display font-bold text-lg mb-2 group-hover:text-brand-blue-light transition-colors duration-200">
                  {s.title}
                </h3>

                {/* Desc */}
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>

                {/* Arrow */}
                <div className="mt-4 flex items-center gap-1 text-brand-blue-light text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                  Get a quote →
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-14"
        >
          <p className="text-slate-400 text-lg mb-6">Not sure? Just call us. We&apos;ll walk you through it.</p>
          <a
            href="tel:6235513781"
            className="inline-flex items-center gap-3 bg-brand-blue hover:bg-brand-blue-light text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-200 hover:scale-105"
          >
            Call (623) 551-3781
          </a>
        </motion.div>
      </div>
    </section>
  );
}
