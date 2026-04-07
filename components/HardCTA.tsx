"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, Clock, Zap } from "lucide-react";
import Image from "next/image";
import QuoteForm from "./QuoteForm";

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
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.005;

      for (let i = 0; i < 8; i++) {
        const y = (canvas.height / 9) * (i + 1);
        const speed = 0.35 + i * 0.07;
        const alpha = 0.012 + (i % 2) * 0.006;

        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 6) {
          const wave = Math.sin((x / canvas.width) * Math.PI * 2 + t * speed + i) * 4.5;
          if (x === 0) ctx.moveTo(x, y + wave);
          else ctx.lineTo(x, y + wave);
        }
        const g = ctx.createLinearGradient(0, 0, canvas.width, 0);
        g.addColorStop(0,   "rgba(0,52,153,0)");
        g.addColorStop(0.5, `rgba(0,82,204,${alpha})`);
        g.addColorStop(1,   "rgba(0,52,153,0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
}

export default function HardCTA() {
  return (
    <section
      id="quote"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#050505" }}
    >
      <PressureCanvas />

      {/* Left glow */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(0,82,204,0.1) 0%, transparent 70%)", zIndex: 1 }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12" style={{ zIndex: 2 }}>
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
                <div className="h-px w-6" style={{ background: "#2684FF" }} />
                <span className="authority-badge" style={{ color: "#2684FF" }}>Get Help Now</span>
              </div>

              <h2
                style={{
                  fontFamily: "'Archivo Narrow', 'Arial Narrow', sans-serif",
                  fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.02em",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "24px",
                }}
              >
                Need a Plumber
                <br />
                <span style={{ color: "#2684FF" }}>Right Now?</span>
              </h2>

              <p className="text-slate-300 text-lg leading-relaxed mb-8" style={{ maxWidth: "440px" }}>
                We understand. When your home is under stress, you need someone calm, fast, and honest.{" "}
                <strong className="text-white">Call us. We&apos;ll handle it.</strong>
              </p>
            </motion.div>

            {/* Phone CTA — blue */}
            <motion.a
              href="tel:6235513781"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hero-pulse metal-button inline-flex items-center gap-4 font-bold text-xl text-white"
              style={{
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

            {/* Micro copy */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex flex-col gap-3 mt-6"
            >
              <div className="surface-pressed grain-panel flex items-center gap-3 text-slate-400 text-sm px-4 py-3 rounded-[6px]">
                <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#2684FF" }} />
                Real person answers. No hold music.
              </div>
              <div className="surface-pressed grain-panel flex items-center gap-3 text-slate-400 text-sm px-4 py-3 rounded-[6px]">
                <Zap className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#2684FF" }} />
                Same-day availability in most cases.
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-3 mt-8 max-w-xl">
              <div className="relative photo-frame rounded-[6px] aspect-[1.08/0.9]">
                <Image src="/flyer-1.png" alt="Cruz family story feature" fill className="object-cover" sizes="240px" />
              </div>
              <div className="relative photo-frame rounded-[6px] aspect-[1.08/0.9] translate-y-5">
                <Image src="/flyer-2.png" alt="Cruz business feature" fill className="object-cover" sizes="240px" />
              </div>
            </div>

            {/* Tone line */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-8 text-slate-500 text-sm italic"
              style={{ borderLeft: "2px solid rgba(0,82,204,0.25)", paddingLeft: "12px" }}
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
              className="p-7 lg:p-8 surface-elevated grain-panel"
              style={{
                borderRadius: "6px",
              }}
            >
              <div className="mb-6">
                <h3
                  style={{
                    fontFamily: "'Archivo Narrow', 'Arial Narrow', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    color: "#fff",
                    marginBottom: "4px",
                  }}
                >
                  Get My Same-Day Quote
                </h3>
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
