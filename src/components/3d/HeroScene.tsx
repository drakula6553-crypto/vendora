'use client';

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Central Core: Glowing Luminous Geometric Sphere & Wireframe
function BusinessCore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireframeRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Group>(null!);
  const pulseRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.05;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y -= delta * 0.1;
      wireframeRef.current.rotation.z += delta * 0.08;
      wireframeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.15;
      ringRef.current.rotation.x = 1.1 + Math.sin(state.clock.elapsedTime * 0.3) * 0.03;
    }
    if (pulseRef.current) {
      // Pulse scale animation
      const scale = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      pulseRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Golden Wireframe Sphere */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1.6, 2]} />
        <meshStandardMaterial
          color="#CE9B18"
          wireframe
          transparent
          opacity={0.3}
          emissive="#CE9B18"
          emissiveIntensity={0.15}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Inner Electric Glowing Core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.3, 3]} />
        <meshPhysicalMaterial
          color="#081020"
          emissive="#3A7BFF"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.85}
          transmission={0.5}
          thickness={1.0}
          reflectivity={0.9}
          clearcoat={1}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Central Pulse Node */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial
          color="#3A7BFF"
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Internal bright pulse nodes */}
      <pointLight color="#3A7BFF" intensity={4} distance={6} />
      <pointLight color="#CE9B18" intensity={2} distance={4} position={[0, 0.4, 0]} />

      {/* Concentric Orbital Data Rings */}
      <group ref={ringRef}>
        <mesh>
          <ringGeometry args={[2.1, 2.15, 64]} />
          <meshBasicMaterial color="#3A7BFF" transparent opacity={0.35} side={THREE.DoubleSide} />
        </mesh>
        <mesh>
          <ringGeometry args={[2.3, 2.35, 64]} />
          <meshBasicMaterial color="#CE9B18" transparent opacity={0.25} side={THREE.DoubleSide} />
        </mesh>
        <mesh>
          <ringGeometry args={[2.5, 2.55, 32]} />
          <meshBasicMaterial color="#3A7BFF" transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 35 }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} />
      
      <BusinessCore />
    </Canvas>
  );
}
