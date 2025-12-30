import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Rotary Telephone - Classic 1930s black bakelite model
 * Features rotary dial, handset with coiled cord
 */
export const ProceduralRotaryPhone = ({
  position,
  rotation = [0, 0, 0],
  scale = 1
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) => {
  const materials = useMemo(() => ({
    bakelite: new THREE.MeshStandardMaterial({
      color: "#0f0f0f",
      roughness: 0.4,
      metalness: 0.2
    }),
    chrome: new THREE.MeshStandardMaterial({
      color: "#c0c0c0",
      roughness: 0.1,
      metalness: 0.95
    }),
    fabricCord: new THREE.MeshStandardMaterial({
      color: "#1a1a1a",
      roughness: 0.8,
      metalness: 0.0
    }),
    dialFace: new THREE.MeshStandardMaterial({
      color: "#d4d4d4",
      roughness: 0.6,
      metalness: 0.1
    })
  }), []);

  // Dial number positions (circular pattern)
  const dialNumbers = Array.from({ length: 10 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 10 - Math.PI / 2;
    const radius = 0.045;
    return {
      x: Math.cos(angle) * radius,
      z: Math.sin(angle) * radius
    };
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Base - main phone body */}
      <mesh position={[0, 0.025, 0]} material={materials.bakelite} frustumCulled>
        <cylinderGeometry args={[0.12, 0.13, 0.05, 12]} />
      </mesh>

      {/* Dial housing - raised circular section */}
      <mesh position={[0, 0.055, 0]} material={materials.bakelite} frustumCulled>
        <cylinderGeometry args={[0.07, 0.075, 0.02, 12]} />
      </mesh>

      {/* Dial face - lighter surface */}
      <mesh position={[0, 0.066, 0]} material={materials.dialFace} frustumCulled>
        <cylinderGeometry args={[0.065, 0.065, 0.002, 12]} />
      </mesh>

      {/* Dial finger wheel - rotatable part */}
      <mesh position={[0, 0.068, 0]} material={materials.bakelite} frustumCulled>
        <torusGeometry args={[0.055, 0.015, 6, 12]} />
      </mesh>

      {/* Finger holes on dial (10 holes for digits 0-9) */}
      {dialNumbers.map((pos, i) => (
        <mesh
          key={`hole-${i}`}
          position={[pos.x, 0.07, pos.z]}
          rotation={[Math.PI / 2, 0, 0]}
          material={materials.bakelite}
          frustumCulled
        >
          <cylinderGeometry args={[0.008, 0.008, 0.004, 6]} />
        </mesh>
      ))}

      {/* Central dial post */}
      <mesh position={[0, 0.07, 0]} material={materials.chrome} frustumCulled>
        <cylinderGeometry args={[0.006, 0.006, 0.008, 6]} />
      </mesh>

      {/* Handset cradle - left side */}
      <mesh
        position={[-0.045, 0.052, 0]}
        rotation={[0, 0, -0.2]}
        material={materials.bakelite}
        frustumCulled
      >
        <boxGeometry args={[0.025, 0.008, 0.08]} />
      </mesh>

      {/* Handset cradle - right side */}
      <mesh
        position={[0.045, 0.052, 0]}
        rotation={[0, 0, 0.2]}
        material={materials.bakelite}
        frustumCulled
      >
        <boxGeometry args={[0.025, 0.008, 0.08]} />
      </mesh>

      {/* Handset - receiver body */}
      <mesh
        position={[0, 0.075, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.bakelite}
        frustumCulled
      >
        <capsuleGeometry args={[0.015, 0.12, 6, 8]} />
      </mesh>

      {/* Handset earpiece - bulbous end */}
      <mesh
        position={[-0.07, 0.075, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.bakelite}
        frustumCulled
      >
        <sphereGeometry args={[0.022, 8, 8]} />
      </mesh>

      {/* Handset mouthpiece - bulbous end */}
      <mesh
        position={[0.07, 0.075, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.bakelite}
        frustumCulled
      >
        <sphereGeometry args={[0.022, 8, 8]} />
      </mesh>

      {/* Earpiece grille - chrome detail */}
      <mesh
        position={[-0.07, 0.075, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.chrome}
        frustumCulled
      >
        <cylinderGeometry args={[0.015, 0.015, 0.002, 8]} />
      </mesh>

      {/* Mouthpiece grille - chrome detail */}
      <mesh
        position={[0.07, 0.075, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.chrome}
        frustumCulled
      >
        <cylinderGeometry args={[0.015, 0.015, 0.002, 8]} />
      </mesh>

      {/* Coiled telephone cord - simplified spiral */}
      <group position={[-0.08, 0.045, 0.05]}>
        {Array.from({ length: 8 }, (_, i) => {
          const y = -i * 0.008;
          const angle = i * 0.6;
          const x = Math.cos(angle) * 0.01;
          const z = Math.sin(angle) * 0.01;
          return (
            <mesh
              key={`cord-${i}`}
              position={[x, y, z]}
              rotation={[Math.PI / 2, 0, angle]}
              material={materials.fabricCord}
              frustumCulled
            >
              <torusGeometry args={[0.008, 0.002, 4, 6]} />
            </mesh>
          );
        })}
      </group>

      {/* Cord connection to base */}
      <mesh
        position={[-0.08, 0.03, 0.05]}
        rotation={[0.3, 0, 0]}
        material={materials.fabricCord}
        frustumCulled
      >
        <cylinderGeometry args={[0.003, 0.003, 0.025, 6]} />
      </mesh>

      {/* Base rubber pad */}
      <mesh position={[0, 0.001, 0]} material={materials.bakelite} frustumCulled>
        <cylinderGeometry args={[0.125, 0.125, 0.002, 12]} />
      </mesh>

      {/* Bell housing - small bump on side */}
      <mesh position={[0.09, 0.035, -0.03]} material={materials.bakelite} frustumCulled>
        <sphereGeometry args={[0.015, 8, 8]} />
      </mesh>
    </group>
  );
};
