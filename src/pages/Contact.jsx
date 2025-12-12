import React from "react";
import { RegionProvider } from "../context/RegionContext.jsx";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import FormCard from "../components/FormCard.jsx";

export default function ContactPage() {
  return (
    <RegionProvider>
      <Layout>
        <Section
          eyebrow="Get Started"
          title="Let’s discuss your growth"
          desc="Send your details — we’ll respond with next steps."
        >
          <div className="mx-auto max-w-4xl">
            <FormCard
              label="Contact Us"
              title="Start Your Growth Journey"
              subtitle="Share your details and we’ll craft a personalized strategy."
              src="https://docs.google.com/forms/d/e/1FAIpQLSdVzQxBo_f8TiYvZ2HOTBOPcbpTgBp6N5rPWhlbf07LlVzFPA/viewform?embedded=true"
              height={1793}
              maxHeight={520}
            />
          </div>
        </Section>
      </Layout>
    </RegionProvider>
  );
}
