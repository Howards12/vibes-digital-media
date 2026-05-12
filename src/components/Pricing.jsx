import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Section from "./Section.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { useRegion } from "../context/RegionContext.jsx";
import { useInView } from "../hooks/useInView.js";
import {
  pricingPlans,
  formatPrice,
  engagementIncludes,
  pricingFootnote,
} from "../data/pricingData.js";

export default function Pricing() {
  const { theme } = useTheme();
  const { activeRegion } = useRegion();
  const [containerRef, isContainerInView] = useInView({ threshold: 0.08 });

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
      chip: "border-slate-200/90 bg-slate-50 text-slate-700",
      featuredChip: "border-white/15 bg-white/10 text-white/90",
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
      chip: "border-white/12 bg-white/[0.06] text-slate-200",
      featuredChip: "border-white/20 bg-white/[0.08] text-white",
    },
  };

  const t = themeClasses[theme];

  const includedBox =
    theme === "light"
      ? "border border-slate-200/80 bg-white/90 text-slate-700 ring-1 ring-slate-900/[0.04]"
      : "border border-white/10 bg-slate-900/60 text-slate-300 ring-1 ring-white/[0.06]";

  const schema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Digital marketing retainers — Vibes Digital Media",
      description:
        "Packaged monthly retainers for SEO, social media optimization, and growth reporting.",
      brand: {
        "@type": "Organization",
        name: "Vibes Digital Media",
      },
      offers: pricingPlans.map((plan) => ({
        "@type": "Offer",
        name: `${plan.name} — ${plan.tagline}`,
        description: plan.desc,
        price: (plan.priceUSD * activeRegion.fx).toFixed(0),
        priceCurrency: activeRegion.currency,
        availability: "https://schema.org/InStock",
        url: "https://vibesdigitalmedia.org/#/contact",
      })),
    };
  }, [activeRegion]);

  return (
    <Section
      id="pricing"
      tone="muted"
      eyebrow="Packaged offerings"
      title="Pick a retainer with clear deliverables"
      desc="Four fixed scopes—same operating cadence—so you always know what ships each month. Upgrade tiers inherit everything below them."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className={`mb-12 rounded-2xl px-5 py-6 sm:px-8 sm:py-7 ${includedBox}`}>
        <p
          className={`text-center text-xs font-bold uppercase tracking-[0.22em] ${
            theme === "light" ? "text-teal-700" : "text-teal-300"
          }`}
        >
          Included in every package
        </p>
        <ul className="mt-4 flex flex-col gap-3 sm:mx-auto sm:max-w-2xl">
          {engagementIncludes.map((line) => (
            <li key={line} className="flex gap-3 text-sm leading-relaxed sm:text-base">
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  theme === "light" ? "bg-teal-100 text-teal-700" : "bg-teal-500/20 text-teal-300"
                }`}
                aria-hidden
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      <div ref={containerRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:items-start">
        {pricingPlans.map((plan, index) => {
          const isFeatured = plan.isFeatured;
          const localPrice = plan.priceUSD * activeRegion.fx;
          const cardClasses = isFeatured ? t.featuredCard : t.card;
          const nameClasses = isFeatured ? t.featuredName : t.name;
          const priceClasses = isFeatured ? t.featuredPrice : t.price;
          const descClasses = isFeatured ? t.featuredDesc : t.desc;
          const featureClasses = isFeatured ? t.featuredFeature : t.feature;
          const buttonClasses = isFeatured ? t.featuredButton : t.button;
          const chipClasses = isFeatured ? t.featuredChip : t.chip;

          return (
            <div
              key={plan.slug}
              className={`relative flex flex-col p-6 transition-all duration-500 ease-out sm:p-7 ${
                isFeatured ? "transform lg:scale-[1.04]" : ""
              } ${cardClasses} ${isContainerInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {isFeatured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${t.badge}`}>
                    Most popular
                  </span>
                </div>
              )}

              <div className="min-h-[3.25rem]">
                <h3 className={`font-display text-xl font-bold tracking-tight ${nameClasses}`}>{plan.name}</h3>
                <p className={`mt-1 text-xs font-medium leading-snug ${descClasses}`}>{plan.idealFor}</p>
              </div>

              <p className={`mt-3 text-sm font-semibold leading-snug ${nameClasses}`}>{plan.tagline}</p>
              <p className={`mt-2 text-sm leading-relaxed ${descClasses}`}>{plan.desc}</p>

              <p className="mt-6">
                <span className={`text-4xl font-bold tracking-tight ${priceClasses}`}>
                  {activeRegion.symbol}
                  {formatPrice(localPrice, activeRegion.currency)}
                </span>
                <span className={`text-sm font-semibold ${descClasses}`}> /month</span>
              </p>
              <p className={`mt-1 text-xs font-medium uppercase tracking-wider ${descClasses}`}>Billed monthly · USD base</p>

              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Highlights">
                {plan.summary.map((s) => (
                  <li
                    key={s}
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide sm:text-xs ${chipClasses}`}
                  >
                    {s}
                  </li>
                ))}
              </ul>

              <Link
                to={`/contact?plan=${encodeURIComponent(plan.slug)}`}
                className={`mt-6 block w-full rounded-full py-3.5 px-6 text-center text-sm font-semibold transition hover:-translate-y-0.5 ${buttonClasses}`}
              >
                {plan.ctaLabel}
              </Link>

              <div className="mt-8 flex flex-1 flex-col border-t border-inherit pt-6">
                <p className={`text-xs font-bold uppercase tracking-[0.18em] ${nameClasses}`}>Deliverables</p>
                <ul className={`mt-4 flex-1 space-y-2.5 text-sm ${featureClasses}`}>
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 shrink-0 text-teal-500 dark:text-teal-400"
                        aria-hidden
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <p
        className={`mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed sm:text-sm ${
          theme === "light" ? "text-slate-500" : "text-slate-500"
        }`}
      >
        {pricingFootnote}
      </p>
    </Section>
  );
}
