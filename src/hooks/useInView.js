import { useState, useEffect, useRef } from "react";

/**
 * A custom hook to detect when an element is in the viewport.
 * @param {IntersectionObserverInit} options - Configuration for the IntersectionObserver.
 * @returns {[React.RefObject<HTMLElement>, boolean]} A ref to attach to the element and a boolean indicating if it's in view.
 */
export function useInView(options) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when observer callback fires
        if (entry.isIntersecting) {
          setIsInView(true);
          // Stop observing the element once it's in view
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold: 0.1, ...options } // Default threshold, can be overridden
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => currentRef && observer.unobserve(currentRef);
  }, [ref, options]);

  return [ref, isInView];
}