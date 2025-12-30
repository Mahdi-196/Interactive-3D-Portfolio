import { useTexture } from '@react-three/drei';
import { Suspense, useMemo } from 'react';
import * as THREE from 'three';

/**
 * Framed Painting - Victorian-style artwork in ornate frame
 * Features atmospheric street scene painting with decorative wooden frame
 */
export const FramedPainting = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  textureUrl = '/StreetPainting.png'
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  textureUrl?: string;
}) => {
  const materials = useMemo(() => ({
    darkWood: new THREE.MeshStandardMaterial({
      color: "#654321",
      roughness: 0.7,
      metalness: 0.1
    }),
    richWood: new THREE.MeshStandardMaterial({
      color: "#8B6F47",
      roughness: 0.65,
      metalness: 0.1
    }),
    brass: new THREE.MeshStandardMaterial({
      color: "#b8860b",
      roughness: 0.25,
      metalness: 0.85
    })
  }), []);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Suspense fallback={null}>
        <PaintingContent textureUrl={textureUrl} materials={materials} />
      </Suspense>
    </group>
  );
};

const PaintingContent = ({
  textureUrl,
  materials
}: {
  textureUrl: string;
  materials: Record<string, THREE.MeshStandardMaterial>;
}) => {
  // Load painting texture
  const texture = useTexture(textureUrl);

  // Configure texture
  useMemo(() => {
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  const paintingMaterial = useMemo(() =>
    new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.8,
      metalness: 0.0
    }),
    [texture]
  );

  // Painting dimensions (landscape orientation)
  const paintingWidth = 3.5;
  const paintingHeight = 2.5;
  const frameDepth = 0.08;
  const frameThickness = 0.15;

  return (
    <>
      {/* Outer frame - dark wood */}
      <mesh material={materials.darkWood} frustumCulled>
        <boxGeometry args={[
          paintingWidth + frameThickness * 2,
          paintingHeight + frameThickness * 2,
          frameDepth
        ]} />
      </mesh>

      {/* Painting canvas - pushed forward significantly */}
      <mesh position={[0, 0, 0.1]} material={paintingMaterial} frustumCulled>
        <planeGeometry args={[paintingWidth, paintingHeight]} />
      </mesh>

      {/* Decorative corner accents - dark wood */}
      {[
        [-paintingWidth / 2 - 0.05, paintingHeight / 2 + 0.05],
        [paintingWidth / 2 + 0.05, paintingHeight / 2 + 0.05],
        [-paintingWidth / 2 - 0.05, -paintingHeight / 2 - 0.05],
        [paintingWidth / 2 + 0.05, -paintingHeight / 2 - 0.05],
      ].map(([x, y], i) => (
        <mesh
          key={`corner-${i}`}
          position={[x, y, 0.12]}
          material={materials.darkWood}
          frustumCulled
        >
          <boxGeometry args={[0.08, 0.08, 0.01]} />
        </mesh>
      ))}
    </>
  );
};
