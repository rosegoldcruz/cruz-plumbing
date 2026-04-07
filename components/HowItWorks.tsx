"use client";

import { useEffect, useRef } from "react";
import { Phone, Search, CheckCircle2 } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Phone,
    title: "Call Us",
    desc: "One call. A real person answers — no hold music, no call centers.",
    accent: "#3B82F6",
  },
  {
    n: "02",
    icon: Search,
    title: "We Diagnose",
    desc: "On time. Upfront price before anything starts.",
    accent: "#0052CC",
  },
  {
    n: "03",
    icon: CheckCircle2,
    title: "We Fix It Right",
    desc: "Done right, cleaned up, guaranteed.",
    accent: "#10B981",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!ref.current) return;
      gsap.fromTo(
        ref.current.querySelectorAll(".step"),
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0,
          duration: 0.6, stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 72%", once: true },
        }
      );
    };
    load();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative py-24 lg:py-28 overflow-hidden"
      style={{ background: "#050505" }}
    >
      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">

        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-6" style={{ background: "#2684FF" }} />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#2684FF" }}>How It Works</span>
            <div className="h-px w-6" style={{ background: "#2684FF" }} />
          </div>
          <h2
            className="font-display font-bold text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            Three Steps. <span style={{ color: "#2684FF" }}>Done Right.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.n}
                className="step relative flex flex-col gap-4 p-7"
                style={{
                  opacity: 0,
                  background: "#111111",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "5px",
                }}
              >
                <span
                  className="absolute top-5 right-6 font-display font-bold pointer-events-none select-none"
                  style={{ fontSize: "3.5rem", lineHeight: 1, color: "rgba(255,255,255,0.04)" }}
                >
                  {s.n}
                </span>

                <div className="w-10 h-10 flex items-center justify-center"
                  style={{ background: s.accent + "14", border: "1px solid " + s.accent + "30", borderRadius: "4px" }}>
                  <Icon className="w-5 h-5" style={{ color: s.accent }} />
                </div>

                <div>
                  <h3 className="font-display font-bold text-white text-lg mb-1">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </div>

                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-slate-700 text-lg">&#8594;</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
