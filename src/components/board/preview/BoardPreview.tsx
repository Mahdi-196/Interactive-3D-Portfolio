import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { CaseFileCard } from './CaseFileCard';
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

        {/* Case File 1 - ABOUT ME (Top Left) */}
        <CaseFileCard
          position={CASE_FILE_POSITIONS.aboutMe}
          title="ABOUT ME"
          fileNumber="#001"
          items={['Full-Stack Dev', '3D Enthusiast', 'Problem Solver']}
          showContent={showContent}
          selectedCaseFile={selectedCaseFile}
          onClick={() => onCaseFileClick?.('about')}
          labelColor={COLORS.darkRed}
        />

        {/* Case File 2 - EDUCATION (Top Right) */}
        <CaseFileCard
          position={CASE_FILE_POSITIONS.education}
          title="EDUCATION"
          fileNumber="#002"
          items={['Computer Science', 'Self-Taught Dev', 'Lifelong Learner']}
          showContent={showContent}
          selectedCaseFile={selectedCaseFile}
          onClick={() => onCaseFileClick?.('education')}
          labelColor={COLORS.darkRed}
        />

        {/* Case File 3 - SKILLS (Bottom Left) */}
        <CaseFileCard
          position={CASE_FILE_POSITIONS.skills}
          title="SKILLS"
          fileNumber="#003"
          items={['React • TypeScript', 'Three.js • Node.js', 'AWS • Docker']}
          showContent={showContent}
          selectedCaseFile={selectedCaseFile}
          onClick={() => onCaseFileClick?.('skills')}
          labelColor={COLORS.darkBrown}
        />

        {/* Case File 4 - PROJECTS (Bottom Right) */}
        <CaseFileCard
          position={CASE_FILE_POSITIONS.projects}
          title="PROJECTS"
          fileNumber="#004"
          items={['E-Commerce', 'Chat Application', 'Analytics Dashboard']}
          showContent={showContent}
          selectedCaseFile={selectedCaseFile}
          onClick={() => onCaseFileClick?.('projects')}
          labelColor={COLORS.darkRed}
        />
      </group>
    </group>
  );
};
