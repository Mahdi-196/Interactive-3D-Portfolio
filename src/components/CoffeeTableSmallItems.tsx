import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Collection of small decorative items for the coffee table
 * All items follow 1930s Film Noir aesthetic
 */

// Shared materials for all small items
const useSharedMaterials = () => {
  return useMemo(() => ({
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
    darkLeather: new THREE.MeshStandardMaterial({
      color: "#654321",
      roughness: 0.85,
      metalness: 0.1
    }),
    agedPaper: new THREE.MeshStandardMaterial({
      color: "#f4e8d0",
      roughness: 0.9,
      metalness: 0.0
    }),
    whitePaper: new THREE.MeshStandardMaterial({
      color: "#f8f8f0",
      roughness: 0.9,
      metalness: 0.0
    }),
    feltGray: new THREE.MeshStandardMaterial({
      color: "#2a2a2a",
      roughness: 0.95,
      metalness: 0.0
    }),
    waxSeal: new THREE.MeshStandardMaterial({
      color: "#8b0000",
      roughness: 0.6,
      metalness: 0.1
    }),
    chrome: new THREE.MeshStandardMaterial({
      color: "#c0c0c0",
      roughness: 0.1,
      metalness: 0.95
    }),
    sepiaTone: new THREE.MeshStandardMaterial({
      color: "#d4c5a9",
      roughness: 0.8,
      metalness: 0.0
    }),
    blackInk: new THREE.MeshStandardMaterial({
      color: "#1a1a1a",
      roughness: 0.3,
      metalness: 0.4
    }),
    glass: new THREE.MeshStandardMaterial({
      color: "#e8f4f8",
      roughness: 0.05,
      metalness: 0.1,
      transparent: true,
      opacity: 0.4
    })
  }), []);
};

interface ItemProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

/**
 * Stack of old newspapers with headlines
 */
export const StackOfNewspapers = ({ position, rotation = [0, 0, 0], scale = 1 }: ItemProps) => {
  const materials = useSharedMaterials();

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* 5 stacked newspaper sheets */}
      {[0, 0.002, 0.004, 0.006, 0.008].map((yOffset, i) => (
        <mesh
          key={`paper-${i}`}
          position={[0, yOffset, 0]}
          rotation={[-Math.PI / 2, 0, i * 0.05]}
          material={i === 0 ? materials.agedPaper : materials.whitePaper}
          frustumCulled
        >
          <planeGeometry args={[0.15, 0.2]} />
        </mesh>
      ))}

      {/* Headline text simulation (black rectangle) */}
      <mesh position={[0, 0.009, 0.05]} rotation={[-Math.PI / 2, 0, 0]} material={materials.blackInk} frustumCulled>
        <planeGeometry args={[0.12, 0.02]} />
      </mesh>
    </group>
  );
};

/**
 * Leather case notebook with pencil
 */
export const LeatherNotebook = ({ position, rotation = [0, 0, 0], scale = 1 }: ItemProps) => {
  const materials = useSharedMaterials();

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Leather cover */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} material={materials.darkLeather} frustumCulled>
        <boxGeometry args={[0.12, 0.16, 0.015]} />
      </mesh>

      {/* Paper pages (slightly smaller, visible edges) */}
      <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.agedPaper} frustumCulled>
        <boxGeometry args={[0.115, 0.155, 0.012]} />
      </mesh>

      {/* Brass corner protectors */}
      {[
        [-0.055, 0, -0.075],
        [0.055, 0, -0.075],
        [-0.055, 0, 0.075],
        [0.055, 0, 0.075],
      ].map((pos, i) => (
        <mesh key={`corner-${i}`} position={[pos[0], pos[1], pos[2]]} material={materials.brass} frustumCulled>
          <boxGeometry args={[0.008, 0.002, 0.008]} />
        </mesh>
      ))}

      {/* Pencil resting on notebook */}
      <mesh
        position={[0.04, 0.009, 0]}
        rotation={[0, 0, Math.PI / 6]}
        material={materials.darkMetal}
        frustumCulled
      >
        <cylinderGeometry args={[0.003, 0.003, 0.1, 6]} />
      </mesh>
    </group>
  );
};

