/**
 * Window Rain Particles - GPU-instanced rain drops for maximum performance
 * Uses InstancedMesh to render thousands of raindrops with minimal overhead
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WindowRainParticlesProps {
  position: [number, number, number];
  count?: number; // Number of raindrops
  width?: number;
  height?: number;
  depth?: number;
  speed?: number;
}

export const WindowRainParticles = ({
  position,
  count = 500, // 500 particles is very lightweight
  width = 4,
  height = 6,
  depth = 2,
  speed = 3
}: WindowRainParticlesProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Pre-calculate random positions and speeds for each raindrop
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * width,
        y: Math.random() * height - height / 2,
        z: (Math.random() - 0.5) * depth,
        speed: speed * (0.8 + Math.random() * 0.4), // Vary speed slightly
        resetY: height / 2
      });
    }
    return temp;
  }, [count, width, height, depth, speed]);

  // Set initial positions
  useMemo(() => {
    if (!meshRef.current) return;

    const dummy = new THREE.Object3D();
    particles.forEach((particle, i) => {
      dummy.position.set(
        particle.x + position[0],
        particle.y + position[1],
        particle.z + position[2]
      );
      dummy.scale.set(0.015, 0.15, 0.015); // Thin vertical streaks
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [particles, position]);

  // Animate raindrops falling
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const dummy = new THREE.Object3D();

    particles.forEach((particle, i) => {
      // Update Y position (falling)
      particle.y -= particle.speed * delta;

      // Reset to top when it goes below
      if (particle.y < -height / 2) {
        particle.y = height / 2;
        particle.x = (Math.random() - 0.5) * width; // New random X
        particle.z = (Math.random() - 0.5) * depth; // New random Z
      }

      // Update matrix
      dummy.position.set(
        particle.x + position[0],
        particle.y + position[1],
        particle.z + position[2]
      );
      dummy.scale.set(0.015, 0.15, 0.015);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Simple raindrop material
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0xaaccff, // Light blue-ish rain
        transparent: true,
        opacity: 0.3,
        depthWrite: false
      }),
    []
  );

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      material={material}
      frustumCulled
    >
      <cylinderGeometry args={[0.01, 0.01, 1, 3]} />
    </instancedMesh>
  );
};
