import React from "react";
import Section from "./Section.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { useInView } from "../hooks/useInView.js";
import { resultsStats } from "../data/resultsData.js";

export default function Results() {
  const { theme } = useTheme();
  const [containerRef, isContainerInView] = useInView({ threshold: 0.1 });

  const cardThemeClasses = {
    light: {
      card: "rounded-3xl bg-white/90 shadow-soft ring-1 ring-slate-900/[0.06] hover:-translate-y-1 hover:shadow-lift",
      stat: "bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent",
      label: "text-slate-600",
    },
    dark: {
      card: "rounded-3xl bg-slate-900/70 shadow-lift ring-1 ring-white/[0.08] hover:-translate-y-1",
      stat: "bg-gradient-to-r from-teal-200 to-cyan-300 bg-clip-text text-transparent",
      label: "text-slate-400",
    },
  };

  return (
    <Section id="results" tone="spotlight" eyebrow="Proof" title="Built for measurable growth">
      <div ref={containerRef} className="grid gap-8 md:grid-cols-3">
        {resultsStats.map((statItem, index) => (
          <div
            key={statItem.stat}
            className={`p-8 text-center transition-all duration-500 ease-out sm:p-10 ${
              cardThemeClasses[theme].card
            } ${isContainerInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div
              className={`font-display mb-4 text-4xl font-bold tracking-tight sm:text-5xl ${cardThemeClasses[theme].stat}`}
            >
              {statItem.stat}
            </div>
            <p className={`text-base font-medium leading-relaxed sm:text-lg ${cardThemeClasses[theme].label}`}>
              {statItem.label}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
