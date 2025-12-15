/**
 * Victorian Side Table - 1930s ornate side table with curved legs
 * Features drawer, brass hardware, marble-effect top, cabriole legs
 */
export const VictorianSideTable = ({
  position,
  rotation = [0, 0, 0]
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) => {
  const darkWood = "#2a1810"; // Dark mahogany
  const richWood = "#3d2817"; // Rich brown
  const brassColor = "#b8860b"; // Polished brass
  const marbleTop = "#e8dcc0"; // Cream marble effect

  return (
    <group position={position} rotation={rotation}>
      {/* Marble-effect tabletop with beveled edge */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.65, 0.04, 0.65]} />
        <meshStandardMaterial
          color={marbleTop}
          roughness={0.3}
          metalness={0.15}
        />
      </mesh>

      {/* Beveled edge trim */}
      <mesh position={[0, 0.73, 0]}>
        <boxGeometry args={[0.68, 0.02, 0.68]} />
        <meshStandardMaterial color={darkWood} roughness={0.6} />
      </mesh>

      {/* Top decorative brass inlay border */}
      {[
        [0, 0.77, 0.34],
        [0, 0.77, -0.34],
        [0.34, 0.77, 0],
        [-0.34, 0.77, 0],
      ].map((pos, i) => (
        <mesh key={`inlay-${i}`} position={pos as [number, number, number]}>
          <boxGeometry args={i < 2 ? [0.6, 0.002, 0.008] : [0.008, 0.002, 0.6]} />
          <meshStandardMaterial
            color={brassColor}
            metalness={0.85}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Single drawer front */}
      <group position={[0, 0.55, -0.295]}>
        {/* Drawer face */}
        <mesh>
          <boxGeometry args={[0.5, 0.12, 0.02]} />
          <meshStandardMaterial color={darkWood} roughness={0.7} />
        </mesh>

        {/* Drawer panel inset */}
        <mesh position={[0, 0, 0.005]}>
          <boxGeometry args={[0.45, 0.1, 0.01]} />
          <meshStandardMaterial color={richWood} roughness={0.65} />
        </mesh>

        {/* Ornate brass drawer pull */}
        <mesh position={[0, 0, -0.015]}>
          <sphereGeometry args={[0.02, 12, 12]} />
          <meshStandardMaterial
            color={brassColor}
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>

        {/* Decorative ring */}
        <mesh position={[0, -0.025, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.018, 0.004, 8, 16]} />
          <meshStandardMaterial
            color={brassColor}
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
      </group>

      {/* Cabinet body below drawer */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.6, 0.3, 0.58]} />
        <meshStandardMaterial color={richWood} roughness={0.65} />
      </mesh>

      {/* Front panel decorative molding */}
      <mesh position={[0, 0.35, -0.3]}>
        <boxGeometry args={[0.55, 0.25, 0.02]} />
        <meshStandardMaterial color={darkWood} roughness={0.7} />
      </mesh>

      {/* Four curved cabriole legs (Victorian style) */}
      {[
        [-0.25, 0, -0.25],
        [0.25, 0, -0.25],
        [-0.25, 0, 0.25],
        [0.25, 0, 0.25],
      ].map((basePos, i) => (
        <group key={`leg-${i}`} position={basePos as [number, number, number]}>
          {/* Upper leg (slight curve outward) */}
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.035, 0.045, 0.3, 12]} />
            <meshStandardMaterial color={darkWood} roughness={0.7} />
          </mesh>

          {/* Mid leg (curved knee) */}
          <mesh position={[0, 0.08, 0]} scale={[1.2, 1, 1.2]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color={darkWood} roughness={0.7} />
          </mesh>

          {/* Lower leg (tapers down) */}
          <mesh position={[0, 0.03, 0]}>
            <cylinderGeometry args={[0.03, 0.025, 0.06, 12]} />
            <meshStandardMaterial color={darkWood} roughness={0.7} />
          </mesh>

          {/* Brass foot cap */}
          <mesh position={[0, 0.01, 0]}>
            <cylinderGeometry args={[0.03, 0.035, 0.02, 12]} />
            <meshStandardMaterial
              color={brassColor}
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>

          {/* Decorative brass collar at top */}
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.015, 12]} />
            <meshStandardMaterial
              color={brassColor}
              metalness={0.85}
              roughness={0.25}
            />
          </mesh>
        </group>
      ))}

      {/* Decorative carved details on front corners */}
      {[-0.28, 0.28].map((x, i) => (
        <group key={`carving-${i}`} position={[x, 0.35, -0.31]}>
          {/* Vertical fluting */}
          {[0, 1, 2].map((j) => (
            <mesh key={j} position={[j * 0.012 - 0.012, 0, 0]}>
              <boxGeometry args={[0.008, 0.28, 0.015]} />
              <meshStandardMaterial color={darkWood} roughness={0.75} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Bottom shelf (lower tier) */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[0.55, 0.02, 0.55]} />
        <meshStandardMaterial color={richWood} roughness={0.65} />
      </mesh>

      {/* Shelf edge trim */}
      <mesh position={[0, 0.075, 0.28]}>
        <boxGeometry args={[0.55, 0.015, 0.015]} />
        <meshStandardMaterial color={darkWood} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.075, -0.28]}>
        <boxGeometry args={[0.55, 0.015, 0.015]} />
        <meshStandardMaterial color={darkWood} roughness={0.7} />
      </mesh>
    </group>
  );
};
