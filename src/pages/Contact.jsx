import React from "react";
import Section from "../components/Section.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { useRegion } from "../context/RegionContext.jsx";
import { formatPrice } from "../data/pricingData.js";

export default function ContactPage() {
  const { theme } = useTheme();
  const { activeRegion } = useRegion();

  // Base USD prices for the plans (from pricingData.js)
  const starterPriceUSD = 499; // Most popular plan
  const localPrice = starterPriceUSD * activeRegion.fx;

  const themeClasses = {
    light: {
      card: "bg-white border-gray-200 text-gray-900",
      price: "text-slate-900",
      localPrice: "text-teal-600",
      note: "text-gray-600",
    },
    dark: {
      card: "bg-slate-800/50 border-white/10 text-white",
      price: "text-white",
      localPrice: "text-teal-300",
      note: "text-white/70",
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
          {/* Region-aware pricing display */}
          <div className={`mb-8 rounded-xl border p-6 ${themeClasses[theme].card}`}>
            <div className="flex flex-col items-center text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <p className={`text-sm font-semibold uppercase tracking-wider ${themeClasses[theme].note}`}>
                  Starting Investment
                </p>
                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <span className={`text-3xl font-bold ${themeClasses[theme].price}`}>
                    ${starterPriceUSD.toLocaleString()} USD
                  </span>
                  {!isUSD && (
                    <>
                      <span className={`text-lg ${themeClasses[theme].note}`}>≈</span>
                      <span className={`text-2xl font-semibold ${themeClasses[theme].localPrice}`}>
                        {activeRegion.symbol}
                        {formatPrice(localPrice, activeRegion.currency)}
                      </span>
                      <span className={`text-sm ${themeClasses[theme].note}`}>
                        {activeRegion.currency}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className={`mt-4 text-xs ${themeClasses[theme].note} sm:mt-0 sm:text-right`}>
                <p className="font-medium">All payments processed in USD</p>
                <p className="mt-1">Local amounts are approximate</p>
              </div>
            </div>
          </div>

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