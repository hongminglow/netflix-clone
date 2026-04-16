const fs = require('fs');
const https = require('https');

const content = fs.readFileSync('src/data/catalog.ts', 'utf-8');
const urls = [...content.matchAll(/https:\/\/m\.media-amazon\.com[^']+/g)].map(m => m[0]);

let pending = urls.length;
urls.forEach(url => {
  https.request(url, { method: 'HEAD' }, res => {
    if (res.statusCode !== 200) {
      console.log(`BROKEN [${res.statusCode}]: ${url}`);
    }
    if (--pending === 0) console.log('Done checking images.');
  }).on('error', err => {
    console.log(`ERROR [${err.message}]: ${url}`);
    if (--pending === 0) console.log('Done checking images.');
  }).end();
});
