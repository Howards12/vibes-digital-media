import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  createContext,
} from "react";
import { motion, useInView } from "framer-motion";

/**
 * Vibes Digital Media
 * Single-page marketing site with embedded Google Forms
 * Updated with consistent form overlays and standardized fonts
 */

const BRAND = {
  primary: "#0F766E",
  primaryDark: "#0B4F4A",
  accent: "#06B6D4",
};

const WHATSAPP_NUMBER = "+13465466197";
const WHATSAPP_LINK =
  "https://wa.me/13465466197?text=Hi%20Vibes%20Digital%20Media%2C%20I%27d%20like%20to%20discuss%20SEO%20and%20SMO%20services.";

const container = "mx-auto max-w-6xl px-4";

// ---------- REGION CONTEXT ----------
const RegionContext = createContext({ region: "US", setRegion: () => {} });

const regions = [
  {
    code: "US",
    label: "United States",
    currency: "USD",
    flag: () => (
      <svg viewBox="0 0 7410 3900" className="h-4 w-6 rounded-sm">
        <path fill="#b22234" d="M0 0h7410v3900H0z" />
        <path
          stroke="#fff"
          strokeWidth="300"
          d="M0 450h7410M0 1050h7410M0 1650h7410M0 2250h7410M0 2850h7410M0 3450h7410"
        />
        <path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
      </svg>
    ),
  },
  {
    code: "EU",
    label: "Europe",
    currency: "EUR",
    flag: () => (
      <svg viewBox="0 0 810 540" className="h-4 w-6 rounded-sm">
        <path fill="#003399" d="M0 0h810v540H0z" />
        <g fill="#ffcc00">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (Math.PI * 2 * i) / 12;
            const cx = 405 + 150 * Math.cos(a);
            const cy = 270 + 150 * Math.sin(a);
            return (
              <polygon
                key={i}
                points={`${cx},${cy - 10} ${cx + 3},${cy - 3} ${cx + 10},${
                  cy - 3
                } ${cx + 4},${cy + 2} ${cx + 6},${cy + 9} ${cx},${cy + 5} ${
                  cx - 6
                },${cy + 9} ${cx - 4},${cy + 2} ${cx - 10},${cy - 3} ${
                  cx - 3
                },${cy - 3}`}
              />
            );
          })}
        </g>
      </svg>
    ),
  },
  {
    code: "NG",
    label: "Nigeria",
    currency: "USD",
    flag: () => (
      <svg viewBox="0 0 3 2" className="h-4 w-6 rounded-sm">
        <path fill="#008753" d="M0 0h1v2H0zM2 0h1v2H2z" />
        <path fill="#fff" d="M1 0h1v2H1z" />
      </svg>
    ),
  },
  {
    code: "ZA",
    label: "South Africa",
    currency: "USD",
    flag: () => (
      <svg viewBox="0 0 9 6" className="h-4 w-6 rounded-sm">
        <path fill="#ffb81c" d="M0 0h9v6H0z" />
        <path fill="#001489" d="M0 0h9v2H0z" />
        <path fill="#de3831" d="M0 4h9v2H0z" />
        <path fill="#fff" d="M0 2h9v2H0z" />
        <path fill="#007a4d" d="M0 2l3 1-3 1z" />
        <path fill="#000" d="M0 2v2l2-1z" />
      </svg>
    ),
  },
];

function detectRegion() {
  try {
    const saved = localStorage.getItem("vdmRegion");
    if (saved) return saved;
    const lang = (navigator.language || "en-US").toUpperCase();
    const country = lang.split("-")[1] || "US";
    const EU_COUNTRIES = [
      "FI", "SE", "NO", "DK", "DE", "FR", "NL", "BE", "ES", "IT", 
      "PT", "IE", "AT", "GR", "PL", "CZ", "SK", "HU", "RO", "BG", 
      "SI", "HR", "EE", "LV", "LT", "LU", "MT", "CY",
    ];
    if (country === "US") return "US";
    if (country === "NG") return "NG";
    if (country === "ZA") return "ZA";
    if (EU_COUNTRIES.includes(country)) return "EU";
    return "US";
  } catch {
    return "US";
  }
}

