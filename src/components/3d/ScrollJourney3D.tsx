'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// -------------------------------------------------------------
// 1. Digital CAD / BIM Blueprint Coordinate Ground Plane
// -------------------------------------------------------------
function CADBlueprintPlane() {
  const gridRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (gridRef.current) {
      gridRef.current.position.y = -0.05;
    }
  });

  return (
    <group ref={gridRef} position={[0, -0.05, 0]}>
      {/* Primary CAD Project Grid */}
      <gridHelper args={[40, 40, '#00E5FF', '#1E293B']} />
      
      {/* Site Boundary / Runway Lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0]}>
        <planeGeometry args={[42, 42]} />
        <meshBasicMaterial color="#030712" />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// 2. High-Rise Structural Steel Frame (Skyscraper BIM Skeleton)
// -------------------------------------------------------------
function StructuralBIMTower({ progress }: { progress: number }) {
  const towerGroup = useRef<THREE.Group>(null!);

  // Generate structural steel columns, girders, and diagonal trusses
  const { columnPositions, girderPositions, bracePositions } = useMemo(() => {
    const colPos: number[] = [];
    const girPos: number[] = [];
    const brcPos: number[] = [];

    // 4x4 Column Grid (16 columns across the building footprint)
    const xs = [-3.0, -1.0, 1.0, 3.0];
    const zs = [-3.0, -1.0, 1.0, 3.0];
    const floors = 7;
    const floorHeight = 1.4;
    const totalHeight = floors * floorHeight;

    // Vertical Columns
    xs.forEach((x) => {
      zs.forEach((z) => {
        colPos.push(x, 0, z);
        colPos.push(x, totalHeight, z);
      });
    });

    // Horizontal Floor Girders
    for (let f = 1; f <= floors; f++) {
      const y = f * floorHeight;
      // X-direction girders
      for (let zi = 0; zi < zs.length; zi++) {
        for (let xi = 0; xi < xs.length - 1; xi++) {
          girPos.push(xs[xi], y, zs[zi]);
          girPos.push(xs[xi + 1], y, zs[zi]);
        }
      }
      // Z-direction girders
      for (let xi = 0; xi < xs.length; xi++) {
        for (let zi = 0; zi < zs.length - 1; zi++) {
          girPos.push(xs[xi], y, zs[zi]);
          girPos.push(xs[xi], y, zs[zi + 1]);
        }
      }
      // Diagonal X-braces on perimeter bays
      for (let xi = 0; xi < xs.length - 1; xi++) {
        const yBottom = (f - 1) * floorHeight;
        // Front face (z = max)
        const zFront = zs[zs.length - 1];
        brcPos.push(xs[xi], yBottom, zFront);
        brcPos.push(xs[xi + 1], y, zFront);
        brcPos.push(xs[xi + 1], yBottom, zFront);
        brcPos.push(xs[xi], y, zFront);

        // Back face (z = min)
        const zBack = zs[0];
        brcPos.push(xs[xi], yBottom, zBack);
        brcPos.push(xs[xi + 1], y, zBack);
        brcPos.push(xs[xi + 1], yBottom, zBack);
        brcPos.push(xs[xi], y, zBack);
      }
    }

    return {
      columnPositions: new Float32Array(colPos),
      girderPositions: new Float32Array(girPos),
      bracePositions: new Float32Array(brcPos),
    };
  }, []);

  useFrame((state, delta) => {
    if (towerGroup.current) {
      // Gentle subtle structural sway based on time and scroll
      towerGroup.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.04 + progress * 0.2;
    }
  });

  return (
    <group ref={towerGroup} position={[0, 0, 0]}>
      {/* Primary Steel Columns (Dark Titanium with Cyan Highlight) */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={columnPositions.length / 3}
            array={columnPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#38BDF8" transparent opacity={0.35} />
      </lineSegments>

      {/* Horizontal Floor Beams / Girders */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={girderPositions.length / 3}
            array={girderPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00E5FF" transparent opacity={0.3} />
      </lineSegments>

      {/* Diagonal Structural X-Bracing */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={bracePositions.length / 3}
            array={bracePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#F59E0B" transparent opacity={0.25} />
      </lineSegments>

      {/* Concrete Lift Core (Central Solid Column) */}
      <mesh position={[0, 4.9, 0]}>
        <boxGeometry args={[1.6, 9.8, 1.6]} />
        <meshStandardMaterial
          color="#0F172A"
          roughness={0.9}
          metalness={0.3}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// 3. Construction Tower Crane with Rotating Lattice Jib
// -------------------------------------------------------------
function ConstructionTowerCrane() {
  const jibRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (jibRef.current) {
      // Slow realistic slewing rotation of the crane jib
      jibRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.6 + 0.4;
    }
  });

  return (
    <group position={[0, 9.8, 0]}>
      {/* Crane Mast (Vertical Tower Extension) */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.6, 3.0, 0.6]} />
        <meshStandardMaterial
          color="#F59E0B"
          wireframe
          transparent
          opacity={0.5}
          emissive="#D97706"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Rotating Crane Top (Cabin, Jib & Counter-Jib) */}
      <group ref={jibRef} position={[0, 3.0, 0]}>
        {/* Horizontal Crane Jib (Long Reach Arm) */}
        <mesh position={[3.5, 0.2, 0]}>
          <boxGeometry args={[7.0, 0.4, 0.4]} />
          <meshStandardMaterial
            color="#F59E0B"
            wireframe
            transparent
            opacity={0.6}
            emissive="#D97706"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Counter Jib (Rear Arm with Counterweight) */}
        <mesh position={[-1.8, 0.2, 0]}>
          <boxGeometry args={[3.6, 0.4, 0.4]} />
          <meshStandardMaterial color="#F59E0B" wireframe transparent opacity={0.5} />
        </mesh>
        {/* Counterweight Block */}
        <mesh position={[-3.2, -0.2, 0]}>
          <boxGeometry args={[0.8, 0.6, 0.6]} />
          <meshStandardMaterial color="#64748B" roughness={0.8} />
        </mesh>

        {/* Cable Hoist hanging from the Jib */}
        <lineSegments position={[4.5, -1.2, 0]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([0, 1.4, 0, 0, -1.4, 0])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#38BDF8" transparent opacity={0.7} />
        </lineSegments>

        {/* Crane Hook Block */}
        <mesh position={[4.5, -2.6, 0]}>
          <boxGeometry args={[0.25, 0.35, 0.25]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.8} />
        </mesh>

        {/* Aircraft Warning Red Light at Mast Top */}
        <pointLight position={[0, 0.6, 0]} color="#EF4444" intensity={2} distance={5} />
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 4. Site Raw Material Depots (Bulk Cement Silos & TMT Rebar Stacks)
// -------------------------------------------------------------
function MaterialDepots() {
  return (
    <group>
      {/* West Wing: Bulk Cement Silo Bank (Twin Vertical Cylinders) */}
      <group position={[-6.0, 0, -1.5]}>
        {/* Silo 1 */}
        <mesh position={[0, 2.2, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 4.4, 16]} />
          <meshStandardMaterial
            color="#1E293B"
            wireframe
            transparent
            opacity={0.35}
            emissive="#0284C7"
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* Silo 1 Cone Roof */}
        <mesh position={[0, 4.8, 0]}>
          <coneGeometry args={[0.9, 0.8, 16]} />
          <meshStandardMaterial color="#334155" wireframe transparent opacity={0.4} />
        </mesh>

        {/* Silo 2 */}
        <mesh position={[2.2, 2.2, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 4.4, 16]} />
          <meshStandardMaterial
            color="#1E293B"
            wireframe
            transparent
            opacity={0.35}
            emissive="#0284C7"
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* Silo 2 Cone Roof */}
        <mesh position={[2.2, 4.8, 0]}>
          <coneGeometry args={[0.9, 0.8, 16]} />
          <meshStandardMaterial color="#334155" wireframe transparent opacity={0.4} />
        </mesh>
      </group>

      {/* East Wing: TMT Steel Rebar Stacks on Site Dunnage */}
      <group position={[6.0, 0.3, -1.0]}>
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[4.2, 0.6, 1.8]} />
          <meshStandardMaterial
            color="#334155"
            wireframe
            transparent
            opacity={0.35}
            emissive="#D97706"
            emissiveIntensity={0.25}
          />
        </mesh>
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[3.6, 0.5, 1.4]} />
          <meshStandardMaterial
            color="#F59E0B"
            wireframe
            transparent
            opacity={0.4}
            emissive="#D97706"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Front: Digital Weighbridge Platform (Scale Pad at Site Gate) */}
      <group position={[0, 0.05, 5.5]}>
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[3.2, 0.1, 7.0]} />
          <meshStandardMaterial
            color="#0F172A"
            emissive="#00E5FF"
            emissiveIntensity={0.25}
            roughness={0.8}
            wireframe
          />
        </mesh>
        {/* Weighbridge Guide Rails */}
        <mesh position={[-1.65, 0.25, 0]}>
          <boxGeometry args={[0.1, 0.3, 7.0]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[1.65, 0.25, 0]}>
          <boxGeometry args={[0.1, 0.3, 7.0]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.4} />
        </mesh>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 5. Ambient Welding Sparks & Atmospheric Construction Dust
// -------------------------------------------------------------
function WeldingSparks() {
  const count = 350;
  const meshRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cAmber = new THREE.Color('#F59E0B');
    const cWhite = new THREE.Color('#FFFFFF');
    const cCyan = new THREE.Color('#38BDF8');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = Math.random() * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 22;

      const r = Math.random();
      const chosen = r > 0.6 ? cAmber : r > 0.25 ? cCyan : cWhite;
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.015;
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
        size={0.05}
        vertexColors
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// -------------------------------------------------------------
// 6. Camera Rig: Ascending Skyscraper Construction Journey
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
    // Cinematic camera travel:
    // Ground level (progress 0) -> Ascending past steel floors (progress 0.5) -> Top Crane oversight (progress 1.0)
    const targetY = 3.0 + progress * 6.5;
    const targetZ = 12.0 - progress * 2.0;
    const targetX = Math.sin(progress * Math.PI * 1.5) * 3.5 + mousePos.x * 0.8;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY + mousePos.y * 0.5, 2.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2.5, delta);

    // Look at center of current building elevation
    camera.lookAt(0, targetY * 0.6, 0);
  });

  return null;
}

// -------------------------------------------------------------
// Main Component: 3D Construction Site & Structural BIM Canvas
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
      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 3, 12], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 15, 10]} intensity={0.8} color="#FFFFFF" />
        <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#00E5FF" />
        <pointLight position={[0, 6, 0]} intensity={2.0} color="#F59E0B" distance={15} />

        <CameraRig progress={progress} mousePos={mousePos} />
        <CADBlueprintPlane />
        <StructuralBIMTower progress={progress} />
        <ConstructionTowerCrane />
        <MaterialDepots />
        <WeldingSparks />
      </Canvas>

      {/* Central Dark Contrast Vignette Scrim (Ensures 100% Foreground Text Readability) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(3,7,18,0.88) 0%, rgba(3,7,18,0.65) 55%, rgba(3,7,18,0.95) 100%)',
        }}
      />
    </div>
  );
}
