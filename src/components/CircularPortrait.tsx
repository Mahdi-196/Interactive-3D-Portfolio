import { useTexture, Text } from '@react-three/drei';
import { Suspense, useMemo } from 'react';
import * as THREE from 'three';

/**
 * Circular Portrait - Victorian-style portrait in circular wooden frame
 * Features vintage photograph in round frame with decorative border
 */
export const CircularPortrait = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  textureUrl = '/Portrait.png'
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
        <PortraitContent textureUrl={textureUrl} materials={materials} />
      </Suspense>
    </group>
  );
};

const PortraitContent = ({
  textureUrl,
  materials
}: {
  textureUrl: string;
  materials: Record<string, THREE.MeshStandardMaterial>;
}) => {
  // Load portrait texture
  const texture = useTexture(textureUrl);

  // Configure texture
  useMemo(() => {
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  const portraitMaterial = useMemo(() =>
    new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.8,
      metalness: 0.0
    }),
    [texture]
  );

  // Portrait dimensions
  const portraitRadius = 0.8;
  const frameThickness = 0.06;
  const frameDepth = 0.08;

  return (
    <group scale={[1, 1.3, 1]}>
      {/* Portrait photo - circular (scaled to oval) */}
      <mesh position={[0, 0, 0.05]} material={portraitMaterial} frustumCulled>
        <circleGeometry args={[portraitRadius, 32]} />
      </mesh>

      {/* Outer frame ring - dark wood (torus only, scaled to oval) */}
      <mesh position={[0, 0, 0.06]} material={materials.darkWood} frustumCulled>
        <torusGeometry args={[
          portraitRadius + frameThickness / 2,
          frameThickness,
          8,
          32
        ]} />
      </mesh>

      {/* Decorative brass rim around portrait */}
      <mesh position={[0, 0, 0.07]} material={materials.brass} frustumCulled>
        <torusGeometry args={[
          portraitRadius,
          0.015,
          6,
          32
        ]} />
      </mesh>

      {/* Ornamental brass details - 4 points */}
      {[0, Math.PI / 2, Math.PI, -Math.PI / 2].map((angle, i) => {
        const x = Math.cos(angle) * (portraitRadius + frameThickness / 2);
        const y = Math.sin(angle) * (portraitRadius + frameThickness / 2);
        return (
          <mesh
            key={`ornament-${i}`}
            position={[x, y, 0.08]}
            material={materials.darkWood}
            frustumCulled
          >
            <sphereGeometry args={[0.03, 8, 8]} />
          </mesh>
        );
      })}

      {/* Brass nameplate at bottom */}
      <mesh
        position={[0, -(portraitRadius + frameThickness + 0.15), 0.08]}
        material={materials.brass}
        frustumCulled
      >
        <boxGeometry args={[1.4, 0.12, 0.01]} />
      </mesh>

      {/* Nameplate text */}
      <Text
        position={[0, -(portraitRadius + frameThickness + 0.15), 0.09]}
        fontSize={0.06}
        color="#1a1a1a"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.3}
      >
        Major-General Charles George Gordon
      </Text>
    </group>
  );
};
