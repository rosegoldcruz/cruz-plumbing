"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const pillars = [
  "Same-Day Service",
  "Licensed & Insured",
  "Upfront Pricing",
  "24/7 Emergency",
  "Family Owned",
  "4.9★ Google Rated",
];

export default function TrustBar() {
  return (
    <div className="relative py-6" style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {pillars.map((p) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#2684FF" }} />
              <span className="text-slate-300 text-sm font-medium whitespace-nowrap">{p}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
