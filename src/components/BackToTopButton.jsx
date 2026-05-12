import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";

const ArrowUpIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 19V5" />
    <path d="m5 12 7-7 7 7" />
  </svg>
);

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 480);
    };
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cls =
    theme === "light"
      ? "bg-slate-900 text-white shadow-lift ring-1 ring-slate-900/10 hover:bg-slate-800"
      : "bg-white text-slate-900 shadow-lift ring-1 ring-white/20 hover:bg-slate-100";

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-8 right-6 z-50 rounded-2xl p-3.5 transition-all duration-300 ease-out sm:right-8 ${cls} ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      aria-label="Back to top"
    >
      <ArrowUpIcon />
    </button>
  );
}
