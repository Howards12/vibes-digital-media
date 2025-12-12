import React, { createContext, useEffect, useMemo, useState } from "react";

export const RegionContext = createContext(null);

// Tune these to your real pricing multipliers (relative to USD).
// Example: if NG prices should look ~ 1500x USD in Naira, set fx: 1500.
const REGIONS = [
  { code: "US", label: "United States", currency: "USD", locale: "en-US", flag: "🇺🇸", fx: 1 },
  { code: "EU", label: "Europe", currency: "EUR", locale: "en-IE", flag: "🇪🇺", fx: 0.92 },
  { code: "NG", label: "Nigeria", currency: "NGN", locale: "en-NG", flag: "🇳🇬", fx: 1600 },
  { code: "ZA", label: "South Africa", currency: "ZAR", locale: "en-ZA", flag: "🇿🇦", fx: 18.5 },
  { code: "RW", label: "Rwanda", currency: "RWF", locale: "rw-RW", flag: "🇷🇼", fx: 1300 },
];

function detectDefaultRegion() {
  const lang = (navigator.language || "").toLowerCase();
  const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || "").toLowerCase();

  // Strong signals
  if (lang.includes("-ng") || tz.includes("lagos")) return "NG";
  if (lang.includes("-za") || tz.includes("johannesburg")) return "ZA";
  if (lang.includes("-rw") || tz.includes("kigali")) return "RW";

  // EU-ish
  if (
    lang.includes("-fr") ||
    lang.includes("-de") ||
    lang.includes("-es") ||
    lang.includes("-it") ||
    lang.includes("-nl") ||
    lang.includes("-pt") ||
    tz.includes("europe/")
  ) {
    return "EU";
  }

  return "US";
}

export function RegionProvider({ children }) {
  const [region, setRegion] = useState(() => {
    const saved = localStorage.getItem("vdm_region");
    return saved || detectDefaultRegion();
  });

  useEffect(() => {
    localStorage.setItem("vdm_region", region);
  }, [region]);

  const regions = useMemo(() => REGIONS, []);

  const active = useMemo(() => {
    return regions.find((r) => r.code === region) || regions[0];
  }, [region, regions]);

  const convertFromUSD = (usdAmount) => {
    const n = Number(usdAmount);
    const safe = Number.isFinite(n) ? n : 0;
    return safe * active.fx;
  };

  const formatMoney = (amount) => {
    const n = Number(amount);
    const safe = Number.isFinite(n) ? n : 0;

    try {
      return new Intl.NumberFormat(active.locale, {
        style: "currency",
        currency: active.currency,
        maximumFractionDigits: active.currency === "NGN" || active.currency === "RWF" ? 0 : 2,
      }).format(safe);
    } catch {
      // Fallback if a browser doesn't like the locale/currency combo
      return `${active.currency} ${safe.toFixed(0)}`;
    }
  };

  const value = useMemo(
    () => ({
      region,
      setRegion,
      regions,
      activeRegion: active,
      convertFromUSD,
      formatMoney,

      // ✅ compatibility exports (so imports like `useRegion` won't crash)
      fx: active.fx,
      currency: active.currency,
      locale: active.locale,
    }),
    [region, regions, active]
  );

  return <RegionContext.Provider value={value}>{children}</RegionContext.Provider>;
}

// ✅ This is what your console said is missing:
export function useRegion() {
  const ctx = React.useContext(RegionContext);
  if (!ctx) throw new Error("useRegion must be used within a RegionProvider");
  return ctx;
}
