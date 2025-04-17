'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface HoverImageLinkProps {
  href: string;
  imageSrc?: string;
  children: React.ReactNode;
}

export const HoverImageLink: React.FC<HoverImageLinkProps> = ({ href, imageSrc, children }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div 
      className="relative inline-block" 
      onMouseEnter={() => setIsHovering(true)} 
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link href={href} className="text-blue-600 hover:underline">
        {children}
      </Link>
      {imageSrc && (
        <div 
          className={`
            absolute z-10 bottom-full mb-16 left-1/2 transform -translate-x-1/2 
            p-1 bg-white border border-gray-300 rounded-xl shadow-lg
            transition-opacity duration-700 ease-in-out
            ${isHovering ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            w-[300px] h-[200px]
          `}
          style={{ minHeight: '200px', marginBottom: '4rem' }}
        >
          <Image 
            src={imageSrc} 
            alt={`Preview for ${children}`} 
            width={300}
            height={200}
            style={{ objectFit: 'cover', borderRadius: '0.75rem' }}
            unoptimized
          />
        </div>
      )}
    </div>
  );
}; 