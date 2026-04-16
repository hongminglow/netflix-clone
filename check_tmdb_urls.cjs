const fs = require('fs');
const https = require('https');

const content = fs.readFileSync('src/data/catalog.ts', 'utf8');
const urls = [...new Set([...content.matchAll(/https:\/\/image\.tmdb\.org[^']+/g)].map((m) => m[0]))];

let pending = urls.length;
let broken = 0;

function head(url) {
  return new Promise((resolve) => {
    https
      .request(url, { method: 'HEAD' }, (res) => {
        resolve({ url, status: res.statusCode });
      })
      .on('error', () => resolve({ url, status: 0 }))
      .end();
  });
}

(async () => {
  for (const url of urls) {
    const { status } = await head(url);
    if (status !== 200) {
      broken += 1;
      console.log(`BROKEN [${status}]: ${url}`);
    }
    pending -= 1;
  }
  console.log(`Checked ${urls.length} urls. Broken: ${broken}.`);
})();