/**
 * Evidence bags with numbered tags
 */
export const EvidenceBags = ({ position, rotation = [0, 0, 0], scale = 1 }: ItemProps) => {
  const materials = useSharedMaterials();

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Two evidence bags */}
      {[0, 0.001].map((yOffset, i) => (
        <mesh
          key={`bag-${i}`}
          position={[i * 0.04, yOffset, 0]}
          rotation={[-Math.PI / 2, 0, i * 0.3]}
          material={materials.agedPaper}
          frustumCulled
        >
          <planeGeometry args={[0.08, 0.1]} />
        </mesh>
      ))}

      {/* Evidence tags */}
      {[0, 0.04].map((xOffset, i) => (
        <mesh
          key={`tag-${i}`}
          position={[xOffset, 0.002, 0.04]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={materials.waxSeal}
          frustumCulled
        >
          <planeGeometry args={[0.02, 0.015]} />
        </mesh>
      ))}
    </group>
  );
};

/**
 * Fingerprint dusting kit
 */
export const FingerprintKit = ({ position, rotation = [0, 0, 0], scale = 1 }: ItemProps) => {
  const materials = useSharedMaterials();

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Small metal box */}
      <mesh material={materials.darkMetal} frustumCulled>
        <boxGeometry args={[0.06, 0.015, 0.04]} />
      </mesh>

      {/* Dusting brush */}
      <mesh position={[0.025, 0.005, 0.015]} rotation={[0, 0.5, 0]} material={materials.darkMetal} frustumCulled>
        <cylinderGeometry args={[0.003, 0.003, 0.04, 6]} />
      </mesh>

      {/* Brush bristles */}
      <mesh position={[0.045, 0.005, 0.025]} material={materials.feltGray} frustumCulled>
        <cylinderGeometry args={[0.005, 0.003, 0.01, 6]} />
      </mesh>
    </group>
  );
};

/**
 * Police badge with star
 */
export const PoliceBadge = ({ position, rotation = [0, 0, 0], scale = 1 }: ItemProps) => {
  const materials = useSharedMaterials();

  // Star points
  const starPoints = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
    return {
      x: Math.cos(angle) * 0.015,
      y: Math.sin(angle) * 0.015
    };
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Badge base - shield shape */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} material={materials.brass} frustumCulled>
        <sphereGeometry args={[0.025, 8, 8]} />
      </mesh>

      {/* Star points as cylinders */}
      {starPoints.map((pos, i) => (
        <mesh
          key={`star-${i}`}
          position={[pos.x, 0.002, pos.y]}
          rotation={[-Math.PI / 2, 0, (i * Math.PI * 2) / 5]}
          material={materials.brass}
          frustumCulled
        >
          <cylinderGeometry args={[0.002, 0.004, 0.015, 4]} />
        </mesh>
      ))}
    </group>
  );
};

/**
 * Rolled blueprints with rubber band
 */
export const RolledBlueprints = ({ position, rotation = [0, 0, 0], scale = 1 }: ItemProps) => {
  const materials = useSharedMaterials();

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Paper roll */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={materials.agedPaper} frustumCulled>
        <cylinderGeometry args={[0.015, 0.015, 0.12, 8]} />
      </mesh>

      {/* Rubber band */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={materials.feltGray} frustumCulled>
        <torusGeometry args={[0.016, 0.002, 4, 8]} />
      </mesh>
    </group>
  );
};

/**
 * Wire-rim reading glasses
 */
