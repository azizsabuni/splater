const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/Lenovo/Downloads/stapler-main/stapler-3ad5fc';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const filepath = path.join(dir, file);
  let content = fs.readFileSync(filepath, 'utf8');
  
  // replace href="/...html" with href="...html"
  content = content.replace(/href="\/([a-zA-Z0-9\-]+\.html)/g, 'href="$1');
  
  // replace window.location.href = '/...html' with window.location.href = '...html'
  content = content.replace(/window\.location\.href\s*=\s*['"]\/([a-zA-Z0-9\-]+\.html)/g, 'window.location.href = \'$1');
  
  // replace href="/" with href="index.html"
  content = content.replace(/href="\/"/g, 'href="index.html"');
  
  fs.writeFileSync(filepath, content);
}
console.log('Done replacement');
