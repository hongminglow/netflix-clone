const https = require('https');
https.request('https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8TJq6IQPS.jpg', { method: 'HEAD' }, res => {
  console.log(`TMDB: ${res.statusCode}`);
}).end();
