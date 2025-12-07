import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { CaseFileCard } from './CaseFileCard';
import { PushPin } from '../shared/PushPin';
import { BOARD_CONFIG, COLORS, CASE_FILE_POSITIONS } from '../constants';
import type { CaseFile, ProjectDetail } from '../types';

/**
 * Board Preview component - displays the initial board view with 4 case files
 * Shows when no detail view is selected
 */
interface BoardPreviewProps {
  previewGroupRef: React.RefObject<THREE.Group>;
  showContent?: boolean;
  selectedCaseFile?: CaseFile;
  selectedProject: ProjectDetail;
  onCaseFileClick?: (caseFile: CaseFile) => void;
  onBoardClick?: () => void;
}

export const BoardPreview = ({
  previewGroupRef,
  showContent,
  selectedCaseFile,
  selectedProject,
  onCaseFileClick,
  onBoardClick
}: BoardPreviewProps) => {
  const handleClick = (e: any) => {
    e.stopPropagation();
    onBoardClick?.();
  };

  return (
    <group position={BOARD_CONFIG.position} rotation={BOARD_CONFIG.rotation}>
      {/* Main Wooden Board Background */}
      <mesh
        onClick={selectedProject === 'refocused' ? undefined : handleClick}
        onPointerEnter={() => {
          if (selectedProject !== 'refocused') {
            document.body.style.cursor = 'pointer';
          }
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'crosshair';
        }}
      >
        <planeGeometry args={[BOARD_CONFIG.size.width, BOARD_CONFIG.size.height]} />
        <meshStandardMaterial
          color={COLORS.lightWood}
          roughness={0.7}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Wooden Borders - Dark brown wood */}
      {/* Top border */}
      <mesh
        position={[0, 3.25, 0.02]}
        onClick={selectedProject === 'refocused' ? undefined : handleClick}
      >
        <boxGeometry args={[13, 0.25, 0.08]} />
        <meshStandardMaterial color={COLORS.darkWood} roughness={0.8} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* Bottom border */}
      <mesh
        position={[0, -3.25, 0.02]}
        onClick={selectedProject === 'refocused' ? undefined : handleClick}
      >
        <boxGeometry args={[13, 0.25, 0.08]} />
        <meshStandardMaterial color={COLORS.darkWood} roughness={0.8} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* Left border */}
      <mesh
        position={[-6.25, 0, 0.02]}
        onClick={selectedProject === 'refocused' ? undefined : handleClick}
      >
        <boxGeometry args={[0.25, 6.5, 0.08]} />
        <meshStandardMaterial color={COLORS.darkWood} roughness={0.8} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* Right border */}
      <mesh
        position={[6.25, 0, 0.02]}
        onClick={selectedProject === 'refocused' ? undefined : handleClick}
      >
        <boxGeometry args={[0.25, 6.5, 0.08]} />
        <meshStandardMaterial color={COLORS.darkWood} roughness={0.8} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* Preview content group - fades out when detail shown */}
      <group ref={previewGroupRef}>
        {/* Header Bar */}
        <mesh position={[0, 2.8, 0.03]}>
          <planeGeometry args={[11, 0.7]} />
          <meshStandardMaterial color={COLORS.darkBrown} />
        </mesh>
        <Text position={[0, 2.8, 0.04]} fontSize={0.32} color={COLORS.gold} anchorX="center" anchorY="middle">
          CASE FILE: MAHDI GHALEB
        </Text>

        {/* Case File 1 - ABOUT ME (Left - Standard Size) */}
        <group
          onClick={(e) => {
            if (!showContent || selectedCaseFile) return;
            e.stopPropagation();
            onCaseFileClick?.('about');
          }}
          onPointerEnter={() => {
            if (showContent && !selectedCaseFile) document.body.style.cursor = 'pointer';
          }}
          onPointerLeave={() => (document.body.style.cursor = 'auto')}
          visible={!selectedCaseFile}
        >
          <mesh position={[-4.5, 0, 0.03]}>
            <boxGeometry args={[2.8, 1.6, 0.04]} />
            <meshStandardMaterial color={COLORS.manila} roughness={0.9} />
          </mesh>
          <mesh position={[-4.5, 0.8, 0.046]}>
            <boxGeometry args={[2.8, 0.25, 0.03]} />
            <meshStandardMaterial color={COLORS.manilaTab} roughness={0.9} />
          </mesh>
          <mesh position={[-5.65, 0.8, 0.062]}>
            <planeGeometry args={[0.55, 0.28]} />
            <meshStandardMaterial color={COLORS.darkRed} />
          </mesh>
          <Text position={[-5.65, 0.8, 0.072]} fontSize={0.16} color="#FFFFFF" anchorX="center" anchorY="middle">
            #001
          </Text>
          <Text position={[-4.5, 0.3, 0.05]} fontSize={0.22} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
            ABOUT ME
          </Text>
          <Text position={[-4.5, -0.05, 0.05]} fontSize={0.11} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.5}>
            Full-Stack Dev
          </Text>
          <Text position={[-4.5, -0.25, 0.05]} fontSize={0.11} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.5}>
            3D Enthusiast
          </Text>
          <Text position={[-4.5, -0.45, 0.05]} fontSize={0.11} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.5}>
            Problem Solver
          </Text>
          <PushPin position={[-4.5, 0.8, 0.08]} radius={0.11} />
        </group>

        {/* Case File 2 - PROJECTS (Right - Medium-Large) */}
        <group
          onClick={(e) => {
            if (!showContent || selectedCaseFile) return;
            e.stopPropagation();
            onCaseFileClick?.('projects');
          }}
          onPointerEnter={() => {
            if (showContent && !selectedCaseFile) document.body.style.cursor = 'pointer';
          }}
          onPointerLeave={() => (document.body.style.cursor = 'auto')}
          visible={!selectedCaseFile}
        >
          <mesh position={[4, 0, 0.03]}>
            <boxGeometry args={[3.5, 2.0, 0.04]} />
            <meshStandardMaterial color={COLORS.manila} roughness={0.9} />
          </mesh>
          <mesh position={[4, 1.0, 0.046]}>
            <boxGeometry args={[3.5, 0.28, 0.03]} />
            <meshStandardMaterial color={COLORS.manilaTab} roughness={0.9} />
          </mesh>
          <mesh position={[2.4, 1.0, 0.062]}>
            <planeGeometry args={[0.6, 0.32]} />
            <meshStandardMaterial color={COLORS.darkRed} />
          </mesh>
          <Text position={[2.4, 1.0, 0.072]} fontSize={0.17} color="#FFFFFF" anchorX="center" anchorY="middle">
            #003
          </Text>
          <Text position={[4, 0.45, 0.05]} fontSize={0.26} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
            PROJECTS
          </Text>
          <Text position={[4, 0.05, 0.05]} fontSize={0.12} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
            MedeSense
          </Text>
          <Text position={[4, -0.18, 0.05]} fontSize={0.12} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
            RespawnRoom
          </Text>
          <Text position={[4, -0.41, 0.05]} fontSize={0.12} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
            VibeLink & More
          </Text>
          <PushPin position={[4, 1.0, 0.08]} radius={0.12} />
        </group>

        {/* Case File 3 - SKILLS & EDUCATION (Center - LARGEST) */}
        <group
          onClick={(e) => {
            if (!showContent || selectedCaseFile) return;
            e.stopPropagation();
            onCaseFileClick?.('skillseducation');
          }}
          onPointerEnter={() => {
            if (showContent && !selectedCaseFile) document.body.style.cursor = 'pointer';
          }}
          onPointerLeave={() => (document.body.style.cursor = 'auto')}
          visible={!selectedCaseFile}
        >
          <mesh position={[-0.5, -0.8, 0.03]}>
            <boxGeometry args={[4.5, 2.8, 0.04]} />
            <meshStandardMaterial color={COLORS.manila} roughness={0.9} />
          </mesh>
          <mesh position={[-0.5, 0.6, 0.046]}>
            <boxGeometry args={[4.5, 0.35, 0.03]} />
            <meshStandardMaterial color={COLORS.manilaTab} roughness={0.9} />
          </mesh>
          <mesh position={[-2.85, 0.6, 0.062]}>
            <planeGeometry args={[0.7, 0.38]} />
            <meshStandardMaterial color={COLORS.darkRed} />
          </mesh>
          <Text position={[-2.85, 0.6, 0.072]} fontSize={0.19} color="#FFFFFF" anchorX="center" anchorY="middle">
            #002
          </Text>
          <Text position={[-0.5, 0.0, 0.05]} fontSize={0.30} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
            SKILLS & EDUCATION
          </Text>
          <Text position={[-0.5, -0.45, 0.05]} fontSize={0.14} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4.2}>
            Computer Science
          </Text>
          <Text position={[-0.5, -0.70, 0.05]} fontSize={0.14} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4.2}>
            React • TypeScript • Three.js
          </Text>
          <Text position={[-0.5, -0.95, 0.05]} fontSize={0.14} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4.2}>
            Node.js • AWS • Docker
          </Text>
          <Text position={[-0.5, -1.20, 0.05]} fontSize={0.14} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4.2}>
            Full-Stack Development
          </Text>
          <PushPin position={[-0.5, 0.6, 0.08]} radius={0.14} />
        </group>

      </group>
    </group>
  );
};
