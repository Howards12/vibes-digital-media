import React from "react";
import Section from "./Section.jsx";

export default function ServicesSection() {
  const services = [
    {
      title: "Search Engine Optimization (SEO)",
      body: "Technical audits, on-page optimization, content strategy, and ethical link building.",
    },
    {
      title: "Social Media Optimization (SMO)",
      body: "Platform-native content systems that grow communities and drive conversions.",
    },
    {
      title: "Paid Search & Social",
      body: "High-intent Google Ads and paid social campaigns built to scale profitably.",
    },
    {
      title: "Tracking, Analytics & CRO",
      body: "Event tracking, funnels, and landing-page experiments to improve ROI.",
    },
  ];

  return (
    <Section
      id="services"
      eyebrow="What We Do"
      title="Performance-led SEO & SMO for modern brands"
      desc="We blend technical search, strategic content, and thumb-stopping social."
    >
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <div
            key={s.title}
            className="rounded-2xl bg-slate-900/70 p-6 text-base text-white/85 ring-1 ring-white/10 hover:ring-teal-400/30 transition-all"
          >
            <h3 className="mb-3 text-lg font-semibold text-teal-200">{s.title}</h3>
            <p className="text-base text-white/70 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
