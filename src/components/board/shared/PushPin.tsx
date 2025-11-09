import { PUSH_PIN } from '../constants';

/**
 * Reusable Push Pin component
 * Used to visually "pin" documents to the board
 */
interface PushPinProps {
  position: [number, number, number];
  color?: string;
  radius?: number;
}

export const PushPin = ({
  position,
  color = PUSH_PIN.color,
  radius = PUSH_PIN.radius
}: PushPinProps) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshStandardMaterial
        color={color}
        metalness={PUSH_PIN.metalness}
        roughness={PUSH_PIN.roughness}
      />
    </mesh>
  );
};
