import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

const container = "mx-auto max-w-6xl px-4";

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
    // If we're already on Home, just scroll.
    if (location.pathname === "/") {
      scrollToPricing();
      return;
    }

    // Otherwise, go Home then scroll (HashRouter safe).
    navigate("/");
    window.setTimeout(scrollToPricing, 80);
  };

  const themeClasses = {
    light: {
      highlight: "text-teal-800",
      body: "text-gray-600",
      buttonPrimary: "bg-slate-900 text-white hover:bg-slate-800",
      buttonSecondary: "bg-black/5 text-slate-700 ring-1 ring-slate-900/10 hover:bg-black/10",
      auditCard: "bg-white/60 ring-1 ring-gray-200 hover:ring-gray-300",
      auditTitle: "text-gray-900",
      auditBody: "text-slate-700",
      auditLink: "text-teal-700",
    },
    dark: {
      highlight: "text-teal-800",
      body: "text-black",
      buttonPrimary: "bg-white text-slate-900 hover:opacity-95",
      buttonSecondary: "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15",
      auditCard: "border border-white/10 bg-white/5 hover:bg-white/10",
      auditTitle: "text-white/80",
      auditBody: "text-white/60",
      auditLink: "text-teal-200",
    },
  };

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/assets/hero-bg-light.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover blur-sm dark:hidden"
          aria-hidden="true"
        />
        <img
          src="/assets/hero-bg-light.png"
          alt=""
          className="absolute inset-0 hidden h-full w-full object-cover blur-sm dark:block"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-white/60 dark:bg-white/60"></div>
      </div>
      <div className={`${container} relative py-16 sm:py-20`}>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight text-black sm:text-5xl">
              SEO &amp; SMO that <span className={themeClasses[theme].highlight}>grow</span> your business
            </h1>

            <p className={`mt-4 max-w-xl ${themeClasses[theme].body}`}>
              We launch and optimize search + social campaigns that drive measurable traffic, qualified leads,
              and consistent revenue across the U.S., Europe, and Africa.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className={`rounded-xl px-6 py-3 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 ${themeClasses[theme].buttonPrimary}`}
              >
                Book a Strategy Call
              </Link>

              <button
                type="button"
                onClick={onViewPackages}
                className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 ${themeClasses[theme].buttonSecondary}`}
              >
                View Packages
              </button>
            </div>
          </div>

          <Link
            to="/contact"
            className={`block rounded-2xl p-6 shadow-xl transition-all ${themeClasses[theme].auditCard}`}
          >
            <p className={`font-semibold ${themeClasses.light.auditTitle}`}>Free Audit</p>
            <p className={`mt-2 text-sm ${themeClasses.light.auditBody}`}>Tell us about your presence and we’ll send a quick growth plan.</p>
            <p className={`mt-4 text-sm font-semibold ${themeClasses.light.auditLink}`}>Get Started →</p>
          </Link>
        </div>
      </div>
    </section>
  );
}