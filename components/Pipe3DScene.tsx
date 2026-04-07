"use client";

import {
  useRef, useState, useMemo, useCallback,
  useEffect, forwardRef, Suspense,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

/* ══════════════════════════════════════════════════════════════
   SOUND — synthesised metallic thunk (no audio file)
══════════════════════════════════════════════════════════════ */
function playThunk() {
  try {
    const AC =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AC();
    const t = ctx.currentTime;

    const osc = (
      type: OscillatorType,
      f0: number, f1: number,
      gain: number, dur: number
    ) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(f0, t);
      o.frequency.exponentialRampToValueAtTime(f1, t + dur);
      g.gain.setValueAtTime(gain, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.connect(g); g.connect(ctx.destination);
      o.start(t); o.stop(t + dur);
    };

    osc("sine",     92,  28,  0.88, 0.6);
    osc("triangle", 380, 160, 0.30, 0.7);
    osc("sawtooth", 1600, 600, 0.06, 0.14);

    // Bandpass noise burst
    const sr  = ctx.sampleRate;
    const len = Math.floor(sr * 0.08);
    const buf = ctx.createBuffer(1, len, sr);
    const d   = buf.getChannelData(0);
    for (let i = 0; i < len; i++)
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 1.8);

    const noise  = ctx.createBufferSource();
    const bpf    = ctx.createBiquadFilter();
    const noiseG = ctx.createGain();
    noise.buffer = buf;
    bpf.type = "bandpass"; bpf.frequency.value = 1200; bpf.Q.value = 0.9;
    noiseG.gain.setValueAtTime(0.7, t);
    noiseG.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    noise.connect(bpf); bpf.connect(noiseG); noiseG.connect(ctx.destination);
    noise.start(t);
  } catch (_) {}
}

/* ══════════════════════════════════════════════════════════════
   MATERIALS
══════════════════════════════════════════════════════════════ */
const COPPER = {
  color: "#B87333", metalness: 0.97, roughness: 0.3,
  envMapIntensity: 2.2,
} as const;

const COPPER_DARK = {
  color: "#8A5520", metalness: 0.94, roughness: 0.45,
  envMapIntensity: 1.8,
} as const;

const CHROME = {
  color: "#D8D8D8", metalness: 0.99, roughness: 0.04,
  envMapIntensity: 3.0,
} as const;

const CHROME_DARK = {
  color: "#A8A8A8", metalness: 0.98, roughness: 0.12,
  envMapIntensity: 2.5,
} as const;

/* ══════════════════════════════════════════════════════════════
   CAMERA SHAKE — must live inside Canvas
══════════════════════════════════════════════════════════════ */
function CameraShake({ active }: { active: boolean }) {
  const { camera } = useThree();
  const fired = useRef(false);

  useEffect(() => {
    if (!active || fired.current) return;
    fired.current = true;

    const base = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    };
    const intensity = 0.5;
    const tl = gsap.timeline();

    // 8 rapid offset snaps, decaying amplitude
    for (let i = 0; i < 8; i++) {
      const decay = Math.pow(1 - i / 8, 1.4);
      tl.to(camera.position, {
        x: base.x + (Math.random() - 0.5) * intensity * decay,
        y: base.y + (Math.random() - 0.5) * intensity * 0.4 * decay,
        duration: 0.045,
        ease: "none",
      });
    }
    // Settle back
    tl.to(camera.position, {
      x: base.x, y: base.y, z: base.z,
      duration: 0.18,
      ease: "power3.out",
    });
  }, [active, camera]);

  return null;
}

