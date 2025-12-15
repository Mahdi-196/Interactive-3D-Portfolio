/**
 * Detective Desk - 1930s Film Noir executive desk with drawers
 * Features ornate wooden construction with multiple drawers, brass hardware
 */
export const DetectiveDesk = ({
  position,
  rotation = [0, 0, 0]
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) => {
  const deskColor = "#3d2817"; // Rich brown wood
  const darkWood = "#2a1810"; // Darker accent wood
  const brassColor = "#b8860b"; // Brass hardware

  return (
    <group position={position} rotation={rotation}>
      {/* Main desktop surface */}
      <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.08, 1.3]} />
        <meshStandardMaterial color={deskColor} roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Desktop edge trim */}
      <mesh position={[0, 0.81, 0.655]}>
        <boxGeometry args={[2.42, 0.04, 0.04]} />
        <meshStandardMaterial color={darkWood} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.81, -0.655]}>
        <boxGeometry args={[2.42, 0.04, 0.04]} />
        <meshStandardMaterial color={darkWood} roughness={0.7} />
      </mesh>

      {/* Left pedestal (drawer unit) */}
      <group position={[-0.85, 0.4, 0]}>
        {/* Pedestal body */}
        <mesh>
          <boxGeometry args={[0.55, 0.8, 1.1]} />
          <meshStandardMaterial color={deskColor} roughness={0.65} />
        </mesh>

        {/* Three drawers with visible fronts - facing backward (negative Z) */}
        {[0.25, 0, -0.25].map((y, i) => (
          <group key={`left-drawer-${i}`} position={[0, y, -0.56]}>
            {/* Drawer front */}
            <mesh>
              <boxGeometry args={[0.5, 0.22, 0.02]} />
              <meshStandardMaterial color={darkWood} roughness={0.7} />
            </mesh>

            {/* Drawer panel inset */}
            <mesh position={[0, 0, 0.005]}>
              <boxGeometry args={[0.45, 0.18, 0.01]} />
              <meshStandardMaterial color={deskColor} roughness={0.65} />
            </mesh>

            {/* Brass drawer handle */}
            <mesh position={[0, 0, -0.02]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.015, 0.015, 0.12]} />
              <meshStandardMaterial color={brassColor} metalness={0.85} roughness={0.25} />
            </mesh>

            {/* Handle decorative ends */}
            <mesh position={[-0.06, 0, -0.02]}>
              <sphereGeometry args={[0.02, 12, 12]} />
              <meshStandardMaterial color={brassColor} metalness={0.85} roughness={0.25} />
            </mesh>
            <mesh position={[0.06, 0, -0.02]}>
              <sphereGeometry args={[0.02, 12, 12]} />
              <meshStandardMaterial color={brassColor} metalness={0.85} roughness={0.25} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Right pedestal (drawer unit) */}
      <group position={[0.85, 0.4, 0]}>
        {/* Pedestal body */}
        <mesh>
          <boxGeometry args={[0.55, 0.8, 1.1]} />
          <meshStandardMaterial color={deskColor} roughness={0.65} />
        </mesh>

        {/* Three drawers with visible fronts - facing backward (negative Z) */}
        {[0.25, 0, -0.25].map((y, i) => (
          <group key={`right-drawer-${i}`} position={[0, y, -0.56]}>
            {/* Drawer front */}
            <mesh>
              <boxGeometry args={[0.5, 0.22, 0.02]} />
              <meshStandardMaterial color={darkWood} roughness={0.7} />
            </mesh>

            {/* Drawer panel inset */}
            <mesh position={[0, 0, 0.005]}>
              <boxGeometry args={[0.45, 0.18, 0.01]} />
              <meshStandardMaterial color={deskColor} roughness={0.65} />
            </mesh>

            {/* Brass drawer handle */}
            <mesh position={[0, 0, -0.02]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.015, 0.015, 0.12]} />
              <meshStandardMaterial color={brassColor} metalness={0.85} roughness={0.25} />
            </mesh>

            {/* Handle decorative ends */}
            <mesh position={[-0.06, 0, -0.02]}>
              <sphereGeometry args={[0.02, 12, 12]} />
              <meshStandardMaterial color={brassColor} metalness={0.85} roughness={0.25} />
            </mesh>
            <mesh position={[0.06, 0, -0.02]}>
              <sphereGeometry args={[0.02, 12, 12]} />
              <meshStandardMaterial color={brassColor} metalness={0.85} roughness={0.25} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Center drawer (keyboard/pencil drawer) - facing backward */}
      <group position={[0, 0.72, -0.5]}>
        {/* Drawer front */}
        <mesh>
          <boxGeometry args={[0.9, 0.1, 0.02]} />
          <meshStandardMaterial color={darkWood} roughness={0.7} />
        </mesh>

        {/* Drawer panel inset */}
        <mesh position={[0, 0, 0.005]}>
          <boxGeometry args={[0.8, 0.08, 0.01]} />
          <meshStandardMaterial color={deskColor} roughness={0.65} />
        </mesh>

        {/* Small brass pull */}
        <mesh position={[0, -0.03, -0.015]}>
          <boxGeometry args={[0.08, 0.015, 0.015]} />
          <meshStandardMaterial color={brassColor} metalness={0.85} roughness={0.25} />
        </mesh>
      </group>

      {/* Decorative wood paneling on pedestals */}
      {/* Left pedestal side panel */}
      <mesh position={[-0.85, 0.4, 0.56]}>
        <boxGeometry args={[0.5, 0.7, 0.02]} />
        <meshStandardMaterial color={darkWood} roughness={0.7} />
      </mesh>
      <mesh position={[-0.85, 0.4, -0.56]}>
        <boxGeometry args={[0.5, 0.7, 0.02]} />
        <meshStandardMaterial color={darkWood} roughness={0.7} />
      </mesh>

      {/* Right pedestal side panel */}
      <mesh position={[0.85, 0.4, 0.56]}>
        <boxGeometry args={[0.5, 0.7, 0.02]} />
        <meshStandardMaterial color={darkWood} roughness={0.7} />
      </mesh>
      <mesh position={[0.85, 0.4, -0.56]}>
        <boxGeometry args={[0.5, 0.7, 0.02]} />
        <meshStandardMaterial color={darkWood} roughness={0.7} />
      </mesh>

      {/* Decorative vertical fluting on front corners */}
      {[-1.1, 1.1].map((x, i) => (
        <group key={`fluting-${i}`} position={[x, 0.4, 0.56]}>
          {[0, 1, 2].map((j) => (
            <mesh key={j} position={[j * 0.015 - 0.015, 0, 0]}>
              <boxGeometry args={[0.01, 0.75, 0.025]} />
              <meshStandardMaterial color={darkWood} roughness={0.75} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Brass corner ornaments */}
      {[
        [-1.2, 0.89, 0.65],
        [1.2, 0.89, 0.65],
        [-1.2, 0.89, -0.65],
        [1.2, 0.89, -0.65],
      ].map((pos, i) => (
        <mesh key={`corner-${i}`} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshStandardMaterial color={brassColor} metalness={0.85} roughness={0.25} />
        </mesh>
      ))}

      {/* Base trim molding */}
      <mesh position={[-0.85, 0.02, 0]}>
        <boxGeometry args={[0.6, 0.04, 1.15]} />
        <meshStandardMaterial color={darkWood} roughness={0.75} />
      </mesh>
      <mesh position={[0.85, 0.02, 0]}>
        <boxGeometry args={[0.6, 0.04, 1.15]} />
        <meshStandardMaterial color={darkWood} roughness={0.75} />
      </mesh>
    </group>
  );
};
