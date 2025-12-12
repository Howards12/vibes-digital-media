import React, { useContext, useMemo, useState } from "react";
import { RegionContext } from "../context/RegionContext.jsx";

const container = "mx-auto max-w-6xl px-4";

/**
 * Pricing model:
 * - Base prices in USD/month
 * - Yearly uses 12 * monthly * discount
 * - Local currency uses RegionContext fx conversion
 */
const PLANS = [
  {
    key: "basic",
    name: "Basic",
    subtitle: "Starter SMO + light SEO tune-up",
    usdMonthly: 199,
    featured: false,
    features: [
      "Social media profile optimization (IG/Facebook/LinkedIn)",
      "8 posts/month content plan (captions + hashtags)",
      "Basic SEO tune-up (titles, meta, headings, internal links)",
      "Google Business Profile optimization (if applicable)",
      "Monthly performance snapshot",
      "Email support",
    ],
  },
  {
    key: "starter",
    name: "Starter",
    subtitle: "Consistent growth foundations",
    usdMonthly: 399,
    featured: true,
    features: [
      "Everything in Basic",
      "12 posts/month + branded templates",
      "On-page SEO improvements (top pages)",
      "Keyword targeting (starter set)",
      "Lead capture recommendations",
      "Monthly reporting + next-step plan",
    ],
  },
  {
    key: "growth",
    name: "Growth",
    subtitle: "Best for growth teams",
    usdMonthly: 799,
    featured: false,
    features: [
      "Everything in Starter",
      "16–20 posts/month + content calendar",
      "Technical SEO checks (core issues + fixes list)",
      "Local SEO boost (citations guidance + GBP posting)",
      "Conversion optimization suggestions",
      "Priority support",
    ],
  },
  {
    key: "pro",
    name: "Professional",
    subtitle: "Best for aggressive scaling",
    usdMonthly: 1499,
    featured: false,
    features: [
      "Everything in Growth",
      "Advanced SEO strategy (content + technical roadmap)",
      "Conversion rate optimization (CRO) review",
      "Weekly check-ins / progress updates",
      "Campaign support (launches, promos, offers)",
      "Top-priority turnaround",
    ],
  },
];

function makeProductJsonLd(activeRegion, billing, plans) {
  const period = billing === "yearly" ? "year" : "month";
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: plans.map((p, idx) => {
      const priceUSD =
        billing === "yearly" ? p.usdMonthly * 12 * 0.9 : p.usdMonthly;

      return {
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "Product",
          name: `Vibes Digital Media - ${p.name} Plan`,
          description: p.subtitle,
          offers: {
            "@type": "Offer",
            priceCurrency: activeRegion.currency,
            price: String(priceUSD),
            availability: "https://schema.org/InStock",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              priceCurrency: activeRegion.currency,
              price: String(priceUSD),
              unitText: period,
            },
          },
        },
      };
    }),
  };
}

export default function Pricing() {
  const ctx = useContext(RegionContext);
  if (!ctx) return null;

  const { activeRegion, convertFromUSD, formatMoney } = ctx;

  const [billing, setBilling] = useState("monthly"); // "monthly" | "yearly"
  const yearlyDiscount = 0.9; // tune if needed

  const getLocalPriceLabel = (usdMonthly) => {
    const usd =
      billing === "yearly" ? usdMonthly * 12 * yearlyDiscount : usdMonthly;
    const local = convertFromUSD(usd);
    return formatMoney(local);
  };

  const jsonLd = useMemo(
    () => makeProductJsonLd(activeRegion, billing, PLANS),
    [activeRegion, billing]
  );

  return (
    <section id="pricing" className="py-20 bg-[#020817] text-white">
      <div className={container}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-teal-300 font-semibold tracking-wide">Pricing</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
              Packages that fit your growth stage
            </h2>
            <p className="mt-2 text-white/70 max-w-2xl">
              Transparent pricing in{" "}
              <span className="text-white">{activeRegion.label}</span>.{" "}
              <span className="text-white/50">
                (Approximate local conversion from USD — final invoicing may vary
                by exchange rate.)
              </span>
            </p>
          </div>

          {/* Monthly / Yearly toggle */}
          <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2 ring-1 ring-white/10 self-start">
            <button
              onClick={() => setBilling("monthly")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                billing === "monthly"
                  ? "bg-white/15 text-white"
                  : "text-white/70 hover:text-white"
              }`}
              type="button"
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                billing === "yearly"
                  ? "bg-white/15 text-white"
                  : "text-white/70 hover:text-white"
              }`}
              type="button"
              title="Save with yearly billing"
            >
              Yearly <span className="ml-1 text-teal-300">-10%</span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {PLANS.map((plan) => (
            <div
              key={plan.key}
              className={[
                "rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 transition-transform duration-300",
                "hover:-translate-y-1 hover:bg-white/7",
                plan.featured ? "ring-teal-400/40 bg-white/7" : "",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="mt-1 text-white/65 text-sm">{plan.subtitle}</p>
                </div>
                {plan.featured && (
                  <span className="rounded-full bg-teal-500/15 text-teal-300 px-3 py-1 text-xs font-semibold ring-1 ring-teal-400/30">
                    Most popular ✅
                  </span>
                )}
              </div>

              {/* Price area (prevents overlap + forces one-line price) */}
              <div className="mt-6 rounded-xl bg-black/20 p-4 ring-1 ring-white/10">
                <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-white/60 text-xs uppercase tracking-wider">
                      From
                    </p>

                    {/* ✅ One-line price: no wrapping */}
                    <p className="mt-1 font-extrabold leading-none whitespace-nowrap tabular-nums text-2xl lg:text-3xl">
                      {getLocalPriceLabel(plan.usdMonthly)}
                    </p>

                    <p className="mt-2 text-white/55 text-sm">
                      / {billing === "yearly" ? "year" : "month"}
                    </p>
                  </div>

                  <div className="text-right text-xs text-white/55">
                    <div className="rounded-lg bg-white/5 px-2 py-1 ring-1 ring-white/10 whitespace-nowrap">
                      Base USD: ${plan.usdMonthly}/mo
                    </div>
                  </div>
                </div>
              </div>

              <ul className="mt-6 space-y-2 text-white/80 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-teal-300">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-teal-500 px-5 py-3 font-semibold text-slate-900 hover:bg-teal-400 transition"
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}