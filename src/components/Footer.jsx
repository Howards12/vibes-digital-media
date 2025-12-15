import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

const LinkedInIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const TwitterIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
);

const InstagramIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Footer() {
  const { theme } = useTheme();
  const year = new Date().getFullYear();

  const themeClasses = {
    light: {
      bg: "bg-white",
      border: "border-gray-200",
      text: "text-gray-500",
      link: "hover:text-gray-900",
    },
    dark: {
      bg: "bg-[#020817]",
      border: "border-white/10",
      text: "text-white/60",
      link: "hover:text-white",
    },
  };

  const navLinks = [
    { href: "/services", text: "Services" },
    { href: "/faq", text: "FAQ" },
    { href: "/blog", text: "Blog" },
    { href: "/contact", text: "Contact" },
  ];

  return (
    <footer className={`${themeClasses[theme].bg}`}>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 border-t ${themeClasses[theme].border} pt-8`}>
          <p className={`text-sm ${themeClasses[theme].text}`}>
            &copy; {year} Vibes Digital Media. All rights reserved.
          </p>
          <nav className="flex gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} className={`${themeClasses[theme].text} ${themeClasses[theme].link} transition-colors`}>
                {link.text}
              </Link>
            ))}
          </nav>
          <div className="flex justify-center gap-6">
            <a href="https://www.linkedin.com/company/vibes-digital-media/" target="_blank" rel="noopener noreferrer" className={`${themeClasses[theme].text} ${themeClasses[theme].link} transition-colors`}>
              <span className="sr-only">LinkedIn</span>
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className={`${themeClasses[theme].text} ${themeClasses[theme].link} transition-colors`}>
              <span className="sr-only">Twitter</span>
              <TwitterIcon className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/vibes.digital.media/" target="_blank" rel="noopener noreferrer" className={`${themeClasses[theme].text} ${themeClasses[theme].link} transition-colors`}>
              <span className="sr-only">Instagram</span>
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}