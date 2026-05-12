import React from "react";
import Section from "../components/Section.jsx";
import ServicesSection from "../components/ServicesSection.jsx";
import Pricing from "../components/Pricing.jsx";
import CTA from "../components/CTA.jsx";

export default function ServicesPage() {
  return (
    <main>
      <ServicesSection />
      <Pricing />
      <CTA />
    </main>
  );
}
