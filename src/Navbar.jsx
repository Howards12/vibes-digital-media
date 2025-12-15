import React from "react";
import { Link } from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton.jsx";
import { useTheme } from "./context/ThemeContext.jsx";
import RegionSelector from "./components/RegionSelector.jsx";

export default function Navbar() {
  const { theme } = useTheme();

  const themeClasses = {
    light: "bg-white/95 backdrop-blur-sm text-gray-800 ring-1 ring-gray-200",
    dark: "bg-[#020817]/95 backdrop-blur-sm text-white",
  };

  const navLinkClasses = {
    light: "text-gray-600 hover:text-gray-900",
    dark: "text-white/70 hover:text-white",
  };

  return (
    <header className={`sticky top-0 z-50 py-4 transition-colors ${themeClasses[theme]}`}>
      <nav className="mx-auto max-w-5xl px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Vibes Digital
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/#pricing" className={`${navLinkClasses[theme]} transition-colors`}>Pricing</Link>
          <Link to="/blog" className={`${navLinkClasses[theme]} transition-colors`}>Blog</Link>
          <RegionSelector />
          <ThemeToggleButton />
        </div>
      </nav>
    </header>
  );
}