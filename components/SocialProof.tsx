"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Maria G.",
    location: "Avondale, AZ",
    stars: 5,
    text: "Showed up fast. Fixed it same day. Fair price. Like having a neighbor who happens to be a plumber.",
    initials: "MG",
    service: "Emergency Pipe Repair",
    size: "large",
  },
  {
    name: "James T.",
    location: "Goodyear, AZ",
    stars: 5,
    text: "Actually explained what was wrong with my water heater, gave me options, and didn't push the most expensive one. Real honest people.",
    initials: "JT",
    service: "Water Heater Replacement",
    size: "small",
  },
  {
    name: "Sandra R.",
    location: "Litchfield Park, AZ",
    stars: 5,
    text: "Respectful in my home — wore shoe covers, cleaned up after. The drain was cleared in under an hour.",
    initials: "SR",
    service: "Drain Cleaning",
    size: "small",
  },
  {
    name: "Carlos M.",
    location: "Tolleson, AZ",
    stars: 5,
    text: "Called at 8pm thinking I'd get a voicemail. They picked up and walked me through stopping the leak over the phone while they were on their way. Above and beyond.",
    initials: "CM",
    service: "Emergency Leak",
    size: "large",
  },
  {
    name: "Diane L.",
    location: "Avondale, AZ",
    stars: 5,
    text: "Upfront price before starting. No surprise bill. Simple and honest.",
    initials: "DL",
    service: "Toilet Repair",
    size: "small",
  },
  {
    name: "Robert H.",
    location: "Goodyear, AZ",
    stars: 5,
    text: "Family business all the way. You can feel it. We'll be calling Cruz Plumbing every time.",
    initials: "RH",
    service: "Fixture Install",
    size: "small",
  },
];

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center text-xs font-bold text-brand-blue-light"
      style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "3px" }}>
      {initials}
    </div>
  );
}

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!ref.current) return;

      gsap.fromTo(
        ref.current.querySelectorAll(".review-card"),
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0,
          duration: 0.6, stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 72%", once: true },
        }
      );
    };
    load();
  }, []);

  return (
    <section
      id="reviews"
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0C1626 0%, #080E1A 100%)" }}
    >
      {/* Subtle light from top-center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(30,64,175,0.07) 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header — left-aligned ── */}
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-6 bg-brand-accent-hot" />
              <span className="authority-badge text-brand-accent-hot">Customer Reviews</span>
            </div>
            <h2
              className="font-display font-bold text-white"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
            >
              Neighbors Trust Us.
              <br />
              <span style={{ color: "#93C5FD" }}>Every Single Time.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:text-right"
          >
            {/* Google rating block — right side */}
            <div className="inline-flex flex-col items-center lg:items-end gap-1">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-white font-display font-bold text-4xl">5.0</p>
              <p className="text-slate-500 text-sm">Google Rating · West Valley, AZ</p>
            </div>
          </motion.div>
        </div>

        {/* ── STAGGERED REVIEW GRID ── */}
        {/* Row 1: 1 large + 2 small */}
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr] gap-4 mb-4">
          {reviews.slice(0, 3).map((r, i) => (
            <div
              key={r.name}
              className="review-card flex flex-col gap-4 p-6 transition-all duration-200 hover:border-white/10"
              style={{
                opacity: 0,
                background: "rgba(12,22,38,0.8)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "5px",
              }}
            >
              <Quote className="w-6 h-6" style={{ color: "rgba(59,130,246,0.25)" }} />
              <div className="flex gap-0.5">
                {[...Array(r.stars)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed flex-1">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <Avatar initials={r.initials} />
                <div>
                  <p className="text-white font-semibold text-sm">{r.name}</p>
                  <p className="text-slate-600 text-xs">{r.location} · {r.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: 2 small + 1 large */}
        <div className="grid lg:grid-cols-[1fr_1fr_1.4fr] gap-4">
          {reviews.slice(3).map((r) => (
            <div
              key={r.name}
              className="review-card flex flex-col gap-4 p-6 transition-all duration-200 hover:border-white/10"
              style={{
                opacity: 0,
                background: "rgba(12,22,38,0.8)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "5px",
              }}
            >
              <Quote className="w-6 h-6" style={{ color: "rgba(59,130,246,0.25)" }} />
              <div className="flex gap-0.5">
                {[...Array(r.stars)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed flex-1">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <Avatar initials={r.initials} />
                <div>
                  <p className="text-white font-semibold text-sm">{r.name}</p>
                  <p className="text-slate-600 text-xs">{r.location} · {r.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-slate-700 text-xs text-center mt-10">
          Google & direct customer feedback · AZ License #1050063
        </p>
      </div>
    </section>
  );
}
