import * as THREE from 'three';
import { OfficeRoom } from './OfficeRoom';
import { ExecutiveDesk } from './ExecutiveDesk';
import { OfficeWindow } from './OfficeWindow';
import { VictorianChair } from './VictorianChair';
import { InteractiveDetectiveBoard } from './InteractiveDetectiveBoard';
import { Bookshelf } from './Bookshelf';
import { VictorianDoor } from './VictorianDoor';
import { VictorianChandelier } from './VictorianChandelier';
import { FirstPersonDetectiveBody } from './FirstPersonDetectiveBody';

interface DetectiveOfficeSceneProps {
  onInteraction: (type: string, data?: unknown) => void;
  lampOn: boolean;
  cameraControlsRef: React.RefObject<any>;
  onBoardClick: () => void;
  onCaseFileClick?: (caseFile: 'about' | 'education' | 'skills' | 'projects' | null) => void;
  showBoardContent?: boolean;
  selectedCaseFile?: 'about' | 'education' | 'skills' | 'projects' | null;
  overlayVisible?: boolean;
  onBoardContentClose?: () => void;
  isDetectiveMode?: boolean;
}

export const DetectiveOfficeScene = ({
  onInteraction,
  lampOn,
  cameraControlsRef,
  onBoardClick,
  onCaseFileClick,
  showBoardContent = false,
  selectedCaseFile = null,
  overlayVisible = false,
  onBoardContentClose,
  isDetectiveMode = false
}: DetectiveOfficeSceneProps) => {
  return (
    <>
      {/* Office room structure (walls, floor, ceiling) */}
      <OfficeRoom />

      {/* Central desk only */}
      <ExecutiveDesk onInteraction={onInteraction} />

      {/* Window filling the wall opening */}
      <OfficeWindow />
      
      {/* Desk Chair */}
      <VictorianChair position={[0, 0, -3]} rotation={[0, 0, 0]} />
      
      {/* Interactive Detective Board */}
      <InteractiveDetectiveBoard
        onInteraction={onInteraction}
        onBoardClick={onBoardClick}
        onCaseFileClick={onCaseFileClick}
        showContent={showBoardContent}
        selectedCaseFile={selectedCaseFile}
        overlayVisible={overlayVisible}
        onContentClose={onBoardContentClose}
      />
      
      {/* Asymmetrical Bookshelves - Left wall (3 bookshelves with gaps) */}
      <Bookshelf position={[-9.0, 0, -6]} rotation={[0, Math.PI / 2, 0]} variant={1} />
      <Bookshelf position={[-9.0, 0, 6]} rotation={[0, Math.PI / 2, 0]} variant={3} />
      
      {/* Right wall (3 touching bookshelves) */}
      <Bookshelf position={[9.0, 0, -3]} rotation={[0, -Math.PI / 2, 0]} variant={5} />
      <Bookshelf position={[9.0, 0, 0]} rotation={[0, -Math.PI / 2, 0]} variant={3} />
      <Bookshelf position={[9.0, 0, 3]} rotation={[0, -Math.PI / 2, 0]} variant={6} />
      
      {/* Corner bookshelf - L-shaped arrangement */}
      <Bookshelf position={[-8, 0, -9]} rotation={[0, 0, 0]} variant={7} />
      
      {/* Victorian Door on right wall */}
      <VictorianDoor position={[9.5, 0, 8]} rotation={[0, -Math.PI / 2, 0]} onInteraction={onInteraction} />

      {/* Victorian Chandelier - lowered 10% for smaller room */}
      <VictorianChandelier position={[0, 8.1, 2]} isLit={lampOn} />

      {/* First-person detective body view (visible when in detective mode) */}
      {isDetectiveMode && <FirstPersonDetectiveBody />}




    </>
  );
};