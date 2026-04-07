"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const shots = [
  { src: "/apprentice.png", title: "Learning on real jobs", span: "lg:col-span-2 lg:row-span-2" },
  { src: "/crew2.png", title: "Crew in the yard", span: "" },
  { src: "/Cruise Trump.png", title: "Service van ready to roll", span: "" },
  { src: "/cruz-biz.png", title: "Brand mark on the job", span: "" },
  { src: "/cruz.png", title: "Cruz identity", span: "" },
  { src: "/flyer-1.png", title: "Story behind the company", span: "lg:row-span-2" },
  { src: "/flyer-2.png", title: "Roots and family history", span: "" },
  { src: "/housecalls.png", title: "House calls every day", span: "lg:col-span-2" },
  { src: "/main.png", title: "Family-owned team", span: "lg:col-span-2" },
  { src: "/on-site.png", title: "Field work, not stock smiles", span: "" },
  { src: "/pupper.png", title: "Real family energy", span: "" },
  { src: "/summer.png", title: "Arizona heat, still showing up", span: "" },
  { src: "/the%20crew.png", title: "The crew", span: "" },
  { src: "/the-crew.png", title: "Workday lineup", span: "" },
  { src: "/the-crews.png", title: "More crew moments", span: "" },
  { src: "/van.png", title: "Truck stock and tools", span: "lg:col-span-2" },
  { src: "/written-piece.png", title: "Cruz in print", span: "lg:row-span-2" },
];

export default function FieldGallery() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "#050505" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background:
          "radial-gradient(circle at 18% 20%, rgba(38,132,255,0.08), transparent 24%), radial-gradient(circle at 84% 16%, rgba(255,255,255,0.04), transparent 18%)",
      }} />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: "#2684FF" }} />
            <span className="authority-badge" style={{ color: "#2684FF" }}>Real Jobsite Texture</span>
          </div>
          <h2 style={{ fontSize: "clamp(2.1rem, 4.5vw, 3.9rem)", maxWidth: "760px", color: "#fff" }}>
            The Work, The Crew,
            <br />
            <span style={{ color: "#93C5FD" }}>The Vans, The Real Story.</span>
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-2xl">
            No stock-photo gloss. This is the texture of a real home-service business: field grime, truck inventory, family history, and actual work in motion.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4 auto-rows-[140px] sm:auto-rows-[180px] lg:auto-rows-[150px]">
          {shots.map((shot, index) => (
            <motion.div
              key={`${shot.src}-${index}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: Math.min(index * 0.03, 0.3) }}
              className={`photo-frame grain-panel rounded-[6px] ${shot.span}`}
            >
              <Image
                src={shot.src}
                alt={shot.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 20vw"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 z-10">
                <div className="surface-pressed rounded-[4px] px-3 py-2">
                  <p className="text-white text-xs sm:text-sm font-semibold tracking-wide uppercase">{shot.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}