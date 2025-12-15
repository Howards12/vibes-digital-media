import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import { useInView } from "../hooks/useInView.js";
const container = "mx-auto max-w-6xl px-4";

export default function Section({ id, eyebrow, title, desc, children }) {
  const [headerRef, isHeaderInView] = useInView({ threshold: 0.3 });
  const { theme } = useTheme();

  const themeClasses = {
    light: {
      eyebrow: "text-teal-600",
      title: "text-gray-900",
      desc: "text-gray-600",
    },
    dark: {
      eyebrow: "text-teal-200",
      title: "text-white",
      desc: "text-white/80",
    },
  };

  return (
    <section id={id} className="relative py-16 sm:py-24">
      <div className={container}>
        {(eyebrow || title) && (
          <header
            ref={headerRef}
            className={`mb-12 text-center transition-all duration-700 ease-out ${
              isHeaderInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {eyebrow && (
              <p className={`mb-3 text-sm font-semibold uppercase tracking-[0.22em] ${themeClasses[theme].eyebrow}`}>
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className={`mx-auto max-w-3xl text-3xl font-bold leading-tight sm:text-4xl ${themeClasses[theme].title}`}>
                {title}
              </h2>
            )}
            {desc && (
              <p className={`mx-auto mt-6 max-w-3xl text-lg leading-relaxed ${themeClasses[theme].desc}`}>
                {desc}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

export { container };
