import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

export default function CTA() {
  const { theme } = useTheme();

  const wrap =
    theme === "light"
      ? "border-slate-200/80 bg-gradient-to-br from-slate-100 via-white to-teal-50/40"
      : "border-white/[0.08] bg-gradient-to-br from-slate-900 via-slate-950 to-teal-950/30";

  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div
          className={`relative overflow-hidden rounded-[2rem] border px-6 py-16 shadow-lift sm:px-12 sm:py-20 ${wrap}`}
        >
          <div
            className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-teal-400/25 blur-3xl dark:bg-teal-500/15"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/10"
            aria-hidden
          />
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-teal-700 dark:text-teal-300">
              Next step
            </p>
            <h2
              className={`font-display mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl ${
                theme === "light" ? "text-slate-900" : "text-white"
              }`}
            >
              Ready for demand you can forecast?
            </h2>
            <p
              className={`mt-6 text-lg leading-relaxed ${
                theme === "light" ? "text-slate-600" : "text-slate-400"
              }`}
            >
              We begin with a focused audit of your funnel, creative, and measurement—then ship a prioritized plan
              you can act on immediately.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className={`inline-flex rounded-full px-8 py-3.5 text-sm font-semibold shadow-glow transition hover:-translate-y-0.5 ${
                  theme === "light"
                    ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-500 hover:to-emerald-500"
                    : "bg-gradient-to-r from-teal-300 to-cyan-300 text-slate-950 hover:from-teal-200 hover:to-cyan-200"
                }`}
              >
                Book a free strategy call
              </Link>
              <Link
                to="/services"
                className={`rounded-full px-6 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5 ${
                  theme === "light"
                    ? "border border-slate-300/90 text-slate-800 hover:border-teal-400/50"
                    : "border border-white/15 text-white hover:border-teal-400/40"
                }`}
              >
                View capabilities
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
