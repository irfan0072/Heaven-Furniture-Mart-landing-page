'use client';

import { Center, ContactShadows, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { Mesh, Object3D } from 'three';

type ConfiguratorSceneProps = {
  widthScale: number;
  label?: string;
};

const MODEL_URL = '/models/sofa-01/Sofa_01_1k.gltf';

function ImportedSofa({ widthScale }: Pick<ConfiguratorSceneProps, 'widthScale'>) {
  const { scene } = useGLTF(MODEL_URL);
  const { size } = useThree();
  const model = useMemo(() => scene.clone(true), [scene]);
  const compact = size.width < 560;

  useEffect(() => {
    model.traverse((object: Object3D) => {
      if ('isMesh' in object && object.isMesh) {
        const mesh = object as Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [model]);

  const baseScale = compact ? 1.35 : 2.42;

  return (
    <group
      position={[0, compact ? -0.1 : -0.02, 0]}
      rotation={[0.01, -0.16, 0]}
      scale={[baseScale * widthScale, baseScale, baseScale]}
    >
      <Center>
        <primitive object={model} />
      </Center>
      <ContactShadows
        position={[0, compact ? -0.46 : -0.43, 0]}
        opacity={0.44}
        scale={compact ? 4.5 : 3.2}
        blur={2.5}
        far={4}
      />
    </group>
  );
}

export function ConfiguratorScene(props: ConfiguratorSceneProps) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(motion.matches);
    updateMotion();
    motion.addEventListener('change', updateMotion);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '180px' });
    if (host.current) observer.observe(host.current);
    return () => {
      motion.removeEventListener('change', updateMotion);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={host} className="h-full w-full">
      <Canvas
        aria-label={props.label ?? 'Interactive three-dimensional sofa preview'}
        shadows
        frameloop={visible && !reducedMotion ? 'always' : 'demand'}
        dpr={[1, 1.4]}
        camera={{ position: [0, 1.2, 6.2], fov: 33 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.15} />
        <hemisphereLight args={['#fff2dd', '#102b29', 1.8]} />
        <directionalLight castShadow position={[-4, 6, 5]} intensity={3.2} color="#fff2dc" shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[4, 2, -3]} intensity={1.4} color="#b3945e" />
        <Suspense fallback={null}>
          <ImportedSofa widthScale={props.widthScale} />
        </Suspense>
        <OrbitControls
          makeDefault
          enabled={!reducedMotion}
          enablePan={false}
          enableZoom
          minDistance={4.8}
          maxDistance={8}
          minPolarAngle={1.12}
          maxPolarAngle={1.62}
          autoRotate={!reducedMotion}
          autoRotateSpeed={0.34}
          target={[0, -0.06, 0]}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
