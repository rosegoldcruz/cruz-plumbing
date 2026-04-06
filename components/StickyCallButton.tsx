"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageSquare, X } from "lucide-react";

export default function StickyCallButton() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Mobile sticky bottom bar */}
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-brand-navy/98 backdrop-blur-xl border-t border-white/10 px-4 py-3 safe-area-bottom"
          >
            <div className="flex gap-3 max-w-sm mx-auto">
              <a
                href="tel:6235513781"
                className="hero-pulse flex-1 flex items-center justify-center gap-2 bg-brand-blue text-white font-bold py-3.5 rounded-xl text-sm shadow-[0_0_20px_rgba(59,130,246,0.4)]"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <a
                href="#quote"
                className="flex-1 flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-semibold py-3.5 rounded-xl text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Get Quote
              </a>
            </div>
          </motion.div>

          {/* Desktop floating button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="hidden md:block fixed bottom-8 right-8 z-50"
          >
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute bottom-16 right-0 bg-brand-navy border border-white/20 rounded-2xl p-4 shadow-2xl w-56"
                >
                  <p className="text-white font-semibold text-sm mb-3">Ready to help!</p>
                  <div className="flex flex-col gap-2">
                    <a
                      href="tel:6235513781"
                      className="flex items-center gap-2 bg-brand-blue text-white font-bold px-4 py-2.5 rounded-xl text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      (623) 551-3781
                    </a>
                    <a
                      href="#quote"
                      onClick={() => setExpanded(false)}
                      className="flex items-center gap-2 bg-white/10 border border-white/20 text-white font-medium px-4 py-2.5 rounded-xl text-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Request Quote
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={() => setExpanded(!expanded)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="hero-pulse w-14 h-14 rounded-full bg-brand-blue shadow-[0_0_30px_rgba(59,130,246,0.6)] flex items-center justify-center text-white"
            >
              <AnimatePresence mode="wait">
                {expanded ? (
                  <motion.div key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }}>
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div key="phone" initial={{ rotate: 90 }} animate={{ rotate: 0 }}>
                    <Phone className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
