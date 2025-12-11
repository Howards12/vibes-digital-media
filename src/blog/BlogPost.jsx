import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbyD1VoJvYLbMpysqkf-SIQWmhMGNqCkddNj55KmsPJZHuhkFzbcsVSye4omPM7_H8jF/exec"
    )
      .then((res) => res.json())
      .then((data) => {
        // Support both { posts: [...] } and bare [...] just in case
        const posts = Array.isArray(data) ? data : data.posts;
        if (!posts) return;

        const match = posts.find((p) => p.slug === slug);
        setPost(match || null);
      })
      .catch((err) => {
        console.error("Error loading blog post:", err);
        setPost(null);
      });
  }, [slug]);

  if (!post) {
    return (
      <div className="text-center text-white py-20">
        Loading blog post…
      </div>
    );
  }

  // ----- SEO: BlogPosting JSON-LD -----
  const postUrl = `https://www.vibesdigitalmedia.com/blog/${post.slug}`;
  const ogImage =
    post.featureImage ||
    "https://www.vibesdigitalmedia.com/assets/og-image.png";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description:
      post.excerpt ||
      (post.content
        ? String(post.content).slice(0, 160)
        : "Digital marketing insights from Vibes Digital Media."),
    image: ogImage,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    author: {
      "@type": "Organization",
      name: "Vibes Digital Media",
    },
    publisher: {
      "@type": "Organization",
      name: "Vibes Digital Media",
      logo: {
        "@type": "ImageObject",
        url: "https://www.vibesdigitalmedia.com/assets/vibes-logo.png",
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-white">
      {/* BlogPosting structured data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        to="/blog"
        className="text-teal-300 hover:text-teal-200 mb-6 block"
      >
        ← Back to Blog
      </Link>

      <h1 className="text-4xl font-bold text-teal-300">{post.title}</h1>

      <p className="mt-2 text-white/60">
        {post.date ? new Date(post.date).toDateString() : ""}
        {post.readTime ? ` • ${post.readTime}` : ""}
      </p>

      <div className="mt-8 text-white/80 leading-relaxed whitespace-pre-line">
        {post.content}
      </div>
    </div>
  );
}
