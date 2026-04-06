"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    name: "Maria G.",
    location: "Avondale, AZ",
    stars: 5,
    text: "Showed up fast. Fixed it same day. Fair price. I was stressed about a burst pipe and they made the whole thing easy. Like having a neighbor who happens to be a plumber.",
    avatar: "/crew2.png",
    service: "Emergency Pipe Repair",
  },
  {
    name: "James T.",
    location: "Goodyear, AZ",
    stars: 5,
    text: "I've used bigger companies before and always felt like a number. Cruz Plumbing actually explained what was wrong with my water heater, gave me options, and didn't push the most expensive one. Real honest people.",
    avatar: null,
    initials: "JT",
    service: "Water Heater Replacement",
  },
  {
    name: "Sandra R.",
    location: "Litchfield Park, AZ",
    stars: 5,
    text: "They were respectful in my home, wore shoe covers, and cleaned up after themselves. That stuff matters when you have little kids running around. The drain clog was cleared in under an hour.",
    avatar: null,
    initials: "SR",
    service: "Drain Cleaning",
  },
  {
    name: "Carlos M.",
    location: "Tolleson, AZ",
    stars: 5,
    text: "I called at 8pm thinking I'd get a voicemail. They picked up and walked me through stopping the leak over the phone while they were on their way. That's above and beyond.",
    avatar: null,
    initials: "CM",
    service: "Emergency Leak",
  },
  {
    name: "Diane L.",
    location: "Avondale, AZ",
    stars: 5,
    text: "They gave me an upfront price before starting any work. No surprise bill at the end. Simple and honest — that's all you want when something's broken in your house.",
    avatar: null,
    initials: "DL",
    service: "Toilet Repair",
  },
  {
    name: "Robert H.",
    location: "Goodyear, AZ",
    stars: 5,
    text: "Family business all the way. You can feel it. These guys genuinely care about doing good work, not just getting in and out. We'll be calling Cruz Plumbing every time from now on.",
    avatar: null,
    initials: "RH",
    service: "Fixture Installation",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-brand-accent text-brand-accent" />
      ))}
    </div>
  );
}

export default function SocialProof() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current.querySelectorAll(".review-card"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
    };
    loadGSAP();
  }, []);

  return (
    <section id="reviews" ref={sectionRef} className="relative py-24 lg:py-32 bg-brand-navy-light overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy to-brand-navy-light" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-1 mb-6"
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 fill-brand-accent text-brand-accent" />
            ))}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl text-white mb-4"
          >
            Neighbors Trust Us.
            <span className="gradient-text-gold"> Every Time.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-xl"
          >
            Real customers. Real homes. Real results.
          </motion.p>

          {/* Google rating block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 mt-8"
          >
            <div className="text-4xl font-display font-bold text-white">5.0</div>
            <div>
              <div className="flex gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-brand-accent text-brand-accent" />
                ))}
              </div>
              <p className="text-slate-400 text-sm">Google Rating · West Valley AZ</p>
            </div>
          </motion.div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="review-card group relative bg-white/5 border border-white/10 hover:border-brand-blue/40 rounded-2xl p-6 card-lift transition-all duration-300"
              style={{ opacity: 0 }}
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-brand-blue/30 mb-4" />

              {/* Stars */}
              <StarRating count={review.stars} />

              {/* Review text */}
              <p className="text-slate-300 text-sm leading-relaxed mt-4 mb-6">&ldquo;{review.text}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                {review.avatar ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-brand-blue/30">
                    <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center text-brand-blue-light font-bold text-sm">
                    {review.initials}
                  </div>
                )}
                <div>
                  <p className="text-white font-semibold text-sm">{review.name}</p>
                  <p className="text-slate-500 text-xs">{review.location} · {review.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-14"
        >
          <p className="text-slate-500 text-sm">Reviews from Google and direct customer feedback. License #1050063</p>
        </motion.div>
      </div>
    </section>
  );
}
