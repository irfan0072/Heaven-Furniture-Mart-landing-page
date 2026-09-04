'use client';

import { ContactShadows, Float, RoundedBox } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import type { Group } from 'three';

function LoungeComposition({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<Group>(null);
  const { size } = useThree();
  const compact = size.width < 640;
  useFrame(({ clock, pointer }) => {
    if (!group.current || reducedMotion) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y += (pointer.x * 0.055 - group.current.rotation.y) * 0.025;
    group.current.rotation.x += (-pointer.y * 0.018 - group.current.rotation.x) * 0.025;
    group.current.position.y = Math.sin(t * 0.38) * 0.025 - 0.22;
  });

  return (
    <group ref={group} rotation={[0, -0.17, 0]} position={[0, -0.22, 0]}>
      <Float speed={reducedMotion ? 0 : 0.7} rotationIntensity={reducedMotion ? 0 : 0.03} floatIntensity={reducedMotion ? 0 : 0.07}>
        <RoundedBox args={[3.42, 0.38, 1.34]} radius={0.16} smoothness={6} position={[0, -0.02, 0.04]}>
          <meshStandardMaterial color="#a99c88" roughness={0.82} />
        </RoundedBox>
        <RoundedBox args={[3.18, 0.72, 0.28]} radius={0.12} smoothness={5} position={[0, 0.69, -0.5]} rotation={[-0.08, 0, 0]}>
          <meshStandardMaterial color="#b7aa97" roughness={0.82} />
        </RoundedBox>
        {[-1.08, 0, 1.08].map((x) => (
          <RoundedBox key={`seat-${x}`} args={[1.01, 0.32, 1.16]} radius={0.16} smoothness={7} position={[x, 0.23, -0.08]} rotation={[-0.025, 0, 0]}>
            <meshStandardMaterial color="#ddd2c1" roughness={0.92} />
          </RoundedBox>
        ))}
        {[-1.06, 0, 1.06].map((x, index) => (
          <group key={`back-${x}`} position={[x, 0.91, 0.38]} rotation={[-0.1, 0, index === 0 ? 0.018 : index === 2 ? -0.018 : 0]}>
            <RoundedBox args={[1.01, 0.86, 0.38]} radius={0.17} smoothness={7}>
              <meshStandardMaterial color="#e5dccd" roughness={0.94} />
            </RoundedBox>
            <mesh position={[0, 0.02, 0.2]}>
              <sphereGeometry args={[0.035, 18, 18]} />
              <meshStandardMaterial color="#b6a994" roughness={0.9} />
            </mesh>
          </group>
        ))}
        {[-1.76, 1.76].map((x) => (
          <group key={`arm-${x}`} position={[x, 0.34, -0.01]}>
            <RoundedBox args={[0.4, 0.8, 1.43]} radius={0.18} smoothness={7}>
              <meshStandardMaterial color="#cabda9" roughness={0.88} />
            </RoundedBox>
            <RoundedBox args={[0.34, 0.16, 1.28]} radius={0.07} smoothness={5} position={[0, 0.43, -0.02]}>
              <meshStandardMaterial color="#ded3c2" roughness={0.9} />
            </RoundedBox>
          </group>
        ))}
        <RoundedBox args={[0.62, 0.62, 0.23]} radius={0.1} smoothness={6} position={[-1.05, 0.82, 0.54]} rotation={[0.08, 0.04, 0.16]}>
          <meshStandardMaterial color="#a77958" roughness={0.88} />
        </RoundedBox>
        {[-1.35, 1.35].flatMap((x) => [-0.42, 0.42].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, -0.47, z]} rotation={[0, 0, x < 0 ? -0.035 : 0.035]}>
            <cylinderGeometry args={[0.045, 0.065, 0.62, 20]} />
            <meshStandardMaterial color="#9a7446" metalness={0.36} roughness={0.34} />
          </mesh>
        )))}
      </Float>
      <group position={[compact ? 1.82 : 2.18, compact ? -0.3 : -0.22, 0.1]} scale={compact ? 0.82 : 1}>
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.76, 0.76, 0.16, 64]} />
          <meshStandardMaterial color="#98613f" roughness={0.48} />
        </mesh>
        <mesh position={[0, 0.17, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.47, 0.012, 10, 64]} />
          <meshStandardMaterial color="#c18a5d" roughness={0.58} />
        </mesh>
        <mesh position={[0, -0.31, 0]}>
          <cylinderGeometry args={[0.1, 0.2, 0.72, 32]} />
          <meshStandardMaterial color="#7b4a30" roughness={0.43} />
        </mesh>
        <mesh position={[0, -0.69, 0]}>
          <cylinderGeometry args={[0.42, 0.47, 0.1, 48]} />
          <meshStandardMaterial color="#835136" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

export function HeroScene() {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(query.matches);
    updateMotion();
    query.addEventListener('change', updateMotion);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '160px' });
    if (host.current) observer.observe(host.current);
    return () => {
      query.removeEventListener('change', updateMotion);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={host} className="h-full w-full">
      <Canvas frameloop={visible && !reducedMotion ? 'always' : 'demand'} camera={{ position: [0, 2.2, 6.8], fov: 34 }} dpr={[1, 1.35]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} aria-label="Abstract three-dimensional bespoke lounge setting">
        <ambientLight intensity={1.35} />
        <directionalLight position={[-3, 5, 4]} intensity={2.8} color="#fff1d6" />
        <pointLight position={[4, 2, 2]} intensity={38} color="#b3945e" distance={8} />
        <Suspense fallback={null}>
          <LoungeComposition reducedMotion={reducedMotion} />
          <ContactShadows position={[0, -0.68, 0]} opacity={0.34} scale={8} blur={2.6} far={4} />
        </Suspense>
      </Canvas>
    </div>
  );
}
