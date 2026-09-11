'use client';

import { createContext, useContext, useEffect } from 'react';
import { useMotionValue, MotionValue } from 'framer-motion';

interface MouseParallaxContextValue {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

const MouseParallaxContext = createContext<MouseParallaxContextValue | null>(null);

export function MouseParallaxProvider({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <MouseParallaxContext.Provider value={{ mouseX, mouseY }}>
      {children}
    </MouseParallaxContext.Provider>
  );
}

export function useMouseParallax() {
  const ctx = useContext(MouseParallaxContext);
  if (!ctx) {
    throw new Error('useMouseParallax must be used within a MouseParallaxProvider');
  }
  return ctx;
}
