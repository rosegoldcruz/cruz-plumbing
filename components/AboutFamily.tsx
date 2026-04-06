"use client";

import { motion } from "framer-motion";
import { Heart, MapPin, Users, Shield } from "lucide-react";
import Image from "next/image";

export default function AboutFamily() {
  return (
    <section id="about" className="relative py-24 lg:py-32 bg-brand-navy-light overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy-light to-brand-navy" />
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: Images collage */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10">
                  <Image src="/cruz.png" alt="Cruz Plumbing team" fill className="object-cover" />
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                  <Image src="/housecalls.png" alt="On a house call" fill className="object-cover" />
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-8">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                  <Image src="/apprentice.png" alt="Teaching the next generation" fill className="object-cover" />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10">
                  <Image src="/summer.png" alt="Cruz family" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Floating tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-brand-navy border border-brand-blue/30 rounded-2xl px-5 py-3 flex items-center gap-3 shadow-2xl whitespace-nowrap"
            >
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
              <span className="text-white font-semibold text-sm">Real Family. Real Community.</span>
            </motion.div>
          </motion.div>

          {/* RIGHT: Copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col gap-6 pt-8 lg:pt-0"
          >
            <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 rounded-full px-4 py-2 w-fit">
              <Heart className="w-4 h-4 text-rose-400" />
              <span className="text-rose-400 text-sm font-semibold tracking-widest uppercase">About Us</span>
            </div>

            <h2 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight">
              We&apos;re Not a Call Center.
              <span className="block gradient-text">We&apos;re Your Neighbors.</span>
            </h2>

            <p className="text-slate-300 text-lg leading-relaxed">
              Cruz Plumbing is a family business built on doing right by the people we serve. When your home has a problem, you don&apos;t want a stranger — you want someone who shows up calm, explains what&apos;s wrong without the runaround, and fixes it like it&apos;s their own house.
            </p>

            <p className="text-slate-400 text-base leading-relaxed">
              That&apos;s who we are. We&apos;re rooted in the West Valley, we&apos;ve served hundreds of local families, and we treat every job the same — with respect, honesty, and craftsmanship that lasts.
            </p>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {[
                { icon: Users, label: "Family Team", desc: "We work together. You feel it." },
                { icon: MapPin, label: "Local Roots", desc: "West Valley born and raised." },
                { icon: Shield, label: "Calm Under Pressure", desc: "When stress is high, we stay level." },
                { icon: Heart, label: "People First", desc: "Your home. Your family. Our priority." },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-3 bg-white/3 border border-white/5 rounded-xl p-4">
                  <div className="w-8 h-8 rounded-lg bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-brand-blue-light" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{label}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
