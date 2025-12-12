import React from "react";
import Section from "./Section.jsx";

export default function Process() {
  const steps = [
    { t: "01. Discovery", d: "Quick strategy call to understand goals, markets, and channels." },
    { t: "02. Deep Audit", d: "Technical + content + social review to uncover quick wins." },
    { t: "03. Launch & Optimize", d: "SEO & SMO sprints with weekly tweaks based on performance." },
    { t: "04. Scale", d: "Double down on what works and expand into new markets." },
  ];

  return (
    <Section id="process" eyebrow="How We Work" title="Simple, transparent, results-first">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div
            key={s.t}
            className="rounded-2xl bg-slate-900/80 p-6 text-base text-white/75 ring-1 ring-white/10 hover:bg-slate-900/70 transition-all"
          >
            <div className="text-sm font-semibold text-teal-300 mb-3">{s.t}</div>
            <p className="leading-relaxed text-white/70">{s.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
