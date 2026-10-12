'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

// Central Core: Glowing Luminous Geometric Sphere & Wireframe
function BusinessCore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireframeRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y -= delta * 0.15;
      wireframeRef.current.rotation.z += delta * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.2;
      ringRef.current.rotation.x = 1.1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Golden Wireframe Sphere */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1.55, 2]} />
        <meshStandardMaterial
          color="#D4AF37"
          wireframe
          transparent
          opacity={0.35}
          emissive="#D4AF37"
          emissiveIntensity={0.2}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Inner Electric Glowing Core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 3]} />
        <meshPhysicalMaterial
          color="#0A192F"
          emissive="#4F8CFF"
          emissiveIntensity={0.65}
          roughness={0.15}
          metalness={0.8}
          transmission={0.6}
          thickness={1.2}
          reflectivity={0.9}
          clearcoat={1}
        />
      </mesh>

      {/* Internal bright pulse node */}
      <pointLight color="#4F8CFF" intensity={3} distance={5} />
      <pointLight color="#D4AF37" intensity={2} distance={4} position={[0, 0.5, 0]} />

      {/* Concentric Orbital Data Ring */}
      <group ref={ringRef}>
        <mesh>
          <ringGeometry args={[2.0, 2.05, 64]} />
          <meshBasicMaterial color="#4F8CFF" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
        <mesh>
          <ringGeometry args={[2.2, 2.22, 64]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

// Transaction Nodes & Spline Connection Paths with Flowing Particles
function TransactionPaths() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 75;

  // Generate curved path nodes
  const { positions, originalT } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      orig[i] = Math.random();
    }
    return { positions: pos, originalT: orig };
  }, []);

  // Curve paths from central network core to peripheral nodes
  const curves = useMemo(() => {
    return [
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-1.2, 1.5, 0.5),
        new THREE.Vector3(-2.0, 1.2, -0.5),
        new THREE.Vector3(-3.2, 1.4, 0)
      ),
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1.4, 1.2, -0.4),
        new THREE.Vector3(2.2, 0.8, 0.8),
        new THREE.Vector3(3.2, 1.2, 0.2)
      ),
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-1.5, -1.2, -0.5),
        new THREE.Vector3(-2.4, -0.8, 0.6),
        new THREE.Vector3(-3.0, -1.4, 0.3)
      ),
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1.2, -1.4, 0.6),
        new THREE.Vector3(2.5, -1.1, -0.4),
        new THREE.Vector3(3.4, -1.2, 0)
      ),
    ];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime * 0.35;

    for (let i = 0; i < count; i++) {
      const curveIndex = i % curves.length;
      const curve = curves[curveIndex];
      const t = (originalT[i] + time) % 1;
      const point = curve.getPoint(t);

      pos[i * 3] = point.x;
      pos[i * 3 + 1] = point.y;
      pos[i * 3 + 2] = point.z;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      {/* Path line visualization */}
      {curves.map((curve, idx) => {
        const linePoints = curve.getPoints(30);
        const geometry = new THREE.BufferGeometry().setFromPoints(linePoints);
        return (
          <line key={idx}>
            <primitive object={geometry} attach="geometry" />
            <lineBasicMaterial color={idx % 2 === 0 ? "#4F8CFF" : "#D4AF37"} transparent opacity={0.3} />
          </line>
        );
      })}

      {/* Animated glowing particles along lines */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          color="#4F8CFF"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// Metallic Geometric Accents: Torus, Polyhedra
function MetallicAccents() {
  const g1 = useRef<THREE.Mesh>(null!);
  const g2 = useRef<THREE.Mesh>(null!);
  const g3 = useRef<THREE.Mesh>(null!);

  useFrame((_state, delta) => {
    if (g1.current) {
      g1.current.rotation.x += delta * 0.4;
      g1.current.rotation.y += delta * 0.3;
    }
    if (g2.current) {
      g2.current.rotation.y += delta * 0.5;
      g2.current.rotation.z += delta * 0.2;
    }
    if (g3.current) {
      g3.current.rotation.x -= delta * 0.3;
      g3.current.rotation.z -= delta * 0.4;
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={g1} position={[-2.8, 2.2, -1.2]}>
          <octahedronGeometry args={[0.35]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh ref={g2} position={[2.9, -2.1, -1]}>
          <torusGeometry args={[0.3, 0.08, 16, 32]} />
          <meshStandardMaterial color="#4F8CFF" metalness={0.95} roughness={0.15} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh ref={g3} position={[3.3, 2.0, -1.5]}>
          <tetrahedronGeometry args={[0.32]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
        </mesh>
      </Float>
    </>
  );
}

// Floating Live Glassmorphic Panels inside the 3D space
function FloatingPanels3D() {
  return (
    <>
      {/* Panel Top-Left: Cash Runway & Settlement */}
      <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.4}>
        <group position={[-3.3, 1.4, 0.4]}>
          <Html transform distanceFactor={5} center className="pointer-events-none select-none">
            <div className="w-64 p-3.5 rounded-xl glass-panel-elevated text-left backdrop-blur-xl border border-electric/30 bg-[#0A192F]/80 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-textMuted flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Settlement Flow
                </span>
                <span className="text-[11px] font-semibold text-emerald-400 flex items-center">
                  +18.4% <ArrowUpRight className="w-3 h-3 ml-0.5" />
                </span>
              </div>
              <div className="text-xl font-bold tracking-tight text-white font-mono">$482,900.00</div>
              <p className="text-[10px] text-slate-textMuted mt-1">
                42 vendor payouts cleared in batch #891
              </p>
            </div>
          </Html>
        </group>
      </Float>

      {/* Panel Top-Right: Inventory Reorder Pulse */}
      <Float speed={2.2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[3.3, 1.3, 0.2]}>
          <Html transform distanceFactor={5} center className="pointer-events-none select-none">
            <div className="w-64 p-3.5 rounded-xl glass-panel-elevated text-left backdrop-blur-xl border border-gold/30 bg-[#0A192F]/80 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gold flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-gold" />
                  Smart Inventory
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-gold/15 text-gold border border-gold/30">
                  OPTIMAL
                </span>
              </div>
              <div className="text-xl font-bold text-white font-mono">99.4% Stock Health</div>
              <p className="text-[10px] text-slate-textMuted mt-1">
                Automated reorder triggered for SKU-904
              </p>
            </div>
          </Html>
        </group>
      </Float>

      {/* Panel Bottom-Left: Verified Network Mesh */}
      <Float speed={1.9} rotationIntensity={0.12} floatIntensity={0.35}>
        <group position={[-3.1, -1.5, 0.6]}>
          <Html transform distanceFactor={5} center className="pointer-events-none select-none">
            <div className="w-60 p-3.5 rounded-xl glass-panel text-left backdrop-blur-xl border border-electric/25 bg-[#0A192F]/80 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-2 mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-electric" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-textMuted">
                  Supplier Mesh
                </span>
              </div>
              <div className="text-lg font-bold text-white">142 Active Nodes</div>
              <p className="text-[10px] text-slate-textMuted mt-0.5">
                Zero discrepancies across ledger
              </p>
            </div>
          </Html>
        </group>
      </Float>

      {/* Panel Bottom-Right: 2-Way PO Matching */}
      <Float speed={2.1} rotationIntensity={0.15} floatIntensity={0.4}>
        <group position={[3.2, -1.4, 0.5]}>
          <Html transform distanceFactor={5} center className="pointer-events-none select-none">
            <div className="w-60 p-3.5 rounded-xl glass-panel text-left backdrop-blur-xl border border-emerald-500/25 bg-[#0A192F]/80 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-2 mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-textMuted">
                  PO Match Engine
                </span>
              </div>
              <div className="text-lg font-bold text-white">100% Reconciled</div>
              <p className="text-[10px] text-slate-textMuted mt-0.5">
                Invoices auto-matched to verified receipts
              </p>
            </div>
          </Html>
        </group>
      </Float>
    </>
  );
}

// Camera parallax damping responder
function CameraParallax({ mouse }: { mouse: { x: number; y: number } }) {
  useFrame((state) => {
    // Smooth lerp based on mouse movement and scroll
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouse.x * 0.8, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, mouse.y * 0.6, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setIsClient(true);

    // Test WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isClient) {
    return <div className="w-full h-full min-h-[560px] bg-midnight" />;
  }

  // Lightweight fallback for devices or browsers without WebGL
  if (!hasWebGL) {
    return (
      <div className="relative w-full h-full min-h-[560px] flex items-center justify-center overflow-hidden bg-radial-gradient">
        <div className="relative w-80 h-80 rounded-full border border-electric/30 flex items-center justify-center animate-spin [animation-duration:30s]">
          <div className="w-60 h-60 rounded-full border border-gold/30 flex items-center justify-center animate-spin [animation-duration:20s] [animation-direction:reverse]">
            <div className="w-36 h-36 rounded-full bg-electric/15 border border-electric flex items-center justify-center text-center p-4">
              <span className="text-xs font-mono text-electric font-semibold uppercase tracking-widest">
                VENDORA CORE
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[620px] lg:h-[720px] cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 7.8], fov: 46 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#FFFFFF" />
        <directionalLight position={[-10, -10, -5]} intensity={0.6} color="#4F8CFF" />
        <pointLight position={[0, 4, 3]} intensity={2.5} color="#D4AF37" />

        <CameraParallax mouse={mouse} />
        <BusinessCore />
        <TransactionPaths />
        <MetallicAccents />
        <FloatingPanels3D />
      </Canvas>
    </div>
  );
}
