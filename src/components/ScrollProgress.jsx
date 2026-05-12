import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? el.scrollTop / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const track =
    theme === "dark" ? "bg-white/[0.06]" : "bg-slate-900/[0.06]";

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] ${track}`}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div
        className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-400 transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
