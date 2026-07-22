import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { ScoopFlavor } from '../../types';

interface ConeProps {
  container: string;
  scoops: ScoopFlavor[];
  toppings: string[];
  syrup?: string;
  autoRotate?: boolean;
}

function WaffleConeMesh() {
  const coneRef = useRef<THREE.Mesh>(null);

  return (
    <group position={[0, -1.8, 0]}>
      {/* Main Cone */}
      <mesh ref={coneRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.9, 2.5, 32, 1]} />
        <meshStandardMaterial
          color="#C68B59"
          roughness={0.6}
          metalness={0.1}
          bumpScale={0.05}
        />
      </mesh>
      {/* Waffle Rim detail */}
      <mesh position={[0, 1.25, 0]}>
        <torusGeometry args={[0.9, 0.08, 16, 32]} />
        <meshStandardMaterial color="#A05A2C" roughness={0.7} />
      </mesh>
    </group>
  );
}

function WaffleBowlMesh() {
  return (
    <group position={[0, -1.2, 0]}>
      <mesh rotation={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 0.8, 1.0, 32]} />
        <meshStandardMaterial color="#C68B59" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[1.5, 0.1, 16, 32]} />
        <meshStandardMaterial color="#A05A2C" roughness={0.7} />
      </mesh>
    </group>
  );
}

function EcoCupMesh() {
  return (
    <group position={[0, -1.2, 0]}>
      <mesh>
        <cylinderGeometry args={[1.2, 0.9, 1.4, 32]} />
        <meshStandardMaterial color="#FDFBF7" roughness={0.3} />
      </mesh>
      {/* Decorative Mal-o Logo Ring */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.205, 0.905, 0.4, 32]} />
        <meshStandardMaterial color="#FF6B35" roughness={0.4} />
      </mesh>
    </group>
  );
}

function ScoopMesh({ scoop, index, totalScoops }: { scoop: ScoopFlavor; index: number; totalScoops: number }) {
  const scoopRef = useRef<THREE.Group>(null);
  
  // Calculate stack height based on container & scoop index
  const yOffset = -0.3 + index * 0.95;
  const radius = 0.9 - index * 0.08;

  useFrame((state) => {
    if (scoopRef.current) {
      // Gentle breathing pulsation
      const time = state.clock.getElapsedTime();
      scoopRef.current.position.y = yOffset + Math.sin(time * 2 + index) * 0.02;
    }
  });

  return (
    <group ref={scoopRef} position={[0, yOffset, 0]}>
      {/* Main Organic Scoop Sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <MeshWobbleMaterial
          color={scoop.color}
          factor={0.08}
          speed={1.5}
          roughness={0.35}
          metalness={0.05}
        />
      </mesh>

      {/* Scoop texture details & swirls */}
      {scoop.secondaryColor && (
        <mesh position={[0.1, 0.1, 0.1]} scale={0.92}>
          <sphereGeometry args={[radius, 16, 16]} />
          <meshStandardMaterial
            color={scoop.secondaryColor}
            transparent
            opacity={0.4}
            roughness={0.4}
          />
        </mesh>
      )}

      {/* Drip details at base of scoop */}
      <mesh position={[0, -radius * 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 0.85, 0.12, 16, 24]} />
        <meshStandardMaterial color={scoop.color} roughness={0.4} />
      </mesh>
    </group>
  );
}

function ToppingsAndSyrup({ toppings, syrup, totalScoops }: { toppings: string[]; syrup?: string; totalScoops: number }) {
  const topY = -0.3 + (totalScoops - 1) * 0.95 + 0.8;

  return (
    <group position={[0, topY, 0]}>
      {/* Syrup Drizzle */}
      {syrup && syrup !== 'none' && (
        <mesh position={[0, -0.2, 0]}>
          <sphereGeometry args={[0.85, 16, 16]} />
          <meshStandardMaterial
            color={
              syrup === 'chocolate'
                ? '#2B1704'
                : syrup === 'caramel'
                ? '#C87B28'
                : syrup === 'honey'
                ? '#E5A93C'
                : '#D81B60'
            }
            roughness={0.1}
            metalness={0.2}
            transparent
            opacity={0.85}
          />
        </mesh>
      )}

      {/* Sprinkles Topping */}
      {toppings.includes('sprinkles') && (
        <group>
          {Array.from({ length: 40 }).map((_, i) => {
            const angle = (i / 40) * Math.PI * 2;
            const r = 0.3 + Math.random() * 0.4;
            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;
            const colors = ['#FF4081', '#FFEB3B', '#00E676', '#00B0FF', '#AA00FF'];
            return (
              <mesh key={i} position={[x, Math.random() * 0.3, z]} rotation={[Math.random(), Math.random(), Math.random()]}>
                <boxGeometry args={[0.04, 0.12, 0.04]} />
                <meshStandardMaterial color={colors[i % colors.length]} roughness={0.3} />
              </mesh>
            );
          })}
        </group>
      )}

      {/* Nuts Topping */}
      {toppings.includes('nuts') && (
        <group>
          {Array.from({ length: 15 }).map((_, i) => {
            const angle = (i / 15) * Math.PI * 2;
            const x = Math.cos(angle) * 0.5;
            const z = Math.sin(angle) * 0.5;
            return (
              <mesh key={i} position={[x, 0.1 + Math.random() * 0.2, z]}>
                <dodecahedronGeometry args={[0.08]} />
                <meshStandardMaterial color="#8B5A2B" roughness={0.7} />
              </mesh>
            );
          })}
        </group>
      )}

      {/* Fresh Fruit Slices / Mango Top */}
      {toppings.includes('fruits') && (
        <group position={[0, 0.1, 0]}>
          {/* Mango Wedge */}
          <mesh position={[0.2, 0.2, 0.1]} rotation={[0.4, 0.2, 0.5]}>
            <boxGeometry args={[0.4, 0.2, 0.1]} />
            <meshStandardMaterial color="#FF9900" roughness={0.2} />
          </mesh>
          {/* Cherry on Top */}
          <mesh position={[-0.1, 0.3, -0.1]}>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial color="#D32F2F" roughness={0.1} metalness={0.2} />
          </mesh>
        </group>
      )}
    </group>
  );
}

function SceneContent({ container, scoops, toppings, syrup, autoRotate = true }: ConeProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Base Vessel */}
      {container === 'waffle-cone' || container === 'sugar-cone' ? (
        <WaffleConeMesh />
      ) : container === 'waffle-bowl' ? (
        <WaffleBowlMesh />
      ) : (
        <EcoCupMesh />
      )}

      {/* Stacked Scoops */}
      {scoops.map((scoop, index) => (
        <ScoopMesh
          key={`${scoop.id}-${index}`}
          scoop={scoop}
          index={index}
          totalScoops={scoops.length}
        />
      ))}

      {/* Toppings & Sauces */}
      <ToppingsAndSyrup toppings={toppings} syrup={syrup} totalScoops={scoops.length} />

      {/* Sparkles around custom creation */}
      <Sparkles count={25} scale={4} size={3} speed={0.4} color="#FFA000" />
    </group>
  );
}

export default function IceCreamCone3D({ container, scoops, toppings, syrup, autoRotate = true }: ConeProps) {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 1, 5], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
        <pointLight position={[-5, 3, -2]} intensity={0.5} color="#FF9900" />
        <pointLight position={[0, -2, 3]} intensity={0.4} color="#FFF" />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <SceneContent
            container={container}
            scoops={scoops}
            toppings={toppings}
            syrup={syrup}
            autoRotate={autoRotate}
          />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}
