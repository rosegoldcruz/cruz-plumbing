"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function AboutFamily() {
  return (
    <section
      id="about"
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Directional light — comes from right */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(30,64,175,0.06) 0%, transparent 65%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── EDITORIAL HEADER — broken from center ── */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end mb-14 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-6 bg-brand-blue-lt" />
              <span className="authority-badge text-brand-blue-lt">Who We Are</span>
            </div>
            <h2
              className="font-display font-bold text-white"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", lineHeight: 1.04, letterSpacing: "-0.02em" }}
            >
              Not a Call Center.
              <br />
              <span style={{ color: "#93C5FD" }}>Real Plumbers.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:pb-2"
          >
            <p className="text-slate-300 text-lg leading-relaxed">
              Cruz Plumbing is a family business. When you call us, you&apos;re talking to the same people who show up, do the work, and care whether it holds.
            </p>
            <p className="text-slate-500 text-base leading-relaxed mt-4">
              We&apos;re not a franchise. We don&apos;t dispatch strangers. We&apos;re rooted in the West Valley and we treat every home like it&apos;s our own — because our neighbors live in these homes.
            </p>
          </motion.div>
        </div>

        {/* ── ASYMMETRIC IMAGE GRID + EDITORIAL COPY ── */}
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 items-start">

          {/* LEFT: Staggered image collage — intentionally asymmetric */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main image — large, slightly cropped */}
            <div className="relative overflow-hidden photo-frame grain-panel surface-elevated" style={{ borderRadius: "4px" }}>
              <Image
                src="/main.png"
                alt="Cruz Plumbing — family team"
                width={680}
                height={440}
                className="w-full object-cover object-center"
              />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(160deg, transparent 55%, rgba(8,14,26,0.6) 100%)" }} />
            </div>

            {/* Offset secondary images */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="relative overflow-hidden photo-frame" style={{ borderRadius: "4px" }}>
                <Image src="/the-crew.png" alt="The Cruz crew" width={340} height={220} className="w-full object-cover" />
              </div>
              <div className="relative overflow-hidden mt-5 photo-frame" style={{ borderRadius: "4px" }}>
                {/* offset vertically — asymmetric tension */}
                <Image src="/on-site.png" alt="On the job" width={340} height={220} className="w-full object-cover" />
              </div>
            </div>

            {/* Floating editorial label — overlapping grid */}
            <div
              className="absolute bottom-16 -right-4 lg:-right-8 px-4 py-3 text-sm font-semibold text-white"
              style={{
                background: "#0052CC",
                borderRadius: "3px",
                color: "#ffffff",
                letterSpacing: "0.02em",
                zIndex: 10,
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              Family Owned Since Day One
            </div>
          </motion.div>

          {/* RIGHT: Editorial copy blocks */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8 lg:pt-4"
          >
            {/* Block 1 */}
            <div className="surface-pressed grain-panel border-l-2 pl-5 pr-4 py-4 rounded-r-[6px]" style={{ borderColor: "rgba(59,130,246,0.3)" }}>
              <h3 className="font-display font-bold text-white text-xl mb-2">We Show Up Calm When Things Are Stressful</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                A burst pipe, a failed water heater, a backed-up drain — your home is under stress. We&apos;ve been here before. We walk in level-headed, assess fast, and communicate clearly before touching anything.
              </p>
            </div>

            {/* Block 2 */}
            <div className="surface-pressed grain-panel border-l-2 pl-5 pr-4 py-4 rounded-r-[6px]" style={{ borderColor: "rgba(232,150,10,0.3)" }}>
              <h3 className="font-display font-bold text-white text-xl mb-2">Respectful In Your Home. Always.</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Shoe covers. Clean workspace. Straight answers. We don&apos;t leave a mess or a mystery. You know what was wrong, what we did, and what it cost — before we do it.
              </p>
            </div>

            {/* Block 3 */}
            <div className="surface-pressed grain-panel border-l-2 pl-5 pr-4 py-4 rounded-r-[6px]" style={{ borderColor: "rgba(16,185,129,0.3)" }}>
              <h3 className="font-display font-bold text-white text-xl mb-2">The Work Has to Hold</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We don&apos;t do band-aid repairs. If something needs to be done right, we say so. We&apos;d rather take a little more time and have it last than rush and come back.
              </p>
            </div>

            {/* Pull quote */}
            <div className="py-5 px-6 surface-elevated grain-panel"
              style={{ borderRadius: "4px" }}>
              <p className="text-white text-base leading-relaxed italic">
                &ldquo;You&apos;re not just another job to us. This is your home — and that matters.&rdquo;
              </p>
              <p className="text-slate-500 text-sm mt-2 font-medium">— Cruz Family</p>
            </div>

            {/* CTA */}
            <a
              href="#quote"
              className="inline-flex items-center gap-2 text-sm font-semibold group w-fit"
              style={{ color: "#93C5FD" }}
            >
              Get a same-day quote
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
