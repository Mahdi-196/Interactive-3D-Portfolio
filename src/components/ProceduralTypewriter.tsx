import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Vintage Typewriter - 1930s portable model
 * Features realistic keyboard, carriage, ribbon spools, and paper
 */
export const ProceduralTypewriter = ({
  position,
  rotation = [0, 0, 0],
  scale = 1
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) => {
  const materials = useMemo(() => ({
    blackEnamel: new THREE.MeshStandardMaterial({
      color: "#1a1a1a",
      roughness: 0.3,
      metalness: 0.6
    }),
    chrome: new THREE.MeshStandardMaterial({
      color: "#c0c0c0",
      roughness: 0.1,
      metalness: 0.95
    }),
    whitePaper: new THREE.MeshStandardMaterial({
      color: "#f8f8f0",
      roughness: 0.9,
      metalness: 0.0
    }),
    redRibbon: new THREE.MeshStandardMaterial({
      color: "#8b0000",
      roughness: 0.7,
      metalness: 0.0
    }),
    darkMetal: new THREE.MeshStandardMaterial({
      color: "#2a2a2a",
      roughness: 0.4,
      metalness: 0.7
    })
  }), []);

  // Key positions for realistic keyboard layout
  const keyRows = [
    { y: 0.02, z: 0.08, keys: 10, offset: 0 },      // Front row
    { y: 0.025, z: 0.04, keys: 10, offset: 0.015 },  // Middle row
    { y: 0.03, z: 0.0, keys: 9, offset: 0.03 },     // Back row
  ];

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Base/body - main typewriter housing */}
      <mesh position={[0, 0, 0]} material={materials.blackEnamel} frustumCulled>
        <boxGeometry args={[0.4, 0.08, 0.3]} />
      </mesh>

      {/* Keyboard panel - angled surface */}
      <mesh
        position={[0, 0.045, 0.05]}
        rotation={[-0.1, 0, 0]}
        material={materials.darkMetal}
        frustumCulled
      >
        <boxGeometry args={[0.35, 0.005, 0.18]} />
      </mesh>

      {/* Typewriter keys - 3 rows */}
      {keyRows.map((row, rowIndex) => (
        row.keys === 10 ? (
          // Full rows (10 keys)
          [-0.135, -0.105, -0.075, -0.045, -0.015, 0.015, 0.045, 0.075, 0.105, 0.135].map((xPos, i) => (
            <mesh
              key={`key-${rowIndex}-${i}`}
              position={[xPos + row.offset, row.y, row.z]}
              material={materials.chrome}
              frustumCulled
            >
              <cylinderGeometry args={[0.012, 0.012, 0.015, 6]} />
            </mesh>
          ))
        ) : (
          // Shorter row (9 keys)
          [-0.12, -0.09, -0.06, -0.03, 0.0, 0.03, 0.06, 0.09, 0.12].map((xPos, i) => (
            <mesh
              key={`key-${rowIndex}-${i}`}
              position={[xPos + row.offset, row.y, row.z]}
              material={materials.chrome}
              frustumCulled
            >
              <cylinderGeometry args={[0.012, 0.012, 0.015, 6]} />
            </mesh>
          ))
        )
      ))}

      {/* Spacebar - wide key at bottom */}
      <mesh position={[0, 0.018, 0.11]} material={materials.chrome} frustumCulled>
        <boxGeometry args={[0.2, 0.012, 0.025]} />
      </mesh>

      {/* Paper carriage - rear elevated section */}
      <mesh position={[0, 0.11, -0.08]} material={materials.darkMetal} frustumCulled>
        <boxGeometry args={[0.38, 0.08, 0.08]} />
      </mesh>

      {/* Paper roller - chrome cylinder */}
      <mesh
        position={[0, 0.14, -0.08]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.chrome}
        frustumCulled
      >
        <cylinderGeometry args={[0.018, 0.018, 0.36, 8]} />
      </mesh>

      {/* Paper - white sheet in carriage */}
      <mesh position={[0, 0.16, -0.06]} material={materials.whitePaper} frustumCulled>
        <boxGeometry args={[0.2, 0.001, 0.15]} />
      </mesh>

      {/* Ribbon spool - left */}
      <mesh
        position={[-0.12, 0.09, -0.03]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.darkMetal}
        frustumCulled
      >
        <cylinderGeometry args={[0.025, 0.025, 0.05, 8]} />
      </mesh>

      {/* Ribbon - red/black ink ribbon visible */}
      <mesh
        position={[-0.12, 0.09, -0.03]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.redRibbon}
        frustumCulled
      >
        <cylinderGeometry args={[0.02, 0.02, 0.052, 8]} />
      </mesh>

      {/* Ribbon spool - right */}
      <mesh
        position={[0.12, 0.09, -0.03]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.darkMetal}
        frustumCulled
      >
        <cylinderGeometry args={[0.025, 0.025, 0.05, 8]} />
      </mesh>

      {/* Carriage return lever - chrome bar on left */}
      <mesh
        position={[-0.19, 0.12, -0.08]}
        rotation={[0, 0, -0.3]}
        material={materials.chrome}
        frustumCulled
      >
        <cylinderGeometry args={[0.008, 0.008, 0.12, 6]} />
      </mesh>

      {/* Lever handle - chrome knob */}
      <mesh position={[-0.23, 0.17, -0.08]} material={materials.chrome} frustumCulled>
        <sphereGeometry args={[0.015, 8, 8]} />
      </mesh>

      {/* Type bar housing - central mechanism */}
      <mesh position={[0, 0.06, -0.02]} material={materials.blackEnamel} frustumCulled>
        <boxGeometry args={[0.3, 0.04, 0.06]} />
      </mesh>

      {/* Front edge trim - decorative chrome strip */}
      <mesh
        position={[0, 0.042, 0.15]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.chrome}
        frustumCulled
      >
        <cylinderGeometry args={[0.006, 0.006, 0.38, 6]} />
      </mesh>

      {/* Rubber feet - four corners */}
      {[
        [-0.18, -0.04, 0.13],
        [0.18, -0.04, 0.13],
        [-0.18, -0.04, -0.13],
        [0.18, -0.04, -0.13],
      ].map((pos, i) => (
        <mesh key={`foot-${i}`} position={[pos[0], pos[1], pos[2]]} material={materials.darkMetal} frustumCulled>
          <cylinderGeometry args={[0.012, 0.015, 0.008, 6]} />
        </mesh>
      ))}
    </group>
  );
};
