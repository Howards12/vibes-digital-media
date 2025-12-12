import React from "react";

const container = "mx-auto max-w-6xl px-4";
const WHATSAPP_NUMBER = "+13465466197";
const WHATSAPP_LINK =
  "https://wa.me/13465466197?text=Hi%20Vibes%20Digital%20Media%2C%20I%27d%20like%20to%20discuss%20SEO%20and%20SMO%20services.";

export default function Footer() {
  return (
    <footer className="bg-[#050816] py-16 text-white">
      <div className={`${container} grid gap-12 lg:grid-cols-[1.4fr,1fr,1.4fr]`}>
        <div>
          <img src="/assets/vibes-logo.png" alt="Vibes Digital Media" className="h-14 w-auto mb-4" />
          <p className="mt-4 max-w-md text-lg text-white/70 leading-relaxed">
            Social & search marketing for ambitious brands — serving clients globally.
          </p>
          <div className="mt-6 text-base text-white/75 space-y-2">
            <div>
              Email:{" "}
              <a href="mailto:support@vibesdigitalmedia.com" className="hover:text-teal-300 transition-colors">
                support@vibesdigitalmedia.com
              </a>
            </div>
            <div>
              WhatsApp:{" "}
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                {WHATSAPP_NUMBER}
              </a>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold tracking-wide text-white/80 mb-4">Quick Links</h4>
          <ul className="grid gap-3 text-base text-white/70">
            <li><a href="/#/services" className="hover:text-white transition-colors">Services</a></li>
            <li><a href="/#/faq" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="/#/blog" className="hover:text-white transition-colors">Blog</a></li>
            <li><a href="/#/contact" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold tracking-wide text-white/80 mb-4">Newsletter</h4>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Get marketing insights delivered to your inbox.
          </p>
          <a
            href="/#/contact"
            className="inline-flex items-center justify-center rounded-xl bg-teal-500 px-6 py-3 text-base font-semibold text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Subscribe via Contact Form
          </a>
        </div>
      </div>

      <div className="mt-12 border-t border-white/10 py-8 text-center text-base text-white/55">
        © {new Date().getFullYear()} Vibes Digital Media • All rights reserved
      </div>
    </footer>
  );
}
