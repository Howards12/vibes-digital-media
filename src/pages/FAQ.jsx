import React, { useMemo, useState } from "react";
import { RegionProvider } from "../context/RegionContext.jsx";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";

const FAQS = [
  {
    q: "How long does SEO take to work?",
    a: "Most brands see early movement in 4–8 weeks, and meaningful gains in 3–6 months depending on competition and budget.",
  },
  {
    q: "Do you offer contracts or month-to-month?",
    a: "We offer both. Most clients start with 3 months for momentum, then move to month-to-month.",
  },
  {
    q: "Do you do local SEO for Houston / Texas?",
    a: "Yes. We optimize Google Business Profile, local pages, citations, and location-based content to improve map pack visibility.",
  },
  {
    q: "What do you need from me to start?",
    a: "Website access (or reports), business goals, target locations, and any existing analytics accounts (GA4/GSC).",
  },
  {
    q: "Can you manage both SEO and social together?",
    a: "Yes — combining SEO + SMO usually improves brand demand and helps content perform across channels.",
  },
];

function FAQAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="mx-auto max-w-4xl space-y-3">
      {FAQS.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <button
            key={item.q}
            onClick={() => setOpen(isOpen ? -1 : idx)}
            className="w-full text-left rounded-2xl bg-slate-900/80 ring-1 ring-white/10 p-6 hover:ring-teal-400/30 transition-all"
          >
            <div className="flex items-start justify-between gap-6">
              <h3 className="text-lg font-semibold text-white">{item.q}</h3>
              <span className="text-teal-300 text-xl">{isOpen ? "−" : "+"}</span>
            </div>
            {isOpen && (
              <p className="mt-4 text-white/70 leading-relaxed">{item.a}</p>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function FAQPage() {
  const schema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
  }, []);

  return (
    <RegionProvider>
      <Layout>
        <Section
          eyebrow="FAQ"
          title="Answers to common questions"
          desc="Quick clarity on timelines, process, and what you get."
        >
          <FAQAccordion />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        </Section>
      </Layout>
    </RegionProvider>
  );
}
