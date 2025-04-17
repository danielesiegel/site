'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define project data with ids and image paths
export interface ProjectData {
  id: string;
  title: string;
  href: string;
  imageSrc?: string;
}

// Projects data array
export const projects: ProjectData[] = [
  { id: 'haptics', title: 'Haptics', href: '/n/smarthug', imageSrc: '/images/smarthug1.jpeg' },
  { id: 'spatial', title: 'Spatial Mapping', href: '/n/spatial', imageSrc: '/images/flowchart.png' },
  { id: 'logarithm', title: 'Logarithm Labs', href: '/n/wip', imageSrc: '/images/Cane-1-1.png' },
  { id: 'arm', title: 'Prosthetic Arm', href: '/n/octograsp', imageSrc: '/images/octograspposter.jpeg' },
  { id: 'quantum', title: 'Quantum Register', href: '/n/katmai', imageSrc: '/images/katmai_pcb.webp' },
  { id: 'ar', title: 'AR Headset', href: '/n/photon', imageSrc: '/images/IMG_3738.JPG' },
  { id: 'cane', title: 'Blind Cane', href: '/n/surround', imageSrc: '/images/1724364654135.jpeg' },
  { id: 'gym', title: 'Gym Optimizer', href: 'https://devpost.com/software/gymbo', imageSrc: 'https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/291/459/datas/original.jpeg' },
  { id: 'prosthetics', title: 'Prosthetic Prototypes', href: '/n/prosthetics', imageSrc: '/images/IMG_9547.jpg' },
  { id: 'sawtooth', title: 'Sawtooth Soundsystem', href: 'https://www.instagram.com/sawtoothsoundsystem/', imageSrc: '/images/img_8801.jpg' },
  { id: '3dprint', title: '3D Print Farm Tracker', href: '/n/3dprint', imageSrc: '/images/image (17).png' },
  { id: 'manipulators', title: 'Axial and Rotational Manipulators', href: '/n/pyramidal', imageSrc: '/images/IMG_3805.png' },
  { id: 'printfarm', title: 'Home 3D Print Farm + Lab', href: '/n/homeprintfarm', imageSrc: '/images/image (20).png' },
];

// Get current and past projects
export const currentProjects = projects.slice(0, 3);
export const pastProjects = projects.slice(3);

// Context type
interface ProjectContextType {
  hoveredProject: string | null;
  setHoveredProject: (id: string | null) => void;
}

// Create the context
const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Provider component
export function ProjectProvider({ children }: { children: ReactNode }) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <ProjectContext.Provider value={{ hoveredProject, setHoveredProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

// Hook to use the context
export function useProjectContext() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
}

// Helper to find a project by ID
export function getProjectById(id: string): ProjectData | undefined {
  return projects.find(project => project.id === id);
} 