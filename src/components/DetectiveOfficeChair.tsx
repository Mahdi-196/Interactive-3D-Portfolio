/**
 * Detective Office Chair - 1930s leather executive office chair
 * Features tufted leather back, armrests, and swivel base
 */
export const DetectiveOfficeChair = ({
  position,
  rotation = [0, 0, 0]
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) => {
  const leatherColor = "#2d1810"; // Dark brown leather
  const leatherDark = "#1a0f08"; // Darker leather for creases
  const woodColor = "#3d2817"; // Wood armrests
  const brassColor = "#8b7355"; // Aged brass/bronze

  return (
    <group position={position} rotation={rotation}>
      {/* Seat cushion - slightly curved for comfort */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.65, 0.12, 0.65]} />
        <meshStandardMaterial color={leatherColor} roughness={0.85} metalness={0.05} />
      </mesh>

      {/* Seat cushion tufting (button indents) */}
      {[
        [-0.15, 0.55, -0.15],
        [0.15, 0.55, -0.15],
        [-0.15, 0.55, 0.15],
        [0.15, 0.55, 0.15],
      ].map((pos, i) => (
        <mesh key={`seat-tuft-${i}`} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshStandardMaterial color={leatherDark} roughness={0.9} />
        </mesh>
      ))}

      {/* High backrest - curved and padded */}
      <group position={[0, 1.1, -0.28]}>
        {/* Main back cushion */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.9, 0.15]} />
          <meshStandardMaterial color={leatherColor} roughness={0.85} metalness={0.05} />
        </mesh>

        {/* Backrest tufting - diamond pattern */}
        {[
          [0, 0.3, 0.08],
          [-0.2, 0.15, 0.08],
          [0.2, 0.15, 0.08],
          [0, 0, 0.08],
          [-0.2, -0.15, 0.08],
          [0.2, -0.15, 0.08],
          [0, -0.3, 0.08],
        ].map((pos, i) => (
          <mesh key={`back-tuft-${i}`} position={pos as [number, number, number]}>
            <sphereGeometry args={[0.02, 12, 12]} />
            <meshStandardMaterial color={leatherDark} roughness={0.9} />
          </mesh>
        ))}

        {/* Tufting creases (leather folds between buttons) */}
        {[
          { from: [0, 0.3, 0.08], to: [-0.2, 0.15, 0.08] },
          { from: [0, 0.3, 0.08], to: [0.2, 0.15, 0.08] },
          { from: [-0.2, 0.15, 0.08], to: [0, 0, 0.08] },
          { from: [0.2, 0.15, 0.08], to: [0, 0, 0.08] },
          { from: [0, 0, 0.08], to: [-0.2, -0.15, 0.08] },
          { from: [0, 0, 0.08], to: [0.2, -0.15, 0.08] },
          { from: [-0.2, -0.15, 0.08], to: [0, -0.3, 0.08] },
          { from: [0.2, -0.15, 0.08], to: [0, -0.3, 0.08] },
        ].map((line, i) => {
          const midX = (line.from[0] + line.to[0]) / 2;
          const midY = (line.from[1] + line.to[1]) / 2;
          const midZ = (line.from[2] + line.to[2]) / 2;

          return (
            <mesh key={`crease-${i}`} position={[midX, midY, midZ]}>
              <boxGeometry args={[0.01, 0.15, 0.01]} />
              <meshStandardMaterial color={leatherDark} roughness={0.95} />
            </mesh>
          );
        })}

        {/* Backrest wooden frame trim */}
        <mesh position={[0, 0.46, -0.08]}>
          <boxGeometry args={[0.75, 0.04, 0.04]} />
          <meshStandardMaterial color={woodColor} roughness={0.7} />
        </mesh>
        <mesh position={[0, -0.46, -0.08]}>
          <boxGeometry args={[0.75, 0.04, 0.04]} />
          <meshStandardMaterial color={woodColor} roughness={0.7} />
        </mesh>
      </group>

      {/* Left armrest */}
      <group position={[-0.38, 0.75, 0]}>
        {/* Wooden armrest top */}
        <mesh castShadow>
          <boxGeometry args={[0.1, 0.05, 0.55]} />
          <meshStandardMaterial color={woodColor} roughness={0.65} metalness={0.1} />
        </mesh>

        {/* Armrest support */}
        <mesh position={[0, -0.15, 0.15]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3]} />
          <meshStandardMaterial color={woodColor} roughness={0.7} />
        </mesh>

        {/* Front support */}
        <mesh position={[0, -0.15, -0.15]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3]} />
          <meshStandardMaterial color={woodColor} roughness={0.7} />
        </mesh>

        {/* Brass connector at top */}
        <mesh position={[0, 0.03, 0.15]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color={brassColor} metalness={0.7} roughness={0.35} />
        </mesh>
      </group>

      {/* Right armrest */}
      <group position={[0.38, 0.75, 0]}>
        {/* Wooden armrest top */}
        <mesh castShadow>
          <boxGeometry args={[0.1, 0.05, 0.55]} />
          <meshStandardMaterial color={woodColor} roughness={0.65} metalness={0.1} />
        </mesh>

        {/* Armrest support */}
        <mesh position={[0, -0.15, 0.15]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3]} />
          <meshStandardMaterial color={woodColor} roughness={0.7} />
        </mesh>

        {/* Front support */}
        <mesh position={[0, -0.15, -0.15]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3]} />
          <meshStandardMaterial color={woodColor} roughness={0.7} />
        </mesh>

        {/* Brass connector at top */}
        <mesh position={[0, 0.03, 0.15]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color={brassColor} metalness={0.7} roughness={0.35} />
        </mesh>
      </group>

      {/* Central support column (swivel mechanism) */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.05, 0.06, 0.5]} />
        <meshStandardMaterial color={woodColor} roughness={0.7} />
      </mesh>

      {/* Brass collar at top of column */}
      <mesh position={[0, 0.53, 0]}>
        <cylinderGeometry args={[0.065, 0.065, 0.04]} />
        <meshStandardMaterial color={brassColor} metalness={0.75} roughness={0.3} />
      </mesh>

      {/* Wooden base - five-spoke star design */}
      <group position={[0, 0.05, 0]}>
        {/* Center hub */}
        <mesh>
          <cylinderGeometry args={[0.08, 0.08, 0.06]} />
          <meshStandardMaterial color={woodColor} roughness={0.7} />
        </mesh>

        {/* Five spokes */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i / 5) * Math.PI * 2;
          const x = Math.sin(angle) * 0.2;
          const z = Math.cos(angle) * 0.2;

          return (
            <group key={`spoke-${i}`} rotation={[0, angle, 0]}>
              <mesh position={[0, 0, 0.2]}>
                <boxGeometry args={[0.08, 0.05, 0.4]} />
                <meshStandardMaterial color={woodColor} roughness={0.7} />
              </mesh>

              {/* Brass caster wheel at end of spoke */}
              <mesh position={[0, -0.02, 0.38]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.03]} />
                <meshStandardMaterial color={brassColor} metalness={0.7} roughness={0.4} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Decorative brass tacks around seat edge */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.sin(angle) * 0.33;
        const z = Math.cos(angle) * 0.33;

        return (
          <mesh key={`tack-${i}`} position={[x, 0.5, z]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial color={brassColor} metalness={0.8} roughness={0.3} />
          </mesh>
        );
      })}
    </group>
  );
};
