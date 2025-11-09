import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ANIMATION } from '../constants';
import type { CaseFile } from '../types';

/**
 * Custom hook to handle smooth fade animations for preview and detail groups
 * Manages opacity transitions when switching between case file views
 */
export const useFadeAnimation = (selectedCaseFile: CaseFile) => {
  // Refs for the preview and detail groups
  const previewGroupRef = useRef<THREE.Group>(null);
  const detailGroupRef = useRef<THREE.Group>(null);

  // Target and current opacity tracking
  const previewTargetOpacity = useRef(1);
  const previewCurrentOpacity = useRef(1);
  const detailTargetOpacity = useRef(0);
  const detailCurrentOpacity = useRef(0);

  // Animate opacity smoothly on each frame
  useFrame((state, delta) => {
    // Fade out preview when detail is shown, fade in when not
    previewTargetOpacity.current = selectedCaseFile ? 0 : 1;
    previewCurrentOpacity.current +=
      (previewTargetOpacity.current - previewCurrentOpacity.current) * delta * ANIMATION.fadeSpeed.preview;

    // Fade in detail when case file selected, fade out when not
    detailTargetOpacity.current = selectedCaseFile ? 1 : 0;
    detailCurrentOpacity.current +=
      (detailTargetOpacity.current - detailCurrentOpacity.current) * delta * ANIMATION.fadeSpeed.detail;

    // Apply opacity to all materials in the preview group
    if (previewGroupRef.current) {
      // Hide completely when opacity is very low (optimization)
      previewGroupRef.current.visible = previewCurrentOpacity.current > ANIMATION.opacityThreshold;

      previewGroupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).material) {
          const mat = (child as THREE.Mesh).material;
          if (Array.isArray(mat)) {
            mat.forEach((m) => {
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

    // Apply opacity to all materials in the detail group
    if (detailGroupRef.current) {
      // Hide completely when opacity is very low (optimization)
      detailGroupRef.current.visible = detailCurrentOpacity.current > ANIMATION.opacityThreshold;

      detailGroupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).material) {
          const mat = (child as THREE.Mesh).material;
          if (Array.isArray(mat)) {
            mat.forEach((m) => {
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

  return {
    previewGroupRef,
    detailGroupRef,
  };
};
