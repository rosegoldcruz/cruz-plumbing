"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, MessageSquare, Zap, Clock } from "lucide-react";
import QuoteForm from "./QuoteForm";

export default function HardCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;
    let animFrame: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.012;

      // Flowing particles
      for (let i = 0; i < 15; i++) {
        const x = ((t * 40 * (i + 1) * 0.7) % (canvas.width + 40)) - 20;
        const y = canvas.height * ((i + 1) / 16) + Math.sin(t + i) * 20;
        const alpha = 0.05 + Math.sin(t + i) * 0.03;
        const size = 2 + (i % 3);

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
        ctx.fill();
      }

      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <section id="quote" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Dark blue bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-dark/80 via-brand-navy to-brand-navy" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />

      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 1 }}>
        <div className="w-[600px] h-[400px] bg-brand-blue/15 rounded-full blur-3xl pipe-glow-anim" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 2 }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEFT: Call to action */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-2 mb-6"
            >
              <Zap className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm font-semibold tracking-widest uppercase">Act Now</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6"
            >
              Need a Plumber
              <span className="block gradient-text">Right Now?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-xl leading-relaxed mb-10"
            >
              We understand. When your home is under stress, you need someone calm, fast, and honest.
              That&apos;s exactly who we are. <strong className="text-white">Call us. We&apos;ll handle it.</strong>
            </motion.p>

            {/* Big phone button */}
            <motion.a
              href="tel:6235513781"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="hero-pulse inline-flex items-center gap-4 bg-brand-blue hover:bg-brand-blue-light text-white font-bold text-xl px-8 py-5 rounded-2xl shadow-[0_0_50px_rgba(59,130,246,0.5)] transition-all duration-200 w-full sm:w-auto justify-center"
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              (623) 551-3781
            </motion.a>

            {/* Trust micro-copy */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Clock className="w-4 h-4 text-brand-blue-light" />
                Real human answers. Every time.
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Zap className="w-4 h-4 text-brand-accent" />
                Same-day availability
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Quote form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-brand-blue-light" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Request a Same-Day Quote</h3>
                <p className="text-slate-500 text-sm">We&apos;ll reach out within minutes</p>
              </div>
            </div>
            <QuoteForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
