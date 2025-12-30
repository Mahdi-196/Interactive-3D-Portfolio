/**
 * Coffee Table Items - 1930s Film Noir themed decorative objects
 * Table cleared - all component files preserved for future use
 */
export const CoffeeTableItems = ({
  position,
  rotation = [0, 0, 0]
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Table is currently empty - all item components are available in:
          - ProceduralTypewriter.tsx
          - ProceduralRotaryPhone.tsx
          - ProceduralArtDecoClock.tsx
          - ProceduralVintageCamera.tsx
          - ProceduralArtDecoRadio.tsx
          - CoffeeTableSmallItems.tsx (17 small items)
      */}
    </group>
  );
};
