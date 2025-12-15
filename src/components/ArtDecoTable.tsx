/**
 * Art Deco Coffee Table - 1930s geometric coffee table
 * Features glass-effect top, chrome accents, stepped base, black lacquer finish
 */
export const ArtDecoTable = ({
  position,
  rotation = [0, 0, 0]
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) => {
  const blackLacquer = "#1a1a1a"; // High-gloss black
  const chromeColor = "#c0c0c0"; // Chrome/silver
  const glassEffect = "#e8f4f8"; // Frosted glass tint
  const accentGold = "#d4af37"; // Art Deco gold accent

  return (
    <group position={position} rotation={rotation}>
      {/* Glass-effect tabletop with slight transparency simulation */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.03, 0.7]} />
        <meshStandardMaterial
          color={glassEffect}
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Chrome edge frame around glass top */}
      {[
        // Front and back edges
        [0, 0.45, 0.365, [1.22, 0.025, 0.025]],
        [0, 0.45, -0.365, [1.22, 0.025, 0.025]],
        // Left and right edges
        [-0.615, 0.45, 0, [0.025, 0.025, 0.73]],
        [0.615, 0.45, 0, [0.025, 0.025, 0.73]],
      ].map((data, i) => {
        const [x, y, z, dims] = data as [number, number, number, number[]];
        return (
          <mesh key={`frame-${i}`} position={[x, y, z]}>
            <boxGeometry args={dims as [number, number, number]} />
            <meshStandardMaterial
              color={chromeColor}
              metalness={0.95}
              roughness={0.1}
            />
          </mesh>
        );
      })}

      {/* Stepped geometric base (Art Deco signature style) */}

      {/* Top tier - smallest */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.5, 0.05, 0.35]} />
        <meshStandardMaterial
          color={blackLacquer}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>

      {/* Gold accent strip on top tier */}
      <mesh position={[0, 0.375, 0]}>
        <boxGeometry args={[0.52, 0.008, 0.37]} />
        <meshStandardMaterial
          color={accentGold}
          metalness={0.85}
          roughness={0.2}
          emissive={accentGold}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Middle tier */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.7, 0.05, 0.5]} />
        <meshStandardMaterial
          color={blackLacquer}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>

      {/* Chrome corner accents on middle tier */}
      {[
        [-0.35, 0.25, -0.25],
        [0.35, 0.25, -0.25],
        [-0.35, 0.25, 0.25],
        [0.35, 0.25, 0.25],
      ].map((pos, i) => (
        <mesh key={`accent-${i}`} position={pos as [number, number, number]}>
          <boxGeometry args={[0.03, 0.06, 0.03]} />
          <meshStandardMaterial
            color={chromeColor}
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Bottom tier - largest */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.9, 0.05, 0.65]} />
        <meshStandardMaterial
          color={blackLacquer}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>

      {/* Four chrome cylindrical legs (sleek modern design) */}
      {[
        [-0.4, 0, -0.28],
        [0.4, 0, -0.28],
        [-0.4, 0, 0.28],
        [0.4, 0, 0.28],
      ].map((basePos, i) => (
        <group key={`leg-${i}`} position={basePos as [number, number, number]}>
          {/* Main cylindrical leg */}
          <mesh position={[0, 0.075, 0]}>
            <cylinderGeometry args={[0.025, 0.03, 0.15, 16]} />
            <meshStandardMaterial
              color={chromeColor}
              metalness={0.95}
              roughness={0.1}
            />
          </mesh>

          {/* Decorative ring at top */}
          <mesh position={[0, 0.145, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.01, 16]} />
            <meshStandardMaterial
              color={accentGold}
              metalness={0.9}
              roughness={0.15}
            />
          </mesh>

          {/* Base foot (wider for stability) */}
          <mesh position={[0, 0.005, 0]}>
            <cylinderGeometry args={[0.04, 0.035, 0.01, 16]} />
            <meshStandardMaterial
              color={blackLacquer}
              roughness={0.2}
              metalness={0.5}
            />
          </mesh>
        </group>
      ))}

      {/* Geometric decorative panels on sides (Art Deco fan motif) */}
      {[-0.45, 0.45].map((x, i) => (
        <group key={`panel-${i}`} position={[x, 0.25, 0]}>
          {/* Vertical accent line */}
          <mesh rotation={[0, 0, i === 0 ? Math.PI / 2 : -Math.PI / 2]}>
            <boxGeometry args={[0.4, 0.008, 0.008]} />
            <meshStandardMaterial
              color={accentGold}
              metalness={0.85}
              roughness={0.2}
            />
          </mesh>

          {/* Fan rays (3 lines radiating from center) */}
          {[-0.3, 0, 0.3].map((angle, j) => (
            <mesh
              key={`ray-${j}`}
              rotation={[0, angle, 0]}
              position={[i === 0 ? -0.01 : 0.01, 0, 0]}
            >
              <boxGeometry args={[0.006, 0.15, 0.006]} />
              <meshStandardMaterial
                color={chromeColor}
                metalness={0.9}
                roughness={0.15}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Lower shelf with chrome supports */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.85, 0.02, 0.6]} />
        <meshStandardMaterial
          color={glassEffect}
          roughness={0.15}
          metalness={0.25}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Chrome shelf supports */}
      {[
        [-0.425, 0.05, -0.3],
        [0.425, 0.05, -0.3],
        [-0.425, 0.05, 0.3],
        [0.425, 0.05, 0.3],
      ].map((pos, i) => (
        <mesh key={`support-${i}`} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.015, 0.015, 0.05, 12]} />
          <meshStandardMaterial
            color={chromeColor}
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Decorative geometric inlay on tabletop */}
      <group position={[0, 0.465, 0]}>
        {/* Central diamond pattern */}
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[0.15, 0.002, 0.15]} />
          <meshStandardMaterial
            color={accentGold}
            metalness={0.9}
            roughness={0.15}
            emissive={accentGold}
            emissiveIntensity={0.05}
          />
        </mesh>

        {/* Corner accent triangles */}
        {[
          [-0.4, 0, -0.2],
          [0.4, 0, -0.2],
          [-0.4, 0, 0.2],
          [0.4, 0, 0.2],
        ].map((pos, i) => (
          <mesh key={`triangle-${i}`} position={pos as [number, number, number]} rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[0.04, 0.002, 0.04]} />
            <meshStandardMaterial
              color={accentGold}
              metalness={0.85}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
