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
      card: "bg-white ring-1 ring-gray-200",
      featuredCard: "bg-slate-900 text-white ring-2 ring-slate-900",
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
      card: "bg-slate-900/80 ring-1 ring-white/10",
      featuredCard: "bg-slate-800 ring-2 ring-teal-300",
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
        url: "https://www.vibesdigitalmedia.com/#/contact",
      })),
    };
  }, [activeRegion]);

  return (
    <Section id="pricing" eyebrow="Pricing" title="Plans that scale with you">
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
              className={`relative rounded-2xl p-6 transition-all duration-500 ease-out ${
                isFeatured ? "transform lg:scale-110" : ""
              } ${cardClasses} ${isContainerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {isFeatured && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${themeClasses[theme].badge}`}>
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className={`text-lg font-semibold ${nameClasses}`}>{plan.name}</h3>
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
                className={`mt-8 block w-full rounded-lg py-3 px-6 text-center text-sm font-semibold transition-colors ${buttonClasses}`}
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