const fs = require('fs');
const path = 'C:\\Users\\sarat\\.gemini\\antigravity\\brain\\d15c9bd0-5418-4902-945b-24b8f41319c1\\.system_generated\\steps\\205\\content.md';
const content = fs.readFileSync(path, 'utf8');

const features = [
  'whatsapp', 'newsletter', 'contact', 'about us', 'privacy policy', 'terms', 'refund', 'track order', 'faq', 'reviews', 'related products', 'size guide', 'checkout', 'profile', 'wishlist', 'search', 'filter', 'sort'
];

features.forEach(f => {
  if (content.toLowerCase().includes(f)) {
    console.log(`Found: ${f}`);
  }
});

// Also let's extract all strings longer than 15 chars that might look like UI text.
// We can look for typical text that starts with uppercase.
const matches = content.match(/"([A-Z][a-z0-9 ]{10,50})"/g);
if (matches) {
  const unique = [...new Set(matches)];
  console.log("Potential UI strings:");
  console.log(unique.slice(0, 50).join('\n'));
}
