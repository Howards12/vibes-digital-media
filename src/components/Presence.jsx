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
      card: "bg-white ring-1 ring-gray-200 hover:bg-gray-50",
      title: "text-teal-600",
      body: "text-gray-600",
    },
    dark: {
      card: "bg-slate-900/80 ring-1 ring-white/10 hover:bg-slate-900/70",
      title: "text-teal-200",
      body: "text-white/70",
    },
  };

  return (
    <Section
      id="presence"
      eyebrow="Where We Operate"
      title="Local nuance, global coverage"
      desc="Tailored strategies per region."
    >
      <div ref={containerRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 text-base">
        {presenceTiles.map((tile, index) => (
          <div
            key={tile.title}
            className={`rounded-2xl p-6 transition-all duration-500 ease-out hover:-translate-y-1 ${
              cardThemeClasses[theme].card
            } ${isContainerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{tile.flag}</span>
              <h3 className={`text-lg font-semibold ${cardThemeClasses[theme].title}`}>{tile.title}</h3>
            </div>
            <p className={`leading-relaxed ${cardThemeClasses[theme].body}`}>{tile.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
