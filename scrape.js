const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'scraped');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const pages = [
  'about.html',
  'hrconsulting.html',
  'taxmanagement.html',
  'compliance.html',
  'businessconsulting.html',
  'talentacquisition.html',
  'outsourcing.html',
  'learningdevelopment.html',
  'contact.html',
  'teams.html'
];

for (const p of pages) {
  const target = path.join(dir, p);
  // curl with -L follows redirects
  try {
    execSync(`curl.exe -L -k -s -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "https://www.benresaconsult.com/${p}" -o "${target}"`);
    const size = fs.statSync(target).size;
    console.log(`Downloaded ${p} (${size} bytes)`);
  } catch (e) {
    console.error(`Failed ${p}:`, e.message);
  }
}
console.log('Done downloading all pages');
