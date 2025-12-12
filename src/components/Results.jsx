import React from "react";
import Section from "./Section.jsx";

export default function Results() {
  const stats = [
    { k: "+220%", l: "Organic traffic uplift in 6–9 months for service brands." },
    { k: "3x", l: "More qualified leads from paid + organic working together." },
    { k: "50k+", l: "New followers driven via optimized social campaigns." },
  ];

  return (
    <Section id="results" eyebrow="Proof" title="Built for measurable growth">
      <div className="grid gap-8 md:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.k}
            className="rounded-2xl bg-slate-900/80 p-8 text-white/80 ring-1 ring-white/10 text-center hover:bg-slate-900/70 transition-all"
          >
            <div className="text-3xl font-extrabold text-teal-300 mb-4">{s.k}</div>
            <p className="text-lg text-white/70 leading-relaxed">{s.l}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
