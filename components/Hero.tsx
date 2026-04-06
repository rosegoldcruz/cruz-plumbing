"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, MessageSquare, Star, Shield, Zap, Heart, DollarSign, Home } from "lucide-react";
import Image from "next/image";

const trustPoints = [
  { icon: Heart, label: "Family Owned" },
  { icon: Shield, label: "Licensed & Insured" },
  { icon: MessageSquare, label: "Clear Communication" },
  { icon: DollarSign, label: "Financing Available" },
  { icon: Home, label: "Respectful In-Home Service" },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated water/pipe canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;

      // Flowing pipe streaks
      for (let i = 0; i < 8; i++) {
        const y = (canvas.height * (i + 1)) / 9;
        const offset = Math.sin(t + i * 0.7) * 40;
        const alpha = 0.04 + Math.sin(t * 0.5 + i) * 0.02;

        const grad = ctx.createLinearGradient(0, y, canvas.width, y);
        grad.addColorStop(0, "rgba(59,130,246,0)");
        grad.addColorStop(0.3, `rgba(59,130,246,${alpha})`);
        grad.addColorStop(0.7, `rgba(96,165,250,${alpha * 1.5})`);
        grad.addColorStop(1, "rgba(59,130,246,0)");

        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        for (let x = 0; x < canvas.width; x += 20) {
          const wave = Math.sin((x / canvas.width) * Math.PI * 3 + t + i) * 8;
          ctx.lineTo(x, y + offset + wave);
        }
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5 + i * 0.3;
        ctx.stroke();
      }

      // Glowing orbs
      const orbs = [
        { x: 0.2, y: 0.3, r: 200 },
        { x: 0.75, y: 0.6, r: 250 },
        { x: 0.5, y: 0.9, r: 180 },
      ];
      orbs.forEach((orb, i) => {
        const pulse = Math.sin(t * 0.6 + i * 1.2) * 0.015;
        const alpha = 0.06 + pulse;
        const grad = ctx.createRadialGradient(
          canvas.width * orb.x, canvas.height * orb.y, 0,
          canvas.width * orb.x, canvas.height * orb.y, orb.r
        );
        grad.addColorStop(0, `rgba(30,64,175,${alpha * 2})`);
        grad.addColorStop(1, "rgba(30,64,175,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(canvas.width * orb.x, canvas.height * orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-navy"
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy/90 to-brand-blue-dark/30" style={{ zIndex: 1 }} />

      {/* Top-right blue accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-3xl pipe-glow-anim" style={{ zIndex: 1 }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full" style={{ zIndex: 2 }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT: Copy */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2 bg-brand-blue/20 border border-brand-blue/30 rounded-full px-4 py-2 w-fit"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-brand-accent text-brand-accent" />
                ))}
              </div>
              <span className="text-slate-200 text-sm font-medium">Trusted Locally · License #1050063</span>
            </motion.div>

            {/* Headline */}
            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
              <h1 className="font-display font-bold leading-tight">
                <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white">
                  Trusted Family
                </span>
                <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl gradient-text mt-1">
                  Plumbing
                </span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl text-slate-300 font-medium mt-3">
                  for the Homes That Matter Most
                </span>
              </h1>
            </motion.div>

            {/* Sub-headline */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-lg"
            >
              Fast response. Honest work. Real people who treat you like family.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="tel:6235513781"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="hero-pulse flex items-center justify-center gap-3 bg-brand-blue hover:bg-brand-blue-light text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-200"
              >
                <Phone className="w-5 h-5" />
                Call Now – (623) 551-3781
              </motion.a>
              <motion.a
                href="#quote"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-2xl text-lg backdrop-blur-sm transition-all duration-200"
              >
                <MessageSquare className="w-5 h-5" />
                Get a Same-Day Quote
              </motion.a>
            </motion.div>

            {/* Trust points strip */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-3 mt-2"
            >
              {trustPoints.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5"
                >
                  <Icon className="w-3.5 h-3.5 text-brand-blue-light flex-shrink-0" />
                  <span className="text-slate-300 text-xs font-medium">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex items-center justify-center"
          >
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-blue/20 to-transparent blur-2xl" />

            {/* Main image */}
            <div className="relative w-full max-w-lg drift-anim">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(30,64,175,0.3)]">
                <Image
                  src="/van.png"
                  alt="Cruz Plumbing – Family Service Van"
                  width={600}
                  height={450}
                  className="w-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
              </div>

              {/* Floating badge: Same Day */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                className="absolute -top-4 -right-4 bg-brand-accent text-brand-navy font-bold text-sm px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Same Day Service
              </motion.div>

              {/* Floating badge: Family */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
                className="absolute -bottom-4 -left-4 bg-brand-navy border border-brand-blue/40 text-white font-semibold text-sm px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2"
              >
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                Family. Community. Trust.
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center pt-2"
          >
            <div className="w-1.5 h-3 bg-brand-blue-light rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
