import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RegionProvider } from "../context/RegionContext.jsx";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";

const FEED =
  "https://script.google.com/macros/s/AKfycbyD1VoJvYLbMpysqkf-SIQWmhMGNqCkddNj55KmsPJZHuhkFzbcsVSye4omPM7_H8jF/exec";

export default function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(FEED)
      .then((r) => r.json())
      .then((data) => setPosts(data?.posts || []))
      .catch(() => setPosts([]));
  }, []);

  return (
    <RegionProvider>
      <Layout>
        <Section
          eyebrow="Blog"
          title="Growth insights & marketing playbooks"
          desc="SEO, social, and conversion strategy — in plain English."
        >
          <div className="mx-auto max-w-4xl grid gap-4">
            {posts.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="rounded-2xl bg-slate-900/80 p-6 ring-1 ring-white/10 hover:ring-teal-400/30 transition-all"
              >
                <h3 className="text-xl font-semibold text-teal-200">{p.title}</h3>
                <p className="mt-2 text-sm text-white/60">
                  {p.date ? new Date(p.date).toDateString() : ""}
                </p>
                <p className="mt-3 text-white/70 leading-relaxed line-clamp-2">
                  {p.excerpt || p.content?.slice(0, 140) || ""}
                </p>
              </Link>
            ))}
            {!posts.length && (
              <div className="text-white/70 text-center py-10">
                No posts yet.
              </div>
            )}
          </div>
        </Section>
      </Layout>
    </RegionProvider>
  );
}
