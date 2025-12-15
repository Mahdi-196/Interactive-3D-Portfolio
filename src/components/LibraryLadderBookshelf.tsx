import * as THREE from 'three';
import { RealisticBook, generateRealisticBook } from './RealisticBook';

/**
 * Library Ladder Bookshelf - Tall vintage library style with rolling ladder
 * Features industrial aesthetic with brass rails and aged wood
 */
export const LibraryLadderBookshelf = ({
  position,
  rotation = [0, 0, 0],
  variant = 0
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  variant?: number;
}) => {
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // Classical library book colors - well-worn, academic tones
  const bookColors = [
    "#3d2314", "#4a2c1a", "#5c3820", "#6b4226", // Warm browns
    "#1e3a1e", "#2a4a2a", "#365c36", // Deep greens
    "#1e1e3a", "#2a2a4a", "#36365c", // Navy blues
    "#3a1e1e", "#4a2a2a", "#5c3636", // Burgundies
    "#3a3a1e", "#4a4a2a", "#5c5c36", // Olive tones
    "#2d1a0d", "#3d2614", "#4d321b", // Dark leather
    "#0d0d0d", "#1a1a1a", // Near black
  ];

  const generateShelfBooks = (shelfIndex: number) => {
    const books = [];
    // Lower shelves have more books
    const bookCount = 22 + Math.floor(seededRandom(variant * 100 + shelfIndex * 10) * 8);

    for (let i = 0; i < bookCount; i++) {
      const seed = variant * 1000 + shelfIndex * 100 + i;
      let config = generateRealisticBook(seed, bookColors, 'library');

      // Make library books taller on average
      config = {
        ...config,
        height: config.height * 1.15, // 15% taller
        thickness: config.thickness * 1.1, // Slightly thicker
      };

      // 10% chance of oversized reference books
      const isOversized = seededRandom(seed + 70) < 0.1;
      if (isOversized) {
        config = {
          ...config,
          height: config.height * 1.4,
          thickness: config.thickness * 1.3,
        };
      }

      books.push({ config, isOversized });
    }
    return books;
  };

  return (
    <group position={position} rotation={rotation}>
      {/* Heavy base platform */}
      <mesh position={[0, 0.1, -0.45]}>
        <boxGeometry args={[2.2, 0.2, 1.0]} />
        <meshStandardMaterial color="#3d2817" roughness={0.85} />
      </mesh>

      {/* Base molding */}
      <mesh position={[0, 0.22, -0.45]}>
        <boxGeometry args={[2.25, 0.04, 1.05]} />
        <meshStandardMaterial color="#2d1f12" roughness={0.8} />
      </mesh>

      {/* Main vertical supports - industrial style */}
      <mesh position={[-1.0, 3.5, -0.45]}>
        <boxGeometry args={[0.18, 6.6, 0.95]} />
        <meshStandardMaterial color="#3d2817" roughness={0.8} />
      </mesh>
      <mesh position={[1.0, 3.5, -0.45]}>
        <boxGeometry args={[0.18, 6.6, 0.95]} />
        <meshStandardMaterial color="#3d2817" roughness={0.8} />
      </mesh>

      {/* Back panel - darker, aged wood */}
      <mesh position={[0, 3.5, -0.92]}>
        <boxGeometry args={[2.0, 6.6, 0.08]} />
        <meshStandardMaterial color="#2d1f12" roughness={0.9} />
      </mesh>

      {/* Wood grain detail on back */}
      {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
        <mesh key={`grain-${i}`} position={[x, 3.5, -0.88]}>
          <boxGeometry args={[0.015, 6.5, 0.01]} />
          <meshStandardMaterial color="#1f1608" roughness={0.85} />
        </mesh>
      ))}

      {/* Top with decorative corbels */}
      <mesh position={[0, 6.9, -0.45]}>
        <boxGeometry args={[2.2, 0.2, 1.0]} />
        <meshStandardMaterial color="#3d2817" roughness={0.8} />
      </mesh>

      {/* Shelves - 6 shelves for tall library feel */}
      {[1.0, 2.0, 3.0, 4.0, 5.0, 6.0].map((y, i) => (
        <group key={`shelf-${i}`}>
          <mesh position={[0, y, -0.45]}>
            <boxGeometry args={[1.82, 0.07, 0.82]} />
            <meshStandardMaterial color="#4a3426" roughness={0.75} />
          </mesh>
          {/* Shelf support brackets - industrial */}
          <mesh position={[-0.85, y - 0.05, 0.02]}>
            <boxGeometry args={[0.08, 0.05, 0.12]} />
            <meshStandardMaterial color="#5c4033" roughness={0.7} />
          </mesh>
          <mesh position={[0.85, y - 0.05, 0.02]}>
            <boxGeometry args={[0.08, 0.05, 0.12]} />
            <meshStandardMaterial color="#5c4033" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Brass rail system for ladder */}
      <mesh position={[-0.82, 3.5, 0.08]}>
        <cylinderGeometry args={[0.015, 0.015, 6.5]} />
        <meshStandardMaterial
          color="#b8860b"
          metalness={0.85}
          roughness={0.25}
          emissive="#8b6914"
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh position={[0.82, 3.5, 0.08]}>
        <cylinderGeometry args={[0.015, 0.015, 6.5]} />
        <meshStandardMaterial
          color="#b8860b"
          metalness={0.85}
          roughness={0.25}
          emissive="#8b6914"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Rolling ladder - positioned on left side */}
      <group position={[-0.5, 2.5, 0.25]}>
        {/* Ladder rails */}
        <mesh position={[-0.15, 0, 0]} rotation={[Math.PI / 12, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 3.5]} />
          <meshStandardMaterial color="#4a3426" roughness={0.7} />
        </mesh>
        <mesh position={[0.15, 0, 0]} rotation={[Math.PI / 12, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 3.5]} />
          <meshStandardMaterial color="#4a3426" roughness={0.7} />
        </mesh>

        {/* Ladder rungs */}
        {[-0.8, -0.4, 0, 0.4, 0.8, 1.2].map((y, i) => (
          <mesh
            key={`rung-${i}`}
            position={[0, y, -0.05]}
            rotation={[Math.PI / 12, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.015, 0.015, 0.3]} />
            <meshStandardMaterial color="#5c4033" roughness={0.7} />
          </mesh>
        ))}

        {/* Ladder wheels */}
        <mesh position={[-0.15, -1.6, -0.15]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.02]} />
          <meshStandardMaterial
            color="#3d3d3d"
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>
        <mesh position={[0.15, -1.6, -0.15]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.02]} />
          <meshStandardMaterial
            color="#3d3d3d"
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>

        {/* Brass ladder hooks */}
        <mesh position={[-0.15, 1.7, 0.05]}>
          <torusGeometry args={[0.025, 0.008, 8, 12]} />
          <meshStandardMaterial color="#b8860b" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0.15, 1.7, 0.05]}>
          <torusGeometry args={[0.025, 0.008, 8, 12]} />
          <meshStandardMaterial color="#b8860b" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>

      {/* Books on shelves */}
      {[1.0, 2.0, 3.0, 4.0, 5.0, 6.0].map((shelfY, shelfIndex) => {
        const shelfBooks = generateShelfBooks(shelfIndex);
        let currentX = -0.84;

        return (
          <group key={`books-${shelfIndex}`}>
            {shelfBooks.map((book, bookIndex) => {
              if (currentX > 0.86) return null;

              const xPos = currentX + book.config.thickness / 2;
              currentX += book.config.thickness + 0.007;

              const shelfTop = shelfY + 0.035;
              const bookCenterY = shelfTop + book.config.height / 2;

              return (
                <RealisticBook
                  key={`book-${shelfIndex}-${bookIndex}`}
                  config={book.config}
                  position={[xPos, bookCenterY, -0.35]}
                />
              );
            })}
          </group>
        );
      })}

      {/* Decorative brass corner finials */}
      {[
        [-1.0, 7.0, 0.05],
        [1.0, 7.0, 0.05],
      ].map((pos, i) => (
        <group key={`finial-${i}`} position={pos as [number, number, number]}>
          <mesh>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial
              color="#b8860b"
              metalness={0.85}
              roughness={0.25}
            />
          </mesh>
          <mesh position={[0, -0.06, 0]}>
            <cylinderGeometry args={[0.025, 0.04, 0.08]} />
            <meshStandardMaterial
              color="#b8860b"
              metalness={0.85}
              roughness={0.25}
            />
          </mesh>
        </group>
      ))}

      {/* Iron support brackets at base */}
      <mesh position={[-0.9, 0.3, 0.05]}>
        <boxGeometry args={[0.15, 0.08, 0.08]} />
        <meshStandardMaterial color="#3d3d3d" metalness={0.6} roughness={0.5} />
      </mesh>
      <mesh position={[0.9, 0.3, 0.05]}>
        <boxGeometry args={[0.15, 0.08, 0.08]} />
        <meshStandardMaterial color="#3d3d3d" metalness={0.6} roughness={0.5} />
      </mesh>
    </group>
  );
};
