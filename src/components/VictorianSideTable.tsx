interface VictorianSideTableProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export const VictorianSideTable = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}: VictorianSideTableProps) => {
  const woodColor = '#1a0f0a'; // Very dark mahogany
  const accentColor = '#2d1810'; // Slightly lighter wood

  return (
    <group position={position} rotation={rotation}>
      {/* Table top - round Victorian style */}
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 24]} />
        <meshStandardMaterial
          color={woodColor}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* Table top edge trim */}
      <mesh position={[0, 0.67, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.4, 0.02, 12, 24]} />
        <meshStandardMaterial
          color={accentColor}
          roughness={0.25}
          metalness={0.25}
        />
      </mesh>

      {/* Upper support ring */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.32, 0.32, 0.08, 16]} />
        <meshStandardMaterial
          color={accentColor}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* Central pedestal - decorative turned column */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
        <meshStandardMaterial
          color={woodColor}
          roughness={0.25}
          metalness={0.25}
        />
      </mesh>

      {/* Decorative bulge in middle of pedestal */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color={accentColor}
          roughness={0.25}
          metalness={0.25}
        />
      </mesh>

      {/* Base platform - wider */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.04, 20]} />
        <meshStandardMaterial
          color={woodColor}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* Base feet - three ornate feet in triangular arrangement */}
      {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, i) => {
        const x = Math.cos(angle) * 0.28;
        const z = Math.sin(angle) * 0.28;
        return (
          <group key={`foot-${i}`} position={[x, 0.03, z]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.12, 0.06, 0.08]} />
              <meshStandardMaterial
                color={accentColor}
                roughness={0.25}
                metalness={0.25}
              />
            </mesh>
            {/* Decorative ball on foot */}
            <mesh position={[0, -0.02, 0]} castShadow>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshStandardMaterial
                color={woodColor}
                roughness={0.2}
                metalness={0.3}
              />
            </mesh>
          </group>
        );
      })}

      {/* Optional decorative item on top - small lamp or ornament */}
      <group position={[0, 0.7, 0]}>
        {/* Small decorative base */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.03, 12]} />
          <meshStandardMaterial
            color={accentColor}
            roughness={0.25}
            metalness={0.25}
          />
        </mesh>
      </group>
    </group>
  );
};
