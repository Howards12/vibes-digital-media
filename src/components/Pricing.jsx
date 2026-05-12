import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Section from "./Section.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { useRegion } from "../context/RegionContext.jsx";
import { useInView } from "../hooks/useInView.js";
import { pricingPlans, formatPrice } from "../data/pricingData.js";

export default function Pricing() {
  const { theme } = useTheme();
  const { activeRegion } = useRegion();
  const [containerRef, isContainerInView] = useInView({ threshold: 0.1 });

  const themeClasses = {
    light: {
      card: "rounded-3xl bg-white shadow-soft ring-1 ring-slate-900/[0.06] hover:-translate-y-1 hover:shadow-lift",
      featuredCard:
        "rounded-3xl bg-slate-900 text-white shadow-glow ring-2 ring-teal-500/30 hover:-translate-y-1",
      name: "text-teal-600",
      featuredName: "text-teal-200",
      price: "text-gray-900",
      featuredPrice: "text-white",
      desc: "text-gray-600",
      featuredDesc: "text-white/70",
      feature: "text-gray-600",
      featuredFeature: "text-white/80",
      button: "bg-slate-900 text-white hover:bg-slate-800",
      featuredButton: "bg-white text-slate-900 hover:bg-gray-200",
      badge: "bg-teal-500 text-white shadow-lg",
    },
    dark: {
      card: "rounded-3xl bg-slate-900/80 shadow-lift ring-1 ring-white/[0.08] hover:-translate-y-1",
      featuredCard:
        "rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 shadow-glow ring-2 ring-teal-400/40 hover:-translate-y-1",
      name: "text-teal-200",
      featuredName: "text-teal-200",
      price: "text-white",
      featuredPrice: "text-white",
      desc: "text-white/70",
      featuredDesc: "text-white/70",
      feature: "text-white/80",
      featuredFeature: "text-white/80",
      button: "bg-white text-slate-900 hover:opacity-95",
      featuredButton: "bg-teal-300 text-slate-900 hover:bg-teal-200",
      badge: "bg-teal-300 text-slate-900 shadow-lg shadow-teal-300/20",
    },
  };

  const schema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Digital Marketing Services",
      description: "Performance-led SEO & SMO for modern brands.",
      brand: {
        "@type": "Organization",
        name: "Vibes Digital Media",
      },
      offers: pricingPlans.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        description: plan.desc,
        price: (plan.priceUSD * activeRegion.fx).toFixed(0),
        priceCurrency: activeRegion.currency,
        availability: "https://schema.org/InStock",
        url: "https://vibesdigitalmedia.org/#/contact",
      })),
    };
  }, [activeRegion]);

  return (
    <Section id="pricing" tone="muted" eyebrow="Pricing" title="Plans that scale with you">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div ref={containerRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:items-start">
        {pricingPlans.map((plan, index) => {
          const isFeatured = plan.isFeatured;
          const localPrice = plan.priceUSD * activeRegion.fx;
          const cardClasses = isFeatured ? themeClasses[theme].featuredCard : themeClasses[theme].card;
          const nameClasses = isFeatured ? themeClasses[theme].featuredName : themeClasses[theme].name;
          const priceClasses = isFeatured ? themeClasses[theme].featuredPrice : themeClasses[theme].price;
          const descClasses = isFeatured ? themeClasses[theme].featuredDesc : themeClasses[theme].desc;
          const featureClasses = isFeatured ? themeClasses[theme].featuredFeature : themeClasses[theme].feature;
          const buttonClasses = isFeatured ? themeClasses[theme].featuredButton : themeClasses[theme].button;
          
          return (
            <div
              key={plan.name}
              className={`relative p-6 transition-all duration-500 ease-out sm:p-7 ${
                isFeatured ? "transform lg:scale-[1.04]" : ""
              } ${cardClasses} ${isContainerInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {isFeatured && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${themeClasses[theme].badge}`}>
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className={`font-display text-lg font-semibold tracking-tight ${nameClasses}`}>{plan.name}</h3>
              <p className={`mt-2 ${descClasses}`}>{plan.desc}</p>
              <p className="mt-6">
                <span className="text-4xl font-bold tracking-tight">
                  {activeRegion.symbol}
                  {formatPrice(localPrice, activeRegion.currency)}
                </span>
                <span className={`text-sm font-semibold ${descClasses}`}>/month</span>
              </p>
              <Link
                to="/contact"
                className={`mt-8 block w-full rounded-full py-3.5 px-6 text-center text-sm font-semibold transition hover:-translate-y-0.5 ${buttonClasses}`}
              >
                Get Started
              </Link>
              <ul className={`mt-8 space-y-3 text-sm ${featureClasses}`}>
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-400"><path d="M20 6 9 17l-5-5"></path></svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}