import React from "react";
import Section from "./Section.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { useInView } from "../hooks/useInView.js";
import { presenceTiles } from "../data/presenceData.js";

export default function Presence() {
  const { theme } = useTheme();
  const [containerRef, isContainerInView] = useInView({ threshold: 0.1 });
  const cardThemeClasses = {
    light: {
      card: "rounded-3xl bg-white shadow-soft ring-1 ring-slate-900/[0.06] hover:-translate-y-1 hover:shadow-lift",
      title: "text-teal-700",
      body: "text-slate-600",
    },
    dark: {
      card: "rounded-3xl bg-slate-900/75 shadow-lift ring-1 ring-white/[0.08] hover:-translate-y-1",
      title: "text-teal-300",
      body: "text-slate-400",
    },
  };

  return (
    <Section
      id="presence"
      tone="muted"
      eyebrow="Where We Operate"
      title="Local nuance, global coverage"
      desc="Tailored strategies per region."
    >
      <div ref={containerRef} className="grid gap-6 text-base md:grid-cols-2 lg:grid-cols-5">
        {presenceTiles.map((tile, index) => (
          <div
            key={tile.title}
            className={`p-6 transition-all duration-500 ease-out sm:p-7 ${
              cardThemeClasses[theme].card
            } ${isContainerInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl">{tile.flag}</span>
              <h3 className={`font-display text-lg font-semibold tracking-tight ${cardThemeClasses[theme].title}`}>
                {tile.title}
              </h3>
            </div>
            <p className={`leading-relaxed ${cardThemeClasses[theme].body}`}>{tile.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
