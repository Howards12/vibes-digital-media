import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export const RegionContext = createContext(null);

const REGION_CONFIG = [
  { code: "US", label: "United States", currency: "USD", symbol: "$", flag: "🇺🇸", fx: 1.0 },
  { code: "GB", label: "Great Britain", currency: "GBP", symbol: "£", flag: "🇬🇧", fx: 0.79 },
  { code: "EU", label: "Europe", currency: "EUR", symbol: "€", flag: "🇪🇺", fx: 0.92 },
  { code: "NG", label: "Nigeria", currency: "NGN", symbol: "₦", flag: "🇳🇬", fx: 1600 },
  { code: "ZA", label: "South Africa", currency: "ZAR", symbol: "R", flag: "🇿🇦", fx: 18.5 },
  { code: "RW", label: "Rwanda", currency: "RWF", symbol: "RF", flag: "🇷🇼", fx: 1300 },
];

function normalizeRegion(code) {
  const upper = String(code || "").toUpperCase();
  return REGION_CONFIG.some((r) => r.code === upper) ? upper : "US";
}

// Simple geo guess without IP (client-only).
// Uses time zone first, then language, so that the default flag/region
// matches where the user is more often than not.
function guessRegionFromBrowser() {
  try {
    // Prefer time zone, which is a decent proxy for where the user actually is.
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";

    // Africa
    if (tz.startsWith("Africa/")) {
      if (tz.includes("Lagos")) return "NG";       // Nigeria
      if (tz.includes("Johannesburg")) return "ZA"; // South Africa
      if (tz.includes("Kigali")) return "RW";     // Rwanda
      // Fallback for other African time zones you might add later
      return "NG";
    }

    // North America
    if (tz.startsWith("America/")) {
      return "US";
    }

    // Europe
    if (tz.startsWith("Europe/")) {
      // Distinguish UK vs continental Europe when possible
      if (tz.includes("London")) return "GB";
      return "EU";
    }
  } catch {
    // Ignore any failures and fall back to language below.
  }

  const lang = typeof navigator !== "undefined" ? navigator.language || "" : "";
  if (lang.includes("en-US")) return "US";
  if (lang.includes("en-GB")) return "GB";
  if (lang.startsWith("fr") || lang.startsWith("de") || lang.startsWith("es") || lang.startsWith("it")) {
    return "EU";
  }

  // Ultimate fallback
  return "US";
}

export function RegionProvider({ children }) {
  const [region, setRegion] = useState(() => {
    const saved = localStorage.getItem("vdm_region");
    return normalizeRegion(saved || guessRegionFromBrowser());
  });

  useEffect(() => {
    localStorage.setItem("vdm_region", region);
  }, [region]);

  // Always expose regions with the active region first so that
  // dropdowns and flag bars lead with the user's inferred location.
  const regions = useMemo(() => {
    const active = REGION_CONFIG.find((r) => r.code === region);
    const others = REGION_CONFIG.filter((r) => r.code !== region);
    return active ? [active, ...others] : REGION_CONFIG;
  }, [region]);

  const activeRegion = useMemo(
    () => REGION_CONFIG.find((r) => r.code === region) || REGION_CONFIG[0],
    [region]
  );

  const value = useMemo(
    () => ({ region, setRegion, regions, activeRegion }),
    [region, regions, activeRegion]
  );

  return <RegionContext.Provider value={value}>{children}</RegionContext.Provider>;
}

// ✅ This is what fixes the “no export named useRegion” crash
export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error("useRegion must be used inside <RegionProvider>");
  return ctx;
}