export const ReadingGlasses = ({ position, rotation = [0, 0, 0], scale = 1 }: ItemProps) => {
  const materials = useSharedMaterials();

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Left lens frame */}
      <mesh position={[-0.025, 0.001, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.chrome} frustumCulled>
        <torusGeometry args={[0.018, 0.001, 4, 12]} />
      </mesh>

      {/* Right lens frame */}
      <mesh position={[0.025, 0.001, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.chrome} frustumCulled>
        <torusGeometry args={[0.018, 0.001, 4, 12]} />
      </mesh>

      {/* Bridge */}
      <mesh position={[0, 0.001, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.chrome} frustumCulled>
        <cylinderGeometry args={[0.001, 0.001, 0.014, 4]} />
      </mesh>

      {/* Left temple */}
      <mesh position={[-0.043, 0.001, 0.03]} rotation={[0, -0.3, 0]} material={materials.chrome} frustumCulled>
        <cylinderGeometry args={[0.001, 0.001, 0.06, 4]} />
      </mesh>

      {/* Right temple */}
      <mesh position={[0.043, 0.001, 0.03]} rotation={[0, 0.3, 0]} material={materials.chrome} frustumCulled>
        <cylinderGeometry args={[0.001, 0.001, 0.06, 4]} />
      </mesh>

      {/* Glass lenses */}
      <mesh position={[-0.025, 0.001, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.glass} frustumCulled>
        <circleGeometry args={[0.017, 12]} />
      </mesh>
      <mesh position={[0.025, 0.001, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.glass} frustumCulled>
        <circleGeometry args={[0.017, 12]} />
      </mesh>
    </group>
  );
};

/**
 * Silver cigarette case
 */
export const CigaretteCase = ({ position, rotation = [0, 0, 0], scale = 1 }: ItemProps) => {
  const materials = useSharedMaterials();

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Case bottom */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} material={materials.chrome} frustumCulled>
        <boxGeometry args={[0.06, 0.09, 0.008]} />
      </mesh>

      {/* Case top (slightly open) */}
      <mesh position={[0, 0.006, -0.035]} rotation={[-Math.PI / 2 - 0.3, 0, 0]} material={materials.chrome} frustumCulled>
        <boxGeometry args={[0.06, 0.09, 0.002]} />
      </mesh>

      {/* Decorative engraving (small line) */}
      <mesh position={[0, 0.005, 0.02]} rotation={[-Math.PI / 2, 0, 0]} material={materials.darkMetal} frustumCulled>
        <boxGeometry args={[0.04, 0.001, 0.001]} />
      </mesh>
    </group>
  );
};

/**
 * Brass compass
 */
export const BrassCompass = ({ position, rotation = [0, 0, 0], scale = 1 }: ItemProps) => {
  const materials = useSharedMaterials();

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Base */}
      <mesh material={materials.brass} frustumCulled>
        <cylinderGeometry args={[0.025, 0.025, 0.01, 12]} />
      </mesh>

      {/* Glass cover */}
      <mesh position={[0, 0.006, 0]} material={materials.glass} frustumCulled>
        <cylinderGeometry args={[0.024, 0.024, 0.002, 12]} />
      </mesh>

      {/* Needle */}
      <mesh position={[0, 0.008, 0]} rotation={[0, 0.5, 0]} material={materials.waxSeal} frustumCulled>
        <boxGeometry args={[0.03, 0.001, 0.002]} />
      </mesh>
    </group>
  );
};

/**
 * Pocket watch with chain
 */
export const PocketWatch = ({ position, rotation = [0, 0, 0], scale = 1 }: ItemProps) => {
  const materials = useSharedMaterials();

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Watch body */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} material={materials.brass} frustumCulled>
        <cylinderGeometry args={[0.022, 0.022, 0.008, 16]} />
      </mesh>

      {/* Watch face */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.agedPaper} frustumCulled>
        <circleGeometry args={[0.018, 16]} />
      </mesh>

      {/* Crown */}
      <mesh position={[0, 0.005, -0.025]} material={materials.brass} frustumCulled>
        <cylinderGeometry args={[0.004, 0.004, 0.006, 6]} />
      </mesh>

      {/* Chain links */}
      {Array.from({ length: 5 }, (_, i) => (
        <mesh
          key={`chain-${i}`}
          position={[0.01 + i * 0.008, 0.005, -0.025 - i * 0.008]}
          rotation={[Math.PI / 2, 0, 0]}
          material={materials.brass}
          frustumCulled
        >
          <torusGeometry args={[0.003, 0.001, 4, 6]} />
        </mesh>
      ))}
    </group>
  );
};

