"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Reviews", href: "#reviews" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "About", href: "#about" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b shadow-[0_1px_0_rgba(59,130,246,0.12)]"
            : "bg-transparent"
        } safe-area-top`}
        style={scrolled ? { background: "rgba(0,0,0,0.96)", backdropFilter: "blur(12px)" } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group" aria-label="Go to homepage">
              <div className="relative w-24 h-12 md:w-32 md:h-14 shrink-0">
                <Image
                  src="/Cruise Trump.png"
                  alt="Cruz Plumbing"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 96px, 128px"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold text-white text-lg tracking-wide">
                  CRUZ PLUMBING
                </span>
                <span className="text-brand-blue-light text-xs font-medium tracking-widest uppercase">
                  Family Owned & Operated
                </span>
              </div>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-slate-300 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue-light transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:6235513781"
                className="hero-pulse flex items-center gap-2 text-white font-bold px-5 py-2.5 text-sm transition-all duration-150 hover:opacity-90"
                style={{ background: "#0052CC", borderRadius: "5px", color: "#ffffff" }}
              >
                <Phone className="w-3.5 h-3.5" />
                (623) 551-3781
              </a>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-white w-12 h-12 inline-flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 backdrop-blur-xl border-b border-white/10 md:hidden overscroll-contain max-h-[calc(100dvh-4rem)] overflow-y-auto"
            style={{ background: "rgba(0,0,0,0.97)" }}
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white text-lg font-medium border-b border-white/10 pb-4"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:6235513781"
                className="flex items-center justify-center gap-2 text-white font-bold px-6 py-4 text-lg mt-2"
                style={{ background: "#0052CC", borderRadius: "5px", color: "#ffffff" }}
              >
                <Phone className="w-5 h-5" />
                Call Now — (623) 551-3781
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
