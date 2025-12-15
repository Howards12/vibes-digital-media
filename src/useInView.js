import { useState, useEffect, useRef } from "react";

/**
 * Custom hook to detect when an element is in the viewport.
 * @param {object} options - IntersectionObserver options (e.g., { threshold: 0.1 }).
 * @returns {[React.RefObject, boolean]} - A ref to attach to the element and a boolean indicating if it's in view.
 */
export function useInView(options = { threshold: 0.1 }) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target); // Animate only once
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => currentRef && observer.unobserve(currentRef);
  }, [options]);

  return [ref, isInView];
}