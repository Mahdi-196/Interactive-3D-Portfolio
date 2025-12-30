import { useEffect, useState } from 'react';

/**
 * Intro overlay that appears on first visit
 * Film noir styled welcome animation
 */
interface IntroOverlayProps {
  onComplete: () => void;
  isManualTrigger?: boolean; // True when triggered by '999' keypress
}

export const IntroOverlay = ({ onComplete, isManualTrigger = false }: IntroOverlayProps) => {
  const [phase, setPhase] = useState<'hidden' | 'fadeIn' | 'show' | 'fadeOut'>('show');
  const [lineExpanded, setLineExpanded] = useState(false);
  const [showText, setShowText] = useState(false);

  console.log('IntroOverlay rendering - phase:', phase, 'lineExpanded:', lineExpanded, 'showText:', showText);

  useEffect(() => {
    console.log('IntroOverlay mounted - isManualTrigger:', isManualTrigger);
    if (isManualTrigger) {
      // Manual trigger - show immediately and stay until skip
      setPhase('show');
      setLineExpanded(true);
      setShowText(true);
      // No auto-close for manual trigger
      return;
    }

    // Auto trigger - show immediately with animations, then auto-close after 6 seconds
    // Start animations immediately
    const lineTimer = setTimeout(() => {
      setLineExpanded(true);
    }, 100);

    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 300);

    const fadeOutTimer = setTimeout(() => {
      setPhase('fadeOut');
    }, 5000);

    const completeTimer = setTimeout(() => {
      console.log('IntroOverlay completing and calling onComplete');
      onComplete();
    }, 6000);

    return () => {
      clearTimeout(lineTimer);
      clearTimeout(textTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, isManualTrigger]);

  if (phase === 'hidden') return null;

  const getOverlayOpacity = () => {
    if (phase === 'fadeIn') return 'opacity-0';
    if (phase === 'show') return 'opacity-100';
    return 'opacity-0';
  };

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 transition-opacity duration-1000 ${getOverlayOpacity()}`} style={{ pointerEvents: 'auto' }}>
      {/* Animated vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-noir-shadow/70 to-black animate-pulse" style={{ animationDuration: '4s' }} />

      {/* Spotlight effect */}
      <div className="absolute inset-0 bg-gradient-radial from-detective-glow/5 via-transparent to-transparent" />

      {/* Main content container */}
      <div className="relative z-10 text-center px-8 max-w-4xl">
        {/* Main title with staggered animation */}
        <div className={`space-y-6 transition-all duration-1000 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="space-y-4">
            <h1 className="text-7xl md:text-8xl font-bold text-detective-glow tracking-widest drop-shadow-[0_0_10px_rgba(218,165,32,0.3)]">
              HI, I'M MAHDI
            </h1>
          </div>

          {/* Animated underline */}
          <div className="flex justify-center">
            <div className="h-1 bg-gradient-to-r from-transparent via-detective-glow/60 to-transparent" style={{ width: '300px' }} />
          </div>
        </div>

        {/* Subtitle with delayed entrance */}
        <div className={`mt-12 space-y-8 transition-all duration-1000 delay-300 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-4xl text-detective-paper tracking-wide font-light drop-shadow-[0_0_20px_rgba(245,222,179,0.3)]">
            Welcome to my Sherlock Holmes themed interactive resume
          </p>

          {/* Instructions with typewriter effect */}
          <div className="space-y-4 text-detective-paper/90 text-2xl font-light max-w-2xl mx-auto">
            <p className="drop-shadow-[0_0_10px_rgba(245,222,179,0.2)]" style={{ animation: 'fadeIn 0.8s ease-out 0.5s both' }}>
              WASD to move • Click R for board
            </p>
          </div>
        </div>
      </div>

      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <div className="w-full h-full bg-repeat animate-flicker" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }} />
      </div>

      {/* Spotlight rays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-detective-glow/20 to-transparent opacity-50 animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-0 left-1/3 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-detective-glow/10 to-transparent opacity-30 animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
        <div className="absolute top-0 left-2/3 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-detective-glow/10 to-transparent opacity-30 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
      </div>
    </div>
  );
};
