import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

const LinkedInIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Footer() {
  const { theme } = useTheme();
  const year = new Date().getFullYear();

  const shell =
    theme === "light"
      ? "border-slate-200/90 bg-white text-slate-600"
      : "border-white/[0.08] bg-slate-950 text-slate-400";

  const heading = theme === "light" ? "text-slate-900" : "text-white";
  const link = theme === "light" ? "hover:text-teal-700" : "hover:text-teal-300";

  const navLinks = [
    { href: "/services", text: "Services" },
    { href: "/faq", text: "FAQ" },
    { href: "/blog", text: "Blog" },
    { href: "/contact", text: "Contact" },
  ];

  return (
    <footer className={`border-t ${shell}`}>
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="lg:col-span-1">
            <p className={`font-display text-lg font-semibold ${heading}`}>Vibes Digital Media</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              Performance-led SEO, social, and measurement for teams that want pipeline clarity—not vanity
              dashboards.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.linkedin.com/company/vibes-digital-media/"
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-full border p-2.5 transition ${theme === "light" ? "border-slate-200 hover:border-teal-300" : "border-white/10 hover:border-teal-400/40"} ${link}`}
              >
                <span className="sr-only">LinkedIn</span>
                <LinkedInIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-full border p-2.5 transition ${theme === "light" ? "border-slate-200 hover:border-teal-300" : "border-white/10 hover:border-teal-400/40"} ${link}`}
              >
                <span className="sr-only">X (Twitter)</span>
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/vibes.digital.media/"
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-full border p-2.5 transition ${theme === "light" ? "border-slate-200 hover:border-teal-300" : "border-white/10 hover:border-teal-400/40"} ${link}`}
              >
                <span className="sr-only">Instagram</span>
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <p className={`text-xs font-bold uppercase tracking-[0.2em] ${heading}`}>Explore</p>
            <nav className="mt-4 flex flex-col gap-2 text-sm font-medium">
              {navLinks.map((item) => (
                <Link key={item.href} to={item.href} className={`transition ${link}`}>
                  {item.text}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className={`text-xs font-bold uppercase tracking-[0.2em] ${heading}`}>Signals</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                Weekly performance snapshots
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                Experiment backlog &amp; learnings
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                Shared Slack / email cadence
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-inherit bg-gradient-to-br from-teal-500/10 to-cyan-500/5 p-6 dark:from-teal-400/10 dark:to-cyan-400/5">
            <p className={`font-display text-base font-semibold ${heading}`}>Start with a roadmap</p>
            <p className="mt-2 text-sm leading-relaxed">
              Tell us what “good” looks like—we’ll reply with next steps and timing.
            </p>
            <Link
              to="/contact"
              className={`mt-5 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 ${
                theme === "light"
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "bg-white text-slate-900 hover:bg-slate-100"
              }`}
            >
              Contact
            </Link>
          </div>
        </div>

        <div
          className={`mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs sm:flex-row ${
            theme === "light" ? "border-slate-200" : "border-white/10"
          }`}
        >
          <p>&copy; {year} Vibes Digital Media. All rights reserved.</p>
          <p className="text-center sm:text-right">Crafted for brands scaling across regions.</p>
        </div>
      </div>
    </footer>
  );
}
