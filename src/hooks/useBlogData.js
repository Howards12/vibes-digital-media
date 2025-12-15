import { useState, useEffect } from "react";

// --- IMPORTANT ---
// Replace this with the actual URL you get from "Publish to web" in Google Sheets
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQQQ4GqNlSAp40N8ZB0nMYnSpIjg1uJN4Gtcz3dUwsmESapcL8jngyIg61Zh6qrzTD9ILUH2doQnbKT/pub?gid=2028528178&single=true&output=csv";

/**
 * A simple CSV-to-JSON parser.
 * Assumes the first row is the header.
 * @param {string} csvText The raw CSV text content.
 * @returns {Array<Object>} An array of post objects.
 */
function parseCsv(csvText) {
  const lines = csvText.split(/\r\n|\n/);
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(header => header.trim());
  const posts = [];

  for (let i = 1; i < lines.length; i++) {
    const data = lines[i].split(',');
    // Basic handling for commas within quoted fields
    // This is a simplified parser. For complex CSVs, a library like PapaParse is recommended.
    const post = {};
    let currentField = '';
    let inQuotes = false;
    let headerIndex = 0;

    for (const char of lines[i]) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        post[headers[headerIndex]] = currentField.trim();
        currentField = '';
        headerIndex++;
      } else {
        currentField += char;
      }
    }
    post[headers[headerIndex]] = currentField.trim(); // Add the last field
    posts.push(post);
  }
  return posts;
}

export function useBlogData() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(GOOGLE_SHEET_CSV_URL)
      .then((response) => response.text())
      .then((csvText) => {
        const rawRows = parseCsv(csvText);

        // Normalize Google Sheet columns into the shape the app expects.
        // Sheet headers:
        // Status(Published/Draft), Title, Slug, Date, ReadTime, Excerpt, Content, featuredImage
        const normalized = rawRows
          .map((row) => ({
            status: row["Status(Published/Draft)"]?.trim(),
            title: row.Title,
            slug: row.Slug,
            date: row.Date,
            readTime: row.ReadTime,
            excerpt: row.Excerpt,
            content: row.Content,
            featuredImage: row.featuredImage,
          }))
          // Only include rows that look like valid, published posts
          .filter(
            (p) =>
              p &&
              p.status &&
              p.status.toLowerCase() === "published" &&
              p.slug &&
              p.title
          );

        // Sort posts by date, newest first (if date present)
        normalized.sort((a, b) => {
          const dateA = a.date ? new Date(a.date) : 0;
          const dateB = b.date ? new Date(b.date) : 0;
          return dateB - dateA;
        });

        setPosts(normalized);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading, error };
}