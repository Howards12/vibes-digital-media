import React from "react";
import RegionBar from "./RegionBar.jsx";
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ children }) {
  return (
    <main className="min-h-screen scroll-smooth bg-[#020817] text-white">
      <RegionBar />
      <Nav />
      {children}
      <Footer />
    </main>
  );
}
