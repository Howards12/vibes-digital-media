import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

import { useRegion } from "../context/RegionContext.jsx";
const container = "mx-auto max-w-6xl px-4";

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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { region, setRegion, regions } = useRegion();

  const navLinkClasses = ({ isActive }) =>
    `transition-colors ${
      isActive
        ? theme === "light"
          ? "text-teal-600"
          : "text-teal-300"
        : theme === "light"
        ? "text-slate-700 hover:text-slate-900"
        : "text-white/80 hover:text-white"
    }`;

  const themeClasses = {
    light: "bg-white/80 backdrop-blur-md",
    dark: "bg-slate-900/80 backdrop-blur-md",
  };

  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/services", text: "Services" },
    { href: "/faq", text: "FAQ" },
    { href: "/blog", text: "Blog" },
    { href: "/contact", text: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Region Selector Bar */}
      <div className="bg-slate-900 text-white text-xs">
        <div className={`${container} flex justify-end items-center h-8`}>
          <label htmlFor="region-select" className="sr-only">Select Region</label>
          <select
            id="region-select"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="bg-transparent border-0 focus:ring-0 p-1"
          >
            {regions.map((r) => (
              <option key={r.code} value={r.code} className="bg-slate-800">
                {r.flag} {r.code}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={`border-b ${theme === 'light' ? 'border-gray-200' : 'border-white/10'} ${themeClasses[theme]}`}>
        <div className={`${container} flex h-16 items-center justify-between`}>
          <Link to="/">
            <img
              src={theme === 'dark' ? '/assets/logo-dark.png' : '/assets/logo-light.png'}
              alt="Vibes Digital Media Logo"
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink key={link.href} to={link.href} className={navLinkClasses}>
                {link.text}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-full transition-colors hover:bg-black/10 dark:hover:bg-white/10">
              {theme === "light" ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 md:hidden">
              <span className="sr-only">Open menu</span>
              <div className="w-5 h-0.5 bg-current my-1"></div>
              <div className="w-5 h-0.5 bg-current my-1"></div>
              <div className="w-5 h-0.5 bg-current my-1"></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden border-t ${theme === 'light' ? 'border-gray-200' : 'border-white/10'}`}>
            <nav className="flex flex-col items-center gap-4 p-4">
              {navLinks.map((link) => (
                <NavLink key={link.href} to={link.href} className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>
                  {link.text}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}