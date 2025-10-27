import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { CubeCamera } from '@react-three/drei';
import * as THREE from 'three';

// Enhanced Window with Dynamic Cityscape and Animated Rain - Centered on back wall
export const OfficeWindow = () => {
  const rainRef = useRef<THREE.Group>(null);
  const { scene } = useThree();
  
  useFrame(() => {
    if (rainRef.current) {
      // Animate rain falling
      rainRef.current.children.forEach((child, i) => {
        const rainDrop = child as THREE.Mesh;
        rainDrop.position.y -= 0.15;
        if (rainDrop.position.y < -3) {
          rainDrop.position.y = 3;
          rainDrop.position.x = (Math.random() - 0.5) * 14;
        }
      });
    }
  });

  return (
    <group position={[0, 3.5, -9.9]}> {/* Centered on back wall, flush with wall like whiteboard */}
      {/* Large Window Frame - 80% of wall width, shorter height */}
      <mesh position={[-7.8, 0, 0]}>
        <boxGeometry args={[0.3, 6, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      <mesh position={[7.8, 0, 0]}>
        <boxGeometry args={[0.3, 6, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      <mesh position={[0, 3.2, 0]}>
        <boxGeometry args={[15.6, 0.3, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      <mesh position={[0, -3.2, 0]}>
        <boxGeometry args={[15.6, 0.3, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      
      {/* Window Mullions - Classic Office Style */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.15, 6, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      <mesh position={[-3.9, 0, 0]}>
        <boxGeometry args={[0.15, 6, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      <mesh position={[3.9, 0, 0]}>
        <boxGeometry args={[0.15, 6, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[15.6, 0.15, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      <mesh position={[0, -1.6, 0]}>
        <boxGeometry args={[15.6, 0.15, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      
      {/* CubeCamera for real-time reflections - positioned to capture room reflection */}
      <CubeCamera resolution={256} frames={1} position={[0, 0, 0.15]}>
        {(texture) => (
          <>
            {/* Window Glass Panes - Properly sized to fit frame sections */}
            {/* Outer columns (left and right) - slightly narrower */}
            {[-5.8125, 5.8125].map((x, i) => (
              <group key={`outer-pane-group-${i}`}>
                {/* Top row pane */}
                <mesh position={[x, 2.3625, 0.1]}>
                  <planeGeometry args={[3.675, 1.375]} />
                  <meshStandardMaterial
                    envMap={texture}
                    color="#505060"
                    transparent
                    opacity={0.7}
                    roughness={0.05}
                    metalness={0.9}
                    envMapIntensity={3.0}
                    side={THREE.DoubleSide}
                  />
                </mesh>
                {/* Middle row pane - taller */}
                <mesh position={[x, 0, 0.1]}>
                  <planeGeometry args={[3.675, 3.05]} />
                  <meshStandardMaterial
                    envMap={texture}
                    color="#505060"
                    transparent
                    opacity={0.7}
                    roughness={0.05}
                    metalness={0.9}
                    envMapIntensity={3.0}
                    side={THREE.DoubleSide}
                  />
                </mesh>
                {/* Bottom row pane */}
                <mesh position={[x, -2.3625, 0.1]}>
                  <planeGeometry args={[3.675, 1.375]} />
                  <meshStandardMaterial
                    envMap={texture}
                    color="#505060"
                    transparent
                    opacity={0.7}
                    roughness={0.05}
                    metalness={0.9}
                    envMapIntensity={3.0}
                    side={THREE.DoubleSide}
                  />
                </mesh>
              </group>
            ))}
            {/* Inner columns (center-left and center-right) */}
            {[-1.95, 1.95].map((x, i) => (
              <group key={`inner-pane-group-${i}`}>
                {/* Top row pane */}
                <mesh position={[x, 2.3625, 0.1]}>
                  <planeGeometry args={[3.75, 1.375]} />
                  <meshStandardMaterial
                    envMap={texture}
                    color="#505060"
                    transparent
                    opacity={0.7}
                    roughness={0.05}
                    metalness={0.9}
                    envMapIntensity={3.0}
                    side={THREE.DoubleSide}
                  />
                </mesh>
                {/* Middle row pane - taller */}
                <mesh position={[x, 0, 0.1]}>
                  <planeGeometry args={[3.75, 3.05]} />
                  <meshStandardMaterial
                    envMap={texture}
                    color="#505060"
                    transparent
                    opacity={0.7}
                    roughness={0.05}
                    metalness={0.9}
                    envMapIntensity={3.0}
                    side={THREE.DoubleSide}
                  />
                </mesh>
                {/* Bottom row pane */}
                <mesh position={[x, -2.3625, 0.1]}>
                  <planeGeometry args={[3.75, 1.375]} />
                  <meshStandardMaterial
                    envMap={texture}
                    color="#505060"
                    transparent
                    opacity={0.7}
                    roughness={0.05}
                    metalness={0.9}
                    envMapIntensity={3.0}
                    side={THREE.DoubleSide}
                  />
                </mesh>
              </group>
            ))}
          </>
        )}
      </CubeCamera>
      
      {/* Simple Night Sky */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[30, 15]} />
        <meshStandardMaterial 
          color="#0a0a1a"
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Animated Rain Streaks - More prominent */}
      <group ref={rainRef}>
        {[...Array(80)].map((_, i) => (
          <mesh 
            key={i}
            position={[
              (Math.random() - 0.5) * 14,
              Math.random() * 6 - 3,
              0.2
            ]}
            rotation={[0, 0, -0.2]}
          >
            <planeGeometry args={[0.02, 0.4]} />
            <meshStandardMaterial 
              color="#87ceeb" 
              transparent 
              opacity={0.6}
              emissive="#87ceeb"
              emissiveIntensity={0.2}
            />
          </mesh>
        ))}
      </group>
      
      {/* Window Sill */}
      <mesh position={[0, -3.5, -0.1]}>
        <boxGeometry args={[16, 0.3, 0.6]} />
        <meshStandardMaterial color="#4a3728" roughness={0.6} />
      </mesh>
    </group>
  );
};