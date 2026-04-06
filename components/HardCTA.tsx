"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Clock, Zap } from "lucide-react";
import QuoteForm from "./QuoteForm";

/* ─── Pressure flow background canvas ───────────────────────────── */
function PressureCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;
    let raf: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.006;

      // Slow horizontal pressure lines — pipe system feel
      for (let i = 0; i < 8; i++) {
        const y = (canvas.height / 9) * (i + 1);
        const speed = 0.4 + i * 0.08;
        const alpha = 0.015 + (i % 2) * 0.008;

        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 6) {
          const wave = Math.sin((x / canvas.width) * Math.PI * 2 + t * speed + i) * 5;
          if (x === 0) ctx.moveTo(x, y + wave);
          else ctx.lineTo(x, y + wave);
        }
        const g = ctx.createLinearGradient(0, 0, canvas.width, 0);
        g.addColorStop(0, "rgba(30,64,175,0)");
        g.addColorStop(0.5, `rgba(59,130,246,${alpha})`);
        g.addColorStop(1, "rgba(30,64,175,0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
}

export default function HardCTA() {
  return (
    <section
      id="quote"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0A1830 0%, #080E1A 60%, #0C1626 100%)" }}
    >
      <PressureCanvas />

      {/* Left directional light */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(20,52,148,0.12) 0%, transparent 70%)", zIndex: 1 }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 2 }}>

        {/* ── SPLIT: left copy / right form ── */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">

          {/* LEFT */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-6 bg-brand-accent-hot" />
                <span className="authority-badge text-brand-accent-hot">Get Help Now</span>
              </div>

              <h2
                className="font-display font-bold text-white mb-6"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", lineHeight: 1.04, letterSpacing: "-0.02em" }}
              >
                Need a Plumber
                <br />
                <span style={{ color: "#93C5FD" }}>Right Now?</span>
              </h2>

              <p className="text-slate-300 text-lg leading-relaxed mb-8" style={{ maxWidth: "440px" }}>
                We understand. When your home is under stress, you need someone calm, fast, and honest.{" "}
                <strong className="text-white">Call us. We&apos;ll handle it.</strong>
              </p>
            </motion.div>

            {/* Big phone CTA */}
            <motion.a
              href="tel:6235513781"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              whileHover={{ scale: 1.03, backgroundColor: "#D97706" }}
              whileTap={{ scale: 0.97 }}
              className="hero-pulse inline-flex items-center gap-4 font-bold text-xl text-white"
              style={{
                background: "#E8960A",
                borderRadius: "6px",
                padding: "18px 32px",
                letterSpacing: "0.01em",
                transition: "background 0.15s ease",
              }}
            >
              <div className="w-9 h-9 rounded-full bg-black/20 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              (623) 551-3781
            </motion.a>

            {/* Micro copy below phone */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex flex-col gap-2 mt-6"
            >
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Clock className="w-3.5 h-3.5 text-brand-blue-light flex-shrink-0" />
                Real person answers. No hold music.
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Zap className="w-3.5 h-3.5 text-brand-accent-hot flex-shrink-0" />
                Same-day availability in most cases.
              </div>
            </motion.div>

            {/* Tone line */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-8 text-slate-600 text-sm italic"
              style={{ borderLeft: "2px solid rgba(59,130,246,0.2)", paddingLeft: "12px" }}
            >
              We don&apos;t guess. We diagnose, we explain, and we fix it right.
            </motion.p>
          </div>

          {/* RIGHT: Form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="p-7 lg:p-8"
              style={{
                background: "rgba(12,22,38,0.9)",
                border: "1px solid rgba(59,130,246,0.14)",
                borderRadius: "6px",
              }}
            >
              <div className="mb-6">
                <h3 className="font-display font-bold text-white text-xl mb-1">Get My Same-Day Quote</h3>
                <p className="text-slate-500 text-sm">We reply fast — usually within minutes.</p>
              </div>
              <QuoteForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
