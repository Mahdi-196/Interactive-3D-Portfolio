import { CollisionBox, CollisionResult } from '@/types/three';

/**
 * Collision world definition for the Detective Office scene
 * CHARACTER HAS COLLISION RADIUS - Objects act as static boundaries
 * Player radius: 0.75 units (cylinder around character)
 */
export const DETECTIVE_OFFICE_COLLISIONS: CollisionBox[] = [
  // Room walls (with collision buffer)
  {
    id: 'wall_back',
    minX: -10, maxX: 10,
    minY: 0, maxY: 9,
    minZ: -10.2, maxZ: -9.8,
    isStatic: true
  },
  {
    id: 'wall_front',
    minX: -10, maxX: 10,
    minY: 0, maxY: 9,
    minZ: 9.8, maxZ: 10.2,
    isStatic: true
  },
  {
    id: 'wall_left',
    minX: -10.2, maxX: -9.8,
    minY: 0, maxY: 9,
    minZ: -10, maxZ: 10,
    isStatic: true
  },
  {
    id: 'wall_right',
    minX: 9.8, maxX: 10.2,
    minY: 0, maxY: 9,
    minZ: -10, maxZ: 10,
    isStatic: true
  },

  // Couch at [0, 0, 1.5] (local) in group with scale [1.6, 1, 1.3]
  // World position: [0, 0, 1.95]
  // Base width 3.2 * 1.6 = 5.12, depth 1.1 * 1.3 = 1.43
  {
    id: 'couch',
    minX: -2.56, maxX: 2.56,
    minY: 0, maxY: 1.7,
    minZ: 1.235, maxZ: 2.665,
    isStatic: true
  },

  // Victorian armchair at [-4.0, 0, 3.5] rotated π/2 - π*0.30
  {
    id: 'armchair',
    minX: -4.6, maxX: -3.4,
    minY: 0, maxY: 1.7,
    minZ: 2.9, maxZ: 4.1,
    isStatic: true
  },

  // Detective Desk at [-5.2, 0, -2.5] (local) in group with scale 1.7
  // World position: [-8.84, 0, -4.25]
  // Original ~2.4×1.3 scaled to ~4.08×2.21, rotated makes depth X-axis, width Z-axis
  {
    id: 'detective_desk',
    minX: -9.95, maxX: -7.73,
    minY: 0, maxY: 1.53,
    minZ: -6.29, maxZ: -2.21,
    isStatic: true
  },

  // Detective Office Chair at [-3.8, 0, -2.5] (local) in group with scale 1.7
  // World position: [-6.46, 0, -4.25]
  // Circular base ~0.7 diameter scaled to ~1.19, radius ~0.595
  {
    id: 'detective_chair',
    minX: -7.055, maxX: -5.865,
    minY: 0, maxY: 2.72,
    minZ: -4.845, maxZ: -3.655,
    isStatic: true
  },

  // Filing Cabinet at [-7.5, 0, -6.5] scaled [1.15, 1, 1.5]
  // Base ~0.5×0.6 scaled to ~0.575×0.9
  {
    id: 'filing_cabinet_1',
    minX: -7.79, maxX: -7.21,
    minY: 0, maxY: 1.5,
    minZ: -6.95, maxZ: -6.05,
    isStatic: true
  },

  // Filing Cabinet at [-8.5, 0, -5.9] scaled [1.15, 1, 1.5] rotated π/2
  // Rotated: depth becomes X, width becomes Z
  {
    id: 'filing_cabinet_2',
    minX: -8.95, maxX: -8.05,
    minY: 0, maxY: 1.5,
    minZ: -6.19, maxZ: -5.61,
    isStatic: true
  },

  // Filing Cabinet at [-8.5, 0, -4.9] scaled [1.15, 1, 1.5] rotated π/2
  {
    id: 'filing_cabinet_3',
    minX: -8.95, maxX: -8.05,
    minY: 0, maxY: 1.5,
    minZ: -5.19, maxZ: -4.61,
    isStatic: true
  },

  // Filing Cabinet (card catalog) at [-9.8, 0, -1.5] scaled 1.15 rotated π/2
  {
    id: 'filing_cabinet_card',
    minX: -10.15, maxX: -9.45,
    minY: 0, maxY: 1.5,
    minZ: -1.79, maxZ: -1.21,
    isStatic: true
  },

  // Filing Cabinet (lateral) at [9.4, 0, 0] scaled [1, 1, 3] rotated -π/2
  // Wide lateral cabinet stretched 3x along Z-axis
  {
    id: 'filing_cabinet_lateral',
    minX: 8.95, maxX: 9.85,
    minY: 0, maxY: 1.0,
    minZ: -0.9, maxZ: 0.9,
    isStatic: true
  },

  // MergedBookshelf at [9.0, 0, -6] rotated -π/2
  // Width 1.8, depth 0.8 rotated = depth in X, width in Z
  {
    id: 'bookshelf_right_1',
    minX: 8.6, maxX: 9.4,
    minY: 0, maxY: 5,
    minZ: -6.9, maxZ: -5.1,
    isStatic: true
  },

  // MergedBookshelf at [9.0, 0, 0] rotated -π/2
  // Width 1.8, depth 0.8 rotated = depth in X, width in Z
  {
    id: 'bookshelf_right_2',
    minX: 8.6, maxX: 9.4,
    minY: 0, maxY: 5,
    minZ: -0.9, maxZ: 0.9,
    isStatic: true
  },

  // Victorian Door at [9.95, 0, 7.5] rotated -π/2
  {
    id: 'door',
    minX: 9.75, maxX: 10.15,
    minY: 0, maxY: 3,
    minZ: 7.0, maxZ: 8.0,
    isStatic: true
  },

  // Wooden Coffee Table at [0, 0, 3.8]
  // Large rectangular: ~2.64 × 1.54
  {
    id: 'coffee_table',
    minX: -1.32, maxX: 1.32,
    minY: 0, maxY: 0.5,
    minZ: 3.03, maxZ: 4.57,
    isStatic: true
  },

  // Wooden End Table 1 at [-5.5, 0, 4.5]
  // Rectangular: ~0.7 × 0.5
  {
    id: 'end_table_1',
    minX: -5.85, maxX: -5.15,
    minY: 0, maxY: 0.65,
    minZ: 4.25, maxZ: 4.75,
    isStatic: true
  },

  // Wooden End Table 2 at [-3.3, 0, 2.5] rotated π/4
  // Diagonal orientation, use larger bounding box
  {
    id: 'end_table_2',
    minX: -3.75, maxX: -2.85,
    minY: 0, maxY: 0.65,
    minZ: 2.05, maxZ: 2.95,
    isStatic: true
  },
];

