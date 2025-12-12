import React, { useContext } from "react";
import { RegionContext } from "../context/RegionContext.jsx";

const container = "mx-auto max-w-6xl px-4";

export default function RegionBar() {
  const { region, setRegion, regions } = useContext(RegionContext);

  return (
    <div className="bg-[#020817] border-b border-white/10">
      <div
        className={`${container} flex flex-wrap items-center justify-between gap-3 py-3 text-sm text-white/80`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="uppercase tracking-[0.18em] text-white/40">
            Global presence:
          </span>
          <span>U.S. • Europe • Nigeria • South Africa • Rwanda</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-white/50">View pricing in:</span>

          {regions.map((r) => (
            <button
              key={r.code}
              onClick={() => setRegion(r.code)}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm ring-1 ring-white/15 transition-all ${
                region === r.code
                  ? "bg-white/18 text-white shadow-lg"
                  : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10"
              }`}
              title={r.label}
              type="button"
            >
              <span aria-hidden="true">{r.flag}</span>
              <span className="hidden sm:inline">{r.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
