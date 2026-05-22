import { useState, useEffect } from 'react';

export const useIntersectionObserver = (ref, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting) {
        setHasIntersected(true);
      }
    }, { threshold: 0.1, rootMargin: '50px', ...options });

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [ref, options]);

  return { isIntersecting, hasIntersected };
};
