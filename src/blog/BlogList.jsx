import React from "react";
import { Link } from "react-router-dom";
import { useBlogData } from "../hooks/useBlogData.js";

const container = "mx-auto max-w-6xl px-4";

export default function BlogList() {
  const { posts, loading, error } = useBlogData();

  if (loading) {
    return (
      <main className="min-h-screen bg-[#020817] text-white">
        <div className={`${container} py-16 text-center`}>Loading posts...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#020817] text-white">
        <div className={`${container} py-16 text-center text-red-400`}>
          Failed to load blog posts.
        </div>
      </main>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Vibes Digital Media Blog",
    url: "https://www.vibesdigitalmedia.com/#/blog",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      datePublished: p.date,
      url: `https://www.vibesdigitalmedia.com/#/blog/${p.slug}`,
    })),
  };

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <div className={`${container} py-16`}>
        <h1 className="text-3xl font-extrabold">Blog</h1>
        <p className="mt-2 max-w-2xl text-white/70">
          Practical SEO + social media growth tips, broken down into steps you can execute.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {posts.map((p) => (
            <article key={p.slug} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-wider text-white/55">{p.date}</p>
              <h2 className="mt-2 text-xl font-bold">{p.title}</h2>
              <p className="mt-2 text-white/70">{p.excerpt}</p>

              <div className="mt-4">
                <Link
                  to={`/blog/${p.slug}`}
                  className="inline-flex rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/15"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}