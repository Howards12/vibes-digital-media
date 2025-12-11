// src/faq/Faq.jsx
import React, { useEffect } from "react";
import { faqItems } from "./faqData.js";

// Inject FAQPage JSON-LD into <head> when this page is loaded
function FaqSchema() {
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "vdm-faq-jsonld";
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById("vdm-faq-jsonld");
      if (existing) existing.remove();
    };
  }, []);

  return null;
}

export default function FaqPage() {
  // Set SEO title + meta description while on /faq
  useEffect(() => {
    const prevTitle = document.title;
    const metaTag = document.querySelector('meta[name="description"]');
    const prevDesc = metaTag?.getAttribute("content") || "";

    document.title =
      "FAQ | Vibes Digital Media – SEO & Social Media Marketing Answers";

    if (metaTag) {
      metaTag.setAttribute(
        "content",
        "Find quick answers about Vibes Digital Media’s SEO services, social media management, pricing, timelines, and how to start your digital marketing project."
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaTag) metaTag.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <FaqSchema />

      <section className="border-b border-white/10 bg-[#050816]">
        <div className="mx-auto max-w-5xl px-4 py-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-200">
            FAQ
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            Have questions about SEO, social media, or working with Vibes
            Digital Media? Start here for quick, straightforward answers.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-4">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl bg-slate-900/80 p-5 text-white/85 ring-1 ring-white/10 open:ring-teal-400/40 transition-all"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-teal-200">
                <span>{item.question}</span>
                <span className="text-sm text-teal-300 group-open:hidden">
                  +
                </span>
                <span className="text-sm text-teal-300 hidden group-open:inline">
                  –
                </span>
              </summary>
              <p className="mt-3 text-base leading-relaxed text-white/75">
                {item.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 text-center text-base text-white/70">
          Still have questions?{" "}
          <a
            href="#contact"
            className="font-semibold text-teal-300 hover:text-teal-200"
          >
            Contact us for a free marketing assessment.
          </a>
        </div>
      </section>
    </main>
  );
}
