import React from "react";
import { useSearchParams } from "react-router-dom";
import Section from "../components/Section.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { useRegion } from "../context/RegionContext.jsx";
import { formatPrice, pricingPlans, featuredPlanPriceUSD } from "../data/pricingData.js";

export default function ContactPage() {
  const { theme } = useTheme();
  const { activeRegion } = useRegion();
  const [searchParams] = useSearchParams();

  const planSlug = searchParams.get("plan");
  const selectedPlan = planSlug ? pricingPlans.find((p) => p.slug === planSlug) : null;
  const defaultFeatured = pricingPlans.find((p) => p.isFeatured);
  const highlightPlan = selectedPlan ?? defaultFeatured;
  const priceUSD = highlightPlan ? highlightPlan.priceUSD : featuredPlanPriceUSD;
  const localPrice = priceUSD * activeRegion.fx;

  const themeClasses = {
    light: {
      card: "border-slate-200 bg-white text-slate-900 shadow-soft ring-1 ring-slate-900/[0.04]",
      price: "text-slate-900",
      localPrice: "text-teal-600",
      note: "text-slate-600",
      pill: "bg-teal-50 text-teal-800 ring-1 ring-teal-100",
    },
    dark: {
      card: "border-white/10 bg-slate-900/70 text-white ring-1 ring-white/[0.06]",
      price: "text-white",
      localPrice: "text-teal-300",
      note: "text-slate-400",
      pill: "bg-white/10 text-teal-200 ring-1 ring-white/10",
    },
  };

  const isUSD = activeRegion.code === "US";

  return (
    <main>
      <Section
        eyebrow="Contact Us"
        title="Let's Build Your Growth Engine"
        desc="Fill out the form below, and we'll get back to you within 24 hours to schedule your free strategy call."
      >
        <div className="mx-auto max-w-2xl">
          <div className={`mb-8 rounded-2xl border p-6 sm:p-7 ${themeClasses[theme].card}`}>
            {selectedPlan && (
              <p
                className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${themeClasses[theme].pill}`}
              >
                Package selected: {selectedPlan.name}
              </p>
            )}
            <div className="flex flex-col items-center text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <p className={`text-sm font-semibold uppercase tracking-wider ${themeClasses[theme].note}`}>
                  {selectedPlan ? `${selectedPlan.name} retainer` : "Featured retainer (most popular)"}
                </p>
                <p className={`mt-1 text-xs ${themeClasses[theme].note}`}>
                  {highlightPlan?.tagline ?? "Momentum — repeatable growth systems"}
                </p>
                <div className="mt-3 flex flex-wrap items-baseline justify-center gap-2 sm:justify-start">
                  <span className={`text-3xl font-bold ${themeClasses[theme].price}`}>
                    ${priceUSD.toLocaleString()} USD
                  </span>
                  <span className={`text-sm font-medium ${themeClasses[theme].note}`}>/ month</span>
                  {!isUSD && (
                    <>
                      <span className={`text-lg ${themeClasses[theme].note}`}>≈</span>
                      <span className={`text-2xl font-semibold ${themeClasses[theme].localPrice}`}>
                        {activeRegion.symbol}
                        {formatPrice(localPrice, activeRegion.currency)}
                      </span>
                      <span className={`text-sm ${themeClasses[theme].note}`}>{activeRegion.currency}</span>
                    </>
                  )}
                </div>
              </div>
              <div className={`mt-4 text-xs ${themeClasses[theme].note} sm:mt-0 sm:max-w-[12rem] sm:text-right`}>
                <p className="font-medium">All payments processed in USD</p>
                <p className="mt-1">Local amounts are approximate</p>
              </div>
            </div>
          </div>

          <iframe
            title="Contact Vibes Digital Media"
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
