import { AboutDetail } from './AboutDetail';
import { SkillsDetail } from './SkillsDetail';
import { EducationDetail } from './EducationDetail';
import { ProfileSectionWrapperProps } from '../types';

/**
 * ProfileSectionWrapper - Renders the selected profile section (About/Skills/Education)
 * Wraps existing detail components with back navigation
 */
export const ProfileSectionWrapper = ({
  opacity,
  section,
  onBack
}: ProfileSectionWrapperProps) => {
  if (!section) return null;

  // Render the appropriate section based on selection
  switch (section) {
    case 'about':
      return <AboutDetail opacity={opacity} onBack={onBack} />;
    case 'skills':
      return <SkillsDetail opacity={opacity} onBack={onBack} />;
    case 'education':
      return <EducationDetail opacity={opacity} onBack={onBack} />;
    default:
      return null;
  }
};
