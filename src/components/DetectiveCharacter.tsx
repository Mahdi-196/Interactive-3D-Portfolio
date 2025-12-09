
import { useRef, useState, useEffect, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DetectiveCharacterProps {
  position?: [number, number, number];
  onInteraction: (type: string, data?: unknown) => void;
  scale?: number;
  autoRotate?: boolean;
  isPlayerControlled?: boolean;
}

export const DetectiveCharacter = forwardRef<THREE.Group, DetectiveCharacterProps>(
  ({
    position = [0, 0, 0],
    onInteraction,
    scale = 1,
    autoRotate = false,
    isPlayerControlled = false
  }, ref) => {

  const groupRef = useRef<THREE.Group>(null);
  const [isWalking, setIsWalking] = useState(false);
  const [rotationY, setRotationY] = useState(0);
  const moveState = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false
  });

  // Mouse look state for first-person camera
  const mouseLook = useRef({ yaw: 0, pitch: 0 });

  // Player movement controls
  useEffect(() => {
    if (!isPlayerControlled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
          moveState.current.forward = true;
          break;
        case 'KeyS':
          moveState.current.backward = true;
          break;
        case 'KeyA':
          moveState.current.left = true;
          break;
        case 'KeyD':
          moveState.current.right = true;
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
          moveState.current.forward = false;
          break;
        case 'KeyS':
          moveState.current.backward = false;
          break;
        case 'KeyA':
          moveState.current.left = false;
          break;
        case 'KeyD':
          moveState.current.right = false;
          break;
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      // Only handle mouse look when pointer is locked
      if (document.pointerLockElement) {
        const sensitivity = 0.002;
        mouseLook.current.yaw -= event.movementX * sensitivity;
        mouseLook.current.pitch -= event.movementY * sensitivity;

        // Clamp pitch to prevent flipping
        mouseLook.current.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, mouseLook.current.pitch));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPlayerControlled]);

  // Auto rotation, walking animation, or player movement
  useFrame((state) => {
    const currentRef = ref && 'current' in ref ? ref.current : groupRef.current;

    if (currentRef) {
      if (isPlayerControlled) {
        // Player-controlled movement with mouse look
        const speed = 0.1;
        const direction = new THREE.Vector3();

        // Get movement relative to camera yaw
        const yaw = mouseLook.current.yaw;

        if (moveState.current.forward) {
          direction.x -= Math.sin(yaw) * speed;
          direction.z -= Math.cos(yaw) * speed;
        }
        if (moveState.current.backward) {
          direction.x += Math.sin(yaw) * speed;
          direction.z += Math.cos(yaw) * speed;
        }
        if (moveState.current.left) {
          direction.x -= Math.cos(yaw) * speed;
          direction.z += Math.sin(yaw) * speed;
        }
        if (moveState.current.right) {
          direction.x += Math.cos(yaw) * speed;
          direction.z -= Math.sin(yaw) * speed;
        }

        // Apply movement
        if (direction.length() > 0) {
          currentRef.position.add(direction);

          // Rotate character to face camera yaw direction
          currentRef.rotation.y = yaw;

          // Walking animation - bob up and down
          currentRef.position.y = position[1] + Math.sin(state.clock.elapsedTime * 8) * 0.02;
        } else {
          // Reset to base height when not moving
          currentRef.position.y = position[1];
        }

        // Store yaw and pitch for camera to use
        (currentRef as any).userData.yaw = mouseLook.current.yaw;
        (currentRef as any).userData.pitch = mouseLook.current.pitch;
      } else if (autoRotate) {
        currentRef.rotation.y += 0.01;
      } else if (isWalking) {
        // Simple walking animation - bob up and down
        currentRef.position.y = position[1] + Math.sin(state.clock.elapsedTime * 4) * 0.05;
      }
    }
  });

  // Simple patrol behavior when not auto-rotating and not player controlled
  useEffect(() => {
    if (autoRotate || isPlayerControlled) return;
    
    const interval = setInterval(() => {
      setIsWalking(true);
      const newRotation = Math.random() * Math.PI * 2;
      setRotationY(newRotation);
      
      setTimeout(() => {
        setIsWalking(false);
      }, 2000); // Walk for 2 seconds
    }, 8000); // Every 8 seconds

    return () => clearInterval(interval);
  }, [autoRotate]);

  return (
    <group 
      ref={ref || groupRef}
      position={position}
      rotation={[0, rotationY, 0]}
      scale={[scale, scale, scale]}
      onClick={() => onInteraction('detective')}
      onPointerOver={(e) => { document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { document.body.style.cursor = 'auto'; }}
    >
      {/* Detective Body - Long Coat */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.7, 1.4, 0.35]} />
        <meshStandardMaterial color="#2c1810" roughness={0.8} />
      </mesh>
      
      {/* Coat Lapels */}
      <mesh position={[-0.25, 1.4, 0.18]}>
        <boxGeometry args={[0.15, 0.4, 0.02]} />
        <meshStandardMaterial color="#1a0f0a" roughness={0.9} />
      </mesh>
      <mesh position={[0.25, 1.4, 0.18]}>
        <boxGeometry args={[0.15, 0.4, 0.02]} />
        <meshStandardMaterial color="#1a0f0a" roughness={0.9} />
      </mesh>
      
      {/* Detective Head - oval shaped */}
      <mesh position={[0, 1.9, 0]} scale={[0.9, 1.1, 0.95]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial color="#d4a574" roughness={0.6} />
      </mesh>

      {/* Mean Detective Face - Prominent Features */}

      {/* Eyes - larger, darker, more intense */}
      <mesh position={[-0.07, 1.93, 0.21]}>
        <sphereGeometry args={[0.017, 16, 16]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>
      <mesh position={[0.07, 1.93, 0.21]}>
        <sphereGeometry args={[0.017, 16, 16]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>

      {/* Eyebrows - thick, heavily angled down for stern/mean look */}
      <mesh position={[-0.07, 1.97, 0.21]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.055, 0.014, 0.009]} />
        <meshStandardMaterial color="#1a0f0a" />
      </mesh>
      <mesh position={[0.07, 1.97, 0.21]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.055, 0.014, 0.009]} />
        <meshStandardMaterial color="#1a0f0a" />
      </mesh>

      {/* Nose - smaller */}
      <mesh position={[0, 1.88, 0.22]} scale={[0.8, 1, 1.2]}>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshStandardMaterial color="#b07550" />
      </mesh>

      {/* Mouth - stern, slightly downturned */}
      <mesh position={[0, 1.81, 0.21]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.05, 0.009, 0.007]} />
        <meshStandardMaterial color="#6a3015" />
      </mesh>

      {/* Mustache - thick, bushy, prominent */}
      <mesh position={[-0.032, 1.845, 0.215]} rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.045, 0.016, 0.01]} />
        <meshStandardMaterial color="#1a0f0a" />
      </mesh>
      <mesh position={[0.032, 1.845, 0.215]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.045, 0.016, 0.01]} />
        <meshStandardMaterial color="#1a0f0a" />
      </mesh>

      {/* Jawline - strong, defined */}
      <mesh position={[0, 1.74, 0.20]}>
        <boxGeometry args={[0.14, 0.035, 0.012]} />
        <meshStandardMaterial color="#b88660" />
      </mesh>

      {/* Detective Fedora Hat - smaller and sitting on head */}
      <mesh position={[0, 2.1, 0]}>
        <cylinderGeometry args={[0.20, 0.18, 0.18]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Hat Brim */}
      <mesh position={[0, 2.02, 0]}>
        <cylinderGeometry args={[0.30, 0.30, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Hat Band */}
      <mesh position={[0, 2.06, 0]}>
        <cylinderGeometry args={[0.19, 0.19, 0.04]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>
      
      {/* Arms in Coat */}
      <mesh position={[-0.45, 1.2, 0]}>
        <boxGeometry args={[0.18, 0.9, 0.18]} />
        <meshStandardMaterial color="#2c1810" roughness={0.8} />
      </mesh>
      <mesh position={[0.45, 1.2, 0]}>
        <boxGeometry args={[0.18, 0.9, 0.18]} />
        <meshStandardMaterial color="#2c1810" roughness={0.8} />
      </mesh>
      
      {/* Hands */}
      <mesh position={[-0.45, 0.7, 0]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial color="#d4a574" roughness={0.7} />
      </mesh>
      <mesh position={[0.45, 0.7, 0]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial color="#d4a574" roughness={0.7} />
      </mesh>
      
      {/* Legs - Dark Trousers */}
      <mesh position={[-0.18, 0.3, 0]}>
        <boxGeometry args={[0.16, 0.9, 0.16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      <mesh position={[0.18, 0.3, 0]}>
        <boxGeometry args={[0.16, 0.9, 0.16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      
      {/* Detective Shoes - Dress Shoes */}
      <mesh position={[-0.18, -0.1, 0.12]}>
        <boxGeometry args={[0.2, 0.12, 0.35]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0.18, -0.1, 0.12]}>
        <boxGeometry args={[0.2, 0.12, 0.35]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Coat Buttons */}
      <mesh position={[0, 1.5, 0.18]}>
        <sphereGeometry args={[0.03]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.2, 0.18]}>
        <sphereGeometry args={[0.03]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.9, 0.18]}>
        <sphereGeometry args={[0.03]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
      </mesh>
      
      {/* Collar */}
      <mesh position={[0, 1.7, 0.1]}>
        <boxGeometry args={[0.3, 0.1, 0.1]} />
        <meshStandardMaterial color="#f5f5dc" roughness={0.6} />
      </mesh>
      
      {/* Tie */}
      <mesh position={[0, 1.5, 0.16]}>
        <boxGeometry args={[0.08, 0.3, 0.02]} />
        <meshStandardMaterial color="#8B0000" roughness={0.7} />
      </mesh>

      {/* Subtle lighting for the character */}
      <pointLight position={[0, 2.5, 1]} intensity={0.3} color="#ffd700" />
    </group>
  );
});

DetectiveCharacter.displayName = 'DetectiveCharacter';