// ---------- HELPERS ----------
const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl bg-white text-slate-900 shadow-xl ring-1 ring-black/5 ${className}`}
  >
    {children}
  </div>
);

function Section({ id, eyebrow, title, desc, children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });

  return (
    <section id={id} ref={ref} className="relative py-16 sm:py-24">
      <div className={container}>
        {(eyebrow || title) && (
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-teal-200">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl">
                {title}
              </h2>
            )}
            {desc && (
              <p className="mx-auto mt-6 max-w-3xl text-lg text-white/80 leading-relaxed">
                {desc}
              </p>
            )}
          </motion.header>
        )}
        {children}
      </div>
    </section>
  );
}

// ---------- FORM CARD (Fixed: Consistent tint across entire form) ----------
const FormCard = ({
  label,
  title,
  subtitle,
  src,
  height = 900,
  maxHeight = 420,
}) => (
  <div className="relative overflow-hidden rounded-3xl border border-teal-400/30 bg-slate-900/50 p-6 shadow-2xl shadow-teal-500/20">
    {/* Header with logo */}
    <div className="relative mb-4 flex items-center gap-4">
      <img
        src="/assets/vibes-logo.png"
        alt="Vibes Digital Media"
        className="h-12 w-auto"
      />
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-200">
          {label || "Vibes Digital Media"}
        </p>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
    </div>

    {subtitle && (
      <p className="relative mb-4 text-base leading-relaxed text-teal-50/90">
        {subtitle}
      </p>
    )}

    {/* Fixed: Container with consistent tint overlay */}
    <div className="relative rounded-xl border border-teal-500/20 bg-white overflow-hidden">
      {/* Scrollable iframe */}
      <div
        className="overflow-y-auto"
        style={{ maxHeight }}
      >
        <iframe
          src={src}
          title={title}
          className="w-full relative z-0"
          style={{ height, minHeight: '500px' }}
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
        >
          Loading…
        </iframe>
      </div>

      {/* Fixed: Consistent tint overlay that covers entire form */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-teal-500/15 mix-blend-multiply" />
    </div>
  </div>
);

// ---------- REGION BAR ----------
function RegionBar() {
  const { region, setRegion } = useContext(RegionContext);

  return (
    <div className="bg-[#020817] border-b border-white/10">
      <div
        className={`${container} flex flex-wrap items-center justify-between gap-3 py-3 text-sm text-white/80`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="uppercase tracking-[0.18em] text-white/40">
            Global presence:
          </span>
          <span>U.S. • Europe • Nigeria • South Africa</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-white/50">View pricing in:</span>
          {regions.map((r) => (
            <button
              key={r.code}
              onClick={() => setRegion(r.code)}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm ring-1 ring-white/15 transition-all ${
                region === r.code
                  ? "bg-white/18 text-white shadow-lg"
                  : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <r.flag />
              <span className="hidden sm:inline">{r.label}</span>
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <span className="text-white/50">Chat with us:</span>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-emerald-500/90 px-3 py-1.5 text-sm font-semibold text-white hover:bg-emerald-400 transition-colors"
          >
            WhatsApp {WHATSAPP_NUMBER}
          </a>
        </div>
      </div>
    </div>
  );
}

// ---------- NAV ----------
function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  const navLink =
    "rounded-xl px-4 py-2.5 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 transition-all duration-200";

  return (
    <div
      className="sticky top-0 z-40 border-b border-white/10 bg-[var(--nav-bg)]/95 backdrop-blur-lg"
      style={{ ["--nav-bg"]: BRAND.primaryDark }}
    >
      <nav className={`${container} flex items-center justify-between py-4`}>
        <a href="#home" className="flex items-center gap-4 group">
          <img
            src="/assets/vibes-logo.png"
            alt="Vibes Digital Media"
            className="h-16 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <span className="sr-only">Vibes Digital Media</span>
        </a>

        <button
          className="sm:hidden inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15 transition-colors"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <ul className="hidden items-center gap-3 sm:flex">
          <li><a className={navLink} href="#services">Services</a></li>
          <li><a className={navLink} href="#process">Process</a></li>
          <li><a className={navLink} href="#pricing">Pricing</a></li>
          <li><a className={navLink} href="#results">Results</a></li>
          <li><a className={navLink} href="#presence">Presence</a></li>
          <li><a className={navLink} href="#contact">Contact</a></li>
          <li>
            <a
              href="#contact"
              className="ml-3 inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-6 py-2.5 text-base font-semibold text-white shadow-lg shadow-cyan-600/30 ring-1 ring-white/10 hover:opacity-90 transition-opacity"
              style={{ ["--accent"]: BRAND.accent }}
            >
              Free Audit
            </a>
          </li>
        </ul>
      </nav>

      {open && (
        <div className="sm:hidden border-t border-white/10">
          <div className={`${container} py-6`}>
            <div className="grid gap-3">
              {[
                ["#services", "Services"],
                ["#process", "Process"],
                ["#pricing", "Pricing"],
                ["#results", "Results"],
                ["#presence", "Presence"],
                ["#contact", "Contact"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="rounded-xl bg-white/5 px-6 py-4 text-base font-medium text-white hover:bg-white/10 transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- HERO ----------
function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-teal-700 to-cyan-600" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-25" />
      <div className={`${container} relative py-20 sm:py-28`}>
        <div className="grid items-start gap-12 sm:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              SEO &amp; SMO that{" "}
              <span className="text-teal-200">grow your business</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85 leading-relaxed">
              We launch and optimize search + social campaigns that drive
              measurable traffic, qualified leads, and consistent revenue across
              the U.S., Europe, and Africa.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-xl bg-white px-8 py-4 text-base font-semibold text-slate-900 shadow-lg ring-1 ring-black/10 hover:opacity-95 transition-opacity"
              >
                Book a Strategy Call
              </a>
              <a
                href="#pricing"
                className="rounded-xl bg-black/20 px-8 py-4 text-base font-semibold text-white ring-1 ring-white/20 backdrop-blur hover:bg-black/30 transition-colors"
              >
                View Packages
              </a>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-8 text-white/90">
              {[
                ["98%", "client satisfaction"],
                ["50k+", "followers grown"],
                ["200%", "avg. SEO ROI"],
              ].map(([n, l]) => (
                <div key={n}>
                  <div className="text-2xl font-extrabold">{n}</div>
                  <div className="text-base opacity-80">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Free Mini Audit Form */}
          <FormCard
            label="Free Audit"
            title="Get a Free Mini Audit in 24 Hours"
            subtitle="Tell us about your brand so we can review your SEO & social presence and send quick wins straight to your inbox."
            src="https://docs.google.com/forms/d/e/1FAIpQLSfyaMijaMGdRCoVlRxKGaMSez-b8ndCXx_hVaeJ0lgSKFv2NA/viewform?embedded=true"
            height={1851}
            maxHeight={420}
          />
        </div>
      </div>
    </section>
  );
}

// ---------- SERVICES ----------
function Services() {
  const services = [
    {
      title: "Search Engine Optimization (SEO)",
      body: "Technical audits, on-page optimization, search-focused content, and ethical link building that compounds your organic traffic.",
    },
    {
      title: "Social Media Optimization (SMO)",
      body: "Platform-native content, page optimization, and engagement systems that grow communities and drive conversions.",
    },
    {
      title: "Paid Search & Social",
      body: "High-intent Google Ads and paid social campaigns built to scale profitably with clear, transparent reporting.",
    },
    {
      title: "Tracking, Analytics & CRO",
      body: "Event tracking, funnels, and landing-page experiments so every click, lead, and sale is measured and improved.",
    },
  ];
  return (
    <Section
      id="services"
      eyebrow="What We Do"
      title="Performance-led SEO & SMO for modern brands"
      desc="We blend technical search, strategic content, and thumb-stopping social to get you leads, sales, and brand demand—not just impressions."
    >
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-slate-900/70 p-6 text-base text-white/85 ring-1 ring-white/10 hover:ring-teal-400/30 transition-all"
          >
            <h3 className="mb-3 text-lg font-semibold text-teal-200">
              {s.title}
            </h3>
            <p className="text-base text-white/70 leading-relaxed">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ---------- PROCESS ----------
function Process() {
  const steps = [
    {
      t: "01. Discovery",
      d: "15–30 minute strategy call to understand your goals, markets, and existing channels.",
    },
    {
      t: "02. Deep Audit",
      d: "Technical, content, and social review to uncover quick wins and long-term growth levers.",
    },
    {
      t: "03. Launch & Optimize",
      d: "Rollout SEO & SMO sprints with weekly tweaks based on live performance.",
    },
    {
      t: "04. Scale",
      d: "Double down on what's working, expand to new markets, and protect your gains.",
    },
  ];
  return (
    <Section
      id="process"
      eyebrow="How We Work"
      title="Simple, transparent, results-first"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div
            key={s.t}
            className="rounded-2xl bg-slate-900/80 p-6 text-base text-white/75 ring-1 ring-white/10 hover:bg-slate-900/70 transition-all"
          >
            <div className="text-sm font-semibold text-teal-300 mb-3">
              {s.t}
            </div>
            <p className="leading-relaxed text-white/70">{s.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ---------- PRICING ----------
// Updated pricing structure with $199 and $299 options plus premium tier
const plans = [
  {
    name: "Essential",
    tagline: "Perfect for startups & small businesses.",
    base: 199,
    features: [
      "Basic SEO audit & keyword research",
      "On-page optimization for 3 pages",
      "Social media profile setup",
      "Monthly performance report",
      "Email support",
      "Up to 3 backlinks monthly"
    ],
  },
  {
    name: "Growth",
    tagline: "Ideal for growing businesses.",
    base: 299,
    features: [
      "Comprehensive SEO audit",
      "On-page optimization for 10 pages",
      "Social media management (2 platforms)",
      "Bi-weekly performance reports",
      "Priority email & chat support",
      "Content creation (1 blog/month)",
      "Up to 8 quality backlinks monthly"
    ],
    highlight: true,
  },
  {
    name: "Professional",
    tagline: "For established businesses scaling up.",
    base: 899,
    features: [
      "Advanced SEO strategy & roadmap",
      "Unlimited on-page optimization",
      "Multi-platform social media management",
      "Weekly performance reports",
      "Dedicated account manager",
      "Content creation (4 blogs/month)",
      "Conversion rate optimization",
      "Up to 15 premium backlinks monthly"
    ],
  },
  {
    name: "Enterprise",
    tagline: "For large businesses & multi-location brands.",
    base: 1899,
    features: [
      "Enterprise-grade SEO architecture",
      "Full-scale social media dominance",
      "Real-time analytics dashboard",
      "Weekly strategy calls",
      "Dedicated team of specialists",
      "Advanced content marketing",
      "PPC campaign management",
      "Competitor intelligence reports",
      "Unlimited premium backlinks",
      "24/7 priority support"
    ],
  },
];

function formatPrice(region, base) {
  switch (region) {
    case "EU":
      return `€${Math.round(base * 0.9).toLocaleString()}/mo`;
    case "NG":
    case "ZA":
      return `$${Math.round(base * 0.7).toLocaleString()} USD/mo`;
    case "US":
    default:
      return `$${base.toLocaleString()}/mo`;
  }
}

function Pricing() {
  const { region } = useContext(RegionContext);

  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      title="Transparent Pricing for Every Business Stage"
      desc="Choose the plan that matches your growth ambitions. All packages include our proven strategies and dedicated support."
    >
      <div className="mb-12 text-center">
        <p className="text-lg text-teal-200 font-semibold">
          💡 <strong>Special Offer:</strong> First month 20% off for new clients
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            viewport={{ once: true }}
            className={`flex flex-col rounded-2xl p-6 ring-2 transition-all ${
              p.highlight
                ? "bg-teal-900/80 shadow-2xl shadow-teal-500/30 border-2 border-teal-400 scale-105"
                : "bg-slate-900/80 ring-white/10 hover:ring-teal-400/30"
            }`}
          >
            <div className="flex items-baseline justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {p.name}
                </h3>
                <p className="mt-2 text-base text-white/65">
                  {p.tagline}
                </p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-teal-300">
                  {formatPrice(region, p.base)}
                </div>
                {p.highlight && (
                  <div className="text-sm text-teal-200 font-semibold mt-2 bg-teal-800/50 px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
              </div>
            </div>
            <ul className="flex-1 space-y-3 text-base text-white/75 mb-6">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3 items-start">
                  <span className="mt-2 h-2 w-2 rounded-full bg-teal-400 flex-shrink-0" />
                  <span className="leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="w-full inline-flex items-center justify-center rounded-xl bg-white/95 px-6 py-3 text-base font-semibold text-slate-900 hover:bg-white transition-colors"
            >
              Get Started
            </a>
          </motion.div>
        ))}
      </div>
      <div className="mt-12 text-center text-base text-white/60">
        <p>All packages include our proven framework and dedicated support team</p>
        <p className="mt-2">Custom solutions available for unique business requirements</p>
      </div>
    </Section>
  );
}

// ---------- RESULTS ----------
function Results() {
  const stats = [
    {
      k: "+220%",
      l: "Organic traffic uplift in 6–9 months for service brands.",
    },
    {
      k: "3x",
      l: "More qualified leads from paid + organic working together.",
    },
    {
      k: "50k+",
      l: "New followers driven via optimized social campaigns.",
    },
  ];
  return (
    <Section
      id="results"
      eyebrow="Proof"
      title="Built for measurable growth"
      desc="Every engagement is tracked against leads, revenue, and pipeline—not just clicks."
    >
      <div className="grid gap-8 md:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.k}
            className="rounded-2xl bg-slate-900/80 p-8 text-white/80 ring-1 ring-white/10 text-center hover:bg-slate-900/70 transition-all"
          >
            <div className="text-3xl font-extrabold text-teal-300 mb-4">
              {s.k}
            </div>
            <p className="text-lg text-white/70 leading-relaxed">{s.l}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ---------- PRESENCE ----------
function Presence() {
  return (
    <Section
      id="presence"
      eyebrow="Where We Operate"
      title="Local nuance, global coverage"
      desc="Vibes Digital Media supports clients across North America, Europe, and key African markets with tailored strategies for each region."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 text-base text-white/75">
        <div className="rounded-2xl bg-slate-900/80 p-6 ring-1 ring-white/10 hover:bg-slate-900/70 transition-all">
          <div className="mb-3 text-lg font-semibold text-teal-200">United States</div>
          <p className="leading-relaxed">HQ & primary operations. B2B, DTC, and local service brands with nationwide reach.</p>
        </div>
        <div className="rounded-2xl bg-slate-900/80 p-6 ring-1 ring-white/10 hover:bg-slate-900/70 transition-all">
          <div className="mb-3 text-lg font-semibold text-teal-200">Europe</div>
          <p className="leading-relaxed">EU-ready strategies with language localization, GDPR compliance, and cultural awareness.</p>
        </div>
        <div className="rounded-2xl bg-slate-900/80 p-6 ring-1 ring-white/10 hover:bg-slate-900/70 transition-all">
          <div className="mb-3 text-lg font-semibold text-teal-200">Nigeria</div>
          <p className="leading-relaxed">High-growth tech, fintech, e-commerce, and retail markets with explosive potential.</p>
        </div>
        <div className="rounded-2xl bg-slate-900/80 p-6 ring-1 ring-white/10 hover:bg-slate-900/70 transition-all">
          <div className="mb-3 text-lg font-semibold text-teal-200">South Africa</div>
          <p className="leading-relaxed">Mature brands & enterprises needing sophisticated regional scaling strategies.</p>
        </div>
      </div>
    </Section>
  );
}

// ---------- CTA ----------
function CTA() {
  return (
    <Section
      eyebrow="Ready to Grow?"
      title={
        <>
          Start with a{" "}
          <span className="text-teal-200">Free Marketing Assessment</span>
        </>
      }
      desc="Share your business details and we'll provide a customized growth strategy with actionable insights for your market."
    >
      <div className="flex flex-col items-center gap-6">
        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-2xl bg-teal-500 px-10 py-4 text-lg font-semibold text-slate-900 shadow-xl shadow-teal-500/40 hover:bg-teal-400 transition-colors"
        >
          Get Your Free Assessment
        </a>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="text-base text-emerald-300 hover:text-emerald-200 transition-colors"
        >
          Or chat with us directly on WhatsApp ({WHATSAPP_NUMBER})
        </a>
      </div>
    </Section>
  );
}

// ---------- CONTACT ----------
function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Get Started"
      title={
        <>
          <span className="text-white">Let's Discuss</span>{" "}
          <span className="text-teal-200">Your Growth</span>
        </>
      }
    >
      <div className="mx-auto max-w-4xl">
        <FormCard
          label="Contact Us"
          title="Start Your Growth Journey"
          subtitle="Ready to accelerate your business growth? Share your details and we'll craft a personalized strategy to dominate your market."
          src="https://docs.google.com/forms/d/e/1FAIpQLSdVzQxBo_f8TiYvZ2HOTBOPcbpTgBp6N5rPWhlbf07LlVzFPA/viewform?embedded=true"
          height={1793}
          maxHeight={480}
        />
        <p className="mt-6 text-base text-slate-300 text-center leading-relaxed">
          After submitting the form, you'll receive a confirmation from Google Forms. 
          For immediate assistance or urgent projects, reach out directly on{" "}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            WhatsApp ({WHATSAPP_NUMBER})
          </a>
          .
        </p>
        <motion.a
          href="#pricing"
          className="mt-6 mb-2 block text-center text-sm font-semibold text-teal-300 hover:text-teal-200 transition-colors"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          Compare our pricing plans ↓
        </motion.a>
      </div>
    </Section>
  );
}

// ---------- FOOTER ----------
function Footer() {
  return (
    <footer className="bg-[#050816] py-16 text-white">
      <div className={`${container} grid gap-12 lg:grid-cols-[1.4fr,1fr,1.4fr]`}>
        <div>
          <img
            src="/assets/vibes-logo.png"
            alt="Vibes Digital Media"
            className="h-14 w-auto mb-4"
          />
          <p className="mt-4 max-w-md text-lg text-white/70 leading-relaxed">
            Social & search marketing for ambitious brands. Based in Texas —
            serving clients globally across the U.S., Europe, and Africa with 
            proven growth strategies.
          </p>
          <div className="mt-6 text-base text-white/75 space-y-2">
            <div>
              Email:{" "}
              <a
                href="mailto:support@vibesdigitalmedia.com"
                className="hover:text-teal-300 transition-colors"
              >
                support@vibesdigitalmedia.com
              </a>
            </div>
            <div>
              WhatsApp:{" "}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors"
              >
                {WHATSAPP_NUMBER}
              </a>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold tracking-wide text-white/80 mb-4">
            Quick Links
          </h4>
          <ul className="grid gap-3 text-base text-white/70">
            <li>
              <a href="#services" className="hover:text-white transition-colors">
                What We Do
              </a>
            </li>
            <li>
              <a href="#results" className="hover:text-white transition-colors">
                Case Studies
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-white transition-colors">
                Pricing
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold tracking-wide text-white/80 mb-4">
            Stay Updated
          </h4>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Get the latest digital marketing insights, growth strategies, and 
            industry trends delivered to your inbox.
          </p>
          <div className="mt-4">
            <FormCard
              label="Newsletter"
              title="Join Our Community"
              subtitle="Subscribe for exclusive insights and early access to new strategies."
              src="https://docs.google.com/forms/d/e/1FAIpQLSd79dPcm1Yc5zOmiU6AYTPZVw876AH8poIFw-r3vBqsyi9Hxg/viewform?embedded=true"
              height={851}
              maxHeight={280}
            />
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-white/10 py-8 text-center text-base text-white/55">
        © {new Date().getFullYear()} Vibes Digital Media • All rights reserved • 
        <span className="text-teal-300 ml-2">Driving Business Growth Worldwide</span>
      </div>
    </footer>
  );
}

// ---------- MAIN APP ----------
export default function VibesDigitalMedia() {
  const [region, setRegionState] = useState("US");

  useEffect(() => {
    const r = detectRegion();
    setRegionState(r);
    try {
      localStorage.setItem("vdmRegion", r);
    } catch {
      // ignore
    }
  }, []);

  const setRegion = (r) => {
    setRegionState(r);
    try {
      localStorage.setItem("vdmRegion", r);
    } catch {
      // ignore
    }
  };

  return (
    <RegionContext.Provider value={{ region, setRegion }}>
      <main className="min-h-screen scroll-smooth bg-[#020817] text-white">
        <RegionBar />
        <Nav />
        <Hero />
        <Services />
        <Process />
        <Pricing />
        <Results />
        <Presence />
        <CTA />
        <Contact />
        <Footer />
      </main>
    </RegionContext.Provider>
  );
}