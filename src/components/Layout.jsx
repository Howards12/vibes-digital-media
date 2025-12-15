import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import BackToTopButton from "./BackToTopButton.jsx";
import Footer from "./Footer.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Layout() {
  const { theme } = useTheme();

  const themeClasses = {
    light: "bg-white text-gray-800",
    dark: "bg-[#020817] text-white",
  };

  return (
    <div className={`min-h-screen scroll-smooth ${themeClasses[theme]}`}>
      <Navbar />
      <Outlet /> {/* This is where your page components will be rendered */}
      <Footer />
      <BackToTopButton />
    </div>
  );
}