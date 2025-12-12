import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import ServicesPage from "./pages/Services.jsx";
import FAQPage from "./pages/FAQ.jsx";
import ContactPage from "./pages/Contact.jsx";

import BlogList from "./blog/BlogList.jsx";
import BlogPost from "./blog/BlogPost.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/services" element={<ServicesPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/contact" element={<ContactPage />} />

      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  );
}
