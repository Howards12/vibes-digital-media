import React from "react";
import { container } from "./Section.jsx";
import FormCard from "./FormCard.jsx";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-teal-700 to-cyan-600" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-25" />
      <div className={`${container} relative py-20 sm:py-28`}>
        <div className="grid items-start gap-12 sm:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              SEO &amp; SMO that{" "}
              <span className="text-teal-200">grow your business</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85 leading-relaxed">
              We launch and optimize search + social campaigns that drive measurable
              traffic, qualified leads, and consistent revenue across the U.S., Europe,
              and Africa.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-xl bg-white px-8 py-4 text-base font-semibold text-slate-900 shadow-lg ring-1 ring-black/10 hover:opacity-95 transition-opacity"
              >
                Book a Strategy Call
              </a>
              <a
                href="#pricing"
                className="rounded-xl bg-black/20 px-8 py-4 text-base font-semibold text-white ring-1 ring-white/20 backdrop-blur hover:bg-black/30 transition-colors"
              >
                View Packages
              </a>
            </div>
          </div>

          <FormCard
            label="Free Audit"
            title="Get a Free Mini Audit in 24 Hours"
            subtitle="Tell us about your brand so we can review your SEO & social presence."
            src="https://docs.google.com/forms/d/e/1FAIpQLSfyaMijaMGdRCoVlRxKGaMSez-b8ndCXx_hVaeJ0lgSKFv2NA/viewform?embedded=true"
            height={1851}
            maxHeight={420}
          />
        </div>
      </div>
    </section>
  );
}
