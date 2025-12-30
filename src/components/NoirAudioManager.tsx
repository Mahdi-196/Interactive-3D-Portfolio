/**
 * Noir Audio Manager - Atmospheric 1930s detective office soundscape
 * Jazz background music with occasional thunder for immersive atmosphere
 */
import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface NoirAudioManagerProps {
  enabled?: boolean;
  masterVolume?: number;
}

export const NoirAudioManager = ({
  enabled = true,
  masterVolume = 0.3
}: NoirAudioManagerProps) => {
  const { camera } = useThree();
  const listenerRef = useRef<THREE.AudioListener | null>(null);
  const jazzSoundRef = useRef<THREE.Audio | null>(null);
  const thunderSoundRef = useRef<THREE.Audio | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const thunderTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Create audio listener attached to camera
    const listener = new THREE.AudioListener();
    camera.add(listener);
    listenerRef.current = listener;

    // Resume audio context on user interaction (browser autoplay policy)
    const resumeAudio = () => {
      if (listener.context.state === 'suspended') {
        listener.context.resume().then(() => {
          console.log('🎵 Audio context resumed - music should now be audible');
        });
      }
    };

    // Listen for any user interaction to resume audio
    window.addEventListener('click', resumeAudio, { once: true });
    window.addEventListener('keydown', resumeAudio, { once: true });

    // Create audio loader
    const audioLoader = new THREE.AudioLoader();

    // Create audio objects
    const jazzSound = new THREE.Audio(listener);
    const thunderSound = new THREE.Audio(listener);

    jazzSoundRef.current = jazzSound;
    thunderSoundRef.current = thunderSound;

    let loadedCount = 0;
    const totalSounds = 2; // Jazz + Thunder

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalSounds) {
        setIsLoaded(true);
        console.log('🎵 All noir audio loaded successfully');
      }
    };

    // Load jazz loop (background music - main ambience)
    audioLoader.load(
      '/564001__migfus20__jazz-background-music-loop.mp3',
      (buffer) => {
        jazzSound.setBuffer(buffer);
        jazzSound.setLoop(true);
        jazzSound.setVolume(masterVolume * 0.6); // Start at full volume
        jazzSound.play(); // Start playing immediately
        console.log('🎵 Jazz started playing');
        checkAllLoaded();
      },
      undefined,
      (error) => console.error('Failed to load jazz audio:', error)
    );

    // Load thunder (occasional dramatic effect)
    audioLoader.load(
      '/17054__speedy__cool_thunder_clap.wav',
      (buffer) => {
        thunderSound.setBuffer(buffer);
        thunderSound.setLoop(false);
        thunderSound.setVolume(masterVolume * 0.35); // 35% of master - noticeable but not jarring
        checkAllLoaded();
      },
      undefined,
      (error) => console.error('Failed to load thunder audio:', error)
    );

    // Schedule random thunder strikes (every 30-90 seconds)
    const scheduleThunder = () => {
      // Random interval between 30-90 seconds
      const nextThunderDelay = 30000 + Math.random() * 60000;

      thunderTimeoutRef.current = setTimeout(() => {
        if (thunderSound.buffer && !thunderSound.isPlaying) {
          // Add slight volume variation for realism (±15%)
          const volumeVariation = 0.85 + Math.random() * 0.3;
          thunderSound.setVolume(masterVolume * 0.35 * volumeVariation);

          thunderSound.play();

          // Schedule next thunder
          scheduleThunder();
        }
      }, nextThunderDelay);
    };

    // Start thunder scheduling after initial load
    setTimeout(() => scheduleThunder(), 10000); // First thunder after 10 seconds

    // Cleanup
    return () => {
      if (thunderTimeoutRef.current) {
        clearTimeout(thunderTimeoutRef.current);
      }

      window.removeEventListener('click', resumeAudio);
      window.removeEventListener('keydown', resumeAudio);

      jazzSound.stop();
      thunderSound.stop();

      if (listenerRef.current && camera) {
        camera.remove(listenerRef.current);
      }
    };
  }, [camera, enabled, masterVolume]);

  // Jazz stays consistent (no volume variation needed for music)

  // This component doesn't render anything visual
  return null;
};
