import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import VibesDigitalMedia from "./App.jsx";
import BlogList from "./blog/BlogList.jsx";
import BlogPost from "./blog/BlogPost.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        {/* Main Vibes site (your existing one-page layout) */}
        <Route path="/" element={<VibesDigitalMedia />} />

        {/* Blog list page */}
        <Route path="/blog" element={<BlogList />} />

        {/* Single blog post page */}
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
