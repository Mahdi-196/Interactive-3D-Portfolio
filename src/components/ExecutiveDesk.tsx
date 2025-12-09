import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Smoke Effect Component
const SmokeEffect = ({ position }: { position: [number, number, number] }) => {
  const smokeRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (smokeRef.current) {
      smokeRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={smokeRef} position={position}>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[0, i * 0.2, 0]}>
          <sphereGeometry args={[0.05 + i * 0.02]} />
          <meshStandardMaterial 
            color="#666666" 
            transparent 
            opacity={0.3 - i * 0.05}
          />
        </mesh>
      ))}
    </group>
  );
};

// Executive Desk Component
export const ExecutiveDesk = ({ onInteraction }: { onInteraction: (type: string) => void }) => {
  return (
    <group position={[0, 0, -4.5]} rotation={[0, Math.PI, 0]}>
      {/* Desk Surface */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial color="#3d2817" roughness={0.6} metalness={0.1} />
      </mesh>
      
      {/* Desk Legs */}
      <mesh position={[-1.8, 0.5, -0.8]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#2a1810" />
      </mesh>
      <mesh position={[1.8, 0.5, -0.8]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#2a1810" />
      </mesh>
      <mesh position={[-1.8, 0.5, 0.8]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#2a1810" />
      </mesh>
      <mesh position={[1.8, 0.5, 0.8]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#2a1810" />
      </mesh>

      {/* Typewriter */}
      <group 
        position={[1, 1.15, 0]}
        onClick={() => onInteraction('typewriter')}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        <mesh>
          <boxGeometry args={[0.8, 0.2, 0.6]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
      </group>

      {/* Cigar in Ashtray with continuous smoke */}
      <group position={[0.5, 1.1, 0.3]}>
        {/* Ashtray */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.1, 0.03]} />
          <meshStandardMaterial color="#4a4a4a" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Cigar */}
        <mesh position={[0, 0.02, 0]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.01, 0.01, 0.15]} />
          <meshStandardMaterial color="#8b4513" roughness={0.8} />
        </mesh>
        {/* Continuous Smoke Effect */}
        <SmokeEffect position={[0, 0.05, 0]} />
      </group>

      {/* Loose Papers - Scattered across desk */}
      <group position={[-0.5, 1.06, -0.2]}>
        {[...Array(5)].map((_, i) => (
          <mesh 
            key={`paper-${i}`} 
            position={[
              (Math.random() - 0.5) * 0.6,
              i * 0.001,
              (Math.random() - 0.5) * 0.4
            ]} 
            rotation={[0, Math.random() * Math.PI, 0]}
          >
            <boxGeometry args={[0.12, 0.001, 0.16]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#f5f5dc" : "#fffff0"} 
              roughness={0.9} 
            />
          </mesh>
        ))}
      </group>

      {/* Stapler - Left side of desk */}
      <group position={[-1.2, 1.06, 0.4]}>
        {/* Stapler body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.12, 0.08, 0.08]} />
          <meshStandardMaterial color="#2d1810" roughness={0.7} />
        </mesh>
        {/* Stapler head */}
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[0.08, 0.04, 0.06]} />
          <meshStandardMaterial color="#1a0f08" roughness={0.8} />
        </mesh>
        {/* Stapler arm */}
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[0.06, 0.02, 0.04]} />
          <meshStandardMaterial color="#2d1810" roughness={0.7} />
        </mesh>
      </group>

      {/* Telephone - Right side of desk */}
      <group position={[-1.3, 1.06, -0.3]}>
        {/* Telephone base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.15, 0.06, 0.12]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
        {/* Telephone dial */}
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.02]} />
          <meshStandardMaterial color="#4a4a4a" metalness={0.3} roughness={0.6} />
        </mesh>
        {/* Telephone handle */}
        <mesh position={[0.08, 0.03, 0]}>
          <boxGeometry args={[0.08, 0.04, 0.04]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
        {/* Phone cord */}
        <mesh position={[0.12, 0.03, 0]} rotation={[0, 0, Math.PI/4]}>
          <cylinderGeometry args={[0.01, 0.01, 0.1]} />
          <meshStandardMaterial color="#333333" roughness={0.9} />
        </mesh>
      </group>

      {/* Quill Pen - Near papers */}
      <group position={[-0.3, 1.06, -0.1]}>
        {/* Pen body */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0.2]}>
          <cylinderGeometry args={[0.008, 0.008, 0.12]} />
          <meshStandardMaterial color="#8b4513" roughness={0.8} />
        </mesh>
        {/* Feather tip */}
        <mesh position={[0, 0.06, 0]} rotation={[0, 0, 0.2]}>
          <coneGeometry args={[0.02, 0.08]} />
          <meshStandardMaterial color="#f0e68c" roughness={0.9} />
        </mesh>
        {/* Ink tip */}
        <mesh position={[0, -0.06, 0]} rotation={[0, 0, 0.2]}>
          <coneGeometry args={[0.003, 0.02]} />
          <meshStandardMaterial color="#2f1b14" roughness={0.9} />
        </mesh>
      </group>

      {/* Cigar Box - Front of desk */}
      <group position={[0.8, 1.06, -0.6]}>
        {/* Box base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.2, 0.08, 0.15]} />
          <meshStandardMaterial color="#8b4513" roughness={0.8} />
        </mesh>
        {/* Box lid (slightly open) */}
        <mesh position={[0, 0.04, -0.02]} rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[0.19, 0.02, 0.14]} />
          <meshStandardMaterial color="#654321" roughness={0.8} />
        </mesh>
        {/* Cigars inside */}
        {[...Array(3)].map((_, i) => (
          <mesh 
            key={`cigar-${i}`} 
            position={[
              (i - 1) * 0.04,
              0.02,
              0
            ]} 
            rotation={[0, 0, 0.1]}
          >
            <cylinderGeometry args={[0.008, 0.008, 0.12]} />
            <meshStandardMaterial color="#8b4513" roughness={0.8} />
          </mesh>
        ))}
        {/* Gold trim */}
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[0.2, 0.001, 0.15]} />
          <meshStandardMaterial color="#daa520" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Additional small papers near typewriter */}
      <group position={[1.2, 1.06, 0.3]}>
        {[...Array(3)].map((_, i) => (
          <mesh 
            key={`typewriter-paper-${i}`} 
            position={[
              (Math.random() - 0.5) * 0.2,
              i * 0.001,
              (Math.random() - 0.5) * 0.2
            ]} 
            rotation={[0, Math.random() * Math.PI * 0.5, 0]}
          >
            <boxGeometry args={[0.1, 0.001, 0.14]} />
            <meshStandardMaterial 
              color={i === 0 ? "#f0f0f0" : "#f5f5dc"} 
              roughness={0.9} 
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};