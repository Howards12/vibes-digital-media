import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext.jsx";

const ArrowUpIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 19V5" />
    <path d="m5 12 7-7 7 7" />
  </svg>
);

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const themeClasses = {
    light: "bg-slate-900 text-white hover:bg-slate-700",
    dark: "bg-white text-slate-900 hover:bg-gray-300",
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out ${
        themeClasses[theme]
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      aria-label="Go to top"
    >
      <ArrowUpIcon />
    </button>
  );
}