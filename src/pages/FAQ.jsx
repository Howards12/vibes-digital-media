import React, { useMemo, useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import Section from "../components/Section.jsx";
import { faqItems } from "../faq/faqData.js";

function FAQAccordion() {
  const [open, setOpen] = useState(null);
  const { theme } = useTheme();

  const themeClasses = {
    light: {
      button: "bg-white ring-1 ring-gray-200 hover:ring-teal-500/50",
      question: "text-gray-900",
      answer: "text-gray-600",
    },
    dark: {
      button: "bg-slate-900/80 ring-1 ring-white/10 hover:ring-teal-400/30",
      question: "text-white",
      answer: "text-white/70",
      icon: "text-teal-300",
    },
  };

  return (
    <div className="mx-auto max-w-4xl space-y-3">
      {faqItems.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <button
            key={item.question}
            onClick={() => setOpen(isOpen ? -1 : idx)}
            className={`w-full text-left rounded-2xl p-6 transition-all ${themeClasses[theme].button}`}
          >
            <div className="flex items-start justify-between gap-6">
              <h3 className={`text-lg font-semibold ${themeClasses[theme].question}`}>
                {item.question}
              </h3>
              <span className={`text-xl ${themeClasses[theme].icon || 'text-teal-500'}`}>{isOpen ? "−" : "+"}</span>
            </div>
            {isOpen && (
              <p className={`mt-4 leading-relaxed ${themeClasses[theme].answer}`}>
                {item.answer}
              </p>
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
      mainEntity: faqItems.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    };
  }, []);

  return (
    <Section
      eyebrow="FAQ"
      title="Answers to common questions"
      desc="Quick clarity on timelines, process, and what you get."
    >
      <FAQAccordion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </Section>
  );
}
