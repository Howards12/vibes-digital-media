import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

export default function CTA() {
  const { theme } = useTheme();

  const themeClasses = {
    light: {
      bg: "bg-slate-100",
      title: "text-slate-900",
      body: "text-slate-600",
      button: "bg-slate-900 text-white hover:bg-slate-800",
    },
    dark: {
      bg: "bg-slate-800/50",
      title: "text-white",
      body: "text-white/70",
      button: "bg-white text-slate-900 hover:opacity-90",
    },
  };

  return (
    <section className={`py-20 sm:py-24 ${themeClasses[theme].bg}`}>
      <div className="mx-auto max-w-2xl text-center px-4">
        <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${themeClasses[theme].title}`}>Ready to Grow?</h2>
        <p className={`mt-6 text-lg leading-8 ${themeClasses[theme].body}`}>
          Let's build a strategy that turns your goals into measurable results. We'll start with a free, no-obligation audit of your current digital presence.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to="/contact" className={`rounded-md px-5 py-3 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 ${themeClasses[theme].button}`}>
            Book a Free Strategy Call
          </Link>
        </div>
      </div>
    </section>
  );
}