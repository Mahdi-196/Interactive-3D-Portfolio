import { Text, Line } from '@react-three/drei';
import { PushPin } from '../shared/PushPin';
import { LinkWithProgress } from '../shared/LinkWithProgress';
import { COLORS } from '../constants';
import type { FilmNoirPaper } from '../types';
import { getTextScale } from '@/utils/detectMobile';

/**
 * Film Noir Resume Project - 1930s detective-themed 3D portfolio
 */
interface FilmNoirResumeProjectProps {
  zoomedPaper: FilmNoirPaper;
  onPaperZoom: (paper: FilmNoirPaper) => void;
}

export const FilmNoirResumeProject = ({ zoomedPaper, onPaperZoom }: FilmNoirResumeProjectProps) => {
  const textScale = getTextScale();
  return (
    <>
      {/* Header Background Panel */}
      <mesh position={[0, 1.85, 0.03]}>
        <planeGeometry args={[10.5, 1.8]} />
        <meshStandardMaterial color={COLORS.creamPaper} roughness={0.95} />
      </mesh>

      {/* Decorative border */}
      <Line
        points={[
          [-5.2, 2.7, 0.031],
          [5.2, 2.7, 0.031],
          [5.2, 0.95, 0.031],
          [-5.2, 0.95, 0.031],
          [-5.2, 2.7, 0.031]
        ]}
        color={COLORS.brass}
        lineWidth={3}
      />
      <Line
        points={[
          [-5.1, 2.6, 0.031],
          [5.1, 2.6, 0.031],
          [5.1, 1.05, 0.031],
          [-5.1, 1.05, 0.031],
          [-5.1, 2.6, 0.031]
        ]}
        color={COLORS.primaryText}
        lineWidth={1}
      />

      {/* Project Title */}
      <Text
        position={[0, 2.3, 0.032]}
        fontSize={0.32 * textScale}
        color={COLORS.primaryText}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        Film Noir Resume
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, 2.08, 0.032]}
        fontSize={0.13 * textScale}
        color={COLORS.secondaryText}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.02}
      >
        Immersive 1930s Detective-Themed 3D Portfolio
      </Text>

      {/* Decorative divider */}
      <Line points={[[-4.2, 1.92, 0.032], [4.2, 1.92, 0.032]]} color={COLORS.brass} lineWidth={1} />

      {/* Professional Summary */}
      <Text
        position={[0, 1.72, 0.032]}
        fontSize={0.092 * textScale}
        color={COLORS.secondaryText}
        anchorX="center"
        anchorY="middle"
        maxWidth={9.5}
      >
        An interactive first-person 3D portfolio experience set in a Film Noir detective
      </Text>
      <Text
        position={[0, 1.58, 0.032]}
        fontSize={0.092 * textScale}
        color={COLORS.secondaryText}
        anchorX="center"
        anchorY="middle"
        maxWidth={9.5}
      >
        office, built with React Three Fiber and programmatic geometry.
      </Text>

      {/* Bottom divider */}
      <Line points={[[-4.2, 1.4, 0.032], [4.2, 1.4, 0.032]]} color={COLORS.brass} lineWidth={1} />

      {/* Clickable link with hold animation */}
      <LinkWithProgress position={[0, 1.15, 0.033]} url="https://github.com/Mahdi-196/Resume-Game" />

      {/* Single Paper - Smaller size, moved down */}
      <group
        position={zoomedPaper === 'filmnoir' ? [0, -0.3, 0.06] : [0, -1.0, 0.04]}
        scale={zoomedPaper === 'filmnoir' ? 1.4 : 1}
        onClick={(e) => {
          e.stopPropagation();
          onPaperZoom('filmnoir');
        }}
        onPointerEnter={() => (document.body.style.cursor = 'pointer')}
        onPointerLeave={() => (document.body.style.cursor = 'auto')}
      >
        <mesh position={[0.05, -0.05, -0.001]}>
          <planeGeometry args={[4.2, 3.3]} />
          <meshStandardMaterial color="#000000" opacity={0.15} transparent />
        </mesh>

        <mesh>
          <planeGeometry args={[4.1, 3.3]} />
          <meshStandardMaterial color={COLORS.antiquePaper} roughness={0.95} />
        </mesh>

        <Line
          points={[[-2.0, 1.60, 0.001], [2.0, 1.60, 0.001], [2.0, -1.70, 0.001], [-2.0, -1.70, 0.001], [-2.0, 1.60, 0.001]]}
          color={COLORS.brass}
          lineWidth={2}
        />

        {/* Header */}
        <mesh position={[0, 1.35, 0.001]}>
          <planeGeometry args={[3.9, 0.4]} />
          <meshStandardMaterial color={COLORS.primaryText} roughness={0.7} />
        </mesh>
        <Text position={[0, 1.35, 0.002]} fontSize={0.19 * textScale} color={COLORS.antiquePaper} anchorX="center" anchorY="middle" letterSpacing={0.04}>
          3D PORTFOLIO PLATFORM
        </Text>

        {/* Decorative underline */}
        <Line points={[[-1.4, 1.17, 0.002], [1.4, 1.17, 0.002]]} color={COLORS.brass} lineWidth={2} />

        {/* Tech stack */}
        <Text position={[0, 0.95, 0.002]} fontSize={0.13 * textScale} color={COLORS.primaryText} anchorX="center" anchorY="middle" letterSpacing={0.02}>
          React Three Fiber • Three.js • TypeScript
        </Text>

        {/* Content */}
        <Text position={[0, 0.72, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          • Built immersive first-person 3D environment with React
        </Text>
        <Text position={[0, 0.59, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          Three Fiber and programmatic Three.js geometry
        </Text>
        <Text position={[0, 0.41, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          • Implemented smooth camera transitions and interactive
        </Text>
        <Text position={[0, 0.28, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          detective board with nested navigation hierarchy
        </Text>
        <Text position={[0, 0.10, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          • Designed Film Noir aesthetic with period-accurate
        </Text>
        <Text position={[0, -0.03, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          lighting, materials, and vintage paper textures
        </Text>
        <Text position={[0, -0.21, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          • Created WASD first-person controls with pointer lock
        </Text>
        <Text position={[0, -0.34, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          and collision detection for realistic movement
        </Text>
        <Text position={[0, -0.52, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          • Optimized performance with shared materials and
        </Text>
        <Text position={[0, -0.65, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          efficient rendering for smooth 60fps experience
        </Text>
        <Text position={[0, -0.83, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          • Developed mobile-responsive with virtual joystick and
        </Text>
        <Text position={[0, -0.96, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          touch controls for cross-platform compatibility
        </Text>

        <PushPin position={[-1.95, 1.55, 0.01]} color="#CD853F" radius={0.1} />
        <PushPin position={[1.95, 1.55, 0.01]} color="#CD853F" radius={0.1} />
      </group>

      {/* Close button - only show when zoomed */}
      {zoomedPaper === 'filmnoir' && (
        <group
          position={[0, -2.9, 0.07]}
          onClick={(e) => {
            e.stopPropagation();
            onPaperZoom(null);
          }}
          onPointerEnter={() => (document.body.style.cursor = 'pointer')}
          onPointerLeave={() => (document.body.style.cursor = 'auto')}
        >
          <mesh>
            <planeGeometry args={[1.5, 0.35]} />
            <meshStandardMaterial color={COLORS.darkRed} opacity={0.9} transparent />
          </mesh>
          <Text position={[0, 0, 0.001]} fontSize={0.14 * textScale} color={COLORS.antiquePaper} anchorX="center" anchorY="middle">
            ✕ CLOSE
          </Text>
        </group>
      )}
    </>
  );
};
