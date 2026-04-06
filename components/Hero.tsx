"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Shield, Star, CheckCircle } from "lucide-react";
import Image from "next/image";

/* ─── Flow canvas: water / pressure motion ────────────────────── */
function FlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.004; // very slow — barely perceptible movement

      /* ── Pressure flow lines (horizontal, pipe-like) ── */
      for (let i = 0; i < 12; i++) {
        const y = (canvas.height / 13) * (i + 1);
        const speed = 0.3 + i * 0.07;
        const amplitude = 6 + i * 1.5;
        const alpha = 0.018 + (i % 3) * 0.006;

        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 4) {
          const wave =
            Math.sin((x / canvas.width) * Math.PI * 2.5 + t * speed + i * 0.9) * amplitude +
            Math.sin((x / canvas.width) * Math.PI * 1.2 + t * speed * 0.6 + i) * (amplitude * 0.4);
          if (x === 0) ctx.moveTo(x, y + wave);
          else ctx.lineTo(x, y + wave);
        }

        const grad = ctx.createLinearGradient(0, y, canvas.width, y);
        grad.addColorStop(0,   `rgba(30,64,175,0)`);
        grad.addColorStop(0.2, `rgba(30,64,175,${alpha})`);
        grad.addColorStop(0.5, `rgba(59,130,246,${alpha * 1.6})`);
        grad.addColorStop(0.8, `rgba(30,64,175,${alpha})`);
        grad.addColorStop(1,   `rgba(30,64,175,0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = i % 4 === 0 ? 1.2 : 0.6;
        ctx.stroke();
      }

      /* ── Ambient pressure orbs (slow, deep) ── */
      const orbs = [
        { rx: 0.15, ry: 0.25, r: 320, s: 0.4 },
        { rx: 0.82, ry: 0.55, r: 380, s: 0.6 },
        { rx: 0.5,  ry: 0.88, r: 260, s: 0.5 },
      ];
      orbs.forEach((o, i) => {
        const pulse = Math.sin(t * o.s + i * 1.7) * 0.008;
        const alpha = 0.05 + pulse;
        const ox = canvas.width  * o.rx + Math.sin(t * 0.3 + i) * 20;
        const oy = canvas.height * o.ry + Math.cos(t * 0.2 + i) * 15;

        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r);
        g.addColorStop(0, `rgba(20,52,148,${alpha * 2.2})`);
        g.addColorStop(0.5, `rgba(15,40,120,${alpha})`);
        g.addColorStop(1, "rgba(8,14,26,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(ox, oy, o.r, 0, Math.PI * 2);
        ctx.fill();
      });

      /* ── Directional light sweep (cinematic depth) ── */
      const sweepX = canvas.width * (0.5 + Math.sin(t * 0.18) * 0.4);
      const sweep = ctx.createRadialGradient(sweepX, 0, 0, sweepX, 0, canvas.height * 1.1);
      sweep.addColorStop(0, "rgba(59,130,246,0.04)");
      sweep.addColorStop(1, "rgba(8,14,26,0)");
      ctx.fillStyle = sweep;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

/* ─── Blueprint pipe accent (static SVG layer) ────────────────── */
function BlueprintAccent() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1, opacity: 0.025 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Pipe network schematic — extremely faint */}
      <line x1="0" y1="30%" x2="40%" y2="30%" stroke="#3B82F6" strokeWidth="1" />
      <line x1="40%" y1="30%" x2="40%" y2="60%" stroke="#3B82F6" strokeWidth="1" />
      <line x1="40%" y1="60%" x2="100%" y2="60%" stroke="#3B82F6" strokeWidth="1" />
      <circle cx="40%" cy="30%" r="4" stroke="#3B82F6" strokeWidth="1" fill="none" />
      <circle cx="40%" cy="60%" r="4" stroke="#3B82F6" strokeWidth="1" fill="none" />
      <line x1="60%" y1="0" x2="60%" y2="30%" stroke="#3B82F6" strokeWidth="0.5" strokeDasharray="6 4" />
      <line x1="20%" y1="60%" x2="20%" y2="100%" stroke="#3B82F6" strokeWidth="0.5" strokeDasharray="6 4" />
      <rect x="58%" y="28%" width="4%" height="4%" stroke="#3B82F6" strokeWidth="0.5" fill="none" />
    </svg>
  );
}

/* ─── HERO ────────────────────────────────────────────────────── */
export default function Hero() {
  const fadeUp = (delay: number) => ({
    initial:  { opacity: 0, y: 28 },
    animate:  { opacity: 1, y: 0 },
    transition: { delay, duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(160deg, #080E1A 0%, #0C1626 55%, #0A1830 100%)" }}
    >
      {/* Layers */}
      <FlowCanvas />
      <BlueprintAccent />

      {/* Hard vignette edges */}
      <div className="absolute inset-0 pointer-events-none" style={{
        zIndex: 2,
        background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, #080E1A 100%)",
      }} />

      {/* ── MAIN CONTENT ── */}
      <div className="relative flex-1 flex items-center" style={{ zIndex: 3 }}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-0 lg:gap-8 items-center">

            {/* ── LEFT: Copy ── */}
            <div className="flex flex-col gap-7 lg:pr-8">

              {/* Authority label */}
              <motion.div {...fadeUp(0)} className="flex items-center gap-3">
                <div className="h-px w-8 bg-brand-accent-hot" />
                <span className="authority-badge text-brand-accent-hot tracking-widest">
                  West Valley&apos;s Trusted Plumbers
                </span>
              </motion.div>

              {/* Headline — dominant, no gradient games */}
              <motion.div {...fadeUp(0.08)}>
                <h1
                  className="font-display font-bold text-white"
                  style={{
                    fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)",
                    lineHeight: 1.04,
                    letterSpacing: "-0.02em",
                  }}
                >
                  The Plumbing Team
                  <br />
                  <span style={{ color: "#93C5FD" }}>You Call When It</span>
                  <br />
                  Has To Be Done Right.
                </h1>
              </motion.div>

              {/* Sub — tighter, punchier */}
              <motion.div {...fadeUp(0.16)}>
                <p className="text-slate-300 text-lg leading-relaxed max-w-md" style={{ fontWeight: 400 }}>
                  No shortcuts. No guessing.{" "}
                  <span className="text-white font-semibold">Real plumbers. Real work.</span>{" "}
                  Done right — or we make it right.
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div {...fadeUp(0.22)} className="flex flex-col sm:flex-row gap-3">
                {/* Primary — amber, decisive */}
                <motion.a
                  href="tel:6235513781"
                  whileHover={{ scale: 1.03, backgroundColor: "#D97706" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="hero-pulse inline-flex items-center justify-center gap-3 text-white font-bold px-7 py-4 text-base"
                  style={{
                    background: "#E8960A",
                    borderRadius: "6px",
                    letterSpacing: "0.01em",
                  }}
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  Call Now — (623) 551-3781
                </motion.a>

                {/* Secondary — understated */}
                <motion.a
                  href="#quote"
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.35)" }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex items-center justify-center gap-2 text-slate-200 font-semibold px-7 py-4 text-base border border-white/15"
                  style={{ borderRadius: "6px", letterSpacing: "0.01em" }}
                >
                  Get My Same-Day Quote
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </motion.div>

              {/* Micro trust points — horizontal, compact */}
              <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
                {[
                  { icon: CheckCircle, text: "Licensed & Insured" },
                  { icon: CheckCircle, text: "Same-Day Service" },
                  { icon: CheckCircle, text: "Upfront Pricing" },
                  { icon: CheckCircle, text: "Family Owned" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-brand-accent-hot flex-shrink-0" />
                    <span className="text-slate-400 text-sm">{text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT: Visual ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-12 lg:mt-0"
            >
              {/* Offset frame — creates layering tension */}
              <div className="relative ml-0 lg:ml-4">
                {/* Background accent block — offset */}
                <div
                  className="absolute -top-4 -right-4 w-full h-full"
                  style={{
                    border: "1px solid rgba(59,130,246,0.18)",
                    borderRadius: "4px",
                    zIndex: 0,
                  }}
                />

                {/* Main image — cropped, zoomed, high-impact */}
                <div
                  className="relative overflow-hidden drift-anim"
                  style={{ borderRadius: "4px", zIndex: 1 }}
                >
                  <Image
                    src="/van.png"
                    alt="Cruz Plumbing — On the job"
                    width={680}
                    height={520}
                    className="w-full object-cover object-center"
                    style={{ display: "block" }}
                    priority
                  />

                  {/* Cinematic lighting overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(160deg, rgba(8,14,26,0.1) 0%, transparent 40%, rgba(8,14,26,0.55) 100%)",
                    }}
                  />

                  {/* Animated light sweep */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{ opacity: [0.0, 0.06, 0.0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      background: "linear-gradient(120deg, transparent 0%, rgba(147,197,253,0.15) 50%, transparent 100%)",
                    }}
                  />
                </div>

                {/* Floating badge — same-day, top-right offset */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.85, type: "spring", stiffness: 220, damping: 18 }}
                  className="absolute -top-5 -left-5 flex items-center gap-2 text-sm font-bold"
                  style={{
                    background: "#E8960A",
                    color: "#080E1A",
                    padding: "8px 14px",
                    borderRadius: "4px",
                    zIndex: 2,
                    letterSpacing: "0.02em",
                  }}
                >
                  ⚡ Same Day
                </motion.div>

                {/* Floating stat — lower-right */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  className="absolute -bottom-5 -right-2 lg:-right-6 flex items-center gap-3"
                  style={{
                    background: "#0C1626",
                    border: "1px solid rgba(59,130,246,0.2)",
                    padding: "10px 16px",
                    borderRadius: "4px",
                    zIndex: 2,
                  }}
                >
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-white text-sm font-semibold">5.0 · 100+ Reviews</span>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── AUTHORITY STRIP ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="relative"
        style={{ zIndex: 3 }}
      >
        <div className="sharp-divider" />
        <div
          style={{
            background: "rgba(12,22,38,0.92)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
              {[
                { icon: "📍", text: "Serving West Valley, AZ" },
                { icon: null, text: "·" },
                { icon: Shield, text: "License #1050063" },
                { icon: null, text: "·" },
                { icon: Star, text: "5.0 Google Rating" },
                { icon: null, text: "·" },
                { icon: null, text: "Family Owned & Operated" },
              ].map((item, i) =>
                item.icon === null ? (
                  <span key={i} className="text-slate-700 hidden sm:inline">{item.text}</span>
                ) : typeof item.icon === "string" ? (
                  <span key={i} className="flex items-center gap-1.5 text-slate-400">
                    {item.icon} <span>{item.text}</span>
                  </span>
                ) : (
                  <span key={i} className="flex items-center gap-1.5 text-slate-400">
                    <item.icon className="w-3.5 h-3.5 text-brand-blue-light" />
                    {item.text}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
