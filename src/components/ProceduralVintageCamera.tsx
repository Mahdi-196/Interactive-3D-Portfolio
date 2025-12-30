import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Vintage Camera - 1930s folding bellows camera
 * Features leather body, brass lens, expandable bellows
 */
export const ProceduralVintageCamera = ({
  position,
  rotation = [0, 0, 0],
  scale = 1
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) => {
  const materials = useMemo(() => ({
    blackLeather: new THREE.MeshStandardMaterial({
      color: "#654321",
      roughness: 0.85,
      metalness: 0.1
    }),
    brass: new THREE.MeshStandardMaterial({
      color: "#b8860b",
      roughness: 0.25,
      metalness: 0.85
    }),
    darkMetal: new THREE.MeshStandardMaterial({
      color: "#2a2a2a",
      roughness: 0.4,
      metalness: 0.7
    }),
    glass: new THREE.MeshStandardMaterial({
      color: "#e8f4f8",
      roughness: 0.05,
      metalness: 0.1,
      transparent: true,
      opacity: 0.4
    }),
    redLeather: new THREE.MeshStandardMaterial({
      color: "#5c1a1a",
      roughness: 0.9,
      metalness: 0.0
    })
  }), []);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Camera body - main box */}
      <mesh position={[0, 0.04, 0]} material={materials.blackLeather} frustumCulled>
        <boxGeometry args={[0.1, 0.08, 0.06]} />
      </mesh>

      {/* Front plate - brass */}
      <mesh position={[0, 0.04, 0.031]} material={materials.brass} frustumCulled>
        <boxGeometry args={[0.102, 0.082, 0.002]} />
      </mesh>

      {/* Lens housing - brass cylinder */}
      <mesh
        position={[0, 0.04, 0.065]}
        rotation={[Math.PI / 2, 0, 0]}
        material={materials.brass}
        frustumCulled
      >
        <cylinderGeometry args={[0.025, 0.028, 0.06, 12]} />
      </mesh>

      {/* Lens glass */}
      <mesh
        position={[0, 0.04, 0.096]}
        rotation={[Math.PI / 2, 0, 0]}
        material={materials.glass}
        frustumCulled
      >
        <cylinderGeometry args={[0.02, 0.02, 0.002, 12]} />
      </mesh>

      {/* Inner lens element */}
      <mesh
        position={[0, 0.04, 0.092]}
        rotation={[Math.PI / 2, 0, 0]}
        material={materials.glass}
        frustumCulled
      >
        <cylinderGeometry args={[0.015, 0.015, 0.002, 12]} />
      </mesh>

      {/* Lens cap ring - decorative */}
      <mesh
        position={[0, 0.04, 0.098]}
        rotation={[Math.PI / 2, 0, 0]}
        material={materials.brass}
        frustumCulled
      >
        <torusGeometry args={[0.023, 0.003, 6, 12]} />
      </mesh>

      {/* Bellows - folding accordion section (simplified with stacked boxes) */}
      {[0.048, 0.056, 0.064, 0.072].map((zPos, i) => (
        <mesh
          key={`bellows-${i}`}
          position={[0, 0.04, zPos]}
          material={materials.redLeather}
          frustumCulled
        >
          <boxGeometry args={[0.09 - i * 0.008, 0.07 - i * 0.008, 0.006]} />
        </mesh>
      ))}

      {/* Viewfinder - top mounted */}
      <mesh position={[0, 0.09, -0.01]} material={materials.darkMetal} frustumCulled>
        <boxGeometry args={[0.025, 0.02, 0.025]} />
      </mesh>

      {/* Viewfinder lens */}
      <mesh
        position={[0, 0.095, 0.003]}
        rotation={[Math.PI / 2, 0, 0]}
        material={materials.glass}
        frustumCulled
      >
        <cylinderGeometry args={[0.008, 0.008, 0.002, 8]} />
      </mesh>

      {/* Shutter button - top right */}
      <mesh position={[0.04, 0.085, 0]} material={materials.brass} frustumCulled>
        <cylinderGeometry args={[0.006, 0.006, 0.008, 8]} />
      </mesh>

      {/* Film advance knob - left side */}
      <mesh
        position={[-0.055, 0.055, -0.01]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.brass}
        frustumCulled
      >
        <cylinderGeometry args={[0.012, 0.01, 0.015, 8]} />
      </mesh>

      {/* Film rewind knob - right side */}
      <mesh
        position={[0.055, 0.055, -0.01]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.brass}
        frustumCulled
      >
        <cylinderGeometry args={[0.012, 0.01, 0.015, 8]} />
      </mesh>

      {/* Aperture dial - small knob on lens */}
      <mesh
        position={[0.025, 0.04, 0.08]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.darkMetal}
        frustumCulled
      >
        <cylinderGeometry args={[0.008, 0.008, 0.01, 6]} />
      </mesh>

      {/* Focus dial - knob on lens */}
      <mesh
        position={[-0.025, 0.04, 0.08]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.darkMetal}
        frustumCulled
      >
        <cylinderGeometry args={[0.008, 0.008, 0.01, 6]} />
      </mesh>

      {/* Carrying strap mount - left */}
      <mesh
        position={[-0.05, 0.075, 0.01]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.brass}
        frustumCulled
      >
        <torusGeometry args={[0.006, 0.002, 4, 8]} />
      </mesh>

      {/* Carrying strap mount - right */}
      <mesh
        position={[0.05, 0.075, 0.01]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.brass}
        frustumCulled
      >
        <torusGeometry args={[0.006, 0.002, 4, 8]} />
      </mesh>

      {/* Base plate - bottom support */}
      <mesh position={[0, 0.001, 0]} material={materials.darkMetal} frustumCulled>
        <boxGeometry args={[0.11, 0.002, 0.065]} />
      </mesh>

      {/* Tripod mount screw - bottom center */}
      <mesh position={[0, 0.0, 0]} material={materials.brass} frustumCulled>
        <cylinderGeometry args={[0.004, 0.004, 0.003, 6]} />
      </mesh>

      {/* Flash sync port - small brass fitting */}
      <mesh
        position={[0.04, 0.03, 0.031]}
        rotation={[Math.PI / 2, 0, 0]}
        material={materials.brass}
        frustumCulled
      >
        <cylinderGeometry args={[0.003, 0.003, 0.004, 6]} />
      </mesh>
    </group>
  );
};
