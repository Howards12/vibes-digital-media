import React from "react";

export default function FormCard({
  label,
  title,
  subtitle,
  src,
  height = 900,
  maxHeight = 420,
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-teal-400/30 bg-slate-900/50 p-6 shadow-2xl shadow-teal-500/20">
      <div className="relative mb-4 flex items-center gap-4">
        <img
          src="/assets/vibes-logo.png"
          alt="Vibes Digital Media"
          className="h-12 w-auto"
        />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-200">
            {label || "Vibes Digital Media"}
          </p>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
      </div>

      {subtitle && (
        <p className="relative mb-4 text-base leading-relaxed text-teal-50/90">
          {subtitle}
        </p>
      )}

      <div className="relative rounded-xl border border-teal-500/20 bg-white overflow-hidden">
        <div className="overflow-y-auto" style={{ maxHeight }}>
          <iframe
            src={src}
            title={title}
            className="w-full relative z-0"
            style={{ height, minHeight: "500px" }}
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
          >
            Loading…
          </iframe>
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 bg-teal-500/15 mix-blend-multiply" />
      </div>
    </div>
  );
}
