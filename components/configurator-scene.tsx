'use client';

import {
  Center,
  ContactShadows,
  Html,
  OrbitControls,
  useGLTF,
} from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import {
  CanvasTexture,
  MathUtils,
  MeshStandardMaterial,
  SRGBColorSpace,
  Vector3,
} from 'three';
import type { Mesh, Object3D, Texture } from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

type ConfiguratorSceneProps = {
  widthScale: number;
  fabricColor: string;
  woodColor: string;
  cameraDistance: number;
  resetKey: number;
  label?: string;
};

const MODEL_URL = '/models/sofa-01/Sofa_01_1k.gltf';

const rgbFromHex = (hex: string) => {
  const value = Number.parseInt(hex.slice(1), 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
};

function ImportedSofa({
  widthScale,
  fabricColor,
  woodColor,
}: Pick<ConfiguratorSceneProps, 'widthScale' | 'fabricColor' | 'woodColor'>) {
  const { scene } = useGLTF(MODEL_URL);
  const { size } = useThree();
  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((object: Object3D) => {
      if ('isMesh' in object && object.isMesh) {
        const mesh = object as Mesh;
        const materials = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];
        const cloned = materials.map((material) => {
          const copy = material.clone() as MeshStandardMaterial;
          copy.userData.sourceMap = (material as MeshStandardMaterial).map;
          return copy;
        });
        mesh.material = Array.isArray(mesh.material) ? cloned : cloned[0];
      }
    });
    return clone;
  }, [scene]);
  const aspect = size.width / Math.max(size.height, 1);
  const compact = size.width < 560;

  useEffect(() => {
    const generatedTextures: CanvasTexture[] = [];
    const fabric = rgbFromHex(fabricColor);
    const wood = rgbFromHex(woodColor);

    model.traverse((object: Object3D) => {
      if ('isMesh' in object && object.isMesh) {
        const mesh = object as Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const materials = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];
        materials.forEach((material) => {
          if (!(material instanceof MeshStandardMaterial)) return;
          const sourceMap = material.userData.sourceMap as Texture | undefined;
          const image = sourceMap?.image as
            | (CanvasImageSource & { width: number; height: number })
            | undefined;
          if (!sourceMap || !image?.width || !image.height) return;

          const canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;
          const context = canvas.getContext('2d', {
            willReadFrequently: true,
          });
          if (!context) return;
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          const pixels = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height,
          );
          const data = pixels.data;
          for (let index = 0; index < data.length; index += 4) {
            const red = data[index];
            const green = data[index + 1];
            const blue = data[index + 2];
            const luminance = red * 0.299 + green * 0.587 + blue * 0.114;
            const isWood =
              red > green * 1.1 && green > blue * 1.04 && luminance < 145;
            const target = isWood ? wood : fabric;
            const shade = isWood
              ? MathUtils.clamp(0.34 + luminance / 125, 0.38, 1.25)
              : MathUtils.clamp(0.34 + luminance / 235, 0.42, 1.24);
            data[index] = Math.min(255, target.r * shade);
            data[index + 1] = Math.min(255, target.g * shade);
            data[index + 2] = Math.min(255, target.b * shade);
          }
          context.putImageData(pixels, 0, 0);

          const map = new CanvasTexture(canvas);
          map.colorSpace = SRGBColorSpace;
          map.flipY = sourceMap.flipY;
          map.wrapS = sourceMap.wrapS;
          map.wrapT = sourceMap.wrapT;
          map.repeat.copy(sourceMap.repeat);
          map.offset.copy(sourceMap.offset);
          map.rotation = sourceMap.rotation;
          map.needsUpdate = true;
          generatedTextures.push(map);
          material.map = map;
          material.color.set('#ffffff');
          material.needsUpdate = true;
        });
      }
    });
    return () => generatedTextures.forEach((texture) => texture.dispose());
  }, [fabricColor, model, woodColor]);

  const baseScale = compact
    ? 1.36
    : MathUtils.clamp(1.35 + (aspect - 0.75) * 0.65, 1.35, 1.9);

  return (
    <group
      position={[0, compact ? -0.08 : -0.02, 0]}
      rotation={[0.01, -0.16, 0]}
      scale={[baseScale * widthScale, baseScale, baseScale]}
    >
      <Center>
        <primitive object={model} />
      </Center>
      <ContactShadows
        position={[0, -0.4 * baseScale, 0]}
        opacity={0.44}
        scale={compact ? 4.5 : 4.2}
        blur={2.5}
        far={4}
      />
    </group>
  );
}

function CameraControls({
  cameraDistance,
  resetKey,
  reducedMotion,
}: Pick<ConfiguratorSceneProps, 'cameraDistance' | 'resetKey'> & {
  reducedMotion: boolean;
}) {
  const { camera, invalidate } = useThree();
  const target = useMemo(() => new Vector3(0, -0.04, 0), []);
  const previousReset = useRef(resetKey);
  const controls = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    const didReset = previousReset.current !== resetKey;
    const direction = didReset
      ? new Vector3(0, 1.2, 6.2).sub(target).normalize()
      : camera.position.clone().sub(target).normalize();
    camera.position.copy(
      target.clone().add(direction.multiplyScalar(cameraDistance)),
    );
    camera.lookAt(target);
    camera.updateProjectionMatrix();
    if (controls.current) {
      controls.current.target.copy(target);
      controls.current.update();
    }
    invalidate();
    previousReset.current = resetKey;
  }, [camera, cameraDistance, invalidate, resetKey, target]);

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enabled
      enablePan={false}
      enableZoom
      enableDamping={!reducedMotion}
      dampingFactor={0.065}
      rotateSpeed={0.65}
      zoomSpeed={1.1}
      zoomToCursor
      minDistance={4.2}
      maxDistance={8.6}
      minPolarAngle={1.12}
      maxPolarAngle={1.62}
      autoRotate={!reducedMotion}
      autoRotateSpeed={0.34}
      target={[0, -0.04, 0]}
    />
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
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '180px' },
    );
    if (host.current) observer.observe(host.current);
    return () => {
      motion.removeEventListener('change', updateMotion);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={host}
      className="absolute inset-0 h-full w-full touch-none overscroll-contain"
    >
      <Canvas
        fallback={
          <p className="grid h-full place-items-center p-8 text-center text-white">
            3D unavailable · নিচে আপনার পছন্দ বেছে নিন
          </p>
        }
        aria-label={props.label ?? 'Interactive three-dimensional sofa preview'}
        shadows
        frameloop={visible && !reducedMotion ? 'always' : 'demand'}
        dpr={[1, 1.4]}
        camera={{ position: [0, 1.2, 6.2], fov: 33 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={1.15} />
        <hemisphereLight args={['#fff2dd', '#102b29', 1.8]} />
        <directionalLight
          castShadow
          position={[-4, 6, 5]}
          intensity={3.2}
          color="#fff2dc"
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight
          position={[4, 2, -3]}
          intensity={1.4}
          color="#b3945e"
        />
        <Suspense
          fallback={
            <Html center>
              <output className="whitespace-nowrap rounded bg-[#081d1c] px-4 py-3 text-sm text-white">
                Loading 3D · ৩ডি লোড হচ্ছে…
              </output>
            </Html>
          }
        >
          <ImportedSofa
            widthScale={props.widthScale}
            fabricColor={props.fabricColor}
            woodColor={props.woodColor}
          />
        </Suspense>
        <CameraControls
          cameraDistance={props.cameraDistance}
          resetKey={props.resetKey}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
