'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// -------------------------------------------------------------
// Type Definitions
// -------------------------------------------------------------
interface NodeData {
  id: string;
  name: string;
  subtext: string;
  badge: string;
  angle: number;
  color: string;
  emissive: string;
}

const NODES_CONFIG: NodeData[] = [
  {
    id: 'steel',
    name: 'TMT STEEL',
    subtext: 'Fe-550D Primary Rebars',
    badge: '1,420 MT SYNCED',
    angle: 0,
    color: '#F59E0B',
    emissive: '#D97706',
  },
  {
    id: 'rmc',
    name: 'RMC CONCRETE',
    subtext: 'M-30 Transit Mixers',
    badge: '28 TRUCKS LIVE',
    angle: Math.PI * 0.5,
    color: '#00E5FF',
    emissive: '#0284C7',
  },
  {
    id: 'cement',
    name: 'CEMENT SILOS',
    subtext: 'Grade 53 OPC Bulkers',
    badge: '98.4% STOCKYARD',
    angle: Math.PI,
    color: '#3B82F6',
    emissive: '#1D4ED8',
  },
  {
    id: 'match',
    name: '3-WAY MATCH',
    subtext: 'Weighbridge & RA Bills',
    badge: '100% AUDIT PASS',
    angle: Math.PI * 1.5,
    color: '#10B981',
    emissive: '#059669',
  },
];

// -------------------------------------------------------------
// Floating Ambient Particle Constellation (500+ Nodes)
// -------------------------------------------------------------
function ParticleConstellation() {
  const count = 450;
  const meshRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorElectric = new THREE.Color('#3B82F6');
    const colorGold = new THREE.Color('#F59E0B');
    const colorCyan = new THREE.Color('#00E5FF');

    for (let i = 0; i < count; i++) {
      const radius = 3.5 + Math.random() * 8.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const choice = Math.random();
      const chosenColor = choice > 0.65 ? colorGold : choice > 0.35 ? colorCyan : colorElectric;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.03;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// -------------------------------------------------------------
// Central Core: Holographic Crystal & Amber Exoskeleton
// -------------------------------------------------------------
function CentralNexus({ scrollProgress }: { scrollProgress: number }) {
  const outerWireRef = useRef<THREE.Mesh>(null!);
  const innerCoreRef = useRef<THREE.Mesh>(null!);
  const coreLightRef = useRef<THREE.PointLight>(null!);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const scrollFactor = 1 + scrollProgress * 1.8;

    if (outerWireRef.current) {
      outerWireRef.current.rotation.y += delta * 0.25 * scrollFactor;
      outerWireRef.current.rotation.z = Math.sin(t * 0.4) * 0.2;
      outerWireRef.current.rotation.x = Math.cos(t * 0.3) * 0.15;
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y -= delta * 0.35 * scrollFactor;
      innerCoreRef.current.rotation.x += delta * 0.15;
      const pulse = 1 + Math.sin(t * 2.2) * 0.08 + scrollProgress * 0.15;
      innerCoreRef.current.scale.set(pulse, pulse, pulse);
    }

    if (coreLightRef.current) {
      coreLightRef.current.intensity = 3.5 + Math.sin(t * 3) * 1.5 + scrollProgress * 3;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Molten Amber Wireframe Sphere */}
      <mesh ref={outerWireRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshStandardMaterial
          color="#F59E0B"
          wireframe
          transparent
          opacity={0.45}
          emissive="#D97706"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Inner Electric Sapphire Hologram Core */}
      <mesh ref={innerCoreRef}>
        <octahedronGeometry args={[1.0, 1]} />
        <meshPhysicalMaterial
          color="#060E22"
          emissive="#00D2FF"
          emissiveIntensity={0.65}
          roughness={0.15}
          metalness={0.85}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transmission={0.4}
          thickness={0.8}
        />
      </mesh>

      {/* Internal Luminous Point Lights */}
      <pointLight ref={coreLightRef} color="#00E5FF" intensity={4} distance={8} />
      <pointLight color="#F59E0B" intensity={2.5} distance={5} position={[0, 0.5, 0]} />
    </group>
  );
}

// -------------------------------------------------------------
// Concentric Orbital Telemetry Rings
// -------------------------------------------------------------
function OrbitalRings({ scrollProgress }: { scrollProgress: number }) {
  const ring1Ref = useRef<THREE.Group>(null!);
  const ring2Ref = useRef<THREE.Group>(null!);
  const ring3Ref = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const speedMultiplier = 1 + scrollProgress * 2.0;

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.2 * speedMultiplier;
      ring1Ref.current.rotation.x = 1.1 + Math.sin(t * 0.5) * 0.08 + scrollProgress * 0.4;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.15 * speedMultiplier;
      ring2Ref.current.rotation.y = 0.5 + Math.cos(t * 0.4) * 0.08;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += delta * 0.1 * speedMultiplier;
      ring3Ref.current.rotation.z = Math.sin(t * 0.3) * 0.1;
    }
  });

  return (
    <group>
      {/* Primary Cyan Data Ring */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[2.3, 0.015, 16, 100]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.55} />
        </mesh>
      </group>

      {/* Secondary Molten Gold Ring */}
      <group ref={ring2Ref}>
        <mesh>
          <torusGeometry args={[2.7, 0.012, 16, 100]} />
          <meshBasicMaterial color="#F59E0B" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* Tertiary Outer Cobalt Ring */}
      <group ref={ring3Ref}>
        <mesh>
          <torusGeometry args={[3.1, 0.01, 16, 100]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.25} />
        </mesh>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// Interactive Satellite Telemetry Nodes (Rebars, RMC, Silos, Match)
