import React from "react";
import Section from "../components/Section.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export default function ContactPage() {
  return (
    <main>
      <Section
        eyebrow="Contact Us"
        title="Let's Build Your Growth Engine"
        desc="Fill out the form below, and we'll get back to you within 24 hours to schedule your free strategy call."
      >
        <div className="mx-auto max-w-2xl">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdVzQxBo_f8TiYvZ2HOTBOPcbpTgBp6N5rPWhlbf07LlVzFPA/viewform?embedded=true"
            width="100%"
            height="1200"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
          >
            Loading…
          </iframe>
        </div>
      </Section>
    </main>
  );
}