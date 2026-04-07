"use client";

import { motion } from "framer-motion";
import { Star, ArrowUpRight } from "lucide-react";

const googleMapsUrl = "https://www.google.com/maps/place/Cruz+Plumbing+%26+Rooter+Services/@34.0268284,-118.2219299,10z/data=!4m8!3m7!1s0x80c33370852f3dd7:0x83fb16b5f3956e86!8m2!3d34.028404!4d-117.598009!9m1!1b1!16s%2Fg%2F11fpkgv3nh?entry=ttu";

export default function SocialProof() {
  return (
    <section
      id="reviews"
      className="relative py-24 lg:py-28 overflow-hidden"
      style={{ background: "#000000" }}
    >
      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-6" style={{ background: "#2684FF" }} />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#2684FF" }}>
              Google Reviews
            </span>
            <div className="h-px w-6" style={{ background: "#2684FF" }} />
          </div>

          <div className="flex justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-7 h-7 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          <p className="text-white font-display font-bold text-5xl mb-2">4.9</p>
          <p className="text-slate-400 text-base mb-8">
            Verified rating on Google · California
          </p>

          <p className="text-slate-300 text-lg leading-relaxed max-w-xl mx-auto mb-8">
            Latino-owned. LGBTQ+ friendly. Real plumbers who show up, do the work right, and treat your home with respect.
          </p>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="metal-button inline-flex items-center gap-2 px-6 py-3 text-white font-semibold"
            style={{ borderRadius: "5px" }}
          >
            Read Our Reviews on Google
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
