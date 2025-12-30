import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Art Deco Clock - 1930s mantel clock with geometric styling
 * Features brass case, cream face, black hands, stepped design
 */
export const ProceduralArtDecoClock = ({
  position,
  rotation = [0, 0, 0],
  scale = 1
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) => {
  const materials = useMemo(() => ({
    brass: new THREE.MeshStandardMaterial({
      color: "#b8860b",
      roughness: 0.25,
      metalness: 0.85
    }),
    darkBrass: new THREE.MeshStandardMaterial({
      color: "#8b6914",
      roughness: 0.3,
      metalness: 0.8
    }),
    creamFace: new THREE.MeshStandardMaterial({
      color: "#f5f5dc",
      roughness: 0.8,
      metalness: 0.0
    }),
    blackHands: new THREE.MeshStandardMaterial({
      color: "#1a1a1a",
      roughness: 0.4,
      metalness: 0.6
    }),
    glass: new THREE.MeshStandardMaterial({
      color: "#e8f4f8",
      roughness: 0.05,
      metalness: 0.1,
      transparent: true,
      opacity: 0.3
    })
  }), []);

  // Clock numerals positions (12, 3, 6, 9)
  const numeralPositions = [
    { angle: 0, radius: 0.055 },           // 12
    { angle: Math.PI / 2, radius: 0.055 }, // 3
    { angle: Math.PI, radius: 0.055 },     // 6
    { angle: -Math.PI / 2, radius: 0.055 } // 9
  ];

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Base - stepped Art Deco platform */}
      <mesh position={[0, 0.012, 0]} material={materials.darkBrass} frustumCulled>
        <boxGeometry args={[0.16, 0.008, 0.05]} />
      </mesh>

      {/* Middle platform step */}
      <mesh position={[0, 0.02, 0]} material={materials.brass} frustumCulled>
        <boxGeometry args={[0.14, 0.008, 0.045]} />
      </mesh>

      {/* Main clock body - rectangular case */}
      <mesh position={[0, 0.065, 0]} material={materials.brass} frustumCulled>
        <boxGeometry args={[0.12, 0.1, 0.04]} />
      </mesh>

      {/* Top decorative step */}
      <mesh position={[0, 0.12, 0]} material={materials.darkBrass} frustumCulled>
        <boxGeometry args={[0.13, 0.01, 0.042]} />
      </mesh>

      {/* Art Deco crown/finial */}
      <mesh position={[0, 0.13, 0]} material={materials.brass} frustumCulled>
        <boxGeometry args={[0.06, 0.01, 0.025]} />
      </mesh>

      {/* Clock face - cream colored circle */}
      <mesh position={[0, 0.065, 0.021]} material={materials.creamFace} frustumCulled>
        <cylinderGeometry args={[0.065, 0.065, 0.002, 16]} />
      </mesh>

      {/* Glass cover */}
      <mesh position={[0, 0.065, 0.023]} material={materials.glass} frustumCulled>
        <cylinderGeometry args={[0.067, 0.067, 0.002, 16]} />
      </mesh>

      {/* Brass bezel - ring around face */}
      <mesh position={[0, 0.065, 0.022]} material={materials.brass} frustumCulled>
        <torusGeometry args={[0.067, 0.004, 6, 16]} />
      </mesh>

      {/* Hour numerals - 12, 3, 6, 9 as small cylinders */}
      {numeralPositions.map((pos, i) => {
        const x = Math.sin(pos.angle) * pos.radius;
        const z = Math.cos(pos.angle) * pos.radius;
        return (
          <mesh
            key={`numeral-${i}`}
            position={[x, 0.065, z + 0.024]}
            rotation={[Math.PI / 2, 0, 0]}
            material={materials.blackHands}
            frustumCulled
          >
            <cylinderGeometry args={[0.003, 0.003, 0.002, 6]} />
          </mesh>
        );
      })}

      {/* Hour hand - shorter, wider */}
      <mesh
        position={[0, 0.065, 0.025]}
        rotation={[0, 0, Math.PI / 4]} // 1:30 position
        material={materials.blackHands}
        frustumCulled
      >
        <boxGeometry args={[0.035, 0.006, 0.001]} />
      </mesh>

      {/* Minute hand - longer, thinner */}
      <mesh
        position={[0, 0.065, 0.026]}
        rotation={[0, 0, -Math.PI / 6]} // 6:30 position
        material={materials.blackHands}
        frustumCulled
      >
        <boxGeometry args={[0.05, 0.004, 0.001]} />
      </mesh>

      {/* Center pin */}
      <mesh position={[0, 0.065, 0.027]} material={materials.brass} frustumCulled>
        <cylinderGeometry args={[0.004, 0.004, 0.002, 6]} />
      </mesh>

      {/* Left side Art Deco pillar */}
      <mesh position={[-0.055, 0.065, 0]} material={materials.darkBrass} frustumCulled>
        <boxGeometry args={[0.01, 0.09, 0.038]} />
      </mesh>

      {/* Right side Art Deco pillar */}
      <mesh position={[0.055, 0.065, 0]} material={materials.darkBrass} frustumCulled>
        <boxGeometry args={[0.01, 0.09, 0.038]} />
      </mesh>

      {/* Decorative brass sunburst lines (Art Deco detail) */}
      {[-0.04, -0.02, 0.02, 0.04].map((xPos, i) => (
        <mesh
          key={`sunburst-${i}`}
          position={[xPos, 0.125, 0.021]}
          rotation={[0, 0, Math.PI / 2]}
          material={materials.brass}
          frustumCulled
        >
          <cylinderGeometry args={[0.001, 0.001, 0.008, 4]} />
        </mesh>
      ))}

      {/* Bottom decorative brass trim */}
      <mesh
        position={[0, 0.028, 0.021]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.brass}
        frustumCulled
      >
        <cylinderGeometry args={[0.003, 0.003, 0.11, 6]} />
      </mesh>

      {/* Rubber feet */}
      {[
        [-0.07, 0.004, -0.02],
        [0.07, 0.004, -0.02],
        [-0.07, 0.004, 0.02],
        [0.07, 0.004, 0.02],
      ].map((pos, i) => (
        <mesh key={`foot-${i}`} position={[pos[0], pos[1], pos[2]]} material={materials.blackHands} frustumCulled>
          <cylinderGeometry args={[0.005, 0.006, 0.003, 6]} />
        </mesh>
      ))}
    </group>
  );
};
