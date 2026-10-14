'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// -------------------------------------------------------------
// Stage Telemetry Data
// -------------------------------------------------------------
interface MaterialNode {
  id: string;
  name: string;
  phase: number; // 0 to 5
  basePos: [number, number, number];
  color: string;
  emissive: string;
  geometryType: 'rebar' | 'mixer' | 'silo' | 'shield';
}

const STAGE_NODES: MaterialNode[] = [
  {
    id: 'sourcing-steel',
    name: 'TMT STEEL (Fe-550D)',
    phase: 0,
    basePos: [2.6, 0.5, 0],
    color: '#F59E0B',
    emissive: '#D97706',
    geometryType: 'rebar',
  },
  {
    id: 'fleet-rmc',
    name: 'RMC TRANSIT MIXER',
    phase: 1,
    basePos: [-2.4, 1.2, 0.8],
    color: '#00E5FF',
    emissive: '#0284C7',
    geometryType: 'mixer',
  },
  {
    id: 'stockyard-silo',
    name: 'CEMENT SILO MATRIX',
    phase: 2,
    basePos: [2.2, -1.2, -0.5],
    color: '#3B82F6',
    emissive: '#1D4ED8',
    geometryType: 'silo',
  },
  {
    id: 'match-audit',
    name: '3-WAY MATCH VERIFIER',
    phase: 3,
    basePos: [-2.0, -1.0, 0.5],
    color: '#10B981',
    emissive: '#059669',
    geometryType: 'shield',
  },
];

