"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { Phone, ArrowRight, Shield, Star, CheckCircle } from "lucide-react";
import Image from "next/image";

/* Dynamic import — R3F is browser-only, this is already a client component */
const VaultLockBg = dynamic(() => import("./Pipe3DScene"), {
  ssr: false,
  loading: () => null,
});

/* ─── Fade-up factory ─────────────────────────────────────── */
const fadeUp = (delay: number) => ({
  initial:    { opacity: 0, y: 30 },
  animate:    { opacity: 1, y: 0 },
  transition: { delay, duration: 0.78, ease: [0.22, 1, 0.36, 1] },
});

/* ═══════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════ */
export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [render3D, setRender3D] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (window.innerWidth < 1024) return;

    const idleId =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(() => setRender3D(true), { timeout: 1200 })
        : window.setTimeout(() => setRender3D(true), 600);

    return () => {
      if (typeof idleId === "number") {
        window.clearTimeout(idleId);
        return;
      }
      window.cancelIdleCallback(idleId);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* ── Full-screen 3D vault-lock background ── */}
      {render3D ? <VaultLockBg /> : null}

      {/* ── Left-side readability gradient ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(105deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.70) 38%, rgba(0,0,0,0.28) 65%, rgba(0,0,0,0.08) 100%)",
        }}
      />

      {/* ── Vignette edges ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "radial-gradient(ellipse 100% 90% at 50% 50%, transparent 35%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* ══════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════ */}
      <div className="relative flex-1 flex items-center" style={{ zIndex: 5 }}>
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-32 pb-14">
          {/* Two-column: left = copy, right = van image card */}
          <div className="grid lg:grid-cols-[1fr_1fr] gap-0 lg:gap-10 items-center">

            {/* ── LEFT COLUMN ─────────────────────────────── */}
            <div className="flex flex-col gap-7 lg:pr-6">

              {/* Authority eyebrow */}
              <motion.div {...fadeUp(0)} className="flex items-center gap-3">
                <div className="h-px w-8" style={{ background: "#2684FF" }} />
                <span className="authority-badge" style={{ color: "#2684FF" }}>
                  West Valley&apos;s Elite Plumbing Team
                </span>
              </motion.div>

              {/* Headline — Archivo Narrow, massive */}
              <motion.div {...fadeUp(0.06)}>
                <h1
                  style={{
                    fontFamily: "'Archivo Narrow', 'Arial Narrow', sans-serif",
                    fontSize: "clamp(3rem, 6vw, 5rem)",
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
                </h1>
              </motion.div>

              {/* Sub */}
              <motion.div {...fadeUp(0.14)}>
                <p className="text-slate-300 text-lg leading-relaxed" style={{ maxWidth: "430px" }}>
                  No shortcuts. No guessing.{" "}
                  <strong className="text-white">Real plumbers. Real work.</strong>{" "}
                  Done right — or we make it right.
                </p>
              </motion.div>

              {/* CTAs — BLUE, zero amber */}
              <motion.div {...fadeUp(0.20)} className="flex flex-col sm:flex-row gap-3">
                {/* Primary */}
                <motion.a
                  href="tel:6235513781"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.14 }}
                  className="hero-pulse inline-flex items-center justify-center gap-3 text-white font-bold px-7 py-4 text-base"
                  style={{
                    background: "#0052CC",
                    borderRadius: "5px",
                    letterSpacing: "0.01em",
                  }}
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  Call Now — (623) 551-3781
                </motion.a>

                {/* Secondary */}
                <motion.a
                  href="#quote"
                  whileHover={{
                    backgroundColor: "rgba(0,82,204,0.12)",
                    borderColor: "rgba(38,132,255,0.5)",
                  }}
                  transition={{ duration: 0.14 }}
                  className="inline-flex items-center justify-center gap-2 text-slate-200 font-semibold px-7 py-4 text-base"
                  style={{
                    borderRadius: "5px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    letterSpacing: "0.01em",
                  }}
                >
                  Get My Same-Day Quote
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </motion.div>

              {/* Trust micro-points */}
              <motion.div {...fadeUp(0.28)} className="flex flex-wrap gap-x-5 gap-y-2">
                {[
                  "Licensed & Insured",
                  "Same-Day Service",
                  "Upfront Pricing",
                  "Family Owned",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#2684FF" }} />
                    <span className="text-slate-400 text-sm">{text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT COLUMN — van image, asymmetric offset ── */}
            <motion.div
              initial={{ opacity: 0, x: 44 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.95, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-14 lg:mt-0 hidden lg:block"
            >
              {/* Offset accent border */}
              <div
                className="absolute -top-5 -right-5 w-full h-full"
                style={{
                  border: "1px solid rgba(0,82,204,0.22)",
                  borderRadius: "4px",
                  zIndex: 0,
                }}
              />

              {/* Van image */}
              <div
                className="relative overflow-hidden drift-anim"
                style={{ borderRadius: "4px", zIndex: 1 }}
              >
                <Image
                  src="/written-piece.png"
                  alt="Cruz Plumbing — On the job"
                  width={680}
                  height={520}
                  className="w-full object-cover object-center"
                  style={{ display: "block" }}
                  priority
                />

                {/* Cinematic overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(0,0,0,0.08) 0%, transparent 40%, rgba(0,0,0,0.52) 100%)",
                  }}
                />

                {/* Animated light sweep */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: [0, 0.07, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    background:
                      "linear-gradient(120deg, transparent 0%, rgba(38,132,255,0.18) 50%, transparent 100%)",
                  }}
                />
              </div>

              {/* Badge: Same Day — blue now */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 220, damping: 18 }}
                className="absolute -top-5 -left-5 flex items-center gap-2 text-sm font-bold"
                style={{
                  background: "#0052CC",
                  color: "#ffffff",
                  padding: "8px 14px",
                  borderRadius: "4px",
                  zIndex: 2,
                  letterSpacing: "0.02em",
                }}
              >
                ⚡ Same Day
              </motion.div>

              {/* Stat badge — bottom right */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15, duration: 0.5 }}
                className="absolute -bottom-5 -right-4 lg:-right-6 flex items-center gap-3"
                style={{
                  background: "#1A1A1A",
                  border: "1px solid rgba(0,82,204,0.22)",
                  padding: "10px 16px",
                  borderRadius: "4px",
                  zIndex: 2,
                }}
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-brand-blue-lt text-brand-blue-lt" />
                  ))}
                </div>
                <span className="text-white text-sm font-semibold">5.0 · 100+ Reviews</span>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          AUTHORITY STRIP
      ══════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.8 }}
        className="relative"
        style={{ zIndex: 5 }}
      >
        <div className="sharp-divider" />
        <div
          style={{
            background: "rgba(0,0,0,0.88)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-4">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
              {[
                { icon: "📍", label: "Serving West Valley, AZ" },
                null,
                { icon: Shield, label: "License #1050063" },
                null,
                { icon: Star, label: "5.0 Google Rating" },
                null,
                { icon: null, label: "Family Owned & Operated" },
              ].map((item, i) => {
                if (item === null)
                  return (
                    <span key={i} className="text-slate-700 hidden sm:inline">·</span>
                  );
                if (typeof item.icon === "string")
                  return (
                    <span key={i} className="flex items-center gap-1.5 text-slate-400">
                      {item.icon} {item.label}
                    </span>
                  );
                if (item.icon)
                  return (
                    <span key={i} className="flex items-center gap-1.5 text-slate-400">
                      <item.icon className="w-3.5 h-3.5" style={{ color: "#2684FF" }} />
                      {item.label}
                    </span>
                  );
                return (
                  <span key={i} className="text-slate-400">{item.label}</span>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
