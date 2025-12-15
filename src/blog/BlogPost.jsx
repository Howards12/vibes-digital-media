import React from "react";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";
import ReactMarkdown from "react-markdown";
import { useBlogData } from "../hooks/useBlogData.js";

const container = "mx-auto max-w-3xl px-4";

export default function BlogPost() {
  const { slug } = useParams();
  const { theme } = useTheme();
  const { posts, loading, error } = useBlogData();
  const post = posts.find((p) => p.slug === slug);

  const linkThemeClasses = theme === 'dark' ? 'text-teal-200 hover:underline' : 'text-teal-600 hover:underline';

  if (loading) {
    return <div className="text-center py-16">Loading post...</div>;
  }

  if (error) {
    return <div className="text-center py-16 text-red-500">Failed to load post.</div>;
  }

  if (!post) {
    // Note: The 'not found' page will also adopt the theme.
    // This page will now also be theme-aware.
    return (
      <div className="min-h-screen">
        <div className={`${container} py-16`}>
          <p className={theme === 'dark' ? 'text-white/70' : 'text-gray-600'}>Post not found.</p>
          <Link to="/blog" className={`mt-4 inline-block ${linkThemeClasses}`}>
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: `https://www.vibesdigitalmedia.com/#/blog/${post.slug}`,
    author: { "@type": "Organization", name: "Vibes Digital Media" },
    publisher: { "@type": "Organization", name: "Vibes Digital Media" },
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className={`${container} py-16`}>
        <Link to="/blog" className={`text-sm ${linkThemeClasses}`}>
          ← Back to Blog
        </Link>

        <h1 className="mt-4 text-3xl font-extrabold">{post.title}</h1>
        <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-500'}`}>
          {post.date}
        </p>

        <div className={`prose ${theme === 'dark' ? 'prose-invert' : ''} mt-8 max-w-none`}>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}