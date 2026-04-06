"use client";

import { useEffect, useRef } from "react";

/**
 * PipeFlowBackground
 *
 * SVG pipe-route paths animated with GSAP stroke-dashoffset.
 * Subconscious system-in-motion feel — NOT a decorative wave.
 *
 * - 4 pipe-route paths (curved, routed like real pipe layouts)
 * - GSAP controls dashoffset per-path with varied speeds
 * - 1 leak-pulse node on path 2
 * - opacity: 0.06–0.10 — felt, not seen
 */
export default function PipeFlowBackground() {
  const svgRef   = useRef<SVGSVGElement>(null);
  const leakRef  = useRef<SVGCircleElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any;

    const init = async () => {
      const gsap       = (await import("gsap")).default;
      const { MotionPathPlugin } = await import("gsap/MotionPathPlugin");
      gsap.registerPlugin(MotionPathPlugin);

      if (!svgRef.current) return;

      const paths = svgRef.current.querySelectorAll<SVGPathElement>(".pipe-path");

      ctx = gsap.context(() => {
        paths.forEach((path, i) => {
          const len = path.getTotalLength();

          // Set up dasharray = full path length
          path.style.strokeDasharray  = `${len}`;
          path.style.strokeDashoffset = `${len}`;

          // Speeds intentionally non-uniform — organic, not mechanical
          const duration = 9 + i * 3.5;   // 9s / 12.5s / 16s / 19.5s
          const delay    = i * 1.2;

          gsap.to(path, {
            strokeDashoffset: 0,
            duration,
            delay,
            ease: "none",
            repeat: -1,
            // After one full pass: snap back and go again (seamless loop)
            onRepeat() {
              gsap.set(path, { strokeDashoffset: len });
            },
          });
        });

        // Leak pulse — small circle on path 2, slow 4s pulse
        if (leakRef.current) {
          gsap.to(leakRef.current, {
            opacity: 0.55,
            scale: 1.8,
            duration: 1.6,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            transformOrigin: "50% 50%",
          });
        }
      }, svgRef);
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/*
        Pipe routes — drawn as plumbing layouts:
        right-angle turns, T-junctions, curved elbows.
        All strokes only, no fill.
      */}

      {/* PATH 1 — main horizontal trunk line, upper section */}
      <path
        className="pipe-path"
        d="
          M -20 180
          L 200 180
          Q 240 180 240 220
          L 240 310
          Q 240 350 280 350
          L 580 350
          Q 620 350 620 310
          L 620 240
          Q 620 200 660 200
          L 980 200
          Q 1020 200 1020 240
          L 1020 320
          Q 1020 360 1060 360
          L 1460 360
        "
        fill="none"
        stroke="#1e3a8a"
        strokeWidth="1.5"
        opacity="0.10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* PATH 2 — branch line mid-screen with leak node */}
      <path
        className="pipe-path"
        d="
          M 1460 520
          L 1100 520
          Q 1060 520 1060 480
          L 1060 400
          Q 1060 360 1020 360
          L 760 360
          Q 720 360 720 400
          L 720 480
          Q 720 520 680 520
          L 400 520
          Q 360 520 360 560
          L 360 650
          Q 360 690 320 690
          L -20 690
        "
        fill="none"
        stroke="#1e3a8a"
        strokeWidth="1.2"
        opacity="0.08"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* PATH 3 — diagonal service line, lower-left to upper-right */}
      <path
        className="pipe-path"
        d="
          M -20 780
          L 120 780
          Q 160 780 160 740
          L 160 580
          Q 160 540 200 540
          L 420 540
          Q 460 540 460 500
          L 460 320
          Q 460 280 500 280
          L 740 280
          Q 780 280 780 240
          L 780 140
          Q 780 100 820 100
          L 1460 100
        "
        fill="none"
        stroke="#1e3a8a"
        strokeWidth="1.0"
        opacity="0.06"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* PATH 4 — vertical riser, right side */}
      <path
        className="pipe-path"
        d="
          M 1300 -10
          L 1300 160
          Q 1300 200 1260 200
          L 1100 200
          Q 1060 200 1060 240
          L 1060 360
          Q 1060 400 1100 400
          L 1200 400
          Q 1240 400 1240 440
          L 1240 640
          Q 1240 680 1280 680
          L 1460 680
        "
        fill="none"
        stroke="#3b82f6"
        strokeWidth="0.8"
        opacity="0.06"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/*
        LEAK PULSE NODE
        Sits at the T-junction on path 2 (~x:720, y:360)
        Slow opacity + scale pulse — implies pressure, not a cartoon drip
      */}
      <circle
        ref={leakRef}
        cx="720"
        cy="360"
        r="3.5"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1.2"
        opacity="0.08"
        style={{ transformOrigin: "720px 360px" }}
      />

      {/* Junction dots — static, mark pipe T-points */}
      {[
        [240, 350], [620, 350], [1020, 360],
        [360, 520], [460, 540], [780, 280],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="2"
          fill="#1e3a8a"
          opacity="0.12"
        />
      ))}
    </svg>
  );
}
