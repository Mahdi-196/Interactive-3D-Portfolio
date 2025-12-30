/**
 * Window Rain Effect - GPU-optimized rain animation outside windows
 * Uses shader-based approach for zero performance impact
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WindowRainEffectProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
  intensity?: number; // 0-1, how heavy the rain is
}

export const WindowRainEffect = ({
  position,
  rotation = [0, 0, 0],
  width = 4,
  height = 6,
  intensity = 0.7
}: WindowRainEffectProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Shader-based rain - runs entirely on GPU
  const rainShader = useMemo(() => ({
    uniforms: {
      time: { value: 0 },
      intensity: { value: intensity },
      rainColor: { value: new THREE.Color(0.7, 0.8, 0.85) }, // Translucent blue-gray rain
      opacity: { value: 0.5 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float intensity;
      uniform vec3 rainColor;
      uniform float opacity;
      varying vec2 vUv;

      // Better pseudo-random function
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      // 2D random
      vec2 random2(vec2 st) {
        st = vec2(dot(st, vec2(127.1, 311.7)),
                  dot(st, vec2(269.5, 183.3)));
        return fract(sin(st) * 43758.5453123);
      }

      // Create individual rain drops with random positions
      float rainDrop(vec2 uv, vec2 gridPos, float seed) {
        vec2 randomOffset = random2(gridPos + seed);

        // Random X position within grid cell
        float dropX = gridPos.x + randomOffset.x;

        // Random speed (MUCH faster - rain falls fast!)
        float speed = 3.0 + randomOffset.y * 3.0;

        // Vertical position with time
        float dropY = fract((gridPos.y + randomOffset.y * 0.5) - time * speed);

        // Distance from drop
        vec2 dropPos = vec2(dropX, dropY);
        float dist = length(uv - dropPos);

        // Random drop length (LONGER streaks for rain)
        float dropLength = 0.08 + randomOffset.x * 0.15;

        // Vertical streak shape (thin like rain)
        float verticalDist = abs(uv.x - dropPos.x);
        float verticalStreak = smoothstep(0.004, 0.0, verticalDist) *
                               smoothstep(dropLength, 0.0, uv.y - dropY);

        // Strong tail fade for motion blur effect
        float fade = smoothstep(0.0, dropLength * 0.5, uv.y - dropY) *
                     smoothstep(1.0, 0.7, (uv.y - dropY) / dropLength);

        return verticalStreak * fade;
      }

      // Create rain layer with multiple drops
      float rainLayer(vec2 uv, float density, float seed, float speedMult) {
        float rain = 0.0;

        // Create grid
        vec2 grid = vec2(density * 2.0, density);
        vec2 gridUV = uv * grid;
        vec2 gridID = floor(gridUV);

        // Check neighboring cells for drops
        for(float y = -1.0; y <= 1.0; y++) {
          for(float x = -1.0; x <= 1.0; x++) {
            vec2 offset = vec2(x, y);
            vec2 neighborID = gridID + offset;

            // Random chance for drop to exist (increased spawn rate)
            if(random(neighborID + seed) > 0.25) {
              rain += rainDrop(uv, neighborID / grid, seed * speedMult);
            }
          }
        }

        return rain;
      }

      void main() {
        vec2 uv = vUv;

        // Add diagonal wind effect (rain usually falls at an angle)
        float windStrength = 0.05;
        float wind = sin(time * 0.2) * windStrength;
        uv.x += wind + 0.02; // Constant slight diagonal + varying wind

        // Layer multiple rain densities for depth
        float rain = 0.0;

        // Heavy rain layer (close, fast)
        rain += rainLayer(uv, 12.0, 0.0, 1.0) * 1.0;

        // Medium rain layer (mid-distance, medium speed)
        rain += rainLayer(uv, 10.0, 7.3, 0.85) * 0.7;

        // Light rain layer (far, slower, more sparse)
        rain += rainLayer(uv, 8.0, 13.7, 0.7) * 0.5;

        // Apply intensity
        rain *= intensity;

        // Output with rain color and opacity (bright and visible)
        gl_FragColor = vec4(rainColor, rain * opacity);
      }
    `
  }), [intensity]);

  // Update time uniform for animation
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      frustumCulled
    >
      <planeGeometry args={[width, height]} />
      <shaderMaterial
        {...rainShader}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
