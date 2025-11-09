import { Text } from '@react-three/drei';
import { PushPin } from '../shared/PushPin';
import { COLORS } from '../constants';

/**
 * Side Projects Selection Grid - 4 clickable project folders
 * Click to view detailed project information with papers
 */
interface SideProjectsSelectionProps {
  onProjectSelect: (project: 'medesense' | 'popuptrivia' | 'vibelink' | 'graphibooks') => void;
}

export const SideProjectsSelection = ({ onProjectSelect }: SideProjectsSelectionProps) => {
  return (
    <>
      {/* Project 1 - MedeSense (Top Left) */}
      <group
        onClick={(e) => {
          e.stopPropagation();
          onProjectSelect('medesense');
        }}
        onPointerEnter={() => (document.body.style.cursor = 'pointer')}
        onPointerLeave={() => (document.body.style.cursor = 'auto')}
      >
        <mesh position={[-3.2, 0.2, 0.03]}>
          <boxGeometry args={[2.8, 2.0, 0.03]} />
          <meshStandardMaterial color={COLORS.manila} roughness={0.9} />
        </mesh>
        <mesh position={[-3.2, 1.2, 0.045]}>
          <boxGeometry args={[2.8, 0.2, 0.025]} />
          <meshStandardMaterial color={COLORS.manilaTab} roughness={0.9} />
        </mesh>
        <mesh position={[-4.45, 1.2, 0.06]}>
          <planeGeometry args={[0.4, 0.22]} />
          <meshStandardMaterial color={COLORS.darkRed} />
        </mesh>
        <Text position={[-4.45, 1.2, 0.07]} fontSize={0.11} color="#FFFFFF" anchorX="center" anchorY="middle">
          #01
        </Text>
        <Text position={[-3.2, 0.8, 0.05]} fontSize={0.16} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
          MedeSense
        </Text>
        <Text position={[-3.2, 0.52, 0.05]} fontSize={0.085} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.5}>
          HIPAA-compliant AI
        </Text>
        <Text position={[-3.2, 0.38, 0.05]} fontSize={0.085} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.5}>
          healthcare chatbot
        </Text>
        <Text position={[-3.2, 0.24, 0.05]} fontSize={0.085} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.5}>
          with infinite memory
        </Text>
        <Text position={[-3.2, -0.05, 0.05]} fontSize={0.075} color={COLORS.brownText} anchorX="center" anchorY="middle">
          FastAPI • React
        </Text>
        <Text position={[-3.2, -0.18, 0.05]} fontSize={0.075} color={COLORS.brownText} anchorX="center" anchorY="middle">
          AWS • OpenAI
        </Text>
        <PushPin position={[-3.2, 1.2, 0.07]} radius={0.075} />
      </group>

      {/* Project 2 - PopUpTrivia (Top Right) */}
      <group
        onClick={(e) => {
          e.stopPropagation();
          onProjectSelect('popuptrivia');
        }}
        onPointerEnter={() => (document.body.style.cursor = 'pointer')}
        onPointerLeave={() => (document.body.style.cursor = 'auto')}
      >
        <mesh position={[3.2, 0.2, 0.03]}>
          <boxGeometry args={[2.8, 2.0, 0.03]} />
          <meshStandardMaterial color={COLORS.manila} roughness={0.9} />
        </mesh>
        <mesh position={[3.2, 1.2, 0.045]}>
          <boxGeometry args={[2.8, 0.2, 0.025]} />
          <meshStandardMaterial color={COLORS.manilaTab} roughness={0.9} />
        </mesh>
        <mesh position={[1.95, 1.2, 0.06]}>
          <planeGeometry args={[0.4, 0.22]} />
          <meshStandardMaterial color={COLORS.darkRed} />
        </mesh>
        <Text position={[1.95, 1.2, 0.07]} fontSize={0.11} color="#FFFFFF" anchorX="center" anchorY="middle">
          #02
        </Text>
        <Text position={[3.2, 0.8, 0.05]} fontSize={0.16} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
          PopUpTrivia
        </Text>
        <Text position={[3.2, 0.52, 0.05]} fontSize={0.085} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.5}>
          Timed trivia game
        </Text>
        <Text position={[3.2, 0.38, 0.05]} fontSize={0.085} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.5}>
          with multiple
        </Text>
        <Text position={[3.2, 0.24, 0.05]} fontSize={0.085} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.5}>
          categories
        </Text>
        <Text position={[3.2, -0.05, 0.05]} fontSize={0.075} color={COLORS.brownText} anchorX="center" anchorY="middle">
          HTML • CSS
        </Text>
        <Text position={[3.2, -0.18, 0.05]} fontSize={0.075} color={COLORS.brownText} anchorX="center" anchorY="middle">
          JavaScript • Bulma
        </Text>
        <PushPin position={[3.2, 1.2, 0.07]} radius={0.075} />
      </group>

      {/* Project 3 - VibeLink (Bottom Left) */}
      <group
        onClick={(e) => {
          e.stopPropagation();
          onProjectSelect('vibelink');
        }}
        onPointerEnter={() => (document.body.style.cursor = 'pointer')}
        onPointerLeave={() => (document.body.style.cursor = 'auto')}
      >
        <mesh position={[-3.2, -1.8, 0.03]}>
          <boxGeometry args={[2.8, 2.0, 0.03]} />
          <meshStandardMaterial color={COLORS.manila} roughness={0.9} />
        </mesh>
        <mesh position={[-3.2, -0.8, 0.045]}>
          <boxGeometry args={[2.8, 0.2, 0.025]} />
          <meshStandardMaterial color={COLORS.manilaTab} roughness={0.9} />
        </mesh>
        <mesh position={[-4.45, -0.8, 0.06]}>
          <planeGeometry args={[0.4, 0.22]} />
          <meshStandardMaterial color={COLORS.darkRed} />
        </mesh>
        <Text position={[-4.45, -0.8, 0.07]} fontSize={0.11} color="#FFFFFF" anchorX="center" anchorY="middle">
          #03
        </Text>
        <Text position={[-3.2, -1.2, 0.05]} fontSize={0.16} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
          VibeLink
        </Text>
        <Text position={[-3.2, -1.48, 0.05]} fontSize={0.085} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.5}>
          Social network API
        </Text>
        <Text position={[-3.2, -1.62, 0.05]} fontSize={0.085} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.5}>
          with real-time
        </Text>
        <Text position={[-3.2, -1.76, 0.05]} fontSize={0.085} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.5}>
          interactions
        </Text>
        <Text position={[-3.2, -2.05, 0.05]} fontSize={0.075} color={COLORS.brownText} anchorX="center" anchorY="middle">
          Express • MongoDB
        </Text>
        <Text position={[-3.2, -2.18, 0.05]} fontSize={0.075} color={COLORS.brownText} anchorX="center" anchorY="middle">
          Mongoose • Node.js
        </Text>
        <PushPin position={[-3.2, -0.8, 0.07]} radius={0.075} />
      </group>

      {/* Project 4 - GraphiBooks (Bottom Right) */}
      <group
        onClick={(e) => {
          e.stopPropagation();
          onProjectSelect('graphibooks');
        }}
        onPointerEnter={() => (document.body.style.cursor = 'pointer')}
        onPointerLeave={() => (document.body.style.cursor = 'auto')}
      >
        <mesh position={[3.2, -1.8, 0.03]}>
          <boxGeometry args={[2.8, 2.0, 0.03]} />
          <meshStandardMaterial color={COLORS.manila} roughness={0.9} />
        </mesh>
        <mesh position={[3.2, -0.8, 0.045]}>
          <boxGeometry args={[2.8, 0.2, 0.025]} />
          <meshStandardMaterial color={COLORS.manilaTab} roughness={0.9} />
        </mesh>
        <mesh position={[1.95, -0.8, 0.06]}>
          <planeGeometry args={[0.4, 0.22]} />
          <meshStandardMaterial color={COLORS.darkRed} />
        </mesh>
        <Text position={[1.95, -0.8, 0.07]} fontSize={0.11} color="#FFFFFF" anchorX="center" anchorY="middle">
          #04
        </Text>
        <Text position={[3.2, -1.2, 0.05]} fontSize={0.16} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
          GraphiBooks
        </Text>
        <Text position={[3.2, -1.48, 0.05]} fontSize={0.085} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.5}>
          Book search app
        </Text>
        <Text position={[3.2, -1.62, 0.05]} fontSize={0.085} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.5}>
          with Google Books
        </Text>
        <Text position={[3.2, -1.76, 0.05]} fontSize={0.085} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.5}>
          API integration
        </Text>
        <Text position={[3.2, -2.05, 0.05]} fontSize={0.075} color={COLORS.brownText} anchorX="center" anchorY="middle">
          React • GraphQL
        </Text>
        <Text position={[3.2, -2.18, 0.05]} fontSize={0.075} color={COLORS.brownText} anchorX="center" anchorY="middle">
          Apollo • TypeScript
        </Text>
        <PushPin position={[3.2, -0.8, 0.07]} radius={0.075} />
      </group>
    </>
  );
};
