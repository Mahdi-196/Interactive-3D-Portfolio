import * as THREE from 'three';

interface InteractiveDetectiveBoardProps {
  onInteraction: (type: string, data?: unknown) => void;
  onBoardClick?: () => void;
  showContent?: boolean;
  onContentClose?: () => void;
}

export const InteractiveDetectiveBoard = ({ onInteraction, onBoardClick }: InteractiveDetectiveBoardProps) => {
  // Board now opens a fullscreen overlay instead of showing content on the 3D board

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
    </group>

    </>
  );
};