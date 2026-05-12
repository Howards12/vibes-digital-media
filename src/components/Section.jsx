import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import { useInView } from "../hooks/useInView.js";

export const container = "mx-auto max-w-7xl px-5 sm:px-6 lg:px-8";

const toneBg = {
  light: {
    default: "",
    muted: "bg-slate-100/70",
    spotlight: "bg-gradient-to-b from-white via-slate-50/80 to-slate-100/60",
  },
  dark: {
    default: "",
    muted: "bg-slate-900/40",
    spotlight: "bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950",
  },
};

export default function Section({ id, eyebrow, title, desc, children, tone = "default" }) {
  const [headerRef, isHeaderInView] = useInView({ threshold: 0.25 });
  const { theme } = useTheme();

  const themeClasses = {
    light: {
      eyebrow: "text-teal-700",
      title: "text-slate-900",
      desc: "text-slate-600",
      line: "from-teal-500 to-emerald-500",
    },
    dark: {
      eyebrow: "text-teal-300",
      title: "text-white",
      desc: "text-slate-400",
      line: "from-teal-300 to-cyan-400",
    },
  };

  const bg = toneBg[theme][tone] || "";

  return (
    <section id={id} className={`relative py-20 sm:py-28 ${bg}`}>
      <div className={container}>
        {(eyebrow || title) && (
          <header
            ref={headerRef}
            className={`mb-14 text-center transition-all duration-700 ease-out ${
              isHeaderInView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            {eyebrow && (
              <div className="mb-4 flex flex-col items-center gap-3">
                <span
                  className={`h-1 w-12 rounded-full bg-gradient-to-r ${themeClasses[theme].line}`}
                  aria-hidden
                />
                <p
                  className={`text-xs font-bold uppercase tracking-[0.28em] ${themeClasses[theme].eyebrow}`}
                >
                  {eyebrow}
                </p>
              </div>
            )}
            {title && (
              <h2
                className={`font-display mx-auto max-w-3xl text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] ${themeClasses[theme].title}`}
              >
                {title}
              </h2>
            )}
            {desc && (
              <p
                className={`mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-balance ${themeClasses[theme].desc}`}
              >
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
