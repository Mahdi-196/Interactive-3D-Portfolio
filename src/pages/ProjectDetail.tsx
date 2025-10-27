import { useParams, useNavigate } from 'react-router-dom';

const ProjectDetail = () => {
  const { component } = useParams<{ component: string }>();
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-noir-900 flex items-center justify-center">
      {/* Blank page - can be populated later */}
    </div>
  );
};

export default ProjectDetail;
