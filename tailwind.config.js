/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          '"Outfit"',
          '"Plus Jakarta Sans"',
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(15, 23, 42, 0.08)",
        lift: "0 12px 40px -12px rgba(15, 23, 42, 0.15)",
        glow: "0 0 80px -20px rgba(45, 212, 191, 0.35)",
        "inner-glow": "inset 0 1px 0 0 rgba(255,255,255,0.06)",
      },
      backgroundImage: {
        "mesh-light":
          "radial-gradient(at 40% 20%, rgba(45,212,191,0.12) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(14,165,233,0.1) 0px, transparent 45%), radial-gradient(at 0% 50%, rgba(148,163,184,0.15) 0px, transparent 50%)",
        "mesh-dark":
          "radial-gradient(at 40% 20%, rgba(45,212,191,0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(14,165,233,0.07) 0px, transparent 45%), radial-gradient(at 0% 80%, rgba(99,102,241,0.06) 0px, transparent 45%)",
        "hero-shine":
          "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};
