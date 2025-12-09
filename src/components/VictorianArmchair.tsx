interface VictorianArmchairProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export const VictorianArmchair = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}: VictorianArmchairProps) => {
  // Rich Victorian color palette
  const velvetColor = '#5a1a1a'; // Deep burgundy velvet
  const woodColor = '#1a0f0a'; // Very dark wood
  const cushionColor = '#4a1515'; // Slightly lighter burgundy for depth

  return (
    <group position={position} rotation={rotation}>
      {/* Wooden base frame */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.15, 1.1]} />
        <meshStandardMaterial
          color={woodColor}
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>

      {/* Main armchair body - lower section */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.3, 0.95]} />
        <meshStandardMaterial
          color={velvetColor}
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* Seat platform */}
      <mesh position={[0, 0.62, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 0.18, 0.9]} />
        <meshStandardMaterial
          color={velvetColor}
          roughness={0.88}
          metalness={0.0}
        />
      </mesh>

      {/* Single seat cushion */}
      <mesh position={[0, 0.85, 0.02]} castShadow receiveShadow scale={[1.0, 0.6, 0.88]}>
        <boxGeometry args={[1, 0.4, 1]} />
        <meshStandardMaterial
          color={cushionColor}
          roughness={0.92}
          metalness={0.0}
        />
      </mesh>

      {/* Cushion top rounded effect */}
      <mesh position={[0, 1.0, 0.02]} castShadow receiveShadow scale={[0.95, 0.35, 0.85]}>
        <capsuleGeometry args={[0.2, 0.7, 20, 32]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color={cushionColor}
          roughness={0.92}
          metalness={0.0}
        />
      </mesh>

      {/* Backrest main body */}
      <mesh position={[0, 1.15, -0.4]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 1.0, 0.25]} />
        <meshStandardMaterial
          color={velvetColor}
          roughness={0.88}
          metalness={0.0}
        />
      </mesh>

      {/* Backrest padding layer */}
      <mesh position={[0, 1.15, -0.28]} castShadow receiveShadow>
        <boxGeometry args={[0.95, 0.92, 0.12]} />
        <meshStandardMaterial
          color={cushionColor}
          roughness={0.92}
          metalness={0.0}
        />
      </mesh>

      {/* Backrest top rail */}
      <mesh position={[0, 1.68, -0.35]} castShadow rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.08, 0.95, 12, 24]} />
        <meshStandardMaterial
          color={woodColor}
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>

      {/* Left armrest */}
      <group position={[-0.55, 0.75, 0]}>
        {/* Arm main body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.6, 0.95]} />
          <meshStandardMaterial
            color={velvetColor}
            roughness={0.88}
            metalness={0.0}
          />
        </mesh>
        {/* Arm padding/top */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow scale={[0.28, 1, 0.9]}>
          <capsuleGeometry args={[0.12, 0.6, 12, 24]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial
            color={cushionColor}
            roughness={0.9}
            metalness={0.0}
          />
        </mesh>
        {/* Wooden arm cap */}
        <mesh position={[0, 0.45, 0]} castShadow rotation={[Math.PI / 2, 0, 0]}>
          <capsuleGeometry args={[0.06, 0.7, 10, 20]} />
          <meshStandardMaterial
            color={woodColor}
            roughness={0.3}
            metalness={0.25}
          />
        </mesh>
      </group>

      {/* Right armrest */}
      <group position={[0.55, 0.75, 0]}>
        {/* Arm main body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.6, 0.95]} />
          <meshStandardMaterial
            color={velvetColor}
            roughness={0.88}
            metalness={0.0}
          />
        </mesh>
        {/* Arm padding/top */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow scale={[0.28, 1, 0.9]}>
          <capsuleGeometry args={[0.12, 0.6, 12, 24]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial
            color={cushionColor}
            roughness={0.9}
            metalness={0.0}
          />
        </mesh>
        {/* Wooden arm cap */}
        <mesh position={[0, 0.45, 0]} castShadow rotation={[Math.PI / 2, 0, 0]}>
          <capsuleGeometry args={[0.06, 0.7, 10, 20]} />
          <meshStandardMaterial
            color={woodColor}
            roughness={0.3}
            metalness={0.25}
          />
        </mesh>
      </group>

      {/* Victorian wooden legs - front left */}
      <group position={[-0.5, 0.1, 0.45]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.04, 0.35, 12]} />
          <meshStandardMaterial color={woodColor} roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.08, 0]} castShadow>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshStandardMaterial color={woodColor} roughness={0.3} metalness={0.2} />
        </mesh>
      </group>

      {/* Front right */}
      <group position={[0.5, 0.1, 0.45]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.04, 0.35, 12]} />
          <meshStandardMaterial color={woodColor} roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.08, 0]} castShadow>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshStandardMaterial color={woodColor} roughness={0.3} metalness={0.2} />
        </mesh>
      </group>

      {/* Back left */}
      <group position={[-0.5, 0.1, -0.45]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.04, 0.35, 12]} />
          <meshStandardMaterial color={woodColor} roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.08, 0]} castShadow>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshStandardMaterial color={woodColor} roughness={0.3} metalness={0.2} />
        </mesh>
      </group>

      {/* Back right */}
      <group position={[0.5, 0.1, -0.45]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.04, 0.35, 12]} />
          <meshStandardMaterial color={woodColor} roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.08, 0]} castShadow>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshStandardMaterial color={woodColor} roughness={0.3} metalness={0.2} />
        </mesh>
      </group>

      {/* Button tufting on backrest */}
      {[-0.3, 0.3].map((x, i) => (
        <group key={`button-${i}`}>
          <mesh position={[x, 0.95, -0.23]} castShadow>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshStandardMaterial
              color={woodColor}
              roughness={0.4}
              metalness={0.5}
            />
          </mesh>
          <mesh position={[x, 1.35, -0.23]} castShadow>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshStandardMaterial
              color={woodColor}
              roughness={0.4}
              metalness={0.5}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};
