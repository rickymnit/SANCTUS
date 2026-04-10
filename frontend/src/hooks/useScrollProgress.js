import { useState, useEffect, useRef } from 'react';

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setProgress(currentProgress);
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { progress, scrollY };
};

export const useElementScrollProgress = (ref) => {
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on element position in viewport
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Progress: 0 when element enters bottom, 1 when element leaves top
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - elementTop) / (windowHeight + elementHeight)
      ));
      
      setProgress(scrollProgress);
      setIsInView(rect.top < windowHeight && rect.bottom > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return { progress, isInView };
};
