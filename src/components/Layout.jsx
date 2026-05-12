import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import BackToTopButton from "./BackToTopButton.jsx";
import Footer from "./Footer.jsx";
import ScrollProgress from "./ScrollProgress.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Layout() {
  const { theme } = useTheme();

  const themeClasses = {
    light: "bg-slate-50 text-slate-900",
    dark: "bg-slate-950 text-slate-100",
  };

  const mesh =
    theme === "light"
      ? "bg-mesh-light opacity-100"
      : "bg-mesh-dark opacity-90";

  return (
    <div className={`relative min-h-screen scroll-smooth font-sans antialiased ${themeClasses[theme]}`}>
      <div
        className={`pointer-events-none fixed inset-0 -z-10 bg-cover transition-opacity duration-500 ${mesh}`}
        aria-hidden="true"
      />
      <ScrollProgress />
      <Navbar />
      <Outlet />
      <Footer />
      <BackToTopButton />
    </div>
  );
}
