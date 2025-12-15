import * as THREE from 'three';
import { RealisticBook, generateRealisticBook } from './RealisticBook';

/**
 * Victorian Bookshelf - Ornate 1930s library style with crown molding and glass doors
 * Features decorative carvings, brass fixtures, and authentic aged book details
 */
export const VictorianBookshelf = ({
  position,
  rotation = [0, 0, 0],
  variant = 0
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  variant?: number;
}) => {
  // Seeded random for consistent book generation
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // Period-appropriate book colors (rich, aged leather tones)
  const bookColors = [
    "#5c2e1a", "#2d1b00", "#6b3410", "#8b4513", "#654321", // Browns (leather)
    "#1a3d1a", "#2e4f2e", "#3d5941", // Dark greens
    "#1a1a3d", "#2e2e5f", "#3d3d6b", // Navy blues
    "#4a1a1a", "#6b2e2e", "#8b4545", // Burgundy/Maroons
    "#3d3d1a", "#5f5f2e", "#7a7a45", // Olive/Tan
    "#1a1a1a", "#2e2e2e", // Black
  ];

  const generateShelfBooks = (shelfIndex: number) => {
    const books = [];
    const bookCount = 18 + Math.floor(seededRandom(variant * 100 + shelfIndex * 10) * 12);

    for (let i = 0; i < bookCount; i++) {
      const seed = variant * 1000 + shelfIndex * 100 + i;
      const config = generateRealisticBook(seed, bookColors, 'victorian');

      // 15% chance of horizontal stacking
      const isHorizontal = seededRandom(seed + 50) < 0.15;

      books.push({ config, isHorizontal });
    }
    return books;
  };

  return (
    <group position={position} rotation={rotation}>
      {/* Base platform with carved detail */}
      <mesh position={[0, 0.15, -0.4]}>
        <boxGeometry args={[2.0, 0.3, 0.9]} />
        <meshStandardMaterial color="#3d2817" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Decorative base molding */}
      <mesh position={[0, 0.32, -0.4]}>
        <boxGeometry args={[2.05, 0.04, 0.95]} />
        <meshStandardMaterial color="#2d1f12" roughness={0.7} />
      </mesh>

      {/* Main frame - left side with ornate details */}
      <group position={[-0.95, 2.8, -0.4]}>
        <mesh>
          <boxGeometry args={[0.15, 5.2, 0.85]} />
          <meshStandardMaterial color="#3d2817" roughness={0.75} />
        </mesh>
        {/* Vertical carved accent */}
        <mesh position={[0.06, 0, 0]}>
          <boxGeometry args={[0.04, 5.0, 0.02]} />
          <meshStandardMaterial color="#2d1f12" roughness={0.6} />
        </mesh>
      </group>

      {/* Main frame - right side */}
      <group position={[0.95, 2.8, -0.4]}>
        <mesh>
          <boxGeometry args={[0.15, 5.2, 0.85]} />
          <meshStandardMaterial color="#3d2817" roughness={0.75} />
        </mesh>
        <mesh position={[-0.06, 0, 0]}>
          <boxGeometry args={[0.04, 5.0, 0.02]} />
          <meshStandardMaterial color="#2d1f12" roughness={0.6} />
        </mesh>
      </group>

      {/* Back panel */}
      <mesh position={[0, 2.8, -0.82]}>
        <boxGeometry args={[1.9, 5.2, 0.06]} />
        <meshStandardMaterial color="#2d1f12" roughness={0.85} />
      </mesh>

      {/* Crown molding top */}
      <group position={[0, 5.45, -0.4]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.1, 0.15, 0.9]} />
          <meshStandardMaterial color="#3d2817" roughness={0.7} />
        </mesh>
        {/* Decorative crown */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[2.2, 0.08, 1.0]} />
          <meshStandardMaterial color="#2d1f12" roughness={0.65} />
        </mesh>
        {/* Ornamental top edge */}
        <mesh position={[0, 0.15, 0.45]} rotation={[Math.PI / 4, 0, 0]}>
          <boxGeometry args={[2.2, 0.04, 0.04]} />
          <meshStandardMaterial color="#1f1608" roughness={0.6} />
        </mesh>
      </group>

      {/* Shelves - 4 substantial shelves */}
      {[1.1, 2.2, 3.3, 4.4].map((y, i) => (
        <group key={`shelf-${i}`}>
          <mesh position={[0, y, -0.4]}>
            <boxGeometry args={[1.8, 0.06, 0.78]} />
            <meshStandardMaterial color="#4a3426" roughness={0.7} />
          </mesh>
          {/* Shelf front edge detail */}
          <mesh position={[0, y - 0.02, 0.02]}>
            <boxGeometry args={[1.8, 0.02, 0.03]} />
            <meshStandardMaterial color="#3d2817" roughness={0.65} />
          </mesh>
        </group>
      ))}

      {/* Glass door frames (2 doors) */}
      <group>
        {/* Left door frame */}
        <mesh position={[-0.45, 2.8, 0.05]}>
          <boxGeometry args={[0.04, 5.0, 0.04]} />
          <meshStandardMaterial color="#2d1f12" roughness={0.5} />
        </mesh>
        {/* Right door frame */}
        <mesh position={[0.45, 2.8, 0.05]}>
          <boxGeometry args={[0.04, 5.0, 0.04]} />
          <meshStandardMaterial color="#2d1f12" roughness={0.5} />
        </mesh>
        {/* Center divider */}
        <mesh position={[0, 2.8, 0.05]}>
          <boxGeometry args={[0.03, 5.0, 0.04]} />
          <meshStandardMaterial color="#2d1f12" roughness={0.5} />
        </mesh>

        {/* Glass panels - slightly tinted */}
        <mesh position={[-0.45, 2.8, 0.03]}>
          <boxGeometry args={[0.82, 4.9, 0.02]} />
          <meshStandardMaterial
            color="#1a1a1a"
            transparent
            opacity={0.15}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>
        <mesh position={[0.45, 2.8, 0.03]}>
          <boxGeometry args={[0.82, 4.9, 0.02]} />
          <meshStandardMaterial
            color="#1a1a1a"
            transparent
            opacity={0.15}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>
      </group>

      {/* Brass door handles */}
      <mesh position={[-0.7, 2.8, 0.08]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 0.08]} />
        <meshStandardMaterial color="#b8860b" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.7, 2.8, 0.08]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 0.08]} />
        <meshStandardMaterial color="#b8860b" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Books on each shelf */}
      {[1.1, 2.2, 3.3, 4.4].map((shelfY, shelfIndex) => {
        const shelfBooks = generateShelfBooks(shelfIndex);
        let currentX = -0.82;

        return (
          <group key={`books-${shelfIndex}`}>
            {shelfBooks.map((book, bookIndex) => {
              if (currentX > 0.85) return null;

              const xPos = currentX + book.config.thickness / 2;
              currentX += book.config.thickness + 0.008;

              const shelfTop = shelfY + 0.03;
              const bookCenterY = book.isHorizontal
                ? shelfTop + 0.08
                : shelfTop + book.config.height / 2;

              if (book.isHorizontal) {
                // Horizontal stacked books - rotate entire RealisticBook
                return (
                  <group key={`book-${shelfIndex}-${bookIndex}`} rotation={[0, 0, Math.PI / 2]}>
                    <RealisticBook
                      config={{
                        ...book.config,
                        lean: 0 // No lean for horizontal books
                      }}
                      position={[xPos + 0.1, bookCenterY, -0.3]}
                    />
                  </group>
                );
              }

              return (
                <RealisticBook
                  key={`book-${shelfIndex}-${bookIndex}`}
                  config={book.config}
                  position={[xPos, bookCenterY, -0.3]}
                />
              );
            })}
          </group>
        );
      })}

      {/* Decorative brass corner pieces */}
      {[
        [-0.95, 5.45, 0.4],
        [0.95, 5.45, 0.4],
        [-0.95, 0.35, 0.4],
        [0.95, 0.35, 0.4],
      ].map((pos, i) => (
        <mesh key={`corner-${i}`} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#8b7355" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
};
