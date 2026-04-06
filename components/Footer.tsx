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
    <footer className="relative overflow-hidden" style={{ background: "#080E1A", borderTop: "1px solid rgba(59,130,246,0.12)" }}>
      {/* Gradient top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent" />

      {/* Pre-footer CTA strip */}
      <div className="py-10 px-4" style={{ background: "linear-gradient(90deg, rgba(20,40,100,0.4) 0%, rgba(8,14,26,0) 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-400 text-sm mb-2 tracking-widest uppercase font-semibold">Don&apos;t wait on a problem that gets worse</p>
          <h3 className="font-display font-bold text-3xl text-white mb-6">
            One Call Fixes Everything.
          </h3>
          <motion.a
            href="tel:6235513781"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="hero-pulse inline-flex items-center gap-3 font-bold text-xl px-10 py-4 transition-all duration-150 hover:opacity-90"
            style={{ background: "#E8960A", color: "#080E1A", borderRadius: "5px" }}
          >
            <Phone className="w-5 h-5" />
            (623) 551-3781
          </motion.a>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12">
                <Image src="/cruz-biz.png" alt="Cruz Plumbing" fill className="object-contain" />
              </div>
              <div>
                <p className="font-display font-bold text-white text-lg">CRUZ PLUMBING</p>
                <p className="text-brand-blue-light text-xs tracking-widest uppercase">Family Owned & Operated</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Trusted plumbing for West Valley families. We treat your home like our own — because that&apos;s what neighbors do.
            </p>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-brand-blue-light flex-shrink-0" />
              <span className="text-slate-400 text-sm">AZ License #1050063</span>
            </div>
            <div className="flex items-center gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-brand-accent text-brand-accent" />
              ))}
              <span className="text-slate-400 text-sm ml-1">5.0 · Google Rated</span>
            </div>
            {/* Social */}
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:border-brand-blue/40 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:border-brand-blue/40 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5 flex items-center gap-2">
              Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-slate-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-brand-blue-light/50 group-hover:bg-brand-blue-light transition-colors" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service areas */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-blue-light" />
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
            <p className="text-slate-600 text-xs mt-4">+ surrounding West Valley communities</p>
          </div>

          {/* Contact + Hours */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">Contact</h4>
            <div className="flex flex-col gap-4">
              <a href="tel:6235513781" className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-brand-blue-light" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm group-hover:text-brand-blue-light transition-colors">(623) 551-3781</p>
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
      <div className="border-t border-white/5 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Cruz Plumbing LLC · All rights reserved · AZ Lic. #1050063
          </p>
          <p className="text-slate-600 text-xs">
            Serving Avondale, Goodyear & West Valley, AZ
          </p>
        </div>
      </div>

      {/* Mobile bottom padding for sticky bar */}
      <div className="h-16 md:hidden" />
    </footer>
  );
}
