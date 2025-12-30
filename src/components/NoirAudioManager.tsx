/**
 * Noir Audio Manager - Atmospheric 1930s detective office soundscape
 * Layers rain, jazz, and occasional thunder for immersive atmosphere
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
  const rainSoundRef = useRef<THREE.Audio | null>(null);
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

    // Create audio loader
    const audioLoader = new THREE.AudioLoader();

    // Create all audio objects
    const rainSound = new THREE.Audio(listener);
    const jazzSound = new THREE.Audio(listener);
    const thunderSound = new THREE.Audio(listener);

    rainSoundRef.current = rainSound;
    jazzSoundRef.current = jazzSound;
    thunderSoundRef.current = thunderSound;

    let loadedCount = 0;
    const totalSounds = 3;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalSounds) {
        setIsLoaded(true);
        console.log('🎵 All noir audio loaded successfully');
      }
    };

    // Load heavy rain ambience (primary layer - most prominent)
    audioLoader.load(
      '/276908__lwdickens__outdoor-ambience-rain-heavy-umbrella-fabric-traffic.wav',
      (buffer) => {
        rainSound.setBuffer(buffer);
        rainSound.setLoop(true);
        rainSound.setVolume(masterVolume * 0.5); // 50% of master - main ambience
        rainSound.play();
        checkAllLoaded();
      },
      undefined,
      (error) => console.error('Failed to load rain audio:', error)
    );

    // Load jazz loop (background music - very subtle)
    audioLoader.load(
      '/564001__migfus20__jazz-background-music-loop.mp3',
      (buffer) => {
        jazzSound.setBuffer(buffer);
        jazzSound.setLoop(true);
        jazzSound.setVolume(masterVolume * 0.15); // 15% of master - barely noticeable ambience
        // Start after rain settles in
        setTimeout(() => jazzSound.play(), 2000);
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

      rainSound.stop();
      jazzSound.stop();
      thunderSound.stop();

      if (listenerRef.current && camera) {
        camera.remove(listenerRef.current);
      }
    };
  }, [camera, enabled, masterVolume]);

  // Add subtle volume variations to prevent monotony
  useEffect(() => {
    if (!isLoaded || !enabled) return;

    const interval = setInterval(() => {
      // Subtle rain volume variation (±8%)
      if (rainSoundRef.current) {
        const rainVariation = 0.92 + Math.random() * 0.16;
        rainSoundRef.current.setVolume(masterVolume * 0.5 * rainVariation);
      }

      // Jazz stays consistent (no variation for music)
    }, 8000 + Math.random() * 4000); // Every 8-12 seconds

    return () => clearInterval(interval);
  }, [isLoaded, enabled, masterVolume]);

  // This component doesn't render anything visual
  return null;
};
