'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { projects } from './ProjectContext';

// Add SVG filter definition for high-contrast edge effect
const SVGFilters = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }}>
    <defs>
      <filter id="line-drawing-filter">
        {/* First invert the image */}
        <feColorMatrix type="matrix" values="-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0" />
        {/* Convert to grayscale */}
        <feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0" />
        {/* Threshold to create high contrast */}
        <feComponentTransfer>
          <feFuncR type="table" tableValues="1 0" />
          <feFuncG type="table" tableValues="1 0" />
          <feFuncB type="table" tableValues="1 0" />
        </feComponentTransfer>
        {/* Minimal blur for edge smoothing */}
        <feGaussianBlur stdDeviation="0.3" />
        {/* Increase contrast further */}
        <feComponentTransfer>
          <feFuncA type="table" tableValues="0 1" />
        </feComponentTransfer>
        <feComposite operator="in" in2="SourceGraphic" />
      </filter>
    </defs>
  </svg>
);

// For GIF handling
const GifImage = ({ 
  src, 
  alt, 
  isHovered 
}: { 
  src: string; 
  alt: string; 
  isHovered: boolean 
}) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Static frame from the GIF (no animation) - visible when not hovering */}
      <img
        src={src}
        alt={`${alt} (static)`}
        className={`
          absolute inset-0 w-full h-full object-cover
          transition-opacity duration-500 ease-out
          ${isHovered ? 'opacity-0' : 'opacity-100 contrast-[5] brightness-110'}
        `}
        style={{ 
          filter: 'url(#line-drawing-filter)',
          // These styles freeze the GIF animation
          animationPlayState: 'paused',
          WebkitAnimationPlayState: 'paused',
          animation: 'none !important',
          MozAnimationName: 'none',
          WebkitAnimationName: 'none',
          animationName: 'none',
        }}
      />
      
      {/* Animated GIF - only visible on hover */}
      <img
        src={src}
        alt={alt}
        className={`
          absolute inset-0 w-full h-full object-cover
          transition-opacity duration-500 ease-out
          ${isHovered ? 'opacity-100 scale-110' : 'opacity-0'}
        `}
        loading="lazy"
      />
    </div>
  );
};

// Simple list view for mobile
const MobileProjectList = () => {
  return (
    <div className="space-y-2">
      {projects.map((project) => (
        <div key={project.id} className="py-1">
          <Link 
            href={project.href} 
            className="text-blue-600 hover:underline"
          >
            {project.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export const ProjectGallery: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  
  // Check if a URL is external
  const isExternalUrl = (url: string): boolean => {
    return url.startsWith('http://') || url.startsWith('https://');
  };
  
  // Check if the URL is for a GIF
  const isGif = (url: string): boolean => {
    return url.toLowerCase().endsWith('.gif');
  };
  
  // Generate project colors based on their id for projects without images
  const getProjectColor = (id: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
      'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500',
      'bg-red-500', 'bg-teal-500', 'bg-orange-500'
    ];
    const index = id.charCodeAt(0) % colors.length;
    return colors[index];
  };
  
  return (
    <div className="mt-12">
      {/* SVG filters */}
      <SVGFilters />
      
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      
      {/* Mobile view - simple list */}
      <div className="md:hidden">
        <MobileProjectList />
      </div>
      
      {/* Desktop view - gallery grid */}
      <div className="hidden md:grid grid-cols-4 gap-4">
        {projects.map((project) => (
          <Link 
            href={project.href} 
            key={project.id} 
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <div 
              className={`
                relative overflow-hidden rounded-lg aspect-square 
                transition-all duration-500 ease-out
                ${hoveredProject === project.id ? 'scale-105 shadow-xl z-10' : 'shadow-md'}
              `}
            >
              {project.imageSrc ? (
                isGif(project.imageSrc) ? (
                  // Special handling for GIFs (both external and internal)
                  <GifImage 
                    src={project.imageSrc}
                    alt={project.title}
                    isHovered={hoveredProject === project.id}
                  />
                ) : isExternalUrl(project.imageSrc) ? (
                  // Regular external image
                  <img
                    src={project.imageSrc}
                    alt={project.title}
                    className={`
                      absolute inset-0 w-full h-full object-cover
                      transition-all duration-700 ease-out
                      ${hoveredProject === project.id 
                        ? 'scale-110' 
                        : 'scale-100 contrast-[5] brightness-110'
                      }
                    `}
                    style={{
                      filter: hoveredProject === project.id 
                        ? 'none' 
                        : 'url(#line-drawing-filter)'
                    }}
                  />
                ) : (
                  // Regular local image
                  <div className="relative w-full h-full">
                    <Image
                      src={project.imageSrc}
                      alt={project.title}
                      fill
                      style={{ 
                        objectFit: 'cover',
                        filter: hoveredProject === project.id 
                          ? 'none' 
                          : 'url(#line-drawing-filter)',
                      }}
                      className={`
                        transition-all duration-700 ease-out
                        ${hoveredProject === project.id 
                          ? 'scale-110' 
                          : 'scale-100 contrast-[5] brightness-110'
                        }
                      `}
                    />
                  </div>
                )
              ) : (
                // No image, just a colored background
                <div className={`
                  absolute inset-0 ${getProjectColor(project.id)}
                  transition-transform duration-700 ease-out
                  ${hoveredProject === project.id ? 'scale-110' : 'scale-100'}
                `} />
              )}
              
              <div 
                className={`
                  absolute inset-0 bg-gradient-to-t 
                  from-black/60 to-transparent
                  flex items-end p-3
                  transition-opacity duration-500
                  ${hoveredProject === project.id ? 'opacity-100' : 'opacity-70'}
                `}
              >
                <span className="text-white font-medium text-sm leading-tight">
                  {project.title}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}; 