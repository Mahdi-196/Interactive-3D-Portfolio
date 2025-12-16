/**
 * Scattered Papers - Documents and case files scattered around filing cabinets
 * Creates an authentic 1930s detective office atmosphere
 */
export const ScatteredPapers = ({
  position,
  rotation = [0, 0, 0]
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) => {
  const paperColor = "#f4e8d0"; // Aged paper
  const inkColor = "#2a2a2a"; // Dark ink
  const manillaColor = "#d4b896"; // Manila folder
  const stampRed = "#8b2323"; // Red stamp ink

  return (
    <group position={position} rotation={rotation}>
      {/* Stack of papers on top of cabinet */}
      <group position={[0, 2.85, 0.1]}>
        {/* Bottom paper */}
        <mesh rotation={[-0.05, 0.1, 0]}>
          <boxGeometry args={[0.28, 0.001, 0.36]} />
          <meshStandardMaterial color={paperColor} roughness={0.9} />
        </mesh>
        {/* Middle paper */}
        <mesh position={[0.02, 0.002, -0.01]} rotation={[-0.05, -0.15, 0]}>
          <boxGeometry args={[0.28, 0.001, 0.36]} />
          <meshStandardMaterial color="#e8dcc0" roughness={0.9} />
        </mesh>
        {/* Top paper with writing */}
        <mesh position={[-0.01, 0.004, 0.02]} rotation={[-0.05, 0.05, 0]}>
          <boxGeometry args={[0.28, 0.001, 0.36]} />
          <meshStandardMaterial color={paperColor} roughness={0.9} />
        </mesh>
        {/* Text lines on top paper */}
        <mesh position={[-0.01, 0.006, 0.05]} rotation={[-0.05, 0.05, 0]}>
          <boxGeometry args={[0.22, 0.0005, 0.15]} />
          <meshStandardMaterial color={inkColor} roughness={1.0} />
        </mesh>
        {/* Red "CONFIDENTIAL" stamp */}
        <mesh position={[0.05, 0.006, -0.05]} rotation={[-0.05, 0.35, 0]}>
          <boxGeometry args={[0.08, 0.0005, 0.04]} />
          <meshStandardMaterial color={stampRed} roughness={0.8} />
        </mesh>
      </group>

      {/* Manila folder leaning against cabinet */}
      <group position={[0.3, 0.02, 0.25]} rotation={[0, -0.3, Math.PI / 8]}>
        {/* Folder back */}
        <mesh>
          <boxGeometry args={[0.32, 0.42, 0.002]} />
          <meshStandardMaterial color={manillaColor} roughness={0.85} />
        </mesh>
        {/* Folder tab */}
        <mesh position={[0, 0.22, 0.001]}>
          <boxGeometry args={[0.12, 0.04, 0.002]} />
          <meshStandardMaterial color="#c4a886" roughness={0.85} />
        </mesh>
        {/* Papers inside (slightly visible) */}
        <mesh position={[0, -0.02, 0.003]}>
          <boxGeometry args={[0.28, 0.36, 0.001]} />
          <meshStandardMaterial color={paperColor} roughness={0.9} />
        </mesh>
      </group>

      {/* Single paper on floor - crumpled look */}
      <group position={[0.45, 0.001, -0.35]} rotation={[0, 0.8, 0]}>
        <mesh rotation={[-Math.PI / 2 + 0.02, 0, 0.2]}>
          <boxGeometry args={[0.28, 0.36, 0.001]} />
          <meshStandardMaterial color="#e0d4b8" roughness={0.95} />
        </mesh>
        {/* Crease mark */}
        <mesh position={[0.05, 0.002, 0]} rotation={[-Math.PI / 2 + 0.02, 0, 0.2]}>
          <boxGeometry args={[0.001, 0.3, 0.001]} />
          <meshStandardMaterial color="#b8ac90" roughness={1.0} />
        </mesh>
      </group>

      {/* Another paper on floor */}
      <group position={[-0.4, 0.001, -0.25]} rotation={[0, -0.5, 0]}>
        <mesh rotation={[-Math.PI / 2 + 0.01, 0, -0.15]}>
          <boxGeometry args={[0.28, 0.36, 0.001]} />
          <meshStandardMaterial color={paperColor} roughness={0.9} />
        </mesh>
        {/* Footprint on paper */}
        <mesh position={[0.03, 0.002, 0.05]} rotation={[-Math.PI / 2 + 0.01, 0, -0.45]}>
          <boxGeometry args={[0.08, 0.12, 0.0005]} />
          <meshStandardMaterial color="#3a3a3a" transparent opacity={0.15} roughness={1.0} />
        </mesh>
      </group>

      {/* Paper hanging off edge of cabinet */}
      <group position={[0.25, 2.8, 0.35]} rotation={[0.6, 0.1, 0]}>
        <mesh>
          <boxGeometry args={[0.28, 0.36, 0.001]} />
          <meshStandardMaterial color={paperColor} roughness={0.9} />
        </mesh>
        {/* Handwritten notes */}
        <mesh position={[0, 0.08, 0.001]}>
          <boxGeometry args={[0.2, 0.15, 0.0005]} />
          <meshStandardMaterial color={inkColor} roughness={1.0} />
        </mesh>
      </group>

      {/* Small notepad on cabinet */}
      <group position={[-0.18, 2.85, -0.05]} rotation={[0, 0.6, 0]}>
        {/* Notepad backing */}
        <mesh>
          <boxGeometry args={[0.15, 0.001, 0.2]} />
          <meshStandardMaterial color="#8b7355" roughness={0.8} />
        </mesh>
        {/* Top page */}
        <mesh position={[0, 0.002, 0]}>
          <boxGeometry args={[0.14, 0.001, 0.19]} />
          <meshStandardMaterial color="#fffff0" roughness={0.9} />
        </mesh>
        {/* Handwritten scribbles */}
        <mesh position={[0, 0.003, 0.03]}>
          <boxGeometry args={[0.1, 0.0005, 0.08]} />
          <meshStandardMaterial color="#1a1a1a" roughness={1.0} />
        </mesh>
      </group>

      {/* Scattered newspaper clipping on floor */}
      <group position={[0.1, 0.001, 0.5]} rotation={[0, 1.2, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0.3]}>
          <boxGeometry args={[0.2, 0.25, 0.001]} />
          <meshStandardMaterial color="#e8e0d0" roughness={0.95} />
        </mesh>
        {/* Headline text */}
        <mesh position={[0, 0.002, 0.08]} rotation={[-Math.PI / 2, 0, 0.3]}>
          <boxGeometry args={[0.15, 0.03, 0.0005]} />
          <meshStandardMaterial color="#000000" roughness={1.0} />
        </mesh>
        {/* Article text */}
        <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0.3]}>
          <boxGeometry args={[0.18, 0.12, 0.0005]} />
          <meshStandardMaterial color="#2a2a2a" roughness={1.0} />
        </mesh>
      </group>

      {/* Photo on floor - slightly bent */}
      <group position={[-0.2, 0.001, 0.4]} rotation={[0, -0.7, 0]}>
        <mesh rotation={[-Math.PI / 2 + 0.03, 0, 0.1]}>
          <boxGeometry args={[0.12, 0.15, 0.001]} />
          <meshStandardMaterial color="#d0c8b8" roughness={0.7} />
        </mesh>
        {/* Photo "image" area */}
        <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2 + 0.03, 0, 0.1]}>
          <boxGeometry args={[0.1, 0.13, 0.0005]} />
          <meshStandardMaterial color="#4a4a3a" roughness={0.6} />
        </mesh>
      </group>

      {/* Case file folder on floor - slightly open */}
      <group position={[0.35, 0.003, 0.15]} rotation={[0, 0.4, 0]}>
        {/* Bottom folder */}
        <mesh rotation={[-Math.PI / 2 + 0.05, 0, 0]}>
          <boxGeometry args={[0.32, 0.42, 0.002]} />
          <meshStandardMaterial color={manillaColor} roughness={0.85} />
        </mesh>
        {/* Top folder (open) */}
        <mesh position={[0.08, 0.02, 0]} rotation={[-Math.PI / 2 + 0.25, 0, -0.3]}>
          <boxGeometry args={[0.32, 0.42, 0.002]} />
          <meshStandardMaterial color="#c4a886" roughness={0.85} />
        </mesh>
        {/* Papers inside */}
        <mesh position={[0.02, 0.004, 0.02]} rotation={[-Math.PI / 2 + 0.05, 0, 0.05]}>
          <boxGeometry args={[0.28, 0.36, 0.001]} />
          <meshStandardMaterial color={paperColor} roughness={0.9} />
        </mesh>
      </group>

      {/* Paperclip on cabinet top */}
      <mesh position={[0.15, 2.86, 0.2]} rotation={[Math.PI / 2, 0, 0.5]}>
        <torusGeometry args={[0.015, 0.002, 8, 16, Math.PI * 1.5]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Coffee stain ring on paper on cabinet */}
      <mesh position={[0.1, 2.857, -0.1]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.035, 0.005, 16, 32]} />
        <meshStandardMaterial color="#6b5744" transparent opacity={0.4} roughness={1.0} />
      </mesh>
    </group>
  );
};
