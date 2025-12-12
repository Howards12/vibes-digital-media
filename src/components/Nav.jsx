import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const BRAND = { primaryDark: "#0B4F4A", accent: "#06B6D4" };
const container = "mx-auto max-w-6xl px-4";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [location.pathname]);

  const goSection = (id) => {
    // If we are not on home, go home first, then scroll.
    if (location.pathname !== "/") {
      navigate("/");
      // wait one tick for Home to mount
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLink =
    "rounded-xl px-4 py-2.5 text-base font-medium text-white/90 hover:text-white hover:bg-white/5 transition-all duration-200";

  return (
    <div
      className="sticky top-0 z-40 border-b border-white/10 bg-[var(--nav-bg)]/95 backdrop-blur-lg"
      style={{ ["--nav-bg"]: BRAND.primaryDark }}
    >
      <nav className={`${container} flex items-center justify-between py-4`}>
        <Link to="/" className="flex items-center gap-4 group">
          <img
            src="/assets/vibes-logo.png"
            alt="Vibes Digital Media"
            className="h-16 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <span className="sr-only">Vibes Digital Media</span>
        </Link>

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
          <li>
            <Link className={navLink} to="/services">
              Services
            </Link>
          </li>
          <li>
            <button className={navLink} onClick={() => goSection("process")}>
              Process
            </button>
          </li>
          <li>
            <button className={navLink} onClick={() => goSection("pricing")}>
              Pricing
            </button>
          </li>
          <li>
            <button className={navLink} onClick={() => goSection("results")}>
              Results
            </button>
          </li>
          <li>
            <button className={navLink} onClick={() => goSection("presence")}>
              Presence
            </button>
          </li>
          <li>
            <Link className={navLink} to="/faq">
              FAQ
            </Link>
          </li>
          <li>
            <Link className={navLink} to="/blog">
              Blog
            </Link>
          </li>
          <li>
            <Link className={navLink} to="/contact">
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="ml-3 inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-6 py-2.5 text-base font-semibold text-white shadow-lg shadow-cyan-600/30 ring-1 ring-white/10 hover:opacity-90 transition-opacity"
              style={{ ["--accent"]: BRAND.accent }}
            >
              Free Audit
            </Link>
          </li>
        </ul>
      </nav>

      {open && (
        <div className="sm:hidden border-t border-white/10">
          <div className={`${container} py-6`}>
            <div className="grid gap-3">
              <Link
                to="/services"
                className="rounded-xl bg-white/5 px-6 py-4 text-base font-medium text-white hover:bg-white/10 transition-colors"
              >
                Services
              </Link>

              <button
                onClick={() => goSection("process")}
                className="text-left rounded-xl bg-white/5 px-6 py-4 text-base font-medium text-white hover:bg-white/10 transition-colors"
              >
                Process
              </button>
              <button
                onClick={() => goSection("pricing")}
                className="text-left rounded-xl bg-white/5 px-6 py-4 text-base font-medium text-white hover:bg-white/10 transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => goSection("results")}
                className="text-left rounded-xl bg-white/5 px-6 py-4 text-base font-medium text-white hover:bg-white/10 transition-colors"
              >
                Results
              </button>
              <button
                onClick={() => goSection("presence")}
                className="text-left rounded-xl bg-white/5 px-6 py-4 text-base font-medium text-white hover:bg-white/10 transition-colors"
              >
                Presence
              </button>

              <Link
                to="/faq"
                className="rounded-xl bg-white/5 px-6 py-4 text-base font-medium text-white hover:bg-white/10 transition-colors"
              >
                FAQ
              </Link>

              <Link
                to="/blog"
                className="rounded-xl bg-white/5 px-6 py-4 text-base font-medium text-white hover:bg-white/10 transition-colors"
              >
                Blog
              </Link>

              <Link
                to="/contact"
                className="rounded-xl bg-white/5 px-6 py-4 text-base font-medium text-white hover:bg-white/10 transition-colors"
              >
                Contact
              </Link>

              <Link
                to="/contact"
                className="rounded-xl bg-teal-500 px-6 py-4 text-base font-semibold text-slate-900 hover:bg-teal-400 transition-colors"
              >
                Free Audit
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
