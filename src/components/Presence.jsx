import React from "react";
import Section from "./Section.jsx";

export default function Presence() {
  const tiles = [
    {
      title: "United States",
      body: "HQ & primary operations. B2B, DTC, and local service brands with nationwide reach.",
    },
    {
      title: "Europe",
      body: "EU-ready strategies with localization, GDPR awareness, and cultural nuance.",
    },
    {
      title: "Nigeria",
      body: "High-growth tech, fintech, e-commerce, and retail markets with explosive potential.",
    },
    {
      title: "South Africa",
      body: "Mature brands & enterprises needing sophisticated regional scaling strategies.",
    },
    {
      title: "Rwanda",
      body: "Fast-growing innovation ecosystem — ideal for modern brands scaling in East Africa.",
    },
  ];

  return (
    <Section
      id="presence"
      eyebrow="Where We Operate"
      title="Local nuance, global coverage"
      desc="Tailored strategies per region."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 text-base text-white/75">
        {tiles.map((t) => (
          <div
            key={t.title}
            className="rounded-2xl bg-slate-900/80 p-6 ring-1 ring-white/10 hover:bg-slate-900/70 transition-all"
          >
            <div className="mb-3 text-lg font-semibold text-teal-200">{t.title}</div>
            <p className="leading-relaxed">{t.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
