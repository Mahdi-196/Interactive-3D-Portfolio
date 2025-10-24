import { useState, useRef } from 'react';
import { DetectiveOffice, DetectiveOfficeRef } from '@/components/DetectiveOffice';
import { ResumeOverlay } from '@/components/ResumeOverlay';
import { BoardOverlay } from '@/components/BoardOverlay';
import { DetectiveErrorBoundary } from '@/components/DetectiveErrorBoundary';

const Index = () => {
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);
  const [isBoardOpen, setIsBoardOpen] = useState(false);
  const detectiveOfficeRef = useRef<DetectiveOfficeRef>(null);

  const handleInteraction = (type: string, data?: any) => {
    switch (type) {
      case 'lamp':
        // Toggle lamp glow effect
        console.log('Banker lamp clicked');
        break;
      case 'typewriter':
        setActiveOverlay('typewriter');
        break;
      case 'cat':
        setActiveOverlay('cat');
        break;
      default:
        console.log('Interaction:', type, data);
    }
  };

  const handleCloseOverlay = () => {
    setActiveOverlay(null);
  };

  // Called when camera zoom to board completes
  const handleBoardZoomComplete = () => {
    console.log('Board zoom complete! Opening overlay...');
    setIsBoardOpen(true);
  };

  // Called when user closes the board overlay
  const handleCloseBoardOverlay = () => {
    setIsBoardOpen(false);
    // Trigger camera zoom out in DetectiveOffice
    detectiveOfficeRef.current?.zoomOutFromBoard();
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <DetectiveErrorBoundary>
        <DetectiveOffice
          ref={detectiveOfficeRef}
          onInteraction={handleInteraction}
          onBoardZoomComplete={handleBoardZoomComplete}
        />
      </DetectiveErrorBoundary>
      <ResumeOverlay content={activeOverlay} onClose={handleCloseOverlay} />
      <BoardOverlay isOpen={isBoardOpen} onClose={handleCloseBoardOverlay} />
    </div>
  );
};

export default Index;