// -------------------------------------------------------------
function SatelliteNode({
  node,
  scrollProgress,
  activeNode,
  onHover,
}: {
  node: NodeData;
  scrollProgress: number;
  activeNode: string | null;
  onHover: (id: string | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const isSelected = activeNode === node.id;

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    // Orbit expansion driven by scroll: from 2.5 up to 3.8
    const baseRadius = 2.7 + scrollProgress * 1.1;
    const currentAngle = node.angle + t * 0.15 * (1 + scrollProgress * 0.5);

    const x = Math.cos(currentAngle) * baseRadius;
    const y = Math.sin(currentAngle) * (baseRadius * 0.4) + Math.sin(t * 1.5 + node.angle) * 0.2;
    const z = Math.sin(currentAngle) * (baseRadius * 0.8);

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
    }

    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.8;
      meshRef.current.rotation.y += delta * 0.6;
      const targetScale = isSelected ? 1.4 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(node.id);
      }}
      onPointerOut={() => onHover(null)}
    >
      {/* Geometric Representation of Materials */}
      <mesh ref={meshRef}>
        {node.id === 'steel' && <cylinderGeometry args={[0.22, 0.22, 0.55, 8]} />}
        {node.id === 'rmc' && <octahedronGeometry args={[0.3, 0]} />}
        {node.id === 'cement' && <dodecahedronGeometry args={[0.28, 0]} />}
        {node.id === 'match' && <boxGeometry args={[0.35, 0.35, 0.35]} />}

        <meshStandardMaterial
          color={node.color}
          emissive={node.emissive}
          emissiveIntensity={isSelected ? 1.0 : 0.45}
          metalness={0.9}
          roughness={0.2}
          wireframe={isSelected}
        />
      </mesh>

      {/* Subtle Halo Glow around Satellite */}
      <pointLight color={node.color} intensity={isSelected ? 2.5 : 0.8} distance={2.5} />
    </group>
  );
}

