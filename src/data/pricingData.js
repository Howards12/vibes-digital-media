/** Monthly retainers — USD base; regional selector applies FX on site. */

export const engagementIncludes = [
  "60-minute kickoff & channel audit snapshot",
  "Shared performance dashboard + monthly executive summary",
  "Business-hours async support (email + agreed chat)",
];

export const pricingFootnote =
  "Prices shown as monthly retainers in your selected region (USD base). Minimum term, scope boundaries, and ad spend are confirmed on your strategy call.";

export const pricingPlans = [
  {
    slug: "launch",
    name: "Launch",
    tagline: "Consistent presence + SEO hygiene",
    idealFor: "Solo operators, creators, and local brands testing traction",
    priceUSD: 199,
    desc: "Foundations: optimized profiles, a steady posting cadence, and core on-page SEO so you look credible and get indexed the right way.",
    summary: ["8 posts / month", "On-page SEO tune-up", "Monthly snapshot"],
    features: [
      "Social profile optimization (Instagram, Facebook, LinkedIn)",
      "8 posts/month — captions, hashtags, and a simple content calendar",
      "SEO essentials: titles, meta, headings, internal links, sitemap hygiene",
      "Google Business Profile tune-up (where applicable)",
      "Monthly performance snapshot + 3 prioritized next steps",
      "Email support (next-business-day target)",
    ],
    isFeatured: false,
    ctaLabel: "Start with Launch",
  },
  {
    slug: "momentum",
    name: "Momentum",
    tagline: "Repeatable growth systems",
    idealFor: "Small teams ready to compound search + social together",
    priceUSD: 499,
    desc: "Our most-booked package: more creative throughput, deeper on-page SEO, and a clear monthly roadmap tied to leads—not vanity metrics.",
    summary: ["12 posts / month", "Keyword set + on-page sprint", "Reporting + roadmap"],
    features: [
      "Everything in Launch",
      "12 posts/month with branded templates + approval workflow",
      "On-page SEO improvements on priority URLs",
      "Starter keyword set + content briefs aligned to intent",
      "Lead capture recommendations (forms, CTAs, landing hooks)",
      "Monthly reporting deck + rolling 90-day growth plan",
    ],
    isFeatured: true,
    ctaLabel: "Choose Momentum",
  },
  {
    slug: "scale",
    name: "Scale",
    tagline: "Velocity for lean marketing teams",
    idealFor: "Brands launching campaigns across regions or channels",
    priceUSD: 799,
    desc: "Higher output, technical SEO guardrails, and local visibility plays—built for teams that need pace without hiring a full in-house bench.",
    summary: ["16–20 posts / mo", "Technical SEO fixes list", "Local + GBP cadence"],
    features: [
      "Everything in Momentum",
      "16–20 posts/month + editorial calendar + seasonal hooks",
      "Technical SEO audit loop (issues, fixes, re-validation)",
      "Local SEO push: citation consistency guidance + GBP posting cadence",
      "Conversion recommendations (landing structure, offer clarity)",
      "Priority support with faster turnaround targets",
    ],
    isFeatured: false,
    ctaLabel: "Go to Scale",
  },
  {
    slug: "premier",
    name: "Premier",
    tagline: "Senior oversight + aggressive targets",
    idealFor: "Aggressive growth, launches, or competitive categories",
    priceUSD: 999,
    desc: "Senior strategist bandwidth, weekly tempo, and CRO-aware iterations—when misses are expensive and you need a partner who owns the scoreboard with you.",
    summary: ["Weekly cadence", "SEO + CRO roadmap", "Launch & promo support"],
    features: [
      "Everything in Scale",
      "Advanced SEO roadmap (content clusters + technical sequencing)",
      "CRO review cycle on key money pages",
      "Weekly check-ins / async progress updates (your preference)",
      "Campaign support for launches, promos, and seasonal pushes",
      "Top-priority creative + SEO turnaround within agreed SLAs",
    ],
    isFeatured: false,
    ctaLabel: "Talk Premier",
  },
];

export const featuredPlanPriceUSD =
  pricingPlans.find((p) => p.isFeatured)?.priceUSD ?? 499;

export function formatPrice(price, currency) {
  if (["NGN", "ZAR", "RWF"].includes(currency)) {
    return Math.round(price).toLocaleString("en-US");
  }
  if (currency === "EUR") {
    return (Math.round(price / 10) * 10).toLocaleString("en-US");
  }
  return Math.round(price).toLocaleString("en-US");
}
