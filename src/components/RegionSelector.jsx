import React from "react";
import { useRegion } from "../context/RegionContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export default function RegionSelector() {
  const { regions, activeRegion, setRegion } = useRegion();
  const { theme } = useTheme();

  const handleChange = (e) => {
    setRegion(e.target.value);
  };

  const themeClasses = {
    light: "bg-gray-100 text-gray-700 ring-gray-200 focus:ring-teal-500",
    dark: "bg-white/10 text-white/80 ring-white/20 focus:ring-teal-300",
  };

  return (
    <div className="relative">
      <label htmlFor="region-selector" className="sr-only">
        Select region
      </label>
      <select
        id="region-selector"
        value={activeRegion.code}
        onChange={handleChange}
        className={`w-full appearance-none rounded-md py-2 pl-3 pr-8 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 ${themeClasses[theme]}`}
      >
        {regions.map((r) => (
          <option key={r.code} value={r.code}>{`${r.flag} ${r.code}`}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}