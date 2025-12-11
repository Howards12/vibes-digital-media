import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbyD1VoJvYLbMpysqkf-SIQWmhMGNqCkddNj55KmsPJZHuhkFzbcsVSye4omPM7_H8jF/exec")
      .then(res => res.json())
      .then(data => {
        if (!data.posts) return;
        const sorted = data.posts.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setPosts(sorted);
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-white">
      <h1 className="text-4xl font-bold mb-10">Vibes Digital Media Blog</h1>

      <div className="grid gap-10">
        {posts.map(post => (
          <div
            key={post.slug}
            className="bg-slate-900/70 p-6 rounded-xl ring-1 ring-white/10 hover:ring-teal-400 transition"
          >
            <h2 className="text-2xl font-bold text-teal-300">{post.title}</h2>

            <p className="text-sm text-white/60 mt-1">
              {new Date(post.date).toDateString()}
            </p>

            <p className="mt-4 text-white/80 line-clamp-3">
              {post.content.substring(0, 150)}...
            </p>

            <Link
              to={`/blog/${post.slug}`}
              className="inline-block mt-4 text-teal-300 font-semibold hover:text-teal-200"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
