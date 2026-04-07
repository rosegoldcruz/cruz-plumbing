"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";

const googleMapsUrl = "https://www.google.com/maps/place/Cruz+Plumbing+%26+Rooter+Services/@34.0268284,-118.2219299,10z/data=!4m8!3m7!1s0x80c33370852f3dd7:0x83fb16b5f3956e86!8m2!3d34.028404!4d-117.598009!9m1!1b1!16s%2Fg%2F11fpkgv3nh?entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D";

const verifiedFacts = [
  {
    label: "Google Rating",
    value: "4.9",
    note: "Verified from the California Google Business Profile",
    image: "/Cruise Trump.png",
  },
  {
    label: "Call",
    value: "(909) 391-4033",
    note: "Phone number shown on the real listing",
    image: "/housecalls.png",
  },
  {
    label: "Website",
    value: "cruzplumbingandrooter.com",
    note: "Live site connected to the Google profile",
    image: "/flyer-1.png",
  },
  {
    label: "Profile Tags",
    value: "Latino-owned · LGBTQ+ friendly",
    note: "Attributes shown on the real listing",
    image: "/crew2.png",
  },
];

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
      style={{ background: "#000000" }}
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
              <div className="h-px w-6 bg-brand-blue-lt" />
              <span className="authority-badge text-brand-blue-lt">Customer Reviews</span>
            </div>
            <h2
              className="font-display font-bold text-white"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
            >
              Verified Google Profile.
              <br />
              <span style={{ color: "#93C5FD" }}>No Invented Quotes.</span>
            </h2>
            <p className="text-slate-400 text-base mt-5 max-w-xl">
              The placeholder testimonials are gone. Until the exact review text is imported, this section only shows verified facts from the real California Google Business Profile.
            </p>
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
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-brand-blue-lt text-brand-blue-lt" />
                ))}
                <Star className="w-6 h-6 fill-brand-blue-lt/40 text-brand-blue-lt" />
              </div>
              <p className="text-white font-display font-bold text-4xl">4.9</p>
              <p className="text-slate-500 text-sm">Google Rating · California listing</p>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-5 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="review-card surface-elevated grain-panel p-6 sm:p-8 rounded-[6px]"
            style={{ opacity: 0 }}
          >
            <div className="grid sm:grid-cols-[1.1fr_0.9fr] gap-6 items-center">
              <div>
                <p className="text-slate-500 text-xs tracking-[0.22em] uppercase font-semibold mb-3">Verified profile facts</p>
                <h3 className="text-white font-display text-3xl leading-none mb-4">Cruz Plumbing & Rooter Services</h3>
                <div className="flex items-center gap-2 mb-4 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-brand-blue-lt" />
                  Real Google Business Profile, not made-up review copy
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Google did not expose the public review bodies in a scrapeable response from the link you sent, so I removed the fake Arizona testimonials instead of keeping false social proof on the page.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="metal-button inline-flex items-center justify-center gap-2 px-5 py-3 text-white font-semibold rounded-[6px]"
                  >
                    Read Reviews on Google
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <a
                    href="tel:19093914033"
                    className="surface-pressed grain-panel inline-flex items-center justify-center gap-2 px-5 py-3 text-slate-200 font-semibold rounded-[6px]"
                  >
                    <Phone className="w-4 h-4 text-brand-blue-lt" />
                    (909) 391-4033
                  </a>
                </div>
              </div>
              <div className="relative photo-frame rounded-[6px] aspect-[1.08/1]">
                <Image src="/written-piece.png" alt="Cruz Plumbing profile feature" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 28vw" />
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {verifiedFacts.map((fact) => (
            <div
              key={fact.label}
              className="review-card surface-elevated grain-panel flex flex-col gap-4 p-6 transition-all duration-200 hover:border-white/10"
              style={{
                opacity: 0,
                borderRadius: "5px",
              }}
            >
              <div className="flex items-start gap-4">
                <div className="relative w-20 h-20 flex-shrink-0 rounded-[5px] photo-frame">
                  <Image src={fact.image} alt={fact.label} fill className="object-cover" sizes="80px" />
                </div>
                <div className="min-w-0">
                  <p className="text-slate-500 text-xs tracking-[0.18em] uppercase font-semibold mb-1">{fact.label}</p>
                  <p className="text-white font-semibold text-lg leading-tight">{fact.value}</p>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">{fact.note}</p>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>

        <p className="text-slate-700 text-xs text-center mt-10">
          Real listing metadata only until exact Google review excerpts are imported
        </p>
      </div>
    </section>
  );
}
