import React from "react";

const container = "mx-auto max-w-6xl px-4";

export default function Section({ id, eyebrow, title, desc, children }) {
  return (
    <section id={id} className="relative py-16 sm:py-24">
      <div className={container}>
        {(eyebrow || title) && (
          <header className="mb-12 text-center">
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-teal-200">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl">
                {title}
              </h2>
            )}
            {desc && (
              <p className="mx-auto mt-6 max-w-3xl text-lg text-white/80 leading-relaxed">
                {desc}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

export { container };
