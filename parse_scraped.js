const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('scraped');
for (const f of files) {
  const content = fs.readFileSync(path.join('scraped', f), 'utf8');
  // strip HTML tags to get pure headings and paragraphs
  console.log(`\n=================== ${f} ===================`);
  
  // Extract h1, h2, h3 and p
  const matches = content.match(/<(h[1-4]|p|title)[^>]*>([\s\S]*?)<\/\1>/gi) || [];
  const cleanLines = matches
    .map(m => m.replace(/<[^>]+>/g, '').trim())
    .filter(t => t.length > 0 && !t.includes('copyright') && !t.includes('Home') && !t.includes('About us') && !t.includes('+234'));
  
  // Print unique non-empty lines
  const unique = Array.from(new Set(cleanLines));
  console.log(unique.slice(0, 15).join('\n---\n'));
}
