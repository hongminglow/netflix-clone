const imageBase = 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image'

type ImageSize =
  | 'square_hd'
  | 'square'
  | 'portrait_4_3'
  | 'portrait_16_9'
  | 'landscape_4_3'
  | 'landscape_16_9'

export function image(prompt: string, size: ImageSize) {
  return `${imageBase}?prompt=${encodeURIComponent(prompt)}&image_size=${size}`
}

export type Movie = {
  id: string
  title: string
  year: string
  duration: string
  maturity: string
  synopsis: string
  genres: string[]
  posterUrl: string
  backdropUrl: string
  videoUrl: string
}

const videos = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
]

function v(i: number) {
  return videos[i % videos.length]
}

export const movies: Movie[] = [
  {
    id: 'n1',
    title: 'Stranger Things',
    synopsis: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
    year: '2016',
    maturity: 'TV-14',
    duration: '4 Seasons',
    genres: ['Sci-Fi', 'Horror', 'Drama'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
    videoUrl: v(0),
  },
  {
    id: 'n2',
    title: 'Squid Game',
    synopsis: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games. Inside, a tempting prize awaits with deadly high stakes.',
    year: '2021',
    maturity: 'TV-MA',
    duration: '1 Season',
    genres: ['Thriller', 'Drama', 'Action'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/1QdXdRYfktUSONkl1oD5gc6Be0s.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/2meX1nMdScFOoV4370rqHWKmXhY.jpg',
    videoUrl: v(1),
  },
  {
    id: 'n3',
    title: 'The Witcher',
    synopsis: 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.',
    year: '2019',
    maturity: 'TV-MA',
    duration: '3 Seasons',
    genres: ['Fantasy', 'Action', 'Adventure'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg',
    videoUrl: v(2),
  },
  {
    id: 'n4',
    title: 'Money Heist',
    synopsis: 'Eight thieves take hostages and lock themselves in the Royal Mint of Spain as a criminal mastermind manipulates the police to carry out his plan.',
    year: '2017',
    maturity: 'TV-MA',
    duration: '5 Parts',
    genres: ['Crime', 'Thriller', 'Drama'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/gFZriCkpJYsApPZEF3jhxL4yLzG.jpg',
    videoUrl: v(3),
  },
  {
    id: 'n5',
    title: 'Breaking Bad',
    synopsis: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
    year: '2008',
    maturity: 'TV-MA',
    duration: '5 Seasons',
    genres: ['Crime', 'Drama', 'Thriller'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
    videoUrl: v(0),
  },
  {
    id: 'n6',
    title: 'Better Call Saul',
    synopsis: 'This Emmy-nominated prequel to "Breaking Bad" follows small-time attorney Jimmy McGill as he transforms into morally challenged lawyer Saul Goodman.',
    year: '2015',
    maturity: 'TV-MA',
    duration: '6 Seasons',
    genres: ['Crime', 'Drama'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/zjg4jpK1Wp2kiRvtt5ND0kznako.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/t15KHp3iNfHVQBNIaqUGW12xQA4.jpg',
    videoUrl: v(1),
  },
  {
    id: 'n7',
    title: 'Peaky Blinders',
    synopsis: 'A notorious gang in 1919 Birmingham, England, is led by the fierce Tommy Shelby, a crime boss set on moving up in the world no matter the cost.',
    year: '2013',
    maturity: 'TV-MA',
    duration: '6 Seasons',
    genres: ['Crime', 'Drama'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/w21yE033g9Qh7IqFof8A9oEwH4u.jpg',
    videoUrl: v(2),
  },
  {
    id: 'n8',
    title: 'The Queen\'s Gambit',
    synopsis: 'In a 1950s orphanage, a young girl reveals an astonishing talent for chess and begins an unlikely journey to stardom while grappling with addiction.',
    year: '2020',
    maturity: 'TV-MA',
    duration: '1 Season',
    genres: ['Drama'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/zU0htIQ5Glsd6l75355KntvH2f6.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/34OGjFEbHj0E3lE2w0iTUVq0CBz.jpg',
    videoUrl: v(3),
  },
  {
    id: 'n9',
    title: 'Dark',
    synopsis: 'A missing child sets four families on a frantic hunt for answers as they unearth a mind-bending mystery that spans three generations.',
    year: '2017',
    maturity: 'TV-MA',
    duration: '3 Seasons',
    genres: ['Sci-Fi', 'Thriller', 'Mystery'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/4b1iBtaw5KqZzE15wzSjI5aBqB3.jpg',
    videoUrl: v(0),
  },
  {
    id: 'n10',
    title: 'Narcos',
    synopsis: 'The true story of Colombia\'s infamously violent and powerful drug cartels fuels this gritty gangster drama series.',
    year: '2015',
    maturity: 'TV-MA',
    duration: '3 Seasons',
    genres: ['Crime', 'Drama', 'Action'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/rTmal9fOb0hEWabwgJSiFJGwqHC.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/vyXh7F5YpZos4iH6DqA9Z62R8fV.jpg',
    videoUrl: v(1),
  },
  {
    id: 'n11',
    title: 'Ozark',
    synopsis: 'A financial adviser drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.',
    year: '2017',
    maturity: 'TV-MA',
    duration: '4 Seasons',
    genres: ['Crime', 'Drama', 'Thriller'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
    videoUrl: v(2),
  },
  {
    id: 'n12',
    title: 'Black Mirror',
    synopsis: 'This sci-fi anthology series explores a twisted, high-tech near-future where humanity\'s greatest innovations and darkest instincts collide.',
    year: '2011',
    maturity: 'TV-MA',
    duration: '6 Seasons',
    genres: ['Sci-Fi', 'Drama', 'Thriller'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg',
    videoUrl: v(3),
  },
]

export const rows = [
  { id: 'r1', title: 'Trending Now', items: ['n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8', 'n9', 'n10', 'n11', 'n12', 'n1', 'n2', 'n3', 'n4', 'n5', 'n6'] },
  { id: 'r2', title: 'New Releases', items: ['n9', 'n10', 'n11', 'n12', 'n8', 'n7', 'n6', 'n5', 'n4', 'n3', 'n2', 'n1', 'n9', 'n10', 'n11', 'n12'] },
  { id: 'r3', title: 'Top Picks for You', items: ['n3', 'n4', 'n2', 'n1', 'n7', 'n11', 'n12', 'n10', 'n9', 'n8', 'n6', 'n5', 'n4', 'n3', 'n2', 'n1'] },
  { id: 'r4', title: 'Action & Adventure', items: ['n8', 'n5', 'n4', 'n3', 'n2', 'n1', 'n10', 'n6', 'n9', 'n2', 'n8', 'n5', 'n4', 'n3'] },
  { id: 'r5', title: 'Mystery & Thrillers', items: ['n10', 'n6', 'n9', 'n2', 'n5', 'n12', 'n11', 'n1', 'n3', 'n4', 'n7', 'n8', 'n10', 'n6'] },
] as const

export function getMovie(id: string) {
  return movies.find((m) => m.id === id) ?? null
}
