"use client";

import { useEffect, useRef } from "react";

type Ripple = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  life: number;
  maxLife: number;
  strength: number;
  driftX: number;
  driftY: number;
  rotation: number;
  eccentricity: number;
  wobble: number;
};

const BASE_COLOR = "#050505";
const HIGHLIGHT = "38,132,255";

export default function WaterRippleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const ripples: Ripple[] = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let ambientTimer = 0;
    let lastTime = 0;
    let lastPointerX = -1000;
    let lastPointerY = -1000;
    let lastSpawnTime = 0;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const maxRipples = prefersReducedMotion ? 8 : 14;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const addRipple = (x: number, y: number, strength = 1) => {
      if (x < 0 || x > width || y < 0 || y > height) return;

      if (ripples.length >= maxRipples) {
        ripples.shift();
      }

      ripples.push({
        x,
        y,
        radius: 8,
        speed: 38 + strength * 22,
        life: 0,
        maxLife: 0.85 + strength * 0.55,
        strength,
        driftX: (Math.random() - 0.5) * 9,
        driftY: (Math.random() - 0.5) * 9,
        rotation: Math.random() * Math.PI,
        eccentricity: 0.78 + Math.random() * 0.34,
        wobble: Math.random() * Math.PI * 2,
      });
    };

    const handlePointer = (clientX: number, clientY: number, strength = 0.55) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

      const now = performance.now();
      const distance = Math.hypot(x - lastPointerX, y - lastPointerY);

      if (distance < 24 && now - lastSpawnTime < 40) return;

      lastPointerX = x;
      lastPointerY = y;
      lastSpawnTime = now;
      addRipple(x, y, strength);
    };

    const renderBackground = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = BASE_COLOR;
      context.fillRect(0, 0, width, height);

      const glow = context.createLinearGradient(0, 0, width, height);
      glow.addColorStop(0, "rgba(0, 82, 204, 0.04)");
      glow.addColorStop(0.45, "rgba(7, 12, 26, 0)");
      glow.addColorStop(1, "rgba(38, 132, 255, 0.05)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
    };

    const renderRipple = (ripple: Ripple) => {
      const progress = ripple.life / ripple.maxLife;
      const fade = 1 - progress;
      const alpha = fade * 0.24 * ripple.strength;
      const driftX = ripple.driftX * progress;
      const driftY = ripple.driftY * progress;
      const x = ripple.x + driftX;
      const y = ripple.y + driftY;
      const wobble = 1 + Math.sin(progress * 7 + ripple.wobble) * 0.08;
      const radiusX = ripple.radius * ripple.eccentricity * wobble;
      const radiusY = ripple.radius * (2.02 - ripple.eccentricity) * (2 - wobble);
      const startA = ripple.rotation + progress * 0.65;
      const midA = startA + Math.PI * (0.52 + ripple.strength * 0.08);
      const endA = midA + Math.PI * (0.34 + ripple.strength * 0.12);

      context.save();
      context.globalCompositeOperation = "screen";

      context.lineCap = "round";
      context.shadowBlur = 18 + ripple.strength * 18;
      context.shadowColor = `rgba(${HIGHLIGHT}, ${alpha})`;

      context.beginPath();
      context.lineWidth = 1 + ripple.strength * 2.1;
      context.strokeStyle = `rgba(${HIGHLIGHT}, ${alpha})`;
      context.ellipse(x, y, radiusX, radiusY, ripple.rotation, startA, midA);
      context.stroke();

      context.beginPath();
      context.lineWidth = 0.8 + ripple.strength * 1.2;
      context.strokeStyle = `rgba(144, 202, 249, ${alpha * 0.9})`;
      context.ellipse(
        x + Math.cos(ripple.rotation) * 3,
        y + Math.sin(ripple.rotation) * 3,
        radiusX * 0.72,
        radiusY * 0.68,
        ripple.rotation + 0.2,
        midA - 0.85,
        endA
      );
      context.stroke();

      context.beginPath();
      context.lineWidth = 0.7 + ripple.strength;
      context.strokeStyle = `rgba(${HIGHLIGHT}, ${alpha * 0.5})`;
      context.ellipse(
        x - Math.cos(ripple.rotation) * 4,
        y - Math.sin(ripple.rotation) * 2,
        radiusX * 1.08,
        radiusY * 0.88,
        ripple.rotation - 0.18,
        endA + 0.25,
        endA + 1.65
      );
      context.stroke();

      const streak = context.createLinearGradient(x - radiusX, y, x + radiusX, y);
      streak.addColorStop(0, "rgba(0,0,0,0)");
      streak.addColorStop(0.5, `rgba(${HIGHLIGHT}, ${alpha * 0.17})`);
      streak.addColorStop(1, "rgba(0,0,0,0)");
      context.strokeStyle = streak;
      context.lineWidth = radiusY * 0.085;
      context.beginPath();
      context.moveTo(x - radiusX * 0.78, y + Math.sin(progress * 9 + ripple.wobble) * 4);
      context.quadraticCurveTo(
        x,
        y - radiusY * 0.14,
        x + radiusX * 0.82,
        y + Math.cos(progress * 8 + ripple.wobble) * 4
      );
      context.stroke();

      const core = context.createRadialGradient(x, y, 0, x, y, ripple.radius * 2.1);
      core.addColorStop(0, `rgba(${HIGHLIGHT}, ${alpha * 0.12})`);
      core.addColorStop(0.35, `rgba(${HIGHLIGHT}, ${alpha * 0.06})`);
      core.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = core;
      context.beginPath();
      context.ellipse(x, y, radiusX * 1.18, radiusY * 1.08, ripple.rotation, 0, Math.PI * 2);
      context.fill();

      context.restore();
    };

    const animate = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000 || 0.016, 0.033);
      lastTime = time;
      ambientTimer += delta;

      renderBackground();

      if (!prefersReducedMotion && ambientTimer > 2.8 && width > 0 && height > 0) {
        ambientTimer = 0;
        addRipple(width * (0.2 + Math.random() * 0.6), height * (0.18 + Math.random() * 0.58), 0.35);
      }

      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        const ripple = ripples[index];
        ripple.life += delta;
        ripple.radius += ripple.speed * delta;

        if (ripple.life >= ripple.maxLife) {
          ripples.splice(index, 1);
          continue;
        }

        renderRipple(ripple);
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      handlePointer(event.clientX, event.clientY, 0.48);
    };

    const onPointerDown = (event: PointerEvent) => {
      handlePointer(event.clientX, event.clientY, 1.05);
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      handlePointer(touch.clientX, touch.clientY, 0.62);
    };

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      handlePointer(touch.clientX, touch.clientY, 1.1);
    };

    resize();
    animationFrame = window.requestAnimationFrame(animate);

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchStart);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}