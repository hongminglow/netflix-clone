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
    posterUrl: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8TJq6IQPS.jpg',
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
    posterUrl: 'https://image.tmdb.org/t/p/w500/dDlEmu3EZ0PggZ3qE0SqNVQ2EbD.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/qw3J9cNeLioTg84CMDwWHuVInPN.jpg',
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
    posterUrl: 'https://image.tmdb.org/t/p/w500/fC2HDm5t0kHlAMOINAYoZA2ajSy.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/p10gvkGxctjaOKyyvjsal2SikD.jpg',
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
    posterUrl: 'https://image.tmdb.org/t/p/w500/m73bD8VipiFNcVySF8DXFvoFEn.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/q8eeqbACqpePGAh2a1VqEts8X7y.jpg',
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
    posterUrl: 'https://image.tmdb.org/t/p/w500/5UaYsGZOFvkUkgDtwO8wSAm3k0G.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/AihgKzQj7yIeK2hW2kXgYpP8a2S.jpg',
    videoUrl: v(3),
  },
  {
    id: 'n13',
    title: 'Narcos: Mexico',
    synopsis: 'Explore the origins of the modern drug war by going back to its roots, starting at a time when the Mexican trafficking world was a loose and disorganized confederation of independent growers and dealers.',
    year: '2018',
    maturity: 'TV-MA',
    duration: '3 Seasons',
    genres: ['Crime', 'Drama'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/A00F0530Wn0qGqB61556w3J5gVj.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/yA0qE6Oq8i6r1iG2XJ1o0K2i3Hj.jpg',
    videoUrl: v(0),
  },
  {
    id: 'n14',
    title: 'Mindhunter',
    synopsis: 'In the late 1970s two FBI agents expand criminal science by delving into the psychology of murder and getting uneasily close to all-too-real monsters.',
    year: '2017',
    maturity: 'TV-MA',
    duration: '2 Seasons',
    genres: ['Crime', 'Thriller'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/fbKE87mojpIETWepSbD5KE7kR1m.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/t5mI4n7Fv7T2w9w2e3V2p3H8s6N.jpg',
    videoUrl: v(1),
  },
  {
    id: 'n15',
    title: 'The Crown',
    synopsis: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.',
    year: '2016',
    maturity: 'TV-MA',
    duration: '6 Seasons',
    genres: ['Drama', 'History'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/1pXN2ZlMmtIARHn2n2xO68W2b9C.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/2q2mZ2A8M8gQ2H3x1v7V8R8X2jH.jpg',
    videoUrl: v(2),
  },
  {
    id: 'n16',
    title: 'Lupin',
    synopsis: 'Inspired by the adventures of Arsène Lupin, gentleman thief Assane Diop sets out to avenge his father for an injustice inflicted by a wealthy family.',
    year: '2021',
    maturity: 'TV-MA',
    duration: '3 Parts',
    genres: ['Action', 'Crime'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/sgza0U7T7D1g7m7b0f5G2W8h8W2.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/1a7oO8O2G0Y5K1e2F2f6F8T1Z0b.jpg',
    videoUrl: v(3),
  },
  {
    id: 'n17',
    title: 'Wednesday',
    synopsis: 'Follows Wednesday Addams\' years as a student, when she attempts to master her emerging psychic ability, thwart and solve the mystery that embroiled her parents.',
    year: '2022',
    maturity: 'TV-14',
    duration: '1 Season',
    genres: ['Comedy', 'Crime', 'Fantasy'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOoO.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/iHSwvRVsRyxpX7FE7EqXBoYWcj3.jpg',
    videoUrl: v(0),
  },
  {
    id: 'n18',
    title: 'Altered Carbon',
    synopsis: 'Set in a future where consciousness is digitized and stored, a prisoner returns to life in a new body and must solve a mind-bending murder to win his freedom.',
    year: '2018',
    maturity: 'TV-MA',
    duration: '2 Seasons',
    genres: ['Action', 'Sci-Fi'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/wA0R0N1g8B9r9o1r3d8G7b6X9nE.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/7k8w8W0r7s9n2r0Y5Z3a8R4z1dI.jpg',
    videoUrl: v(1),
  },
  {
    id: 'n19',
    title: 'Bridgerton',
    synopsis: 'Follows the personal and political maneuvers of Queen Elizabeth II\'s reign, focusing on the romances and rivalries that shaped the modern monarchy.',
    year: '2020',
    maturity: 'TV-MA',
    duration: '3 Seasons',
    genres: ['Drama', 'Romance'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/qZjnkQxP0wH5n9c8Q9r8F1v2J1G.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/8Z8G8o0d7M6s1V6y3U5p5S9j6X2.jpg',
    videoUrl: v(2),
  },
  {
    id: 'n20',
    title: 'Sex Education',
    synopsis: 'A teenage boy with a sex therapist mother teams up with a high school classmate to set up an underground sex therapy clinic at school.',
    year: '2019',
    maturity: 'TV-MA',
    duration: '4 Seasons',
    genres: ['Comedy', 'Drama'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/8j12x2W8p4m1G3g0Z7B1b3Q3v3R.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/5Z3n2t8J6b0E7h5O4a9V8u4M9j3.jpg',
    videoUrl: v(3),
  },
  {
    id: 'n21',
    title: 'The Umbrella Academy',
    synopsis: 'A family of former child heroes, now grown apart, must reunite to continue to protect the world.',
    year: '2019',
    maturity: 'TV-14',
    duration: '4 Seasons',
    genres: ['Action', 'Adventure', 'Comedy'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/6k9f9P6n6F8x4Q8m1T6y2G8s9R7.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/7k1B3W4v8T9s0V7a5M2n6L5k8O6.jpg',
    videoUrl: v(0),
  },
  {
    id: 'n22',
    title: 'Lucifer',
    synopsis: 'Lucifer Morningstar has decided he\'s had enough of being the dutiful servant in Hell and decides to spend some time on Earth to better understand humanity.',
    year: '2016',
    maturity: 'TV-14',
    duration: '6 Seasons',
    genres: ['Crime', 'Drama', 'Fantasy'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/ekZobS8isE6mA53RAiGDG93hBxL.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/1v5y8W0V6B9R4s9Q5c5Y8K4n9L6.jpg',
    videoUrl: v(1),
  },
  {
    id: 'n23',
    title: 'Elite',
    synopsis: 'When three working-class teenagers begin attending an exclusive private school in Spain, the clash between them and the wealthy students leads to murder.',
    year: '2018',
    maturity: 'TV-MA',
    duration: '8 Seasons',
    genres: ['Crime', 'Drama', 'Thriller'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/3A8K1v8V5N4L2b0R6Y4Q2s1G0a.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/6k9d9X4o2W6a9S3m4C5b9H2p8Z6.jpg',
    videoUrl: v(2),
  },
  {
    id: 'n24',
    title: 'Arcane',
    synopsis: 'Set in utopian Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League champions-and the power that will tear them apart.',
    year: '2021',
    maturity: 'TV-14',
    duration: '2 Seasons',
    genres: ['Animation', 'Action', 'Adventure'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/xQ6Gj0r2V6a6z9s9x0V4T1a8Z2e.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/5Z3n2t8J6b0E7h5O4a9V8u4M9j3.jpg',
    videoUrl: v(3),
  }
]

export const rows = [
  { id: 'r1', title: 'Trending Now', items: ['n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8', 'n9', 'n10', 'n11', 'n12', 'n13', 'n14', 'n15'] },
  { id: 'r2', title: 'New Releases', items: ['n16', 'n17', 'n18', 'n19', 'n20', 'n21', 'n22', 'n23', 'n24', 'n9', 'n10', 'n5', 'n6', 'n8'] },
  { id: 'r3', title: 'Top Picks for You', items: ['n24', 'n22', 'n3', 'n4', 'n2', 'n1', 'n7', 'n11', 'n13', 'n15', 'n19', 'n21'] },
  { id: 'r4', title: 'Action & Adventure', items: ['n24', 'n21', 'n18', 'n16', 'n8', 'n5', 'n4', 'n3', 'n2', 'n1'] },
  { id: 'r5', title: 'Mystery & Thrillers', items: ['n23', 'n17', 'n14', 'n13', 'n10', 'n6', 'n9', 'n2', 'n5', 'n12', 'n11'] },
] as const

export function getMovie(id: string) {
  return movies.find((m) => m.id === id) ?? null
}
