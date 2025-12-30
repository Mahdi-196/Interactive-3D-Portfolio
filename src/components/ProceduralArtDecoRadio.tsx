import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Art Deco Radio - 1930s tabletop radio with wooden case
 * Features brass grill, bakelite knobs, classic styling
 */
export const ProceduralArtDecoRadio = ({
  position,
  rotation = [0, 0, 0],
  scale = 1
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) => {
  const materials = useMemo(() => ({
    darkWood: new THREE.MeshStandardMaterial({
      color: "#2a1810",
      roughness: 0.6,
      metalness: 0.1
    }),
    richWood: new THREE.MeshStandardMaterial({
      color: "#3d2817",
      roughness: 0.65,
      metalness: 0.1
    }),
    brass: new THREE.MeshStandardMaterial({
      color: "#b8860b",
      roughness: 0.25,
      metalness: 0.85
    }),
    bakelite: new THREE.MeshStandardMaterial({
      color: "#0f0f0f",
      roughness: 0.4,
      metalness: 0.2
    }),
    dialFace: new THREE.MeshStandardMaterial({
      color: "#f5f5dc",
      roughness: 0.7,
      metalness: 0.0
    }),
    speakerCloth: new THREE.MeshStandardMaterial({
      color: "#8b7355",
      roughness: 0.95,
      metalness: 0.0
    })
  }), []);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Main wooden case body */}
      <mesh position={[0, 0.055, 0]} material={materials.darkWood} frustumCulled>
        <boxGeometry args={[0.18, 0.11, 0.12]} />
      </mesh>

      {/* Front panel - lighter wood */}
      <mesh position={[0, 0.055, 0.061]} material={materials.richWood} frustumCulled>
        <boxGeometry args={[0.182, 0.112, 0.002]} />
      </mesh>

      {/* Speaker grill area - recessed */}
      <mesh position={[0, 0.055, 0.062]} material={materials.speakerCloth} frustumCulled>
        <boxGeometry args={[0.14, 0.08, 0.001]} />
      </mesh>

      {/* Brass grill bars - horizontal lines across speaker */}
      {[-0.03, -0.015, 0, 0.015, 0.03].map((yOffset, i) => (
        <mesh
          key={`grill-h-${i}`}
          position={[0, 0.055 + yOffset, 0.063]}
          rotation={[0, 0, Math.PI / 2]}
          material={materials.brass}
          frustumCulled
        >
          <cylinderGeometry args={[0.001, 0.001, 0.13, 4]} />
        </mesh>
      ))}

      {/* Brass grill bars - vertical lines */}
      {[-0.055, -0.035, -0.015, 0.005, 0.025, 0.045, 0.065].map((xOffset, i) => (
        <mesh
          key={`grill-v-${i}`}
          position={[xOffset, 0.055, 0.063]}
          material={materials.brass}
          frustumCulled
        >
          <cylinderGeometry args={[0.001, 0.001, 0.075, 4]} />
        </mesh>
      ))}

      {/* Dial window - cream background */}
      <mesh position={[0, 0.092, 0.062]} material={materials.dialFace} frustumCulled>
        <boxGeometry args={[0.1, 0.012, 0.001]} />
      </mesh>

      {/* Dial indicator line - brass */}
      <mesh position={[0, 0.092, 0.063]} material={materials.brass} frustumCulled>
        <boxGeometry args={[0.001, 0.008, 0.001]} />
      </mesh>

      {/* Brass dial frame */}
      <mesh position={[0, 0.092, 0.062]} material={materials.brass} frustumCulled>
        <boxGeometry args={[0.102, 0.002, 0.001]} />
      </mesh>
      <mesh position={[0, 0.086, 0.062]} material={materials.brass} frustumCulled>
        <boxGeometry args={[0.102, 0.002, 0.001]} />
      </mesh>

      {/* Station names on dial (simplified as small marks) */}
      {[-0.04, -0.02, 0, 0.02, 0.04].map((xPos, i) => (
        <mesh
          key={`station-${i}`}
          position={[xPos, 0.092, 0.063]}
          material={materials.bakelite}
          frustumCulled
        >
          <boxGeometry args={[0.002, 0.006, 0.001]} />
        </mesh>
      ))}

      {/* Tuning knob - left side (large bakelite) */}
      <mesh
        position={[-0.065, 0.025, 0.064]}
        rotation={[Math.PI / 2, 0, 0]}
        material={materials.bakelite}
        frustumCulled
      >
        <cylinderGeometry args={[0.018, 0.015, 0.025, 12]} />
      </mesh>

      {/* Tuning knob grip ridges */}
      <mesh
        position={[-0.065, 0.025, 0.077]}
        rotation={[Math.PI / 2, 0, 0]}
        material={materials.bakelite}
        frustumCulled
      >
        <torusGeometry args={[0.016, 0.003, 6, 12]} />
      </mesh>

      {/* Volume knob - right side (smaller bakelite) */}
      <mesh
        position={[0.065, 0.025, 0.064]}
        rotation={[Math.PI / 2, 0, 0]}
        material={materials.bakelite}
        frustumCulled
      >
        <cylinderGeometry args={[0.015, 0.012, 0.022, 12]} />
      </mesh>

      {/* Volume knob grip ridges */}
      <mesh
        position={[0.065, 0.025, 0.075]}
        rotation={[Math.PI / 2, 0, 0]}
        material={materials.bakelite}
        frustumCulled
      >
        <torusGeometry args={[0.013, 0.003, 6, 12]} />
      </mesh>

      {/* Top wooden panel - decorative */}
      <mesh position={[0, 0.111, 0]} material={materials.darkWood} frustumCulled>
        <boxGeometry args={[0.182, 0.002, 0.122]} />
      </mesh>

      {/* Art Deco stepped top detail */}
      <mesh position={[0, 0.118, 0]} material={materials.richWood} frustumCulled>
        <boxGeometry args={[0.16, 0.012, 0.11]} />
      </mesh>

      {/* Crown molding - top edge */}
      <mesh position={[0, 0.125, 0]} material={materials.darkWood} frustumCulled>
        <boxGeometry args={[0.17, 0.002, 0.115]} />
      </mesh>

      {/* Brass brand plate - top center */}
      <mesh position={[0, 0.124, 0.056]} material={materials.brass} frustumCulled>
        <boxGeometry args={[0.06, 0.001, 0.012]} />
      </mesh>

      {/* Base feet - wooden supports */}
      {[
        [-0.08, 0.004, -0.055],
        [0.08, 0.004, -0.055],
        [-0.08, 0.004, 0.055],
        [0.08, 0.004, 0.055],
      ].map((pos, i) => (
        <mesh key={`foot-${i}`} position={[pos[0], pos[1], pos[2]]} material={materials.darkWood} frustumCulled>
          <cylinderGeometry args={[0.008, 0.01, 0.008, 6]} />
        </mesh>
      ))}

      {/* Back panel - ventilation */}
      <mesh position={[0, 0.055, -0.061]} material={materials.richWood} frustumCulled>
        <boxGeometry args={[0.18, 0.11, 0.002]} />
      </mesh>

      {/* Ventilation slots - back panel */}
      {[-0.025, 0, 0.025].map((yOffset, i) => (
        <mesh
          key={`vent-${i}`}
          position={[0, 0.055 + yOffset, -0.062]}
          rotation={[0, 0, Math.PI / 2]}
          material={materials.bakelite}
          frustumCulled
        >
          <boxGeometry args={[0.06, 0.002, 0.001]} />
        </mesh>
      ))}

      {/* Power cord hole - back bottom */}
      <mesh
        position={[0.04, 0.012, -0.062]}
        rotation={[Math.PI / 2, 0, 0]}
        material={materials.bakelite}
        frustumCulled
      >
        <cylinderGeometry args={[0.005, 0.005, 0.003, 6]} />
      </mesh>
    </group>
  );
};
