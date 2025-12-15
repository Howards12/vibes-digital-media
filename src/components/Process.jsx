import React from "react";
import Section from "./Section.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { useInView } from "../hooks/useInView.js";
import { processSteps } from "../data/processData.js";

export default function Process() {
  const { theme } = useTheme();
  const [containerRef, isContainerInView] = useInView({ threshold: 0.1 });

  const cardThemeClasses = {
    light: {
      card: "bg-white ring-1 ring-gray-200 hover:bg-gray-50",
      step: "text-teal-600",
      body: "text-gray-600",
      title: "text-gray-900",
    },
    dark: {
      card: "bg-slate-900/80 ring-1 ring-white/10 hover:bg-slate-900/70",
      step: "text-teal-300",
      body: "text-white/70",
      title: "text-white",
    },
  };

  return (
    <Section id="process" eyebrow="How We Work" title="Simple, transparent, results-first">
      <div ref={containerRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, index) => (
          <div
            key={step.title}
            className={`rounded-2xl p-6 text-base transition-all duration-500 ease-out hover:-translate-y-1 ${
              cardThemeClasses[theme].card
            } ${isContainerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <p className={`mb-2 text-sm font-semibold ${cardThemeClasses[theme].step}`}>{step.num}</p>
            <h3 className={`mb-3 font-semibold ${cardThemeClasses[theme].title}`}>{step.title}</h3>
            <p className={`leading-relaxed ${cardThemeClasses[theme].body}`}>{step.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
