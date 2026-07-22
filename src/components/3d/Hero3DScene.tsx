import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingScoop({ position, color, size = 0.6, speed = 1 }: { position: [number, number, number]; color: string; size?: number; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3 * speed;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4 * speed;
    }
  });

  return (
    <Float speed={speed * 2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 24, 24]} />
        <MeshWobbleMaterial
          color={color}
          factor={0.12}
          speed={2}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

function FloatingMango({ position, speed = 1 }: { position: [number, number, number]; speed?: number }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * speed) * 0.2;
    }
  });

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.8} floatIntensity={1}>
      <group ref={meshRef} position={position}>
        <mesh rotation={[0.3, 0.4, 0]}>
          <capsuleGeometry args={[0.3, 0.6, 16, 16]} />
          <meshStandardMaterial color="#FF9900" roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

export default function Hero3DScene() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none opacity-80">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 6, 4]} intensity={1.5} />
        <pointLight position={[-4, -2, -2]} color="#FF8C00" intensity={1} />

        {/* Floating artisan scoops */}
        <FloatingScoop position={[-2.8, 1.2, -1]} color="#FFB800" size={0.7} speed={1.2} /> {/* Mango */}
        <FloatingScoop position={[2.6, -0.8, -0.5]} color="#4A2511" size={0.65} speed={0.9} /> {/* Chocolate */}
        <FloatingScoop position={[-2.2, -1.8, -1.5]} color="#7DA042" size={0.55} speed={1.1} /> {/* Avocado */}
        <FloatingScoop position={[2.4, 1.8, -1.2]} color="#6F4E37" size={0.6} speed={0.8} /> {/* Coffee */}

        {/* Tropical Fruits */}
        <FloatingMango position={[1.8, 0.5, -0.8]} speed={1.3} />
        <FloatingMango position={[-1.5, 0.2, -0.5]} speed={0.9} />

        <Sparkles count={40} scale={8} size={2.5} speed={0.6} color="#FFC107" />
      </Canvas>
    </div>
  );
}
