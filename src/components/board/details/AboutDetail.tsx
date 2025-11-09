import { Text, Line } from '@react-three/drei';
import { BackButton } from '../shared/BackButton';
import { PushPin } from '../shared/PushPin';
import { COLORS } from '../constants';
import type { DetailViewProps } from '../types';

/**
 * About Me detail view - Professional summary and core competencies
 */
export const AboutDetail = ({ onBack }: DetailViewProps) => {
  return (
    <>
      {/* Back Button */}
      <BackButton onClick={onBack} />

      {/* Header Banner */}
      <mesh position={[0, 2.5, 0.03]}>
        <planeGeometry args={[11, 0.7]} />
        <meshStandardMaterial color={COLORS.darkRed} />
      </mesh>
      <Text
        position={[0, 2.5, 0.04]}
        fontSize={0.32}
        color={COLORS.gold}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.03}
      >
        CASE FILE #001: PROFESSIONAL SUMMARY
      </Text>

      {/* Document shadow */}
      <mesh position={[0.08, -0.08, 0.029]}>
        <planeGeometry args={[10.2, 4]} />
        <meshStandardMaterial color="#000000" opacity={0.2} transparent />
      </mesh>

      {/* Main Content Card */}
      <mesh position={[0, 0.3, 0.03]}>
        <planeGeometry args={[10, 3.8]} />
        <meshStandardMaterial color={COLORS.offWhite} roughness={0.95} />
      </mesh>

      {/* Document border */}
      <Line
        points={[
          [-4.95, 2.15, 0.031],
          [4.95, 2.15, 0.031],
          [4.95, -1.55, 0.031],
          [-4.95, -1.55, 0.031],
          [-4.95, 2.15, 0.031]
        ]}
        color="#8B7355"
        lineWidth={2}
      />

      {/* Name header */}
      <Text
        position={[0, 1.85, 0.04]}
        fontSize={0.3}
        color={COLORS.darkBrown}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        MAHDI GHALEB
      </Text>
      <Line points={[[-2.5, 1.68, 0.04], [2.5, 1.68, 0.04]]} color={COLORS.darkRed} lineWidth={3} />

      {/* Title badge */}
      <mesh position={[0, 1.42, 0.04]}>
        <planeGeometry args={[6.5, 0.35]} />
        <meshStandardMaterial color="#FFE4B5" roughness={0.9} />
      </mesh>
      <Text
        position={[0, 1.42, 0.041]}
        fontSize={0.15}
        color={COLORS.darkRed}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.02}
      >
        Cloud & Full-Stack Engineer
      </Text>

      {/* Professional Summary Section */}
      <Text
        position={[0, 1.05, 0.04]}
        fontSize={0.12}
        color={COLORS.darkRed}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        ═══ PROFESSIONAL SUMMARY ═══
      </Text>

      {/* Summary content */}
      <Text position={[-4.5, 0.75, 0.04]} fontSize={0.1} color={COLORS.darkBrown} anchorX="left" anchorY="middle" maxWidth={9}>
        Cloud & Full-Stack Engineer with deep, hands-on experience building, training, and
      </Text>
      <Text position={[-4.5, 0.6, 0.04]} fontSize={0.1} color={COLORS.darkBrown} anchorX="left" anchorY="middle" maxWidth={9}>
        deploying complex systems from the ground up. Highly skilled in the end-to-end MLOps
      </Text>
      <Text position={[-4.5, 0.45, 0.04]} fontSize={0.1} color={COLORS.darkBrown} anchorX="left" anchorY="middle" maxWidth={9}>
        pipeline (PyTorch, GCS), architecting high-performance FastAPI (Python) backends, and
      </Text>
      <Text position={[-4.5, 0.3, 0.04]} fontSize={0.1} color={COLORS.darkBrown} anchorX="left" anchorY="middle" maxWidth={9}>
        building modern Next.js (TypeScript) frontends. Eager to apply a comprehensive skill
      </Text>
      <Text position={[-4.5, 0.15, 0.04]} fontSize={0.1} color={COLORS.darkBrown} anchorX="left" anchorY="middle" maxWidth={9}>
        set to a challenging full-stack or cloud-native role.
      </Text>

      {/* Divider */}
      <Line points={[[-4.5, -0.05, 0.04], [4.5, -0.05, 0.04]]} color={COLORS.tan} lineWidth={1} />

      {/* Core Competencies Section */}
      <Text
        position={[0, -0.3, 0.04]}
        fontSize={0.11}
        color={COLORS.darkRed}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
      >
        ═ CORE COMPETENCIES ═
      </Text>

      {/* Competencies in three columns */}
      <Text position={[-3.2, -0.55, 0.04]} fontSize={0.095} color={COLORS.tertiaryText} anchorX="left" anchorY="middle">
        ▪ MLOps & PyTorch
      </Text>
      <Text position={[-3.2, -0.7, 0.04]} fontSize={0.095} color={COLORS.tertiaryText} anchorX="left" anchorY="middle">
        ▪ Cloud Architecture
      </Text>
      <Text position={[-3.2, -0.85, 0.04]} fontSize={0.095} color={COLORS.tertiaryText} anchorX="left" anchorY="middle">
        ▪ FastAPI & Python
      </Text>

      <Text position={[0, -0.55, 0.04]} fontSize={0.095} color={COLORS.tertiaryText} anchorX="left" anchorY="middle">
        ▪ Next.js & React 19
      </Text>
      <Text position={[0, -0.7, 0.04]} fontSize={0.095} color={COLORS.tertiaryText} anchorX="left" anchorY="middle">
        ▪ TypeScript Expert
      </Text>
      <Text position={[0, -0.85, 0.04]} fontSize={0.095} color={COLORS.tertiaryText} anchorX="left" anchorY="middle">
        ▪ PostgreSQL & Redis
      </Text>

      <Text position={[3.2, -0.55, 0.04]} fontSize={0.095} color={COLORS.tertiaryText} anchorX="left" anchorY="middle">
        ▪ Docker & GCS
      </Text>
      <Text position={[3.2, -0.7, 0.04]} fontSize={0.095} color={COLORS.tertiaryText} anchorX="left" anchorY="middle">
        ▪ Security & Auth
      </Text>
      <Text position={[3.2, -0.85, 0.04]} fontSize={0.095} color={COLORS.tertiaryText} anchorX="left" anchorY="middle">
        ▪ System Design
      </Text>

      {/* Official stamp */}
      <mesh position={[-3.8, -1.25, 0.04]} rotation={[0, 0, -0.15]}>
        <circleGeometry args={[0.35, 32]} />
        <meshStandardMaterial color={COLORS.darkRed} opacity={0.15} transparent />
      </mesh>
      <Text
        position={[-3.8, -1.25, 0.041]}
        fontSize={0.09}
        color={COLORS.darkRed}
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, -0.15]}
      >
        VERIFIED
      </Text>

      {/* Status badge */}
      <mesh position={[3.8, -1.25, 0.04]}>
        <planeGeometry args={[1.4, 0.35]} />
        <meshStandardMaterial color={COLORS.darkGreen} opacity={0.2} transparent />
      </mesh>
      <Text
        position={[3.8, -1.25, 0.041]}
        fontSize={0.095}
        color={COLORS.darkGreen}
        anchorX="center"
        anchorY="middle"
      >
        READY TO HIRE
      </Text>

      {/* Push pins at corners */}
      <PushPin position={[-4.8, 2.1, 0.05]} radius={0.09} />
      <PushPin position={[4.8, 2.1, 0.05]} radius={0.09} />
      <PushPin position={[-4.8, -1.4, 0.05]} radius={0.09} />
      <PushPin position={[4.8, -1.4, 0.05]} radius={0.09} />
    </>
  );
};
