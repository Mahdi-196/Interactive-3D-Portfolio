/**
 * Wooden Coffee Table - Large practical 1930s coffee table
 * Features sturdy wooden construction, drawer, lower shelf
 */
export const WoodenCoffeeTable = ({
  position,
  rotation = [0, 0, 0]
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) => {
  const darkWood = "#2a1810"; // Dark mahogany
  const richWood = "#3d2817"; // Rich brown
  const brassColor = "#b8860b"; // Polished brass

  return (
    <group position={position} rotation={rotation}>
      {/* Large rectangular tabletop */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.64, 0.08, 1.54]} />
        <meshStandardMaterial
          color={darkWood}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Top edge trim */}
      <mesh position={[0, 0.43, 0.78]}>
        <boxGeometry args={[2.66, 0.04, 0.04]} />
        <meshStandardMaterial color={richWood} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.43, -0.78]}>
        <boxGeometry args={[2.66, 0.04, 0.04]} />
        <meshStandardMaterial color={richWood} roughness={0.7} />
      </mesh>

      {/* Front drawer */}
      <group position={[0, 0.32, -0.73]}>
        {/* Drawer front */}
        <mesh>
          <boxGeometry args={[2.0, 0.18, 0.04]} />
          <meshStandardMaterial color={darkWood} roughness={0.7} />
        </mesh>

        {/* Drawer panel inset */}
        <mesh position={[0, 0, 0.015]}>
          <boxGeometry args={[1.87, 0.15, 0.01]} />
          <meshStandardMaterial color={richWood} roughness={0.65} />
        </mesh>

        {/* Two brass drawer pulls */}
        <mesh position={[-0.3, 0, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.05, 12]} />
          <meshStandardMaterial
            color={brassColor}
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
        <mesh position={[0.3, 0, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.05, 12]} />
          <meshStandardMaterial
            color={brassColor}
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
      </group>

      {/* Drawer frame/apron */}
      <mesh position={[0, 0.32, 0]}>
        <boxGeometry args={[2.53, 0.22, 1.43]} />
        <meshStandardMaterial color={richWood} roughness={0.65} />
      </mesh>

      {/* Four thick square legs */}
      {[
        [-1.21, 0, -0.66],
        [1.21, 0, -0.66],
        [-1.21, 0, 0.66],
        [1.21, 0, 0.66],
      ].map((pos, i) => (
        <group key={`leg-${i}`} position={pos as [number, number, number]}>
          {/* Main leg */}
          <mesh position={[0, 0.16, 0]} castShadow>
            <boxGeometry args={[0.1, 0.32, 0.1]} />
            <meshStandardMaterial color={darkWood} roughness={0.7} />
          </mesh>

          {/* Leg bottom cap */}
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[0.11, 0.04, 0.11]} />
            <meshStandardMaterial color={richWood} roughness={0.75} />
          </mesh>
        </group>
      ))}

      {/* Lower shelf */}
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.42, 0.04, 1.32]} />
        <meshStandardMaterial color={richWood} roughness={0.65} />
      </mesh>

      {/* Shelf support rails */}
      <mesh position={[0, 0.12, -0.68]}>
        <boxGeometry args={[2.42, 0.03, 0.03]} />
        <meshStandardMaterial color={darkWood} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.12, 0.68]}>
        <boxGeometry args={[2.42, 0.03, 0.03]} />
        <meshStandardMaterial color={darkWood} roughness={0.7} />
      </mesh>
    </group>
  );
};
