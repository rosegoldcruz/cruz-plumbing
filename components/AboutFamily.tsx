"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutFamily() {
  return (
    <section
      id="about"
      className="relative py-24 lg:py-28 overflow-hidden"
      style={{ background: "#050505" }}
    >
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden"
            style={{ borderRadius: "6px", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <Image
              src="/main.png"
              alt="Cruz Plumbing family team"
              width={640}
              height={420}
              className="w-full object-cover"
            />
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-6" style={{ background: "#2684FF" }} />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#2684FF" }}>Who We Are</span>
            </div>

            <h2
              className="font-display font-bold text-white mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
            >
              Not a Call Center.<br />
              <span style={{ color: "#93C5FD" }}>Real Plumbers.</span>
            </h2>

            <p className="text-slate-300 text-base leading-relaxed mb-4">
              Cruz Plumbing is a family business. When you call, you talk to the same people who show up and do the work.
            </p>

            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              We walk in calm, assess fast, and explain everything before we touch anything. Shoe covers. Clean workspace. Straight answers.
            </p>

            <div className="flex items-center gap-4">
              <div
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white"
                style={{ background: "#0052CC", borderRadius: "3px" }}
              >
                Family Owned
              </div>
              <span className="text-slate-500 text-sm">California · Expanding to AZ</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
