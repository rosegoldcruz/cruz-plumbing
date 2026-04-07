"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import Image from "next/image";

const services = [
  "Emergency Plumbing",
  "Leak Detection",
  "Water Heater Repair",
  "Drain Cleaning",
  "Fixture Installation",
  "Pipe Repair",
];

export default function Footer() {
  return (
    <footer className="relative" style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.06)" }}>

      {/* Slogan */}
      <div className="py-10 text-center" style={{ background: "#0052CC" }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white font-display font-bold"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", lineHeight: 1.0, letterSpacing: "-0.01em" }}
        >
          With Cruz You Don&apos;t Lose!
        </motion.p>
      </div>

      {/* Footer grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-14 h-10 overflow-hidden" style={{ borderRadius: "3px" }}>
                <Image src="/Cruise Trump.png" alt="Cruz Plumbing" fill className="object-cover" />
              </div>
              <div>
                <p className="font-display font-bold text-white text-sm">CRUZ PLUMBING</p>
                <p className="text-xs uppercase tracking-widest" style={{ color: "#2684FF" }}>Family Owned</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Trusted plumbing for California families. Expanding to Arizona.
            </p>
            <a
              href="tel:9093914033"
              className="inline-flex items-center gap-2 text-white font-semibold text-sm"
              style={{ color: "#2684FF" }}
            >
              <Phone className="w-3.5 h-3.5" />
              (909) 391-4033
            </a>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Services</h4>
            <ul className="flex flex-col gap-2">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-slate-400 hover:text-white text-sm transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm">
              <p className="text-slate-400">Mon – Fri: 7am – 7pm</p>
              <p className="text-slate-400">Sat: 8am – 5pm</p>
              <p className="text-green-400 font-medium">24/7 Emergency Available</p>
              <p className="text-slate-500 text-xs mt-2">California · Expanding to AZ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t py-5 px-4" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-600 text-xs">&copy; {new Date().getFullYear()} Cruz Plumbing & Rooter Services · All rights reserved</p>
          <p className="text-xs italic" style={{ color: "#2684FF" }}>With Cruz You Don&apos;t Lose!</p>
        </div>
      </div>

      <div className="h-16 md:hidden" />
    </footer>
  );
}
