'use client'

import Link from 'next/link';
import { useProjectContext } from './ProjectContext';

interface ProjectLinkProps {
  projectId: string;
  href: string;
  children: React.ReactNode;
}

export const ProjectLink: React.FC<ProjectLinkProps> = ({ projectId, href, children }) => {
  const { setHoveredProject } = useProjectContext();

  return (
    <Link 
      href={href} 
      className="text-blue-600 hover:underline"
      onMouseEnter={() => setHoveredProject(projectId)}
      onMouseLeave={() => setHoveredProject(null)}
    >
      {children}
    </Link>
  );
}; 