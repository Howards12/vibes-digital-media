import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext.jsx";
import { useRegion } from "../context/RegionContext.jsx";

const container = "mx-auto max-w-7xl px-5 sm:px-6 lg:px-8";

const SunIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const GlobeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { region, setRegion, regions } = useRegion();

  const navLinkClasses = ({ isActive }) =>
    `relative rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
      isActive
        ? theme === "light"
          ? "bg-slate-900/5 text-teal-700 shadow-inner-glow ring-1 ring-slate-900/10"
          : "bg-white/10 text-white shadow-inner-glow ring-1 ring-white/15"
        : theme === "light"
          ? "text-slate-600 hover:bg-slate-900/[0.04] hover:text-slate-900"
          : "text-white/75 hover:bg-white/[0.06] hover:text-white"
    }`;

  const shell =
    theme === "light"
      ? "border-slate-200/80 bg-white/75 shadow-soft backdrop-blur-xl supports-[backdrop-filter]:bg-white/65"
      : "border-white/[0.08] bg-slate-950/70 shadow-lift backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/55";

  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/services", text: "Services" },
    { href: "/faq", text: "FAQ" },
    { href: "/blog", text: "Blog" },
    { href: "/contact", text: "Contact" },
  ];

  return (
    <header className="sticky top-[3px] z-40 w-full">
      <div
        className={`border-b border-white/5 ${
          theme === "light"
            ? "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white"
            : "bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-slate-200"
        }`}
      >
        <div className={`${container} flex h-9 items-center justify-end gap-2 sm:justify-between`}>
          <p className="hidden text-[11px] font-medium tracking-wide text-white/50 sm:block">
            Region-aware pricing · Same-day response on business days
          </p>
          <div className="flex items-center gap-2">
            <GlobeIcon className="shrink-0 text-teal-300/90" aria-hidden />
            <label htmlFor="region-select" className="sr-only">
              Select region
            </label>
            <select
              id="region-select"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="cursor-pointer rounded-lg border border-white/10 bg-white/5 py-1 pl-2 pr-8 text-xs font-semibold tracking-wide text-white backdrop-blur-sm transition hover:bg-white/10 focus:border-teal-400/50 focus:outline-none focus:ring-2 focus:ring-teal-400/30"
            >
              {regions.map((r) => (
                <option key={r.code} value={r.code} className="bg-slate-900 text-white">
                  {r.flag} {r.code}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={`border-b ${shell}`}>
        <div className={`${container} flex h-[4.25rem] items-center justify-between gap-4`}>
          <Link to="/" className="group flex shrink-0 items-center gap-2">
            <img
              src={theme === "dark" ? "assets/logo-dark.png" : "assets/logo-light.png"}
              alt="Vibes Digital Media"
              className="h-11 w-auto transition-transform duration-300 group-hover:scale-[1.02] sm:h-12"
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <NavLink key={link.href} to={link.href} className={navLinkClasses}>
                {link.text}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className={`hidden rounded-full px-4 py-2 text-sm font-semibold transition sm:inline-flex ${
                theme === "light"
                  ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-glow hover:from-teal-500 hover:to-emerald-500"
                  : "bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 shadow-glow hover:from-teal-300 hover:to-cyan-300"
              }`}
            >
              Book a call
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className={`rounded-full p-2.5 transition ${
                theme === "light"
                  ? "text-slate-600 hover:bg-slate-900/[0.06]"
                  : "text-white/80 hover:bg-white/[0.08]"
              }`}
            >
              {theme === "light" ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
            </button>

            <button
              type="button"
              onClick={() => setIsMenuOpen((v) => !v)}
              className={`inline-flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl md:hidden ${
                theme === "light" ? "text-slate-800 hover:bg-slate-900/[0.06]" : "text-white hover:bg-white/[0.08]"
              }`}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
            >
              <span className="sr-only">Menu</span>
              <span
                className={`block h-0.5 w-5 origin-center rounded-full bg-current transition ${
                  isMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span className={`block h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? "opacity-0" : ""}`} />
              <span
                className={`block h-0.5 w-5 origin-center rounded-full bg-current transition ${
                  isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-inherit md:hidden"
            >
              <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-3 text-base font-medium ${
                        isActive
                          ? theme === "light"
                            ? "bg-teal-50 text-teal-800"
                            : "bg-white/10 text-white"
                          : theme === "light"
                            ? "text-slate-700 hover:bg-slate-50"
                            : "text-white/85 hover:bg-white/[0.06]"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.text}
                  </NavLink>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className={`mt-2 rounded-xl px-4 py-3 text-center text-sm font-semibold ${
                    theme === "light"
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-900"
                  }`}
                >
                  Book a strategy call
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
