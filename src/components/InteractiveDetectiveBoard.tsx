import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

interface InteractiveDetectiveBoardProps {
  onInteraction: (type: string, data?: unknown) => void;
  onBoardClick?: () => void;
  onCaseFileClick?: (caseFile: 'about' | 'education' | 'skills' | 'projects' | null) => void;
  showContent?: boolean;
  selectedCaseFile?: 'about' | 'education' | 'skills' | 'projects' | null;
  overlayVisible?: boolean;
  onContentClose?: () => void;
}

type ProjectDetail = 'refocused' | null;

export const InteractiveDetectiveBoard = ({ onInteraction, onBoardClick, onCaseFileClick, showContent, selectedCaseFile, overlayVisible }: InteractiveDetectiveBoardProps) => {
  const navigate = useNavigate();

  // Track which project detail is selected (for nested navigation)
  const [selectedProject, setSelectedProject] = useState<ProjectDetail>(null);

  // Track opacity for fade animations
  const previewGroupRef = useRef<THREE.Group>(null);
  const detailGroupRef = useRef<THREE.Group>(null);
  const previewTargetOpacity = useRef(1);
  const previewCurrentOpacity = useRef(1);
  const detailTargetOpacity = useRef(0);
  const detailCurrentOpacity = useRef(0);

  // Animate opacity smoothly - fade out preview when detail shown, fade in detail
  useFrame((state, delta) => {
    // Preview fade out/in
    previewTargetOpacity.current = selectedCaseFile ? 0 : 1;
    previewCurrentOpacity.current += (previewTargetOpacity.current - previewCurrentOpacity.current) * delta * 8;

    // Detail fade in/out
    detailTargetOpacity.current = selectedCaseFile ? 1 : 0;
    detailCurrentOpacity.current += (detailTargetOpacity.current - detailCurrentOpacity.current) * delta * 6;

    // Update opacity and visibility for preview elements
    if (previewGroupRef.current) {
      // Hide preview completely when opacity is very low
      previewGroupRef.current.visible = previewCurrentOpacity.current > 0.01;

      previewGroupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).material) {
          const mat = (child as THREE.Mesh).material;
          if (Array.isArray(mat)) {
            mat.forEach(m => {
              m.transparent = true;
              m.opacity = previewCurrentOpacity.current;
            });
          } else {
            mat.transparent = true;
            mat.opacity = previewCurrentOpacity.current;
          }
        }
      });
    }

    // Update opacity and visibility for detail elements
    if (detailGroupRef.current) {
      // Hide detail completely when opacity is very low
      detailGroupRef.current.visible = detailCurrentOpacity.current > 0.01;

      detailGroupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).material) {
          const mat = (child as THREE.Mesh).material;
          if (Array.isArray(mat)) {
            mat.forEach(m => {
              m.transparent = true;
              m.opacity = detailCurrentOpacity.current;
            });
          } else {
            mat.transparent = true;
            mat.opacity = detailCurrentOpacity.current;
          }
        }
      });
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    console.log('Board clicked!', { onBoardClick, hasCallback: !!onBoardClick });
    onBoardClick?.();
  };

  return (
    <>
    <group
      position={[0, 4.5, 9.9]}
      rotation={[0, Math.PI, 0]}
    >
      {/* Main Wooden Board Background - Light brown wood */}
      <mesh
        onClick={handleClick}
        onPointerEnter={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'crosshair';
        }}
      >
        <planeGeometry args={[12.5, 6.5]} />
        <meshStandardMaterial
          color="#D2B48C"
          roughness={0.7}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Wooden Borders - Dark brown wood (also clickable) */}
      <mesh position={[0, 3.25, 0.02]} onClick={handleClick}>
        <boxGeometry args={[13, 0.25, 0.08]} />
        <meshStandardMaterial
          color="#654321"
          roughness={0.8}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, -3.25, 0.02]} onClick={handleClick}>
        <boxGeometry args={[13, 0.25, 0.08]} />
        <meshStandardMaterial
          color="#654321"
          roughness={0.8}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[-6.25, 0, 0.02]} onClick={handleClick}>
        <boxGeometry args={[0.25, 6.5, 0.08]} />
        <meshStandardMaterial
          color="#654321"
          roughness={0.8}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[6.25, 0, 0.02]} onClick={handleClick}>
        <boxGeometry args={[0.25, 6.5, 0.08]} />
        <meshStandardMaterial
          color="#654321"
          roughness={0.8}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Preview content group - fades out on click */}
      <group ref={previewGroupRef}>
      {/* Header Bar - Top of board */}
      <mesh position={[0, 2.8, 0.03]}>
        <planeGeometry args={[11, 0.7]} />
        <meshStandardMaterial color="#1a0d00" />
      </mesh>
      <Text
        position={[0, 2.8, 0.04]}
        fontSize={0.32}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
      >
        CASE FILE: MAHDI GHALEB
      </Text>


      {/* Case File 1 - ABOUT ME (Top Left) */}
      <group
        onClick={(e) => {
          if (!showContent) return; // Only clickable when board is zoomed
          e.stopPropagation();
          onCaseFileClick?.('about');
        }}
        onPointerEnter={() => {
          if (showContent) document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => document.body.style.cursor = 'auto'}
      >
      {/* Folder body - main manila envelope */}
      <mesh position={[-3.2, 1.2, 0.03]}>
        <boxGeometry args={[2.2, 1.3, 0.03]} />
        <meshStandardMaterial color="#C09858" roughness={0.9} />
      </mesh>
      {/* Folder tab at top */}
      <mesh position={[-3.2, 1.85, 0.045]}>
        <boxGeometry args={[2.2, 0.2, 0.025]} />
        <meshStandardMaterial color="#B58F4F" roughness={0.9} />
      </mesh>
      {/* File identifier label on top left */}
      <mesh position={[-4.15, 1.8, 0.06]}>
        <planeGeometry args={[0.45, 0.25]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>
      <Text
        position={[-4.15, 1.8, 0.07]}
        fontSize={0.14}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        #001
      </Text>
      <Text
        position={[-3.2, 1.4, 0.05]}
        fontSize={0.18}
        color="#1a0d00"
        anchorX="center"
        anchorY="middle"
      >
        ABOUT ME
      </Text>
      <Text
        position={[-3.2, 1.05, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Full-Stack Dev
      </Text>
      <Text
        position={[-3.2, 0.9, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        3D Enthusiast
      </Text>
      <Text
        position={[-3.2, 0.75, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Problem Solver
      </Text>
      {/* Push pin */}
      <mesh position={[-3.2, 1.85, 0.06]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
      </mesh>
      </group>

      {/* Case File 2 - EDUCATION (Top Right) */}
      <group
        onClick={(e) => {
          if (!showContent) return; // Only clickable when board is zoomed
          e.stopPropagation();
          onCaseFileClick?.('education');
        }}
        onPointerEnter={() => {
          if (showContent) document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => document.body.style.cursor = 'auto'}
      >
      {/* Folder body - main manila envelope */}
      <mesh position={[3.2, 1.2, 0.03]}>
        <boxGeometry args={[2.2, 1.3, 0.03]} />
        <meshStandardMaterial color="#C09858" roughness={0.9} />
      </mesh>
      {/* Folder tab at top */}
      <mesh position={[3.2, 1.85, 0.045]}>
        <boxGeometry args={[2.2, 0.2, 0.025]} />
        <meshStandardMaterial color="#B58F4F" roughness={0.9} />
      </mesh>
      {/* File identifier label on top left */}
      <mesh position={[2.25, 1.8, 0.06]}>
        <planeGeometry args={[0.45, 0.25]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>
      <Text
        position={[2.25, 1.8, 0.07]}
        fontSize={0.14}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        #002
      </Text>
      <Text
        position={[3.2, 1.4, 0.05]}
        fontSize={0.18}
        color="#1a0d00"
        anchorX="center"
        anchorY="middle"
      >
        EDUCATION
      </Text>
      <Text
        position={[3.2, 1.05, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Computer Science
      </Text>
      <Text
        position={[3.2, 0.9, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Self-Taught Dev
      </Text>
      <Text
        position={[3.2, 0.75, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Lifelong Learner
      </Text>
      {/* Push pin */}
      <mesh position={[3.2, 1.85, 0.06]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
      </mesh>
      </group>

      {/* Case File 3 - SKILLS (Bottom Left) */}
      <group
        onClick={(e) => {
          if (!showContent) return; // Only clickable when board is zoomed
          e.stopPropagation();
          onCaseFileClick?.('skills');
        }}
        onPointerEnter={() => {
          if (showContent) document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => document.body.style.cursor = 'auto'}
      >
      {/* Folder body - manila envelope */}
      <mesh position={[-3.2, -1.35, 0.03]}>
        <boxGeometry args={[2.2, 1.3, 0.03]} />
        <meshStandardMaterial color="#C09858" roughness={0.9} />
      </mesh>
      {/* Folder tab at top */}
      <mesh position={[-3.2, -0.7, 0.045]}>
        <boxGeometry args={[2.2, 0.2, 0.025]} />
        <meshStandardMaterial color="#B58F4F" roughness={0.9} />
      </mesh>
      {/* File identifier label on top left */}
      <mesh position={[-4.15, -0.75, 0.06]}>
        <planeGeometry args={[0.45, 0.25]} />
        <meshStandardMaterial color="#1a0d00" />
      </mesh>
      <Text
        position={[-4.15, -0.75, 0.07]}
        fontSize={0.14}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
      >
        #003
      </Text>
      <Text
        position={[-3.2, -1.15, 0.05]}
        fontSize={0.18}
        color="#1a0d00"
        anchorX="center"
        anchorY="middle"
      >
        SKILLS
      </Text>
      <Text
        position={[-3.2, -1.5, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        React • TypeScript
      </Text>
      <Text
        position={[-3.2, -1.65, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Three.js • Node.js
      </Text>
      <Text
        position={[-3.2, -1.8, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        AWS • Docker
      </Text>
      {/* Push pin */}
      <mesh position={[-3.2, -0.7, 0.06]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
      </mesh>
      </group>

      {/* Case File 4 - PROJECTS (Bottom Right) */}
      <group
        onClick={(e) => {
          if (!showContent) return; // Only clickable when board is zoomed
          e.stopPropagation();
          onCaseFileClick?.('projects');
        }}
        onPointerEnter={() => {
          if (showContent) document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => document.body.style.cursor = 'auto'}
      >
      {/* Folder body - main manila envelope */}
      <mesh position={[3.2, -1.35, 0.03]}>
        <boxGeometry args={[2.2, 1.3, 0.03]} />
        <meshStandardMaterial color="#C09858" roughness={0.9} />
      </mesh>
      {/* Folder tab at top */}
      <mesh position={[3.2, -0.7, 0.045]}>
        <boxGeometry args={[2.2, 0.2, 0.025]} />
        <meshStandardMaterial color="#B58F4F" roughness={0.9} />
      </mesh>
      {/* File identifier label on top left */}
      <mesh position={[2.25, -0.75, 0.06]}>
        <planeGeometry args={[0.45, 0.25]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>
      <Text
        position={[2.25, -0.75, 0.07]}
        fontSize={0.14}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        #004
      </Text>
      <Text
        position={[3.2, -1.15, 0.05]}
        fontSize={0.18}
        color="#1a0d00"
        anchorX="center"
        anchorY="middle"
      >
        PROJECTS
      </Text>
      <Text
        position={[3.2, -1.5, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        E-Commerce
      </Text>
      <Text
        position={[3.2, -1.65, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Chat Application
      </Text>
      <Text
        position={[3.2, -1.8, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Analytics Dashboard
      </Text>
      {/* Push pin */}
      <mesh position={[3.2, -0.7, 0.06]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
      </mesh>
      </group>

      </group>
    </group>

    {/* DETAIL VIEWS - Fade in when a case file is selected */}
    {selectedCaseFile && (
      <group
        ref={detailGroupRef}
        position={[0, 4.5, 9.9]}
        rotation={[0, Math.PI, 0]}
      >

    {/* ABOUT ME DETAIL VIEW */}
    {selectedCaseFile === 'about' && (
      <>
        {/* Back Button */}
        <group
          position={[-5.5, 2.8, 0.04]}
          onClick={(e) => {
            e.stopPropagation();
            onCaseFileClick?.(null);
          }}
          onPointerEnter={() => document.body.style.cursor = 'pointer'}
          onPointerLeave={() => document.body.style.cursor = 'auto'}
        >
          <mesh>
            <planeGeometry args={[1.2, 0.4]} />
            <meshStandardMaterial color="#1a0d00" />
          </mesh>
          <Text position={[0, 0, 0.01]} fontSize={0.15} color="#FFD700" anchorX="center" anchorY="middle">
            ← BACK
          </Text>
        </group>

        {/* Header */}
        <mesh position={[0, 2.5, 0.03]}>
          <planeGeometry args={[10, 0.6]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[0, 2.5, 0.04]} fontSize={0.28} color="#FFFFFF" anchorX="center" anchorY="middle">
          CASE FILE #001: ABOUT ME
        </Text>

        {/* Main Content Card */}
        <mesh position={[0, 0.5, 0.03]}>
          <planeGeometry args={[9, 3.5]} />
          <meshStandardMaterial color="#F5F5DC" />
        </mesh>

        <Text position={[0, 1.8, 0.04]} fontSize={0.22} color="#1a0d00" anchorX="center" anchorY="middle">
          MAHDI GHALEB
        </Text>

        <Text position={[0, 1.45, 0.04]} fontSize={0.14} color="#8B0000" anchorX="center" anchorY="middle">
          Full-Stack Developer & 3D Enthusiast
        </Text>

        <Text position={[0, 1.0, 0.04]} fontSize={0.11} color="#333333" anchorX="center" anchorY="middle" maxWidth={8}>
          Passionate developer specializing in creating
        </Text>
        <Text position={[0, 0.85, 0.04]} fontSize={0.11} color="#333333" anchorX="center" anchorY="middle" maxWidth={8}>
          immersive web experiences that blend cutting-edge
        </Text>
        <Text position={[0, 0.70, 0.04]} fontSize={0.11} color="#333333" anchorX="center" anchorY="middle" maxWidth={8}>
          technology with creative design. I transform complex
        </Text>
        <Text position={[0, 0.55, 0.04]} fontSize={0.11} color="#333333" anchorX="center" anchorY="middle" maxWidth={8}>
          ideas into elegant, user-friendly solutions.
        </Text>

        <Text position={[0, 0.15, 0.04]} fontSize={0.12} color="#654321" anchorX="center" anchorY="middle">
          🎯 Problem Solver • 🚀 Innovation Driven
        </Text>
        <Text position={[0, -0.05, 0.04]} fontSize={0.12} color="#654321" anchorX="center" anchorY="middle">
          💡 Creative Thinker • 🎨 Design Focused
        </Text>

        <Text position={[0, -0.5, 0.04]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle" maxWidth={8}>
          When I'm not coding, you'll find me exploring new
        </Text>
        <Text position={[0, -0.65, 0.04]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle" maxWidth={8}>
          technologies, contributing to open source, and
        </Text>
        <Text position={[0, -0.80, 0.04]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle" maxWidth={8}>
          pushing the boundaries of what's possible on the web.
        </Text>

        {/* Push pins */}
        <mesh position={[-4.3, 2.2, 0.05]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[4.3, 2.2, 0.05]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
        </mesh>
      </>
    )}

    {/* EDUCATION DETAIL VIEW */}
    {selectedCaseFile === 'education' && (
      <>
        {/* Back Button */}
        <group
          position={[-5.5, 2.8, 0.04]}
          onClick={(e) => {
            e.stopPropagation();
            onCaseFileClick?.(null);
          }}
          onPointerEnter={() => document.body.style.cursor = 'pointer'}
          onPointerLeave={() => document.body.style.cursor = 'auto'}
        >
          <mesh>
            <planeGeometry args={[1.2, 0.4]} />
            <meshStandardMaterial color="#1a0d00" />
          </mesh>
          <Text position={[0, 0, 0.01]} fontSize={0.15} color="#FFD700" anchorX="center" anchorY="middle">
            ← BACK
          </Text>
        </group>

        {/* Header */}
        <mesh position={[0, 2.5, 0.03]}>
          <planeGeometry args={[10, 0.6]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[0, 2.5, 0.04]} fontSize={0.28} color="#FFFFFF" anchorX="center" anchorY="middle">
          CASE FILE #002: EDUCATION
        </Text>

        {/* Education Card 1 */}
        <mesh position={[-3.5, 0.8, 0.03]}>
          <planeGeometry args={[4.5, 2.8]} />
          <meshStandardMaterial color="#F5F5DC" />
        </mesh>
        <mesh position={[-3.5, 2, 0.04]}>
          <planeGeometry args={[4.4, 0.3]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[-3.5, 2, 0.05]} fontSize={0.15} color="#FFFFFF" anchorX="center" anchorY="middle">
          FORMAL EDUCATION
        </Text>
        <Text position={[-3.5, 1.5, 0.05]} fontSize={0.13} color="#1a0d00" anchorX="center" anchorY="middle">
          Computer Science
        </Text>
        <Text position={[-3.5, 1.25, 0.05]} fontSize={0.10} color="#654321" anchorX="center" anchorY="middle">
          Bachelor's Degree
        </Text>
        <Text position={[-3.5, 0.9, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={4}>
          Focus: Software Engineering,
        </Text>
        <Text position={[-3.5, 0.75, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={4}>
          Web Development, Data
        </Text>
        <Text position={[-3.5, 0.60, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={4}>
          Structures & Algorithms
        </Text>
        <Text position={[-3.5, 0.25, 0.05]} fontSize={0.08} color="#654321" anchorX="center" anchorY="middle">
          GPA: 3.8/4.0
        </Text>

        {/* Education Card 2 */}
        <mesh position={[3.5, 0.8, 0.03]}>
          <planeGeometry args={[4.5, 2.8]} />
          <meshStandardMaterial color="#F5F5DC" />
        </mesh>
        <mesh position={[3.5, 2, 0.04]}>
          <planeGeometry args={[4.4, 0.3]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[3.5, 2, 0.05]} fontSize={0.15} color="#FFFFFF" anchorX="center" anchorY="middle">
          SELF-TAUGHT LEARNING
        </Text>
        <Text position={[3.5, 1.5, 0.05]} fontSize={0.13} color="#1a0d00" anchorX="center" anchorY="middle">
          Continuous Development
        </Text>
        <Text position={[3.5, 1.15, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={4}>
          • Advanced React & TypeScript
        </Text>
        <Text position={[3.5, 1.0, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={4}>
          • Three.js & WebGL Graphics
        </Text>
        <Text position={[3.5, 0.85, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={4}>
          • Cloud Architecture (AWS)
        </Text>
        <Text position={[3.5, 0.70, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={4}>
          • Microservices & DevOps
        </Text>
        <Text position={[3.5, 0.55, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={4}>
          • UI/UX Design Principles
        </Text>
        <Text position={[3.5, 0.2, 0.05]} fontSize={0.08} color="#654321" anchorX="center" anchorY="middle">
          100+ Online Courses Completed
        </Text>

        {/* Push pins */}
        <mesh position={[-3.5, 2.3, 0.05]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[3.5, 2.3, 0.05]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
        </mesh>

      </>
    )}

    {/* SKILLS DETAIL VIEW */}
    {selectedCaseFile === 'skills' && (
      <>
        {/* Back Button */}
        <group
          position={[-5.5, 2.8, 0.04]}
          onClick={(e) => {
            e.stopPropagation();
            onCaseFileClick?.(null);
          }}
          onPointerEnter={() => document.body.style.cursor = 'pointer'}
          onPointerLeave={() => document.body.style.cursor = 'auto'}
        >
          <mesh>
            <planeGeometry args={[1.2, 0.4]} />
            <meshStandardMaterial color="#1a0d00" />
          </mesh>
          <Text position={[0, 0, 0.01]} fontSize={0.15} color="#FFD700" anchorX="center" anchorY="middle">
            ← BACK
          </Text>
        </group>

        {/* Header */}
        <mesh position={[0, 2.5, 0.03]}>
          <planeGeometry args={[10, 0.6]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[0, 2.5, 0.04]} fontSize={0.28} color="#FFFFFF" anchorX="center" anchorY="middle">
          CASE FILE #003: SKILLS
        </Text>

        {/* Frontend Skills */}
        <mesh position={[-3.5, 0.8, 0.03]}>
          <planeGeometry args={[4.2, 2.8]} />
          <meshStandardMaterial color="#FFEB3B" />
        </mesh>
        <mesh position={[-3.5, 2, 0.04]}>
          <planeGeometry args={[4.1, 0.3]} />
          <meshStandardMaterial color="#1a0d00" />
        </mesh>
        <Text position={[-3.5, 2, 0.05]} fontSize={0.15} color="#FFD700" anchorX="center" anchorY="middle">
          FRONTEND
        </Text>
        <Text position={[-3.5, 1.55, 0.05]} fontSize={0.10} color="#1a0d00" anchorX="center" anchorY="middle">
          ⭐ React & Next.js
        </Text>
        <Text position={[-3.5, 1.35, 0.05]} fontSize={0.10} color="#1a0d00" anchorX="center" anchorY="middle">
          ⭐ TypeScript
        </Text>
        <Text position={[-3.5, 1.15, 0.05]} fontSize={0.10} color="#1a0d00" anchorX="center" anchorY="middle">
          ⭐ Three.js & R3F
        </Text>
        <Text position={[-3.5, 0.95, 0.05]} fontSize={0.10} color="#1a0d00" anchorX="center" anchorY="middle">
          ⭐ Tailwind CSS
        </Text>
        <Text position={[-3.5, 0.75, 0.05]} fontSize={0.10} color="#1a0d00" anchorX="center" anchorY="middle">
          ⭐ Redux & Zustand
        </Text>
        <Text position={[-3.5, 0.55, 0.05]} fontSize={0.10} color="#1a0d00" anchorX="center" anchorY="middle">
          ⭐ Responsive Design
        </Text>
        <Text position={[-3.5, 0.35, 0.05]} fontSize={0.10} color="#1a0d00" anchorX="center" anchorY="middle">
          ⭐ Accessibility
        </Text>

        {/* Backend Skills */}
        <mesh position={[0, 0.8, 0.03]}>
          <planeGeometry args={[4.2, 2.8]} />
          <meshStandardMaterial color="#F5F5DC" />
        </mesh>
        <mesh position={[0, 2, 0.04]}>
          <planeGeometry args={[4.1, 0.3]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[0, 2, 0.05]} fontSize={0.15} color="#FFFFFF" anchorX="center" anchorY="middle">
          BACKEND
        </Text>
        <Text position={[0, 1.55, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ Node.js & Express
        </Text>
        <Text position={[0, 1.35, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ Python & FastAPI
        </Text>
        <Text position={[0, 1.15, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ PostgreSQL & MongoDB
        </Text>
        <Text position={[0, 0.95, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ GraphQL & REST APIs
        </Text>
        <Text position={[0, 0.75, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ Redis & Caching
        </Text>
        <Text position={[0, 0.55, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ WebSockets
        </Text>
        <Text position={[0, 0.35, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ Microservices
        </Text>

        {/* DevOps & Tools */}
        <mesh position={[3.5, 0.8, 0.03]}>
          <planeGeometry args={[4.2, 2.8]} />
          <meshStandardMaterial color="#F5F5DC" />
        </mesh>
        <mesh position={[3.5, 2, 0.04]}>
          <planeGeometry args={[4.1, 0.3]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[3.5, 2, 0.05]} fontSize={0.15} color="#FFFFFF" anchorX="center" anchorY="middle">
          DEVOPS & TOOLS
        </Text>
        <Text position={[3.5, 1.55, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ AWS & Cloud
        </Text>
        <Text position={[3.5, 1.35, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ Docker & K8s
        </Text>
        <Text position={[3.5, 1.15, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ CI/CD Pipelines
        </Text>
        <Text position={[3.5, 0.95, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ Git & GitHub
        </Text>
        <Text position={[3.5, 0.75, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ Linux & Bash
        </Text>
        <Text position={[3.5, 0.55, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ Nginx & Load Bal.
        </Text>
        <Text position={[3.5, 0.35, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ Monitoring Tools
        </Text>

        {/* Push pins */}
        <mesh position={[-3.5, 2.3, 0.05]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[0, 2.3, 0.05]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[3.5, 2.3, 0.05]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
        </mesh>

      </>
    )}

    {/* PROJECTS DETAIL VIEW */}
    {selectedCaseFile === 'projects' && (
      <>
        {/* Back Button - Top Left */}
        <group
          position={[-5.5, 2.8, 0.04]}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProject(null); // Reset project detail if any
            onCaseFileClick?.(null); // Reset selection to go back to case files
          }}
          onPointerEnter={() => document.body.style.cursor = 'pointer'}
          onPointerLeave={() => document.body.style.cursor = 'auto'}
        >
          <mesh>
            <planeGeometry args={[1.2, 0.4]} />
            <meshStandardMaterial color="#1a0d00" />
          </mesh>
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.15}
            color="#FFD700"
            anchorX="center"
            anchorY="middle"
          >
            ← BACK
          </Text>
        </group>

        {/* Header */}
        <mesh position={[0, 2.5, 0.03]}>
          <planeGeometry args={[10, 0.6]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text
          position={[0, 2.5, 0.04]}
          fontSize={0.28}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          {selectedProject ? 'REFOCUSED - PROJECT DETAILS' : 'CASE FILE #004: PROJECTS'}
        </Text>

        {/* Show project list or project detail */}
        {!selectedProject && (
        <>
        {/* Project 1 - ReFocused (Center, Largest) */}
        <group
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProject('refocused');
          }}
          onPointerEnter={() => {
            document.body.style.cursor = 'pointer';
          }}
          onPointerLeave={() => {
            document.body.style.cursor = 'auto';
          }}
        >
        {/* Folder body */}
        <mesh position={[0, 0.5, 0.03]}>
          <boxGeometry args={[4.5, 2.5, 0.03]} />
          <meshStandardMaterial color="#C09858" roughness={0.9} />
        </mesh>
        {/* Folder tab */}
        <mesh position={[0, 1.75, 0.045]}>
          <boxGeometry args={[4.5, 0.25, 0.025]} />
          <meshStandardMaterial color="#B58F4F" roughness={0.9} />
        </mesh>
        {/* File identifier label */}
        <mesh position={[-2.0, 1.7, 0.06]}>
          <planeGeometry args={[0.5, 0.3]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[-2.0, 1.7, 0.07]} fontSize={0.15} color="#FFFFFF" anchorX="center" anchorY="middle">
          #001
        </Text>
        {/* Project title */}
        <Text position={[0, 1.35, 0.05]} fontSize={0.22} color="#1a0d00" anchorX="center" anchorY="middle">
          ReFocused
        </Text>
        {/* Project description */}
        <Text position={[0, 0.95, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle" maxWidth={4}>
          Advanced productivity platform
        </Text>
        <Text position={[0, 0.80, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle" maxWidth={4}>
          with AI-powered focus sessions
        </Text>
        <Text position={[0, 0.65, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle" maxWidth={4}>
          and intelligent task management
        </Text>
        {/* Tech stack */}
        <Text position={[0, 0.35, 0.05]} fontSize={0.09} color="#654321" anchorX="center" anchorY="middle">
          React • TypeScript • Node.js
        </Text>
        <Text position={[0, 0.20, 0.05]} fontSize={0.09} color="#654321" anchorX="center" anchorY="middle">
          PostgreSQL • Redis • OpenAI
        </Text>
        {/* Push pin */}
        <mesh position={[0, 1.75, 0.08]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
        </mesh>
        </group>

        {/* Project 2 - RespawnRoom (Left) */}
        {/* Folder body */}
        <mesh position={[-3.8, -1.2, 0.03]}>
          <boxGeometry args={[3, 1.8, 0.03]} />
          <meshStandardMaterial color="#C09858" roughness={0.9} />
        </mesh>
        {/* Folder tab */}
        <mesh position={[-3.8, -0.3, 0.045]}>
          <boxGeometry args={[3, 0.2, 0.025]} />
          <meshStandardMaterial color="#B58F4F" roughness={0.9} />
        </mesh>
        {/* File identifier label */}
        <mesh position={[-5.1, -0.35, 0.06]}>
          <planeGeometry args={[0.45, 0.25]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[-5.1, -0.35, 0.07]} fontSize={0.13} color="#FFFFFF" anchorX="center" anchorY="middle">
          #002
        </Text>
        {/* Project title */}
        <Text position={[-3.8, -0.65, 0.05]} fontSize={0.16} color="#1a0d00" anchorX="center" anchorY="middle">
          RespawnRoom
        </Text>
        {/* Project description */}
        <Text position={[-3.8, -0.95, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.7}>
          Gaming community platform
        </Text>
        <Text position={[-3.8, -1.08, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.7}>
          for tournaments and events
        </Text>
        {/* Tech stack */}
        <Text position={[-3.8, -1.4, 0.05]} fontSize={0.08} color="#654321" anchorX="center" anchorY="middle">
          Next.js • MongoDB
        </Text>
        <Text position={[-3.8, -1.53, 0.05]} fontSize={0.08} color="#654321" anchorX="center" anchorY="middle">
          WebSockets • AWS
        </Text>
        {/* Push pin */}
        <mesh position={[-3.8, -0.3, 0.07]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
        </mesh>

        {/* Project 3 - This Resume Website (Right) */}
        {/* Folder body */}
        <mesh position={[3.8, -1.2, 0.03]}>
          <boxGeometry args={[3, 1.8, 0.03]} />
          <meshStandardMaterial color="#C09858" roughness={0.9} />
        </mesh>
        {/* Folder tab */}
        <mesh position={[3.8, -0.3, 0.045]}>
          <boxGeometry args={[3, 0.2, 0.025]} />
          <meshStandardMaterial color="#B58F4F" roughness={0.9} />
        </mesh>
        {/* File identifier label */}
        <mesh position={[2.5, -0.35, 0.06]}>
          <planeGeometry args={[0.45, 0.25]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[2.5, -0.35, 0.07]} fontSize={0.13} color="#FFFFFF" anchorX="center" anchorY="middle">
          #003
        </Text>
        {/* Project title */}
        <Text position={[3.8, -0.65, 0.05]} fontSize={0.16} color="#1a0d00" anchorX="center" anchorY="middle">
          3D Resume
        </Text>
        {/* Project description */}
        <Text position={[3.8, -0.95, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.7}>
          Interactive detective-themed
        </Text>
        <Text position={[3.8, -1.08, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.7}>
          3D portfolio experience
        </Text>
        {/* Tech stack */}
        <Text position={[3.8, -1.4, 0.05]} fontSize={0.08} color="#654321" anchorX="center" anchorY="middle">
          React Three Fiber
        </Text>
        <Text position={[3.8, -1.53, 0.05]} fontSize={0.08} color="#654321" anchorX="center" anchorY="middle">
          Three.js • TypeScript
        </Text>
        {/* Push pin */}
        <mesh position={[3.8, -0.3, 0.07]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
        </mesh>

        </>
        )}

        {/* ReFocused Detail View */}
        {selectedProject === 'refocused' && (
        <>
        {/* Component 1 - Frontend (Top Left) */}
        <group
          onClick={(e) => {
            e.stopPropagation();
            navigate('/project-detail/frontend');
          }}
          onPointerEnter={() => document.body.style.cursor = 'pointer'}
          onPointerLeave={() => document.body.style.cursor = 'auto'}
        >
        <mesh position={[-3.8, 1.0, 0.03]}>
          <boxGeometry args={[2.8, 1.8, 0.03]} />
          <meshStandardMaterial color="#C09858" roughness={0.9} />
        </mesh>
        <mesh position={[-3.8, 1.9, 0.045]}>
          <boxGeometry args={[2.8, 0.2, 0.025]} />
          <meshStandardMaterial color="#B58F4F" roughness={0.9} />
        </mesh>
        <mesh position={[-4.95, 1.85, 0.06]}>
          <planeGeometry args={[0.45, 0.25]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[-4.95, 1.85, 0.07]} fontSize={0.13} color="#FFFFFF" anchorX="center" anchorY="middle">
          #001
        </Text>
        <Text position={[-3.8, 1.5, 0.05]} fontSize={0.18} color="#1a0d00" anchorX="center" anchorY="middle">
          FRONTEND
        </Text>
        <Text position={[-3.8, 1.15, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.5}>
          React • TypeScript
        </Text>
        <Text position={[-3.8, 1.0, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.5}>
          Tailwind CSS • Zustand
        </Text>
        <Text position={[-3.8, 0.85, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.5}>
          React Query • Vite
        </Text>
        <mesh position={[-3.8, 1.9, 0.07]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
        </mesh>
        </group>

        {/* Component 2 - Backend (Top Right) */}
        <group
          onClick={(e) => {
            e.stopPropagation();
            navigate('/project-detail/backend');
          }}
          onPointerEnter={() => document.body.style.cursor = 'pointer'}
          onPointerLeave={() => document.body.style.cursor = 'auto'}
        >
        <mesh position={[3.8, 1.0, 0.03]}>
          <boxGeometry args={[2.8, 1.8, 0.03]} />
          <meshStandardMaterial color="#C09858" roughness={0.9} />
        </mesh>
        <mesh position={[3.8, 1.9, 0.045]}>
          <boxGeometry args={[2.8, 0.2, 0.025]} />
          <meshStandardMaterial color="#B58F4F" roughness={0.9} />
        </mesh>
        <mesh position={[2.65, 1.85, 0.06]}>
          <planeGeometry args={[0.45, 0.25]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[2.65, 1.85, 0.07]} fontSize={0.13} color="#FFFFFF" anchorX="center" anchorY="middle">
          #002
        </Text>
        <Text position={[3.8, 1.5, 0.05]} fontSize={0.18} color="#1a0d00" anchorX="center" anchorY="middle">
          BACKEND
        </Text>
        <Text position={[3.8, 1.15, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.5}>
          Node.js • Express
        </Text>
        <Text position={[3.8, 1.0, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.5}>
          PostgreSQL • Prisma
        </Text>
        <Text position={[3.8, 0.85, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.5}>
          Redis • JWT Auth
        </Text>
        <mesh position={[3.8, 1.9, 0.07]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
        </mesh>
        </group>

        {/* Component 3 - AI (Bottom Left) */}
        <group
          onClick={(e) => {
            e.stopPropagation();
            navigate('/project-detail/ai');
          }}
          onPointerEnter={() => document.body.style.cursor = 'pointer'}
          onPointerLeave={() => document.body.style.cursor = 'auto'}
        >
        <mesh position={[-3.8, -1.0, 0.03]}>
          <boxGeometry args={[2.8, 1.8, 0.03]} />
          <meshStandardMaterial color="#C09858" roughness={0.9} />
        </mesh>
        <mesh position={[-3.8, -0.1, 0.045]}>
          <boxGeometry args={[2.8, 0.2, 0.025]} />
          <meshStandardMaterial color="#B58F4F" roughness={0.9} />
        </mesh>
        <mesh position={[-4.95, -0.15, 0.06]}>
          <planeGeometry args={[0.45, 0.25]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[-4.95, -0.15, 0.07]} fontSize={0.13} color="#FFFFFF" anchorX="center" anchorY="middle">
          #003
        </Text>
        <Text position={[-3.8, -0.5, 0.05]} fontSize={0.18} color="#1a0d00" anchorX="center" anchorY="middle">
          AI FEATURES
        </Text>
        <Text position={[-3.8, -0.85, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.5}>
          OpenAI GPT-4
        </Text>
        <Text position={[-3.8, -1.0, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.5}>
          Smart Task Suggestions
        </Text>
        <Text position={[-3.8, -1.15, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.5}>
          Focus Session AI
        </Text>
        <mesh position={[-3.8, -0.1, 0.07]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
        </mesh>
        </group>

        {/* Component 4 - AWS (Bottom Right) */}
        <group
          onClick={(e) => {
            e.stopPropagation();
            navigate('/project-detail/aws');
          }}
          onPointerEnter={() => document.body.style.cursor = 'pointer'}
          onPointerLeave={() => document.body.style.cursor = 'auto'}
        >
        <mesh position={[3.8, -1.0, 0.03]}>
          <boxGeometry args={[2.8, 1.8, 0.03]} />
          <meshStandardMaterial color="#C09858" roughness={0.9} />
        </mesh>
        <mesh position={[3.8, -0.1, 0.045]}>
          <boxGeometry args={[2.8, 0.2, 0.025]} />
          <meshStandardMaterial color="#B58F4F" roughness={0.9} />
        </mesh>
        <mesh position={[2.65, -0.15, 0.06]}>
          <planeGeometry args={[0.45, 0.25]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[2.65, -0.15, 0.07]} fontSize={0.13} color="#FFFFFF" anchorX="center" anchorY="middle">
          #004
        </Text>
        <Text position={[3.8, -0.5, 0.05]} fontSize={0.18} color="#1a0d00" anchorX="center" anchorY="middle">
          AWS CLOUD
        </Text>
        <Text position={[3.8, -0.85, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.5}>
          EC2 • RDS • S3
        </Text>
        <Text position={[3.8, -1.0, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.5}>
          CloudFront • Lambda
        </Text>
        <Text position={[3.8, -1.15, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.5}>
          Auto Scaling
        </Text>
        <mesh position={[3.8, -0.1, 0.07]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
        </mesh>
        </group>

        </>
        )}
      </>
    )}

      </group>
    )}

    </>
  );
};