import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";

import Hero from "../components/Hero.jsx";
import ServicesSection from "../components/ServicesSection.jsx";
import Process from "../components/Process.jsx";
import Pricing from "../components/Pricing.jsx";
import Results from "../components/Results.jsx";
import Presence from "../components/Presence.jsx";
import CTA from "../components/CTA.jsx";

export default function Home() {
  const { theme } = useTheme();

  return (
    <main>
      <Hero />
      <ServicesSection />
      <Process />
      <Pricing />
      <Results />
      <Presence />
      <CTA />
    </main>
  );
}
