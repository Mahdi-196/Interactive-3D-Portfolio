import { useRef } from 'react';
import { MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface VictorianMirrorProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export const VictorianMirror = ({
  position = [0, 4, 9.5],
  rotation = [0, 0, 0],
  scale = 1
}: VictorianMirrorProps) => {
  const mirrorRef = useRef<THREE.Mesh>(null);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Ornate Victorian Frame - Outer border */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[2.2, 2.8, 0.15]} />
        <meshStandardMaterial color="#3d2817" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Inner decorative frame */}
      <mesh position={[0, 0, 0.13]}>
        <boxGeometry args={[2.0, 2.6, 0.08]} />
        <meshStandardMaterial color="#654321" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Gold accent corners - Top Left */}
      <mesh position={[-0.95, 1.25, 0.17]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Top Right */}
      <mesh position={[0.95, 1.25, 0.17]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Bottom Left */}
      <mesh position={[-0.95, -1.25, 0.17]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Bottom Right */}
      <mesh position={[0.95, -1.25, 0.17]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Decorative top ornament */}
      <mesh position={[0, 1.5, 0.17]}>
        <boxGeometry args={[0.3, 0.15, 0.08]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* The reflective mirror surface */}
      <mesh ref={mirrorRef} position={[0, 0, 0.18]}>
        <planeGeometry args={[1.8, 2.4]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={256}
          mixBlur={1}
          mixStrength={0.8}
          roughness={0.1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#a0a0a0"
          metalness={0.5}
        />
      </mesh>

      {/* Subtle edge highlights on frame */}
      <mesh position={[0, 1.4, 0.13]}>
        <boxGeometry args={[1.8, 0.05, 0.05]} />
        <meshStandardMaterial color="#8b7355" roughness={0.4} />
      </mesh>
      <mesh position={[0, -1.4, 0.13]}>
        <boxGeometry args={[1.8, 0.05, 0.05]} />
        <meshStandardMaterial color="#8b7355" roughness={0.4} />
      </mesh>
      <mesh position={[-0.95, 0, 0.13]}>
        <boxGeometry args={[0.05, 2.4, 0.05]} />
        <meshStandardMaterial color="#8b7355" roughness={0.4} />
      </mesh>
      <mesh position={[0.95, 0, 0.13]}>
        <boxGeometry args={[0.05, 2.4, 0.05]} />
        <meshStandardMaterial color="#8b7355" roughness={0.4} />
      </mesh>

      {/* Small light to illuminate the mirror */}
      <pointLight position={[0, 0, 0.5]} intensity={0.3} color="#ffffff" distance={3} />
    </group>
  );
};
