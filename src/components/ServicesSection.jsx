import React from "react";
import Section from "./Section.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { useInView } from "../hooks/useInView.js";

const SearchIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const UsersIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const DollarSignIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
const ActivityIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;

export default function ServicesSection() {
  const { theme } = useTheme();
  const [containerRef, isContainerInView] = useInView({ threshold: 0.1 });
  const services = [
    {
      title: "Search Engine Optimization (SEO)",
      body: "Technical audits, on-page optimization, content strategy, and ethical link building.",
      Icon: SearchIcon,
    },
    {
      title: "Social Media Optimization (SMO)",
      body: "Platform-native content systems that grow communities and drive conversions.",
      Icon: UsersIcon,
    },
    {
      title: "Paid Search & Social",
      body: "High-intent Google Ads and paid social campaigns built to scale profitably.",
      Icon: DollarSignIcon,
    },
    {
      title: "Tracking, Analytics & CRO",
      body: "Event tracking, funnels, and landing-page experiments to improve ROI.",
      Icon: ActivityIcon,
    },
  ];

  const cardThemeClasses = {
    light: {
      card: "rounded-3xl bg-white shadow-soft ring-1 ring-slate-900/[0.06] hover:-translate-y-1 hover:shadow-lift hover:ring-teal-500/25",
      title: "text-teal-700",
      body: "text-slate-600",
    },
    dark: {
      card: "rounded-3xl bg-slate-900/80 shadow-lift ring-1 ring-white/[0.08] hover:-translate-y-1 hover:ring-teal-400/25",
      title: "text-teal-300",
      body: "text-slate-400",
    },
  };

  return (
    <Section
      id="services"
      tone="muted"
      eyebrow="What We Do"
      title="Performance-led SEO & SMO for modern brands"
      desc="We blend technical search, strategic content, and thumb-stopping social."
    >
      <div ref={containerRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {services.map((s, index) => (
          <div
            key={s.title}
            className={`p-6 transition-all duration-500 ease-out sm:p-7 ${
              cardThemeClasses[theme].card
            } ${isContainerInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div
              className={`mb-5 inline-flex rounded-2xl p-3.5 ${
                theme === "dark" ? "bg-white/[0.06] ring-1 ring-white/10" : "bg-teal-50 ring-1 ring-teal-100"
              }`}
            >
              <s.Icon className={`h-6 w-6 ${cardThemeClasses[theme].title}`} />
            </div>
            <h3 className={`mb-3 font-display text-lg font-semibold tracking-tight ${cardThemeClasses[theme].title}`}>
              {s.title}
            </h3>
            <p className={`text-base leading-relaxed ${cardThemeClasses[theme].body}`}>{s.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