/**
 * Checks if two axis-aligned bounding boxes intersect on the XZ plane
 * Used for basic collision detection in 2D horizontal space
 */
function aabbIntersects(
  playerMinX: number,
  playerMaxX: number,
  playerMinZ: number,
  playerMaxZ: number,
  box: CollisionBox
): boolean {
  return (
    playerMinX < box.maxX &&
    playerMaxX > box.minX &&
    playerMinZ < box.maxZ &&
    playerMaxZ > box.minZ
  );
}

/**
 * Resolves collision by implementing sliding behavior along obstacle surfaces
 * If diagonal movement hits an obstacle, tries moving along one axis at a time
 * This creates smooth "sliding along walls" movement
 *
 * IMPORTANT: Checks against ALL obstacles to prevent getting stuck in corners
 */
function resolveCollisionWithSliding(
  currentX: number,
  currentZ: number,
  newX: number,
  newZ: number,
  playerRadius: number,
  obstacle: CollisionBox
): CollisionResult {
  // Try moving only in X direction (slide along Z axis)
  const xOnlyMinX = newX - playerRadius;
  const xOnlyMaxX = newX + playerRadius;
  const xOnlyMinZ = currentZ - playerRadius;
  const xOnlyMaxZ = currentZ + playerRadius;

  // Check X-only movement against ALL obstacles, not just the current one
  let xOnlySafe = true;
  for (const box of DETECTIVE_OFFICE_COLLISIONS) {
    if (aabbIntersects(xOnlyMinX, xOnlyMaxX, xOnlyMinZ, xOnlyMaxZ, box)) {
      xOnlySafe = false;
      break;
    }
  }

  if (xOnlySafe) {
    // X movement is safe against all obstacles, cancel Z movement
    return {
      collided: true,
      correctedX: newX,
      correctedZ: currentZ,
      collidedWith: obstacle.id,
    };
  }

  // Try moving only in Z direction (slide along X axis)
  const zOnlyMinX = currentX - playerRadius;
  const zOnlyMaxX = currentX + playerRadius;
  const zOnlyMinZ = newZ - playerRadius;
  const zOnlyMaxZ = newZ + playerRadius;

  // Check Z-only movement against ALL obstacles
  let zOnlySafe = true;
  for (const box of DETECTIVE_OFFICE_COLLISIONS) {
    if (aabbIntersects(zOnlyMinX, zOnlyMaxX, zOnlyMinZ, zOnlyMaxZ, box)) {
      zOnlySafe = false;
      break;
    }
  }

  if (zOnlySafe) {
    // Z movement is safe against all obstacles, cancel X movement
    return {
      collided: true,
      correctedX: currentX,
      correctedZ: newZ,
      collidedWith: obstacle.id,
    };
  }

  // Both axes are blocked by obstacles - prevent all movement
  return {
    collided: true,
    correctedX: currentX,
    correctedZ: currentZ,
    collidedWith: obstacle.id,
  };
}

/**
 * Main collision detection function
 * Checks if moving from current position to new position causes collision
 * Returns corrected position with sliding behavior if collision detected
 *
 * @param currentX - Current X position
 * @param currentZ - Current Z position
 * @param newX - Intended new X position
 * @param newZ - Intended new Z position
 * @param playerRadius - Collision radius around player (default: 0.75 units)
 * @returns CollisionResult with corrected position and collision status
 */
export function checkCollision(
  currentX: number,
  currentZ: number,
  newX: number,
  newZ: number,
  playerRadius: number = 0.75
): CollisionResult {
  // Create player AABB from intended position and radius
  const playerMinX = newX - playerRadius;
  const playerMaxX = newX + playerRadius;
  const playerMinZ = newZ - playerRadius;
  const playerMaxZ = newZ + playerRadius;

  // Check collision against each static object in the scene
  for (const box of DETECTIVE_OFFICE_COLLISIONS) {
    if (aabbIntersects(playerMinX, playerMaxX, playerMinZ, playerMaxZ, box)) {
      // Collision detected - resolve with sliding behavior
      return resolveCollisionWithSliding(
        currentX,
        currentZ,
        newX,
        newZ,
        playerRadius,
        box
      );
    }
  }

  // No collision - movement is valid
  return {
    collided: false,
    correctedX: newX,
    correctedZ: newZ,
  };
}