/**
 * Playing cards - poker hand fanned out
 */
export const PlayingCards = ({ position, rotation = [0, 0, 0], scale = 1 }: ItemProps) => {
  const materials = useSharedMaterials();

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* 5 cards fanned */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={`card-${i}`}
          position={[i * 0.008, 0.001 + i * 0.0005, i * 0.003]}
          rotation={[-Math.PI / 2, 0, i * 0.15 - 0.3]}
          material={materials.whitePaper}
          frustumCulled
        >
          <planeGeometry args={[0.035, 0.055]} />
        </mesh>
      ))}

      {/* Card suit/number simulation (red rectangle on middle card) */}
      <mesh
        position={[0.016, 0.004, 0.006]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.waxSeal}
        frustumCulled
      >
        <planeGeometry args={[0.015, 0.02]} />
      </mesh>
    </group>
  );
};

/**
 * Framed photograph (sepia-toned)
 */
export const FramedPhoto = ({ position, rotation = [0, 0, 0], scale = 1 }: ItemProps) => {
  const materials = useSharedMaterials();

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Wooden frame */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} material={materials.darkMetal} frustumCulled>
        <boxGeometry args={[0.08, 0.1, 0.008]} />
      </mesh>

      {/* Photo - sepia tone */}
      <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.sepiaTone} frustumCulled>
        <planeGeometry args={[0.07, 0.09]} />
      </mesh>

      {/* Glass cover */}
      <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.glass} frustumCulled>
        <planeGeometry args={[0.075, 0.095]} />
      </mesh>

      {/* Stand back */}
      <mesh position={[0, -0.035, -0.03]} rotation={[-0.5, 0, 0]} material={materials.darkMetal} frustumCulled>
        <boxGeometry args={[0.06, 0.07, 0.002]} />
      </mesh>
    </group>
  );
};

/**
 * Letters with wax seals
 */
export const LettersWithSeals = ({ position, rotation = [0, 0, 0], scale = 1 }: ItemProps) => {
  const materials = useSharedMaterials();

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Two envelopes */}
      {[0, 0.001].map((yOffset, i) => (
        <mesh
          key={`envelope-${i}`}
          position={[i * 0.01, yOffset, i * 0.01]}
          rotation={[-Math.PI / 2, 0, i * 0.2]}
          material={materials.agedPaper}
          frustumCulled
        >
          <planeGeometry args={[0.12, 0.08]} />
        </mesh>
      ))}

      {/* Wax seals */}
      {[0, 0.01].map((xOffset, i) => (
        <mesh
          key={`seal-${i}`}
          position={[xOffset, 0.003, 0.01 + xOffset]}
          material={materials.waxSeal}
          frustumCulled
        >
          <cylinderGeometry args={[0.012, 0.012, 0.004, 8]} />
        </mesh>
      ))}
    </group>
  );
};

/**
 * Fountain pen and inkwell
 */
