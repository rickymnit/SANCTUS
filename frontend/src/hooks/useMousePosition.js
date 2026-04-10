import { useState, useEffect, useCallback } from 'react';

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [normalizedPosition, setNormalizedPosition] = useState({ x: 0.5, y: 0.5 });

  const updateMousePosition = useCallback((e) => {
    const x = e.clientX;
    const y = e.clientY;
    const normalizedX = x / window.innerWidth;
    const normalizedY = y / window.innerHeight;
    
    setMousePosition({ x, y });
    setNormalizedPosition({ x: normalizedX, y: normalizedY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [updateMousePosition]);

  return { mousePosition, normalizedPosition };
};
