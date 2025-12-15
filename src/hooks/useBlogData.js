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

/**
 * Fetches and parses blog post data from a public Google Sheet CSV.
 * @returns {{ posts: Array<Object>, loading: boolean, error: Error | null }}
 */
export function useBlogData() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(GOOGLE_SHEET_CSV_URL)
      .then((response) => response.text())
      .then((csvText) => {
        const parsedPosts = parseCsv(csvText);
        // Sort posts by date, newest first
        parsedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(parsedPosts);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading, error };
}