export const FountainPenAndInkwell = ({ position, rotation = [0, 0, 0], scale = 1 }: ItemProps) => {
  const materials = useSharedMaterials();

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Inkwell base */}
      <mesh material={materials.glass} frustumCulled>
        <cylinderGeometry args={[0.015, 0.018, 0.02, 8]} />
      </mesh>

      {/* Ink inside */}
      <mesh position={[0, -0.005, 0]} material={materials.blackInk} frustumCulled>
        <cylinderGeometry args={[0.014, 0.016, 0.01, 8]} />
      </mesh>

      {/* Inkwell lid */}
      <mesh position={[0.025, 0.003, 0]} material={materials.brass} frustumCulled>
        <cylinderGeometry args={[0.012, 0.015, 0.004, 8]} />
      </mesh>

      {/* Fountain pen body */}
      <mesh
        position={[-0.025, 0.003, 0.02]}
        rotation={[0, 0, 0.3]}
        material={materials.blackInk}
        frustumCulled
      >
        <cylinderGeometry args={[0.003, 0.003, 0.08, 8]} />
      </mesh>

      {/* Pen nib (gold) */}
      <mesh
        position={[-0.06, 0.008, 0.035]}
        rotation={[0, 0, 0.3]}
        material={materials.brass}
        frustumCulled
      >
        <boxGeometry args={[0.008, 0.001, 0.004]} />
      </mesh>
    </group>
  );
};

/**
 * Leather wallet (slightly open)
 */
export const LeatherWallet = ({ position, rotation = [0, 0, 0], scale = 1 }: ItemProps) => {
  const materials = useSharedMaterials();

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Wallet bottom */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} material={materials.darkLeather} frustumCulled>
        <boxGeometry args={[0.06, 0.04, 0.008]} />
      </mesh>

      {/* Wallet top (slightly open) */}
      <mesh position={[0, 0.004, -0.015]} rotation={[-Math.PI / 2 - 0.2, 0, 0]} material={materials.darkLeather} frustumCulled>
        <boxGeometry args={[0.06, 0.04, 0.002]} />
      </mesh>

      {/* Bills sticking out */}
      <mesh position={[0, 0.006, 0.015]} rotation={[-Math.PI / 2, 0, 0]} material={materials.sepiaTone} frustumCulled>
        <planeGeometry args={[0.055, 0.025]} />
      </mesh>
    </group>
  );
};

/**
 * Fedora hat - iconic noir element
 */
export const FedoraHat = ({ position, rotation = [0, 0, 0], scale = 1 }: ItemProps) => {
  const materials = useSharedMaterials();

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Brim */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} material={materials.feltGray} frustumCulled>
        <cylinderGeometry args={[0.08, 0.08, 0.002, 16]} />
      </mesh>

      {/* Crown - tapered cylinder */}
      <mesh position={[0, 0.03, 0]} material={materials.feltGray} frustumCulled>
        <cylinderGeometry args={[0.045, 0.05, 0.06, 12]} />
      </mesh>

      {/* Center crease */}
      <mesh position={[0, 0.061, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.darkMetal} frustumCulled>
        <boxGeometry args={[0.08, 0.002, 0.01]} />
      </mesh>

      {/* Hat band */}
      <mesh position={[0, 0.015, 0]} material={materials.darkMetal} frustumCulled>
        <torusGeometry args={[0.048, 0.004, 6, 16]} />
      </mesh>
    </group>
  );
};

/**
 * Brass lighter
 */
export const BrassLighter = ({ position, rotation = [0, 0, 0], scale = 1 }: ItemProps) => {
  const materials = useSharedMaterials();

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Lighter body */}
      <mesh material={materials.brass} frustumCulled>
        <boxGeometry args={[0.02, 0.035, 0.01]} />
      </mesh>

      {/* Top lid (slightly open) */}
      <mesh position={[0, 0.02, -0.003]} rotation={[-0.3, 0, 0]} material={materials.brass} frustumCulled>
        <boxGeometry args={[0.021, 0.01, 0.002]} />
      </mesh>

      {/* Flint wheel */}
      <mesh
        position={[0.008, 0.015, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.chrome}
        frustumCulled
      >
        <cylinderGeometry args={[0.004, 0.004, 0.008, 12]} />
      </mesh>

      {/* Wick */}
      <mesh position={[-0.003, 0.018, 0]} material={materials.feltGray} frustumCulled>
        <cylinderGeometry args={[0.001, 0.001, 0.004, 4]} />
      </mesh>
    </group>
  );
};
