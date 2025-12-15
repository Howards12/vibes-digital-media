export const pricingPlans = [
  {
    name: "Basic",
    priceUSD: 199,
    desc: "Starter SMO + light SEO tune-up.",
    features: [
      "Social media profile optimization (IG/Facebook/LinkedIn)",
      "8 posts/month content plan (captions + hashtags)",
      "Basic SEO tune-up (titles, meta, headings, internal links)",
      "Google Business Profile optimization (if applicable)",
      "Monthly performance snapshot",
      "Email support",
    ],
    isFeatured: false,
  },
  {
    name: "Starter",
    priceUSD: 499,
    desc: "Consistent growth foundations.",
    features: [
      "Everything in Basic",
      "12 posts/month + branded templates",
      "On-page SEO improvements (top pages)",
      "Keyword targeting (starter set)",
      "Lead capture recommendations",
      "Monthly reporting + next-step plan",
    ],
    isFeatured: true,
  },
  {
    name: "Growth",
    priceUSD: 799,
    desc: "Best for growth teams.",
    features: [
      "Everything in Starter",
      "16–20 posts/month + content calendar",
      "Technical SEO checks (core issues + fixes list)",
      "Local SEO boost (citations guidance + GBP posting)",
      "Conversion optimization suggestions",
      "Priority support",
    ],
    isFeatured: false,
  },
  {
    name: "Professional",
    priceUSD: 999,
    desc: "Best for aggressive scaling.",
    features: [
      "Everything in Growth",
      "Advanced SEO strategy (content + technical roadmap)",
      "Conversion rate optimization (CRO) review",
      "Weekly check-ins / progress updates",
      "Campaign support (launches, promos, offers)",
      "Top-priority turnaround",
    ],
    isFeatured: false,
  },
];

export function formatPrice(price, currency) {
  if (["NGN", "ZAR", "RWF"].includes(currency)) {
    return Math.round(price).toLocaleString("en-US");
  }
  if (currency === "EUR") {
    return (Math.round(price / 10) * 10).toLocaleString("en-US");
  }
  return Math.round(price).toLocaleString("en-US");
}