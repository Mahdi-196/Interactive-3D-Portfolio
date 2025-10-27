import { useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { EnhancedCameraControls } from './EnhancedCameraControls';
import { DetectiveOfficeScene } from './DetectiveOfficeScene';
import { Lighting } from './Lighting';

interface CameraControlsRef {
  camera: THREE.Camera;
  setLookAt: (
    posX: number, posY: number, posZ: number,
    targetX: number, targetY: number, targetZ: number,
    enableTransition?: boolean
  ) => Promise<void>;
  getTarget: (target: THREE.Vector3) => void;
  lock: () => void;
}

interface DetectiveOfficeProps {
  onInteraction: (type: string, data?: unknown) => void;
  onCaseFileClick?: (caseFile: 'about' | 'education' | 'skills' | 'projects' | null) => void;
  selectedCaseFile?: 'about' | 'education' | 'skills' | 'projects' | null;
  overlayVisible?: boolean;
}

export interface DetectiveOfficeRef {
  zoomOutFromBoard: () => void;
}

// Main Detective Office Component
export const DetectiveOffice = forwardRef<DetectiveOfficeRef, DetectiveOfficeProps>(({ onInteraction, onCaseFileClick, selectedCaseFile, overlayVisible = false }, ref) => {
  const [lampOn, setLampOn] = useState(true);
  const [showBoardContent, setShowBoardContent] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDetectiveMode, setIsDetectiveMode] = useState(false);
  const [originalCameraState, setOriginalCameraState] = useState<{
    position: THREE.Vector3;
    target: THREE.Vector3;
  } | null>(null);
  const [wasPointerLocked, setWasPointerLocked] = useState(false);

  const cameraControlsRef = useRef<CameraControlsRef>(null);
  const detectivePosition = new THREE.Vector3(-2, 1.7, 3); // Detective eye height position

  // Expose zoomOutFromBoard method to parent via ref
  useImperativeHandle(ref, () => ({
    zoomOutFromBoard: () => {
      handleBoardContentClose();
    }
  }));

  // Board transition functions
  const handleBoardClick = async () => {
    console.log('handleBoardClick called!');
    if (isTransitioning) {
      console.log('Already transitioning, returning...');
      return;
    }

    setWasPointerLocked(!!document.pointerLockElement);
    
    // Exit pointer lock immediately when opening board
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
    
    setIsTransitioning(true);
    
    // Store current camera state
    const cameraControls = cameraControlsRef.current;
    if (cameraControls) {
      const currentPosition = cameraControls.camera.position.clone();
      const currentTarget = new THREE.Vector3();
      cameraControls.getTarget(currentTarget);
      
      setOriginalCameraState({
        position: currentPosition,
        target: currentTarget
      });
      
      try {
        // Smooth zoom to board - position to see full board
        const boardPosition = new THREE.Vector3(0, 4.5, 4.5); // Further back to see board and wall
        const boardTarget = new THREE.Vector3(0, 4.5, 9.9); // Board center

        await cameraControls.setLookAt(
          boardPosition.x, boardPosition.y, boardPosition.z,
          boardTarget.x, boardTarget.y, boardTarget.z,
          true // enable smooth transition
        );

        // Show content on board after zoom
        setShowBoardContent(true);
        setIsTransitioning(false);

      } catch (error) {
        console.error('Camera transition failed:', error);
        setIsTransitioning(false);
      }
    }
  };

  const handleBoardContentClose = async () => {
    if (!originalCameraState || !cameraControlsRef.current) {
      setShowBoardContent(false);
      setIsTransitioning(false);
      return;
    }
    
    setIsTransitioning(true);
    setShowBoardContent(false);
    
    try {
      // Smooth transition back to original position
      await cameraControlsRef.current.setLookAt(
        originalCameraState.position.x, 
        originalCameraState.position.y, 
        originalCameraState.position.z,
        originalCameraState.target.x, 
        originalCameraState.target.y, 
        originalCameraState.target.z,
        true // enable smooth transition
      );
      
      setIsTransitioning(false);
      setOriginalCameraState(null);
      
      // Re-engage pointer lock after a short delay to ensure camera transition is complete
      if (wasPointerLocked) {
        setTimeout(() => {
          cameraControlsRef.current?.lock();
          setWasPointerLocked(false); // Reset the flag
        }, 100); // Small delay to ensure smooth transition
      }
      
    } catch (error) {
      console.error('Camera return transition failed:', error);
      setIsTransitioning(false);
    }
  };

  const handleInteraction = (type: string, data?: unknown) => {
    if (type === 'lamp') {
      setLampOn(prev => !prev);
      console.log('Lamp toggled:', !lampOn);
    } else if (type === 'detective') {
      console.log('Detective character clicked');
      // Add detective interaction logic here
    } else {
      onInteraction(type, data);
    }
  };

  const handleToggleDetectiveMode = async () => {
    if (isTransitioning || showBoardContent) return;

    setIsTransitioning(true);

    if (!isDetectiveMode) {
      // Entering detective mode - snap to detective position
      if (cameraControlsRef.current) {
        const currentPosition = cameraControlsRef.current.camera.position.clone();
        const currentTarget = new THREE.Vector3();
        cameraControlsRef.current.getTarget(currentTarget);

        setOriginalCameraState({
          position: currentPosition,
          target: currentTarget
        });

        // Snap camera to detective position
        await cameraControlsRef.current.setLookAt(
          detectivePosition.x, detectivePosition.y, detectivePosition.z,
          detectivePosition.x, detectivePosition.y, detectivePosition.z - 1,
          true // smooth transition
        );
      }
      setIsDetectiveMode(true);
    } else {
      // Exiting detective mode - return to previous position
      if (originalCameraState && cameraControlsRef.current) {
        await cameraControlsRef.current.setLookAt(
          originalCameraState.position.x,
          originalCameraState.position.y,
          originalCameraState.position.z,
          originalCameraState.target.x,
          originalCameraState.target.y,
          originalCameraState.target.z,
          true
        );
        setOriginalCameraState(null);
      }
      setIsDetectiveMode(false);
    }

    setIsTransitioning(false);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        handleToggleDetectiveMode();
      } else if (event.key === 'r' || event.key === 'R') {
        // Only handle R if not in pointer lock mode
        if (!document.pointerLockElement) {
          event.preventDefault();
          if (showBoardContent) {
            handleBoardContentClose();
          } else {
            handleBoardClick();
          }
        }
      } else if (event.key === 'Escape' && showBoardContent) {
        event.preventDefault();
        handleBoardContentClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showBoardContent, isTransitioning, originalCameraState, isDetectiveMode]);

  return (
    <div className="w-full h-screen bg-noir-shadow">
      <Canvas 
        shadows 
        camera={{ position: [0, 2, 5], fov: 75 }}
        onCreated={({ gl }) => {
          gl.domElement.style.cursor = 'crosshair';
        }}
      >
        <EnhancedCameraControls
          ref={cameraControlsRef as unknown as React.Ref<CameraControlsRef>}
          isTransitioning={isTransitioning}
          showBoardContent={showBoardContent}
          isDetectiveMode={isDetectiveMode}
        />
        <Lighting lampOn={lampOn} />
        <DetectiveOfficeScene
          onInteraction={handleInteraction}
          lampOn={lampOn}
          cameraControlsRef={cameraControlsRef}
          onBoardClick={handleBoardClick}
          onCaseFileClick={onCaseFileClick}
          showBoardContent={showBoardContent}
          selectedCaseFile={selectedCaseFile}
          overlayVisible={overlayVisible}
          onBoardContentClose={handleBoardContentClose}
          isDetectiveMode={isDetectiveMode}
        />
      </Canvas>

      {/* Detective Mode Indicator */}
      {isDetectiveMode && (
        <div className="absolute top-4 left-4 text-detective-glow text-lg font-bold animate-detective-glow">
          DETECTIVE MODE
        </div>
      )}

      {/* Lamp Status Indicator */}
      <div className="absolute top-4 right-4 text-detective-glow text-sm">
        Banker's Lamp: {lampOn ? 'ON' : 'OFF'}
      </div>

      {/* Enhanced Controls Hint */}
      <div className="absolute bottom-4 left-4 text-detective-paper text-sm space-y-1">
        <p>WASD - Move • Click Empty Area - Enable Mouse Look • {!isDetectiveMode && 'Space/Shift - Up/Down • '}Tab - Toggle Detective Mode</p>
        <p>R - Resume Board • Click Board - Open Resume • ESC - Close Modal</p>
      </div>

    </div>
  );
});

DetectiveOffice.displayName = 'DetectiveOffice';