'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      setProgress((scrollTop / docHeight) * 100);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[2px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-accent transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
