'use client';

import { ContactShadows, RoundedBox } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import type { Group } from 'three';

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

function CustomSofa({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<Group>(null);
  const seat = useRef<Group>(null);
  const back = useRef<Group>(null);
  const leftArm = useRef<Group>(null);
  const rightArm = useRef<Group>(null);
  const legs = useRef<Group>(null);

  useFrame(() => {
    if (reducedMotion) return;
    const section = document.getElementById('bespoke');
    if (!section || !group.current || !seat.current || !back.current || !leftArm.current || !rightArm.current || !legs.current) return;
    const rect = section.getBoundingClientRect();
    const progress = clamp(-rect.top / Math.max(1, rect.height - window.innerHeight));
    const explode = Math.sin(progress * Math.PI);
    const settle = clamp((progress - 0.62) / 0.3);

    group.current.rotation.y = -0.3 + progress * 0.55;
    group.current.rotation.x = 0.02 + explode * 0.04;
    seat.current.position.y = explode * 0.42;
    back.current.position.y = explode * 0.92;
    back.current.position.z = explode * 0.34;
    leftArm.current.position.x = -1.76 - explode * 0.72;
    rightArm.current.position.x = 1.76 + explode * 0.72;
    legs.current.position.y = -0.58 - explode * 0.52;
    group.current.scale.setScalar(0.92 + settle * 0.08);
  });

  return (
    <group ref={group} rotation={[0.02, -0.3, 0]} position={[0, -0.2, 0]}>
      <RoundedBox args={[3.42, 0.38, 1.34]} radius={0.16} smoothness={6} position={[0, -0.02, 0.04]}>
        <meshStandardMaterial color="#a99c88" roughness={0.82} />
      </RoundedBox>
      <RoundedBox args={[3.18, 0.72, 0.28]} radius={0.12} smoothness={5} position={[0, 0.69, -0.5]} rotation={[-0.08, 0, 0]}>
        <meshStandardMaterial color="#b7aa97" roughness={0.82} />
      </RoundedBox>
      <group ref={seat}>
        {[-1.08, 0, 1.08].map((x) => (
          <RoundedBox key={`seat-${x}`} args={[1.01, 0.32, 1.16]} radius={0.16} smoothness={7} position={[x, 0.23, -0.08]} rotation={[-0.025, 0, 0]}>
            <meshStandardMaterial color="#ddd2c1" roughness={0.92} />
          </RoundedBox>
        ))}
      </group>
      <group ref={back}>
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
      </group>
      <group ref={leftArm} position={[-1.76, 0.34, -0.01]}>
        <RoundedBox args={[0.4, 0.8, 1.43]} radius={0.18} smoothness={7}>
          <meshStandardMaterial color="#cabda9" roughness={0.88} />
        </RoundedBox>
        <RoundedBox args={[0.34, 0.16, 1.28]} radius={0.07} smoothness={5} position={[0, 0.43, -0.02]}>
          <meshStandardMaterial color="#ded3c2" roughness={0.9} />
        </RoundedBox>
      </group>
      <group ref={rightArm} position={[1.76, 0.34, -0.01]}>
        <RoundedBox args={[0.4, 0.8, 1.43]} radius={0.18} smoothness={7}>
          <meshStandardMaterial color="#cabda9" roughness={0.88} />
        </RoundedBox>
        <RoundedBox args={[0.34, 0.16, 1.28]} radius={0.07} smoothness={5} position={[0, 0.43, -0.02]}>
          <meshStandardMaterial color="#ded3c2" roughness={0.9} />
        </RoundedBox>
      </group>
      <group ref={legs} position={[0, -0.58, 0]}>
        {[-1.35, 1.35].flatMap((x) => [-0.42, 0.42].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0, z]} rotation={[0, 0, x < 0 ? -0.035 : 0.035]}>
            <cylinderGeometry args={[0.045, 0.065, 0.62, 20]} />
            <meshStandardMaterial color="#9a7446" metalness={0.36} roughness={0.34} />
          </mesh>
        )))}
      </group>
    </group>
  );
}

export function BespokeScene() {
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
      <Canvas frameloop={visible && !reducedMotion ? 'always' : 'demand'} camera={{ position: [0, 2.05, 6.5], fov: 35 }} dpr={[1, 1.3]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        <ambientLight intensity={1.15} />
        <directionalLight position={[-4, 5, 5]} intensity={3} color="#fff0d4" />
        <pointLight position={[4, 1, 2]} intensity={24} color="#b3945e" />
        <CustomSofa reducedMotion={reducedMotion} />
        <ContactShadows position={[0, -1, 0]} opacity={0.32} scale={8} blur={3} far={5} />
      </Canvas>
    </div>
  );
}
