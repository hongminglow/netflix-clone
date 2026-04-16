const https = require('https');
const urls = [
  'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8TJq6IQPS.jpg',
  'https://image.tmdb.org/t/p/w1280/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
  'https://image.tmdb.org/t/p/w500/dDlEmu3EZ0PggZ3qE0SqNVQ2EbD.jpg',
  'https://image.tmdb.org/t/p/w1280/qw3J9cNeLioTg84CMDwWHuVInPN.jpg',
  'https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg',
  'https://image.tmdb.org/t/p/w1280/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg',
  'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
  'https://image.tmdb.org/t/p/w1280/gFZriCkpJYsApPZEF3jhxL4yLzG.jpg',
  'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
  'https://image.tmdb.org/t/p/w1280/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
  'https://image.tmdb.org/t/p/w500/fC2HDm5t0kHlAMOINAYoZA2ajSy.jpg',
  'https://image.tmdb.org/t/p/w1280/p10gvkGxctjaOKyyvjsal2SikD.jpg',
  'https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg',
  'https://image.tmdb.org/t/p/w1280/w21yE033g9Qh7IqFof8A9oEwH4u.jpg',
  'https://image.tmdb.org/t/p/w500/zU0htIQ5Glsd6l75355KntvH2f6.jpg',
  'https://image.tmdb.org/t/p/w1280/34OGjFEbHj0E3lE2w0iTUVq0CBz.jpg',
  'https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg',
  'https://image.tmdb.org/t/p/w1280/4b1iBtaw5KqZzE15wzSjI5aBqB3.jpg',
  'https://image.tmdb.org/t/p/w500/rTmal9fOb0hEWabwgJSiFJGwqHC.jpg',
  'https://image.tmdb.org/t/p/w1280/vyXh7F5YpZos4iH6DqA9Z62R8fV.jpg',
  'https://image.tmdb.org/t/p/w500/m73bD8VipiFNcVySF8DXFvoFEn.jpg',
  'https://image.tmdb.org/t/p/w1280/q8eeqbACqpePGAh2a1VqEts8X7y.jpg',
  'https://image.tmdb.org/t/p/w500/5UaYsGZOFvkUkgDtwO8wSAm3k0G.jpg',
  'https://image.tmdb.org/t/p/w1280/AihgKzQj7yIeK2hW2kXgYpP8a2S.jpg'
];
urls.forEach(url => {
  https.get(url, res => {
    if (res.statusCode !== 200) console.log(`BROKEN: ${res.statusCode} ${url}`);
  });
});
