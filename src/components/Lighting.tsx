// Lighting Setup - Only chandelier provides light
export const Lighting = ({ lampOn }: { lampOn: boolean }) => {
  return (
    <>
      {/* Increased ambient light for better visibility */}
      <ambientLight intensity={0.3} color="#ffd700" />
    </>
  );
};
