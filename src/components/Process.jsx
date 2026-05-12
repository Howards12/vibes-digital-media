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
      card: "rounded-3xl bg-white shadow-soft ring-1 ring-slate-900/[0.06] hover:-translate-y-1 hover:shadow-lift",
      step: "text-teal-700",
      body: "text-slate-600",
      title: "text-slate-900",
    },
    dark: {
      card: "rounded-3xl bg-slate-900/75 shadow-lift ring-1 ring-white/[0.08] hover:-translate-y-1 hover:bg-slate-900/85",
      step: "text-teal-300",
      body: "text-slate-400",
      title: "text-white",
    },
  };

  return (
    <Section id="process" tone="spotlight" eyebrow="How We Work" title="Simple, transparent, results-first">
      <div ref={containerRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, index) => (
          <div
            key={step.title}
            className={`p-6 text-base transition-all duration-500 ease-out sm:p-7 ${
              cardThemeClasses[theme].card
            } ${isContainerInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <p className={`mb-2 text-sm font-semibold ${cardThemeClasses[theme].step}`}>{step.num}</p>
            <h3 className={`mb-3 font-display text-lg font-semibold tracking-tight ${cardThemeClasses[theme].title}`}>
              {step.title}
            </h3>
            <p className={`leading-relaxed ${cardThemeClasses[theme].body}`}>{step.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
