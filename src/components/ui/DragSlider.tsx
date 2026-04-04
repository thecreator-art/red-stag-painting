'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { BLUR_PLACEHOLDER } from '@/lib/constants';

interface DragSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  initialPosition?: number;
  className?: string;
  aspectRatio?: string;
}

export default function DragSlider({
  beforeImage,
  afterImage,
  beforeAlt = 'Before',
  afterAlt = 'After',
  initialPosition = 50,
  className = '',
  aspectRatio = '4/3',
}: DragSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const afterWrapperRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [position, setPosition] = useState(initialPosition);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(2, Math.min(98, (x / rect.width) * 100));

    // Direct DOM mutation for smooth dragging
    if (sliderRef.current) {
      sliderRef.current.style.left = `${pct}%`;
    }
    if (afterWrapperRef.current) {
      afterWrapperRef.current.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    }
    setPosition(pct);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true;
    updatePosition(e.touches[0].clientX);
  }, [updatePosition]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      updatePosition(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      updatePosition(e.touches[0].clientX);
    };

    const handleEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [updatePosition]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden cursor-ew-resize ${className}`}
      style={{ aspectRatio }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      aria-label="Before and after comparison slider"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          const newPos = Math.max(2, position - 2);
          setPosition(newPos);
          if (sliderRef.current) sliderRef.current.style.left = `${newPos}%`;
          if (afterWrapperRef.current) afterWrapperRef.current.style.clipPath = `inset(0 ${100 - newPos}% 0 0)`;
        }
        if (e.key === 'ArrowRight') {
          const newPos = Math.min(98, position + 2);
          setPosition(newPos);
          if (sliderRef.current) sliderRef.current.style.left = `${newPos}%`;
          if (afterWrapperRef.current) afterWrapperRef.current.style.clipPath = `inset(0 ${100 - newPos}% 0 0)`;
        }
      }}
    >
      {/* Before image (bottom layer) */}
      <Image
        src={beforeImage}
        alt={beforeAlt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDER}
      />

      {/* After image (top layer, clipped) */}
      <div
        ref={afterWrapperRef}
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - initialPosition}% 0 0)` }}
      >
        <Image
          src={afterImage}
          alt={afterAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
      </div>

      {/* Slider divider line */}
      <div
        ref={sliderRef}
        className="absolute top-0 bottom-0 z-10 cursor-ew-resize"
        style={{ left: `${initialPosition}%`, width: '3px', marginLeft: '-1.5px' }}
      >
        <div className="absolute inset-0 bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)]" />
        {/* Grab handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-text-body" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 z-20 px-2.5 py-1 text-xs font-semibold rounded-full bg-[#1A1816]/70 text-white">
        Before
      </span>
      <span className="absolute top-3 right-3 z-20 px-2.5 py-1 text-xs font-semibold rounded-full bg-white/90 text-[#1A1816]">
        After
      </span>
    </div>
  );
}
