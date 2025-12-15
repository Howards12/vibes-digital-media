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
      card: "bg-white ring-1 ring-gray-200 hover:bg-gray-50",
      stat: "text-teal-500",
      label: "text-gray-600",
    },
    dark: {
      card: "bg-slate-900/80 ring-1 ring-white/10 hover:bg-slate-900/70",
      stat: "text-teal-300",
      label: "text-white/70",
    },
  };

  return (
    <Section id="results" eyebrow="Proof" title="Built for measurable growth">
      <div ref={containerRef} className="grid gap-8 md:grid-cols-3">
        {resultsStats.map((statItem, index) => (
          <div
            key={statItem.stat}
            className={`rounded-2xl p-8 text-center transition-all duration-500 ease-out hover:-translate-y-1 ${
              cardThemeClasses[theme].card
            } ${isContainerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className={`mb-4 text-3xl font-extrabold ${cardThemeClasses[theme].stat}`}>{statItem.stat}</div>
            <p className={`text-lg leading-relaxed ${cardThemeClasses[theme].label}`}>{statItem.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
