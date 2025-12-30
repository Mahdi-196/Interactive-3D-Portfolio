import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// First-person detective body (arms/hands visible to player)
export const FirstPersonDetectiveBody = () => {
  const { camera } = useThree();
  const bodyGroupRef = useRef<THREE.Group>(null);

  // Keep body attached to camera
  useEffect(() => {
    if (bodyGroupRef.current) {
      camera.add(bodyGroupRef.current);
      return () => {
        camera.remove(bodyGroupRef.current);
      };
    }
  }, [camera]);

  return (
    <group ref={bodyGroupRef}>
      {/* OUTLINE/BORDER FOR FIRST-PERSON ARMS - Cyan glow */}
      <group scale={1.1}>
        {/* Left Arm Outline */}
        <group position={[-0.35, -0.4, -0.5]}>
          <mesh position={[0, -0.15, 0]} rotation={[0.3, 0, 0.2]} renderOrder={-1}>
            <cylinderGeometry args={[0.06, 0.05, 0.35]} />
            <meshBasicMaterial color="#00ffff" side={THREE.BackSide} depthTest={false} />
          </mesh>
          <mesh position={[-0.05, -0.45, 0.1]} rotation={[0.5, 0, 0.3]} renderOrder={-1}>
            <cylinderGeometry args={[0.05, 0.045, 0.3]} />
            <meshBasicMaterial color="#00ffff" side={THREE.BackSide} depthTest={false} />
          </mesh>
          <mesh position={[-0.08, -0.7, 0.25]} rotation={[0.6, 0, 0.3]} renderOrder={-1}>
            <boxGeometry args={[0.08, 0.12, 0.04]} />
            <meshBasicMaterial color="#00ffff" side={THREE.BackSide} depthTest={false} />
          </mesh>
          <mesh position={[0, -0.15, 0]} rotation={[0.3, 0, 0.2]} renderOrder={-1}>
            <cylinderGeometry args={[0.07, 0.06, 0.36]} />
            <meshBasicMaterial color="#00ffff" side={THREE.BackSide} depthTest={false} />
          </mesh>
          <mesh position={[-0.05, -0.45, 0.1]} rotation={[0.5, 0, 0.3]} renderOrder={-1}>
            <cylinderGeometry args={[0.06, 0.055, 0.31]} />
            <meshBasicMaterial color="#00ffff" side={THREE.BackSide} depthTest={false} />
          </mesh>
        </group>

        {/* Right Arm Outline */}
        <group position={[0.35, -0.4, -0.5]}>
          <mesh position={[0, -0.15, 0]} rotation={[0.3, 0, -0.2]} renderOrder={-1}>
            <cylinderGeometry args={[0.06, 0.05, 0.35]} />
            <meshBasicMaterial color="#00ffff" side={THREE.BackSide} depthTest={false} />
          </mesh>
          <mesh position={[0.05, -0.45, 0.1]} rotation={[0.5, 0, -0.3]} renderOrder={-1}>
            <cylinderGeometry args={[0.05, 0.045, 0.3]} />
            <meshBasicMaterial color="#00ffff" side={THREE.BackSide} depthTest={false} />
          </mesh>
          <mesh position={[0.08, -0.7, 0.25]} rotation={[0.6, 0, -0.3]} renderOrder={-1}>
            <boxGeometry args={[0.08, 0.12, 0.04]} />
            <meshBasicMaterial color="#00ffff" side={THREE.BackSide} depthTest={false} />
          </mesh>
          <mesh position={[0, -0.15, 0]} rotation={[0.3, 0, -0.2]} renderOrder={-1}>
            <cylinderGeometry args={[0.07, 0.06, 0.36]} />
            <meshBasicMaterial color="#00ffff" side={THREE.BackSide} depthTest={false} />
          </mesh>
          <mesh position={[0.05, -0.45, 0.1]} rotation={[0.5, 0, -0.3]} renderOrder={-1}>
            <cylinderGeometry args={[0.06, 0.055, 0.31]} />
            <meshBasicMaterial color="#00ffff" side={THREE.BackSide} depthTest={false} />
          </mesh>
        </group>

        {/* Torso Outline */}
        <mesh position={[0, -0.8, -0.3]} renderOrder={-1}>
          <boxGeometry args={[0.5, 0.15, 0.2]} />
          <meshBasicMaterial color="#00ffff" side={THREE.BackSide} depthTest={false} />
        </mesh>
        <mesh position={[0, -0.7, -0.25]} renderOrder={-1}>
          <boxGeometry args={[0.3, 0.25, 0.1]} />
          <meshBasicMaterial color="#00ffff" side={THREE.BackSide} depthTest={false} />
        </mesh>
      </group>

      {/* Left Arm */}
      <group position={[-0.35, -0.4, -0.5]}>
        {/* Upper arm */}
        <mesh position={[0, -0.15, 0]} rotation={[0.3, 0, 0.2]}>
          <cylinderGeometry args={[0.06, 0.05, 0.35]} />
          <meshStandardMaterial color="#d4a574" roughness={0.8} />
        </mesh>
        {/* Forearm */}
        <mesh position={[-0.05, -0.45, 0.1]} rotation={[0.5, 0, 0.3]}>
          <cylinderGeometry args={[0.05, 0.045, 0.3]} />
          <meshStandardMaterial color="#d4a574" roughness={0.8} />
        </mesh>
        {/* Hand */}
        <mesh position={[-0.08, -0.7, 0.25]} rotation={[0.6, 0, 0.3]}>
          <boxGeometry args={[0.08, 0.12, 0.04]} />
          <meshStandardMaterial color="#d4a574" roughness={0.8} />
        </mesh>
        {/* Thumb */}
        <mesh position={[-0.05, -0.72, 0.28]} rotation={[0.4, -0.5, 0.3]}>
          <cylinderGeometry args={[0.015, 0.015, 0.05]} />
          <meshStandardMaterial color="#d4a574" roughness={0.8} />
        </mesh>
        {/* Coat sleeve - dark brown */}
        <mesh position={[0, -0.15, 0]} rotation={[0.3, 0, 0.2]}>
          <cylinderGeometry args={[0.07, 0.06, 0.36]} />
          <meshStandardMaterial color="#3d2817" roughness={0.7} />
        </mesh>
        <mesh position={[-0.05, -0.45, 0.1]} rotation={[0.5, 0, 0.3]}>
          <cylinderGeometry args={[0.06, 0.055, 0.31]} />
          <meshStandardMaterial color="#3d2817" roughness={0.7} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group position={[0.35, -0.4, -0.5]}>
        {/* Upper arm */}
        <mesh position={[0, -0.15, 0]} rotation={[0.3, 0, -0.2]}>
          <cylinderGeometry args={[0.06, 0.05, 0.35]} />
          <meshStandardMaterial color="#d4a574" roughness={0.8} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0.05, -0.45, 0.1]} rotation={[0.5, 0, -0.3]}>
          <cylinderGeometry args={[0.05, 0.045, 0.3]} />
          <meshStandardMaterial color="#d4a574" roughness={0.8} />
        </mesh>
        {/* Hand */}
        <mesh position={[0.08, -0.7, 0.25]} rotation={[0.6, 0, -0.3]}>
          <boxGeometry args={[0.08, 0.12, 0.04]} />
          <meshStandardMaterial color="#d4a574" roughness={0.8} />
        </mesh>
        {/* Thumb */}
        <mesh position={[0.05, -0.72, 0.28]} rotation={[0.4, 0.5, -0.3]}>
          <cylinderGeometry args={[0.015, 0.015, 0.05]} />
          <meshStandardMaterial color="#d4a574" roughness={0.8} />
        </mesh>
        {/* Coat sleeve - dark brown */}
        <mesh position={[0, -0.15, 0]} rotation={[0.3, 0, -0.2]}>
          <cylinderGeometry args={[0.07, 0.06, 0.36]} />
          <meshStandardMaterial color="#3d2817" roughness={0.7} />
        </mesh>
        <mesh position={[0.05, -0.45, 0.1]} rotation={[0.5, 0, -0.3]}>
          <cylinderGeometry args={[0.06, 0.055, 0.31]} />
          <meshStandardMaterial color="#3d2817" roughness={0.7} />
        </mesh>
      </group>

      {/* Torso hint (bottom edge of coat visible) */}
      <mesh position={[0, -0.8, -0.3]}>
        <boxGeometry args={[0.5, 0.15, 0.2]} />
        <meshStandardMaterial color="#3d2817" roughness={0.7} />
      </mesh>

      {/* Vest visible through coat opening */}
      <mesh position={[0, -0.7, -0.25]}>
        <boxGeometry args={[0.3, 0.25, 0.1]} />
        <meshStandardMaterial color="#654321" roughness={0.6} />
      </mesh>
    </group>
  );
};
