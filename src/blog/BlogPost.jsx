import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { RegionProvider } from "../context/RegionContext.jsx";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";

const FEED =
  "https://script.google.com/macros/s/AKfycbyD1VoJvYLbMpysqkf-SIQWmhMGNqCkddNj55KmsPJZHuhkFzbcsVSye4omPM7_H8jF/exec";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(FEED)
      .then((res) => res.json())
      .then((data) => {
        const match = data?.posts?.find((p) => p.slug === slug);
        setPost(match || null);
      })
      .catch(() => setPost(null));
  }, [slug]);

  const blogSchema = useMemo(() => {
    if (!post) return null;
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      datePublished: post.date,
      dateModified: post.date,
      author: { "@type": "Organization", name: "Vibes Digital Media" },
      mainEntityOfPage: { "@type": "WebPage", "@id": `/#/blog/${post.slug}` },
    };
  }, [post]);

  return (
    <RegionProvider>
      <Layout>
        <Section>
          <div className="mx-auto max-w-4xl">
            <Link to="/blog" className="text-teal-300 hover:text-teal-200 mb-6 block">
              ← Back to Blog
            </Link>

            {!post ? (
              <div className="text-center text-white/70 py-20">Loading…</div>
            ) : (
              <>
                <h1 className="text-4xl font-bold text-teal-300">{post.title}</h1>
                <p className="mt-2 text-white/60">{new Date(post.date).toDateString()}</p>

                <div className="mt-8 text-white/80 leading-relaxed whitespace-pre-line">
                  {post.content}
                </div>

                {blogSchema && (
                  <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
                  />
                )}
              </>
            )}
          </div>
        </Section>
      </Layout>
    </RegionProvider>
  );
}
