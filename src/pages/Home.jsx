import React from "react";
import { RegionProvider } from "../context/RegionContext.jsx";
import Layout from "../components/Layout.jsx";

import Hero from "../components/Hero.jsx";
import ServicesSection from "../components/ServicesSection.jsx";
import Process from "../components/Process.jsx";
import Pricing from "../components/Pricing.jsx";
import Results from "../components/Results.jsx";
import Presence from "../components/Presence.jsx";

export default function Home() {
  return (
    <RegionProvider>
      <Layout>
        <Hero />
        <ServicesSection />
        <Process />
        <Pricing />
        <Results />
        <Presence />
      </Layout>
    </RegionProvider>
  );
}
