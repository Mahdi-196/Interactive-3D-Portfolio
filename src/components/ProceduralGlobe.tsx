import { useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

/**
 * Globe with texture - wrapped in Suspense for texture loading
 */
const GlobeWithTexture = ({
  textureUrl,
  position,
  scale
}: {
  textureUrl: string;
  position: [number, number, number];
  scale: number;
}) => {
  const texture = useTexture(textureUrl);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: texture,
      color: "#d4c5a9",
      roughness: 0.7,
      metalness: 0.1
    });
  }, [texture]);

  return (
    <mesh position={position} material={material}>
      <sphereGeometry args={[0.25 * scale, 32, 32]} />
    </mesh>
  );
};

/**
 * Procedural Antique Globe - Lightweight replacement for GLTF model
 * Uses simple geometry (sphere + torus + cylinder) instead of 447KB model
 */
export const ProceduralGlobe = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  textureUrl
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  textureUrl?: string;
}) => {
  // Shared materials for performance
  const materials = useMemo(() => ({
    globe: new THREE.MeshStandardMaterial({
      color: "#d4c5a9",
      roughness: 0.7,
      metalness: 0.1
    }),
    brass: new THREE.MeshStandardMaterial({
      color: "#8b7355", // Aged brass
      roughness: 0.4,
      metalness: 0.6
    }),
    wood: new THREE.MeshStandardMaterial({
      color: "#3d2817", // Dark wood base
      roughness: 0.7,
      metalness: 0.1
    })
  }), []);

  const globeRadius = 0.25 * scale;
  const baseHeight = 0.08 * scale;
  const standHeight = 0.15 * scale;

  // Calculate total height from base to get proper positioning
  const totalBaseAndStandHeight = baseHeight + standHeight;
  const globePosition: [number, number, number] = [0, totalBaseAndStandHeight + globeRadius, 0];

  return (
    <group position={position} rotation={rotation}>
      {/* Globe sphere - main feature (with optional texture) */}
      {textureUrl ? (
        <Suspense fallback={
          <mesh position={globePosition} material={materials.globe}>
            <sphereGeometry args={[globeRadius, 16, 16]} />
          </mesh>
        }>
          <GlobeWithTexture
            textureUrl={textureUrl}
            position={globePosition}
            scale={scale}
          />
        </Suspense>
      ) : (
        <mesh position={globePosition} material={materials.globe}>
          <sphereGeometry args={[globeRadius, 16, 16]} />
        </mesh>
      )}

      {/* Brass meridian arc (partial C-shape from pole to pole) */}
      <mesh
        position={globePosition}
        rotation={[0, Math.PI / 6, Math.PI / 2]} // Tilted for classic globe look
        material={materials.brass}
      >
        <torusGeometry
          args={[
            globeRadius + 0.01,  // radius
            0.008,               // tube thickness
            8,                   // radial segments
            32,                  // tubular segments
            Math.PI * 1.2        // arc angle (216 degrees, not full circle)
          ]}
        />
      </mesh>

      {/* Brass mounting arm (connects globe to base) */}
      <mesh
        position={[-globeRadius * 0.7, totalBaseAndStandHeight + globeRadius * 0.5, 0]}
        rotation={[0, 0, Math.PI / 4]}
        material={materials.brass}
      >
        <cylinderGeometry args={[0.012, 0.012, globeRadius * 1.4, 6]} />
      </mesh>

      {/* Wooden stand/pedestal */}
      <mesh position={[0, baseHeight + standHeight / 2, 0]} material={materials.wood}>
        <cylinderGeometry args={[0.08 * scale, 0.1 * scale, standHeight, 8]} />
      </mesh>

      {/* Wooden base (circular platform) - sits on desk surface */}
      <mesh position={[0, baseHeight / 2, 0]} material={materials.wood}>
        <cylinderGeometry args={[0.12 * scale, 0.12 * scale, baseHeight, 12]} />
      </mesh>

      {/* Base edge trim (decorative ring) */}
      <mesh position={[0, baseHeight, 0]} material={materials.brass}>
        <torusGeometry args={[0.11 * scale, 0.006, 6, 16]} />
      </mesh>
    </group>
  );
};
