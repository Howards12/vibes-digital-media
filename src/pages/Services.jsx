import React from "react";
import { RegionProvider } from "../context/RegionContext.jsx";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";

export default function ServicesPage() {
  return (
    <RegionProvider>
      <Layout>
        <Section
          eyebrow="Services"
          title="SEO, SMO, Paid Media, and Analytics"
          desc="Everything we do is measurable, trackable, and focused on revenue growth."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {[
              ["SEO", "Technical audits, keywords, on-page SEO, content strategy, link building."],
              ["SMO", "Profile optimization, content systems, engagement, community growth."],
              ["Paid Search & Social", "Google Ads + paid social built for profitable scale."],
              ["Analytics & CRO", "Tracking, funnels, dashboards, landing page optimization."],
            ].map(([t, d]) => (
              <div
                key={t}
                className="rounded-2xl bg-slate-900/80 p-6 ring-1 ring-white/10"
              >
                <h3 className="text-lg font-semibold text-teal-200">{t}</h3>
                <p className="mt-3 text-white/70 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </Section>
      </Layout>
    </RegionProvider>
  );
}
