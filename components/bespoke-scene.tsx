'use client';

import { ContactShadows, RoundedBox } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group, Mesh } from 'three';

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

function CustomSofa() {
  const group = useRef<Group>(null);
  const seat = useRef<Mesh>(null);
  const back = useRef<Mesh>(null);
  const leftArm = useRef<Mesh>(null);
  const rightArm = useRef<Mesh>(null);
  const legs = useRef<Group>(null);

  useFrame(() => {
    const section = document.getElementById('bespoke');
    if (!section || !group.current || !seat.current || !back.current || !leftArm.current || !rightArm.current || !legs.current) return;
    const rect = section.getBoundingClientRect();
    const progress = clamp(-rect.top / Math.max(1, rect.height - window.innerHeight));
    const explode = Math.sin(progress * Math.PI);
    const settle = clamp((progress - 0.62) / 0.3);

    group.current.rotation.y = -0.3 + progress * 0.55;
    group.current.rotation.x = 0.02 + explode * 0.04;
    seat.current.position.y = explode * 0.38;
    back.current.position.y = 0.92 + explode * 0.88;
    back.current.position.z = 0.38 + explode * 0.32;
    leftArm.current.position.x = -1.56 - explode * 0.72;
    rightArm.current.position.x = 1.56 + explode * 0.72;
    legs.current.position.y = -0.58 - explode * 0.52;
    group.current.scale.setScalar(0.92 + settle * 0.08);
  });

  return (
    <group ref={group} rotation={[0.02, -0.3, 0]} position={[0, -0.2, 0]}>
      <RoundedBox ref={seat} args={[3.2, 0.5, 1.32]} radius={0.18} smoothness={5}>
        <meshStandardMaterial color="#d7c8b2" roughness={0.8} />
      </RoundedBox>
      <RoundedBox ref={back} args={[3.02, 1.15, 0.42]} radius={0.18} smoothness={5} position={[0, 0.92, 0.38]} rotation={[-0.1, 0, 0]}>
        <meshStandardMaterial color="#e5dbca" roughness={0.78} />
      </RoundedBox>
      <RoundedBox ref={leftArm} args={[0.48, 0.92, 1.25]} radius={0.16} smoothness={5} position={[-1.56, 0.26, 0]}>
        <meshStandardMaterial color="#c8b79e" roughness={0.78} />
      </RoundedBox>
      <RoundedBox ref={rightArm} args={[0.48, 0.92, 1.25]} radius={0.16} smoothness={5} position={[1.56, 0.26, 0]}>
        <meshStandardMaterial color="#c8b79e" roughness={0.78} />
      </RoundedBox>
      <group ref={legs} position={[0, -0.58, 0]}>
        {[-1.15, 1.15].map((x) => (
          <mesh key={x} position={[x, 0, 0.26]}>
            <cylinderGeometry args={[0.05, 0.07, 0.72, 18]} />
            <meshStandardMaterial color="#ae8c56" metalness={0.58} roughness={0.3} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function BespokeScene() {
  return (
    <Canvas camera={{ position: [0, 2.05, 6.5], fov: 35 }} dpr={[1, 1.4]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={1.15} />
      <directionalLight position={[-4, 5, 5]} intensity={3} color="#fff0d4" />
      <pointLight position={[4, 1, 2]} intensity={24} color="#b3945e" />
      <CustomSofa />
      <ContactShadows position={[0, -1, 0]} opacity={0.32} scale={8} blur={3} far={5} />
    </Canvas>
  );
}

