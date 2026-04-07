"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight, CheckCircle } from "lucide-react";

const fadeUp = (delay: number) => ({
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/video_2026-04-07_11-59-22.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(105deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 40%, rgba(0,0,0,0.50) 70%, rgba(0,0,0,0.40) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-32 pb-20" style={{ zIndex: 2 }}>
        <div className="max-w-2xl">

          <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-6">
            <div className="h-px w-8" style={{ background: "#2684FF" }} />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#2684FF" }}>
              Licensed &amp; Insured · Family Owned
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.06)}
            style={{
              fontFamily: "'Archivo Narrow', 'Arial Narrow', sans-serif",
              fontSize: "clamp(2.8rem, 5.5vw, 4.6rem)",
              lineHeight: 0.97,
              letterSpacing: "-0.02em",
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            The Plumbing Team
            <br />
            <span style={{ color: "#2684FF" }}>You Call When It</span>
            <br />
            Has To Be Done Right.
          </motion.h1>

          <motion.p
            {...fadeUp(0.14)}
            className="text-slate-300 text-lg leading-relaxed mt-6"
            style={{ maxWidth: "420px" }}
          >
            Real plumbers. Real work. Done right — or we make it right.
          </motion.p>

          <motion.div {...fadeUp(0.20)} className="flex flex-col sm:flex-row gap-3 mt-8">
            <motion.a
              href="tel:9093914033"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hero-pulse metal-button inline-flex items-center justify-center gap-3 text-white font-bold px-7 py-4 text-base"
              style={{ borderRadius: "5px" }}
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              Call Now — (909) 391-4033
            </motion.a>

            <motion.a
              href="#quote"
              whileHover={{ backgroundColor: "rgba(0,82,204,0.12)", borderColor: "rgba(38,132,255,0.5)" }}
              className="inline-flex items-center justify-center gap-2 text-slate-200 font-semibold px-7 py-4 text-base border border-white/10"
              style={{ borderRadius: "5px", background: "rgba(255,255,255,0.05)" }}
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>

          <motion.div {...fadeUp(0.28)} className="flex flex-wrap gap-x-5 gap-y-2 mt-8">
            {["Same-Day Service", "Upfront Pricing", "24/7 Emergency"].map((text) => (
              <div key={text} className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#2684FF" }} />
                <span className="text-slate-400 text-sm">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
