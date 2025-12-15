import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx"; // This path is correct, no change needed but showing for context
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import ServicesPage from "./pages/Services.jsx";
import FAQPage from "./pages/FAQ.jsx";
import ContactPage from "./pages/Contact.jsx";

import BlogList from "./blog/BlogList.jsx";
import BlogPost from "./blog/BlogPost.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
