'use client';

import { ContactShadows, Environment, Float, RoundedBox } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import type { Group } from 'three';

function LoungeComposition() {
  const group = useRef<Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y += (pointer.x * 0.055 - group.current.rotation.y) * 0.025;
    group.current.rotation.x += (-pointer.y * 0.018 - group.current.rotation.x) * 0.025;
    group.current.position.y = Math.sin(t * 0.38) * 0.025 - 0.22;
  });

  return (
    <group ref={group} rotation={[0, -0.17, 0]} position={[0, -0.22, 0]}>
      <Float speed={0.7} rotationIntensity={0.03} floatIntensity={0.07}>
        <RoundedBox args={[3.25, 0.54, 1.25]} radius={0.2} smoothness={5} position={[0, 0.14, 0]}>
          <meshStandardMaterial color="#d7cbb8" roughness={0.74} />
        </RoundedBox>
        <RoundedBox args={[3.1, 1.1, 0.42]} radius={0.2} smoothness={5} position={[0, 0.86, 0.45]} rotation={[-0.09, 0, 0]}>
          <meshStandardMaterial color="#e4d9c9" roughness={0.78} />
        </RoundedBox>
        {[-1.15, 1.15].map((x) => (
          <RoundedBox key={x} args={[0.48, 0.82, 1.23]} radius={0.18} smoothness={5} position={[x * 1.22, 0.48, 0]}>
            <meshStandardMaterial color="#c9bca7" roughness={0.76} />
          </RoundedBox>
        ))}
        {[-1.12, 1.12].map((x) => (
          <mesh key={x} position={[x, -0.36, 0.25]}>
            <cylinderGeometry args={[0.045, 0.055, 0.65, 18]} />
            <meshStandardMaterial color="#a78550" metalness={0.58} roughness={0.28} />
          </mesh>
        ))}
      </Float>
      <group position={[2.05, -0.28, 0.22]}>
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.72, 0.72, 0.12, 48]} />
          <meshStandardMaterial color="#9b6746" roughness={0.47} />
        </mesh>
        <mesh position={[0, -0.31, 0]}>
          <cylinderGeometry args={[0.08, 0.14, 0.72, 24]} />
          <meshStandardMaterial color="#a78955" metalness={0.5} roughness={0.25} />
        </mesh>
      </group>
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 2.2, 6.8], fov: 34 }} dpr={[1, 1.45]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} aria-label="Abstract three-dimensional bespoke lounge setting">
      <ambientLight intensity={0.9} />
      <directionalLight position={[-3, 5, 4]} intensity={2.4} color="#fff1d6" />
      <pointLight position={[4, 2, 2]} intensity={38} color="#b3945e" distance={8} />
      <Suspense fallback={null}>
        <LoungeComposition />
        <ContactShadows position={[0, -0.68, 0]} opacity={0.34} scale={8} blur={2.6} far={4} />
        <Environment preset="apartment" environmentIntensity={0.34} />
      </Suspense>
    </Canvas>
  );
}

