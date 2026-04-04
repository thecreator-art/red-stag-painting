'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  target: string;
  duration?: number;
}

export default function AnimatedCounter({ target, duration = 2000 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(target);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCount();
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function animateCount() {
    // Parse the target: extract prefix, number, suffix
    const match = target.match(/^([^\d]*)([\d.]+)(.*)$/);
    if (!match) return;

    const prefix = match[1];
    const numStr = match[2];
    const suffix = match[3];
    const targetNum = parseFloat(numStr);
    const isFloat = numStr.includes('.');
    const decimals = isFloat ? (numStr.split('.')[1]?.length || 0) : 0;

    const steps = 60;
    const stepDuration = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = easeOutCubic(step / steps);
      const current = targetNum * progress;

      if (step >= steps) {
        setDisplay(target);
        clearInterval(interval);
      } else {
        const formatted = isFloat ? current.toFixed(decimals) : Math.floor(current).toString();
        setDisplay(`${prefix}${formatted}${suffix}`);
      }
    }, stepDuration);
  }

  function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }

  return <span ref={ref}>{display}</span>;
}
