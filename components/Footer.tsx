"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Shield, Heart, Star, Facebook, Instagram } from "lucide-react";
import Image from "next/image";

const serviceAreas = [
  "Avondale", "Goodyear", "Litchfield Park",
  "Tolleson", "Buckeye", "Peoria",
  "Glendale", "Phoenix (West)", "Surprise",
];

const services = [
  "Leak Repair",
  "Water Heater Repair & Replacement",
  "Drain Cleaning",
  "Emergency Plumbing",
  "Toilet Repair & Install",
  "Fixture Installation",
  "Pipe Repair",
  "Low Pressure Diagnosis",
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#000000", borderTop: "1px solid rgba(0,82,204,0.15)" }}
    >
      {/* Gradient top accent */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,82,204,0.5) 30%, rgba(38,132,255,0.7) 50%, rgba(0,82,204,0.5) 70%, transparent)" }} />

      {/* ── SLOGAN BANNER ── */}
      <div
        className="py-12 px-4 text-center relative overflow-hidden"
        style={{ background: "#0052CC" }}
      >
        {/* Subtle noise on slogan banner */}
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.3'/%3E%3C/svg%3E\")",
          }}
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-white font-display font-bold tracking-tight"
          style={{
            fontFamily: "'Archivo Narrow', 'Arial Narrow', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.01em",
          }}
        >
          With Cruz You Don&apos;t Lose!
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-blue-100 text-base mt-3 font-medium"
        >
          Family-owned · Honest work · Done right the first time
        </motion.p>
      </div>

      {/* Pre-footer CTA strip */}
      <div
        className="py-10 px-4"
        style={{ background: "linear-gradient(90deg, rgba(0,52,153,0.2) 0%, rgba(0,0,0,0) 100%)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-500 text-sm mb-2 tracking-widest uppercase font-semibold">
            Don&apos;t wait on a problem that gets worse
          </p>
          <h3
            style={{
              fontFamily: "'Archivo Narrow', 'Arial Narrow', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              color: "#fff",
              marginBottom: "24px",
              lineHeight: 1.0,
            }}
          >
            One Call Fixes Everything.
          </h3>
          <motion.a
            href="tel:6235513781"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="hero-pulse inline-flex items-center gap-3 font-bold text-xl px-10 py-4 text-white"
            style={{ background: "#0052CC", borderRadius: "5px" }}
          >
            <Phone className="w-5 h-5" />
            (623) 551-3781
          </motion.a>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12">
                <Image src="/cruz-biz.png" alt="Cruz Plumbing" fill className="object-contain" />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Archivo Narrow', 'Arial Narrow', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "#fff",
                  }}
                >
                  CRUZ PLUMBING
                </p>
                <p className="text-xs tracking-widest uppercase" style={{ color: "#2684FF" }}>
                  Family Owned & Operated
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Trusted plumbing for West Valley families. We treat your home like our own — because that&apos;s what neighbors do.
            </p>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 flex-shrink-0" style={{ color: "#2684FF" }} />
              <span className="text-slate-400 text-sm">AZ License #1050063</span>
            </div>
            <div className="flex items-center gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-brand-blue-lt text-brand-blue-lt" />
              ))}
              <span className="text-slate-400 text-sm ml-1">5.0 · Google Rated</span>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 hover:border-brand-blue/50 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 hover:border-brand-blue/50 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">Services</h4>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services"
                    className="text-slate-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-brand-blue/50 group-hover:bg-brand-blue-lt transition-colors" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service areas */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5 flex items-center gap-2">
              <MapPin className="w-4 h-4" style={{ color: "#2684FF" }} />
              Service Areas
            </h4>
            <ul className="flex flex-col gap-2.5">
              {serviceAreas.map((area) => (
                <li key={area}>
                  <span className="text-slate-400 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-green-400/50" />
                    {area}, AZ
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-slate-700 text-xs mt-4">+ surrounding West Valley communities</p>
          </div>

          {/* Contact + Hours */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">Contact</h4>
            <div className="flex flex-col gap-4">
              <a href="tel:6235513781" className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(0,82,204,0.18)", border: "1px solid rgba(0,82,204,0.3)" }}>
                  <Phone className="w-4 h-4" style={{ color: "#2684FF" }} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm group-hover:text-brand-blue-lt transition-colors">
                    (623) 551-3781
                  </p>
                  <p className="text-slate-500 text-xs">Call or Text</p>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Hours</p>
                  <p className="text-slate-400 text-xs mt-1">Mon – Fri: 7am – 7pm</p>
                  <p className="text-slate-400 text-xs">Sat: 8am – 5pm</p>
                  <p className="text-green-400 text-xs font-medium mt-1">24/7 Emergency Available</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Family Owned</p>
                  <p className="text-slate-500 text-xs">Avondale, AZ based</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t py-5 px-4" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Cruz Plumbing LLC · All rights reserved · AZ Lic. #1050063
          </p>
          <p className="text-slate-600 text-xs italic" style={{ color: "#2684FF" }}>
            With Cruz You Don&apos;t Lose!
          </p>
        </div>
      </div>

      {/* Mobile sticky bar spacer */}
      <div className="h-16 md:hidden" />
    </footer>
  );
}
