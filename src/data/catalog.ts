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
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BMjEzMDAxOTUyMV5BMl5BanBnXkFtZTgwNzAxMzYzOTE@._V1_FMjpg_UX1000_.jpg',
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
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BYWE3MDVkN2ItZDFhNi00ODgxLTllMTMtOTFiZWQ4MTJkNWNhXkEyXkFqcGdeQXVyMTEyMTEwMTY3._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BZmQ2MGI0MDAtZWM4Ni00ZDRiLTlhMjgtNGVkM2U0ZGY5YzY4XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg',
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
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMDEwOWVlY2EtNTFlZS00MTFiLWE1N2YtYTlkOGJlYWVlMTQyXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BN2FiOWU4YzYtMzZiOS00MzcyLTk2MDctYTQxNjRkMzE1M2RjXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg',
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
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNDJkYzY3MzMtMGFhYi00MmQ4LWJkNTgtZGNiZWZmMTMxNzdlXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BYTJlNmEyNTEtMzBlYi00ODZlLWE1NmUtZGRiZDBhZDRhYThkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_FMjpg_UX1000_.jpg',
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
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMzMtMTVkMTgwYjZmMTE0XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BMTQ4MzgwOTUxNV5BMl5BanBnXkFtZTgwNTQzNjczMzE@._V1_FMjpg_UX1000_.jpg',
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
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BZDA4YmE0OTYtMmRmNS00Mzk2LTlhM2MtNjk4NzBjZGE1MmIyXkEyXkFqcGdeQXVyMTMzNDExODE5._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BMjA5MDgxNjk5MV5BMl5BanBnXkFtZTgwNzY1NzI2NDE@._V1_FMjpg_UX1000_.jpg',
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
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BZjYzZDgzMmYtYjY0OS00OWE0LTgzMDktZjRhZWQ5NzYxYTMzXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BY2NkNjEwMWMtMTc0ZS00MDgwLTk4ZmUtNTRlOTdiNzM0OWE4XkEyXkFqcGdeQXVyODIyOTEyMzY@._V1_FMjpg_UX1000_.jpg',
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
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BM2EwMmRhNjcgNmE1Yy00NTRiLWJhODMtZWZlOTc2YmFhZjU0XkEyXkFqcGdeQXVyNDY5MjMyNTg@._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BNGFmNGZiOTAtMWE3OC00NzA3LTlhNmQtNTVhMTNjNzg1NWVlXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg',
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
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BZmY3NWM4OTItZDkwOS00ZGI2LTgwYmYtYTdkMDYwMDc5NzhjXkEyXkFqcGdeQXVyMTAyOTE2ODg0._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BOGZmNTE0NmEtOTNiYi00NWI4LWFhNzMtZmM2MjY3NmEwYWNlXkEyXkFqcGdeQXVyNjc3OTE4Nzk@._V1_FMjpg_UX1000_.jpg',
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
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNmFjODU3YzgtMGUwNC00ZGI3LWFkZjQtMjkxZDc3NmQ1MzcyXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BMTY3MjUyODcwOV5BMl5BanBnXkFtZTgwNTU5MzgwMDI@._V1_FMjpg_UX1000_.jpg',
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
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNDRiNTA3NDYtYTMwNC00NWJhLWFkZTAtMmM5MTI5Yjc0ZGJjXkEyXkFqcGdeQXVyMjY5ODI4NDk@._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BZTU0NGRhNDgtOWFjNi00MjMyLTk1YTMtNDUzMmFiMWFhZGNjXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg',
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
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BZTgyNTBkNzctN2I3NC00NTA1LTkxOTYtZDIyYWU4Yjk4MWZkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BYTMwNWQ4ZDItNWJjNi00MThmLWFjMjAtODJjNTQzNWQwYzQ5XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg',
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
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNmFjODU3YzgtMGUwNC00ZGI3LWFkZjQtMjkxZDc3NmQ1MzcyXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BMTY3MjUyODcwOV5BMl5BanBnXkFtZTgwNTU5MzgwMDI@._V1_FMjpg_UX1000_.jpg',
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
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNWNmYzQ1ZWUtYTQ3ZS00Y2UwLTgxZWQtNWVjNDI3NDAwMTg2XkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BMjEzMDAxOTUyMV5BMl5BanBnXkFtZTgwNzAxMzYzOTE@._V1_FMjpg_UX1000_.jpg',
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
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BZmY0MzBlNjEtZTZmNy00N2EzLWIxY2UtY2I3MzdkM2RjMjI0XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BNGFmNGZiOTAtMWE3OC00NzA3LTlhNmQtNTVhMTNjNzg1NWVlXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg',
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
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNDQzMzgxZDEtMTc4ZS00NTVkLWE5ZjctYWVjM2JiMTY3Y2RlXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BN2FiOWU4YzYtMzZiOS00MzcyLTk2MDctYTQxNjRkMzE1M2RjXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg',
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
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjllMzA1NjctNjFkNy00MTE2LTlkYzAtNGE0YmFjYTgxYzFlXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BZmQ2MGI0MDAtZWM4Ni00ZDRiLTlhMjgtNGVkM2U0ZGY5YzY4XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg',
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
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNjIxMjgxOTktZTEzYy00ZGZkLWIwMTEtODQ1ZGY5ZWJjZmZkXkEyXkFqcGdeQXVyMjYwMDk5NjE@._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BOGZmNTE0NmEtOTNiYi00NWI4LWFhNzMtZmM2MjY3NmEwYWNlXkEyXkFqcGdeQXVyNjc3OTE4Nzk@._V1_FMjpg_UX1000_.jpg',
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
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BOGNlNmQ4NGMtZWVlYy00NThhLWJhM2ItY2QwMmEyMDFjNTY1XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BMTQ4MzgwOTUxNV5BMl5BanBnXkFtZTgwNTQzNjczMzE@._V1_FMjpg_UX1000_.jpg',
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
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BODg5NDM1MDI4NF5BMl5BanBnXkFtZTgwMzA0MzcxNzM@._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BMjA5MDgxNjk5MV5BMl5BanBnXkFtZTgwNzY1NzI2NDE@._V1_FMjpg_UX1000_.jpg',
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
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjI4MzU5NTExN15BMl5BanBnXkFtZTgwNzY1OTMwMDI@._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BY2NkNjEwMWMtMTc0ZS00MDgwLTk4ZmUtNTRlOTdiNzM0OWE4XkEyXkFqcGdeQXVyODIyOTEyMzY@._V1_FMjpg_UX1000_.jpg',
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
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNDJjMzc4NGYtZmFmNS00YWY3LThjMzQtYzJlNGFkZGRiOWI1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BYTJlNmEyNTEtMzBlYi00ODZlLWE1NmUtZGRiZDBhZDRhYThkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_FMjpg_UX1000_.jpg',
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
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BYzJkODExZDAtNWVkMy00OWE1LWE1ZjgtNThkMTEwNWRlMzg3XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BNDllZTAzNTEtZmZmMi00MThkLThjMTMtMDJiMWQ2ZjU0ZDg4XkEyXkFqcGdeQXVyNTMxMjgxMzA@._V1_FMjpg_UX1000_.jpg',
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
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BY2UyMjRjNDktZDVjOC00MjA5LTg4NDMtNTdjMWY1YzJmMGEzXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BYTMwNWQ4ZDItNWJjNi00MThmLWFjMjAtODJjNTQzNWQwYzQ5XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg',
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
