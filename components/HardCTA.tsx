"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import QuoteForm from "./QuoteForm";

export default function HardCTA() {
  return (
    <section
      id="quote"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#050505" }}
    >
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">

          {/* LEFT — copy + phone CTA */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-6" style={{ background: "#2684FF" }} />
                <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#2684FF" }}>Get Help Now</span>
              </div>

              <h2
                className="font-display font-bold text-white mb-6"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", lineHeight: 1.0, letterSpacing: "-0.02em" }}
              >
                Need a Plumber<br />
                <span style={{ color: "#2684FF" }}>Right Now?</span>
              </h2>

              <p className="text-slate-300 text-lg leading-relaxed mb-8" style={{ maxWidth: "420px" }}>
                Call us. A real person answers. We show up same day.
              </p>
            </motion.div>

            <motion.a
              href="tel:9093914033"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hero-pulse metal-button inline-flex items-center gap-3 font-bold text-xl text-white"
              style={{ borderRadius: "6px", padding: "18px 32px" }}
            >
              <Phone className="w-5 h-5" />
              (909) 391-4033
            </motion.a>
          </div>

          {/* RIGHT — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="p-7 lg:p-8"
              style={{
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "6px",
              }}
            >
              <div className="mb-6">
                <h3 className="font-display font-bold text-white text-xl mb-1">
                  Get a Same-Day Quote
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
