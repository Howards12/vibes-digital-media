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

// Simple geo guess without IP (client-only). If you already added an IP-based service, keep yours.
function guessRegionFromBrowser() {
  const lang = navigator.language || "";
  if (lang.includes("en-US")) return "US";
  if (lang.includes("en-GB")) return "GB";
  if (lang.includes("en-GB") || lang.includes("fr") || lang.includes("de") || lang.includes("es")) return "EU";
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

  const regions = useMemo(() => REGION_CONFIG, []);
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