// -------------------------------------------------------------
// Cosmic Stardust Telemetry Field
// -------------------------------------------------------------
function CosmicStardust() {
  const count = 500;
  const meshRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cAmber = new THREE.Color('#F59E0B');
    const cCyan = new THREE.Color('#00E5FF');
    const cBlue = new THREE.Color('#2563EB');

    for (let i = 0; i < count; i++) {
      const radius = 4.0 + Math.random() * 10.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const r = Math.random();
      const chosen = r > 0.65 ? cAmber : r > 0.35 ? cCyan : cBlue;
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.025;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
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
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// -------------------------------------------------------------
// Central Cyber-Industrial Nexus
// -------------------------------------------------------------
function CentralEngine({ progress }: { progress: number }) {
  const outerCageRef = useRef<THREE.Mesh>(null!);
  const innerRefractorRef = useRef<THREE.Mesh>(null!);
  const pointLightRef = useRef<THREE.PointLight>(null!);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const speed = 1.0 + progress * 2.5;

    if (outerCageRef.current) {
      outerCageRef.current.rotation.y += delta * 0.3 * speed;
      outerCageRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
      outerCageRef.current.rotation.z = Math.cos(t * 0.3) * 0.15;
    }

    if (innerRefractorRef.current) {
      innerRefractorRef.current.rotation.y -= delta * 0.4 * speed;
      innerRefractorRef.current.rotation.z += delta * 0.2;
      const pulse = 1.0 + Math.sin(t * 2.5) * 0.08 + progress * 0.2;
      innerRefractorRef.current.scale.set(pulse, pulse, pulse);
    }

    if (pointLightRef.current) {
      pointLightRef.current.intensity = 4.0 + Math.sin(t * 3.0) * 1.5 + progress * 4;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Golden Wireframe Exoskeleton */}
      <mesh ref={outerCageRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshStandardMaterial
          color="#F59E0B"
          wireframe
          transparent
          opacity={0.5}
          emissive="#D97706"
          emissiveIntensity={0.5}
          roughness={0.15}
          metalness={0.95}
        />
      </mesh>

      {/* Inner Electric Cyan Refractive Core */}
      <mesh ref={innerRefractorRef}>
        <octahedronGeometry args={[1.05, 1]} />
        <meshPhysicalMaterial
          color="#030A18"
          emissive="#00E5FF"
          emissiveIntensity={0.7}
          roughness={0.1}
          metalness={0.9}
          transmission={0.4}
          thickness={1.0}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Radiant Nexus Lights */}
      <pointLight ref={pointLightRef} color="#00E5FF" intensity={5} distance={10} />
      <pointLight color="#F59E0B" intensity={3} distance={6} position={[0, 0.8, 0]} />
    </group>
  );
}

// -------------------------------------------------------------
// Dynamic Orbital Telemetry Rings
// -------------------------------------------------------------
function OrbitalRings({ progress }: { progress: number }) {
  const g1 = useRef<THREE.Group>(null!);
  const g2 = useRef<THREE.Group>(null!);
  const g3 = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const factor = 1 + progress * 2.0;

    if (g1.current) {
      g1.current.rotation.z += delta * 0.25 * factor;
      g1.current.rotation.x = 1.1 + Math.sin(t * 0.4) * 0.08 + progress * 0.5;
    }
    if (g2.current) {
      g2.current.rotation.z -= delta * 0.18 * factor;
      g2.current.rotation.y = 0.6 + Math.cos(t * 0.5) * 0.08;
    }
    if (g3.current) {
      g3.current.rotation.x += delta * 0.12 * factor;
      g3.current.rotation.z = Math.sin(t * 0.3) * 0.1;
    }
  });

  return (
    <group>
      <group ref={g1}>
        <mesh>
          <torusGeometry args={[2.3, 0.015, 16, 120]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.6} />
        </mesh>
      </group>
      <group ref={g2}>
        <mesh>
          <torusGeometry args={[2.7, 0.012, 16, 120]} />
          <meshBasicMaterial color="#F59E0B" transparent opacity={0.45} />
        </mesh>
      </group>
      <group ref={g3}>
        <mesh>
          <torusGeometry args={[3.15, 0.01, 16, 120]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.3} />
        </mesh>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// Interactive Material Satellites
// -------------------------------------------------------------
function MaterialSatellite({
  node,
  progress,
}: {
  node: MaterialNode;
  progress: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    // Expansion of nodes as user scrolls
    const expansion = 1 + progress * 0.4;
    const floatY = Math.sin(t * 1.5 + node.phase) * 0.15;

    if (groupRef.current) {
      groupRef.current.position.set(
        node.basePos[0] * expansion,
        node.basePos[1] * expansion + floatY,
        node.basePos[2] * expansion
      );
    }

    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.6;
      meshRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        {node.geometryType === 'rebar' && <cylinderGeometry args={[0.22, 0.22, 0.6, 8]} />}
        {node.geometryType === 'mixer' && <octahedronGeometry args={[0.32, 0]} />}
        {node.geometryType === 'silo' && <dodecahedronGeometry args={[0.3, 0]} />}
        {node.geometryType === 'shield' && <boxGeometry args={[0.36, 0.36, 0.36]} />}

        <meshStandardMaterial
          color={node.color}
          emissive={node.emissive}
          emissiveIntensity={0.65}
          metalness={0.9}
          roughness={0.2}
          wireframe={node.geometryType === 'rebar'}
        />
      </mesh>
      <pointLight color={node.color} intensity={1.5} distance={3} />
    </group>
  );
}

// -------------------------------------------------------------
// Dynamic Telemetry Energy Connectors
// -------------------------------------------------------------
function EnergyConnectors({ progress }: { progress: number }) {
  const lineRef = useRef<THREE.LineSegments>(null!);
  const linePositions = useMemo(() => new Float32Array(STAGE_NODES.length * 6), []);

  useFrame(() => {
    const expansion = 1 + progress * 0.4;

    STAGE_NODES.forEach((node, idx) => {
      linePositions[idx * 6] = 0;
      linePositions[idx * 6 + 1] = 0;
      linePositions[idx * 6 + 2] = 0;

      linePositions[idx * 6 + 3] = node.basePos[0] * expansion;
      linePositions[idx * 6 + 4] = node.basePos[1] * expansion;
      linePositions[idx * 6 + 5] = node.basePos[2] * expansion;
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
          count={STAGE_NODES.length * 2}
          array={linePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#00E5FF"
        transparent
        opacity={0.3 + progress * 0.3}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

// -------------------------------------------------------------
// Camera Rig: Multi-Phase Journey Controller
// -------------------------------------------------------------
function CameraRig({
  progress,
  mousePos,
}: {
  progress: number;
  mousePos: { x: number; y: number };
}) {
  const { camera } = useThree();

  useFrame((state, delta) => {
    // 5 Story Phase Coordinates
    // Phase 0 (0.0): Sourcing Hero [0, 0, 7.2]
    // Phase 1 (0.25): Fleet Telemetry [2.2, 0.8, 5.4]
    // Phase 2 (0.50): Stockyards [-2.0, -0.6, 5.0]
    // Phase 3 (0.75): 3-Way Match [0, -1.5, 4.4]
    // Phase 4 (1.0): Enterprise OS [0, 0, 8.2]

    let targetX = 0;
    let targetY = 0;
    let targetZ = 7.2;

    if (progress < 0.25) {
      const p = progress / 0.25;
      targetX = THREE.MathUtils.lerp(0, 2.0, p);
      targetY = THREE.MathUtils.lerp(0, 0.7, p);
      targetZ = THREE.MathUtils.lerp(7.2, 5.5, p);
    } else if (progress < 0.5) {
      const p = (progress - 0.25) / 0.25;
      targetX = THREE.MathUtils.lerp(2.0, -1.8, p);
      targetY = THREE.MathUtils.lerp(0.7, -0.6, p);
      targetZ = THREE.MathUtils.lerp(5.5, 5.1, p);
    } else if (progress < 0.75) {
      const p = (progress - 0.5) / 0.25;
      targetX = THREE.MathUtils.lerp(-1.8, 0, p);
      targetY = THREE.MathUtils.lerp(-0.6, -1.4, p);
      targetZ = THREE.MathUtils.lerp(5.1, 4.5, p);
    } else {
      const p = (progress - 0.75) / 0.25;
      targetX = THREE.MathUtils.lerp(0, 0, p);
      targetY = THREE.MathUtils.lerp(-1.4, 0, p);
      targetZ = THREE.MathUtils.lerp(4.5, 8.2, p);
    }

    // Add mouse parallax
    const finalX = targetX + mousePos.x * 0.6;
    const finalY = targetY + mousePos.y * 0.4;
    const finalZ = targetZ;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, finalX, 3.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, finalY, 3.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, finalZ, 3.5, delta);

    camera.lookAt(0, targetY * 0.3, 0);
  });

  return null;
}

// -------------------------------------------------------------
// Exported Component: Fixed Full-Bleed 3D Scroll Journey Engine
// -------------------------------------------------------------
export default function ScrollJourney3D() {
  const [progress, setProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = docHeight > 0 ? Math.min(Math.max(window.scrollY / docHeight, 0), 1) : 0;
          setProgress(currentProgress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[6, 8, 5]} intensity={0.8} color="#FFFFFF" />
        <directionalLight position={[-6, -4, -3]} intensity={0.5} color="#00E5FF" />
        <pointLight position={[0, -3, 2]} intensity={1.5} color="#F59E0B" distance={6} />

        <CameraRig progress={progress} mousePos={mousePos} />
        <CosmicStardust />
        <CentralEngine progress={progress} />
        <OrbitalRings progress={progress} />
        <EnergyConnectors progress={progress} />

        {STAGE_NODES.map((node) => (
          <MaterialSatellite key={node.id} node={node} progress={progress} />
        ))}
      </Canvas>
    </div>
  );
}
