import { Text } from '@react-three/drei';
import { BackButton } from '../shared/BackButton';
import { PushPin } from '../shared/PushPin';
import { COLORS, SHARED_MATERIALS } from '../constants';
import { SubjectProfileDetailProps, ProfileSection } from '../types';
import { getTextScale } from '@/utils/detectMobile';

/**
 * Subject Profile Detail - displays 3 sub-cards for About, Skills, Education
 * Similar to ProjectsList but for personal/background information
 */
export const SubjectProfileDetail = ({
  opacity,
  onBack,
  selectedSection,
  onSectionClick
}: SubjectProfileDetailProps) => {
  const textScale = getTextScale(); // 1.5x on mobile, 1x on desktop

  return (
    <group>
      {/* Title Header */}
      <Text
        position={[0, 2.7, 0.05]}
        fontSize={0.35 * textScale}
        color={COLORS.darkBrown}
        anchorX="center"
        anchorY="middle"
      >
        SUBJECT PROFILE
      </Text>

      <Text
        position={[0, 2.3, 0.05]}
        fontSize={0.12 * textScale}
        color={COLORS.secondaryText}
        anchorX="center"
        anchorY="middle"
      >
        Personal Background & Credentials
      </Text>

      {/* Section Cards Grid - Top Row: About Me, Skills | Bottom: Education */}

      {/* Card 1 - About Me (Top Left) */}
      <group
        onClick={(e) => {
          e.stopPropagation();
          onSectionClick('about');
        }}
        onPointerEnter={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <mesh position={[-3, 0.3, 0.03]}>
          <boxGeometry args={[4.0, 2.2, 0.03]} />
          <primitive object={SHARED_MATERIALS.manila} attach="material" />
        </mesh>
        <mesh position={[-3, 1.4, 0.045]}>
          <boxGeometry args={[4.0, 0.2, 0.025]} />
          <primitive object={SHARED_MATERIALS.manilaTab} attach="material" />
        </mesh>
        <mesh position={[-4.775, 1.4, 0.06]}>
          <planeGeometry args={[0.45, 0.25]} />
          <primitive object={SHARED_MATERIALS.darkRed} attach="material" />
        </mesh>
        <Text
          position={[-4.775, 1.4, 0.07]}
          fontSize={0.12 * textScale}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          001
        </Text>
        <Text
          position={[-3, 1.0, 0.05]}
          fontSize={0.22 * textScale}
          color={COLORS.darkBrown}
          anchorX="center"
          anchorY="middle"
        >
          About Me
        </Text>
        <Text
          position={[-3, 0.65, 0.05]}
          fontSize={0.1 * textScale}
          color={COLORS.tertiaryText}
          anchorX="center"
          anchorY="middle"
          maxWidth={3.7}
        >
          Personal introduction
        </Text>
        <Text
          position={[-3, 0.48, 0.05]}
          fontSize={0.1 * textScale}
          color={COLORS.tertiaryText}
          anchorX="center"
          anchorY="middle"
          maxWidth={3.7}
        >
          Professional background
        </Text>
        <Text
          position={[-3, 0.31, 0.05]}
          fontSize={0.1 * textScale}
          color={COLORS.tertiaryText}
          anchorX="center"
          anchorY="middle"
          maxWidth={3.7}
        >
          Career objectives
        </Text>
        <PushPin position={[-3, 1.4, 0.07]} radius={0.09} />
      </group>

      {/* Card 2 - Skills (Top Right) */}
      <group
        onClick={(e) => {
          e.stopPropagation();
          onSectionClick('skills');
        }}
        onPointerEnter={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <mesh position={[3, 0.3, 0.03]}>
          <boxGeometry args={[4.0, 2.2, 0.03]} />
          <primitive object={SHARED_MATERIALS.manila} attach="material" />
        </mesh>
        <mesh position={[3, 1.4, 0.045]}>
          <boxGeometry args={[4.0, 0.2, 0.025]} />
          <primitive object={SHARED_MATERIALS.manilaTab} attach="material" />
        </mesh>
        <mesh position={[1.225, 1.4, 0.06]}>
          <planeGeometry args={[0.45, 0.25]} />
          <primitive object={SHARED_MATERIALS.darkRed} attach="material" />
        </mesh>
        <Text
          position={[1.225, 1.4, 0.07]}
          fontSize={0.12 * textScale}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          002
        </Text>
        <Text
          position={[3, 1.0, 0.05]}
          fontSize={0.22 * textScale}
          color={COLORS.darkBrown}
          anchorX="center"
          anchorY="middle"
        >
          Skills
        </Text>
        <Text
          position={[3, 0.65, 0.05]}
          fontSize={0.1 * textScale}
          color={COLORS.tertiaryText}
          anchorX="center"
          anchorY="middle"
          maxWidth={3.7}
        >
          Technical proficiencies
        </Text>
        <Text
          position={[3, 0.48, 0.05]}
          fontSize={0.1 * textScale}
          color={COLORS.tertiaryText}
          anchorX="center"
          anchorY="middle"
          maxWidth={3.7}
        >
          Development expertise
        </Text>
        <Text
          position={[3, 0.31, 0.05]}
          fontSize={0.1 * textScale}
          color={COLORS.tertiaryText}
          anchorX="center"
          anchorY="middle"
          maxWidth={3.7}
        >
          Tools & technologies
        </Text>
        <PushPin position={[3, 1.4, 0.07]} radius={0.09} />
      </group>

      {/* Card 3 - Education (Bottom Center) */}
      <group
        onClick={(e) => {
          e.stopPropagation();
          onSectionClick('education');
        }}
        onPointerEnter={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <mesh position={[0, -2.0, 0.03]}>
          <boxGeometry args={[4.0, 2.2, 0.03]} />
          <primitive object={SHARED_MATERIALS.manila} attach="material" />
        </mesh>
        <mesh position={[0, -1.1, 0.045]}>
          <boxGeometry args={[4.0, 0.2, 0.025]} />
          <primitive object={SHARED_MATERIALS.manilaTab} attach="material" />
        </mesh>
        <mesh position={[-1.775, -1.1, 0.06]}>
          <planeGeometry args={[0.45, 0.25]} />
          <primitive object={SHARED_MATERIALS.darkRed} attach="material" />
        </mesh>
        <Text
          position={[-1.775, -1.1, 0.07]}
          fontSize={0.12 * textScale}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          003
        </Text>
        <Text
          position={[0, -1.5, 0.05]}
          fontSize={0.22 * textScale}
          color={COLORS.darkBrown}
          anchorX="center"
          anchorY="middle"
        >
          Education
        </Text>
        <Text
          position={[0, -1.85, 0.05]}
          fontSize={0.1 * textScale}
          color={COLORS.tertiaryText}
          anchorX="center"
          anchorY="middle"
          maxWidth={3.7}
        >
          Academic background
        </Text>
        <Text
          position={[0, -2.02, 0.05]}
          fontSize={0.1 * textScale}
          color={COLORS.tertiaryText}
          anchorX="center"
          anchorY="middle"
          maxWidth={3.7}
        >
          Certifications & training
        </Text>
        <Text
          position={[0, -2.19, 0.05]}
          fontSize={0.1 * textScale}
          color={COLORS.tertiaryText}
          anchorX="center"
          anchorY="middle"
          maxWidth={3.7}
        >
          Degrees & qualifications
        </Text>
        <PushPin position={[0, -1.1, 0.07]} radius={0.09} />
      </group>

      {/* Back button */}
      <BackButton onClick={onBack} position={[-5.5, -2.8, 0.04]} />
    </group>
  );
};
