import { Text } from '@react-three/drei';
import { BackButton } from '../shared/BackButton';
import { PushPin } from '../shared/PushPin';
import { COLORS } from '../constants';
import type { DetailViewProps } from '../types';

/**
 * Combined Skills & Education detail view
 */
export const SkillsEducationDetail = ({ onBack }: DetailViewProps) => {
  return (
    <>
      {/* Back Button */}
      <BackButton onClick={onBack} />

      {/* Header */}
      <mesh position={[0, 2.5, 0.03]}>
        <planeGeometry args={[10, 0.6]} />
        <meshStandardMaterial color={COLORS.darkRed} />
      </mesh>
      <Text position={[0, 2.5, 0.04]} fontSize={0.28} color="#FFFFFF" anchorX="center" anchorY="middle">
        CASE FILE #002: SKILLS & EDUCATION
      </Text>

      {/* Frontend Skills Card */}
      <mesh position={[-4.8, 1.2, 0.03]}>
        <planeGeometry args={[3.5, 2.3]} />
        <meshStandardMaterial color={COLORS.yellow} />
      </mesh>
      <mesh position={[-4.8, 2.2, 0.04]}>
        <planeGeometry args={[3.4, 0.25]} />
        <meshStandardMaterial color={COLORS.darkBrown} />
      </mesh>
      <Text position={[-4.8, 2.2, 0.05]} fontSize={0.13} color={COLORS.gold} anchorX="center" anchorY="middle">
        FRONTEND
      </Text>
      <Text position={[-4.8, 1.85, 0.05]} fontSize={0.09} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        ⭐ React & Next.js
      </Text>
      <Text position={[-4.8, 1.68, 0.05]} fontSize={0.09} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        ⭐ TypeScript
      </Text>
      <Text position={[-4.8, 1.51, 0.05]} fontSize={0.09} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        ⭐ Three.js & R3F
      </Text>
      <Text position={[-4.8, 1.34, 0.05]} fontSize={0.09} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        ⭐ Tailwind CSS
      </Text>
      <Text position={[-4.8, 1.17, 0.05]} fontSize={0.09} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        ⭐ Redux
      </Text>
      <Text position={[-4.8, 1.0, 0.05]} fontSize={0.09} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        ⭐ Responsive
      </Text>

      {/* Backend Skills Card */}
      <mesh position={[-1.2, 1.2, 0.03]}>
        <planeGeometry args={[3.5, 2.3]} />
        <meshStandardMaterial color={COLORS.creamPaper} />
      </mesh>
      <mesh position={[-1.2, 2.2, 0.04]}>
        <planeGeometry args={[3.4, 0.25]} />
        <meshStandardMaterial color={COLORS.darkRed} />
      </mesh>
      <Text position={[-1.2, 2.2, 0.05]} fontSize={0.13} color="#FFFFFF" anchorX="center" anchorY="middle">
        BACKEND
      </Text>
      <Text position={[-1.2, 1.85, 0.05]} fontSize={0.09} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ Node.js
      </Text>
      <Text position={[-1.2, 1.68, 0.05]} fontSize={0.09} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ Python
      </Text>
      <Text position={[-1.2, 1.51, 0.05]} fontSize={0.09} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ PostgreSQL
      </Text>
      <Text position={[-1.2, 1.34, 0.05]} fontSize={0.09} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ MongoDB
      </Text>
      <Text position={[-1.2, 1.17, 0.05]} fontSize={0.09} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ GraphQL
      </Text>
      <Text position={[-1.2, 1.0, 0.05]} fontSize={0.09} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ REST APIs
      </Text>

      {/* DevOps Card */}
      <mesh position={[2.4, 1.2, 0.03]}>
        <planeGeometry args={[3.5, 2.3]} />
        <meshStandardMaterial color={COLORS.creamPaper} />
      </mesh>
      <mesh position={[2.4, 2.2, 0.04]}>
        <planeGeometry args={[3.4, 0.25]} />
        <meshStandardMaterial color={COLORS.darkRed} />
      </mesh>
      <Text position={[2.4, 2.2, 0.05]} fontSize={0.13} color="#FFFFFF" anchorX="center" anchorY="middle">
        DEVOPS
      </Text>
      <Text position={[2.4, 1.85, 0.05]} fontSize={0.09} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ AWS
      </Text>
      <Text position={[2.4, 1.68, 0.05]} fontSize={0.09} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ Docker
      </Text>
      <Text position={[2.4, 1.51, 0.05]} fontSize={0.09} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ CI/CD
      </Text>
      <Text position={[2.4, 1.34, 0.05]} fontSize={0.09} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ Git
      </Text>
      <Text position={[2.4, 1.17, 0.05]} fontSize={0.09} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ Linux
      </Text>
      <Text position={[2.4, 1.0, 0.05]} fontSize={0.09} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ Nginx
      </Text>

      {/* Education Card 1 - Formal */}
      <mesh position={[-3, -0.8, 0.03]}>
        <planeGeometry args={[4.5, 2.3]} />
        <meshStandardMaterial color={COLORS.creamPaper} />
      </mesh>
      <mesh position={[-3, 0.2, 0.04]}>
        <planeGeometry args={[4.4, 0.25]} />
        <meshStandardMaterial color={COLORS.darkRed} />
      </mesh>
      <Text position={[-3, 0.2, 0.05]} fontSize={0.13} color="#FFFFFF" anchorX="center" anchorY="middle">
        FORMAL EDUCATION
      </Text>
      <Text position={[-3, -0.15, 0.05]} fontSize={0.12} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        Computer Science
      </Text>
      <Text position={[-3, -0.35, 0.05]} fontSize={0.09} color={COLORS.brownText} anchorX="center" anchorY="middle">
        Bachelor's Degree
      </Text>
      <Text position={[-3, -0.6, 0.05]} fontSize={0.08} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4}>
        Focus: Software Engineering,
      </Text>
      <Text position={[-3, -0.75, 0.05]} fontSize={0.08} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4}>
        Web Development, Data
      </Text>
      <Text position={[-3, -0.90, 0.05]} fontSize={0.08} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4}>
        Structures & Algorithms
      </Text>
      <Text position={[-3, -1.15, 0.05]} fontSize={0.08} color={COLORS.brownText} anchorX="center" anchorY="middle">
        GPA: 3.8/4.0
      </Text>

      {/* Education Card 2 - Self-Taught */}
      <mesh position={[3, -0.8, 0.03]}>
        <planeGeometry args={[4.5, 2.3]} />
        <meshStandardMaterial color={COLORS.creamPaper} />
      </mesh>
      <mesh position={[3, 0.2, 0.04]}>
        <planeGeometry args={[4.4, 0.25]} />
        <meshStandardMaterial color={COLORS.darkRed} />
      </mesh>
      <Text position={[3, 0.2, 0.05]} fontSize={0.13} color="#FFFFFF" anchorX="center" anchorY="middle">
        SELF-TAUGHT
      </Text>
      <Text position={[3, -0.15, 0.05]} fontSize={0.12} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        Continuous Development
      </Text>
      <Text position={[3, -0.45, 0.05]} fontSize={0.08} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4}>
        • Advanced React & TypeScript
      </Text>
      <Text position={[3, -0.60, 0.05]} fontSize={0.08} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4}>
        • Three.js & WebGL Graphics
      </Text>
      <Text position={[3, -0.75, 0.05]} fontSize={0.08} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4}>
        • Cloud Architecture (AWS)
      </Text>
      <Text position={[3, -0.90, 0.05]} fontSize={0.08} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4}>
        • Microservices & DevOps
      </Text>
      <Text position={[3, -1.05, 0.05]} fontSize={0.08} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4}>
        • UI/UX Design Principles
      </Text>

      {/* Push pins */}
      <PushPin position={[-4.8, 2.45, 0.05]} />
      <PushPin position={[-1.2, 2.45, 0.05]} />
      <PushPin position={[2.4, 2.45, 0.05]} />
      <PushPin position={[-3, 0.45, 0.05]} />
      <PushPin position={[3, 0.45, 0.05]} />
    </>
  );
};
