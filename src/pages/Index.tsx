import { useState, useRef } from 'react';
import { DetectiveOffice, DetectiveOfficeRef } from '@/components/DetectiveOffice';
import { ResumeOverlay } from '@/components/ResumeOverlay';
import { DetectiveErrorBoundary } from '@/components/DetectiveErrorBoundary';

const Index = () => {
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);
  const [selectedCaseFile, setSelectedCaseFile] = useState<'about' | 'education' | 'skills' | 'projects' | null>(null);
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

  // Called when user clicks on a case file on the 3D board (or back button)
  const handleCaseFileClick = (caseFile: 'about' | 'education' | 'skills' | 'projects' | null) => {
    console.log('Case file clicked:', caseFile);
    setSelectedCaseFile(caseFile);
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <DetectiveErrorBoundary>
        <DetectiveOffice
          ref={detectiveOfficeRef}
          onInteraction={handleInteraction}
          onCaseFileClick={handleCaseFileClick}
          selectedCaseFile={selectedCaseFile}
          overlayVisible={selectedCaseFile !== null}
        />
      </DetectiveErrorBoundary>
      <ResumeOverlay content={activeOverlay} onClose={handleCloseOverlay} />
    </div>
  );
};

export default Index;
