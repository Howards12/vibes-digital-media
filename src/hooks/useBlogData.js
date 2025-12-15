import { useState, useEffect } from "react";

// --- IMPORTANT ---
// Replace this with the actual URL you get from "Publish to web" in Google Sheets
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQQQ4GqNlSAp40N8ZB0nMYnSpIjg1uJN4Gtcz3dUwsmESapcL8jngyIg61Zh6qrzTD9ILUH2doQnbKT/pub?gid=2028528178&single=true&output=csv";

/**
 * A CSV-to-JSON parser that handles multi-line fields and quoted content.
 * Assumes the first row is the header.
 * @param {string} csvText The raw CSV text content.
 * @returns {Array<Object>} An array of post objects.
 */
function parseCsv(csvText) {
  if (!csvText || csvText.trim().length === 0) return [];

  const rows = [];
  let currentRow = [];
  let currentField = '';
  let inQuotes = false;
  let i = 0;

  // Process character by character to handle multi-line quoted fields
  while (i < csvText.length) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote (double quote)
        currentField += '"';
        i += 2;
        continue;
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
        i++;
        continue;
      }
    }

    if (char === ',' && !inQuotes) {
      // End of field
      currentRow.push(currentField.trim());
      currentField = '';
      i++;
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      // End of row (but only if not inside quotes)
      if (char === '\r' && nextChar === '\n') {
        i += 2; // Skip \r\n
      } else {
        i++; // Skip \n or \r
      }
      
      if (currentField.length > 0 || currentRow.length > 0) {
        currentRow.push(currentField.trim());
        rows.push(currentRow);
        currentRow = [];
        currentField = '';
      }
      continue;
    }

    // Regular character
    currentField += char;
    i++;
  }

  // Handle last field/row if CSV doesn't end with newline
  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    rows.push(currentRow);
  }

  if (rows.length < 2) return [];

  // First row is headers
  const headers = rows[0].map(header => header.trim());
  const posts = [];

  // Process data rows
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const post = {};
    
    headers.forEach((header, index) => {
      post[header] = row[index] || '';
    });
    
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

        // Helper to safely convert date strings into sortable timestamps.
        // Invalid or missing dates are treated as 0 so they fall to the bottom.
        const toTime = (value) => {
          if (!value) return 0;
          const d = new Date(value);
          const t = d.getTime();
          return Number.isNaN(t) ? 0 : t;
        };

        // Sort posts by date, newest first, without ever returning NaN
        normalized.sort((a, b) => toTime(b.date) - toTime(a.date));

        setPosts(normalized);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading, error };
}