import { Text } from '@react-three/drei';
import { PushPin } from '../shared/PushPin';
import { COLORS } from '../constants';
import type { CaseFileCardProps } from '../types';

/**
 * Reusable Case File Card component
 * Displays a manila folder with title and items
 */
export const CaseFileCard = ({
  position,
  title,
  fileNumber,
  items,
  showContent,
  selectedCaseFile,
  onClick,
  labelColor = COLORS.darkRed
}: CaseFileCardProps) => {
  // Determine tab position based on card position
  const tabYOffset = position[1] > 0 ? 0.65 : 0.65;
  const labelXOffset = position[0] < 0 ? -0.95 : -0.95;

  return (
    <group
      onClick={(e) => {
        if (!showContent || selectedCaseFile) return;
        e.stopPropagation();
        onClick();
      }}
      onPointerEnter={() => {
        if (showContent && !selectedCaseFile) document.body.style.cursor = 'pointer';
      }}
      onPointerLeave={() => (document.body.style.cursor = 'auto')}
      visible={!selectedCaseFile}
    >
      {/* Folder body - manila envelope */}
      <mesh position={position}>
        <boxGeometry args={[2.2, 1.3, 0.03]} />
        <meshStandardMaterial color={COLORS.manila} roughness={0.9} />
      </mesh>

      {/* Folder tab at top */}
      <mesh position={[position[0], position[1] + tabYOffset, position[2] + 0.015]}>
        <boxGeometry args={[2.2, 0.2, 0.025]} />
        <meshStandardMaterial color={COLORS.manilaTab} roughness={0.9} />
      </mesh>

      {/* File identifier label */}
      <mesh position={[position[0] + labelXOffset, position[1] + tabYOffset - 0.05, position[2] + 0.03]}>
        <planeGeometry args={[0.45, 0.25]} />
        <meshStandardMaterial color={labelColor} />
      </mesh>
      <Text
        position={[position[0] + labelXOffset, position[1] + tabYOffset - 0.05, position[2] + 0.04]}
        fontSize={0.14}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        {fileNumber}
      </Text>

      {/* Title */}
      <Text
        position={[position[0], position[1] + 0.2, position[2] + 0.02]}
        fontSize={0.18}
        color={COLORS.darkBrown}
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>

      {/* Items */}
      {items.map((item, index) => (
        <Text
          key={index}
          position={[position[0], position[1] - 0.15 - index * 0.15, position[2] + 0.02]}
          fontSize={0.09}
          color={COLORS.tertiaryText}
          anchorX="center"
          anchorY="middle"
        >
          {item}
        </Text>
      ))}

      {/* Push pin */}
      <PushPin position={[position[0], position[1] + tabYOffset, position[2] + 0.03]} />
    </group>
  );
};
