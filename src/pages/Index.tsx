import { useState } from 'react';
import { DetectiveOffice } from '@/components/DetectiveOffice';
import { ResumeOverlay } from '@/components/ResumeOverlay';
import { DetectiveErrorBoundary } from '@/components/DetectiveErrorBoundary';

const Index = () => {
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);

  const handleInteraction = (type: string, data?: any) => {
    switch (type) {
      case 'lamp':
        // Toggle lamp glow effect
        console.log('Banker lamp clicked');
        break;
      case 'typewriter':
        setActiveOverlay('typewriter');
        break;
      case 'board':
        setActiveOverlay(data);
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

  return (
    <div className="w-full h-screen overflow-hidden">
      <DetectiveErrorBoundary>
        <DetectiveOffice onInteraction={handleInteraction} />
      </DetectiveErrorBoundary>
      <ResumeOverlay content={activeOverlay} onClose={handleCloseOverlay} />
    </div>
  );
};

export default Index;