/* ══════════════════════════════════════════════════════════════
   U-BEND — center piece, idle floating
══════════════════════════════════════════════════════════════ */
function UBend({ locked, onClick }: { locked: boolean; onClick?: () => void }) {
  const groupRef = useRef<THREE.Group>(null);

  const [tubeGeo, capGeo] = useMemo(() => {
    const pts = Array.from({ length: 44 }, (_, i) => {
      const a = Math.PI * (i / 43);
      return new THREE.Vector3(Math.cos(a) * 0.48, -Math.sin(a) * 0.48, 0);
    });
    const curve = new THREE.CatmullRomCurve3(pts);
    const tube  = new THREE.TubeGeometry(curve, 44, 0.072, 16, false);
    const cap   = new THREE.CylinderGeometry(0.098, 0.098, 0.032, 16);
    return [tube, cap];
  }, []);

  const [threadRingGeo] = useMemo(() => {
    const ring = new THREE.CylinderGeometry(0.108, 0.108, 0.012, 16);
    return [ring];
  }, []);

  useEffect(() => () => {
    tubeGeo.dispose(); capGeo.dispose(); threadRingGeo.dispose();
  }, [tubeGeo, capGeo, threadRingGeo]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (!locked) {
      groupRef.current.rotation.y += delta * 0.28;
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.35) * 0.1;
    } else {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y, 0, delta * 5
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x, 0, delta * 5
      );
    }
  });

  return (
    <group ref={groupRef} onClick={onClick}>
      {/* Pipe body */}
      <mesh geometry={tubeGeo}>
        <meshStandardMaterial {...COPPER}
          emissive={locked ? "#001a52" : "#000"}
          emissiveIntensity={locked ? 0.1 : 0}
        />
      </mesh>
      {/* Chrome threaded collars — left end */}
      <mesh geometry={capGeo} position={[-0.48, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial {...CHROME} />
      </mesh>
      <mesh geometry={threadRingGeo} position={[-0.48, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial {...CHROME_DARK} />
      </mesh>
      {/* Chrome threaded collars — right end */}
      <mesh geometry={capGeo} position={[0.48, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial {...CHROME} />
      </mesh>
      <mesh geometry={threadRingGeo} position={[0.48, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial {...CHROME_DARK} />
      </mesh>
    </group>
  );
}

/* ══════════════════════════════════════════════════════════════
   PIPE SEGMENT — straight copper with chrome threaded joints
══════════════════════════════════════════════════════════════ */
const PipeSegment = forwardRef<
  THREE.Group,
  {
    length?: number;
    rotation?: [number, number, number];
    locked?: boolean;
    startRotation?: [number, number, number];
  }
>(({ length = 0.88, rotation = [0, 0, 0], locked = false }, ref) => {
  const bodyGeo = useMemo(
    () => new THREE.CylinderGeometry(0.068, 0.068, length, 14),
    [length]
  );
  const capGeo     = useMemo(() => new THREE.CylinderGeometry(0.096, 0.096, 0.028, 14), []);
  const threadGeo  = useMemo(() => new THREE.CylinderGeometry(0.110, 0.110, 0.011, 14), []);
  const thread2Geo = useMemo(() => new THREE.CylinderGeometry(0.102, 0.102, 0.008, 14), []);

  useEffect(() => () => {
    bodyGeo.dispose(); capGeo.dispose(); threadGeo.dispose(); thread2Geo.dispose();
  }, [bodyGeo, capGeo, threadGeo, thread2Geo]);

  const half = length / 2;

  return (
    <group ref={ref} rotation={rotation}>
      {/* Copper pipe body */}
      <mesh geometry={bodyGeo}>
        <meshStandardMaterial
          {...COPPER}
          emissive={locked ? "#001a52" : "#000"}
          emissiveIntensity={locked ? 0.07 : 0}
        />
      </mesh>
      {/* Thread detail — copper-dark band */}
      {([-half + 0.06, half - 0.06] as number[]).map((y, i) => (
        <mesh key={`b-${i}`} geometry={capGeo} position={[0, y, 0]}>
          <meshStandardMaterial {...COPPER_DARK} />
        </mesh>
      ))}
      {/* Chrome collar rings — outer */}
      {([-half, half] as number[]).map((y, i) => (
        <group key={`r-${i}`}>
          <mesh geometry={threadGeo} position={[0, y, 0]}>
            <meshStandardMaterial {...CHROME} />
          </mesh>
          <mesh geometry={thread2Geo} position={[0, y + (i === 0 ? 0.01 : -0.01), 0]}>
            <meshStandardMaterial {...CHROME_DARK} />
          </mesh>
        </group>
      ))}
    </group>
  );
});
PipeSegment.displayName = "PipeSegment";

/* ══════════════════════════════════════════════════════════════
   WATER FLOW — white-to-blue gradient particles, additive blend
══════════════════════════════════════════════════════════════ */
function WaterFlow({ visible }: { visible: boolean }) {
  const COUNT = 180;

  const { pointsObj, posAttr, colAttr } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);

    // Pre-seed particles along the pipe path
    for (let i = 0; i < COUNT; i++) {
      const t = i / COUNT;
      let x = 0, y = 0;
      if (t < 0.22)      { const p = t / 0.22;          x = -0.48; y = 0.88 - p * 0.88; }
      else if (t < 0.55) { const p = (t-0.22) / 0.33;   x = -Math.cos(Math.PI*p)*0.48; y = -Math.sin(Math.PI*p)*0.48; }
      else if (t < 0.77) { const p = (t-0.55) / 0.22;   x = 0.48;  y = p * 0.88; }
      else               { const p = (t-0.77) / 0.23;   x = 0.48 - p * 0.96; y = 0.88; }

      positions[i*3] = x; positions[i*3+1] = y; positions[i*3+2] = 0;

      // White (#ffffff) → Royal Blue (#0052CC)  [t=0 → t=1]
      colors[i*3]   = THREE.MathUtils.lerp(1, 0,     t);
      colors[i*3+1] = THREE.MathUtils.lerp(1, 0.322, t);
      colors[i*3+2] = THREE.MathUtils.lerp(1, 0.8,   t);
    }

    const pAttr = new THREE.BufferAttribute(positions, 3);
    const cAttr = new THREE.BufferAttribute(colors,    3);
    pAttr.usage = THREE.DynamicDrawUsage;
    cAttr.usage = THREE.DynamicDrawUsage;

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", pAttr);
    geo.setAttribute("color",    cAttr);

    const mat = new THREE.PointsMaterial({
      size: 0.026,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pts = new THREE.Points(geo, mat);
    return { pointsObj: pts, posAttr: pAttr, colAttr: cAttr };
  }, []);

  const progress = useRef(Array.from({ length: COUNT }, (_, i) => i / COUNT));
  const speeds   = useRef(Array.from({ length: COUNT }, () => 0.0034 + Math.random() * 0.0048));

  useEffect(() => () => {
    pointsObj.geometry.dispose();
    (pointsObj.material as THREE.Material).dispose();
  }, [pointsObj]);

  useFrame(() => {
    if (!visible) return;
    const pos = posAttr.array as Float32Array;
    const col = colAttr.array as Float32Array;

    for (let i = 0; i < COUNT; i++) {
      progress.current[i] = (progress.current[i] + speeds.current[i]) % 1;
      const t = progress.current[i];
      const j = (Math.random() - 0.5) * 0.02; // micro jitter

      let x = 0, y = 0;
      if (t < 0.22)      { const p = t / 0.22;          x = -0.48+j; y = 0.88 - p * 0.88; }
      else if (t < 0.55) { const p = (t-0.22) / 0.33;   x = -Math.cos(Math.PI*p)*0.48+j; y = -Math.sin(Math.PI*p)*0.48+j*0.5; }
      else if (t < 0.77) { const p = (t-0.55) / 0.22;   x = 0.48+j;  y = p * 0.88; }
      else               { const p = (t-0.77) / 0.23;   x = 0.48-p*0.96+j; y = 0.88; }

      pos[i*3] = x; pos[i*3+1] = y; pos[i*3+2] = j * 0.3;

      // Update color based on current t (live gradient)
      col[i*3]   = THREE.MathUtils.lerp(1, 0,     t);
      col[i*3+1] = THREE.MathUtils.lerp(1, 0.322, t);
      col[i*3+2] = THREE.MathUtils.lerp(1, 0.8,   t);
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  return <primitive object={pointsObj} visible={visible} />;
}

/* ══════════════════════════════════════════════════════════════
   SCENE — vault-lock assembly with camera shake + auto-play
══════════════════════════════════════════════════════════════ */
type Phase = "idle" | "assembling" | "locked";

function VaultLockScene({ onPhaseChange }: { onPhaseChange: (p: Phase) => void }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const locked = phase === "locked";

  const leftRef  = useRef<THREE.Group>(null);
  const rightRef = useRef<THREE.Group>(null);
  const topRef   = useRef<THREE.Group>(null);

  // Asymmetric off-screen starting positions
  useEffect(() => {
    if (leftRef.current) {
      leftRef.current.position.set(-8.0, -5.5, 2.5);
      leftRef.current.rotation.set(0.5, -0.4, 0.7);
    }
    if (rightRef.current) {
      rightRef.current.position.set(8.0, 5.5, -2.0);
      rightRef.current.rotation.set(-0.4, 0.5, -0.6);
    }
    if (topRef.current) {
      topRef.current.position.set(1.5, 7.5, 1.0);
      topRef.current.rotation.set(0.3, 0.2, Math.PI / 2);
    }
  }, []);

  const setPhaseAndNotify = useCallback((p: Phase) => {
    setPhase(p);
    onPhaseChange(p);
  }, [onPhaseChange]);

  const assemble = useCallback(() => {
    if (phase !== "idle") return;
    setPhaseAndNotify("assembling");

    const tl = gsap.timeline();
    tl
      // Pipe A: from bottom-left, straightens as it flies in
      .to(leftRef.current!.position,
        { x: -0.48, y: 0.44, z: 0, duration: 0.75, ease: "power3.out" }, 0)
      .to(leftRef.current!.rotation,
        { x: 0, y: 0, z: 0, duration: 0.65, ease: "power2.out" }, 0.05)

      // Pipe B: from top-right, slight offset delay
      .to(rightRef.current!.position,
        { x: 0.48, y: 0.44, z: 0, duration: 0.75, ease: "power3.out" }, 0.12)
      .to(rightRef.current!.rotation,
        { x: 0, y: 0, z: 0, duration: 0.65, ease: "power2.out" }, 0.16)

      // Top connector: drops with back-ease overshoot
      .to(topRef.current!.position,
        { x: 0, y: 0.88, z: 0, duration: 0.60, ease: "back.out(2.6)" }, 0.35)
      .to(topRef.current!.rotation,
        { x: 0, y: 0, z: Math.PI / 2, duration: 0.52, ease: "power2.out" }, 0.38)

      // Impact micro-bounce — bank vault feel
      .to(topRef.current!.position,
        { y: 0.83, duration: 0.055, ease: "power2.in" }, 0.35 + 0.60)
      .to(topRef.current!.position,
        { y: 0.88, duration: 0.14, ease: "elastic.out(1.6, 0.38)" }, 0.35 + 0.60 + 0.055)

      // Trigger thunk + state change
      .call(() => {
        playThunk();
        setPhaseAndNotify("locked");
      });
  }, [phase, setPhaseAndNotify]);

  // Auto-play 1.4s after mount
  useEffect(() => {
    const timer = setTimeout(() => assemble(), 1400);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Lighting rig */}
      <ambientLight intensity={0.18} color="#c8d8ff" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={2.8}
        color="#ffffff"
        castShadow
      />
      {/* Key blue rim from left */}
      <pointLight position={[-3.5, 2, 2.5]} intensity={1.2} color="#0052CC" />
      {/* Warm fill from right */}
      <pointLight position={[3, -1, 3]}    intensity={0.5} color="#ff8040" />
      {/* Top backlight */}
      <pointLight position={[0, 6, -2]}    intensity={0.7} color="#2684FF" />

      {/* Flow glow — activates on lock */}
      {locked && (
        <pointLight
          position={[0, 0.44, 0.5]}
          intensity={1.4}
          color="#2684FF"
          distance={2.2}
          decay={2}
        />
      )}

      <Environment preset="city" background={false} />

      {/* Camera shake on lock */}
      <CameraShake active={locked} />

      {/* Geometry */}
      <UBend locked={locked} onClick={assemble} />
      <PipeSegment ref={leftRef}  length={0.88} locked={locked} />
      <PipeSegment ref={rightRef} length={0.88} locked={locked} />
      <PipeSegment ref={topRef}   length={0.96} locked={locked} rotation={[0, 0, Math.PI / 2]} />

      {/* Gradient particle flow */}
      <WaterFlow visible={locked} />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   HINT OVERLAY
══════════════════════════════════════════════════════════════ */
function HintOverlay({ phase }: { phase: Phase }) {
  return (
    <div className="absolute bottom-6 inset-x-0 flex justify-center pointer-events-none" style={{ zIndex: 20 }}>
      {phase === "idle" && (
        <div className="flex items-center gap-2 px-4 py-2"
          style={{ background: "rgba(0,0,0,0.65)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "4px" }}>
          <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
          <span className="text-slate-400 text-xs tracking-widest uppercase font-medium">
            Assembling vault lock…
          </span>
        </div>
      )}
      {phase === "assembling" && (
        <div className="flex items-center gap-2 px-4 py-2"
          style={{ background: "rgba(0,0,0,0.65)", border: "1px solid rgba(0,82,204,0.2)", borderRadius: "4px" }}>
          <span className="w-2 h-2 rounded-full bg-brand-blue-lt animate-ping" />
          <span className="text-brand-blue-lt text-xs tracking-widest uppercase font-medium">
            Locking…
          </span>
        </div>
      )}
      {phase === "locked" && (
        <div className="flex items-center gap-2 px-4 py-2"
          style={{ background: "rgba(0,0,0,0.75)", border: "1px solid rgba(38,132,255,0.25)", borderRadius: "4px" }}>
          <span className="w-2 h-2 rounded-full" style={{ background: "#2684FF", boxShadow: "0 0 10px #0052CC" }} />
          <span className="text-brand-blue-lt text-xs tracking-widest uppercase font-medium">
            ⚡ Pressure Active — Click to replay
          </span>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   EXPORTED COMPONENT — used as Hero background
══════════════════════════════════════════════════════════════ */
export default function Pipe3DScene() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [key, setKey] = useState(0);

  const handlePhase = useCallback((p: Phase) => setPhase(p), []);

  // Allow re-trigger on click when locked
  const handleReplay = useCallback(() => {
    if (phase === "locked") {
      setPhase("idle");
      setKey(k => k + 1);
    }
  }, [phase]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
      onClick={phase === "locked" ? handleReplay : undefined}
    >
      <Canvas
        key={key}
        camera={{ position: [0, 0.22, 3.6], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <Suspense fallback={null}>
          <VaultLockScene onPhaseChange={handlePhase} />
        </Suspense>
      </Canvas>

      <HintOverlay phase={phase} />
    </div>
  );
}
