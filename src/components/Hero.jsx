import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

const container = "mx-auto max-w-7xl px-5 sm:px-6 lg:px-8";

const trustChips = [
  "Technical SEO audits",
  "Revenue-grade reporting",
  "Multi-region playbooks",
];

export default function Hero() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const scrollToPricing = () => {
    const el = document.getElementById("pricing");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onViewPackages = () => {
    if (location.pathname === "/") {
      scrollToPricing();
      return;
    }
    navigate("/");
    window.setTimeout(scrollToPricing, 80);
  };

  const t = {
    light: {
      headline: "text-slate-900",
      gradient: "from-teal-600 via-emerald-600 to-cyan-600",
      body: "text-slate-600",
      buttonPrimary:
        "bg-slate-900 text-white shadow-lift hover:bg-slate-800 hover:shadow-glow",
      buttonSecondary:
        "border border-slate-200/90 bg-white/80 text-slate-800 shadow-soft backdrop-blur-sm hover:border-teal-300/60 hover:bg-white",
      auditCard:
        "border border-slate-200/80 bg-white/85 shadow-lift backdrop-blur-md ring-1 ring-slate-900/[0.04] hover:border-teal-200/80 hover:shadow-glow",
      auditTitle: "text-slate-900",
      auditBody: "text-slate-600",
      auditLink: "text-teal-700",
      chip: "border-slate-200/90 bg-white/70 text-slate-700",
    },
    dark: {
      headline: "text-white",
      gradient: "from-teal-200 via-emerald-300 to-cyan-300",
      body: "text-slate-300",
      buttonPrimary:
        "bg-white text-slate-950 shadow-lift hover:bg-slate-100 hover:shadow-glow",
      buttonSecondary:
        "border border-white/15 bg-white/[0.06] text-white shadow-soft backdrop-blur-sm hover:border-teal-400/40 hover:bg-white/[0.1]",
      auditCard:
        "border border-white/10 bg-white/[0.05] shadow-lift backdrop-blur-md ring-1 ring-white/[0.06] hover:border-teal-400/30 hover:bg-white/[0.08]",
      auditTitle: "text-white",
      auditBody: "text-slate-400",
      auditLink: "text-teal-300",
      chip: "border-white/10 bg-white/[0.04] text-slate-200",
    },
  }[theme];

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="assets/hero-bg-light.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-90 blur-[2px] dark:hidden"
          aria-hidden="true"
        />
        <img
          src="assets/hero-bg-light.png"
          alt=""
          className="absolute inset-0 hidden h-full w-full object-cover opacity-40 blur-[2px] dark:block"
          aria-hidden="true"
        />
        <div
          className={`absolute inset-0 ${
            theme === "light"
              ? "bg-gradient-to-b from-white/75 via-white/55 to-slate-50/90"
              : "bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950/95"
          }`}
        />
        <div
          className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl dark:bg-teal-500/10"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl dark:bg-cyan-500/10"
          aria-hidden
        />
      </div>

      <div className={`${container} relative py-20 sm:py-28`}>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div {...fadeUp}>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-800 dark:border-teal-400/20 dark:bg-teal-400/10 dark:text-teal-200">
              Digital growth studio
            </p>
            <h1
              className={`font-display text-4xl font-bold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[3.25rem] ${t.headline}`}
            >
              SEO &amp; social that{" "}
              <span className={`bg-gradient-to-r bg-clip-text text-transparent ${t.gradient}`}>compound</span>{" "}
              pipeline and revenue
            </h1>
            <p className={`mt-6 max-w-xl text-lg leading-relaxed sm:text-xl ${t.body}`}>
              Launch and optimize search plus social programs engineered for qualified demand: clearer
              measurement, faster iteration, and creative that still feels unmistakably your brand.
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {trustChips.map((label) => (
                <li
                  key={label}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-sm sm:text-sm ${t.chip}`}
                >
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className={`inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${t.buttonPrimary}`}
              >
                Book a strategy call
              </Link>
              <button
                type="button"
                onClick={onViewPackages}
                className={`inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${t.buttonSecondary}`}
              >
                View packages
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div
              className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-teal-500/20 via-transparent to-cyan-500/15 blur-2xl dark:from-teal-400/10"
              aria-hidden
            />
            <Link
              to="/contact"
              className={`relative block overflow-hidden rounded-[1.75rem] p-8 transition duration-300 hover:-translate-y-1 ${t.auditCard}`}
            >
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-teal-400/10 dark:bg-teal-300/10" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">
                Complimentary
              </p>
              <p className={`mt-3 font-display text-2xl font-semibold tracking-tight ${t.auditTitle}`}>
                Growth audit &amp; roadmap
              </p>
              <p className={`mt-3 text-sm leading-relaxed sm:text-base ${t.auditBody}`}>
                Share your goals and channels—we return a prioritized action plan with quick wins and a 90-day
                trajectory.
              </p>
              <p className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${t.auditLink}`}>
                Request yours
                <span aria-hidden className="transition group-hover:translate-x-0.5">
                  →
                </span>
              </p>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
