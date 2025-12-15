import { VictorianBookshelf } from './VictorianBookshelf';
import { ArtDecoBookshelf } from './ArtDecoBookshelf';
import { LibraryLadderBookshelf } from './LibraryLadderBookshelf';
import { Bookshelf } from './Bookshelf';

/**
 * Bookshelf Showcase - Display all bookshelf variants
 * Drop this component into your scene to preview all models
 */
export const BookshelfShowcase = () => {
  return (
    <group>
      {/* Original Bookshelf (for reference) */}
      <Bookshelf position={[-9, 0, -5]} variant={0} />

      {/* Victorian Bookshelf - Ornate with glass doors */}
      <VictorianBookshelf position={[-6, 0, -5]} variant={1} />

      {/* Art Deco Bookshelf - 1930s geometric with chrome */}
      <ArtDecoBookshelf position={[-3, 0, -5]} variant={2} />

      {/* Library Ladder Bookshelf - Tall with rolling ladder */}
      <LibraryLadderBookshelf position={[0, 0, -5]} variant={3} />

      {/* Add floating labels to identify each (optional - remove if not needed) */}
      {[
        { text: 'Original', pos: [-9, 6, -4.5] as [number, number, number] },
        { text: 'Victorian', pos: [-6, 6, -4.5] as [number, number, number] },
        { text: 'Art Deco', pos: [-3, 6, -4.5] as [number, number, number] },
        { text: 'Library Ladder', pos: [0, 7.5, -4.5] as [number, number, number] },
      ].map((label, i) => (
        <group key={`label-${i}`} position={label.pos}>
          <mesh>
            <boxGeometry args={[1.5, 0.3, 0.05]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        </group>
      ))}
    </group>
  );
};