// -------------------------------------------------------------
// Energy Spline Lines between Central Core and Satellites
// -------------------------------------------------------------
function EnergySplines({
  scrollProgress,
}: {
  scrollProgress: number;
}) {
  const lineRef = useRef<THREE.LineSegments>(null!);

  const linePositions = useMemo(() => {
    // 4 lines * 2 vertices = 8 vertices * 3 coords = 24 floats
    return new Float32Array(24);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const baseRadius = 2.7 + scrollProgress * 1.1;

    NODES_CONFIG.forEach((node, idx) => {
      const currentAngle = node.angle + t * 0.15 * (1 + scrollProgress * 0.5);
      const x = Math.cos(currentAngle) * baseRadius;
      const y = Math.sin(currentAngle) * (baseRadius * 0.4) + Math.sin(t * 1.5 + node.angle) * 0.2;
      const z = Math.sin(currentAngle) * (baseRadius * 0.8);

      // Start: center [0,0,0]
      linePositions[idx * 6] = 0;
      linePositions[idx * 6 + 1] = 0;
      linePositions[idx * 6 + 2] = 0;

      // End: satellite position
      linePositions[idx * 6 + 3] = x;
      linePositions[idx * 6 + 4] = y;
      linePositions[idx * 6 + 5] = z;
    });

    if (lineRef.current) {
      lineRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={8}
          array={linePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#38BDF8"
        transparent
        opacity={0.35 + scrollProgress * 0.25}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

// -------------------------------------------------------------
// Cinematic Camera Rig: Scroll-Driven Movement & Mouse Parallax
// -------------------------------------------------------------
function CameraRig({
  scrollProgress,
  mousePos,
}: {
  scrollProgress: number;
  mousePos: { x: number; y: number };
}) {
  const { camera } = useThree();

  useFrame((state, delta) => {
    // Top position: [0, 0, 7.2]
    // Scroll progress moves the camera smoothly downwards and tilts perspective
    const targetX = mousePos.x * 0.8 + Math.sin(scrollProgress * Math.PI) * 1.2;
    const targetY = mousePos.y * 0.5 - scrollProgress * 1.4;
    const targetZ = 7.0 - scrollProgress * 0.8;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 3.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 3.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 3.5, delta);

    // Look slightly above center when scrolling down
    camera.lookAt(0, -scrollProgress * 0.5, 0);
  });

  return null;
}

// -------------------------------------------------------------
// Main 3D Canvas Scene
// -------------------------------------------------------------
export default function HeroScene() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeNode, setActiveNode] = useState<string | null>('steel');

  // Track window scroll position for smooth 3D progression
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const maxScroll = Math.max(window.innerHeight * 1.2, 800);
          const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track mouse coordinates over the hero 3D container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const selectedNodeData = NODES_CONFIG.find((n) => n.id === activeNode) || NODES_CONFIG[0];

  return (
    <div
      className="relative w-full h-[640px] sm:h-[700px] lg:h-[780px] select-none overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[6, 8, 5]} intensity={0.8} color="#FFFFFF" />
        <directionalLight position={[-6, -4, -3]} intensity={0.4} color="#00E5FF" />
        <pointLight position={[0, -3, 2]} intensity={1.5} color="#F59E0B" distance={6} />

        <CameraRig scrollProgress={scrollProgress} mousePos={mousePos} />
        <ParticleConstellation />
        <CentralNexus scrollProgress={scrollProgress} />
        <OrbitalRings scrollProgress={scrollProgress} />
        <EnergySplines scrollProgress={scrollProgress} />

        {NODES_CONFIG.map((node) => (
          <SatelliteNode
            key={node.id}
            node={node}
            scrollProgress={scrollProgress}
            activeNode={activeNode}
            onHover={setActiveNode}
          />
        ))}
      </Canvas>

      {/* Floating Holographic Telemetry HUD (Top Left) */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 pointer-events-none">
        <div className="glass-panel px-4 py-3 rounded-xl border border-electric/25 backdrop-blur-md shadow-2xl max-w-xs">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full animate-ping"
              style={{ backgroundColor: selectedNodeData.color }}
            />
            <span className="text-[11px] font-mono tracking-wider text-slate-textMuted uppercase">
              ORCHESTRATION TELEMETRY
            </span>
          </div>
          <div className="text-base sm:text-lg font-extrabold text-white tracking-tight">
            {selectedNodeData.name}
          </div>
          <div className="text-xs text-slate-textSecondary mt-0.5">
            {selectedNodeData.subtext}
          </div>
          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-textMuted">REALTIME STATUS</span>
            <span
              className="font-bold px-2 py-0.5 rounded text-[10px]"
              style={{
                backgroundColor: `${selectedNodeData.color}15`,
                color: selectedNodeData.color,
                border: `1px solid ${selectedNodeData.color}35`,
              }}
            >
              {selectedNodeData.badge}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Node Selector Dock (Bottom Center) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center justify-center gap-2 px-3 py-2 rounded-2xl glass-panel-elevated border border-electric/30 backdrop-blur-xl shadow-2xl">
        {NODES_CONFIG.map((node) => {
          const isActive = activeNode === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setActiveNode(node.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2 ${
                isActive
                  ? 'bg-electric text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] font-bold scale-105'
                  : 'text-slate-textMuted hover:text-white hover:bg-white/5'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: node.color }}
              />
              <span>{node.name}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Scroll Interaction Indicator (Bottom Right) */}
      <div className="hidden md:flex absolute bottom-6 right-6 z-20 items-center gap-3 px-3.5 py-2 rounded-xl glass-panel border border-electric/20 text-xs font-mono text-slate-textMuted pointer-events-none">
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-slate-textMuted uppercase tracking-wider">
            SCROLL EXPANSION
          </span>
          <span className="text-white font-bold">
            {Math.round(scrollProgress * 100)}% KERNEL DEPLOY
          </span>
        </div>
        <div className="w-8 h-8 rounded-lg bg-electric/10 border border-electric/30 flex items-center justify-center text-electric">
          <div
            className="w-1.5 h-1.5 bg-electric rounded-full transition-transform duration-200"
            style={{
              transform: `translateY(${scrollProgress * 8 - 4}px)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
