'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import type { Project } from '@/types';

interface BeforeAfterCardProps {
  project: Project;
}

export default function BeforeAfterCard({ project }: BeforeAfterCardProps) {
  const [showBefore, setShowBefore] = useState(false);

  const handleInteraction = useCallback(() => {
    setShowBefore((prev) => !prev);
  }, []);

  return (
    <div className="break-inside-avoid mb-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-md rounded-sm overflow-hidden">
      <div
        className="relative overflow-hidden cursor-pointer"
        style={{ aspectRatio: '4/3' }}
        onMouseEnter={() => setShowBefore(true)}
        onMouseLeave={() => setShowBefore(false)}
        onClick={handleInteraction}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleInteraction();
          }
        }}
        aria-label={`Toggle before and after view of ${project.serviceType} project in ${project.city}`}
      >
        <Image
          src={project.afterImage}
          alt={`Interior painting project in ${project.city}, CA by Red Stag Painting`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover transition-opacity duration-400 ease-in-out ${
            showBefore ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <Image
          src={project.beforeImage}
          alt={`Before photo of painting project in ${project.city}, CA by Red Stag Painting`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover transition-opacity duration-400 ease-in-out ${
            showBefore ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <span
          className={`absolute bottom-3 left-3 px-3 py-1 text-xs font-semibold rounded-full transition-opacity duration-400 ${
            showBefore
              ? 'bg-text-primary text-white'
              : 'bg-white text-text-primary'
          }`}
        >
          {showBefore ? 'Before' : 'After'}
        </span>
        <span className="absolute bottom-3 right-3 px-3 py-1 text-xs font-semibold rounded-full bg-bg-dark/80 text-text-on-dark">
          {project.serviceType} · {project.city}
        </span>
      </div>
      <div className="p-4 bg-white">
        <p className="text-sm text-text-body">{project.description}</p>
        {project.review && (
          <blockquote className="mt-4 pl-4 border-l-[3px] border-accent">
            <p className="text-sm italic text-text-muted">&ldquo;{project.review.text}&rdquo;</p>
            <cite className="block mt-1 text-xs text-text-muted not-italic font-semibold">
              {project.review.author}, {project.review.city}
            </cite>
          </blockquote>
        )}
      </div>
    </div>
  );
}
