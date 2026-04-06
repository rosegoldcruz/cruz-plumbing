"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, Search, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const steps = [
  {
    step: "01",
    icon: Phone,
    title: "Call or Request a Quote",
    desc: "One call or a quick form. We pick up — no hold music, no call centers. Just us.",
    color: "text-brand-blue-light",
    glow: "shadow-[0_0_30px_rgba(59,130,246,0.3)]",
    border: "border-brand-blue/40",
  },
  {
    step: "02",
    icon: Search,
    title: "We Diagnose Fast",
    desc: "We show up on time, assess what's happening, and give you a clear upfront price before touching anything.",
    color: "text-brand-accent",
    glow: "shadow-[0_0_30px_rgba(245,158,11,0.2)]",
    border: "border-brand-accent/40",
  },
  {
    step: "03",
    icon: CheckCircle2,
    title: "You Get It Fixed",
    desc: "We do the work right. Clean up after ourselves. And you get your home back — the way it should be.",
    color: "text-green-400",
    glow: "shadow-[0_0_30px_rgba(74,222,128,0.2)]",
    border: "border-green-500/40",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      const cards = sectionRef.current.querySelectorAll(".step-card");
      const line = sectionRef.current.querySelector(".connector-line");

      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );

      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );
      }
    };
    loadGSAP();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="relative py-24 lg:py-32 bg-brand-navy overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-brand-navy-light/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6"
          >
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-semibold tracking-widest uppercase">How It Works</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl text-white mb-4"
          >
            Simple. Fast. Done Right.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-xl max-w-xl mx-auto"
          >
            No runaround. No confusion. Just three steps from your call to a fixed home.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-brand-blue/20 via-brand-blue/60 to-green-500/20 origin-left connector-line" style={{ transform: "scaleX(0)" }} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="step-card relative flex flex-col items-center text-center"
                  style={{ opacity: 0 }}
                >
                  {/* Number + icon */}
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 rounded-2xl bg-brand-navy-light border ${s.border} ${s.glow} flex items-center justify-center transition-transform duration-300 hover:scale-110`}>
                      <Icon className={`w-9 h-9 ${s.color}`} />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-brand-navy border border-white/10 flex items-center justify-center">
                      <span className="font-display font-bold text-xs text-slate-400">{s.step}</span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white mb-3">{s.title}</h3>
                  <p className="text-slate-400 text-base leading-relaxed max-w-xs">{s.desc}</p>

                  {/* Arrow between steps (mobile) */}
                  {i < steps.length - 1 && (
                    <div className="lg:hidden mt-8 text-slate-600 text-2xl">↓</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Photo strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 grid grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {["/on-site.png", "/main.png", "/the-crew.png"].map((src, i) => (
            <div key={i} className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl">
              <Image src={src} alt="Cruz Plumbing team on the job" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 to-transparent" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
